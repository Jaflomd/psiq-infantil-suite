// SDQ - Strengths and Difficulties Questionnaire
// All versions: parent (2-4, 4-17), teacher (2-4, 4-17), self (11-17, 17+)

export const sdq = {
  id: "sdq",
  name: "Cuestionario de Capacidades y Dificultades (SDQ)",
  shortName: "SDQ",
  description: "Screening breve de salud mental en niños y adolescentes. 25 ítems, 5 escalas.",
  estimatedMinutes: 5,
  author: "Robert Goodman",

  // Scale definitions (item positions 1-25)
  scales: [
    { id: "emotional", name: "Síntomas Emocionales", items: [3, 8, 13, 16, 24] },
    { id: "conduct", name: "Problemas de Conducta", items: [5, 7, 12, 18, 22] },
    { id: "hyperactivity", name: "Hiperactividad", items: [2, 10, 15, 21, 25] },
    { id: "peer", name: "Problemas con Compañeros", items: [6, 11, 14, 19, 23] },
    { id: "prosocial", name: "Conducta Prosocial", items: [1, 4, 9, 17, 20] },
  ],

  // Items where scoring is REVERSED (0=Absolutely true, 2=Not true)
  reverseItems: {
    "parent-4-17": [7, 11, 14, 21, 25],
    "parent-2-4": [7, 11, 14, 21, 25],
    "teacher-4-17": [7, 11, 14, 21, 25],
    "teacher-2-4": [7, 11, 14, 21, 25],
    "self-11-17": [7, 11, 14, 21, 25],
    "self-17+": [7, 11, 14, 21, 25],
  },

  // Response options by informant type
  responseLabels: {
    parent: ["No es cierto", "Un tanto cierto", "Absolutamente cierto"],
    teacher: ["No es cierto", "Un tanto cierto", "Absolutamente cierto"],
    self: ["No es verdad", "Es verdad a medias", "Verdaderamente sí"],
  },

  // Norms: [normal_max, borderline_max] — above borderline_max = abnormal
  norms: {
    parent: {
      total: [13, 16],
      emotional: [3, 4],
      conduct: [2, 3],
      hyperactivity: [5, 6],
      peer: [2, 3],
      prosocial: [5, 4], // Note: prosocial is reversed — low = abnormal
    },
    teacher: {
      total: [11, 15],
      emotional: [4, 5],
      conduct: [2, 3],
      hyperactivity: [5, 6],
      peer: [3, 4],
      prosocial: [5, 4],
    },
    self: {
      total: [15, 19],
      emotional: [5, 6],
      conduct: [3, 4],
      hyperactivity: [5, 6],
      peer: [3, 5],
      prosocial: [5, 4],
    },
  },

  // Items by version — parent 4-17 is the base
  items: {
    "parent-4-17": [
      { n: 1, text: "Tiene en cuenta los sentimientos de otras personas" },
      { n: 2, text: "Es inquieto/a, hiperactivo/a, no puede permanecer quieto/a por mucho tiempo" },
      { n: 3, text: "Se queja con frecuencia de dolor de cabeza, de estómago o de náuseas" },
      { n: 4, text: "Comparte frecuentemente con otros niños/as chucherías, juguetes, lápices, etc" },
      { n: 5, text: "Frecuentemente tiene rabietas o mal genio" },
      { n: 6, text: "Es más bien solitario/a y tiende a jugar solo/a" },
      { n: 7, text: "Por lo general es obediente, suele hacer lo que le piden los adultos" },
      { n: 8, text: "Tiene muchas preocupaciones, a menudo parece inquieto/a o preocupado/a" },
      { n: 9, text: "Ofrece ayuda cuando alguien resulta herido, disgustado, o enfermo" },
      { n: 10, text: "Está continuamente moviéndose y es revoltoso" },
      { n: 11, text: "Tiene por lo menos un/a buen/a amigo/a" },
      { n: 12, text: "Pelea con frecuencia con otros niños/as o se mete con ellos/ellas" },
      { n: 13, text: "Se siente a menudo infeliz, desanimado o lloroso" },
      { n: 14, text: "Por lo general cae bien a los otros niños/as" },
      { n: 15, text: "Se distrae con facilidad, su concentración tiende a dispersarse" },
      { n: 16, text: "Es nervioso/a o dependiente ante nuevas situaciones, fácilmente pierde la confianza en sí mismo/a" },
      { n: 17, text: "Trata bien a los niños/as más pequeños/as" },
      { n: 18, text: "A menudo miente o engaña" },
      { n: 19, text: "Los otros niños/as se meten con él/ella o se burlan de él/ella" },
      { n: 20, text: "A menudo se ofrece para ayudar (a padres, maestros, otros niños/as)" },
      { n: 21, text: "Piensa las cosas antes de hacerlas" },
      { n: 22, text: "Roba cosas en casa, en la escuela o en otros sitios" },
      { n: 23, text: "Se lleva mejor con adultos que con otros niños/as" },
      { n: 24, text: "Tiene muchos miedos, se asusta fácilmente" },
      { n: 25, text: "Termina lo que empieza, tiene buena concentración" },
    ],
    "parent-2-4": [
      { n: 1, text: "Tiene en cuenta los sentimientos de otras personas" },
      { n: 2, text: "Es inquieto/a, hiperactivo/a, no puede permanecer quieto/a por mucho tiempo" },
      { n: 3, text: "Se queja con frecuencia de dolor de cabeza, de estómago o de náuseas" },
      { n: 4, text: "Comparte frecuentemente con otros niños/as chucherías, juguetes, lápices, etc" },
      { n: 5, text: "Frecuentemente tiene rabietas o mal genio" },
      { n: 6, text: "Es más bien solitario/a y tiende a jugar solo/a" },
      { n: 7, text: "Por lo general es obediente, suele hacer lo que le piden los adultos" },
      { n: 8, text: "Tiene muchas preocupaciones, a menudo parece inquieto/a o preocupado/a" },
      { n: 9, text: "Ofrece ayuda cuando alguien resulta herido, disgustado, o enfermo" },
      { n: 10, text: "Está continuamente moviéndose y es revoltoso" },
      { n: 11, text: "Tiene por lo menos un/a buen/a amigo/a" },
      { n: 12, text: "Pelea con frecuencia con otros niños/as o se mete con ellos/ellas" },
      { n: 13, text: "Se siente a menudo infeliz, desanimado o lloroso" },
      { n: 14, text: "Por lo general cae bien a los otros niños/as" },
      { n: 15, text: "Se distrae con facilidad, su concentración tiende a dispersarse" },
      { n: 16, text: "Es nervioso/a o dependiente ante nuevas situaciones, fácilmente pierde la confianza en sí mismo/a" },
      { n: 17, text: "Trata bien a los niños/as más pequeños/as" },
      { n: 18, text: "Muestra a menudo una actitud negativa con los adultos" },
      { n: 19, text: "Los otros niños/as se meten con él/ella o se burlan de él/ella" },
      { n: 20, text: "A menudo se ofrece para ayudar (a padres, maestros, otros niños/as)" },
      { n: 21, text: "Tiene capacidad para pensar antes de actuar" },
      { n: 22, text: "A menudo muestra rencor cuando se enfada" },
      { n: 23, text: "Se lleva mejor con adultos que con otros niños/as" },
      { n: 24, text: "Tiene muchos miedos, se asusta fácilmente" },
      { n: 25, text: "Termina lo que empieza, tiene buena concentración" },
    ],
    "teacher-4-17": null, // Same as parent-4-17
    "teacher-2-4": null, // Same as parent-2-4
    "self-11-17": [
      { n: 1, text: "Procuro ser agradable con los demás. Tengo en cuenta los sentimientos de las otras personas" },
      { n: 2, text: "Soy inquieto/a, hiperactivo/a, no puedo permanecer quieto/a por mucho tiempo" },
      { n: 3, text: "Suelo tener muchos dolores de cabeza, estómago o náuseas" },
      { n: 4, text: "Normalmente comparto con otros mis juguetes, chucherías, lápices, etc" },
      { n: 5, text: "Cuando me enfado, me enfado mucho y pierdo el control" },
      { n: 6, text: "Prefiero estar solo/a que con gente de mi edad" },
      { n: 7, text: "Por lo general soy obediente" },
      { n: 8, text: "A menudo estoy preocupado/a" },
      { n: 9, text: "Ayudo si alguien está enfermo, disgustado o herido" },
      { n: 10, text: "Estoy todo el tiempo moviéndome, me muevo demasiado" },
      { n: 11, text: "Tengo un/a buen/a amigo/a por lo menos" },
      { n: 12, text: "Peleo con frecuencia con otros, manipulo a los demás" },
      { n: 13, text: "Me siento a menudo triste, desanimado o con ganas de llorar" },
      { n: 14, text: "Por lo general caigo bien a la otra gente de mi edad" },
      { n: 15, text: "Me distraigo con facilidad, me cuesta concentrarme" },
      { n: 16, text: "Me pongo nervioso/a con las situaciones nuevas, fácilmente pierdo la confianza en mí mismo/a" },
      { n: 17, text: "Trato bien a los niños/as más pequeños/as" },
      { n: 18, text: "A menudo me acusan de mentir o de hacer trampas" },
      { n: 19, text: "Otra gente de mi edad se mete conmigo o se burla de mí" },
      { n: 20, text: "A menudo me ofrezco para ayudar (a padres, maestros, niños)" },
      { n: 21, text: "Pienso las cosas antes de hacerlas" },
      { n: 22, text: "Cojo cosas que no son mías de casa, la escuela o de otros sitios" },
      { n: 23, text: "Me llevo mejor con adultos que con otros de mi edad" },
      { n: 24, text: "Tengo muchos miedos, me asusto fácilmente" },
      { n: 25, text: "Termino lo que empiezo, tengo buena concentración" },
    ],
    "self-17+": null, // Same as self-11-17
  },

  // Impact supplement questions (follow-up versions)
  impactQuestions: {
    parent: [
      { n: "imp1", text: "En general, ¿cree usted que su hijo/a tiene dificultades en alguna de las siguientes áreas: emociones, concentración, comportamiento, o en llevarse bien con otras personas?", options: ["No", "Sí, dificultades leves", "Sí, dificultades definidas", "Sí, dificultades severas"] },
      { n: "imp2", text: "¿Cuánto tiempo hace que existen estas dificultades?", options: ["Menos de un mes", "1-5 meses", "6-12 meses", "Más de un año"], condition: "imp1_gt0" },
      { n: "imp3", text: "¿Causan estas dificultades malestar o sufrimiento a su hijo/a?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4a", text: "¿Interfieren estas dificultades en la VIDA EN LA CASA?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4b", text: "¿Interfieren estas dificultades en las AMISTADES?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4c", text: "¿Interfieren estas dificultades en el APRENDIZAJE EN LA ESCUELA?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4d", text: "¿Interfieren estas dificultades en las ACTIVIDADES DE OCIO O TIEMPO LIBRE?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp5", text: "¿Son estas dificultades una carga para usted o su familia?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
    ],
    self: [
      { n: "imp1", text: "En general, ¿crees que tienes dificultades en alguna de las siguientes áreas: emociones, concentración, comportamiento, o en llevarte bien con otras personas?", options: ["No", "Sí, dificultades leves", "Sí, dificultades definidas", "Sí, dificultades severas"] },
      { n: "imp2", text: "¿Cuánto tiempo hace que existen estas dificultades?", options: ["Menos de un mes", "1-5 meses", "6-12 meses", "Más de un año"], condition: "imp1_gt0" },
      { n: "imp3", text: "¿Te causan estas dificultades malestar o sufrimiento?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4a", text: "¿Interfieren estas dificultades en tu VIDA EN CASA?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4b", text: "¿Interfieren estas dificultades en tus AMISTADES?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4c", text: "¿Interfieren estas dificultades en tu APRENDIZAJE EN LA ESCUELA?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp4d", text: "¿Interfieren estas dificultades en tus ACTIVIDADES DE OCIO O TIEMPO LIBRE?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
      { n: "imp5", text: "¿Son estas dificultades una carga para ti?", options: ["No", "Sólo un poco", "Bastante", "Mucho"], condition: "imp1_gt0" },
    ],
  },

  // Timeframe text
  timeframes: {
    full: "últimos seis meses",
    followup: "último mes",
  },
};

// Helper: get items for a version, falling back to parent-4-17 for teacher
export function getItems(version) {
  const items = sdq.items[version];
  if (items) return items;
  // Fallback: teacher uses same as parent
  if (version.startsWith("teacher-")) {
    const parentVersion = version.replace("teacher-", "parent-");
    return sdq.items[parentVersion];
  }
  // self-17+ same as self-11-17
  if (version === "self-17+") return sdq.items["self-11-17"];
  return sdq.items["parent-4-17"];
}

// Helper: get informant type from version key
export function getInformant(version) {
  if (version.startsWith("parent")) return "parent";
  if (version.startsWith("teacher")) return "teacher";
  return "self";
}

// Scoring function
export function scoreSDQ(responses, version) {
  const informant = getInformant(version);
  const reverseKey = version.includes("17+") ? "self-17+" : version;
  const reversed = sdq.reverseItems[reverseKey] || sdq.reverseItems["parent-4-17"];
  const norms = sdq.norms[informant];

  const scaleScores = {};
  let totalDifficulties = 0;

  for (const scale of sdq.scales) {
    let sum = 0;
    for (const itemNum of scale.items) {
      const raw = responses[itemNum];
      if (raw === undefined) continue;
      if (reversed.includes(itemNum)) {
        sum += (2 - raw);
      } else {
        sum += raw;
      }
    }
    scaleScores[scale.id] = sum;
    if (scale.id !== "prosocial") {
      totalDifficulties += sum;
    }
  }

  // Classify bands
  const bands = {};
  for (const scale of sdq.scales) {
    const score = scaleScores[scale.id];
    const [normalMax, borderlineMax] = norms[scale.id];
    if (scale.id === "prosocial") {
      // Prosocial: low = abnormal (norms are inverted threshold)
      if (score >= normalMax) bands[scale.id] = "normal";
      else if (score >= borderlineMax) bands[scale.id] = "borderline";
      else bands[scale.id] = "abnormal";
    } else {
      if (score <= normalMax) bands[scale.id] = "normal";
      else if (score <= borderlineMax) bands[scale.id] = "borderline";
      else bands[scale.id] = "abnormal";
    }
  }

  // Total band
  const [totalNormalMax, totalBorderlineMax] = norms.total;
  let totalBand;
  if (totalDifficulties <= totalNormalMax) totalBand = "normal";
  else if (totalDifficulties <= totalBorderlineMax) totalBand = "borderline";
  else totalBand = "abnormal";

  return { scaleScores, totalDifficulties, bands, totalBand };
}

// Impact scoring
export function scoreImpact(impactResponses) {
  if (!impactResponses || impactResponses.imp1 === 0) {
    return { hasImpact: false, distress: 0, impairment: 0, burden: 0 };
  }
  const distress = impactResponses.imp3 || 0;
  const impairment = (impactResponses.imp4a || 0) + (impactResponses.imp4b || 0) +
    (impactResponses.imp4c || 0) + (impactResponses.imp4d || 0);
  const burden = impactResponses.imp5 || 0;
  return { hasImpact: true, distress, impairment, burden };
}
