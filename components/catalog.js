import { sdq } from '../instruments/sdq.js';

const instruments = [sdq];

export function renderCatalog(onSelect) {
  const html = `
    <div class="catalog">
      <h1>Cuestionarios de Salud Mental</h1>
      <p>Herramientas para evaluar el comportamiento y las emociones de niños y adolescentes. Seleccione un cuestionario para comenzar.</p>
      <div class="catalog-grid">
        ${instruments.map(inst => `
          <div class="catalog-card" data-id="${inst.id}">
            <h3>${inst.name}</h3>
            <div class="meta">${inst.description}</div>
            <div class="meta-time">Tiempo: aproximadamente ${inst.estimatedMinutes} minutos</div>
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
