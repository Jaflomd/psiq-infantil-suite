import { mchat } from '../instruments/mchat.js';

export function renderMCHATQuestions(onComplete, onBack) {
  const items = mchat.items;
  const labels = mchat.responseLabels; // ["Sí", "No"]
  const responses = {};
  let currentIndex = 0;
  let showedIntro = false;

  function render() {
    if (!showedIntro) {
      renderIntro();
    } else {
      renderItem();
    }
  }

  function renderIntro() {
    const html = `
      <div class="question-screen">
        <button class="back-btn" id="back-btn">← Volver</button>
        <div class="intro-card">
          <h2>Antes de empezar</h2>
          <div class="intro-instructions">
            <p><strong>Este cuestionario es para padres o cuidadores de niños de 16 a 30 meses de edad.</strong></p>
            <p>Piense en cómo es su hijo/a normalmente. Si ha visto que su hijo/a hace algo alguna vez pero no lo hace habitualmente, responda "No".</p>
            <p>Son ${items.length} preguntas. Para cada una conteste:</p>
            <ul>
              <li><strong>Sí</strong> — si su hijo/a lo hace habitualmente</li>
              <li><strong>No</strong> — si su hijo/a no lo hace o lo hace muy rara vez</li>
            </ul>
            <p>No hay respuestas buenas ni malas. Conteste lo más sinceramente posible.</p>
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
          <div class="answer-options answer-options-row">
            ${labels.map((label, i) => `
              <button class="answer-btn answer-btn-wide ${selected === i ? 'selected' : ''}" data-value="${i}">${label}</button>
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
          } else {
            onComplete(responses);
          }
        }, 200);
      });
    });

    container.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      if (responses[item.n] !== undefined) {
        if (currentIndex < items.length - 1) {
          currentIndex++;
          render();
        } else {
          onComplete(responses);
        }
      }
    });
  }

  render();
}
