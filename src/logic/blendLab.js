export function cloneAccordToDevice(accord) {
  return {
    name: accord.name,
    color: accord.color,
    family: accord.family,
    level: 100,
  };
}

export function getBlendLabInsights(primary, secondary, tertiary) {
  if (!primary || !secondary || !tertiary) return null;
  const pairMap = {
    "amber-oriental|amber-oriental": { compatibility: 86, mood: "golden, resinous, enveloping", result: "Amber facets layer into a warm glowing trail.", opening: "golden resin", heart: "amber warmth", drydown: "soft labdanum" },
    "amber-oriental|floral": { compatibility: 84, mood: "golden, floral, radiant", result: "A luminous floral accord sitting on warm amber light.", opening: "bright petals", heart: "golden bloom", drydown: "warm skin sweetness" },
    "amber-oriental|gourmand": { compatibility: 88, mood: "sweet, resinous, enveloping", result: "Golden resin deepens into a dessert-like warmth.", opening: "honeyed glow", heart: "soft sweetness", drydown: "ambered praline" },
    "amber-oriental|warm-spice": { compatibility: 92, mood: "rich, spiced, luxurious", result: "Warm resin and spice move together with a polished evening trail.", opening: "spice glow", heart: "amber warmth", drydown: "deep resin" },
    "amber-oriental|woody": { compatibility: 90, mood: "rich, grounded, luxurious", result: "A fuller-bodied blend with warm woods and lingering depth.", opening: "resin warmth", heart: "polished wood", drydown: "deep amber cedar" },
    "earthy-musk|amber-oriental": { compatibility: 86, mood: "grounded, resinous, skin-close", result: "Earth and amber create a deeper skin-warm signature.", opening: "warm earth", heart: "resin texture", drydown: "ambered skin" },
    "earthy-musk|earthy-musk": { compatibility: 82, mood: "grounded, intimate, textured", result: "Earthy musk notes stay close and quietly persistent.", opening: "mineral softness", heart: "damp earth", drydown: "skin musk" },
    "earthy-musk|fresh-green": { compatibility: 82, mood: "rainy, natural, grounded", result: "Wet greens settle into earth and skin-like depth.", opening: "rain-washed green", heart: "damp earth", drydown: "soft moss" },
    "earthy-musk|gourmand": { compatibility: 66, mood: "dark, cozy, contrasting", result: "Sweet warmth and earth create an unusual, more challenging comfort.", opening: "roasted sweetness", heart: "earthy depth", drydown: "dark musk" },
    "earthy-musk|woody": { compatibility: 89, mood: "quiet, elegant, lingering", result: "Smooth woods wrapped in a close-to-skin earthy veil.", opening: "dry softness", heart: "wooded earth", drydown: "soft cedar musk" },
    "floral|floral": { compatibility: 76, mood: "petalled, smooth, airy", result: "A floral-led blend with a soft halo rather than depth.", opening: "petal light", heart: "powdered bloom", drydown: "sheer floral skin" },
    "floral|fresh-citrus": { compatibility: 78, mood: "bright, dewy, airy", result: "A light floral freshness with more lift than body.", opening: "dewy brightness", heart: "petal mist", drydown: "clean floral trace" },
    "floral|fresh-green": { compatibility: 74, mood: "green, blooming, textured", result: "Leafy freshness gives the floral heart a more natural edge.", opening: "green petal air", heart: "living bloom", drydown: "soft botanical trace" },
    "floral|gourmand": { compatibility: 80, mood: "creamy, dressed-up, sweet", result: "Soft florals become warmer and more edible without losing polish.", opening: "petal cream", heart: "honeyed bloom", drydown: "soft sweetness" },
    "floral|warm-spice": { compatibility: 72, mood: "spiced, romantic, expressive", result: "Petals and spice create drama, but the blend is less effortless.", opening: "bright spice", heart: "warm petals", drydown: "powdered warmth" },
    "floral|woody": { compatibility: 61, mood: "structured, dry, tailored", result: "The blend feels more architectural than seamless, with floral softness pressed against dry woods.", opening: "cool petal air", heart: "dry floral wood", drydown: "textured woody veil" },
    "fresh-citrus|fresh-citrus": { compatibility: 74, mood: "sparkling, sheer, brisk", result: "A clean citrus pairing that feels bright but not especially deep.", opening: "citrus lift", heart: "clear air", drydown: "soft freshness" },
    "fresh-citrus|fresh-green": { compatibility: 88, mood: "airy, crisp, botanical", result: "Fresh green clarity with a calm citrus lift.", opening: "cool citrus-green air", heart: "leafy transparency", drydown: "clean mineral softness" },
    "fresh-citrus|gourmand": { compatibility: 64, mood: "juicy, sweet, playful", result: "Bright citrus cuts through sweetness, but the contrast can feel sharp.", opening: "zesty sugar", heart: "creamy lift", drydown: "soft gourmand skin" },
    "fresh-citrus|warm-spice": { compatibility: 55, mood: "bright, contrasting, unsettled", result: "A sparkly-cool opening sits against warmth in a way that feels intentionally contrasty.", opening: "citrus lift", heart: "split warm-cool tension", drydown: "soft spice" },
    "fresh-citrus|woody": { compatibility: 64, mood: "crisp, dry, directional", result: "A brisk opening anchored by dry woods; refined, but not naturally fluid.", opening: "citrus-wood air", heart: "dry cedar line", drydown: "clean woody skin" },
    "fresh-green|fresh-green": { compatibility: 80, mood: "botanical, rainy, natural", result: "Green notes layer into a fresh garden-like composition.", opening: "wet herbs", heart: "leafy sap", drydown: "soft green skin" },
    "fresh-green|woody": { compatibility: 87, mood: "natural, calm, architectural", result: "Botanical lift anchored by dry, elegant woods.", opening: "leafy clarity", heart: "cedar structure", drydown: "smooth woody skin" },
    "gourmand|gourmand": { compatibility: 78, mood: "sweet, creamy, comforting", result: "Edible warmth builds into a soft nostalgic trail.", opening: "sweet cream", heart: "toasted comfort", drydown: "soft praline" },
    "gourmand|warm-spice": { compatibility: 90, mood: "cozy, rich, nostalgic", result: "Sweet edible warmth and spice feel naturally comforting.", opening: "baked warmth", heart: "spiced cream", drydown: "soft dessert skin" },
    "warm-spice|warm-spice": { compatibility: 84, mood: "aromatic, warm, textured", result: "Layered spices create a rich, atmospheric warmth.", opening: "spiced lift", heart: "mulled warmth", drydown: "soft tobacco spice" },
    "warm-spice|woody": { compatibility: 90, mood: "rich, grounded, luxurious", result: "Spiced warmth sits beautifully over dry wood structure.", opening: "warm spice", heart: "polished wood", drydown: "deep cedar warmth" },
    "woody|woody": { compatibility: 82, mood: "dry, grounded, refined", result: "A woody-led composition with calm structure and a quieter trail.", opening: "dry grain", heart: "cedar structure", drydown: "smooth woods" },
  };
  const getPairInsight = (firstFamily, secondFamily) =>
    pairMap[[firstFamily, secondFamily].sort().join("|")] || {
      compatibility: 66,
      mood: "layered, mixed, directional",
      result: "The two accords can work together, but the bridge between them is less instinctive.",
      opening: "lift",
      heart: "texture",
      drydown: "soft trail",
    };

  const pairInsights = [
    getPairInsight(primary.family, secondary.family),
    getPairInsight(primary.family, tertiary.family),
    getPairInsight(secondary.family, tertiary.family),
  ];

  const strongestPair = [...pairInsights].sort((a, b) => b.compatibility - a.compatibility)[0];
  const pairAverage = Math.round(pairInsights.reduce((sum, insight) => sum + insight.compatibility, 0) / pairInsights.length);
  const tertiaryFamilyMap = {
    "amber-oriental": { mood: "more resinous and enveloping", note: "amber glow" },
    "earthy-musk": { mood: "more grounded and skin-close", note: "earthy musk" },
    "fresh-citrus": { mood: "brighter and more lifted", note: "citrus air" },
    "fresh-green": { mood: "more botanical and natural", note: "green texture" },
    "gourmand": { mood: "sweeter and more comforting", note: "edible warmth" },
    "warm-spice": { mood: "warmer and more aromatic", note: "spiced warmth" },
    woody: { mood: "deeper and more structured", note: "dry woods" },
    floral: { mood: "more expressive and polished", note: "petal softness" },
  };
  const tertiaryAdjust = tertiaryFamilyMap[tertiary.family] || { mood: "more layered", note: tertiary.notes.split("·")[0]?.trim() || tertiary.name.toLowerCase() };
  const families = [primary.family, secondary.family, tertiary.family];
  const familyCounts = families.reduce((acc, family) => {
    acc[family] = (acc[family] || 0) + 1;
    return acc;
  }, {});
  const uniqueFamilies = Object.keys(familyCounts).length;
  const warmCount = (familyCounts["warm-spice"] || 0) + (familyCounts["amber-oriental"] || 0) + (familyCounts.gourmand || 0);
  const freshCount = (familyCounts["fresh-citrus"] || 0) + (familyCounts["fresh-green"] || 0);
  const muskyCount = familyCounts["earthy-musk"] || 0;
  const woodyCount = familyCounts.woody || 0;
  const floralCount = familyCounts.floral || 0;
  const gourmandCount = familyCounts.gourmand || 0;

  let harmonyBonus = 0;
  let contrastPenalty = 0;

  if (warmCount >= 1 && muskyCount >= 1) harmonyBonus += 9;
  if (woodyCount >= 1 && muskyCount >= 1) harmonyBonus += 8;
  if (warmCount >= 1 && woodyCount >= 1) harmonyBonus += 7;
  if (freshCount >= 1 && muskyCount >= 1) harmonyBonus += 4;
  if (freshCount >= 1 && floralCount >= 1) harmonyBonus += 3;
  if (uniqueFamilies === 1) harmonyBonus += 4;
  if (uniqueFamilies === 2) harmonyBonus += 2;

  if (warmCount >= 1 && freshCount >= 1) contrastPenalty += 11;
  if (warmCount >= 2 && freshCount >= 1) contrastPenalty += 7;
  if (floralCount >= 1 && woodyCount >= 1 && muskyCount === 0 && warmCount === 0) contrastPenalty += 9;
  if (freshCount >= 1 && woodyCount >= 1 && muskyCount === 0) contrastPenalty += 6;
  if (uniqueFamilies === 3) contrastPenalty += 6;
  if (freshCount >= 1 && warmCount >= 1 && woodyCount >= 1) contrastPenalty += 8;
  if (freshCount >= 1 && warmCount >= 1 && floralCount >= 1) contrastPenalty += 5;

  const accordFit = Math.max(44, Math.min(96, Math.round(pairAverage + harmonyBonus - contrastPenalty)));
  const profileWeighted = Math.round((primary.match + secondary.match + tertiary.match) / 3);
  const fitLift = accordFit >= 88 ? 5 : accordFit >= 78 ? 2 : accordFit >= 68 ? 0 : -5;
  const yourFit = Math.max(41, Math.min(97, Math.round(profileWeighted + fitLift - Math.max(0, uniqueFamilies - 2) * 4 - contrastPenalty / 3)));

  const accordTone =
    accordFit >= 90 ? "These three accords lock together beautifully. The structure feels natural from opening to dry-down."
    : accordFit >= 80 ? "The blend feels convincing overall. There is still some contrast, but it reads as intentional."
    : accordFit >= 68 ? "This trio has a clear idea, but not every note resolves cleanly. It feels more experimental than seamless."
    : accordFit >= 56 ? "Some parts work, but the trio keeps pulling in different directions. It feels noticeably less resolved."
    : "This combination is a poor match as a blend. The note families compete more than they connect.";

  const yourTone =
    yourFit >= 90 ? "This trio also aligns extremely well with your current profile."
    : yourFit >= 80 ? "This trio suits your profile well, even if it is not your easiest match."
    : yourFit >= 68 ? "This trio can still work for you, but it is drifting away from your strongest profile direction."
    : yourFit >= 56 ? "This trio is a weak skin fit for you, even if one or two notes still feel right."
    : "Your profile and this trio are pulling in different directions. It is a poor skin fit.";
  const noteList = (accord) => accord.notes.split("·").map((note) => note.trim().toLowerCase()).filter(Boolean);
  const [primaryNote] = noteList(primary);
  const [secondaryNote] = noteList(secondary);
  const [tertiaryNote] = noteList(tertiary);
  const noteDetail = [primaryNote, secondaryNote, tertiaryNote].filter(Boolean).slice(0, 2).join(" and ");
  const blendStory =
    freshCount >= 1 && muskyCount >= 1
      ? {
          blendName: "Rainwashed Skin",
          result: "Fresh green notes settle into clean skin warmth, with a soft earthy finish.",
          smellLine: `Cool leaves, damp earth, airy musk, and ${noteDetail}.`,
          memoryLine: "A garden walk after rain, sleeves cool, skin freshly clean.",
        }
      : warmCount >= 1 && woodyCount >= 1
        ? {
            blendName: "Amber Wood Hour",
            result: "Warm resin meets dry wood, making the blend polished, deeper, and less sweet.",
            smellLine: `Amber glow, smooth cedar, light smoke, and ${noteDetail}.`,
            memoryLine: "Late light on wood floors before an evening out.",
          }
        : warmCount >= 1 && gourmandCount >= 1
          ? {
              blendName: "Soft Dessert Skin",
              result: "Cozy sweetness sits close to skin, warmed by spice instead of turning sugary.",
              smellLine: `Vanilla warmth, toasted sweetness, soft spice, and ${noteDetail}.`,
              memoryLine: "A warm kitchen at night, dessert cooling nearby.",
            }
          : warmCount >= 1
            ? {
                blendName: "Golden Skin Glow",
                result: "A rounded warm blend with a soft glow, close to skin but still dressed-up.",
                smellLine: `Golden resin, warm cotton, gentle spice, and ${noteDetail}.`,
                memoryLine: "Sunset light, clean fabric, and skin still warm.",
              }
            : floralCount >= 1 && freshCount >= 1
              ? {
                  blendName: "Dewy Petal Air",
                  result: "Fresh air lifts the petals, making the floral side feel dewy and alive.",
                  smellLine: `Fresh petals, green stems, clean air, and ${noteDetail}.`,
                  memoryLine: "Flowers near an open window in morning air.",
                }
              : floralCount >= 1
                ? {
                    blendName: "Soft Petal Trace",
                    result: "A gentle floral blend with a polished finish that stays soft on skin.",
                    smellLine: `Powdered petals, clean musk, soft cream, and ${noteDetail}.`,
                    memoryLine: "Getting ready in soft light with petals nearby.",
                  }
                : freshCount >= 1 && woodyCount >= 1
                  ? {
                      blendName: "Green Cedar Air",
                      result: "Bright freshness gets structure from dry wood, so it feels clean but refined.",
                      smellLine: `Citrus peel, crushed leaves, dry cedar, and ${noteDetail}.`,
                      memoryLine: "Stepping outside after a shower into crisp air.",
                    }
                  : freshCount >= 1
                    ? {
                        blendName: "Clean Morning Air",
                        result: "A bright, easy blend with enough softness to last beyond the opening.",
                        smellLine: `Citrus mist, clean linen, watery greens, and ${noteDetail}.`,
                        memoryLine: "Fresh clothes, clean air, and the day just starting.",
                      }
                    : woodyCount >= 1 && muskyCount >= 1
                      ? {
                          blendName: "Quiet Wood Skin",
                          result: "Wood and musk sit close, giving the blend a quiet, intimate warmth.",
                          smellLine: `Dry cedar, smooth musk, mineral softness, and ${noteDetail}.`,
                          memoryLine: "A calm hotel room with fresh sheets and wood furniture.",
                        }
                      : woodyCount >= 1
                        ? {
                            blendName: "Cedar Shadow",
                            result: "A dry, composed wood blend with less sweetness and more texture.",
                            smellLine: `Cedar grain, dry paper, soft smoke, and ${noteDetail}.`,
                            memoryLine: "A quiet library corner with late light on the table.",
                          }
                        : gourmandCount >= 1
                          ? {
                              blendName: "Warm Kitchen Memory",
                              result: "A familiar sweet blend, softened so it feels cozy rather than sugary.",
                              smellLine: `Creamy sweetness, toasted warmth, soft musk, and ${noteDetail}.`,
                              memoryLine: "Something sweet cooling nearby in a warm kitchen.",
                            }
                          : {
                              blendName: "Quiet Skin Chapter",
                              result: "A subtle personal blend built around texture, softness, and closeness.",
                              smellLine: `Clean skin, muted warmth, soft texture, and ${noteDetail}.`,
                              memoryLine: "A quiet moment after a long day, everything softer.",
                            };

  return {
    ...strongestPair,
    accordFit,
    yourFit,
    title: `${primary.name} · ${secondary.name} · ${tertiary.name}`,
    blendName: blendStory.blendName,
    mood: `${strongestPair.mood}, ${tertiaryAdjust.mood}`,
    result: blendStory.result,
    smellLine: blendStory.smellLine,
    memoryLine: blendStory.memoryLine,
    accordTone,
    yourTone,
  };
}
