const steps = [
  {
    id: "type",
    question: "¿Tipo de evaluación?",
    options: [
      { value: "full", label: "Intake (primera vez)" },
      { value: "followup", label: "Control (seguimiento)" },
    ],
  },
  {
    id: "age",
    question: "¿Rango de edad del paciente?",
    options: [
      { value: "2-4", label: "2–4 años" },
      { value: "4-17", label: "4–17 años" },
      { value: "11-17", label: "11–17 años" },
      { value: "17+", label: "17+ años" },
    ],
  },
  {
    id: "informant",
    question: "¿Quién completa el cuestionario?",
    options: [], // Dynamic based on age
  },
];

function getInformantOptions(age) {
  switch (age) {
    case "2-4":
      return [
        { value: "parent", label: "Padre/Madre" },
        { value: "teacher", label: "Profesor/a" },
      ];
    case "4-17":
      return [
        { value: "parent", label: "Padre/Madre" },
        { value: "teacher", label: "Profesor/a" },
        { value: "self", label: "Autoinformado (11+ años)" },
      ];
    case "11-17":
      return [
        { value: "self", label: "Autoinformado" },
        { value: "parent", label: "Padre/Madre" },
        { value: "teacher", label: "Profesor/a" },
      ];
    case "17+":
      return [{ value: "self", label: "Autoinformado" }];
    default:
      return [];
  }
}

export function renderSetup(onComplete) {
  let currentStep = 0;
  const answers = {};

  function render() {
    const step = steps[currentStep];
    let options = step.options;

    if (step.id === "informant") {
      options = getInformantOptions(answers.age);
      // If only one option, auto-select
      if (options.length === 1) {
        answers.informant = options[0].value;
        onComplete(answers);
        return;
      }
    }

    const html = `
      <div class="setup">
        <h2>${step.question}</h2>
        <div class="setup-options">
          ${options.map(opt => `
            <button class="setup-btn" data-value="${opt.value}">${opt.label}</button>
          `).join('')}
        </div>
      </div>
    `;

    const container = document.getElementById('app');
    container.innerHTML = html;

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
