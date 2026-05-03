import { sdq, scoreSDQ, scoreImpact, getInformant } from '../instruments/sdq.js';

const bandLabels = { normal: "Normal", borderline: "Límite", abnormal: "Anormal" };
const informantLabels = { parent: "Padre/Madre", teacher: "Profesor/a", self: "Autoinformado" };
const typeLabels = { full: "Intake", followup: "Control (seguimiento)" };

export function renderResults(setup, responses, impactResponses, versionKey, onRestart) {
  const result = scoreSDQ(responses, versionKey);
  const impact = scoreImpact(impactResponses);
  const informant = getInformant(versionKey);
  const today = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' });

  function bandClass(band) {
    return `band-${band}`;
  }

  const scaleRows = sdq.scales.map(scale => {
    const score = result.scaleScores[scale.id];
    const band = result.bands[scale.id];
    return `
      <div class="score-card ${bandClass(band)}">
        <span class="label">${scale.name}</span>
        <span class="value">${score}/10 <span class="band-tag ${band}">${bandLabels[band]}</span></span>
      </div>
    `;
  }).join('');

  let impactHtml = '';
  if (impact.hasImpact) {
    impactHtml = `
      <div class="score-card">
        <span class="label">Malestar</span>
        <span class="value">${impact.distress}/3</span>
      </div>
      <div class="score-card">
        <span class="label">Deterioro funcional</span>
        <span class="value">${impact.impairment}/12</span>
      </div>
      <div class="score-card">
        <span class="label">Carga familiar</span>
        <span class="value">${impact.burden}/3</span>
      </div>
    `;
  }

  const html = `
    <div class="results">
      <h2>SDQ — Resultados</h2>
      <div class="results-meta">
        ${informantLabels[informant]} · ${setup.age} años · ${typeLabels[setup.type]} · ${today}
      </div>
      ${scaleRows}
      <div class="score-card total ${bandClass(result.totalBand)}">
        <span class="label"><strong>TOTAL DIFICULTADES</strong></span>
        <span class="value"><strong>${result.totalDifficulties}/40</strong> <span class="band-tag ${result.totalBand}">${bandLabels[result.totalBand]}</span></span>
      </div>
      ${impactHtml}
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
    const text = buildReportText(setup, result, impact, informant, today);
    navigator.clipboard.writeText(text).then(() => {
      const msg = document.getElementById('copy-msg');
      msg.classList.add('show');
      setTimeout(() => msg.classList.remove('show'), 2000);
    });
  });

  document.getElementById('restart-btn').addEventListener('click', onRestart);
}

function buildReportText(setup, result, impact, informant, today) {
  const lines = [
    `SDQ — Cuestionario de Capacidades y Dificultades`,
    `Informante: ${informantLabels[informant]} | Edad: ${setup.age} | Tipo: ${typeLabels[setup.type]}`,
    `Fecha: ${today}`,
    ``,
    `PUNTAJES:`,
  ];

  for (const scale of sdq.scales) {
    const score = result.scaleScores[scale.id];
    const band = bandLabels[result.bands[scale.id]];
    lines.push(`• ${scale.name}: ${score}/10 (${band})`);
  }

  lines.push(`• TOTAL DIFICULTADES: ${result.totalDifficulties}/40 (${bandLabels[result.totalBand]})`);

  if (impact.hasImpact) {
    lines.push('');
    lines.push('IMPACTO:');
    lines.push(`• Malestar: ${impact.distress}/3`);
    lines.push(`• Deterioro funcional: ${impact.impairment}/12`);
    lines.push(`• Carga familiar: ${impact.burden}/3`);
  }

  return lines.join('\n');
}
