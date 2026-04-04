import React, { useState, useEffect, useMemo } from "react";

// ─── PALETTE ───
const P = {
  ivory: "#F7F4EF", cream: "#F1ECE5", warmBeige: "#D7D0C7",
  gold: "#9B8E7C", goldLight: "#B7ACA0", blush: "#D4C8BE",
  roseDust: "#8C8379", charcoal: "#1D1A18", warmGray: "#7B746D",
  softPink: "#ECE6DF", sage: "#B7B9AA", deepPlum: "#25211F",
  mist: "#F2EEEA", glassBg: "rgba(255,255,255,0.82)", glassBorder: "rgba(29,26,24,0.08)",
};
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const serif = sans;
const mono = sans;
const splashSerif = sans;

// ─── SHARED ───
function StatusBar() {
  return (
    <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
      <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: P.charcoal }}>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="3" width="3" height="8" rx=".5" fill={P.charcoal}/><rect x="4" y="2" width="3" height="9" rx=".5" fill={P.charcoal}/><rect x="8" y="0" width="3" height="11" rx=".5" fill={P.charcoal}/><rect x="12" y="0" width="3" height="11" rx=".5" fill={P.charcoal} opacity=".3"/></svg>
        <svg width="22" height="12" viewBox="0 0 22 12"><rect x=".5" y=".5" width="18" height="11" rx="2.5" stroke={P.charcoal} fill="none"/><rect x="19" y="3.5" width="2.5" height="5" rx="1" fill={P.charcoal} opacity=".4"/><rect x="2" y="2" width="13" height="8" rx="1.5" fill={P.charcoal}/></svg>
      </div>
    </div>
  );
}

function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "lab", label: "Blend" },
    { id: "explore", label: "Explore" },
    { id: "profile", label: "Profile" },
  ];
  const iconForTab = (id, isActive) => {
    const stroke = isActive ? P.charcoal : "#8C8379";
    const strokeWidth = isActive ? 1.8 : 1.6;
    if (id === "home") {
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="6.4" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
          <circle cx="10" cy="10" r="2.6" fill={isActive ? stroke : "none"} stroke={stroke} strokeWidth={1.2} />
        </svg>
      );
    }
    if (id === "lab") {
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 3.8 16.2 10 10 16.2 3.8 10 10 3.8Z" fill={isActive ? `${stroke}12` : "none"} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    }
    if (id === "explore") {
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true">
          <rect x="4.4" y="4.4" width="11.2" height="11.2" fill={isActive ? `${stroke}12` : "none"} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    }
    return (
      <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="7.2" r="2.4" fill={isActive ? stroke : "none"} stroke={stroke} strokeWidth={1.2} />
        <path d="M5.6 15.6c.9-2.2 2.5-3.3 4.4-3.3s3.5 1.1 4.4 3.3" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    );
  };
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 82, background: "rgba(247,244,239,0.96)", display: "flex", alignItems: "center", justifyContent: "space-around", borderTop: `1px solid rgba(29,26,24,0.08)`, paddingBottom: 12 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: active === t.id ? P.charcoal : P.warmGray, transition: "color 0.3s", opacity: active === t.id ? 1 : 0.82, minWidth: 58 }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 20 }}>{iconForTab(t.id, active === t.id)}</span>
          <span style={{ fontFamily: mono, fontSize: 10, fontWeight: active === t.id ? 600 : 500, letterSpacing: -0.1 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 80 + delay); return () => clearTimeout(t); }, []);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: `all 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`, ...style }}>{children}</div>;
}

function Label({ children }) {
  return <p style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, letterSpacing: 1.4, color: P.warmGray, margin: 0, textTransform: "uppercase" }}>{children}</p>;
}

function Title({ children, style = {} }) {
  return <h2 style={{ fontFamily: sans, fontSize: 32, lineHeight: 1.08, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.8, ...style }}>{children}</h2>;
}

function Btn({ children, onClick, dark, full, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "14px 22px", background: dark ? P.charcoal : P.ivory,
      border: `1px solid ${dark ? P.charcoal : P.glassBorder}`, color: dark ? P.ivory : P.charcoal,
      fontFamily: mono, fontSize: 11, fontWeight: 600, letterSpacing: -0.1,
      borderRadius: 14, cursor: disabled ? "default" : "pointer", transition: "all 0.3s",
      width: full ? "100%" : "auto", opacity: disabled ? 0.4 : 1, ...style,
    }}>{children}</button>
  );
}

function Glass({ children, style = {} }) {
  return <div style={{ background: P.cream, border: `1px solid ${P.glassBorder}`, borderRadius: 18, padding: 16, boxShadow: "0 10px 28px rgba(20,20,20,0.04)", ...style }}>{children}</div>;
}

function BatteryBadge({ level }) {
  const tone = level > 60 ? "#4D8F5A" : level > 25 ? "#C28A2E" : "#C45A4C";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: P.ivory, border: `1px solid ${P.glassBorder}`, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal }}>
      <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
        <rect x="0.75" y="0.75" width="14" height="8.5" rx="2" fill="none" stroke={tone} strokeWidth="1.2" />
        <rect x="15.4" y="3" width="2" height="4" rx="1" fill={tone} />
        <rect x="2.2" y="2.1" width={`${Math.max(2, (level / 100) * 11)}`} height="5.8" rx="1.3" fill={tone} />
      </svg>
      <span>{level}%</span>
    </div>
  );
}

const INITIAL_MEMORIES = [
  {
    id: "m-kyoto",
    title: "A rainy morning in Kyoto",
    emotion: "Stillness, warmth, wet stone",
    scent: "Wet stone, hinoki wood, soft green tea steam",
    grad: "linear-gradient(135deg, #6B7B6B, #A8B5A0)",
    icon: "🌧",
    breakdown: [
      { name: "Hinoki Woods", accord: 34, fit: 91, color: P.sage },
      { name: "Green Tea Steam", accord: 28, fit: 86, color: P.gold },
      { name: "Rain Mineral", accord: 22, fit: 80, color: P.roseDust },
    ],
  },
  {
    id: "m-rooftop",
    title: "Dancing at a rooftop bar",
    emotion: "Energy, heat, amber lights",
    scent: "Warm amber, tobacco leaf, night-blooming jasmine",
    grad: `linear-gradient(135deg, ${P.deepPlum}, #6B4060)`,
    icon: "✦",
    breakdown: [
      { name: "Amber Resin", accord: 36, fit: 93, color: P.gold },
      { name: "Tobacco Smoke", accord: 24, fit: 84, color: P.roseDust },
      { name: "Night Jasmine", accord: 22, fit: 79, color: P.blush },
    ],
  },
  {
    id: "m-garden",
    title: "Grandmother's garden",
    emotion: "Comfort, earth, sun on skin",
    scent: "Sun-warmed earth, fig leaf, dried lavender",
    grad: `linear-gradient(135deg, #8B7B5C, ${P.roseDust})`,
    icon: "❀",
    breakdown: [
      { name: "Fig Leaf", accord: 31, fit: 88, color: P.sage },
      { name: "Dry Lavender", accord: 25, fit: 77, color: P.blush },
      { name: "Earth Accord", accord: 24, fit: 82, color: P.gold },
    ],
  },
  {
    id: "m-snow",
    title: "First snow of the year",
    emotion: "Wonder, crisp air, silence",
    scent: "Cool air, pine resin, clean wool, woodsmoke",
    grad: "linear-gradient(135deg, #A8B5C0, #D4DDE4)",
    icon: "❄",
    breakdown: [
      { name: "Pine Resin", accord: 30, fit: 83, color: P.sage },
      { name: "Clean Wool", accord: 26, fit: 78, color: P.blush },
      { name: "Cold Air", accord: 24, fit: 74, color: P.gold },
    ],
  },
];

const DUMMY_UPLOAD_MEMORIES = [
  {
    title: "Sunset in Lisbon",
    emotion: "Golden light, Salt air, Warm skin",
    scent: "Orange peel, sea salt, warm amber, clean cotton",
    grad: "linear-gradient(135deg, #C98E66, #E3BE96)",
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

const MEMORY_PROMPTS = INITIAL_MEMORIES;

const STORE_LOCATIONS = [
  { id: "store-sg", city: "Singapore", name: "ION Orchard Counter", area: "Orchard", address: "B2, ION Orchard, 2 Orchard Turn", hours: "10:00 - 22:00", service: "Decode scan + refills", distance: "1.4 km", tags: ["Nearest", "Decode", "Refill"] },
  { id: "store-sg-2", city: "Singapore", name: "Marina Bay Sands Counter", area: "Marina Bay", address: "The Shoppes at Marina Bay Sands, B1", hours: "10:30 - 22:00", service: "Decode scan + consultations", distance: "3.8 km", tags: ["Decode", "Consultation"] },
  { id: "store-jkt", city: "Jakarta", name: "Plaza Indonesia Counter", area: "Central Jakarta", address: "Level 1, Plaza Indonesia, Jl. M.H. Thamrin", hours: "10:00 - 22:00", service: "Decode scan available", distance: "When traveling", tags: ["Decode"] },
  { id: "store-jkt-2", city: "Jakarta", name: "Pacific Place Counter", area: "SCBD", address: "Ground Floor, Pacific Place Mall, SCBD", hours: "10:00 - 22:00", service: "Decode scan + refills", distance: "When traveling", tags: ["Refill", "Decode"] },
  { id: "store-seoul", city: "Seoul", name: "The Hyundai Seoul", area: "Yeouido", address: "Level 1, The Hyundai Seoul", hours: "10:30 - 20:00", service: "Decode scan available", distance: "When traveling", tags: ["Decode"] },
  { id: "store-tokyo", city: "Tokyo", name: "Ginza Six Counter", area: "Ginza", address: "Ground Floor, Ginza Six", hours: "10:30 - 20:30", service: "Decode scan + consultations", distance: "When traveling", tags: ["Consultation", "Decode"] },
  { id: "store-paris", city: "Paris", name: "Le Bon Marche Counter", area: "7th arrondissement", address: "24 Rue de Sevres, Paris", hours: "10:00 - 20:00", service: "Decode scan available", distance: "When traveling", tags: ["Decode"] },
];

const SHOP_ITEMS = [
  { id: "shop-warm-amber", name: "Warm Amber", type: "15ml cartridge", price: "$49", notes: "Amber · Benzoin · Tonka", color: P.gold },
  { id: "shop-skin-musk", name: "Skin Musk", type: "15ml cartridge", price: "$49", notes: "White musk · Iris · Cashmere", color: P.roseDust },
  { id: "shop-fig-leaf", name: "Fig Leaf", type: "15ml cartridge", price: "$49", notes: "Fig · Basil · Coconut milk", color: P.sage },
  { id: "shop-travel-set", name: "Personal Chapter Set", type: "3 cartridge edit", price: "$138", notes: "Warm Amber · Skin Musk · Fig Leaf", color: P.goldLight },
];

const FAMILY_STYLES = {
  "for-you": { border: P.charcoal, bg: P.charcoal, text: P.ivory },
  warm: { border: "#B7843D", bg: "#F3E0C1", text: "#8A5A1E" },
  fresh: { border: "#8DAAA1", bg: "#E3ECE8", text: "#617B73" },
  woody: { border: "#8A6A4E", bg: "#E8DDD3", text: "#6A4F39" },
  floral: { border: "#B88497", bg: "#F0DEE4", text: "#936375" },
  musky: { border: "#9A8FA6", bg: "#E7E2EC", text: "#6F637B" },
};

function getMemoryIcon(title, note, mode) {
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

const ACCORD_LIBRARY = [
  { name: "Warm Amber", family: "warm", notes: "Amber · Benzoin · Tonka", match: 94, pref: "High affinity", color: P.gold, desc: "Resin warmth with strong skin affinity.", badge: true },
  { name: "Skin Musk", family: "musky", notes: "White musk · Iris · Cashmere", match: 89, pref: "Strong match", color: P.roseDust, desc: "Soft musk wears close and long on skin." },
  { name: "Fig Leaf", family: "fresh", notes: "Fig · Basil · Coconut milk", match: 86, pref: "Good match", color: P.sage, desc: "Fresh green lift that stays creamy, not sharp." },
  { name: "Sandalwood Veil", family: "woody", notes: "Sandalwood · Cream · Cedar", match: 82, pref: "Good match", color: "#B89878", desc: "Smooth woods with a skin-soft finish." },
  { name: "Velvet Vanilla", family: "warm", notes: "Vanilla pod · Amber milk · Suede", match: 91, pref: "High affinity", color: P.gold, desc: "Sweet warmth amplified by your skin temperature." },
  { name: "Golden Benzoin", family: "warm", notes: "Benzoin · Labdanum · Silk smoke", match: 90, pref: "High affinity", color: P.goldLight, desc: "Dense amber resin for evening wear." },
  { name: "Honey Tobacco", family: "warm", notes: "Tobacco leaf · Honey · Oak", match: 88, pref: "Strong match", color: P.roseDust, desc: "Warm and textured with lingering richness." },
  { name: "Rum Accord", family: "warm", notes: "Rum absolute · Molasses · Spice", match: 84, pref: "Strong match", color: P.blush, desc: "Dark gourmand warmth with a smooth trail." },
  { name: "Chestnut Smoke", family: "warm", notes: "Chestnut · Smoke · Vanilla", match: 87, pref: "Strong match", color: P.gold, desc: "Smoky sweetness that settles beautifully." },
  { name: "Burnished Leather", family: "warm", notes: "Soft leather · Amber wood · Pepper", match: 79, pref: "Good match", color: "#8C6B57", desc: "A warmer, polished leather interpretation." },
  { name: "Bergamot Mist", family: "fresh", notes: "Bergamot · Neroli · Musk", match: 76, pref: "Fresh fit", color: P.blush, desc: "Crisp citrus softened by a musky veil." },
  { name: "Rain Accord", family: "fresh", notes: "Mineral rain · Rose petal · Moss", match: 81, pref: "Fresh fit", color: P.sage, desc: "A damp, mineral brightness with softness." },
  { name: "White Tea Steam", family: "fresh", notes: "White tea · Iso E · Clean air", match: 78, pref: "Fresh fit", color: "#B9C7C4", desc: "Quiet freshness with gentle persistence." },
  { name: "Neroli Bloom", family: "fresh", notes: "Neroli · Orange peel · Musks", match: 80, pref: "Fresh fit", color: "#DDBA78", desc: "Radiant citrus floral with a clean aura." },
  { name: "Linen Accord", family: "fresh", notes: "Aldehydes · Clean cotton · Musk", match: 83, pref: "Fresh fit", color: "#CFC9C1", desc: "A crisp skin scent that stays polished." },
  { name: "Tea Citrus", family: "fresh", notes: "Green tea · Lime peel · Cedar", match: 74, pref: "Fresh fit", color: "#B4C6A8", desc: "Bright and lifted without feeling soapy." },
  { name: "Pear Water", family: "fresh", notes: "Pear skin · Water accord · White musk", match: 77, pref: "Fresh fit", color: "#D6D0B1", desc: "Juicy, transparent, and easy to wear." },
  { name: "Marine Veil", family: "fresh", notes: "Sea mineral · Driftwood · Salt", match: 69, pref: "Fresh fit", color: "#8EB0B7", desc: "Cool and airy with mineral texture." },
  { name: "Eucalyptus Air", family: "fresh", notes: "Eucalyptus · Mint tea · Soft woods", match: 73, pref: "Fresh fit", color: "#88A68B", desc: "Clean herbal freshness with lift." },
  { name: "Cucumber Musk", family: "fresh", notes: "Cucumber water · Musk · Bamboo", match: 75, pref: "Fresh fit", color: "#A9C6B6", desc: "Watery freshness rounded by musk." },
  { name: "Cedar Frame", family: "woody", notes: "Cedarwood · Iso E · Blonde woods", match: 84, pref: "Woody fit", color: "#A98972", desc: "Dry woods with modern softness." },
  { name: "Cashmere Wood", family: "woody", notes: "Cashmeran · Sandalwood · Musk", match: 88, pref: "Woody fit", color: "#B48B78", desc: "Plush woods that bloom slowly on skin." },
  { name: "Palo Santo", family: "woody", notes: "Palo santo · Guaiac · Amber dust", match: 86, pref: "Woody fit", color: "#9A7A5E", desc: "Sacred wood warmth with soft smoke." },
  { name: "Oak Reserve", family: "woody", notes: "Oakwood · Resin · Vetiver", match: 81, pref: "Woody fit", color: "#8A715D", desc: "Structured woods with grounded depth." },
  { name: "Hinoki Woods", family: "woody", notes: "Hinoki · Cedar bark · Musk", match: 85, pref: "Woody fit", color: "#8D9B83", desc: "Zen-like woods with clean warmth." },
  { name: "Driftwood Cream", family: "woody", notes: "Driftwood · Sandalwood milk · Musk", match: 80, pref: "Woody fit", color: "#B39C87", desc: "Creamy wood accord with a smooth trail." },
  { name: "Vetiver Silk", family: "woody", notes: "Vetiver · Iris root · Soft suede", match: 79, pref: "Woody fit", color: "#9C8D6D", desc: "Earthy and elegant without harshness." },
  { name: "Paper Cedar", family: "woody", notes: "Paper accord · Cedar shavings · Musk", match: 82, pref: "Woody fit", color: "#A89E8A", desc: "Dry, intellectual woods for quiet wear." },
  { name: "Saffron Wood", family: "woody", notes: "Saffron · Cedar · Amber skin", match: 78, pref: "Woody fit", color: "#B58E5C", desc: "Spiced woods with warmth underneath." },
  { name: "Smoked Birch", family: "woody", notes: "Birch tar · Woods · Soft musk", match: 72, pref: "Woody fit", color: "#77695C", desc: "A darker woody accord with edge." },
  { name: "Rose Petal", family: "floral", notes: "Rose centifolia · Musk · Dew", match: 74, pref: "Floral fit", color: P.blush, desc: "Romantic but softened for skin wear." },
  { name: "Iris Butter", family: "floral", notes: "Iris butter · Violet leaf · Musk", match: 87, pref: "Floral fit", color: "#C6B0BE", desc: "Powdery elegance with strong skin harmony." },
  { name: "Orange Blossom", family: "floral", notes: "Orange blossom · Neroli · Honey", match: 79, pref: "Floral fit", color: "#E0BD8A", desc: "Solar floral that stays luminous." },
  { name: "Jasmine Veil", family: "floral", notes: "Jasmine sambac · Skin musk · Cream", match: 76, pref: "Floral fit", color: "#D6C6A8", desc: "A creamy floral with intimate projection." },
  { name: "Peony Air", family: "floral", notes: "Peony · Pear water · White musk", match: 73, pref: "Floral fit", color: "#E2C7CC", desc: "Soft airy petals with a sheer trail." },
  { name: "Magnolia Suede", family: "floral", notes: "Magnolia · Suede · Musk", match: 77, pref: "Floral fit", color: "#D7BFB8", desc: "Creamy floral dressed in soft texture." },
  { name: "Violet Silk", family: "floral", notes: "Violet leaf · Iris · Musks", match: 82, pref: "Floral fit", color: "#B9A3BF", desc: "Cool floral facets with skin-soft depth." },
  { name: "Lily Cream", family: "floral", notes: "Lily petals · White cream · Musk", match: 71, pref: "Floral fit", color: "#DDD7CC", desc: "Clean floral comfort with softness." },
  { name: "Gardenia Mist", family: "floral", notes: "Gardenia · Coconut milk · Musk", match: 75, pref: "Floral fit", color: "#D8C7B7", desc: "Creamy tropical floral without excess." },
  { name: "Tuberose Light", family: "floral", notes: "Tuberose · Neroli · Cashmere", match: 70, pref: "Floral fit", color: "#E1D2C4", desc: "A lighter, more wearable tuberose profile." },
  { name: "Cloud Musk", family: "musky", notes: "White musk · Cotton skin · Air", match: 92, pref: "Top musky match", color: P.roseDust, desc: "Clean skin musk with excellent longevity.", badge: true },
  { name: "Cashmere Musk", family: "musky", notes: "Cashmere woods · Musk · Powder", match: 90, pref: "Top musky match", color: P.blush, desc: "Velvety and intimate with elegant softness." },
  { name: "Suede Musk", family: "musky", notes: "Soft suede · Musk · Amber", match: 88, pref: "Top musky match", color: "#B3897D", desc: "A warm musky suede with body." },
  { name: "Clean Skin", family: "musky", notes: "Skin accord · Aldehydes · Iris", match: 85, pref: "Musky fit", color: "#C9BBB3", desc: "Your-skin-but-polished with smooth lift." },
  { name: "Milk Musk", family: "musky", notes: "Milk foam · Musk · Sandalwood", match: 87, pref: "Musky fit", color: "#D5C3B0", desc: "Creamy and comforting with soft projection." },
  { name: "Velvet Powder", family: "musky", notes: "Powder iris · Musk · Vanilla skin", match: 84, pref: "Musky fit", color: "#CAB7BE", desc: "Powdery softness that feels expensive." },
  { name: "Second Skin", family: "musky", notes: "Warm skin accord · Musk · Cedar", match: 91, pref: "Top musky match", color: "#B89A8D", desc: "Designed to meld into body heat beautifully." },
  { name: "Rice Steam", family: "musky", notes: "Rice accord · White musk · Cream", match: 81, pref: "Musky fit", color: "#DDD6C8", desc: "Delicate and comforting, very skin-like." },
  { name: "Soft Wool", family: "musky", notes: "Clean wool · Musk · Cedar milk", match: 83, pref: "Musky fit", color: "#C8C1B3", desc: "Quiet texture with long wear." },
  { name: "Iris Skin", family: "musky", notes: "Iris root · Musk · White woods", match: 89, pref: "Top musky match", color: "#B9A6B0", desc: "Elegant powder and musk synergy for your skin." },
];

function cloneAccordToDevice(accord) {
  return {
    name: accord.name,
    color: accord.color,
    family: accord.family,
    level: 100,
  };
}

function getBlendLabInsights(primary, secondary, tertiary) {
  if (!primary || !secondary || !tertiary) return null;
  const pairMap = {
    "floral|floral": { compatibility: 76, mood: "petalled, smooth, airy", result: "A floral-led blend with a soft halo rather than depth.", opening: "petal light", heart: "powdered bloom", drydown: "sheer floral skin" },
    "floral|fresh": { compatibility: 72, mood: "bright, dewy, airy", result: "A light floral freshness with more lift than body.", opening: "dewy brightness", heart: "petal mist", drydown: "clean floral trace" },
    "floral|musky": { compatibility: 91, mood: "polished, soft, skin-close", result: "A silky floral cloud with a clean musky finish.", opening: "petal brightness", heart: "powdered softness", drydown: "clean skin musk" },
    "floral|warm": { compatibility: 79, mood: "radiant, dressed-up, smooth", result: "A luminous floral accord sitting on warm amber light.", opening: "bright petals", heart: "golden bloom", drydown: "warm skin sweetness" },
    "floral|woody": { compatibility: 61, mood: "structured, dry, tailored", result: "The blend feels more architectural than seamless, with floral softness pressed against dry woods.", opening: "cool petal air", heart: "dry floral wood", drydown: "textured woody veil" },
    "fresh|fresh": { compatibility: 74, mood: "watery, sheer, brisk", result: "A clean fresh pairing that feels bright but not especially deep.", opening: "cool lift", heart: "watery air", drydown: "mineral freshness" },
    "fresh|musky": { compatibility: 82, mood: "clean, sheer, modern", result: "A polished clean-skin blend with airy freshness.", opening: "watery brightness", heart: "white musk", drydown: "linen-soft skin" },
    "fresh|warm": { compatibility: 55, mood: "bright, contrasting, unsettled", result: "A sparkly-cool opening sits against warmth in a way that feels intentionally contrasty.", opening: "citrus lift", heart: "split warm-cool tension", drydown: "soft amber" },
    "fresh|woody": { compatibility: 64, mood: "crisp, dry, directional", result: "A brisk opening anchored by dry woods; refined, but not naturally fluid.", opening: "citrus-wood air", heart: "dry cedar line", drydown: "clean woody skin" },
    "musky|musky": { compatibility: 88, mood: "intimate, creamy, diffused", result: "A smooth skin-scent build that feels naturally cohesive.", opening: "soft skin light", heart: "cashmere musk", drydown: "close warm skin" },
    "musky|warm": { compatibility: 93, mood: "intimate, creamy, addictive", result: "Warm skin musk with a richer, enveloping trail.", opening: "soft warmth", heart: "cashmere texture", drydown: "ambered skin" },
    "musky|woody": { compatibility: 89, mood: "quiet, elegant, lingering", result: "Smooth woods wrapped in a close-to-skin musky veil.", opening: "dry softness", heart: "cashmere wood", drydown: "soft cedar musk" },
    "warm|warm": { compatibility: 84, mood: "dense, rich, cocooning", result: "A warm-on-warm pairing that feels plush and enveloping.", opening: "amber glow", heart: "resin warmth", drydown: "deep skin warmth" },
    "warm|woody": { compatibility: 90, mood: "rich, grounded, luxurious", result: "A fuller-bodied blend with warm woods and lingering depth.", opening: "resin warmth", heart: "polished wood", drydown: "deep amber cedar" },
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
    warm: { mood: "warmer and more enveloping", note: "amber glow" },
    fresh: { mood: "brighter and more lifted", note: "fresh air" },
    woody: { mood: "deeper and more structured", note: "dry woods" },
    floral: { mood: "more expressive and polished", note: "petal softness" },
    musky: { mood: "closer to skin and smoother", note: "skin musk" },
  };
  const tertiaryAdjust = tertiaryFamilyMap[tertiary.family] || { mood: "more layered", note: tertiary.notes.split("·")[0]?.trim() || tertiary.name.toLowerCase() };
  const families = [primary.family, secondary.family, tertiary.family];
  const familyCounts = families.reduce((acc, family) => {
    acc[family] = (acc[family] || 0) + 1;
    return acc;
  }, {});
  const uniqueFamilies = Object.keys(familyCounts).length;
  const warmCount = familyCounts.warm || 0;
  const freshCount = familyCounts.fresh || 0;
  const muskyCount = familyCounts.musky || 0;
  const woodyCount = familyCounts.woody || 0;
  const floralCount = familyCounts.floral || 0;

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
  if (families.includes("fresh") && families.includes("warm") && families.includes("woody")) contrastPenalty += 8;
  if (families.includes("fresh") && families.includes("warm") && families.includes("floral")) contrastPenalty += 5;

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

  return {
    ...strongestPair,
    accordFit,
    yourFit,
    title: `${primary.name} · ${secondary.name} · ${tertiary.name}`,
    mood: `${strongestPair.mood}, ${tertiaryAdjust.mood}`,
    result: `${strongestPair.result} The third note adds ${tertiaryAdjust.note}.`,
    accordTone,
    yourTone,
  };
}

function getAccordPreview(acc, hasSkinID) {
  const familyTitles = {
    warm: "Luminous and enveloping",
    fresh: "Crisp and transparent",
    woody: "Textural and grounding",
    floral: "Soft-focus and expressive",
    musky: "Intimate and skin-close",
  };

  const familyMoments = {
    warm: "best after sunset, on skin and knitwear",
    fresh: "best in the morning or warm weather",
    woody: "best when you want quiet depth",
    floral: "best for dressed-up daytime or dinner",
    musky: "best when you want something subtle but addictive",
  };

  const familyImpressions = {
    warm: "It starts glowing, then settles into a rich second-skin warmth.",
    fresh: "It opens bright, then stays clean and softly radiant on skin.",
    woody: "It begins dry and refined, then melts into a smoother woody base.",
    floral: "It opens polished and airy, then softens into a rounded floral aura.",
    musky: "It stays close to the body and becomes more beautiful with warmth.",
  };

  const notes = acc.notes.split("·").map(note => note.trim());
  const top = notes[0] || acc.notes;
  const heart = notes[1] || notes[0] || acc.notes;
  const base = notes[2] || notes[1] || notes[0] || acc.notes;

  return {
    title: familyTitles[acc.family] || "Refined and easy to wear",
    whyItWorks: hasSkinID
      ? `With a ${acc.match}% skin match, this accord fits your profile because it leans into ${acc.family} facets without fighting your skin chemistry.`
      : `This accord fits your current profile because it aligns with the ${acc.family} direction and emotional preferences you selected so far.`,
    wearMoment: familyMoments[acc.family] || "best whenever you want a polished signature",
    impression: familyImpressions[acc.family] || "It evolves smoothly and stays elegant through the dry-down.",
    structure: [
      { stage: "Opening", note: top, detail: "The first impression on skin." },
      { stage: "Heart", note: heart, detail: "The character that stays with you." },
      { stage: "Dry down", note: base, detail: "What lingers closest to the body." },
    ],
  };
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: "absolute", top: 58, left: 20, right: 20, zIndex: 120, padding: "12px 14px", borderRadius: 14, background: "rgba(42,37,32,0.96)", border: `1px solid ${P.gold}20`, color: P.ivory, fontFamily: sans, fontSize: 10, letterSpacing: 0.2, lineHeight: 1.6, boxShadow: "0 16px 30px rgba(0,0,0,0.2)" }}>{message}</div>
  );
}

function Sheet({ title, subtitle, children, onClose }) {
  if (!title) return null;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 115, background: "rgba(20,16,13,0.42)", display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={{ width: "100%", borderTopLeftRadius: 24, borderTopRightRadius: 24, background: P.ivory, padding: "18px 18px 26px", boxShadow: "0 -18px 35px rgba(0,0,0,0.16)" }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 42, height: 4, borderRadius: 4, background: P.warmBeige, margin: "0 auto 14px" }} />
        <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2.5, color: P.gold, textTransform: "uppercase", margin: 0 }}>{subtitle}</p>
        <h3 style={{ fontFamily: serif, fontSize: 22, color: P.charcoal, margin: "8px 0 12px" }}>{title}</h3>
        {children}
        <Btn dark full onClick={onClose} style={{ marginTop: 16 }}>Close</Btn>
      </div>
    </div>
  );
}

function MemoryComposerSheet({ open, draft, onChange, onClose, onSave }) {
  if (!open) return null;
  const modes = [
    { id: "photo", label: "Photo" },
    { id: "camera", label: "Camera" },
    { id: "words", label: "Words" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 145, background: "rgba(20,16,13,0.38)", display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={{ width: "100%", borderTopLeftRadius: 26, borderTopRightRadius: 26, background: P.ivory, padding: "18px 18px 28px", boxShadow: "0 -18px 35px rgba(0,0,0,0.16)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 42, height: 4, borderRadius: 4, background: P.warmBeige, margin: "0 auto 14px" }} />
        <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: 1.4, color: P.warmGray, textTransform: "uppercase", margin: 0 }}>Create a memory</p>
        <h3 style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.6 }}>Add a memory</h3>
        <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.6 }}>
          Simulate a photo, camera capture, or written moment to shape your future blend direction.
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange("mode", mode.id)}
              style={{
                flex: 1,
                padding: "11px 12px",
                borderRadius: 14,
                border: `1px solid ${draft.mode === mode.id ? P.charcoal : P.glassBorder}`,
                background: draft.mode === mode.id ? P.charcoal : P.cream,
                color: draft.mode === mode.id ? P.ivory : P.charcoal,
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: "16px", borderRadius: 18, border: `1px solid ${P.glassBorder}`, background: P.cream }}>
          <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, margin: 0 }}>
            {draft.mode === "camera" ? "Camera simulation" : draft.mode === "photo" ? "Photo upload simulation" : "Written memory"}
          </p>
          <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.5 }}>
            {draft.mode === "camera" ? "Pretend the app opens the camera and captures a fresh moment." : draft.mode === "photo" ? "Pretend the user selects a photo from the gallery." : "Describe a place, mood, or moment in words."}
          </p>
          <div style={{ marginTop: 14, borderRadius: 16, border: `1px dashed ${P.glassBorder}`, background: P.ivory, minHeight: 96, display: "flex", alignItems: "center", justifyContent: "center", color: P.warmGray, fontFamily: sans, fontSize: 12, textAlign: "center", padding: 14 }}>
            {draft.mode === "camera" ? "Camera preview simulation" : draft.mode === "photo" ? "Selected photo preview simulation" : "Your written moment will be translated into scent cues"}
          </div>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <input
            value={draft.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Memory title"
            style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1px solid ${P.glassBorder}`, background: P.cream, fontFamily: sans, fontSize: 13, color: P.charcoal, outline: "none" }}
          />
          <textarea
            value={draft.note}
            onChange={(e) => onChange("note", e.target.value)}
            placeholder="Add a few words about the place, mood, or feeling"
            rows={4}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1px solid ${P.glassBorder}`, background: P.cream, fontFamily: sans, fontSize: 13, color: P.charcoal, outline: "none", resize: "none", lineHeight: 1.5 }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <Btn full onClick={onClose}>Cancel</Btn>
          <Btn dark full onClick={onSave}>Save Memory</Btn>
        </div>
      </div>
    </div>
  );
}

function PairingSheet({ open, pairingState, onClose, onConnect }) {
  if (!open) return null;
  const canClose = pairingState !== "loading";
  const isLoading = pairingState === "loading";

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 180, background: "rgba(20,16,13,0.42)", display: "flex", alignItems: "flex-end" }} onClick={canClose ? onClose : undefined}>
      <div style={{ width: "100%", borderTopLeftRadius: 24, borderTopRightRadius: 24, background: P.ivory, padding: "18px 18px 28px", boxShadow: "0 -18px 35px rgba(0,0,0,0.16)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 42, height: 4, borderRadius: 4, background: P.warmBeige, margin: "0 auto 14px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2.5, color: P.gold, textTransform: "uppercase", margin: 0 }}>Device pairing</p>
            <h3 style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.6 }}>
              {pairingState === "connected" ? "Device connected" : "Pair your device"}
            </h3>
          </div>
          <button
            type="button"
            onClick={canClose ? onClose : undefined}
            disabled={!canClose}
            style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${P.glassBorder}`, background: P.cream, color: P.warmGray, fontSize: 16, cursor: canClose ? "pointer" : "default", lineHeight: 1, opacity: canClose ? 1 : 0.45 }}
          >
            ×
          </button>
        </div>

        <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 176, height: 148, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 36, background: "radial-gradient(circle at 50% 35%, rgba(244,237,228,0.95), rgba(233,223,211,0.3) 62%, rgba(255,255,255,0) 72%)" }} />
            <div style={{ position: "relative", width: 122, height: 90, borderRadius: 26, background: "linear-gradient(180deg, #FBF8F2, #EEE7DD)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 18px 30px rgba(63,48,39,0.12)" }}>
              <div style={{ position: "absolute", top: 14, left: 17, right: 17, height: 42, borderRadius: 16, background: "#F5EFE5", display: "grid", gridTemplateColumns: "1.1fr 1fr 0.9fr", gap: 6, padding: 6 }}>
                <div style={{ borderRadius: 11, background: `${P.gold}95` }} />
                <div style={{ borderRadius: 11, background: `${P.roseDust}75` }} />
                <div style={{ borderRadius: 11, background: `${P.sage}85` }} />
              </div>
              <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", width: 24, height: 24, borderRadius: "50%", background: "rgba(125,115,104,0.72)" }} />
            </div>
          </div>
        </div>

        <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "2px 0 0", lineHeight: 1.6, textAlign: "center" }}>
          {pairingState === "connected"
            ? "Your Personal Chapter device is now paired and ready to sync battery, cartridges, and blend updates."
            : isLoading
              ? "Connecting to your device. Hold the hardware button until the sync is complete."
              : "Bring the device near your phone, then press and hold the hardware button to begin pairing."}
        </p>

        <div style={{ marginTop: 16, padding: "14px 14px", borderRadius: 16, background: P.mist, border: `1px solid ${P.glassBorder}` }}>
          <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>What unlocks after pairing</p>
          <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: "6px 0 0", lineHeight: 1.6 }}>
            Live battery, cartridge detection, and blend updates sync from the physical device into the app.
          </p>
        </div>

        <Btn dark full onClick={pairingState === "connected" ? onClose : onConnect} disabled={isLoading} style={{ marginTop: 16 }}>
          {pairingState === "connected" ? "Done" : isLoading ? "Connecting..." : "Connect"}
        </Btn>
      </div>
    </div>
  );
}

// ─── 1. SPLASH ───
function SplashScreen({ onEnter }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 300); }, []);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#F4EFE8", transition: "opacity 0.8s", opacity: v ? 1 : 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.38), transparent 34%), radial-gradient(circle at 50% 100%, rgba(155,142,124,0.08), transparent 26%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", padding: "136px 32px 56px", textAlign: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -56 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, maxWidth: 300 }}>
            <p style={{ fontFamily: mono, fontSize: 10, fontWeight: 500, letterSpacing: 2.2, color: P.warmGray, margin: 0, textTransform: "uppercase" }}>
              Maison Margiela Replica
            </p>

            <h1 style={{ fontFamily: splashSerif, fontSize: 31, lineHeight: 1.02, fontWeight: 600, color: P.charcoal, letterSpacing: -0.9, margin: 0 }}>
              Personal Chapter
            </h1>

            <div style={{ width: 42, height: 1, background: "rgba(155,142,124,0.34)" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
          <button
            type="button"
            onClick={onEnter}
            onPointerUp={onEnter}
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "16px 22px",
              background: P.charcoal,
              border: `1px solid ${P.charcoal}`,
              color: P.ivory,
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: -0.1,
              cursor: "pointer",
              borderRadius: 14,
              transition: "all 0.3s",
            }}
          >
            Begin Your Chapter
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 2. ONBOARDING (updated flow) ───
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const miniCardStyle = {
    width: 138,
    height: 136,
    borderRadius: 26,
    background: P.ivory,
    border: `1px solid ${P.glassBorder}`,
    boxShadow: "0 16px 30px rgba(0,0,0,0.08)",
    overflow: "hidden",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "0 auto",
  };
  const steps = [
    {
      title: "Add your first memory",
      sub: "Start with a photo, camera moment, or a few words. The app translates that emotion into your first scent direction.",
      stepLabel: "Step 1 / 3",
      visual: (
        <div style={{ width: 198, height: 152, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...miniCardStyle, padding: "14px 12px" }}>
            <div style={{ width: 46, height: 6, borderRadius: 999, background: P.charcoal, opacity: 0.9, margin: "0 auto 12px", flexShrink: 0 }} />
            <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 600, color: P.warmGray, letterSpacing: 1.2, textTransform: "uppercase", margin: 0 }}>Blend • Memory</p>
            <div style={{ marginTop: 10, borderRadius: 15, padding: "11px 10px", border: `1px dashed ${P.glassBorder}`, background: P.cream, width: "100%" }}>
              <span style={{ fontSize: 16, color: P.warmGray, display: "block", marginBottom: 4 }}>+</span>
              <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, color: P.charcoal, margin: 0 }}>Add a memory</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: P.warmGray, margin: "4px 0 0", lineHeight: 1.35 }}>Photo, camera, or words</p>
            </div>
            <div style={{ marginTop: 8, borderRadius: 13, overflow: "hidden", background: "linear-gradient(135deg, #C98E66, #E3BE96)", padding: "9px 10px", width: "100%" }}>
              <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, color: "white", margin: 0 }}>Sunset in Lisbon</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: "rgba(255,255,255,0.74)", margin: "4px 0 0" }}>Golden light · Salt air</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Decode your skin",
      sub: "Visit a Replica counter for a quick scan. Decode adds microbiome and wear-performance data to your profile.",
      stepLabel: "Step 2 / 3",
      visual: (
        <div style={{ width: 198, height: 152, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...miniCardStyle, padding: "14px 12px" }}>
            <div style={{ width: 46, height: 6, borderRadius: 999, background: P.charcoal, opacity: 0.9, margin: "0 auto 12px", flexShrink: 0 }} />
            <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 600, color: P.warmGray, letterSpacing: 1.2, textTransform: "uppercase", margin: 0 }}>Decode Counter</p>
            <div style={{ marginTop: 10, borderRadius: 18, background: "linear-gradient(180deg, #F4EEE7, #EEE7DE)", border: `1px solid ${P.glassBorder}`, padding: "12px 10px", display: "flex", alignItems: "center", gap: 10, width: "100%", flex: 1 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #E7E0D6, #F7F2EB)", border: `1px solid ${P.glassBorder}`, position: "relative", flexShrink: 0, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }}>
                <div style={{ position: "absolute", inset: 9, borderRadius: 10, background: "radial-gradient(circle, rgba(155,142,124,0.38), rgba(155,142,124,0.08))" }} />
              </div>
              <div style={{ flex: 1, display: "grid", gap: 7 }}>
                <div style={{ width: "100%", height: 9, borderRadius: 999, background: `${P.gold}22` }} />
                <div style={{ width: "82%", height: 9, borderRadius: 999, background: `${P.sage}28` }} />
                <div style={{ width: "60%", height: 9, borderRadius: 999, background: `${P.roseDust}18` }} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pair, adjust, and update",
      sub: "Once the device is paired, adjust the live ratio of the three cartridges and update your Personal Chapter settings in the device.",
      stepLabel: "Step 3 / 3",
      visual: (
        <div style={{ width: 198, height: 152, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...miniCardStyle, padding: "12px 12px 14px" }}>
            <div style={{ width: 46, height: 6, borderRadius: 999, background: P.charcoal, opacity: 0.9, margin: "0 auto 8px", flexShrink: 0 }} />
            <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 600, color: P.warmGray, letterSpacing: 1.2, textTransform: "uppercase", margin: 0, flexShrink: 0 }}>Blend • Adjust</p>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 4, paddingBottom: 4 }}>
              <MiniAdjustDeviceFigure />
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", textAlign: "center" }}>
        <FadeIn key={step} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 198, display: "flex", justifyContent: "center", margin: "0 auto 18px" }}>{steps[step].visual}</div>
          <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, color: P.warmGray, letterSpacing: 1.4, textTransform: "uppercase", margin: "0 0 10px" }}>
            {steps[step].stepLabel}
          </p>
          <h2 style={{ fontFamily: sans, fontSize: 28, fontWeight: 600, color: P.charcoal, margin: "0 0 12px", letterSpacing: -0.7, lineHeight: 1.08, maxWidth: 312, textAlign: "center" }}>{steps[step].title}</h2>
          <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, lineHeight: 1.75, maxWidth: 286, margin: "0 auto", textAlign: "center" }}>{steps[step].sub}</p>
        </FadeIn>
      </div>
      <div style={{ padding: "0 40px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {steps.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setStep(i)}
              aria-label={`Go to step ${i + 1}: ${item.title}`}
              style={{
                width: i === step ? 28 : 10,
                height: 10,
                padding: 0,
                border: "none",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: i === step ? 28 : 6,
                  height: 5,
                  borderRadius: 3,
                  background: i === step ? P.gold : P.warmBeige,
                  transition: "all 0.4s",
                }}
              />
            </button>
          ))}
        </div>
        <Btn dark full onClick={() => step < 2 ? setStep(step + 1) : onComplete()}>
          {step < 2 ? "Next" : "Enter Home"}
        </Btn>
      </div>
    </div>
  );
}

// ─── 3. DISCOVER: MEMORY UPLOAD (App Entry Point) ───
function MemoryEntryScreen({ onComplete, memories, onDummyUpload, onShowToast, onOpenStores }) {
  const [phase, setPhase] = useState("upload"); // upload → analyzing → profile
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [progress, setProgress] = useState(0);

  const startAnalysis = (memory) => {
    setSelectedMemory(memory);
    setPhase("analyzing");
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 2.5;
      setProgress(Math.min(p, 100));
      if (p >= 100) { clearInterval(interval); setTimeout(() => setPhase("profile"), 180); }
    }, 35);
  };

  if (phase === "upload") {
    return (
      <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column" }}>
        <StatusBar />
        <div style={{ flex: 1, padding: "0 28px", overflowY: "auto", paddingBottom: 40 }}>
          <FadeIn><Label>Step 1 of 3: Discover</Label></FadeIn>
          <FadeIn delay={50}><Title style={{ fontStyle: "italic" }}>Share a Memory</Title></FadeIn>
          <FadeIn delay={100}>
            <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, marginTop: 8, lineHeight: 1.7, maxWidth: 300 }}>
              Choose a moment that defines you. AI will translate its emotional texture into fragrance notes.
            </p>
          </FadeIn>

          <FadeIn delay={180}>
            <button type="button" onClick={() => {
              const uploaded = onDummyUpload();
              onShowToast("Dummy memory photo uploaded.");
              startAnalysis(uploaded);
            }} style={{ width: "100%", marginTop: 22, borderRadius: 18, padding: "24px 20px", border: `1.5px dashed ${P.gold}30`, background: `${P.cream}40`, textAlign: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 28, color: P.gold, display: "block", marginBottom: 8 }}>+</span>
              <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, fontWeight: 500 }}>Upload Your Own</p>
              <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "5px 0 0", lineHeight: 1.5 }}>Photo, voice note, or written moment</p>
            </button>
          </FadeIn>

          <FadeIn delay={250}>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 3, color: P.warmGray, textTransform: "uppercase", margin: "24px 0 14px" }}>Or choose a starting memory</p>
          </FadeIn>

          {memories.map((m, i) => (
            <FadeIn key={i} delay={300 + i * 60}>
              <div onClick={() => startAnalysis(m)} style={{ borderRadius: 16, marginBottom: 10, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s", border: `1px solid ${P.glassBorder}` }}>
                <div style={{ background: m.grad, padding: "18px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 24, opacity: 0.8 }}>{m.icon}</span>
                  <div>
                    <p style={{ fontFamily: serif, fontSize: 15, fontWeight: 500, color: "white", margin: 0 }}>{m.title}</p>
                    <p style={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,0.6)", margin: "4px 0 0", letterSpacing: 0.5 }}>{m.emotion}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={600}>
            <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 14, background: `${P.softPink}25`, border: `1px solid ${P.glassBorder}` }}>
              <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: 0, lineHeight: 1.6 }}>
                <span style={{ color: P.gold, fontWeight: 500 }}>This is your Scent Profile</span> — based on emotional preferences. Visit a Replica counter to unlock your full Scent ID with skin microbiome analysis.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }

  if (phase === "analyzing") {
    const labels = ["Reading emotional cues...", "Mapping to fragrance families...", "Identifying note affinities...", "Building your Scent Profile..."];
    const stepIdx = Math.min(Math.floor(progress / 25), 3);
    return (
      <div style={{ position: "absolute", inset: 0, background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: `radial-gradient(ellipse at 50% 40%, ${P.gold}, transparent 60%)` }}/>
        <div style={{ width: 160, height: 160, borderRadius: "50%", background: `conic-gradient(${P.gold} ${progress * 3.6}deg, rgba(255,255,255,0.03) 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 132, height: 132, borderRadius: "50%", background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: serif, fontSize: 36, fontWeight: 300, color: P.ivory }}>{Math.round(progress)}%</span>
            <span style={{ fontFamily: sans, fontSize: 7, color: P.roseDust, letterSpacing: 3, marginTop: 4 }}>ANALYZING</span>
          </div>
        </div>
        <p style={{ fontFamily: serif, fontSize: 14, fontStyle: "italic", color: P.goldLight, marginTop: 30, textAlign: "center", maxWidth: 220, lineHeight: 1.6, opacity: 0.7 }}>
          {labels[stepIdx]}
        </p>
      </div>
    );
  }

  // Profile result
  return (
    <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "0 28px", overflowY: "auto", paddingBottom: 40 }}>
        <FadeIn><Label>Scent Profile generated</Label></FadeIn>
        <FadeIn delay={50}><Title>Your Scent Profile</Title></FadeIn>

        <FadeIn delay={120}>
          <div style={{ marginTop: 18, borderRadius: 22, background: `linear-gradient(150deg, ${P.charcoal}, ${P.deepPlum})`, padding: "26px 22px", textAlign: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.04, background: `radial-gradient(circle at 30% 20%, ${P.gold}, transparent 50%)`, borderRadius: 22 }}/>
            <div style={{ width: 76, height: 76, borderRadius: "50%", margin: "0 auto 14px", background: `conic-gradient(from 45deg, ${P.gold} 0%, ${P.blush} 40%, ${P.sage} 70%, ${P.gold} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${P.gold}15` }}>
              <div style={{ width: 58, height: 58, borderRadius: "50%", background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: sans, fontSize: 7, color: P.goldLight, letterSpacing: 2, opacity: 0.5 }}>PROFILE</span>
                <span style={{ fontFamily: serif, fontSize: 11, color: P.ivory, marginTop: 1 }}>Partial</span>
              </div>
            </div>
            <p style={{ fontFamily: serif, fontSize: 16, color: P.ivory, margin: 0, fontStyle: "italic" }}>{selectedMemory ? selectedMemory.title : "Warm · Sensual · Grounded"}</p>
            <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: "6px 0 0" }}>{selectedMemory ? selectedMemory.scent : "Based on your emotional preferences"}</p>

            <div style={{ marginTop: 18, textAlign: "left" }}>
              {(selectedMemory?.breakdown || []).slice(0, 3).map((a, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontFamily: sans, fontSize: 9, color: P.goldLight, letterSpacing: 1 }}>{a.name}</span>
                    <span style={{ fontFamily: sans, fontSize: 9, color: P.roseDust }}>{a.accord}%</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.05)" }}>
                    <div style={{ height: "100%", borderRadius: 2, background: a.color, width: `${a.accord}%`, transition: "width 1s ease-out" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={250}>
          <div style={{ marginTop: 16, padding: "16px 18px", borderRadius: 16, background: `${P.gold}08`, border: `1px solid ${P.gold}18` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: P.gold }}>◉</span>
              <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>Unlock your Full Scent ID</p>
            </div>
            <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, lineHeight: 1.6 }}>
              This profile reflects your emotional preferences. To see how fragrance actually performs on <em>your skin</em>, visit a Replica counter for a quick microbiome scan.
            </p>
            <button
              type="button"
              onClick={onOpenStores}
              style={{ padding: 0, background: "none", border: "none", fontFamily: sans, fontSize: 10, color: P.gold, margin: "10px 0 0", cursor: "pointer", letterSpacing: 1 }}
            >
              Find nearest Replica counter →
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={380}>
          <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "22px 0 10px" }}>Suggested Cartridges</p>
          {[
            { name: "Warm Amber", notes: "Amber, benzoin, tonka", match: "High affinity", color: P.gold },
            { name: "Skin Musk", notes: "White musk, iris, cashmere", match: "Strong match", color: P.roseDust },
            { name: "Sandalwood Veil", notes: "Sandalwood, cream, cedar", match: "Good match", color: "#B89878" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: P.glassBg, borderRadius: 14, marginBottom: 8, border: `1px solid ${P.glassBorder}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 12, height: 28, borderRadius: 5, background: `${c.color}40` }}/>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: serif, fontSize: 14, fontWeight: 500, color: P.charcoal, margin: 0 }}>{c.name}</p>
                <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "2px 0 0" }}>{c.notes}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: sans, fontSize: 9, color: P.gold, letterSpacing: 0.5 }}>{c.match}</span>
                <p style={{ fontFamily: sans, fontSize: 8, color: P.roseDust, margin: "2px 0 0" }}>Preference-based</p>
              </div>
            </div>
          ))}
          <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, textAlign: "center", margin: "6px 0 0", fontStyle: "italic" }}>
            Skin-match accuracy unlocks after in-store Decode scan
          </p>
        </FadeIn>

        <FadeIn delay={500}>
          <Btn dark full onClick={onComplete} style={{ marginTop: 22 }}>Explore the App →</Btn>
        </FadeIn>
      </div>
    </div>
  );
}

function LayeringDeviceFigure({ carts, ratios, connected, width = 130, height = 188 }) {
  const windowHeight = Math.round(height * 0.66);
  const padding = 14;
  return (
    <div style={{ width, height, background: "linear-gradient(180deg, #F1ECE4, #ECE4DA)", borderRadius: 28, position: "relative", boxShadow: "0 14px 30px rgba(0,0,0,0.18)", padding }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 28, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.34)" }} />
      <div style={{ position: "relative", height: windowHeight, borderRadius: 16, overflow: "hidden", display: "flex", gap: 4, background: "rgba(29,26,24,0.04)" }}>
        {carts.map((c, i) => (
          <div key={c.name} style={{ flex: ratios[i], background: `${c.color}2E`, transition: "flex 0.35s ease", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 8, overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                top: `${100 - c.level}%`,
                background: c.color,
                opacity: 1,
                transition: "top 0.35s ease",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", width: 18, height: 18, borderRadius: "50%", background: connected ? "rgba(92,84,76,0.9)" : "rgba(128,121,114,0.82)" }} />
    </div>
  );
}

function PlaceholderDeviceFigure({ width = 74, height = 108 }) {
  const bodyWidth = width;
  const bodyHeight = height;
  const windowWidth = width - 24;
  const windowHeight = height - 42;

  return (
    <div style={{ position: "relative", width: bodyWidth, height: bodyHeight, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: "8% 6%", borderRadius: 26, background: "radial-gradient(circle at 50% 38%, rgba(244,237,228,0.95), rgba(233,223,211,0.24) 62%, rgba(255,255,255,0) 76%)" }} />
      <div style={{ position: "relative", width: bodyWidth * 0.74, height: bodyHeight * 0.84, borderRadius: 24, background: "linear-gradient(180deg, #FBF8F2, #ECE3D8)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 16px 26px rgba(63,48,39,0.10)" }}>
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: windowWidth * 0.82, height: windowHeight * 0.76, borderRadius: 18, background: "#F2EBE1", display: "grid", gridTemplateColumns: "1.1fr 1fr 0.9fr", gap: 4, padding: 5 }}>
          {[P.gold, P.roseDust, P.sage].map((color, index) => (
            <div key={index} style={{ borderRadius: 12, background: `${color}45`, boxShadow: "inset 0 -16px 22px rgba(255,255,255,0.28)" }} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", width: 18, height: 18, borderRadius: "50%", background: "rgba(126,116,105,0.68)" }} />
      </div>
    </div>
  );
}

function MiniAdjustDeviceFigure() {
  return (
    <div style={{ width: 82, height: 82, borderRadius: 24, background: "linear-gradient(180deg, #F4EEE7, #ECE3D9)", border: `1px solid ${P.glassBorder}`, boxShadow: "0 10px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
      <div style={{ width: 38, height: 56, borderRadius: 18, background: "linear-gradient(180deg, #FBF8F2, #EEE7DD)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 18px rgba(63,48,39,0.08)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 18, height: 24, borderRadius: 9, background: "#F2EBE1", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, padding: 3 }}>
          <div style={{ borderRadius: 6, background: `${P.gold}28` }} />
          <div style={{ borderRadius: 6, background: `${P.roseDust}24` }} />
          <div style={{ borderRadius: 6, background: `${P.sage}26` }} />
        </div>
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: "rgba(126,116,105,0.58)" }} />
      </div>
    </div>
  );
}

function GuidedStepsCard({ steps, activeIndex, onChange, onAction }) {
  const trackRef = React.useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = 188;
    const width = cardWidth + 12;
    el.scrollTo({ left: activeIndex * width, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const cardWidth = 188;
          const width = cardWidth + 12;
          const nextIndex = Math.round(el.scrollLeft / width);
          if (nextIndex !== activeIndex && nextIndex >= 0 && nextIndex < steps.length) {
            onChange(nextIndex);
          }
        }}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          paddingBottom: 2,
          paddingRight: 12,
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isLocked = step.locked;
          return (
            <div
              key={step.id}
              style={{
                flex: "0 0 188px",
                width: 188,
                minHeight: 220,
                borderRadius: 16,
                border: `1px solid ${isActive ? P.charcoal : P.glassBorder}`,
                background: isLocked ? "#ECE7E0" : P.ivory,
                padding: 14,
                scrollSnapAlign: "start",
                opacity: isLocked ? 0.72 : 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.3 }}>
                  Step {index + 1} / {steps.length}
                </p>
                <div style={{ padding: "6px 10px", borderRadius: 999, background: step.completed ? `${P.sage}38` : isLocked ? "rgba(29,26,24,0.05)" : P.cream, fontFamily: sans, fontSize: 10, fontWeight: 600, color: P.charcoal, whiteSpace: "nowrap" }}>
                  {step.completed ? "Done" : isLocked ? "Locked" : "Open"}
                </div>
              </div>
              <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal, margin: "10px 0 0", letterSpacing: -0.3, lineHeight: 1.16 }}>
                {step.title}
              </p>
              <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "10px 0 0", lineHeight: 1.45 }}>
                {step.body}
              </p>
              {isLocked && (
                <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: "8px 0 0", lineHeight: 1.45 }}>
                  {step.lockedMessage}
                </p>
              )}
              <div style={{ marginTop: "auto", paddingTop: 12 }}>
                <Btn dark full disabled={isLocked || step.completed} onClick={() => onAction(step.id)}>
                  {step.completed ? "Completed" : step.cta}
                </Btn>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`Go to step ${index + 1}`}
            style={{
              width: index === activeIndex ? 22 : 7,
              height: 7,
              borderRadius: 999,
              border: "none",
              background: step.locked ? P.warmBeige : index === activeIndex ? P.charcoal : P.goldLight,
              cursor: "pointer",
              opacity: step.locked ? 0.7 : 1,
              transition: "all 0.2s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function HomeScreen({
  hasSkinID,
  hasUploadedMemory,
  carts,
  ratios,
  connected,
  batteryLevel,
  onToggleConnected,
  onRequestPairing,
  onSprayBlend,
  onOpenStores,
  memories,
  setupSteps,
  onOpenProgressStep,
}) {
  const currentBlendName = !hasUploadedMemory && !hasSkinID ? "Live device" : hasSkinID ? "Today’s Personal Chapter" : "Your Personal Chapter";
  const completedSteps = setupSteps.filter((step) => step.done).length;
  const showProgressTracker = completedSteps < setupSteps.length;
  const hasProfileInput = hasUploadedMemory || hasSkinID;

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 96, overflowY: "auto", height: "100%" }}>
      <FadeIn>
        <Title>Home</Title>
      </FadeIn>

      {showProgressTracker && (
        <FadeIn delay={40}>
          <Glass style={{ marginTop: 18, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div>
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>
                  Your progress
                </p>
                <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "4px 0 0", lineHeight: 1.5 }}>
                  Track what you’ve completed and what comes next.
                </p>
              </div>
              <div style={{ padding: "6px 10px", borderRadius: 999, background: P.ivory, border: `1px solid ${P.glassBorder}`, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, whiteSpace: "nowrap" }}>
                {completedSteps}/3 done
              </div>
            </div>
            <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
              {setupSteps.map((step, index) => (
                <div key={step.title} style={{ display: "grid", gridTemplateColumns: "24px 1fr auto", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: step.done ? `${P.sage}40` : P.ivory, border: `1px solid ${step.done ? `${P.sage}70` : P.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal }}>
                    {step.done ? "✓" : index + 1}
                  </div>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>{step.title}</p>
                    <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "3px 0 0", lineHeight: 1.45 }}>{step.caption}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProgressStep(step.id)}
                    style={{ padding: "8px 10px", borderRadius: 999, border: `1px solid ${P.glassBorder}`, background: step.done ? `${P.sage}24` : P.ivory, fontFamily: sans, fontSize: 10, fontWeight: 600, color: P.charcoal, whiteSpace: "nowrap", cursor: "pointer" }}
                  >
                    {step.done ? "View" : step.cta}
                  </button>
                </div>
              ))}
            </div>
          </Glass>
        </FadeIn>
      )}

      {hasProfileInput && (
        <FadeIn delay={100}>
          <Glass style={{ marginTop: 18, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
              <div>
                <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, color: P.warmGray, margin: 0, letterSpacing: 1.4, textTransform: "uppercase" }}>
                  {hasSkinID ? "Verified Scent ID" : "Starting Profile"}
                </p>
                <p style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.7, lineHeight: 1.08 }}>
                  {hasSkinID ? "Warm / Long-wear / Skin Musk" : "Warm / Soft / Grounded"}
                </p>
                <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "10px 0 0", lineHeight: 1.6 }}>
                  {hasSkinID
                    ? "Your profile is now verified on skin, so recommendations reflect both preference and real wear performance."
                    : "This is your current scent direction based on preferences and memories, before any skin analysis is added."}
                </p>

                <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(hasSkinID
                    ? ["comforting warm blends", "softer musks", "close-to-skin wear"]
                    : ["soft warmth", "smooth texture", "grounded direction"]).map((tag) => (
                    <div key={tag} style={{ padding: "7px 10px", borderRadius: 999, background: P.ivory, border: `1px solid ${P.glassBorder}`, fontFamily: sans, fontSize: 11, color: P.charcoal }}>
                      {tag}
                    </div>
                  ))}
                </div>

                {!hasSkinID && (
                  <button
                    type="button"
                    onClick={onOpenStores}
                    style={{ padding: 0, marginTop: 14, background: "none", border: "none", fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, cursor: "pointer" }}
                  >
                    Find a counter for Decode →
                  </button>
                )}
              </div>
              <div style={{ padding: "7px 10px", borderRadius: 999, background: hasSkinID ? `${P.sage}35` : `${P.softPink}`, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, whiteSpace: "nowrap" }}>
                {hasSkinID ? "Verified" : "Pending"}
              </div>
            </div>
          </Glass>
        </FadeIn>
      )}

      <FadeIn delay={160}>
        <div style={{ marginTop: 18, borderRadius: 22, background: P.cream, padding: 20, position: "relative", overflow: "hidden", border: `1px solid ${P.glassBorder}` }}>
          <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.warmGray, margin: 0, letterSpacing: 1.2, textTransform: "uppercase" }}>
            Current Blend
          </p>
          <p style={{ fontFamily: sans, fontSize: 26, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.8 }}>
            {currentBlendName}
          </p>
          <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
            {connected
              ? hasProfileInput
                ? "Warm Amber, Skin Musk, and Fig Leaf balanced for how you want to smell today."
                : "Your device is paired. Add a memory or complete Decode to personalize what these loaded cartridges become."
              : "Pair your device to unlock live battery, cartridge sync, and blend updates."}
          </p>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {connected ? (
              <>
                <BatteryBadge level={batteryLevel} />
                <span style={{ fontFamily: sans, fontSize: 11, color: P.warmGray }}>
                  Device connected
                </span>
              </>
            ) : null}
          </div>

          {!connected && (
            <div style={{ marginTop: 18, borderRadius: 20, background: P.ivory, border: `1px solid ${P.glassBorder}`, padding: 18, boxShadow: "0 14px 24px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 132, height: 132, borderRadius: 28, background: "linear-gradient(180deg, #F4EEE7, #ECE3D9)", border: `1px solid rgba(255,255,255,0.6)`, boxShadow: "0 16px 30px rgba(0,0,0,0.08)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MiniAdjustDeviceFigure />
                </div>
              </div>
              <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: P.charcoal, margin: "18px 0 0", textAlign: "center" }}>
                Pair your device
              </p>
              <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "8px auto 0", lineHeight: 1.55, textAlign: "center", maxWidth: 240 }}>
                Connect your Personal Chapter device to read battery, detect the loaded cartridges, and unlock blend updates.
              </p>
              <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
                <Btn dark onClick={onRequestPairing} style={{ minWidth: 180 }}>
                  Pair Device
                </Btn>
              </div>
            </div>
          )}

          {connected && (
            <>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
                <LayeringDeviceFigure carts={carts} ratios={ratios} connected={connected} width={128} height={186} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  {carts.map((c, i) => (
                    <div key={c.name} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                      <div>
                        <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>{c.name}</p>
                        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "3px 0 0" }}>{c.level}% left</p>
                      </div>
                      <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: P.charcoal }}>{ratios[i]}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 18, display: "flex", height: 4, borderRadius: 999, overflow: "hidden" }}>
                {carts.map((c, i) => <div key={c.name} style={{ flex: ratios[i], background: c.color, transition: "flex 0.35s ease" }} />)}
              </div>
            </>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={240}>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: P.charcoal, margin: 0 }}>Recent Memories</p>
          </div>
          {hasUploadedMemory ? (
            <div style={{ display: "grid", gap: 10 }}>
              {memories.slice(0, 2).map((m) => (
                <div key={m.id} style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${P.glassBorder}`, background: P.glassBg }}>
                  <div style={{ background: m.grad, padding: "16px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22, opacity: 0.85 }}>{m.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>{m.title}</p>
                      <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.68)", margin: "4px 0 0" }}>{m.emotion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Glass style={{ padding: 18 }}>
              <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal, margin: 0 }}>
                No recent activity
              </p>
              <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
                Add your first memory to start shaping your scent direction and build your Personal Chapter.
              </p>
            </Glass>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

// ─── BLEND ───
function ScentLabScreen({
  deviceCarts,
  memories,
  memoryPrompts,
  ratios,
  connected,
  hasSkinID,
  accordLibrary,
  onOpenMemoryComposer,
  onAdjustRatio,
  onSprayBlend,
  onToggleConnected,
  onRequestPairing,
  initialSection = "adjust",
}) {
  const [section, setSection] = useState(initialSection);
  const [labPrimary, setLabPrimary] = useState("Warm Amber");
  const [labSecondary, setLabSecondary] = useState("Skin Musk");
  const [labTertiary, setLabTertiary] = useState("Fig Leaf");

  useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);

  const labOptions = useMemo(() => accordLibrary.slice(0, 12), [accordLibrary]);
  const primaryAccord = useMemo(() => labOptions.find((item) => item.name === labPrimary) || labOptions[0], [labOptions, labPrimary]);
  const secondaryAccord = useMemo(() => labOptions.find((item) => item.name === labSecondary) || labOptions[1] || labOptions[0], [labOptions, labSecondary]);
  const tertiaryAccord = useMemo(() => labOptions.find((item) => item.name === labTertiary) || labOptions[2] || labOptions[0], [labOptions, labTertiary]);
  const labInsight = useMemo(() => getBlendLabInsights(primaryAccord, secondaryAccord, tertiaryAccord), [primaryAccord, secondaryAccord, tertiaryAccord]);
  const labSelectStyle = {
    width: "100%",
    padding: "13px 42px 13px 14px",
    borderRadius: 14,
    border: `1px solid ${P.glassBorder}`,
    background: `${P.ivory} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Cpath d='M5 7.25 9 11l4-3.75' fill='none' stroke='%238A847D' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 14px center`,
    fontFamily: sans,
    fontSize: 13,
    color: P.charcoal,
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.42)",
  };

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 96, overflowY: "auto", height: "100%" }}>
      <FadeIn>
        <Title>Blend</Title>
      </FadeIn>

      <FadeIn delay={90}>
        <div style={{ marginTop: 18, padding: 4, borderRadius: 18, background: P.cream, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, border: `1px solid ${P.glassBorder}` }}>
          {[
            { id: "adjust", label: "Adjust" },
            { id: "memory", label: "Memory" },
            { id: "lab", label: "Lab" },
          ].map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              style={{
                padding: "12px 10px",
                borderRadius: 14,
                border: "none",
                background: section === item.id ? P.ivory : "transparent",
                color: section === item.id ? P.charcoal : P.warmGray,
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {section === "lab" && labInsight && (
        <>
          <FadeIn delay={150}>
            <Glass style={{ marginTop: 18, padding: 16 }}>
              <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>Blend Lab</p>
              <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
                Build a three-accord composition and see how the notes behave together before you take it into the live blend.
              </p>
            </Glass>
          </FadeIn>

          <FadeIn delay={190}>
            <Glass style={{ marginTop: 14, padding: 16 }}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "grid", gap: 10 }}>
                {[
                  { label: "Accord 1", value: labPrimary, onChange: setLabPrimary, blocked: [labSecondary, labTertiary] },
                  { label: "Accord 2", value: labSecondary, onChange: setLabSecondary, blocked: [labPrimary, labTertiary] },
                  { label: "Accord 3", value: labTertiary, onChange: setLabTertiary, blocked: [labPrimary, labSecondary] },
                ].map((field) => (
                  <div key={field.label}>
                    <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1.1 }}>{field.label}</p>
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      style={labSelectStyle}
                    >
                      {labOptions.filter((item) => !field.blocked.includes(item.name)).map((item) => (
                        <option key={item.name} value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              </div>

              <div style={{ marginTop: 16, padding: "18px 18px", borderRadius: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.48), rgba(247,244,239,0.9))", border: `1px solid ${P.glassBorder}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                  <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.2 }}>Blend Study</p>
                </div>

                <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[primaryAccord, secondaryAccord, tertiaryAccord].map((accord) => (
                    <div key={accord.name} style={{ padding: "6px 9px", borderRadius: 999, background: `${accord.color}14`, border: `1px solid ${accord.color}26`, fontFamily: sans, fontSize: 10, fontWeight: 600, color: P.charcoal }}>
                      {accord.name}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 16, background: P.mist, border: `1px solid ${P.glassBorder}` }}>
                  <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0, lineHeight: 1.6 }}>
                    {hasSkinID
                      ? "`Accord fit` shows how well the three notes work together as a composition. `Skin fit` shows how well that composition suits your verified skin profile."
                      : "`Accord fit` shows how well the three notes work together as a composition. Complete Decode to unlock `Skin fit` for your biology."}
                  </p>
                </div>

                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ padding: "14px 14px", borderRadius: 18, background: P.ivory, border: `1px solid ${P.glassBorder}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                      <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.1 }}>Accord fit</p>
                      <div style={{ padding: "6px 8px", borderRadius: 999, background: `${P.gold}18`, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal }}>
                        {labInsight.accordFit}%
                      </div>
                    </div>
                    <div style={{ marginTop: 10, height: 6, borderRadius: 999, background: P.warmBeige, overflow: "hidden" }}>
                      <div style={{ width: `${labInsight.accordFit}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #9B8E7C, #B7ACA0)" }} />
                    </div>
                    <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "10px 0 0", lineHeight: 1.55 }}>
                      {labInsight.accordTone}
                    </p>
                  </div>

                  <div style={{ padding: "14px 14px", borderRadius: 18, background: P.ivory, border: `1px solid ${P.glassBorder}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                      <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.1 }}>Skin fit</p>
                      {hasSkinID ? (
                        <div style={{ padding: "6px 8px", borderRadius: 999, background: `${P.sage}25`, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal }}>
                          {labInsight.yourFit}%
                        </div>
                      ) : (
                        <div style={{ padding: "6px 8px", borderRadius: 999, background: P.cream, fontFamily: sans, fontSize: 10, fontWeight: 600, color: P.warmGray }}>
                          Locked
                        </div>
                      )}
                    </div>
                    {hasSkinID ? (
                      <>
                        <div style={{ marginTop: 10, height: 6, borderRadius: 999, background: P.warmBeige, overflow: "hidden" }}>
                          <div style={{ width: `${labInsight.yourFit}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #8EA189, #B7B9AA)" }} />
                        </div>
                        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "10px 0 0", lineHeight: 1.55 }}>
                          {labInsight.yourTone}
                        </p>
                      </>
                    ) : (
                      <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 14, background: P.mist, border: `1px solid ${P.glassBorder}` }}>
                        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: 0, lineHeight: 1.55 }}>
                          Complete Decode first to unlock your verified skin fit percentage.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.1 }}>Blend mood</p>
                    <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 500, color: P.charcoal, margin: "6px 0 0", lineHeight: 1.55 }}>{labInsight.mood}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.1 }}>What it smells like</p>
                    <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>{labInsight.result}</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { label: "Opening", value: labInsight.opening },
                  { label: "Heart", value: labInsight.heart },
                  { label: "Dry-down", value: labInsight.drydown },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "14px 12px", borderRadius: 18, background: P.mist, border: `1px solid ${P.glassBorder}` }}>
                    <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.1 }}>{item.label}</p>
                    <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 500, color: P.charcoal, margin: "8px 0 0", lineHeight: 1.45 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Glass>
          </FadeIn>
        </>
      )}

      {section === "adjust" && (
        <>
          {connected && (
            <FadeIn delay={150}>
              <Glass style={{ marginTop: 18, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>Live Device</p>
                    <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
                      Adjust the three cartridges currently detected in the device, then update the device.
                    </p>
                  </div>
                  <button onClick={onToggleConnected} style={{ padding: "10px 14px", borderRadius: 14, background: P.charcoal, color: P.ivory, border: `1px solid ${P.charcoal}`, fontFamily: sans, fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Connected
                  </button>
                </div>
              </Glass>
            </FadeIn>
          )}
          <FadeIn delay={connected ? 190 : 150}>
            <Glass style={{ marginTop: 14, padding: 18 }}>
              {!connected ? (
                <div style={{ borderRadius: 20, background: P.ivory, border: `1px solid ${P.glassBorder}`, padding: 18, boxShadow: "0 14px 24px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 132, height: 132, borderRadius: 28, background: "linear-gradient(180deg, #F4EEE7, #ECE3D9)", border: `1px solid rgba(255,255,255,0.6)`, boxShadow: "0 16px 30px rgba(0,0,0,0.08)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlaceholderDeviceFigure width={74} height={108} />
                    </div>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: P.charcoal, margin: "18px 0 0", textAlign: "center" }}>
                    Pair your device
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "8px auto 0", lineHeight: 1.55, textAlign: "center", maxWidth: 240 }}>
                    Connect the physical device first so Blend can read battery, detect the loaded cartridges, and unlock live blend updates.
                  </p>
                  <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
                    <Btn dark onClick={onRequestPairing} style={{ minWidth: 180 }}>
                      Pair Device
                    </Btn>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <LayeringDeviceFigure carts={deviceCarts} ratios={ratios} connected={connected} width={138} height={198} />
                  </div>
                  <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                    {deviceCarts.map((c, i) => (
                      <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 10, alignItems: "center", padding: "12px 14px", borderRadius: 16, background: P.ivory, border: `1px solid ${P.glassBorder}` }}>
                        <div>
                          <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>{c.name}</p>
                          <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "4px 0 0" }}>{c.level}% left</p>
                        </div>
                        <button onClick={() => onAdjustRatio(i, -5)} style={{ width: 34, height: 34, borderRadius: "50%", background: P.cream, border: `1px solid ${P.glassBorder}`, color: P.charcoal, cursor: "pointer", fontSize: 16 }}>−</button>
                        <div style={{ minWidth: 44, textAlign: "center", fontFamily: sans, fontSize: 13, fontWeight: 600, color: P.charcoal }}>{ratios[i]}%</div>
                        <button onClick={() => onAdjustRatio(i, 5)} style={{ width: 34, height: 34, borderRadius: "50%", background: P.cream, border: `1px solid ${P.glassBorder}`, color: P.charcoal, cursor: "pointer", fontSize: 16 }}>+</button>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, display: "flex", height: 4, borderRadius: 999, overflow: "hidden", background: P.warmBeige }}>
                    {deviceCarts.map((c, i) => <div key={c.name} style={{ flex: ratios[i], background: c.color, transition: "flex 0.35s ease" }} />)}
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <Btn dark full onClick={onSprayBlend} disabled={!connected}>
                      Update Blend
                    </Btn>
                  </div>
                </>
              )}
            </Glass>
          </FadeIn>
        </>
      )}

      {section === "memory" && (
        <>
          <FadeIn delay={150}>
            <Glass style={{ marginTop: 18, padding: 16 }}>
              <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>Teach the system through memory</p>
              <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
                Each memory sharpens future recommendations and keeps your blend direction personal.
              </p>
            </Glass>
          </FadeIn>
          <FadeIn delay={190}>
            <button type="button" onClick={onOpenMemoryComposer} style={{ width: "100%", marginTop: 16, borderRadius: 18, padding: "20px 18px", border: `1px dashed ${P.glassBorder}`, background: P.cream, textAlign: "left", cursor: "pointer" }}>
              <span style={{ fontSize: 24, color: P.warmGray, display: "block", marginBottom: 8 }}>+</span>
              <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal, margin: 0 }}>Add a memory</p>
              <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "6px 0 0" }}>Photo, camera, or written moment.</p>
            </button>
          </FadeIn>
          {memories.length > 0 ? (
            <div style={{ marginTop: 14 }}>
              <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal, margin: "0 0 10px" }}>Your memories</p>
              <div style={{ display: "grid", gap: 10 }}>
                {memories.slice(0, 4).map((m, i) => (
                  <FadeIn key={m.id} delay={220 + i * 40}>
                    <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${P.glassBorder}` }}>
                      <div style={{ background: m.grad, padding: "16px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 22, opacity: 0.84 }}>{m.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>{m.title}</p>
                          <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.7)", margin: "4px 0 0" }}>{m.emotion}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ) : (
            <FadeIn delay={220}>
              <Glass style={{ marginTop: 14, padding: 18 }}>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal, margin: 0 }}>
                  No memories yet
                </p>
                <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
                  Add your first photo, camera capture, or written vibe to start shaping your scent profile.
                </p>
              </Glass>
            </FadeIn>
          )}

          <div style={{ marginTop: 14 }}>
            <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal, margin: "0 0 10px" }}>Inspiration moments</p>
            <div style={{ display: "grid", gap: 10 }}>
              {memoryPrompts.slice(0, 4).map((m, i) => (
                <FadeIn key={m.id} delay={260 + i * 40}>
                  <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${P.glassBorder}` }}>
                    <div style={{ background: m.grad, padding: "16px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 22, opacity: 0.84 }}>{m.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>{m.title}</p>
                        <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.7)", margin: "4px 0 0" }}>{m.emotion}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ExploreScreen({
  hasSkinID,
  hasProfileInput,
  connected,
  accords,
  deviceCarts,
  onPreviewAccord,
  onCheckDevice,
  onOpenMemoryComposer,
  onOpenStores,
  onRequestPairing,
}) {
  const [cat, setCat] = useState("for-you");
  const cats = [
    { id: "for-you", l: "For You" },
    { id: "warm", l: "Warm" },
    { id: "fresh", l: "Fresh" },
    { id: "woody", l: "Woody" },
    { id: "floral", l: "Floral" },
    { id: "musky", l: "Musky" },
  ];
  const filteredAccords = useMemo(() => {
    if (cat === "for-you") return accords.slice().sort((a, b) => b.match - a.match);
    return accords.filter(a => a.family === cat);
  }, [accords, cat]);

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 96, overflowY: "auto", height: "100%" }}>
      <FadeIn>
        <Title>Explore</Title>
      </FadeIn>

      <FadeIn delay={90}>
        <Glass style={{ marginTop: 18, padding: 16 }}>
          <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: 0 }}>
            {hasSkinID ? "Verified recommendations" : hasProfileInput ? "Profile-based recommendations" : "The scent library"}
          </p>
          <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
            {hasSkinID
              ? "These cartridges are ranked by how they perform on your skin as well as your preferred scent direction."
              : hasProfileInput
                ? "These are the best starting cartridges based on the moments and moods you’ve shared so far."
                : "Browse the full accord library first. Add a memory or complete Decode later to unlock more personal ranking."}
          </p>
        </Glass>
      </FadeIn>
      <FadeIn delay={130}>
        <div style={{ display: "flex", gap: 8, marginTop: 14, overflowX: "auto" }}>
          {cats.map(c => (
            (() => {
              const familyStyle = FAMILY_STYLES[c.id] || FAMILY_STYLES["for-you"];
              const active = cat === c.id;
              return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: `1px solid ${active ? familyStyle.border : P.glassBorder}`,
                background: active ? familyStyle.bg : P.ivory,
                color: active ? familyStyle.text : P.warmGray,
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {c.l}
            </button>
              );
            })()
          ))}
        </div>
      </FadeIn>
      <div style={{ marginTop: 16 }}>
        {filteredAccords.slice(0, 8).map((c, i) => {
          const loadedIndex = connected ? deviceCarts.findIndex(cart => cart.name === c.name) : -1;
          const isLoaded = loadedIndex >= 0;
          const familyStyle = FAMILY_STYLES[c.family] || FAMILY_STYLES.fresh;
          return (
            <FadeIn key={c.name} delay={170 + i * 40}>
              <Glass style={{ marginBottom: 12, padding: 0, overflow: "hidden" }}>
                <div style={{ display: "flex", gap: 14, padding: 16 }}>
                  <div style={{ width: 48, height: 72, borderRadius: 12, background: `linear-gradient(180deg, ${familyStyle.bg}, rgba(255,255,255,0.72))`, border: `1px solid ${familyStyle.border}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 14, height: 38, borderRadius: 6, background: familyStyle.border }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                      <div>
                        <p style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: P.charcoal, margin: 0 }}>{c.name}</p>
                        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "5px 0 0" }}>{c.notes}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal }}>
                          {hasSkinID ? `${c.match}%` : hasProfileInput ? c.pref : c.family}
                        </span>
                        <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "3px 0 0" }}>
                          {hasSkinID ? "skin match" : hasProfileInput ? "best fit" : "accord family"}
                        </p>
                      </div>
                    </div>
                    <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "10px 0 0", lineHeight: 1.5 }}>
                      {hasSkinID ? c.desc : hasProfileInput ? `Preference-based recommendation for your current profile.` : c.desc}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", borderTop: `1px solid ${P.glassBorder}` }}>
                  <button onClick={() => onPreviewAccord(c)} style={{ flex: 1, padding: "12px", background: "none", border: "none", borderRight: `1px solid ${P.glassBorder}`, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, cursor: "pointer" }}>
                    Preview
                  </button>
                  <button
                    onClick={() => connected ? onCheckDevice(c) : onRequestPairing()}
                    style={{ flex: 1, padding: "12px", background: "none", border: "none", fontFamily: sans, fontSize: 11, fontWeight: 600, color: connected ? (isLoaded ? P.charcoal : P.warmGray) : P.charcoal, cursor: "pointer" }}
                  >
                    {connected ? (isLoaded ? "In Device" : "Check Device") : "Pair Device"}
                  </button>
                </div>
              </Glass>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}

// ─── MEMORIES ───
function MemoriesScreen({ memories, onDummyUpload }) {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><Label>AI Memory Recognition</Label></FadeIn>
      <FadeIn delay={50}><Title>Your Memories</Title></FadeIn>
      <FadeIn delay={80}>
        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, marginTop: 6, lineHeight: 1.6, maxWidth: 280 }}>
          Each memory shapes your Scent Profile. Add more to refine your fragrance directions.
        </p>
      </FadeIn>

      <FadeIn delay={130}>
        <button type="button" onClick={onDummyUpload} style={{ width: "100%", marginTop: 16, borderRadius: 16, padding: "22px", border: `1.5px dashed ${P.gold}30`, background: `${P.cream}40`, textAlign: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 24, color: P.gold, display: "block", marginBottom: 6 }}>+</span>
          <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, fontWeight: 500 }}>Add a Memory</p>
          <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "4px 0 0" }}>Photo · Voice note · Written moment</p>
        </button>
      </FadeIn>

      <div style={{ marginTop: 14 }}>
        {memories.map((m, i) => (
          <FadeIn key={m.id || i} delay={200 + i * 60}>
            <div onClick={() => setSel(sel === i ? null : i)} style={{ borderRadius: 16, marginBottom: 10, overflow: "hidden", cursor: "pointer", border: `1px solid ${P.glassBorder}` }}>
              <div style={{ background: m.grad, padding: "16px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22, opacity: 0.8 }}>{m.icon}</span>
                <div>
                  <p style={{ fontFamily: serif, fontSize: 14, fontWeight: 500, color: "white", margin: 0 }}>{m.title}</p>
                  <p style={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,0.55)", margin: "3px 0 0" }}>{m.emotion}</p>
                </div>
              </div>
              {sel === i && (
                <div style={{ background: P.glassBg, padding: "14px 16px", borderBottom: `1px solid ${P.glassBorder}` }}>
                  <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: "0 0 5px" }}>AI Scent Translation</p>
                  <p style={{ fontFamily: serif, fontSize: 13, fontStyle: "italic", color: P.charcoal, margin: 0, lineHeight: 1.6 }}>{m.scent}</p>
                  <div style={{ marginTop: 10 }}>
                    <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.warmGray, textTransform: "uppercase", margin: "0 0 8px" }}>Olfactive Breakdown</p>
                    {m.breakdown.slice(0, 3).map((b, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontFamily: sans, fontSize: 9, color: P.charcoal }}>{b.name}</span>
                          <span style={{ fontFamily: sans, fontSize: 8, color: P.roseDust }}>{b.accord}% accord · {b.fit}% fit</span>
                        </div>
                        <div style={{ height: 3, borderRadius: 2, background: P.warmBeige, overflow: "hidden" }}>
                          <div style={{ width: `${b.fit}%`, height: "100%", borderRadius: 2, background: b.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

// ─── DEVICE ───
function DeviceScreen({ carts, ratios, connected, onToggleConnected, onAdjustRatio, onSprayBlend, onOpenRefill }) {
  const adj = (idx, d) => onAdjustRatio(idx, d);

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><Label>Smart layering</Label></FadeIn>
      <FadeIn delay={50}><Title>Your Device</Title></FadeIn>

      <FadeIn delay={100}>
        <div style={{ marginTop: 18, borderRadius: 22, background: `linear-gradient(150deg, ${P.charcoal}, ${P.deepPlum})`, padding: "26px 20px", textAlign: "center", position: "relative" }}>
          <div style={{ width: 54, height: 92, margin: "0 auto 14px", background: `linear-gradient(180deg, ${P.warmBeige}, ${P.cream})`, borderRadius: 10, position: "relative", boxShadow: `0 8px 28px rgba(0,0,0,0.3)` }}>
            <div style={{ position: "absolute", top: 8, left: 5, right: 5, bottom: 26, display: "flex", gap: 2, borderRadius: 4, overflow: "hidden" }}>
              {carts.map((c, i) => <div key={i} style={{ flex: ratios[i], background: c.color, transition: "flex 0.4s", opacity: 0.75 }}/>)}
            </div>
            <div style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: connected ? P.gold : P.warmGray, boxShadow: connected ? `0 0 12px ${P.gold}50` : "none", transition: "all 0.4s" }}/>
          </div>
          <p style={{ fontFamily: serif, fontSize: 13, color: P.ivory, fontStyle: "italic", margin: 0 }}>Replica Layering Device</p>
          <p style={{ fontFamily: sans, fontSize: 8, color: P.roseDust, margin: "4px 0 0", opacity: 0.6 }}>Powered by S.C.E.N.T. Technology</p>
          <button onClick={onToggleConnected} style={{ marginTop: 12, padding: "7px 20px", borderRadius: 16, background: connected ? `${P.gold}15` : "rgba(255,255,255,0.05)", border: `1px solid ${connected ? P.gold : "rgba(255,255,255,0.1)"}`, color: connected ? P.gold : P.roseDust, fontFamily: sans, fontSize: 8, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
            {connected ? "● Connected" : "Connect Device"}
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={220}>
        <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "20px 0 4px" }}>Loaded Cartridges</p>
        <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "0 0 10px", lineHeight: 1.5 }}>Reported by the physical device. Cartridge swaps happen on hardware, then sync back here.</p>
        {carts.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: P.glassBg, borderRadius: 12, marginBottom: 8, border: `1px solid ${P.glassBorder}` }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }}/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: P.charcoal, margin: 0 }}>{c.name}</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: P.warmGray, margin: "1px 0 0" }}>{c.family}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => adj(i, -5)} style={{ width: 22, height: 22, borderRadius: "50%", background: P.cream, border: `1px solid ${P.warmBeige}`, cursor: "pointer", fontSize: 12, color: P.warmGray, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, color: P.charcoal, width: 34, textAlign: "center" }}>{ratios[i]}%</span>
              <button onClick={() => adj(i, 5)} style={{ width: 22, height: 22, borderRadius: "50%", background: P.cream, border: `1px solid ${P.warmBeige}`, cursor: "pointer", fontSize: 12, color: P.warmGray, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          </div>
        ))}
      </FadeIn>

      <FadeIn delay={350}>
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <div style={{ display: "flex", height: 5, borderRadius: 3, overflow: "hidden", marginBottom: 14 }}>
            {carts.map((c, i) => <div key={i} style={{ flex: ratios[i], background: c.color, transition: "flex 0.4s" }}/>)}
          </div>
          <Btn dark onClick={onSprayBlend} disabled={!connected}>Update Blend</Btn>
          {!connected && <p style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, marginTop: 8 }}>Connect device to update</p>}
        </div>
      </FadeIn>

      <FadeIn delay={420}>
        <div style={{ marginTop: 20, padding: "14px", borderRadius: 14, background: P.glassBg, border: `1px solid ${P.glassBorder}` }}>
          <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.warmGray, textTransform: "uppercase", margin: "0 0 10px" }}>Cartridge Levels</p>
          {carts.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 2 ? 6 : 0 }}>
              <span style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, width: 72 }}>{c.name}</span>
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: P.warmBeige }}>
                <div style={{ width: `${c.level}%`, height: "100%", borderRadius: 2, background: c.level < 50 ? P.blush : c.color }}/>
              </div>
              <span style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, width: 28, textAlign: "right" }}>{c.level}%</span>
            </div>
          ))}
          <button onClick={onOpenRefill} style={{ padding: 0, background: "none", border: "none", fontFamily: sans, fontSize: 9, color: P.gold, margin: "12px 0 0", cursor: "pointer", letterSpacing: 0.5 }}>Find nearest refill station →</button>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── PROFILE / SCENT ID ───
function ProfileScreen({ hasSkinID, hasProfileInput, onOpenStores, onStartProfile }) {
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn delay={50}><Title>Profile</Title></FadeIn>

      <FadeIn delay={120}>
        <Glass style={{ marginTop: 18, padding: 18 }}>
          {hasProfileInput ? (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
              <div>
                <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.4 }}>
                  {hasSkinID ? "Verified Scent ID" : "Starting Profile"}
                </p>
                <p style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.7 }}>
                  {hasSkinID ? "Warm / Amber / Skin Musk" : "Warm / Soft / Grounded"}
                </p>
                <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.6, maxWidth: 260 }}>
                  {hasSkinID ? "Your biology and preferences are now combined, so the system can recommend what actually suits your skin." : "You’ve created a preference-based profile. A quick in-store skin scan completes the picture."}
                </p>
              </div>
              <div style={{ padding: "7px 10px", borderRadius: 999, background: hasSkinID ? `${P.sage}30` : P.softPink, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, whiteSpace: "nowrap" }}>
                {hasSkinID ? "Verified" : "Pending"}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "center" }}>
                <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.4 }}>
                  Your Profile
                </p>
                <div style={{ padding: "7px 10px", borderRadius: 999, background: P.cream, fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, whiteSpace: "nowrap" }}>
                  Not started
                </div>
              </div>

              <div style={{ marginTop: 14, padding: "16px 16px", borderRadius: 20, background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(247,244,239,0.92))", border: `1px solid ${P.glassBorder}` }}>
                <div style={{ width: 46, height: 46, borderRadius: 16, background: "linear-gradient(180deg, #F4EEE7, #ECE3D9)", border: `1px solid ${P.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "radial-gradient(circle, rgba(155,142,124,0.38), rgba(155,142,124,0.1))", border: `1px solid ${P.gold}30` }} />
                </div>
                <p style={{ fontFamily: sans, fontSize: 21, fontWeight: 600, color: P.charcoal, margin: "14px 0 0", letterSpacing: -0.6 }}>
                  Start your scent profile
                </p>
                <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.65, maxWidth: 270 }}>
                  Add a memory or describe a vibe first. Once Personal Chapter has an emotional cue, it can begin shaping your profile.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <Btn dark onClick={onStartProfile}>Add Memory</Btn>
                  <Btn onClick={onOpenStores}>Decode First</Btn>
                </div>
              </div>
            </div>
          )}
        </Glass>
      </FadeIn>

      {!hasSkinID && (
        <FadeIn delay={200}>
          <Glass style={{ marginTop: 16, padding: 18 }}>
            <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.4 }}>Decode Scan</p>
            <p style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.6 }}>Complete your skin analysis</p>
            <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.6 }}>
              Decode reads the biological layer behind fragrance wear, so your recommendations move from preference-based to skin-verified.
            </p>
            <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 16, background: `${P.gold}10`, border: `1px solid ${P.gold}18` }}>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  "Microbiome balance and skin ecosystem",
                  "pH and skin temperature",
                  "How fragrance diffuses and lasts on you",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 10, color: P.gold, lineHeight: 1.7 }}>•</span>
                    <p style={{ fontFamily: sans, fontSize: 12, color: P.charcoal, margin: 0, lineHeight: 1.55 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <Btn dark onClick={onOpenStores} style={{ marginTop: 16 }}>See Decode Locations</Btn>
            <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "10px 0 0" }}>Quick, non-invasive, and designed for in-store consultation.</p>
          </Glass>
        </FadeIn>
      )}

      {hasSkinID && hasProfileInput && (
        <FadeIn delay={220}>
          <p style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: P.charcoal, margin: "22px 0 10px" }}>Skin Chemistry</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "pH Level", value: "5.4", sub: "Slightly acidic" },
              { label: "Sebum", value: "Medium", sub: "Balanced retention" },
              { label: "Microbiome", value: "Type B+", sub: "Amber-amplifying" },
              { label: "Skin Temp", value: "33.2°C", sub: "Warm diffusion" },
              { label: "Hydration", value: "62%", sub: "Even evaporation" },
              { label: "Longevity", value: "6-8 hr", sub: "Above average" },
            ].map((m, i) => (
              <Glass key={i} style={{ padding: "12px 14px" }}>
                <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, textTransform: "uppercase", letterSpacing: 1.2, margin: 0 }}>{m.label}</p>
                <p style={{ fontFamily: sans, fontSize: 21, fontWeight: 600, color: P.charcoal, margin: "6px 0 2px" }}>{m.value}</p>
                <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: 0 }}>{m.sub}</p>
              </Glass>
            ))}
          </div>
        </FadeIn>
      )}

      {hasProfileInput && (
        <>
          <FadeIn delay={hasSkinID ? 380 : 350}>
            <p style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: P.charcoal, margin: "22px 0 10px" }}>Olfactive Map</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { tier: "Top", notes: "Bergamot · Fig", time: "0-15 min", note: hasSkinID ? "Fades faster on your skin" : "Light and bright" },
                { tier: "Heart", notes: "Iris · Amber", time: "15 min-3 hr", note: hasSkinID ? "Strong presence" : "Core expression" },
                { tier: "Base", notes: "Musk · Sandalwood", time: "3-8 hr", note: hasSkinID ? "Your sweet spot" : "Foundation layer" },
              ].map((n, i) => (
                <Glass key={i} style={{ flex: 1, padding: "14px 10px", textAlign: "center" }}>
                  <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, textTransform: "uppercase", letterSpacing: 1.2, margin: 0 }}>{n.tier}</p>
                  <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: P.charcoal, margin: "8px 0 4px", lineHeight: 1.45 }}>{n.notes}</p>
                  <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: 0 }}>{n.time}</p>
                  <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0" }}>{n.note}</p>
                </Glass>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={hasSkinID ? 480 : 420}>
            <Glass style={{ marginTop: 16, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: P.gold }}>✦</span>
                <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: 1.2, color: P.warmGray, textTransform: "uppercase", margin: 0 }}>Scent Evolution</p>
              </div>
              <p style={{ fontFamily: sans, fontSize: 12, color: P.charcoal, margin: 0, lineHeight: 1.65 }}>
                {hasSkinID
                  ? "Your Scent ID keeps evolving as your skin, routine, and environment shift. Seasonal changes subtly affect how your accords perform. Your Personal Chapter grows with you."
                  : "Your Scent Profile evolves as you add more memories. Each one refines your fragrance directions. Your chapter is always being written."
                }
              </p>
            </Glass>
          </FadeIn>
        </>
      )}
    </div>
  );
}

function ShopScreen({ cartCount, onAddToCart, onOpenStores }) {
  const nearestStore = STORE_LOCATIONS[0];

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><Label>Cartridges and Refill</Label></FadeIn>
      <FadeIn delay={50}><Title>Shop</Title></FadeIn>
      <FadeIn delay={80}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: 0, lineHeight: 1.6, maxWidth: 250 }}>
            Refill your cartridges, shop curated sets, or find the nearest store for in-person replenishment.
          </p>
          <div style={{ padding: "7px 12px", borderRadius: 999, background: `${P.gold}12`, border: `1px solid ${P.gold}20`, fontFamily: sans, fontSize: 11, color: P.charcoal }}>
            Cart {cartCount}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={140}>
        <Glass style={{ marginTop: 18, padding: 18 }}>
          <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: 1.4, color: P.warmGray, textTransform: "uppercase", margin: 0 }}>Nearest Refill Counter</p>
          <p style={{ fontFamily: sans, fontSize: 24, fontWeight: 600, color: P.charcoal, margin: "8px 0 2px", letterSpacing: -0.7 }}>{nearestStore.name}</p>
          <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: 0 }}>{nearestStore.area} · {nearestStore.distance}</p>
          <p style={{ fontFamily: sans, fontSize: 12, color: P.charcoal, margin: "12px 0 0", lineHeight: 1.7, maxWidth: 250 }}>
            {nearestStore.address}
          </p>
          <button onClick={onOpenStores} style={{ marginTop: 14, padding: 0, background: "none", border: "none", fontFamily: sans, fontSize: 11, color: P.charcoal, cursor: "pointer", letterSpacing: 0.2, fontWeight: 600 }}>
            Find store near me →
          </button>
        </Glass>
      </FadeIn>

      <div style={{ marginTop: 18 }}>
        {SHOP_ITEMS.map((item, index) => (
          <FadeIn key={item.id} delay={190 + index * 50}>
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 12, border: `1px solid ${P.glassBorder}`, background: P.glassBg }}>
              <div style={{ display: "flex", gap: 14, padding: 16 }}>
                <div style={{ width: 50, height: 72, borderRadius: 12, background: `linear-gradient(180deg, ${item.color}35, ${item.color}10)`, border: `1px solid ${item.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 14, height: 38, borderRadius: 6, background: `${item.color}48` }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: P.charcoal, margin: 0 }}>{item.name}</p>
                      <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "4px 0 0", letterSpacing: 0.2 }}>{item.type}</p>
                    </div>
                    <span style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: P.charcoal }}>{item.price}</span>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.5 }}>{item.notes}</p>
                </div>
              </div>
              <div style={{ display: "flex", borderTop: `1px solid ${P.warmBeige}` }}>
                <button onClick={() => onAddToCart(item)} style={{ flex: 1, padding: "13px", background: "none", border: "none", fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, cursor: "pointer" }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function StoreLocatorScreen({ hasSkinID, onBack, onCompleteDecode }) {
  const [city, setCity] = useState("All");
  const cities = ["All", "Singapore", "Jakarta", "Seoul", "Tokyo", "Paris"];
  const stores = city === "All" ? STORE_LOCATIONS : STORE_LOCATIONS.filter(store => store.city === city);
  const nearestStore = STORE_LOCATIONS.find(store => store.city === "Singapore") || STORE_LOCATIONS[0];

  return (
    <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column", zIndex: 140 }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "0 24px 34px", overflowY: "auto" }}>
        <FadeIn>
          <button type="button" onClick={onBack} style={{ padding: 0, marginTop: 8, background: "none", border: "none", fontFamily: sans, fontSize: 9, letterSpacing: 2, color: P.gold, textTransform: "uppercase", cursor: "pointer" }}>
            ← Back
          </button>
        </FadeIn>
        <FadeIn delay={80}><Title>Complete Skin Scan</Title></FadeIn>
        <FadeIn delay={120}>
          <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, marginTop: 12, lineHeight: 1.75, maxWidth: 310 }}>
            Decode is a quick in-store skin analysis that reads how fragrance actually behaves on you, then upgrades your profile into a verified Scent ID.
          </p>
        </FadeIn>

        <FadeIn delay={170}>
          <Glass style={{ marginTop: 22, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: 1.4, color: P.warmGray, textTransform: "uppercase", margin: 0 }}>Decode Focus</p>
                <p style={{ fontFamily: sans, fontSize: 23, fontWeight: 600, color: P.charcoal, margin: "8px 0 0", letterSpacing: -0.6, lineHeight: 1.08 }}>
                  What the scan reads
                </p>
                <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.65, maxWidth: 260 }}>
                  Decode measures the biological layer behind fragrance wear, so Personal Chapter moves from taste-based to skin-verified.
                </p>
              </div>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(180deg, #F4EEE7, #ECE3D9)", border: `1px solid ${P.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.04)", flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "radial-gradient(circle, rgba(155,142,124,0.38), rgba(155,142,124,0.1))", border: `1px solid ${P.gold}30` }} />
              </div>
            </div>

            <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
              {[
                { label: "Microbiome", value: "How your skin ecosystem interacts with fragrance molecules.", tint: `${P.sage}18` },
                { label: "pH + temperature", value: "How scent warms, diffuses, and opens once it touches skin.", tint: `${P.gold}14` },
                { label: "Wear performance", value: "How long the composition lasts and how the dry-down settles on you.", tint: `${P.roseDust}14` },
              ].map((item) => (
                <div key={item.label} style={{ padding: "14px 14px", borderRadius: 16, background: item.tint, border: `1px solid ${P.glassBorder}` }}>
                  <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, margin: 0 }}>{item.label}</p>
                  <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: "16px 16px", borderRadius: 18, background: P.ivory, border: `1px solid ${P.glassBorder}` }}>
              <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: 1.3, color: P.gold, textTransform: "uppercase", margin: 0 }}>What you unlock</p>
              <p style={{ fontFamily: sans, fontSize: 13, color: P.charcoal, margin: "8px 0 0", lineHeight: 1.65 }}>
                A verified Scent ID, so recommendations reflect both what you love and what actually performs on your skin.
              </p>
            </div>
          </Glass>
        </FadeIn>

        {!hasSkinID && (
          <FadeIn delay={205}>
            <Glass style={{ marginTop: 14, padding: 16, background: `${P.gold}08`, border: `1px solid ${P.gold}18` }}>
              <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>Prototype shortcut</p>
              <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "8px 0 12px", lineHeight: 1.6 }}>
                Exploring the prototype? You can simulate a completed Decode here instead of scrolling to the bottom.
              </p>
              <Btn dark full onClick={onCompleteDecode}>Simulate Decode Complete</Btn>
            </Glass>
          </FadeIn>
        )}

        <FadeIn delay={220}>
          <div style={{ marginTop: 24 }}>
            <p style={{ fontFamily: sans, fontSize: 17, fontWeight: 600, color: P.charcoal, margin: 0 }}>Available locations</p>
            <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
              Visit any participating counter below to complete Decode.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 14, paddingBottom: 2 }}>
            {cities.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setCity(option)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: `1px solid ${city === option ? P.gold : P.warmBeige}`,
                  background: city === option ? `${P.gold}0a` : "transparent",
                  fontFamily: sans,
                  fontSize: 9,
                  letterSpacing: 1,
                  color: city === option ? P.gold : P.warmGray,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ marginTop: 18 }}>
          {stores.map((store, index) => (
            <FadeIn key={store.id} delay={260 + index * 50}>
              <div style={{ padding: "18px 16px", borderRadius: 18, background: P.glassBg, border: `1px solid ${P.glassBorder}`, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontFamily: serif, fontSize: 16, color: P.charcoal, margin: 0 }}>{store.name}</p>
                    <p style={{ fontFamily: sans, fontSize: 9, color: P.gold, margin: "4px 0 0", letterSpacing: 1.2 }}>{store.city} · {store.area}</p>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, whiteSpace: "nowrap" }}>{store.distance}</span>
                </div>
                <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "12px 0 0", lineHeight: 1.65 }}>{store.address}</p>
                <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                  {store.tags.map(tag => (
                    <span key={tag} style={{ padding: "4px 8px", borderRadius: 999, background: P.ivory, border: `1px solid ${P.glassBorder}`, fontFamily: sans, fontSize: 8, color: P.charcoal }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 14, alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 9, color: P.charcoal, margin: 0 }}>{store.service}</p>
                    <p style={{ fontFamily: sans, fontSize: 8, color: P.warmGray, margin: "3px 0 0" }}>{store.hours}</p>
                  </div>
                  <button type="button" style={{ padding: 0, background: "none", border: "none", fontFamily: sans, fontSize: 9, color: P.gold, letterSpacing: 1, cursor: "pointer" }}>
                    View location →
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── MAIN ───
export default function ReplicaApp() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [labEntrySection, setLabEntrySection] = useState("adjust");
  const [transitioning, setTransitioning] = useState(false);
  const [hasSkinID, setHasSkinID] = useState(false);
  const [hasSprayedBlend, setHasSprayedBlend] = useState(false);
  const [memories, setMemories] = useState([]);
  const [batteryLevel, setBatteryLevel] = useState(84);
  const [deviceCarts, setDeviceCarts] = useState([
    { name: "Warm Amber", color: P.gold, family: "warm", level: 68 },
    { name: "Skin Musk", color: P.roseDust, family: "musky", level: 45 },
    { name: "Fig Leaf", color: P.sage, family: "fresh", level: 82 },
  ]);
  const [ratios, setRatios] = useState([42, 31, 27]);
  const [connected, setConnected] = useState(false);
  const [toast, setToast] = useState("");
  const [memoryComposerOpen, setMemoryComposerOpen] = useState(false);
  const [memoryDraft, setMemoryDraft] = useState({
    mode: "photo",
    title: "",
    note: "",
  });
  const [previewAccord, setPreviewAccord] = useState(null);
  const [deviceStatusAccord, setDeviceStatusAccord] = useState(null);
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);
  const [pairingSheetOpen, setPairingSheetOpen] = useState(false);
  const [pairingState, setPairingState] = useState("idle");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const hasUploadedMemory = memories.some(memory => memory.id.startsWith("m-upload-"));
  const hasProfileInput = hasUploadedMemory || hasSkinID;
  const setupSteps = [
    {
      id: "memory",
      title: "First memory added",
      caption: hasUploadedMemory ? "Your scent direction has started with a saved memory." : "Add a memory to create your starting scent direction.",
      done: hasUploadedMemory,
      cta: "Add memory",
    },
    {
      id: "decode",
      title: "Decode completed",
      caption: hasSkinID ? "Your profile is now verified with skin-based data." : "Visit a Replica counter to verify your profile on skin.",
      done: hasSkinID,
      cta: "Open Decode",
    },
    {
      id: "spray",
      title: "First update",
      caption: hasSprayedBlend ? "Your device has already received its first live Personal Chapter update." : "Pair the device and send your first live blend update.",
      done: hasSprayedBlend,
      cta: "Open Blend",
    },
  ];

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => { setActiveTab(tab); setTransitioning(false); }, 150);
  };

  const handleDummyUpload = () => {
    const uploadCount = memories.filter(memory => memory.id.startsWith("m-upload-")).length;
    const variant = DUMMY_UPLOAD_MEMORIES[uploadCount % DUMMY_UPLOAD_MEMORIES.length];
    const uploaded = {
      id: `m-upload-${memories.length + 1}`,
      ...variant,
    };
    setMemories(current => [uploaded, ...current]);
    setToast("Dummy memory uploaded successfully.");
    return uploaded;
  };

  const handleMemoryDraftChange = (field, value) => {
    setMemoryDraft((current) => ({ ...current, [field]: value }));
  };

  const openMemoryComposer = () => {
    setMemoryComposerOpen(true);
  };

  const closeMemoryComposer = () => {
    setMemoryComposerOpen(false);
    setMemoryDraft({ mode: "photo", title: "", note: "" });
  };

  const handleSaveMemoryComposer = () => {
    const uploadCount = memories.filter(memory => memory.id.startsWith("m-upload-")).length;
    const variant = DUMMY_UPLOAD_MEMORIES[uploadCount % DUMMY_UPLOAD_MEMORIES.length];
    const title = memoryDraft.title.trim() || variant.title;
    const note = memoryDraft.note.trim();
    const emotion = note
      ? note.replace(/\s*[,.]\s*/g, ", ").split(",").map((part) => part.trim()).filter(Boolean).slice(0, 3).join(", ")
      : variant.emotion;
    const uploaded = {
      id: `m-upload-${memories.length + 1}`,
      ...variant,
      title,
      emotion,
      scent: note ? `${variant.scent} · ${note}` : variant.scent,
      icon: getMemoryIcon(title, note, memoryDraft.mode),
    };
    setMemories((current) => [uploaded, ...current]);
    setToast("Memory added successfully.");
    closeMemoryComposer();
  };

  const handleAdjustRatio = (idx, d) => {
    setRatios(current => {
      const next = [...current];
      const nextValue = Math.max(5, Math.min(80, next[idx] + d));
      const diff = nextValue - next[idx];
      next[idx] = nextValue;
      const otherIndexes = [0, 1, 2].filter(i => i !== idx);
      const total = otherIndexes.reduce((sum, i) => sum + next[i], 0);
      otherIndexes.forEach(i => {
        next[i] = Math.max(5, Math.round(next[i] - diff * (next[i] / total)));
      });
      const sum = next.reduce((a, b) => a + b, 0);
      next[otherIndexes[0]] += 100 - sum;
      return next;
    });
  };

  const handlePreviewAccord = accord => setPreviewAccord(accord);

  const handleCheckDevice = accord => setDeviceStatusAccord(accord);

  const handleSprayBlend = () => {
    if (!connected) return;
    setDeviceCarts(current =>
      current.map((cart, index) => ({
        ...cart,
        level: Math.max(0, cart.level - Math.max(2, Math.round(ratios[index] / 18))),
      }))
    );
    setBatteryLevel((current) => Math.max(5, current - 1));
    setHasSprayedBlend(true);
    setToast("Blend updated. Device levels synced.");
  };

  const openStoreLocator = () => setStoreLocatorOpen(true);
  const closeStoreLocator = () => setStoreLocatorOpen(false);
  const openPairingSheet = () => {
    setPairingState("idle");
    setPairingSheetOpen(true);
  };
  const closePairingSheet = () => {
    if (pairingState === "loading") return;
    setPairingSheetOpen(false);
    setPairingState("idle");
  };
  const handleConfirmPairing = () => {
    if (pairingState !== "idle") return;
    setPairingState("loading");
    setTimeout(() => {
      setConnected(true);
      setPairingState("connected");
      setToast("Device paired successfully.");
    }, 1400);
  };
  const handleCompleteDecode = () => {
    setHasSkinID(true);
    setStoreLocatorOpen(false);
    setActiveTab("profile");
    setToast("Decode completed. Full Scent ID unlocked.");
  };

  const handleOpenProgressStep = (stepId) => {
    if (stepId === "memory") {
      setLabEntrySection("memory");
      switchTab("lab");
      return;
    }
    if (stepId === "decode") {
      if (hasSkinID) {
        switchTab("profile");
      } else {
        openStoreLocator();
      }
      return;
    }
    if (stepId === "spray") {
      setLabEntrySection("adjust");
      switchTab("lab");
    }
  };

  const renderMain = () => {
    switch (activeTab) {
      case "home": return <HomeScreen hasSkinID={hasSkinID} hasUploadedMemory={hasUploadedMemory} carts={deviceCarts} ratios={ratios} connected={connected} batteryLevel={batteryLevel} onToggleConnected={() => setConnected(!connected)} onRequestPairing={openPairingSheet} onSprayBlend={handleSprayBlend} onOpenStores={openStoreLocator} memories={memories} setupSteps={setupSteps} onOpenProgressStep={handleOpenProgressStep} />;
      case "lab": return <ScentLabScreen deviceCarts={deviceCarts} memories={memories} memoryPrompts={MEMORY_PROMPTS} ratios={ratios} connected={connected} hasSkinID={hasSkinID} accordLibrary={ACCORD_LIBRARY} onOpenMemoryComposer={openMemoryComposer} onAdjustRatio={handleAdjustRatio} onSprayBlend={handleSprayBlend} onToggleConnected={() => setConnected(!connected)} onRequestPairing={openPairingSheet} initialSection={labEntrySection} />;
      case "explore": return <ExploreScreen hasSkinID={hasSkinID} hasProfileInput={hasProfileInput} connected={connected} accords={ACCORD_LIBRARY} deviceCarts={deviceCarts} onOpenMemoryComposer={() => { setLabEntrySection("memory"); setMemoryComposerOpen(true); switchTab("lab"); }} onOpenStores={openStoreLocator} onRequestPairing={openPairingSheet} onPreviewAccord={handlePreviewAccord} onCheckDevice={handleCheckDevice} />;
      case "profile": return <ProfileScreen hasSkinID={hasSkinID} hasProfileInput={hasProfileInput} onOpenStores={openStoreLocator} onStartProfile={() => { setLabEntrySection("memory"); setMemoryComposerOpen(true); switchTab("lab"); }} />;
      default: return <HomeScreen hasSkinID={hasSkinID} hasUploadedMemory={hasUploadedMemory} carts={deviceCarts} ratios={ratios} connected={connected} batteryLevel={batteryLevel} onToggleConnected={() => setConnected(!connected)} onRequestPairing={openPairingSheet} onSprayBlend={handleSprayBlend} onOpenStores={openStoreLocator} memories={memories} setupSteps={setupSteps} onOpenProgressStep={handleOpenProgressStep} />;
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
        .app-shell {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          min-height: 100dvh;
          background: #1a1816;
          padding: 20px;
          font-family: ${sans};
        }
        .app-frame {
          width: 390px;
          height: 844px;
          border-radius: 48px;
          background: ${P.ivory};
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.06);
        }
        .app-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 126px;
          height: 34px;
          background: #000;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          z-index: 50;
        }
        @media (max-width: 520px) {
          .app-shell {
            padding: 8px;
            align-items: center;
            background: #1a1816;
          }
          .app-frame {
            width: min(390px, calc(100vw - 16px), calc((100dvh - 16px) * 390 / 844));
            height: auto;
            max-height: calc(100dvh - 16px);
            aspect-ratio: 390 / 844;
            border-radius: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(0,0,0,0.05);
          }
          .app-notch {
            width: 132px;
          }
        }
      `}</style>
      <div className="app-shell">
        <div className="app-frame">
          <div className="app-notch" />
          <Toast message={toast} />
          <PairingSheet
            open={pairingSheetOpen}
            pairingState={pairingState}
            onClose={closePairingSheet}
            onConnect={handleConfirmPairing}
          />
          <MemoryComposerSheet
            open={memoryComposerOpen}
            draft={memoryDraft}
            onChange={handleMemoryDraftChange}
            onClose={closeMemoryComposer}
            onSave={handleSaveMemoryComposer}
          />
          <Sheet
            title={previewAccord ? previewAccord.name : deviceStatusAccord ? deviceStatusAccord.name : ""}
            subtitle={previewAccord ? "Accord preview" : deviceStatusAccord ? "Device status" : ""}
            onClose={() => { setPreviewAccord(null); setDeviceStatusAccord(null); }}
          >
            {previewAccord ? (
              <div>
                {(() => {
                  const preview = getAccordPreview(previewAccord, hasSkinID);
                  return (
                    <>
                      <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
                        {preview.title}
                      </p>
                      <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.8 }}>
                        {preview.impression}
                      </p>
                      <div style={{ marginTop: 14, padding: "12px 12px", borderRadius: 12, background: `${previewAccord.color}10`, border: `1px solid ${P.glassBorder}` }}>
                        <p style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Why it fits</p>
                        <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.8 }}>
                          {preview.whyItWorks}
                        </p>
                      </div>
                      <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
                        {preview.structure.map(item => (
                          <div key={item.stage} style={{ padding: "10px 12px", borderRadius: 12, background: P.mist, border: `1px solid ${P.glassBorder}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                              <span style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 2, textTransform: "uppercase" }}>{item.stage}</span>
                              <span style={{ fontFamily: sans, fontSize: 8, color: P.roseDust }}>{item.detail}</span>
                            </div>
                            <p style={{ fontFamily: serif, fontSize: 14, color: P.charcoal, margin: "6px 0 0" }}>{item.note}</p>
                          </div>
                        ))}
                      </div>
                      {hasSkinID ? (
                        <>
                          <div style={{ marginTop: 14, height: 4, borderRadius: 3, background: P.warmBeige, overflow: "hidden" }}>
                            <div style={{ width: `${previewAccord.match}%`, height: "100%", borderRadius: 3, background: previewAccord.color }} />
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 8 }}>
                            <p style={{ fontFamily: sans, fontSize: 9, color: P.gold, margin: 0 }}>{previewAccord.match}% skin match for this profile</p>
                            <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: 0, textAlign: "right" }}>Wear it: {preview.wearMoment}</p>
                          </div>
                        </>
                      ) : (
                        <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 12, background: `${previewAccord.color}10`, border: `1px solid ${P.glassBorder}` }}>
                          <p style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Before Decode</p>
                          <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.7 }}>
                            This is a preference-based preview only. Exact skin match percentage unlocks after your Decode scan.
                          </p>
                          <p style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, margin: "8px 0 0" }}>Wear it: {preview.wearMoment}</p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : null}
            {deviceStatusAccord ? (
              <div>
                {(() => {
                  const loadedIndex = deviceCarts.findIndex(cart => cart.name === deviceStatusAccord.name);
                  const loadedCart = loadedIndex >= 0 ? deviceCarts[loadedIndex] : null;
                  return loadedCart ? (
                    <div>
                      <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: 0, fontStyle: "italic" }}>
                        This cartridge is currently detected in the physical device.
                      </p>
                      <div style={{ marginTop: 12, padding: "12px 12px", borderRadius: 12, background: `${loadedCart.color}10`, border: `1px solid ${P.glassBorder}` }}>
                        <p style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Current hardware slot</p>
                        <p style={{ fontFamily: serif, fontSize: 16, color: P.charcoal, margin: "6px 0 0" }}>Slot {loadedIndex + 1} · {loadedCart.name}</p>
                        <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.7 }}>
                          Remaining cartridge level: {loadedCart.level}%. You can use it in the blend immediately from the Device tab.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: 0, fontStyle: "italic" }}>
                        This accord is not currently loaded in the device.
                      </p>
                      <div style={{ marginTop: 12, padding: "12px 12px", borderRadius: 12, background: `${deviceStatusAccord.color}10`, border: `1px solid ${P.glassBorder}` }}>
                        <p style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Physical swap required</p>
                        <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.7 }}>
                          Cartridge changes happen on the physical device, not inside the app. Insert <span style={{ color: P.gold }}>{deviceStatusAccord.name}</span> into the hardware, then reconnect or sync the device so the app can read the new cartridge set.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : null}
          </Sheet>

          {screen === "splash" && <SplashScreen onEnter={() => setScreen("onboarding")} />}
          {screen === "onboarding" && <OnboardingScreen onComplete={() => setScreen("main")} />}
          {screen === "discover-entry" && <MemoryEntryScreen memories={memories} onDummyUpload={handleDummyUpload} onShowToast={setToast} onOpenStores={openStoreLocator} onComplete={() => setScreen("main")} />}
          {screen === "main" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
              <StatusBar />
              <div style={{ flex: 1, overflow: "hidden", opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(5px)" : "translateY(0)", transition: "all 0.15s ease-out" }}>
                {renderMain()}
              </div>
              <TabBar active={activeTab} onChange={switchTab} />
            </div>
          )}
          {storeLocatorOpen && <StoreLocatorScreen hasSkinID={hasSkinID} onBack={closeStoreLocator} onCompleteDecode={handleCompleteDecode} />}
        </div>
      </div>
    </>
  );
}
