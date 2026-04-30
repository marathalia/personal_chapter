import { P } from "../theme.js";

export function getLiveOlfactiveMap(carts, ratios) {
  const layerDefaults = [
    { tier: "Top", time: "0-15 min", role: "First impression" },
    { tier: "Heart", time: "15 min-3 hr", role: "Main character" },
    { tier: "Base", time: "3-8 hr", role: "Longest trail" },
  ];
  const noteMap = {
    "Warm Amber": { notes: "Amber resin", effect: "warmth rises on skin" },
    "Clean Skin Musk": { notes: "Skin musk", effect: "keeps the blend close" },
    "Fig & Leaf": { notes: "Fig leaf", effect: "adds green lift" },
    "Skin Musk": { notes: "Skin musk", effect: "softens the dry-down" },
    "Fig Leaf": { notes: "Fig leaf", effect: "adds green lift" },
  };
  return layerDefaults.map((layer, index) => {
    const cart = carts[index] || {};
    const mapped = noteMap[cart.name] || { notes: cart.name || layer.tier, effect: layer.role.toLowerCase() };
    return {
      ...layer,
      name: cart.name || layer.tier,
      notes: mapped.notes,
      effect: mapped.effect,
      ratio: ratios[index] || 0,
      color: cart.color || P.gold,
    };
  });
}
