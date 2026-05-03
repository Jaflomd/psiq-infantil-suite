// M-CHAT-R/F — Modified Checklist for Autism in Toddlers, Revised with Follow-Up
// Ages 16–30 months. Completed by parents.

export const mchat = {
  id: "mchat",
  name: "M-CHAT-R/F — Tamizaje de Autismo en Niños Pequeños",
  shortName: "M-CHAT-R/F",
  description: "Tamizaje de trastorno del espectro autista en niños de 16 a 30 meses. 20 preguntas de sí o no, respondidas por los padres.",
  estimatedMinutes: 5,
  author: "Robins, Fein & Barton (2009)",
  ageRange: "16–30 meses",

  // Items where YES = at risk (reverse-scored)
  reverseItems: [2, 5, 12],

  // All 20 items in Spanish
  items: [
    { n: 1, text: "Si usted señala algo al otro lado de la habitación, ¿su hijo/a lo mira?" },
    { n: 2, text: "¿Alguna vez se ha preguntado si su hijo/a podría ser sordo/a?" },
    { n: 3, text: "¿Su hijo/a juega a juegos de imaginación o a \"hacer como si\"? Por ejemplo, ¿finge que bebe de una taza vacía, o que habla por teléfono?" },
    { n: 4, text: "¿A su hijo/a le gusta subirse a las cosas? Por ejemplo, a los muebles, a los juegos del parque o a las escaleras." },
    { n: 5, text: "¿Su hijo/a hace movimientos inusuales con los dedos cerca de sus propios ojos? Por ejemplo, ¿mueve los dedos cerca de sus ojos de manera rara?" },
    { n: 6, text: "¿Su hijo/a señala con un dedo para pedir algo o para pedir ayuda? Por ejemplo, señala una golosina o un juguete que está fuera de su alcance." },
    { n: 7, text: "¿Su hijo/a señala con un dedo para mostrarle algo interesante? Por ejemplo, señala un avión en el cielo o un camión grande en la calle." },
    { n: 8, text: "¿Su hijo/a se interesa en otros niños? Por ejemplo, ¿los mira, les sonríe o se acerca a ellos?" },
    { n: 9, text: "¿Su hijo/a le trae cosas para mostrárselas? No para pedir ayuda, sino solo para compartir. Por ejemplo, le muestra una flor, un peluche o un juguete." },
    { n: 10, text: "¿Su hijo/a responde cuando usted lo/la llama por su nombre? Por ejemplo, ¿lo mira, habla, o deja de hacer lo que estaba haciendo cuando usted dice su nombre?" },
    { n: 11, text: "Cuando usted le sonríe a su hijo/a, ¿él/ella le sonríe de vuelta?" },
    { n: 12, text: "¿Se molesta su hijo/a con los ruidos de todos los días? Por ejemplo, ¿llora o se tapa los oídos con la aspiradora, con música fuerte o con ruidos fuertes?" },
    { n: 13, text: "¿Su hijo/a camina solo/a?" },
    { n: 14, text: "¿Su hijo/a lo/la mira a los ojos cuando usted le habla, juega con él/ella o lo/la viste?" },
    { n: 15, text: "¿Su hijo/a intenta copiar lo que usted hace? Por ejemplo, ¿dice adiós con la mano, aplaude o hace algún sonido gracioso que usted hace?" },
    { n: 16, text: "Si usted gira la cabeza para mirar algo, ¿su hijo/a mira alrededor para ver qué es lo que usted está mirando?" },
    { n: 17, text: "¿Su hijo/a intenta hacer que usted lo/la mire? Por ejemplo, ¿busca que usted lo elogie o le dice \"¡mira!\" o \"¡mírame!\"?" },
    { n: 18, text: "¿Su hijo/a entiende cuando usted le dice que haga algo? Por ejemplo, si usted no señala, ¿su hijo/a entiende \"pon el libro encima de la silla\" o \"tráeme la cobija\"?" },
    { n: 19, text: "Si algo nuevo o raro pasa, ¿su hijo/a lo/la mira a la cara para ver cómo se siente usted al respecto? Por ejemplo, si oye un ruido raro o ve un juguete nuevo, ¿lo/la mira a usted?" },
    { n: 20, text: "¿A su hijo/a le gustan las actividades con movimiento? Por ejemplo, ¿le gusta que lo mezan o que lo hagan saltar en las rodillas?" },
  ],

  // Critical items (best discriminators for ASD)
  criticalItems: [2, 5, 7, 9, 14, 15],

  responseLabels: ["Sí", "No"],

  // Risk bands: [low_max, medium_max] — above medium_max = high
  riskBands: {
    low: [0, 2],       // 0-2: Low risk
    medium: [3, 7],    // 3-7: Medium risk → follow-up
    high: [8, 20],     // 8-20: High risk → refer
  },
};

// Scoring: count at-risk responses
export function scoreMCHAT(responses) {
  let totalRisk = 0;
  const itemResults = {};

  for (let i = 1; i <= 20; i++) {
    const answer = responses[i]; // 0 = Sí, 1 = No
    if (answer === undefined) continue;

    let atRisk;
    if (mchat.reverseItems.includes(i)) {
      // For items 2, 5, 12: YES (0) = at risk
      atRisk = answer === 0;
    } else {
      // For all others: NO (1) = at risk
      atRisk = answer === 1;
    }

    itemResults[i] = atRisk;
    if (atRisk) totalRisk++;
  }

  // Determine risk level
  let riskLevel;
  if (totalRisk <= 2) riskLevel = "low";
  else if (totalRisk <= 7) riskLevel = "medium";
  else riskLevel = "high";

  // Check critical items
  const criticalFlagged = mchat.criticalItems.filter(i => itemResults[i]);

  return { totalRisk, riskLevel, itemResults, criticalFlagged };
}
