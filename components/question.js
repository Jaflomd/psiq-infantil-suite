import { sdq, getItems, getInformant } from '../instruments/sdq.js';

export function renderQuestions(setup, onComplete) {
  // Determine version key
  const informant = setup.informant;
  let ageKey = setup.age;
  // Map age selection to item version
  if (informant === "self" && ageKey === "4-17") ageKey = "11-17";
  if (informant === "self" && (ageKey === "11-17" || ageKey === "17+")) {
    // keep as is
  }
  const versionKey = `${informant}-${ageKey}`;
  const items = getItems(versionKey);
  const labels = sdq.responseLabels[informant];
  const timeframe = sdq.timeframes[setup.type];

  const responses = {};
  let currentIndex = 0;
  let phase = "items"; // "items" or "impact"
  let impactResponses = {};
  let impactIndex = 0;

  // Determine if we show impact questions
  const showImpact = setup.type === "followup";
  const impactQs = showImpact ? (sdq.impactQuestions[informant] || sdq.impactQuestions.parent) : [];

  function render() {
    if (phase === "items") {
      renderItem();
    } else {
      renderImpactQuestion();
    }
  }

  function renderItem() {
    const item = items[currentIndex];
    const progress = ((currentIndex + 1) / items.length) * 100;
    const selected = responses[item.n];

    const html = `
      <div class="question-screen">
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="question-meta">SDQ · ${currentIndex + 1}/${items.length} · ${timeframe}</div>
        <div class="question-content">
          <div class="question-text">${item.text}</div>
          <div class="answer-options">
            ${labels.map((label, i) => `
              <button class="answer-btn ${selected === i ? 'selected' : ''}" data-value="${i}">${label}</button>
            `).join('')}
          </div>
        </div>
        <div class="question-nav">
          <button class="nav-btn" ${currentIndex === 0 ? 'disabled' : ''} data-action="prev">← Anterior</button>
          <button class="nav-btn" ${selected === undefined ? 'disabled' : ''} data-action="next">Siguiente →</button>
        </div>
      </div>
    `;

    const container = document.getElementById('app');
    container.innerHTML = html;

    // Answer buttons
    container.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        responses[item.n] = parseInt(btn.dataset.value);
        // Auto-advance after brief delay
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
        }, 180);
        // Visual feedback immediately
        container.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Nav buttons
    container.querySelector('[data-action="prev"]')?.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; render(); }
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

    // Check condition
    if (q.condition === "imp1_gt0" && impactResponses.imp1 === 0) {
      // Skip — no difficulties reported
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
        <div class="progress-bar"><div class="progress-fill" style="width:100%"></div></div>
        <div class="question-meta">SDQ Impacto · ${currentNum}/${totalQs}</div>
        <div class="question-content">
          <div class="question-text">${q.text}</div>
          <div class="answer-options">
            ${q.options.map((opt, i) => `
              <button class="answer-btn ${selected === i ? 'selected' : ''}" data-value="${i}">${opt}</button>
            `).join('')}
          </div>
        </div>
        <div class="question-nav">
          <button class="nav-btn" ${impactIndex === 0 ? 'disabled' : ''} data-action="prev">← Anterior</button>
          <button class="nav-btn" ${selected === undefined ? 'disabled' : ''} data-action="next">Siguiente →</button>
        </div>
      </div>
    `;

    const container = document.getElementById('app');
    container.innerHTML = html;

    container.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        impactResponses[q.n] = parseInt(btn.dataset.value);
        container.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        setTimeout(() => advanceImpact(), 180);
      });
    });

    container.querySelector('[data-action="prev"]')?.addEventListener('click', () => {
      if (impactIndex > 0) { impactIndex--; render(); }
      else { phase = "items"; currentIndex = items.length - 1; render(); }
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
