import { P } from "../theme.js";

export const INITIAL_MEMORIES = [
  {
    id: "replica-lazy-sunday",
    title: "Lazy Sunday Morning",
    emotion: "Clean sheets, soft skin, morning light",
    scent: "Replica scent: fresh linen, white musk, soft floral cotton",
    grad: "linear-gradient(135deg, #D7D1C5, #F2EEE6)",
    icon: "☁",
    recommendedAccords: ["Clean Skin Musk", "White Floral", "Sandalwood Cream"],
    breakdown: [
      { name: "Clean Skin Musk", accord: 38, fit: 94, color: P.roseDust },
      { name: "White Floral", accord: 32, fit: 89, color: P.blush },
      { name: "Sandalwood Cream", accord: 20, fit: 86, color: P.gold },
    ],
  },
  {
    id: "replica-beach-walk",
    title: "Beach Walk",
    emotion: "Sun on skin, salt air, warm sand",
    scent: "Replica scent: sunscreen warmth, sea breeze, creamy coconut",
    grad: "linear-gradient(135deg, #BFAE8A, #E8D2A6)",
    icon: "◌",
    recommendedAccords: ["Sea Salt Breeze", "Coconut Silk", "Bergamot Bright"],
    breakdown: [
      { name: "Sea Salt Breeze", accord: 34, fit: 91, color: P.sage },
      { name: "Coconut Silk", accord: 31, fit: 88, color: P.gold },
      { name: "Bergamot Bright", accord: 21, fit: 82, color: P.roseDust },
    ],
  },
  {
    id: "replica-by-the-fireplace",
    title: "By the Fireplace",
    emotion: "Crackling wood, vanilla warmth, smoky comfort",
    scent: "Replica scent: burning wood, chestnut, sweet smoke",
    grad: "linear-gradient(135deg, #6D3F23, #C78955)",
    icon: "◇",
    recommendedAccords: ["Cedarwood Smoke", "Warm Vanilla", "Spiced Clove"],
    breakdown: [
      { name: "Cedarwood Smoke", accord: 36, fit: 92, color: P.gold },
      { name: "Warm Vanilla", accord: 30, fit: 90, color: P.roseDust },
      { name: "Spiced Clove", accord: 22, fit: 84, color: P.blush },
    ],
  },
  {
    id: "replica-jazz-club",
    title: "Jazz Club",
    emotion: "Aged rum, tobacco leaf, leather seats",
    scent: "Replica scent: smoky rum, pink pepper, polished woods",
    grad: "linear-gradient(135deg, #5D3826, #A26D45)",
    icon: "◆",
    recommendedAccords: ["Tobacco & Rum", "Warm Vanilla", "Cedarwood Smoke"],
    breakdown: [
      { name: "Tobacco & Rum", accord: 37, fit: 91, color: P.gold },
      { name: "Warm Vanilla", accord: 28, fit: 86, color: P.roseDust },
      { name: "Cedarwood Smoke", accord: 23, fit: 82, color: P.sage },
    ],
  },
  {
    id: "replica-from-the-garden",
    title: "From the Garden",
    emotion: "Tomato leaf, wet soil, green sunlight",
    scent: "Replica scent: tomato leaf, earthy green, garden air",
    grad: "linear-gradient(135deg, #687D5B, #B6C098)",
    icon: "○",
    recommendedAccords: ["Fig & Leaf", "Garden Rain", "Green Mandarin"],
    breakdown: [
      { name: "Fig & Leaf", accord: 36, fit: 90, color: P.sage },
      { name: "Garden Rain", accord: 31, fit: 87, color: P.gold },
      { name: "Green Mandarin", accord: 19, fit: 81, color: P.roseDust },
    ],
  },
  {
    id: "replica-on-a-date",
    title: "On a Date",
    emotion: "Ripe grapes, rose petals, golden evening",
    scent: "Replica scent: rose, blackcurrant liquor, warm patchouli",
    grad: "linear-gradient(135deg, #8E5363, #D5A0A0)",
    icon: "●",
    recommendedAccords: ["Rose Petals", "Honeyed Blossom", "Warm Amber"],
    breakdown: [
      { name: "Rose Petals", accord: 35, fit: 89, color: P.blush },
      { name: "Honeyed Blossom", accord: 28, fit: 84, color: P.gold },
      { name: "Warm Amber", accord: 22, fit: 82, color: P.roseDust },
    ],
  },
];

export const DUMMY_UPLOAD_MEMORIES = [
  {
    title: "Sunset in Lisbon",
    emotion: "Golden light, Salt air, Warm skin",
    scent: "Orange peel, sea salt, warm amber, clean cotton",
    grad: "linear-gradient(135deg, #2D2D2D, #777777)",
    icon: "📸",
    breakdown: [
      { name: "Solar Citrus", accord: 32, fit: 88, color: P.gold },
      { name: "Sea Salt", accord: 24, fit: 79, color: P.sage },
      { name: "Warm Amber", accord: 27, fit: 92, color: P.roseDust },
    ],
  },
  {
    title: "Midnight in Seoul",
    emotion: "Neon rain, Cool silk, City air",
    scent: "Black tea steam, rain-soaked pavement, soft skin musk",
    grad: "linear-gradient(135deg, #59667A, #9EA7B2)",
    icon: "🌃",
    breakdown: [
      { name: "Black Tea Steam", accord: 31, fit: 86, color: P.gold },
      { name: "Rain Mineral", accord: 26, fit: 80, color: P.sage },
      { name: "Skin Musk", accord: 24, fit: 91, color: P.roseDust },
    ],
  },
  {
    title: "Sunday in Marrakech",
    emotion: "Dry heat, Orange blossom, Spiced wind",
    scent: "Orange flower, saffron dust, cedar shade",
    grad: "linear-gradient(135deg, #C68854, #E0B27D)",
    icon: "☀️",
    breakdown: [
      { name: "Orange Blossom", accord: 30, fit: 84, color: P.blush },
      { name: "Saffron Wood", accord: 25, fit: 82, color: P.gold },
      { name: "Cedar Frame", accord: 23, fit: 78, color: P.sage },
    ],
  },
  {
    title: "Morning in Copenhagen",
    emotion: "Cold light, Linen shirt, Pear water",
    scent: "Pear skin, clean cotton, pale cedar",
    grad: "linear-gradient(135deg, #C9CEC8, #E8E2D8)",
    icon: "🕊",
    breakdown: [
      { name: "Pear Water", accord: 29, fit: 81, color: P.gold },
      { name: "Linen Accord", accord: 27, fit: 87, color: P.roseDust },
      { name: "Paper Cedar", accord: 22, fit: 76, color: P.sage },
    ],
  },
  {
    title: "After Rain in Ubud",
    emotion: "Wet leaves, Temple smoke, Quiet earth",
    scent: "Hinoki wood, green tea vapor, damp soil",
    grad: "linear-gradient(135deg, #7B8B71, #B7BEA1)",
    icon: "🌿",
    breakdown: [
      { name: "Hinoki Woods", accord: 33, fit: 90, color: P.sage },
      { name: "Green Tea Steam", accord: 25, fit: 84, color: P.gold },
      { name: "Earth Accord", accord: 21, fit: 79, color: P.roseDust },
    ],
  },
  {
    title: "Twilight in Paris",
    emotion: "Powdered iris, Lipstick case, Velvet air",
    scent: "Iris butter, suede musk, vanilla skin",
    grad: "linear-gradient(135deg, #B6949D, #E0C4BF)",
    icon: "🎞",
    breakdown: [
      { name: "Iris Butter", accord: 30, fit: 89, color: P.blush },
      { name: "Suede Musk", accord: 26, fit: 85, color: P.roseDust },
      { name: "Velvet Vanilla", accord: 22, fit: 83, color: P.gold },
    ],
  },
];

export const MEMORY_PROMPTS = INITIAL_MEMORIES;

export const STORE_LOCATIONS = [
  { id: "store-sg", city: "Singapore", name: "ION Orchard Counter", area: "Orchard", address: "B2, ION Orchard, 2 Orchard Turn", hours: "10:00 - 22:00", service: "Decode scan + refills", distance: "1.4 km", tags: ["Nearest", "Decode", "Refill"] },
  { id: "store-sg-2", city: "Singapore", name: "Marina Bay Sands Counter", area: "Marina Bay", address: "The Shoppes at Marina Bay Sands, B1", hours: "10:30 - 22:00", service: "Decode scan + consultations", distance: "3.8 km", tags: ["Decode", "Consultation"] },
  { id: "store-jkt", city: "Jakarta", name: "Plaza Indonesia Counter", area: "Central Jakarta", address: "Level 1, Plaza Indonesia, Jl. M.H. Thamrin", hours: "10:00 - 22:00", service: "Decode scan available", distance: "When traveling", tags: ["Decode"] },
  { id: "store-jkt-2", city: "Jakarta", name: "Pacific Place Counter", area: "SCBD", address: "Ground Floor, Pacific Place Mall, SCBD", hours: "10:00 - 22:00", service: "Decode scan + refills", distance: "When traveling", tags: ["Refill", "Decode"] },
  { id: "store-seoul", city: "Seoul", name: "The Hyundai Seoul", area: "Yeouido", address: "Level 1, The Hyundai Seoul", hours: "10:30 - 20:00", service: "Decode scan available", distance: "When traveling", tags: ["Decode"] },
  { id: "store-tokyo", city: "Tokyo", name: "Ginza Six Counter", area: "Ginza", address: "Ground Floor, Ginza Six", hours: "10:30 - 20:30", service: "Decode scan + consultations", distance: "When traveling", tags: ["Consultation", "Decode"] },
  { id: "store-paris", city: "Paris", name: "Le Bon Marche Counter", area: "7th arrondissement", address: "24 Rue de Sevres, Paris", hours: "10:00 - 20:00", service: "Decode scan available", distance: "When traveling", tags: ["Decode"] },
];

export const SHOP_ITEMS = [
  { id: "shop-warm-amber", name: "Warm Amber", type: "15ml cartridge", price: "$49", notes: "Amber · Benzoin · Tonka", color: P.gold },
  { id: "shop-clean-skin-musk", name: "Clean Skin Musk", type: "15ml cartridge", price: "$49", notes: "Ambrette Seeds · Musks · Iris Accord", color: P.roseDust },
  { id: "shop-fig-leaf", name: "Fig & Leaf", type: "15ml cartridge", price: "$49", notes: "Fig Absolute · Tomato Leaf Accord · Green Galbanum", color: P.sage },
  { id: "shop-travel-set", name: "Personal Chapter Set", type: "3 cartridge edit", price: "$138", notes: "Warm Amber · Clean Skin Musk · Fig & Leaf", color: P.goldLight },
];

export const FAMILY_STYLES = {
  "for-you": { border: P.charcoal, bg: P.charcoal, text: P.ivory },
  "warm-spice": { border: "#8E5B31", bg: "#F3F3F5", text: "#653A20" },
  "amber-oriental": { border: "#9C7B3F", bg: "#F3F3F5", text: "#6D552A" },
  "fresh-citrus": { border: "#A1A36D", bg: "#EBEAD7", text: "#6A6B43" },
  "fresh-green": { border: "#71846B", bg: "#E5E9DF", text: "#4D5E49" },
  woody: { border: "#7B604D", bg: "#F4F4F4", text: "#574234" },
  floral: { border: "#9B747F", bg: "#EADDE0", text: "#6E5059" },
  "earthy-musk": { border: "#70695B", bg: "#E4DED2", text: "#504A40" },
  gourmand: { border: "#8B5838", bg: "#F3F3F5", text: "#633D29" },
};

export const FAMILY_LABELS = {
  "amber-oriental": "Amber Oriental",
  "earthy-musk": "Earthy Musk",
  "fresh-citrus": "Fresh Citrus",
  "fresh-green": "Fresh Green",
  floral: "Floral",
  gourmand: "Gourmand",
  "warm-spice": "Warm Spice",
  woody: "Woody",
};


export const ACCORD_LIBRARY = [
  { name: "Cedarwood Smoke", family: "woody", layer: "Base", notes: "Cashmeran · Cedarwood · Birch tar", match: 84, pref: "Woody fit", color: "#8A6A4E", desc: "A crackling fireplace, burnt cedar, the air after a campfire.", inspiration: "By the Fireplace (2015)", character: "Warm, smoky, dry", pairsWellWith: "Warm Vanilla, Spiced Clove, Patchouli Earth", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Sandalwood Cream", family: "woody", layer: "Base", notes: "Sandalwood · Musks · Iso E Super", match: 88, pref: "Woody fit", color: "#B89878", desc: "Warm skin, creamy sandalwood, sun-dried cotton.", inspiration: "Bubble Bath (2020), Lazy Sunday Morning (2013)", character: "Soft, milky, comforting", pairsWellWith: "White Floral, Clean Skin Musk, Warm Amber", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Oud Dark", family: "woody", layer: "Base", notes: "Oud · Labdanum · Gaiac Wood", match: 72, pref: "Woody fit", color: "#6D5647", desc: "Ancient wood, incense, the quiet inside a temple or mosque.", inspiration: "Whispers in the Library (2019)", character: "Deep, resinous, mysterious", pairsWellWith: "Incense & Resin, Rose Petals, Spiced Clove", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Bergamot Bright", family: "fresh-citrus", layer: "Top", notes: "Bergamot Essence · Petitgrain · Neroli", match: 78, pref: "Fresh fit", color: "#AAB66A", desc: "A cup of Earl Grey, Italian sunshine, fresh linen in the morning.", inspiration: "Beach Walk (2012)", character: "Zesty, clean, uplifting", pairsWellWith: "Sea Salt Breeze, White Floral, Clean Skin Musk", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Sea Salt Breeze", family: "fresh-citrus", layer: "Top", notes: "Ambergris Accord · Seaweed · Calone", match: 74, pref: "Fresh fit", color: "#8FB2AD", desc: "Ocean spray, damp sand, coastal wind on a warm afternoon.", inspiration: "Beach Walk (2012), Sailing Day (2017)", character: "Aquatic, salty, airy", pairsWellWith: "Bergamot Bright, Garden Rain, Tiare Garden", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Green Mandarin", family: "fresh-citrus", layer: "Top", notes: "Mandarin Essence · Lime · Grapefruit", match: 80, pref: "Fresh fit", color: "#C2B65A", desc: "Just-peeled citrus, morning market stalls, garden after light rain.", inspiration: "Under the Lemon Trees (2018), From the Garden (2023)", character: "Juicy, sparkly, fresh", pairsWellWith: "Fig & Leaf, Bergamot Bright, Garden Rain", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Rose Petals", family: "floral", layer: "Heart", notes: "Isparta Rose Essence · Geranium · Orris", match: 76, pref: "Floral fit", color: P.blush, desc: "Fresh-cut roses, a bouquet just received, morning dew on petals.", inspiration: "On a Date (2022), Lipstick On (2015)", character: "Classic, romantic, powdery", pairsWellWith: "White Floral, Warm Vanilla, Oud Dark", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "White Floral", family: "floral", layer: "Heart", notes: "Jasmine Absolute · Tuberose · White Musks", match: 86, pref: "Floral fit", color: "#D6C6A8", desc: "Jasmine, gardenia, the moment before a kiss, clean warm skin.", inspiration: "Lazy Sunday Morning (2013)", character: "Clean, transparent, skin-close", pairsWellWith: "Bergamot Bright, Sandalwood Cream, Soft Praline", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Tiare Garden", family: "floral", layer: "Heart", notes: "Tiare Absolute · Ylang Ylang · Coconut Milk", match: 73, pref: "Floral fit", color: "#D8B78D", desc: "Tropical island flowers, warm humidity, a Bali resort pool at dusk.", inspiration: "Beach Walk (2012), On a Date (2022)", character: "Warm, tropical, heady", pairsWellWith: "Sea Salt Breeze, Coconut Silk, Bergamot Bright", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Warm Vanilla", family: "warm-spice", layer: "Base", notes: "Vanilla Beans · Benzyl Benzoate · Tonka Bean", match: 92, pref: "High affinity", color: "#B78A32", desc: "Grandmother's kitchen, vanilla pod in warm milk, baked dough.", inspiration: "By the Fireplace (2015), Afternoon Delight", character: "Sweet, comforting, nostalgic", pairsWellWith: "Cedarwood Smoke, Rose Petals, Coffee & Cream", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)", badge: true },
  { name: "Tobacco & Rum", family: "warm-spice", layer: "Heart", notes: "Rum Absolute · Tobacco Leaf · Pink Pepper Essence", match: 82, pref: "Warm fit", color: "#8C5D3F", desc: "A jazz bar, aged rum in a glass, old leather armchairs, cigars.", inspiration: "Jazz Club (2013)", character: "Rich, dark, smoky-sweet", pairsWellWith: "Warm Vanilla, Cedarwood Smoke, Patchouli Earth", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Spiced Clove", family: "warm-spice", layer: "Heart", notes: "Clove Oil · Cardamom · Cinnamon · Nutmeg", match: 79, pref: "Warm fit", color: "#A4642A", desc: "Mulled wine, spice markets, a Marrakech afternoon, winter warmth.", inspiration: "By the Fireplace (2015), Autumn Vibes (2021)", character: "Exotic, warm, aromatic", pairsWellWith: "Warm Amber, Cedarwood Smoke, Rose Petals", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Clean Skin Musk", family: "earthy-musk", layer: "Base", notes: "Ambrette Seeds · Musks · Iris Accord", match: 91, pref: "Skin fit", color: P.roseDust, desc: "Fresh-from-shower warmth, clean cotton, a second-skin scent.", inspiration: "Lazy Sunday Morning (2013), Bubble Bath (2020)", character: "Soft, intimate, barely-there", pairsWellWith: "White Floral, Bergamot Bright, Sandalwood Cream", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)", badge: true },
  { name: "Patchouli Earth", family: "earthy-musk", layer: "Base", notes: "Patchouli Essence · Vetiver · Oakmoss", match: 77, pref: "Earthy fit", color: "#7E7662", desc: "Forest floor, raw earth after rain, old books in a library.", inspiration: "Whispers in the Library (2019), Soul of the Forest", character: "Deep, rich, grounding", pairsWellWith: "Tobacco & Rum, Oud Dark, Incense & Resin", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Vetiver Smoke", family: "earthy-musk", layer: "Base", notes: "Vetiver Oil · Guaiac Wood · Smoked Notes", match: 70, pref: "Earthy fit", color: "#77695C", desc: "Pencil shavings, grey sky, a rainy afternoon, smoked earth.", inspiration: "Soul of the Forest (2016), Autumn Vibes (2021)", character: "Earthy, dry, smoky-cool", pairsWellWith: "Cedarwood Smoke, Green Mandarin, Spiced Clove", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Warm Amber", family: "amber-oriental", layer: "Base", notes: "Labdanum · Benzoin · Amber Accord", match: 94, pref: "High affinity", color: "#B78A32", desc: "Golden amber resin, warm stone in sunlight, the last rays of sunset.", inspiration: "By the Fireplace (2015), Afternoon Delight (2022)", character: "Golden, resinous, enveloping", pairsWellWith: "Spiced Clove, Warm Vanilla, Rose Petals", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)", badge: true },
  { name: "Incense & Resin", family: "amber-oriental", layer: "Heart", notes: "Olibanum · Myrrh · Cistus Labdanum", match: 78, pref: "Amber fit", color: "#9B6F3A", desc: "Frankincense, church candles, a meditation room, ancient temples.", inspiration: "Whispers in the Library (2019)", character: "Mystical, smoky, sacred", pairsWellWith: "Patchouli Earth, Oud Dark, Vetiver Smoke", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Honeyed Blossom", family: "amber-oriental", layer: "Heart", notes: "Orange Blossom · Beeswax Absolute · Honey Accord", match: 83, pref: "Amber fit", color: "#C99B4A", desc: "Orange blossom honey, beeswax candles, sun-warmed flowers.", inspiration: "On a Date (2022), Lipstick On (2015)", character: "Sweet, waxy, golden", pairsWellWith: "Warm Vanilla, White Floral, Soft Praline", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Garden Rain", family: "fresh-green", layer: "Top", notes: "Petrichor Accord · Geranium · Green Notes", match: 81, pref: "Green fit", color: P.sage, desc: "Wet soil, crushed herbs, rain on warm grass, an open garden.", inspiration: "From the Garden (2023), When the Rain Stops (2022)", character: "Green, watery, clean", pairsWellWith: "Fig & Leaf, Bergamot Bright, Patchouli Earth", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Fig & Leaf", family: "fresh-green", layer: "Heart", notes: "Fig Absolute · Tomato Leaf Accord · Green Galbanum", match: 86, pref: "Green fit", color: "#7E9874", desc: "A split fig tree, milky green sap, a Mediterranean garden at noon.", inspiration: "From the Garden (2023), Under the Lemon Trees (2018)", character: "Green-fruity, milky, fresh", pairsWellWith: "Garden Rain, Bergamot Bright, White Floral", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Mint Breeze", family: "fresh-green", layer: "Top", notes: "Spearmint · Peppermint · Green Tea Accord", match: 72, pref: "Green fit", color: "#88A68B", desc: "Spearmint, cold water rushing over rocks, mountain morning air.", inspiration: "Matcha Meditation (2021)", character: "Cool, sharp, invigorating", pairsWellWith: "Green Mandarin, Sea Salt Breeze, Bergamot Bright", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Coffee & Cream", family: "gourmand", layer: "Heart", notes: "Coffee Absolute · Milk Accord · Madeleine Note", match: 85, pref: "Gourmand fit", color: "#8F5A37", desc: "A Parisian cafe in the morning, steamed milk, freshly pulled espresso.", inspiration: "Coffee Break (2019)", character: "Warm, roasty, comforting", pairsWellWith: "Warm Vanilla, Patchouli Earth, Spiced Clove", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Coconut Silk", family: "gourmand", layer: "Heart", notes: "Coconut Milk Accord · Ylang Ylang · White Musks", match: 80, pref: "Gourmand fit", color: "#D6BA8A", desc: "Sunscreen on warm skin, a beach holiday, sweet tropical fruit.", inspiration: "Beach Walk (2012), Chasing Sunsets", character: "Tropical, sweet, sun-kissed", pairsWellWith: "Sea Salt Breeze, Tiare Garden, Bergamot Bright", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
  { name: "Soft Praline", family: "gourmand", layer: "Base", notes: "Praline Accord · Benzyl Benzoate · Coumarin", match: 82, pref: "Gourmand fit", color: "#B57955", desc: "A Parisian patisserie, warm caramel, toasted almonds, winter comfort.", inspiration: "Afternoon Delight (2022), Jazz Club (2013)", character: "Sweet, nutty, cozy", pairsWellWith: "Warm Vanilla, Coffee & Cream, Warm Amber", origin: "Replica-inspired accord cartridge (not an existing Replica EDT)" },
];
