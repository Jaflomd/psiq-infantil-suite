import { mchat, scoreMCHAT } from '../instruments/mchat.js';

const riskLabels = {
  low: "Riesgo Bajo",
  medium: "Riesgo Medio",
  high: "Riesgo Alto",
};
const riskBand = {
  low: "normal",
  medium: "borderline",
  high: "abnormal",
};
const riskMessages = {
  low: "El resultado no indica riesgo significativo de trastorno del espectro autista. No se necesita seguimiento especial por esta prueba.",
  medium: "Se recomienda aplicar la entrevista de seguimiento (Follow-Up) para confirmar los resultados. Si persiste el riesgo, derivar a evaluación especializada.",
  high: "Se recomienda derivar directamente a evaluación diagnóstica especializada sin esperar la entrevista de seguimiento.",
};

export function renderMCHATResults(responses, onRestart) {
  const result = scoreMCHAT(responses);
  const today = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const band = riskBand[result.riskLevel];

  // Build flagged items list
  const flaggedItems = [];
  for (let i = 1; i <= 20; i++) {
    if (result.itemResults[i]) {
      const item = mchat.items.find(it => it.n === i);
      const isCritical = mchat.criticalItems.includes(i);
      flaggedItems.push({ n: i, text: item.text, isCritical });
    }
  }

  const html = `
    <div class="results">
      <h2>M-CHAT-R/F — Resultados</h2>
      <div class="results-meta">
        Padre/Madre · 16–30 meses · ${today}
      </div>

      <div class="score-card total band-${band}">
        <span class="label"><strong>PUNTAJE DE RIESGO</strong></span>
        <span class="value"><strong>${result.totalRisk}/20</strong> <span class="band-tag ${band}">${riskLabels[result.riskLevel]}</span></span>
      </div>

      <div class="result-message band-${band}">
        ${riskMessages[result.riskLevel]}
      </div>

      ${flaggedItems.length > 0 ? `
        <div class="flagged-section">
          <h3>Ítems con respuesta de riesgo (${flaggedItems.length})</h3>
          ${flaggedItems.map(f => `
            <div class="flagged-item ${f.isCritical ? 'critical' : ''}">
              <span class="flagged-num">${f.n}${f.isCritical ? '*' : ''}</span>
              <span class="flagged-text">${f.text}</span>
            </div>
          `).join('')}
          ${result.criticalFlagged.length > 0 ? `<div class="flagged-note">* Ítem crítico</div>` : ''}
        </div>
      ` : ''}

      <div class="results-actions">
        <button class="btn-primary" id="copy-btn">Copiar reporte</button>
        <button class="btn-secondary" id="restart-btn">Nuevo</button>
      </div>
      <div class="copy-success" id="copy-msg">Copiado al portapapeles</div>
    </div>
  `;

  const container = document.getElementById('app');
  container.innerHTML = html;

  document.getElementById('copy-btn').addEventListener('click', () => {
    const text = buildReportText(result, flaggedItems, today);
    navigator.clipboard.writeText(text).then(() => {
      const msg = document.getElementById('copy-msg');
      msg.classList.add('show');
      setTimeout(() => msg.classList.remove('show'), 2000);
    });
  });

  document.getElementById('restart-btn').addEventListener('click', onRestart);
}

function buildReportText(result, flaggedItems, today) {
  const lines = [
    `M-CHAT-R/F — Tamizaje de Autismo`,
    `Informante: Padre/Madre | Edad: 16–30 meses`,
    `Fecha: ${today}`,
    ``,
    `RESULTADO:`,
    `• Puntaje de riesgo: ${result.totalRisk}/20 (${riskLabels[result.riskLevel]})`,
    ``,
    `INTERPRETACIÓN:`,
    `${riskMessages[result.riskLevel]}`,
  ];

  if (flaggedItems.length > 0) {
    lines.push('');
    lines.push(`ÍTEMS CON RIESGO (${flaggedItems.length}):`);
    for (const f of flaggedItems) {
      lines.push(`• Ítem ${f.n}${f.isCritical ? ' (crítico)' : ''}: ${f.text}`);
    }
  }

  if (result.criticalFlagged.length > 0) {
    lines.push('');
    lines.push(`ÍTEMS CRÍTICOS FLAGGEADOS: ${result.criticalFlagged.join(', ')}`);
  }

  return lines.join('\n');
}
