export const RATIO_ASSISTANT_STEPS = [
  {
    id: "destination",
    prompt: "Where are you going?",
    options: [
      { id: "office", label: "Office" },
      { id: "dinner", label: "Dinner" },
      { id: "date", label: "Date" },
      { id: "party", label: "Party" },
      { id: "travel", label: "Travel" },
      { id: "home", label: "At home" },
      { id: "other", label: "Other" },
    ],
  },
  {
    id: "mood",
    prompt: "What should the blend feel like?",
    options: [
      { id: "clean", label: "Clean" },
      { id: "warm", label: "Warm" },
      { id: "fresh", label: "Fresh" },
      { id: "romantic", label: "Romantic" },
      { id: "soft", label: "Soft" },
      { id: "bold", label: "Bold" },
      { id: "other", label: "Other" },
    ],
  },
  {
    id: "projection",
    prompt: "How noticeable should it be?",
    options: [
      { id: "subtle", label: "Subtle" },
      { id: "balanced", label: "Balanced" },
      { id: "noticeable", label: "Noticeable" },
      { id: "statement", label: "Statement" },
      { id: "other", label: "Other" },
    ],
  },
  {
    id: "time",
    prompt: "When will you wear it?",
    options: [
      { id: "day", label: "Day" },
      { id: "night", label: "Night" },
      { id: "all-day", label: "All day" },
      { id: "other", label: "Other" },
    ],
  },
];

export function getRatioAssistantAnswerId(answer) {
  if (!answer) return "";
  return typeof answer === "string" ? answer : answer.id || "";
}

export function getRatioAssistantAnswerLabel(step, answer) {
  if (!answer) return "";
  if (typeof answer === "object" && answer.id === "other") {
    return answer.text?.trim() || "Other";
  }
  const answerId = getRatioAssistantAnswerId(answer);
  return step.options.find((option) => option.id === answerId)?.label || "";
}

export const RATIO_ASSISTANT_FAMILY_SHIFTS = {
  destination: {
    office: { "earthy-musk": 4, "fresh-citrus": 3, "fresh-green": 2, floral: 1, "amber-oriental": -1, "warm-spice": -2, gourmand: -1 },
    dinner: { "amber-oriental": 4, "warm-spice": 3, floral: 2, woody: 1, "earthy-musk": 1 },
    date: { floral: 4, "amber-oriental": 2, "earthy-musk": 2, gourmand: 1, "fresh-green": 1 },
    party: { "warm-spice": 4, "amber-oriental": 3, gourmand: 2, woody: 1, "fresh-citrus": 1 },
    travel: { "fresh-citrus": 3, "fresh-green": 3, "earthy-musk": 1, floral: 1 },
    home: { "earthy-musk": 4, woody: 2, gourmand: 1, "fresh-green": 1 },
  },
  mood: {
    clean: { "earthy-musk": 5, "fresh-citrus": 2, "fresh-green": 2, floral: 1, "amber-oriental": -2, "warm-spice": -2, gourmand: -1 },
    warm: { "amber-oriental": 5, "warm-spice": 2, gourmand: 2, woody: 1 },
    fresh: { "fresh-citrus": 5, "fresh-green": 4, "earthy-musk": 1, floral: 1, gourmand: -1 },
    romantic: { floral: 5, "amber-oriental": 2, "earthy-musk": 1, gourmand: 1 },
    soft: { "earthy-musk": 4, floral: 2, gourmand: 1, woody: 1 },
    bold: { "warm-spice": 5, "amber-oriental": 3, woody: 2, gourmand: 1 },
  },
  projection: {
    subtle: { "earthy-musk": 4, "fresh-citrus": 1, floral: 1, "amber-oriental": -1, "warm-spice": -1 },
    balanced: {},
    noticeable: { "amber-oriental": 2, "warm-spice": 2, woody: 1, floral: 1 },
    statement: { "amber-oriental": 4, "warm-spice": 3, woody: 2, gourmand: 1 },
  },
  time: {
    day: { "fresh-citrus": 2, "fresh-green": 2, "earthy-musk": 1, floral: 1, "amber-oriental": -1 },
    night: { "amber-oriental": 2, "warm-spice": 2, woody: 1, gourmand: 1 },
    "all-day": { "earthy-musk": 2, woody: 1, "fresh-green": 1 },
  },
};

export function normalizeSuggestedRatios(scores) {
  const safeScores = scores.map((score) => Math.max(1, score));
  const total = safeScores.reduce((sum, score) => sum + score, 0);
  const ratios = safeScores.map((score) => Math.round((score / total) * 100));
  const minRatio = safeScores.length === 3 ? 14 : 10;

  let sum = ratios.reduce((acc, value) => acc + value, 0);
  while (sum !== 100) {
    const targetIndex = sum > 100
      ? ratios.reduce((best, value, index, arr) => (arr[index] > arr[best] ? index : best), 0)
      : ratios.reduce((best, value, index, arr) => (arr[index] < arr[best] ? index : best), 0);
    ratios[targetIndex] += sum > 100 ? -1 : 1;
    sum = ratios.reduce((acc, value) => acc + value, 0);
  }

  let adjusted = true;
  while (adjusted) {
    adjusted = false;
    for (let index = 0; index < ratios.length; index += 1) {
      if (ratios[index] >= minRatio) continue;
      const donor = ratios.reduce((best, value, donorIndex, arr) => {
        if (donorIndex === index) return best;
        return arr[donorIndex] > arr[best] ? donorIndex : best;
      }, 0);
      if (donor === index || ratios[donor] <= minRatio) continue;
      ratios[index] += 1;
      ratios[donor] -= 1;
      adjusted = true;
    }
  }

  sum = ratios.reduce((acc, value) => acc + value, 0);
  if (sum !== 100) {
    const targetIndex = ratios.reduce((best, value, index, arr) => (arr[index] > arr[best] ? index : best), 0);
    ratios[targetIndex] += 100 - sum;
  }

  return ratios;
}

export function getRatioAssistantRecommendation(carts, answers, hasProfileInput, hasSkinID) {
  const familyScores = {
    woody: 0,
    "fresh-citrus": 0,
    floral: 0,
    "warm-spice": 0,
    "earthy-musk": 0,
    "amber-oriental": 0,
    "fresh-green": 0,
    gourmand: 0,
  };

  Object.entries(answers).forEach(([stepId, answer]) => {
    const answerId = getRatioAssistantAnswerId(answer);
    const shift = RATIO_ASSISTANT_FAMILY_SHIFTS[stepId]?.[answerId];
    if (!shift) return;
    Object.entries(shift).forEach(([family, value]) => {
      familyScores[family] = (familyScores[family] || 0) + value;
    });
  });

  const scoredCarts = carts.map((cart) => {
    let score = 4 + (familyScores[cart.family] || 0);
    const cartName = cart.name.toLowerCase();

    if (getRatioAssistantAnswerId(answers.mood) === "clean" && cartName.includes("musk")) score += 2;
    if (getRatioAssistantAnswerId(answers.mood) === "warm" && cartName.includes("amber")) score += 2;
    if (getRatioAssistantAnswerId(answers.mood) === "fresh" && (cartName.includes("fig") || cartName.includes("leaf"))) score += 2;
    if (getRatioAssistantAnswerId(answers.destination) === "office" && cartName.includes("musk")) score += 1;
    if (getRatioAssistantAnswerId(answers.destination) === "date" && cartName.includes("amber")) score += 1;
    if (getRatioAssistantAnswerId(answers.destination) === "travel" && (cartName.includes("fig") || cartName.includes("leaf"))) score += 1;
    if (getRatioAssistantAnswerId(answers.time) === "night" && cartName.includes("amber")) score += 1;
    if (getRatioAssistantAnswerId(answers.time) === "day" && cartName.includes("musk")) score += 1;
    if (cart.level < 25) score -= 1.2;

    return { ...cart, score: Math.max(1, score) };
  });

  const ratios = normalizeSuggestedRatios(scoredCarts.map((cart) => cart.score));
  const ranked = scoredCarts
    .map((cart, index) => ({ ...cart, ratio: ratios[index], index }))
    .sort((first, second) => second.ratio - first.ratio);

  const labels = Object.fromEntries(
    RATIO_ASSISTANT_STEPS.map((step) => [
      step.id,
      getRatioAssistantAnswerLabel(step, answers[step.id]),
    ])
  );

  let headline = "Balanced for your plan";
  let summary = "This keeps the blend even while still adapting it to where you are going.";

  if (getRatioAssistantAnswerId(answers.destination) === "office" || getRatioAssistantAnswerId(answers.mood) === "clean") {
    headline = "Clean and polished";
    summary = "This keeps the scent quieter and more put-together, with less weight in the warmer notes.";
  } else if (getRatioAssistantAnswerId(answers.destination) === "date" || getRatioAssistantAnswerId(answers.mood) === "romantic") {
    headline = "Soft and intimate";
    summary = "The suggestion leans warmer and closer to skin so the blend feels more personal than loud.";
  } else if (getRatioAssistantAnswerId(answers.destination) === "party" || getRatioAssistantAnswerId(answers.projection) === "statement" || getRatioAssistantAnswerId(answers.mood) === "bold") {
    headline = "Bolder and more visible";
    summary = "The warmer cartridge leads so the blend reads faster and leaves a clearer trail.";
  } else if (getRatioAssistantAnswerId(answers.destination) === "travel" || getRatioAssistantAnswerId(answers.mood) === "fresh") {
    headline = "Fresh and lifted";
    summary = "This pushes the brighter cartridge up so the blend feels cleaner, lighter, and easier through the day.";
  } else if (getRatioAssistantAnswerId(answers.destination) === "home" || getRatioAssistantAnswerId(answers.mood) === "soft") {
    headline = "Soft and easy";
    summary = "The balance stays relaxed and skin-close, with less pressure on the louder materials.";
  }

  const guidanceLabel = hasSkinID
    ? "Skin-aware suggestion"
    : hasProfileInput
      ? "Memory-aware suggestion"
      : "Occasion-based suggestion";

  return {
    ratios,
    guidanceLabel,
    headline,
    summary,
    answerLine: [labels.destination, labels.mood, labels.projection, labels.time].filter(Boolean).join(" · "),
    rows: ranked.map((cart, index) => ({
      name: cart.name,
      color: cart.color,
      ratio: cart.ratio,
      reason:
        index === 0
          ? "Lead this one."
          : index === 1
            ? "Keep this supporting."
            : "Use this as the accent.",
    })),
  };
}
