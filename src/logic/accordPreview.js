import { FAMILY_LABELS } from "../data/catalog.js";

export function getAccordPreview(acc, hasSkinID) {
  const familyTitles = {
    "amber-oriental": "Golden, resinous, and enveloping",
    "earthy-musk": "Grounded and skin-close",
    "fresh-citrus": "Bright and transparent",
    "fresh-green": "Botanical and rain-washed",
    gourmand: "Comforting and edible",
    "warm-spice": "Warm, aromatic, and nostalgic",
    woody: "Textural and grounding",
    floral: "Soft-focus and expressive",
  };

  const familyMoments = {
    "amber-oriental": "best after sunset or whenever you want a golden trail",
    "earthy-musk": "best when you want something grounded and intimate",
    "fresh-citrus": "best in the morning or warm weather",
    "fresh-green": "best for daytime, rain, gardens, and clean air",
    gourmand: "best when you want comfort, warmth, and softness",
    "warm-spice": "best for evening, colder weather, and textured layers",
    woody: "best when you want quiet depth",
    floral: "best for dressed-up daytime or dinner",
  };

  const familyImpressions = {
    "amber-oriental": "It starts glowing, then settles into a rich second-skin warmth.",
    "earthy-musk": "It stays close to the body and becomes more beautiful with warmth.",
    "fresh-citrus": "It opens bright, then stays clean and softly radiant on skin.",
    "fresh-green": "It opens natural and crisp, then softens into a botanical trail.",
    gourmand: "It begins cozy and sweet, then melts into a soft comforting base.",
    "warm-spice": "It opens aromatic, then settles into a warmer textured dry-down.",
    woody: "It begins dry and refined, then melts into a smoother woody base.",
    floral: "It opens polished and airy, then softens into a rounded floral aura.",
  };

  const notes = acc.notes.split("·").map(note => note.trim());
  const top = notes[0] || acc.notes;
  const heart = notes[1] || notes[0] || acc.notes;
  const base = notes[2] || notes[1] || notes[0] || acc.notes;

  return {
    title: familyTitles[acc.family] || "Refined and easy to wear",
    whyItWorks: hasSkinID
      ? `With a ${acc.match}% skin match, this accord fits your profile because it leans into ${FAMILY_LABELS[acc.family] || acc.family} facets without fighting your skin chemistry.`
      : `This accord fits your current profile because it aligns with the ${FAMILY_LABELS[acc.family] || acc.family} direction and emotional preferences you selected so far.`,
    wearMoment: familyMoments[acc.family] || "best whenever you want a polished signature",
    impression: familyImpressions[acc.family] || "It evolves smoothly and stays elegant through the dry-down.",
    structure: [
      { stage: "Opening", note: top, detail: "The first impression on skin." },
      { stage: "Heart", note: heart, detail: "The character that stays with you." },
      { stage: "Dry down", note: base, detail: "What lingers closest to the body." },
    ],
  };
}
