import React from "react";
import deviceImage from "../../assets/personal-chapter-device.png";

export function RunwayCampaignFigure() {
  return (
    <div style={{ position: "absolute", inset: "46px 16px 196px", pointerEvents: "none", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 52% 14%, rgba(255,255,255,0.16), transparent 18%), radial-gradient(circle at 38% 64%, rgba(132,18,14,0.28), transparent 22%), radial-gradient(circle at 78% 52%, rgba(255,255,255,0.1), transparent 5%), radial-gradient(circle at 18% 36%, rgba(152,20,16,0.18), transparent 7%)" }} />
      <svg viewBox="0 0 280 600" style={{ width: "100%", height: "100%", maxWidth: 322, overflow: "visible" }} aria-hidden="true">
        <defs>
          <linearGradient id="coatBack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="48%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <linearGradient id="coatFront" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A3A3A" />
            <stop offset="42%" stopColor="#202020" />
            <stop offset="100%" stopColor="#101010" />
          </linearGradient>
          <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A8A8A" />
            <stop offset="100%" stopColor="#4A4A4A" />
          </linearGradient>
          <radialGradient id="shine" cx="50%" cy="18%" r="76%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <ellipse cx="140" cy="585" rx="84" ry="13" fill="rgba(0,0,0,0.45)" />

        <ellipse cx="126" cy="176" rx="72" ry="102" fill="rgba(112,14,12,0.36)" filter="url(#softGlow)" />
        <ellipse cx="176" cy="192" rx="68" ry="108" fill="rgba(185,24,20,0.22)" filter="url(#softGlow)" />

        <path d="M132 54c-22 3-42 24-42 48 0 28 20 45 49 45 26 0 47-19 47-47 0-23-18-46-43-46-4 0-7 0-11 0z" fill="#111111" />
        <circle cx="140" cy="89" r="30" fill="url(#skinTone)" />
        <path d="M110 85c4-19 17-30 30-30 18 0 32 13 37 31-8-5-17-9-37-9-9 0-22 2-30 8z" fill="#111111" />
        <path d="M103 90c-11 12-14 35-6 50 8 15 21 21 28 18-10-17-7-47-22-68z" fill="#111111" />
        <path d="M177 92c12 14 15 36 6 49-8 14-20 17-27 15 11-16 8-46 21-64z" fill="#111111" />

        <path d="M117 132c10-10 20-14 26-14 10 0 20 5 31 16l28 104c5 17 6 41-4 67l-25 56-69-5-13-67c-5-28-4-61 5-88l21-69z" fill="url(#coatFront)" />
        <path d="M92 160c19-22 34-29 54-29 28 0 49 13 70 42l-8 127c-3 44-12 108-29 178l-39 5-39-7c-17-71-26-128-30-176l-6-140z" fill="url(#coatBack)" />
        <path d="M112 167c19-14 32-16 42-16 14 0 27 5 46 18l8 112c3 31-2 71-13 126l-42 8-42-8c-11-46-16-85-13-124l14-116z" fill="url(#coatFront)" />

        <path d="M81 185c-18 16-31 36-37 55-8 26-2 49 17 62 19 14 42 10 58-12l14-21-32-25-8 11c-6 8-12 9-18 5-7-5-8-13-4-24 4-12 11-25 24-39l-14-12z" fill="url(#coatFront)" />
        <path d="M204 184c18 14 30 31 39 52 9 21 10 46 0 70-8 20-23 37-32 54-8 15-9 28 0 41l13 18 17-11-8-16c-5-10-4-18 3-29 9-16 27-35 39-66 14-37 10-78-17-110l-54-3z" fill="url(#coatFront)" />

        <path d="M118 412c-12 42-22 84-26 129l35 5c2-39 6-80 14-123l-23-11z" fill="#222222" />
        <path d="M158 414c8 43 11 83 13 127l36-4c-4-46-12-89-24-131l-25 8z" fill="#1A1A1A" />
        <path d="M140 174c-15 0-28 8-35 22l-7 12 81 0-7-12c-8-14-18-22-32-22z" fill="rgba(255,255,255,0.06)" />
        <path d="M126 162c7 8 12 10 15 10 4 0 9-2 16-11l5 23c1 6-5 12-20 12-16 0-23-5-22-11l6-23z" fill="#2A2A2A" />
        <ellipse cx="141" cy="256" rx="25" ry="42" fill="rgba(255,255,255,0.08)" />
        <ellipse cx="146" cy="252" rx="17" ry="28" fill="url(#shine)" opacity="0.45" />

        <rect x="110" y="188" width="10" height="95" rx="5" fill="rgba(86,7,6,0.72)" />
        <rect x="148" y="190" width="10" height="92" rx="5" fill="rgba(86,7,6,0.72)" />

        <circle cx="94" cy="264" r="15" fill="url(#skinTone)" />
        <rect x="82" y="275" width="22" height="14" rx="4" fill="#333333" transform="rotate(-18 82 275)" />
        <circle cx="238" cy="411" r="12" fill="url(#skinTone)" />
        <rect x="228" y="420" width="18" height="9" rx="4" fill="#2A2A2A" transform="rotate(18 228 420)" />
      </svg>
    </div>
  );
}

// ─── 1. SPLASH ───

export function LayeringDeviceFigure({ carts, ratios, connected, width = 130, height = 188 }) {
  const glowColor = connected ? "rgba(183,138,50,0.18)" : "rgba(17,17,17,0.08)";
  return <ProductDeviceImage width={width} height={height} glowColor={glowColor} />;
}

export function PlaceholderDeviceFigure({ width = 74, height = 108 }) {
  return <ProductDeviceImage width={width} height={height} />;
}

export function MiniAdjustDeviceFigure() {
  return (
    <div style={{ width: 82, height: 82, borderRadius: 24, background: "linear-gradient(180deg, #FFFFFF, #F2F2F2)", border: "1px solid rgba(17,17,17,0.08)", boxShadow: "0 10px 24px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", overflow: "hidden" }}>
      <ProductDeviceImage width={68} height={72} compact />
    </div>
  );
}

export function ProductDeviceImage({ width = 130, height = 188, glowColor = "rgba(17,17,17,0.08)", compact = false }) {
  return (
    <div style={{ width, height, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
      <img
        src={deviceImage}
        alt="Replica Personal Chapter device"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          filter: "drop-shadow(0 14px 20px rgba(17,17,17,0.12))",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
