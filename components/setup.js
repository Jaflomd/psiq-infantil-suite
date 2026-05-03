const steps = [
  {
    id: "type",
    question: "¿Es la primera vez que se hace este cuestionario?",
    hint: "Esto nos ayuda a saber qué preguntas mostrar.",
    options: [
      { value: "full", label: "Sí, es la primera vez", desc: "Se evaluará el comportamiento de los últimos 6 meses" },
      { value: "followup", label: "No, es un control", desc: "Se evaluará el comportamiento del último mes" },
    ],
  },
  {
    id: "age",
    question: "¿Qué edad tiene el niño o adolescente?",
    hint: "Las preguntas cambian según la edad.",
    options: [
      { value: "2-4", label: "De 2 a 4 años", desc: "" },
      { value: "4-17", label: "De 4 a 17 años", desc: "" },
      { value: "11-17", label: "De 11 a 17 años", desc: "Puede contestar el propio adolescente" },
      { value: "17+", label: "Mayor de 17 años", desc: "" },
    ],
  },
  {
    id: "informant",
    question: "¿Quién va a contestar las preguntas?",
    hint: "Las preguntas se adaptan según quién las responde.",
    options: [], // Dynamic based on age
  },
];

function getInformantOptions(age) {
  switch (age) {
    case "2-4":
      return [
        { value: "parent", label: "El padre o la madre", desc: "Contesta sobre el comportamiento de su hijo/a" },
        { value: "teacher", label: "El profesor o profesora", desc: "Contesta sobre el comportamiento del alumno/a" },
      ];
    case "4-17":
      return [
        { value: "parent", label: "El padre o la madre", desc: "Contesta sobre el comportamiento de su hijo/a" },
        { value: "teacher", label: "El profesor o profesora", desc: "Contesta sobre el comportamiento del alumno/a" },
        { value: "self", label: "El propio adolescente", desc: "Solo si tiene 11 años o más" },
      ];
    case "11-17":
      return [
        { value: "self", label: "El propio adolescente", desc: "Contesta sobre sí mismo/a" },
        { value: "parent", label: "El padre o la madre", desc: "Contesta sobre el comportamiento de su hijo/a" },
        { value: "teacher", label: "El profesor o profesora", desc: "Contesta sobre el comportamiento del alumno/a" },
      ];
    case "17+":
      return [{ value: "self", label: "El propio adolescente o adulto joven", desc: "Contesta sobre sí mismo/a" }];
    default:
      return [];
  }
}

export function renderSetup(onComplete, onBack) {
  let currentStep = 0;
  const answers = {};

  function render() {
    const step = steps[currentStep];
    let options = step.options;

    if (step.id === "informant") {
      options = getInformantOptions(answers.age);
      if (options.length === 1) {
        answers.informant = options[0].value;
        onComplete(answers);
        return;
      }
    }

    const html = `
      <div class="setup">
        <button class="back-btn" id="back-btn">← Volver</button>
        <div class="setup-header">
          <div class="setup-step">Paso ${currentStep + 1} de ${steps.length}</div>
          <h2>${step.question}</h2>
          ${step.hint ? `<p class="setup-hint">${step.hint}</p>` : ''}
        </div>
        <div class="setup-options">
          ${options.map(opt => `
            <button class="setup-btn" data-value="${opt.value}">
              <span class="setup-btn-label">${opt.label}</span>
              ${opt.desc ? `<span class="setup-btn-desc">${opt.desc}</span>` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const container = document.getElementById('app');
    container.innerHTML = html;

    document.getElementById('back-btn').addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        render();
      } else {
        onBack();
      }
    });

    container.querySelectorAll('.setup-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        answers[step.id] = btn.dataset.value;
        currentStep++;
        if (currentStep >= steps.length) {
          onComplete(answers);
        } else {
          render();
        }
      });
    });
  }

  render();
}
