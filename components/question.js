import { sdq, getItems, getInformant } from '../instruments/sdq.js';

const informantInstructions = {
  parent: "Piense en el comportamiento de su hijo/a. Para cada frase, elija la respuesta que mejor describe cómo es su hijo/a.",
  teacher: "Piense en el comportamiento de este alumno/a. Para cada frase, elija la respuesta que mejor lo/la describe.",
  self: "Piensa en cómo eres tú. Para cada frase, elige la respuesta que mejor te describe.",
};

export function renderQuestions(setup, onComplete, onBack) {
  const informant = setup.informant;
  let ageKey = setup.age;
  if (informant === "self" && ageKey === "4-17") ageKey = "11-17";
  const versionKey = `${informant}-${ageKey}`;
  const items = getItems(versionKey);
  const labels = sdq.responseLabels[informant];
  const timeframe = sdq.timeframes[setup.type];
  const timeframeText = setup.type === "full"
    ? "Responda pensando en los últimos 6 meses."
    : "Responda pensando en el último mes.";

  const responses = {};
  let currentIndex = 0;
  let phase = "items";
  let impactResponses = {};
  let impactIndex = 0;
  let showedIntro = false;

  const showImpact = setup.type === "followup";
  const impactQs = showImpact ? (sdq.impactQuestions[informant] || sdq.impactQuestions.parent) : [];

  function render() {
    if (!showedIntro) {
      renderIntro();
    } else if (phase === "items") {
      renderItem();
    } else {
      renderImpactQuestion();
    }
  }

  function renderIntro() {
    const html = `
      <div class="question-screen">
        <button class="back-btn" id="back-btn">← Volver</button>
        <div class="intro-card">
          <h2>Antes de empezar</h2>
          <div class="intro-instructions">
            <p><strong>${informantInstructions[informant]}</strong></p>
            <p>${timeframeText}</p>
            <p>Son ${items.length} preguntas. Para cada una hay 3 opciones:</p>
            <ul>
              <li><strong>${labels[0]}</strong> — no describe a ${informant === 'self' ? 'ti' : 'su hijo/a'}</li>
              <li><strong>${labels[1]}</strong> — lo describe un poco o a veces</li>
              <li><strong>${labels[2]}</strong> — lo describe muy bien o siempre</li>
            </ul>
            <p>No hay respuestas buenas ni malas. Conteste lo que usted crea que es más cierto.</p>
          </div>
          <button class="btn-primary" id="start-btn">Empezar</button>
        </div>
      </div>
    `;

    const container = document.getElementById('app');
    container.innerHTML = html;

    document.getElementById('back-btn').addEventListener('click', () => onBack());
    document.getElementById('start-btn').addEventListener('click', () => {
      showedIntro = true;
      render();
    });
  }

  function renderItem() {
    const item = items[currentIndex];
    const progress = ((currentIndex + 1) / items.length) * 100;
    const selected = responses[item.n];

    const html = `
      <div class="question-screen">
        <button class="back-btn" id="back-btn">← Volver</button>
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="question-meta">Pregunta ${currentIndex + 1} de ${items.length}</div>
        <div class="question-content">
          <div class="question-text">${item.text}</div>
          <div class="answer-options">
            ${labels.map((label, i) => `
              <button class="answer-btn ${selected === i ? 'selected' : ''}" data-value="${i}">${label}</button>
            `).join('')}
          </div>
        </div>
        <div class="question-nav">
          <div></div>
          <button class="nav-btn" ${selected === undefined ? 'disabled' : ''} data-action="next">Siguiente →</button>
        </div>
      </div>
    `;

    const container = document.getElementById('app');
    container.innerHTML = html;

    document.getElementById('back-btn').addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; render(); }
      else { showedIntro = false; render(); }
    });

    container.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        responses[item.n] = parseInt(btn.dataset.value);
        container.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        setTimeout(() => {
          if (currentIndex < items.length - 1) {
            currentIndex++;
            render();
          } else if (showImpact && impactQs.length > 0) {
            phase = "impact";
            impactIndex = 0;
            render();
          } else {
            onComplete(responses, null, versionKey);
          }
        }, 200);
      });
    });

    container.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      if (responses[item.n] !== undefined) {
        if (currentIndex < items.length - 1) {
          currentIndex++;
          render();
        } else if (showImpact && impactQs.length > 0) {
          phase = "impact";
          impactIndex = 0;
          render();
        } else {
          onComplete(responses, null, versionKey);
        }
      }
    });
  }

  function renderImpactQuestion() {
    const q = impactQs[impactIndex];

    if (q.condition === "imp1_gt0" && impactResponses.imp1 === 0) {
      onComplete(responses, impactResponses, versionKey);
      return;
    }

    const totalQs = impactQs.filter(iq =>
      !iq.condition || (iq.condition === "imp1_gt0" && impactResponses.imp1 > 0)
    ).length;
    const currentNum = impactIndex + 1;
    const selected = impactResponses[q.n];

    const html = `
      <div class="question-screen">
        <button class="back-btn" id="back-btn">← Volver</button>
        <div class="progress-bar"><div class="progress-fill" style="width:100%"></div></div>
        <div class="question-meta">Preguntas adicionales · ${currentNum} de ${totalQs}</div>
        <div class="question-content">
          <div class="question-text">${q.text}</div>
          <div class="answer-options">
            ${q.options.map((opt, i) => `
              <button class="answer-btn ${selected === i ? 'selected' : ''}" data-value="${i}">${opt}</button>
            `).join('')}
          </div>
        </div>
        <div class="question-nav">
          <div></div>
          <button class="nav-btn" ${selected === undefined ? 'disabled' : ''} data-action="next">Siguiente →</button>
        </div>
      </div>
    `;

    const container = document.getElementById('app');
    container.innerHTML = html;

    document.getElementById('back-btn').addEventListener('click', () => {
      if (impactIndex > 0) { impactIndex--; render(); }
      else { phase = "items"; currentIndex = items.length - 1; render(); }
    });

    container.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        impactResponses[q.n] = parseInt(btn.dataset.value);
        container.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        setTimeout(() => advanceImpact(), 200);
      });
    });

    container.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      if (impactResponses[q.n] !== undefined) advanceImpact();
    });
  }

  function advanceImpact() {
    impactIndex++;
    if (impactIndex >= impactQs.length) {
      onComplete(responses, impactResponses, versionKey);
    } else {
      const nextQ = impactQs[impactIndex];
      if (nextQ.condition === "imp1_gt0" && impactResponses.imp1 === 0) {
        onComplete(responses, impactResponses, versionKey);
      } else {
        render();
      }
    }
  }

  render();
}
