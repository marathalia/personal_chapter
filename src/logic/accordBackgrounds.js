export function getAccordSceneBackground(accord) {
  const scenes = {
    "fresh-citrus": "linear-gradient(180deg, rgba(15,20,12,0.08), rgba(11,16,9,0.84)), radial-gradient(circle at 72% 18%, rgba(238,219,124,0.7), transparent 18%), radial-gradient(circle at 28% 24%, rgba(147,170,92,0.8), transparent 24%), radial-gradient(circle at 82% 52%, rgba(96,125,56,0.95), transparent 16%), linear-gradient(135deg, #425B31, #93A061 48%, #172111)",
    "fresh-green": "linear-gradient(180deg, rgba(12,18,12,0.06), rgba(12,16,10,0.86)), radial-gradient(circle at 22% 18%, rgba(208,226,183,0.58), transparent 19%), radial-gradient(circle at 72% 38%, rgba(112,144,88,0.9), transparent 22%), linear-gradient(135deg, #62765E, #A5AF8E 46%, #1C2418)",
    woody: "linear-gradient(180deg, rgba(21,14,9,0.08), rgba(18,12,8,0.86)), radial-gradient(circle at 18% 70%, rgba(191,139,75,0.42), transparent 23%), linear-gradient(135deg, #3A2418, #8A6347 46%, #19100C)",
    floral: "linear-gradient(180deg, rgba(34,18,23,0.06), rgba(24,13,17,0.84)), radial-gradient(circle at 28% 26%, rgba(238,197,205,0.76), transparent 20%), radial-gradient(circle at 78% 40%, rgba(174,101,124,0.65), transparent 22%), linear-gradient(135deg, #80606B, #D0AEB1 46%, #26161A)",
    "warm-spice": "linear-gradient(180deg, rgba(34,18,9,0.06), rgba(25,13,7,0.86)), radial-gradient(circle at 20% 24%, rgba(222,126,62,0.62), transparent 18%), radial-gradient(circle at 78% 56%, rgba(135,70,34,0.8), transparent 20%), linear-gradient(135deg, #74411F, #C9844B 46%, #221209)",
    "earthy-musk": "linear-gradient(180deg, rgba(18,15,12,0.06), rgba(14,12,10,0.84)), radial-gradient(circle at 22% 28%, rgba(183,174,151,0.44), transparent 21%), radial-gradient(circle at 78% 64%, rgba(101,94,78,0.72), transparent 24%), linear-gradient(135deg, #554D40, #A69A83 48%, #181410)",
    "amber-oriental": "linear-gradient(180deg, rgba(35,22,8,0.06), rgba(21,13,5,0.86)), radial-gradient(circle at 72% 22%, rgba(235,181,79,0.68), transparent 18%), radial-gradient(circle at 24% 62%, rgba(154,105,42,0.8), transparent 22%), linear-gradient(135deg, #6C451C, #C1944B 48%, #1D1106)",
    gourmand: "linear-gradient(180deg, rgba(33,19,10,0.06), rgba(21,12,8,0.86)), radial-gradient(circle at 28% 24%, rgba(220,169,114,0.64), transparent 19%), radial-gradient(circle at 76% 58%, rgba(118,70,42,0.74), transparent 22%), linear-gradient(135deg, #704225, #C09167 46%, #21120B)",
  };

  return scenes[accord.family] || scenes["earthy-musk"];
}

function svgPhotoUri(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function getAccordPhotoBackground(accord) {
  const text = `${accord.name} ${accord.notes} ${accord.desc}`.toLowerCase();
  const seed = Array.from(accord.name).reduce((total, char) => total + char.charCodeAt(0), 0);
  const glowX = 24 + (seed % 52);
  const glowY = 18 + (seed % 48);
  const palettes = {
    woody: ["#15110D", "#5B4433", "#A07854", "#D2B794"],
    "fresh-citrus": ["#10170D", "#4E6739", "#A7A75C", "#F1D982"],
    "fresh-green": ["#10150F", "#536B4E", "#95A983", "#DCE4C6"],
    floral: ["#171113", "#6E5963", "#B88C99", "#E9CDD1"],
    "warm-spice": ["#160E08", "#743C1D", "#BE7340", "#E5B27E"],
    "earthy-musk": ["#14120F", "#5C574D", "#A0998B", "#DED6C8"],
    "amber-oriental": ["#160E05", "#704B20", "#BE8D40", "#EDC778"],
    gourmand: ["#180F08", "#744326", "#B9845F", "#E8C7A4"],
  };
  const p = palettes[accord.family] || palettes["earthy-musk"];
  let motif = `
    <circle cx="${glowX}" cy="${glowY}" r="46" fill="${p[3]}" opacity=".34" filter="url(#blur)"/>
    <circle cx="${92 - glowX / 2}" cy="${118 - glowY / 3}" r="38" fill="${p[2]}" opacity=".22" filter="url(#blur)"/>
  `;

  if (text.includes("sea") || text.includes("salt") || text.includes("ocean") || text.includes("rain")) {
    motif = `
      <path d="M-12 74 C20 58 38 92 70 76 C98 62 112 84 136 70 L136 150 L-12 150Z" fill="${p[2]}" opacity=".42"/>
      <path d="M-18 96 C16 82 40 118 74 98 C102 82 116 106 142 88" stroke="${p[3]}" stroke-width="7" opacity=".58" fill="none"/>
      <path d="M-10 118 C28 102 44 130 82 112 C106 101 120 116 140 104" stroke="#F4EFE6" stroke-width="5" opacity=".48" fill="none"/>
    `;
  } else if (accord.family === "floral" || text.includes("rose") || text.includes("jasmine") || text.includes("tiare")) {
    motif = `
      <ellipse cx="42" cy="54" rx="36" ry="23" fill="${p[3]}" opacity=".34" transform="rotate(-24 42 54)" filter="url(#blur)"/>
      <ellipse cx="72" cy="78" rx="42" ry="26" fill="${p[2]}" opacity=".48" transform="rotate(22 72 78)" filter="url(#blur)"/>
      <ellipse cx="38" cy="104" rx="31" ry="19" fill="${p[3]}" opacity=".24" transform="rotate(18 38 104)"/>
      <circle cx="66" cy="75" r="13" fill="${p[1]}" opacity=".38"/>
    `;
  } else if (accord.family === "woody" || text.includes("wood") || text.includes("oud") || text.includes("cedar")) {
    motif = `
      <rect x="12" y="-8" width="16" height="160" rx="8" fill="${p[3]}" opacity=".14"/>
      <rect x="38" y="-14" width="22" height="174" rx="10" fill="${p[2]}" opacity=".34"/>
      <rect x="70" y="-6" width="14" height="156" rx="7" fill="${p[3]}" opacity=".18"/>
      <path d="M8 34 C28 24 38 46 58 36 C78 27 88 42 110 30" stroke="${p[3]}" stroke-width="3" opacity=".34" fill="none"/>
      <path d="M2 86 C26 74 42 102 68 84 C88 70 104 88 122 76" stroke="${p[3]}" stroke-width="3" opacity=".28" fill="none"/>
    `;
  } else if (accord.family === "fresh-citrus" || text.includes("bergamot") || text.includes("citrus")) {
    motif = `
      <circle cx="38" cy="48" r="26" fill="${p[3]}" opacity=".55"/>
      <circle cx="84" cy="74" r="22" fill="${p[2]}" opacity=".46"/>
      <ellipse cx="68" cy="36" rx="24" ry="11" fill="${p[1]}" opacity=".58" transform="rotate(-34 68 36)"/>
      <ellipse cx="42" cy="96" rx="30" ry="12" fill="${p[1]}" opacity=".44" transform="rotate(26 42 96)"/>
    `;
  } else if (accord.family === "fresh-green" || text.includes("fig") || text.includes("leaf") || text.includes("garden")) {
    motif = `
      <ellipse cx="34" cy="56" rx="30" ry="13" fill="${p[3]}" opacity=".38" transform="rotate(-42 34 56)"/>
      <ellipse cx="70" cy="80" rx="44" ry="16" fill="${p[2]}" opacity=".48" transform="rotate(28 70 80)"/>
      <ellipse cx="96" cy="42" rx="26" ry="10" fill="${p[3]}" opacity=".3" transform="rotate(-18 96 42)"/>
      <path d="M18 118 C48 84 80 76 118 38" stroke="${p[3]}" stroke-width="3" opacity=".36" fill="none"/>
    `;
  } else if (accord.family === "earthy-musk" || text.includes("skin") || text.includes("musk")) {
    motif = `
      <path d="M-10 86 C18 42 44 76 68 44 C92 12 118 48 134 22 L134 150 L-10 150Z" fill="${p[3]}" opacity=".26"/>
      <path d="M-8 116 C28 74 54 112 84 78 C106 54 122 84 138 64" stroke="${p[2]}" stroke-width="14" opacity=".32" fill="none"/>
      <path d="M10 42 C42 18 70 54 112 30" stroke="${p[3]}" stroke-width="6" opacity=".2" fill="none"/>
    `;
  } else {
    motif = `
      <circle cx="42" cy="48" r="34" fill="${p[3]}" opacity=".34" filter="url(#blur)"/>
      <circle cx="82" cy="86" r="42" fill="${p[2]}" opacity=".38" filter="url(#blur)"/>
      <path d="M-8 122 C30 86 58 122 92 82 C112 58 124 68 140 48 L140 150 L-8 150Z" fill="${p[1]}" opacity=".44"/>
    `;
  }

  return svgPhotoUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="144" height="170" viewBox="0 0 120 142">
      <defs>
        <filter id="blur"><feGaussianBlur stdDeviation="10"/></filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer><feFuncA type="table" tableValues="0 .16"/></feComponentTransfer>
        </filter>
      </defs>
      <rect width="120" height="142" fill="${p[0]}"/>
      <rect width="120" height="142" fill="${p[1]}" opacity=".32"/>
      ${motif}
      <rect width="120" height="142" fill="black" opacity=".16"/>
      <rect width="120" height="142" filter="url(#grain)" opacity=".25"/>
    </svg>
  `);
}

export function getMemoryArchiveBackground(memory) {
  if (memory.image) {
    return `linear-gradient(180deg, rgba(10,10,10,0.02), rgba(10,10,10,0.18)), url("${memory.image}")`;
  }

  const text = `${memory.title || ""} ${memory.emotion || ""} ${memory.scent || ""}`.toLowerCase();
  if (text.includes("morning") || text.includes("linen") || text.includes("bed") || text.includes("soft")) {
    return "linear-gradient(180deg, rgba(10,10,10,0.08), rgba(10,10,10,0.32)), radial-gradient(ellipse at 28% 64%, rgba(255,255,255,0.7), transparent 30%), radial-gradient(ellipse at 72% 48%, rgba(180,180,180,0.62), transparent 28%), linear-gradient(135deg, #232323, #9A9A96 48%, #2D2D2B)";
  }
  if (text.includes("park") || text.includes("garden") || text.includes("leaf") || text.includes("green") || text.includes("forest")) {
    return "linear-gradient(180deg, rgba(6,6,6,0.04), rgba(8,8,8,0.36)), repeating-linear-gradient(90deg, rgba(15,15,15,0.56) 0 8px, transparent 8px 30px), linear-gradient(135deg, #191A17, #8E938B 46%, #252720)";
  }
  if (text.includes("fire") || text.includes("smoke") || text.includes("amber") || text.includes("bar") || text.includes("heat")) {
    return "linear-gradient(180deg, rgba(10,10,10,0.06), rgba(10,10,10,0.38)), radial-gradient(ellipse at 50% 70%, rgba(245,245,245,0.9), transparent 20%), radial-gradient(ellipse at 44% 54%, rgba(160,160,160,0.7), transparent 19%), linear-gradient(135deg, #151515, #787878 45%, #222)";
  }
  if (text.includes("beach") || text.includes("sea") || text.includes("salt") || text.includes("lisbon") || text.includes("water")) {
    return "linear-gradient(180deg, rgba(10,10,10,0.04), rgba(10,10,10,0.3)), repeating-linear-gradient(175deg, rgba(255,255,255,0.36) 0 4px, transparent 4px 18px), linear-gradient(135deg, #343839, #B8BBB5 48%, #4A4E4C)";
  }
  if (text.includes("city") || text.includes("seoul") || text.includes("night") || text.includes("neon")) {
    return "linear-gradient(180deg, rgba(10,10,10,0.08), rgba(10,10,10,0.46)), repeating-linear-gradient(90deg, rgba(245,245,245,0.14) 0 2px, transparent 2px 20px), radial-gradient(circle at 70% 30%, rgba(230,230,230,0.48), transparent 18%), linear-gradient(135deg, #111, #70757A 46%, #1F2226)";
  }
  return "linear-gradient(180deg, rgba(10,10,10,0.04), rgba(10,10,10,0.28)), radial-gradient(circle at 44% 38%, rgba(245,245,245,0.55), transparent 24%), linear-gradient(135deg, #20201E, #9B9992 48%, #2C2A27)";
}

export function getMemoryIcon(title, note, mode) {
  const text = `${title} ${note}`.toLowerCase();
  const keywordIcons = [
    { icon: "🌧", words: ["rain", "storm", "gloom", "wet", "drizzle", "cloud"] },
    { icon: "🌆", words: ["city", "seoul", "tokyo", "night", "neon", "rooftop"] },
    { icon: "🌿", words: ["garden", "green", "leaf", "forest", "ubud", "nature"] },
    { icon: "☀️", words: ["sun", "sunset", "warm", "golden", "marrakech", "summer"] },
    { icon: "🏖️", words: ["beach", "salt", "sea", "ocean", "coast", "lisbon"] },
    { icon: "🗼", words: ["paris", "france", "eiffel"] },
    { icon: "🌸", words: ["spring", "flower", "blossom", "floral", "gardenia"] },
    { icon: "❄️", words: ["snow", "winter", "cold", "frost"] },
    { icon: "🌙", words: ["midnight", "moon", "evening", "twilight"] },
    { icon: "☕", words: ["coffee", "cafe", "espresso"] },
  ];

  const match = keywordIcons.find(({ words }) => words.some((word) => text.includes(word)));
  if (match) return match.icon;
  if (mode === "camera") return "📷";
  if (mode === "words") return "✎";
  return "🖼";
}
