export function getMemoryRecommendedAccords(memory, accordLibrary) {
  const text = `${memory.title || ""} ${memory.emotion || ""} ${memory.scent || ""}`.toLowerCase();
  const familyWeights = {
    "amber-oriental": ["amber", "gold", "golden", "sunset", "warm", "resin", "glow", "light"],
    "earthy-musk": ["skin", "silk", "cotton", "musk", "quiet", "soft", "linen", "clean"],
    "fresh-citrus": ["citrus", "orange", "bergamot", "pear", "bright", "morning", "air", "salt"],
    "fresh-green": ["rain", "green", "leaf", "garden", "tea", "wet", "ubud", "stone"],
    floral: ["flower", "floral", "iris", "rose", "jasmine", "blossom", "petal"],
    gourmand: ["coffee", "cream", "vanilla", "milk", "praline", "sweet", "kitchen"],
    "warm-spice": ["spice", "heat", "rum", "tobacco", "bar", "marrakech", "saffron"],
    woody: ["wood", "cedar", "hinoki", "smoke", "temple", "earth", "library"],
  };

  const scored = accordLibrary.map((accord) => {
    const noteText = `${accord.name} ${accord.notes} ${accord.desc} ${accord.character || ""}`.toLowerCase();
    const breakdownScore = (memory.breakdown || []).some((item) => {
      const parts = item.name.toLowerCase().split(/\s+/).filter(Boolean);
      return parts.some((part) => part.length > 3 && noteText.includes(part));
    }) ? 28 : 0;
    const familyScore = (familyWeights[accord.family] || []).reduce((score, word) => score + (text.includes(word) ? 10 : 0), 0);
    const noteScore = accord.notes.toLowerCase().split(" · ").reduce((score, note) => score + (text.includes(note.split(" ")[0]) ? 5 : 0), 0);
    return { accord, score: breakdownScore + familyScore + noteScore + accord.match / 20 };
  });

  const ranked = scored
    .sort((a, b) => b.score - a.score)
    .map((item) => item.accord);

  const pinned = (memory.recommendedAccords || [])
    .map((name) => accordLibrary.find((accord) => accord.name === name))
    .filter(Boolean);

  const fallback = ["Warm Amber", "Clean Skin Musk", "Fig & Leaf"]
    .map((name) => accordLibrary.find((accord) => accord.name === name))
    .filter(Boolean);

  return [...pinned, ...ranked, ...fallback]
    .filter((accord, index, all) => accord && all.findIndex((item) => item.name === accord.name) === index)
    .slice(0, 8);
}

export function getMemoryLayerBlendCarts(memory, baseCarts, accordLibrary) {
  if (!memory) return baseCarts;

  const scoredAccords = getMemoryRecommendedAccords(memory, accordLibrary)
    .map((accord, index) => {
      const loadedCart = baseCarts.find((cart) => cart.name === accord.name);
      const skinFit = memory.fitScores?.[accord.name]?.skin ?? accord.match;
      return {
        ...accord,
        level: loadedCart?.level ?? Math.max(42, Math.min(92, skinFit - index * 3)),
        skinFit,
      };
    })
    .sort((a, b) => b.skinFit - a.skinFit);

  const layerBest = ["Top", "Heart", "Base"]
    .map((layer) => scoredAccords.find((accord) => accord.layer === layer))
    .filter(Boolean);

  const blendCarts = [
    ...layerBest,
    ...scoredAccords.filter((accord) => !layerBest.some((picked) => picked.name === accord.name)),
  ].slice(0, 3);

  return blendCarts.length === 3 ? blendCarts : baseCarts;
}

export function getReplicaMemoryWearAnalysis(memory, hasSkinID) {
  const [opening, heart, drydown] = (memory.breakdown || []).slice(0, 3);
  const profileLabel = hasSkinID ? "skin ID" : "current profile";
  const cue = (memory.emotion || "").toLowerCase();

  const topSummary = hasSkinID
    ? `On this ${profileLabel}, ${memory.title} opens through ${opening?.name || "the top accord"} first, then settles into a more personal dry-down.`
    : `Without Decode, this reads as a profile-based preview of how ${memory.title} may evolve before a verified skin reading is added.`;

  const amplification = opening?.fit && opening.fit >= 90
    ? `${opening.name} is the clearest match on this ${profileLabel}, so that facet comes forward first.`
    : `${heart?.name || opening?.name || "The central accord"} stays most stable through wear on this ${profileLabel}.`;

  const drydownLine = drydown
    ? `${drydown.name} is what lingers longer on skin, so the scent finishes softer and more personal than it opens.`
    : "The dry-down stays close to skin and becomes more intimate over time.";

  return {
    eyebrow: hasSkinID ? "Replica wear analysis" : "Replica profile analysis",
    title: hasSkinID ? "How it evolves on this skin ID" : "How it may wear on this profile",
    summary: topSummary,
    amplification,
    drydownLine,
    cueLine: cue ? `This memory reads as ${cue} on first impression.` : "",
    stages: [
      opening && {
        stage: "Opening",
        name: opening.name,
        fit: opening.fit,
        text: `First impression: ${opening.name.toLowerCase()} gives the scent its opening direction.`,
      },
      heart && {
        stage: "Heart",
        name: heart.name,
        fit: heart.fit,
        text: `${heart.name} shapes the signature once the opening softens.`,
      },
      drydown && {
        stage: "Dry-down",
        name: drydown.name,
        fit: drydown.fit,
        text: `${drydown.name} stays closest to skin in the final wear.`,
      },
    ].filter(Boolean),
  };
}
