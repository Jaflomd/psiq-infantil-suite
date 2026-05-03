import { sdq } from '../instruments/sdq.js';

const instruments = [sdq];

export function renderCatalog(onSelect) {
  const html = `
    <div class="catalog">
      <h1>Suite Psiquiatría Infantojuvenil</h1>
      <p>Selecciona un instrumento para comenzar la evaluación.</p>
      <div class="catalog-grid">
        ${instruments.map(inst => `
          <div class="catalog-card" data-id="${inst.id}">
            <h3>${inst.shortName}</h3>
            <div class="meta">${inst.description} · ~${inst.estimatedMinutes} min</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const container = document.getElementById('app');
  container.innerHTML = html;

  container.querySelectorAll('.catalog-card').forEach(card => {
    card.addEventListener('click', () => onSelect(card.dataset.id));
  });
}
