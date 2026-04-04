import { useState, useEffect, useCallback, useRef } from "react";

const P = {
  ivory: "#FAF7F2", cream: "#F5F0E8", warmBeige: "#E8DFD0",
  gold: "#C4A265", goldLight: "#D4B87A", blush: "#E8C4B8",
  roseDust: "#C9A89A", charcoal: "#2A2520", warmGray: "#6B5E52",
  softPink: "#F0DDD6", sage: "#A8B5A0", deepPlum: "#3D2B3A",
  glassBg: "rgba(250,247,242,0.72)", glassBorder: "rgba(196,162,101,0.18)",
};

const serif = "'Cormorant Garamond', serif";
const sans = "'Outfit', sans-serif";

// ─── Shared Components ───
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
    { id: "home", icon: "◎", label: "Home" },
    { id: "discover", icon: "◇", label: "Discover" },
    { id: "memories", icon: "◈", label: "Memories" },
    { id: "device", icon: "▣", label: "Device" },
    { id: "profile", icon: "○", label: "Profile" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 76, background: "rgba(42,37,32,0.94)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "space-around", borderTop: `1px solid rgba(196,162,101,0.1)`, paddingBottom: 10 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: active === t.id ? P.gold : P.roseDust, transition: "color 0.3s", opacity: active === t.id ? 1 : 0.45 }}>
          <span style={{ fontSize: 17 }}>{t.icon}</span>
          <span style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, textTransform: "uppercase" }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 80 + delay); return () => clearTimeout(t); }, []);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(18px)", transition: `all 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms`, ...style }}>{children}</div>;
}

function SectionLabel({ children }) {
  return <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 4, color: P.warmGray, textTransform: "uppercase", margin: 0 }}>{children}</p>;
}

function SectionTitle({ children, style = {} }) {
  return <h2 style={{ fontFamily: serif, fontSize: 26, fontWeight: 300, color: P.charcoal, margin: "5px 0 0", ...style }}>{children}</h2>;
}

function GoldButton({ children, onClick, full, dark, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "14px 36px", background: dark ? P.charcoal : "transparent",
      border: `1px solid ${P.gold}`, color: dark ? P.gold : P.gold,
      fontFamily: sans, fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
      borderRadius: 28, cursor: disabled ? "default" : "pointer", transition: "all 0.3s",
      width: full ? "100%" : "auto", opacity: disabled ? 0.4 : 1, ...style,
    }}>{children}</button>
  );
}

function CardGlass({ children, style = {} }) {
  return <div style={{ background: P.glassBg, border: `1px solid ${P.glassBorder}`, borderRadius: 16, padding: "16px", backdropFilter: "blur(10px)", ...style }}>{children}</div>;
}

// ─── 1. SPLASH ───
function SplashScreen({ onEnter }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 300); }, []);
  return (
    <div style={{ position: "absolute", inset: 0, background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "opacity 0.8s", opacity: v ? 1 : 0 }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.07, background: `radial-gradient(ellipse at 50% 30%, ${P.gold}, transparent 70%)` }}/>
      <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: 5, color: P.gold, textTransform: "uppercase", marginBottom: 20, opacity: 0.6 }}>Maison Margiela</p>
      <h1 style={{ fontFamily: serif, fontSize: 46, fontWeight: 300, color: P.ivory, letterSpacing: 3, margin: 0 }}>REPLICA</h1>
      <div style={{ width: 36, height: 1, background: `linear-gradient(90deg, transparent, ${P.gold}, transparent)`, margin: "14px 0" }}/>
      <p style={{ fontFamily: serif, fontSize: 17, fontWeight: 300, color: P.goldLight, fontStyle: "italic", margin: 0 }}>Personal Chapter</p>
      <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, marginTop: 44, letterSpacing: 1.5, opacity: 0.5, maxWidth: 200, textAlign: "center", lineHeight: 1.7 }}>
        Your scent. Your skin. Your story.
      </p>
      <button onClick={onEnter} style={{ marginTop: 44, padding: "13px 44px", background: "transparent", border: `1px solid ${P.gold}`, color: P.gold, fontFamily: sans, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer", borderRadius: 0, transition: "all 0.4s" }}>
        Begin Your Chapter
      </button>
    </div>
  );
}

// ─── 2. ONBOARDING ───
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Your Skin Is Unique", sub: "No two people share the same scent chemistry. Your microbiome, pH, and sebum levels shape how fragrance lives on your skin.", icon: "◉" },
    { title: "One Scan, Forever Yours", sub: "A single microbiome analysis creates your permanent Skin ID — the biological blueprint that makes your fragrance truly personal.", icon: "❋" },
    { title: "Scent That Evolves", sub: "Upload memories, adjust your mood, and let AI craft a fragrance that grows with you. Not chosen — created.", icon: "◈" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 36px", textAlign: "center" }}>
        <FadeIn key={step}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: `conic-gradient(from ${step * 120}deg, ${P.gold}20, ${P.blush}20, ${P.sage}20, ${P.gold}20)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", border: `1px solid ${P.gold}25` }}>
            <span style={{ fontSize: 32, color: P.gold }}>{steps[step].icon}</span>
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: P.charcoal, margin: "0 0 14px", fontStyle: "italic" }}>{steps[step].title}</h2>
          <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, lineHeight: 1.7, maxWidth: 260, margin: "0 auto" }}>{steps[step].sub}</p>
        </FadeIn>
      </div>
      <div style={{ padding: "0 36px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {steps.map((_, i) => <div key={i} style={{ width: i === step ? 24 : 6, height: 6, borderRadius: 3, background: i === step ? P.gold : P.warmBeige, transition: "all 0.4s" }}/>)}
        </div>
        <GoldButton dark full onClick={() => step < 2 ? setStep(step + 1) : onComplete()}>
          {step < 2 ? "Next" : "Start Skin Analysis"}
        </GoldButton>
      </div>
    </div>
  );
}

// ─── 3. SKIN SCAN (one-time) ───
function SkinScanScreen({ onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro → scanning → results
  const [progress, setProgress] = useState(0);
  const [scanStep, setScanStep] = useState(0);
  const scanLabels = ["Collecting microbiome sample...", "Analyzing pH balance...", "Measuring sebum activity...", "Mapping sweat metabolites...", "Generating Skin ID..."];

  const startScan = () => {
    setPhase("scanning");
    let p = 0;
    const interval = setInterval(() => {
      p += 0.6;
      setProgress(Math.min(p, 100));
      setScanStep(Math.min(Math.floor(p / 20), 4));
      if (p >= 100) { clearInterval(interval); setTimeout(() => setPhase("results"), 600); }
    }, 50);
  };

  const skinProfile = {
    pH: { value: "5.4", label: "pH Level", desc: "Slightly acidic — ideal for warm oriental notes", color: P.gold },
    sebum: { value: "Medium", label: "Sebum Activity", desc: "Balanced oil production, good scent retention on skin", color: P.sage },
    microbiome: { value: "Type B+", label: "Microbiome Profile", desc: "Rich in Corynebacterium — amplifies amber, musk, and woody notes", color: P.blush },
    temp: { value: "33.2°C", label: "Skin Temperature", desc: "Warm diffusion zone — enhances sillage and projection", color: P.roseDust },
    hydration: { value: "62%", label: "Hydration Level", desc: "Well-hydrated — supports even fragrance evaporation curve", color: P.goldLight },
  };

  if (phase === "intro") {
    return (
      <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column" }}>
        <StatusBar />
        <div style={{ flex: 1, padding: "0 28px", overflowY: "auto", paddingBottom: 40 }}>
          <FadeIn><SectionLabel>One-time analysis</SectionLabel></FadeIn>
          <FadeIn delay={50}><SectionTitle style={{ fontStyle: "italic" }}>Skin Microbiome Scan</SectionTitle></FadeIn>
          <FadeIn delay={100}>
            <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, marginTop: 10, lineHeight: 1.7, maxWidth: 300 }}>
              This scan reads your skin's biological signature — pH, sebum, microbiome composition, and sweat metabolites. It only needs to happen once.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ marginTop: 28, borderRadius: 22, background: `linear-gradient(160deg, ${P.cream}, ${P.softPink}30)`, padding: "32px 24px", textAlign: "center", border: `1px solid ${P.glassBorder}` }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 20px", background: `conic-gradient(from 0deg, ${P.gold}15, ${P.blush}20, ${P.sage}15, ${P.gold}15)`, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${P.gold}20` }}>
                <span style={{ fontSize: 38, color: P.gold }}>◉</span>
              </div>
              <p style={{ fontFamily: serif, fontSize: 18, color: P.charcoal, margin: "0 0 6px", fontStyle: "italic" }}>Place the swab on your inner wrist</p>
              <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: 0, lineHeight: 1.6 }}>Hold gently for 10 seconds to capture your skin chemistry</p>
            </div>
          </FadeIn>

          <FadeIn delay={350}>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: 2, color: P.warmGray, textTransform: "uppercase", marginBottom: 12 }}>What we analyze</p>
              {["Microbiome composition", "pH & acidity level", "Sebum & oil activity", "Sweat metabolites", "Skin hydration & temperature"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${P.warmBeige}` : "none" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: P.cream, border: `1px solid ${P.warmBeige}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: 11, color: P.gold }}>{i + 1}</div>
                  <p style={{ fontFamily: sans, fontSize: 12, color: P.charcoal, margin: 0 }}>{s}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={450}>
            <GoldButton dark full onClick={startScan} style={{ marginTop: 28 }}>Begin Scan</GoldButton>
            <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
              Takes approximately 60 seconds · Results are permanent
            </p>
          </FadeIn>
        </div>
      </div>
    );
  }

  if (phase === "scanning") {
    return (
      <div style={{ position: "absolute", inset: 0, background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: `radial-gradient(ellipse at 50% 40%, ${P.gold}, transparent 60%)` }}/>
        <div style={{ width: 180, height: 180, borderRadius: "50%", background: `conic-gradient(${P.gold} ${progress * 3.6}deg, rgba(255,255,255,0.04) 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 152, height: 152, borderRadius: "50%", background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: serif, fontSize: 38, fontWeight: 300, color: P.ivory }}>{Math.round(progress)}%</span>
            <span style={{ fontFamily: sans, fontSize: 8, color: P.roseDust, letterSpacing: 3, marginTop: 4 }}>ANALYZING</span>
          </div>
        </div>
        <p style={{ fontFamily: serif, fontSize: 15, fontStyle: "italic", color: P.goldLight, marginTop: 32, textAlign: "center", maxWidth: 250, lineHeight: 1.6, opacity: 0.8 }}>
          {scanLabels[scanStep]}
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          {scanLabels.map((_, i) => <div key={i} style={{ width: i === scanStep ? 20 : 6, height: 4, borderRadius: 2, background: i <= scanStep ? P.gold : "rgba(255,255,255,0.08)", transition: "all 0.5s" }}/>)}
        </div>
      </div>
    );
  }

  // Results phase
  return (
    <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "0 28px", overflowY: "auto", paddingBottom: 40 }}>
        <FadeIn><SectionLabel>Analysis complete</SectionLabel></FadeIn>
        <FadeIn delay={50}><SectionTitle>Your Skin ID</SectionTitle></FadeIn>

        <FadeIn delay={150}>
          <div style={{ marginTop: 20, borderRadius: 22, background: `linear-gradient(150deg, ${P.charcoal}, ${P.deepPlum})`, padding: "28px 22px", textAlign: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: `radial-gradient(circle at 30% 20%, ${P.gold}, transparent 50%)`, borderRadius: 22 }}/>
            <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 14px", background: `conic-gradient(from 45deg, ${P.gold} 0%, ${P.blush} 40%, ${P.sage} 70%, ${P.gold} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${P.gold}18` }}>
              <div style={{ width: 62, height: 62, borderRadius: "50%", background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: sans, fontSize: 8, color: P.goldLight, letterSpacing: 2, opacity: 0.6 }}>SKIN ID</span>
                <span style={{ fontFamily: serif, fontSize: 18, color: P.ivory, fontWeight: 300, marginTop: 1 }}>#VRQ</span>
              </div>
            </div>
            <p style={{ fontFamily: serif, fontSize: 16, color: P.ivory, margin: 0, fontStyle: "italic" }}>Warm · Amber-Leaning · High Retention</p>
            <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: "6px 0 0" }}>A skin chemistry that amplifies warmth and depth</p>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div style={{ marginTop: 20 }}>
            {Object.values(skinProfile).map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: P.glassBg, borderRadius: 14, marginBottom: 8, border: `1px solid ${P.glassBorder}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${r.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color }}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: P.charcoal, margin: 0 }}>{r.label}</p>
                    <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 500, color: P.charcoal }}>{r.value}</span>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "3px 0 0", lineHeight: 1.4 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={450}>
          <div style={{ marginTop: 16, padding: "16px 18px", borderRadius: 16, background: `linear-gradient(135deg, ${P.softPink}30, ${P.cream})`, border: `1px solid ${P.glassBorder}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12 }}>✦</span>
              <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>What this means</p>
            </div>
            <p style={{ fontFamily: serif, fontSize: 13, color: P.charcoal, margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
              Your skin naturally amplifies warm, resinous notes and holds base notes longer than average. Amber, musk, and sandalwood will perform exceptionally on you. Light citrus top notes may fade faster.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={550}>
          <GoldButton dark full onClick={onComplete} style={{ marginTop: 24 }}>See My Cartridge Recommendations →</GoldButton>
        </FadeIn>
      </div>
    </div>
  );
}

// ─── HOME SCREEN ───
function HomeScreen({ onNavigate }) {
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn>
        <SectionLabel>Welcome back</SectionLabel>
        <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 300, color: P.charcoal, margin: "4px 0 0" }}>Véronique</h2>
      </FadeIn>

      {/* Today's Accord */}
      <FadeIn delay={100}>
        <div style={{ marginTop: 20, borderRadius: 20, background: `linear-gradient(150deg, ${P.deepPlum}, ${P.charcoal})`, padding: "24px 22px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -10, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(${P.gold}18, transparent)`, filter: "blur(25px)" }}/>
          <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 3, color: P.goldLight, textTransform: "uppercase", margin: 0, opacity: 0.6 }}>Today's accord · Based on your Skin ID</p>
          <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 300, color: P.ivory, margin: "8px 0 4px", fontStyle: "italic" }}>Sunlit Terrace</h3>
          <p style={{ fontFamily: sans, fontSize: 11, color: P.roseDust, margin: 0 }}>Warm amber · Fig leaf · Skin musk</p>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {["Amber", "Green", "Musky"].map(n => <span key={n} style={{ padding: "4px 12px", borderRadius: 16, background: "rgba(196,162,101,0.1)", border: "1px solid rgba(196,162,101,0.15)", fontFamily: sans, fontSize: 9, color: P.goldLight, letterSpacing: 1 }}>{n}</span>)}
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ width: "89%", height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${P.gold}, ${P.blush})` }}/>
            </div>
            <span style={{ fontFamily: sans, fontSize: 10, color: P.goldLight, opacity: 0.6 }}>89% skin match</span>
          </div>
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={200}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
          {[
            { title: "Discover", sub: "Cartridges for you", icon: "◇", tab: "discover" },
            { title: "My Device", sub: "Blend & spray", icon: "▣", tab: "device" },
            { title: "Add Memory", sub: "Capture a moment", icon: "◈", tab: "memories" },
            { title: "Skin ID", sub: "View your profile", icon: "○", tab: "profile" },
          ].map((a, i) => (
            <button key={i} onClick={() => onNavigate(a.tab)} style={{ background: P.glassBg, border: `1px solid ${P.glassBorder}`, borderRadius: 14, padding: "16px 14px", cursor: "pointer", textAlign: "left", backdropFilter: "blur(10px)", transition: "all 0.3s" }}>
              <span style={{ fontSize: 18, display: "block", marginBottom: 8, color: P.gold }}>{a.icon}</span>
              <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: P.charcoal, margin: 0 }}>{a.title}</p>
              <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "3px 0 0" }}>{a.sub}</p>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Scent Diary */}
      <FadeIn delay={350}>
        <div style={{ marginTop: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontFamily: serif, fontSize: 17, color: P.charcoal, margin: 0 }}>Scent Diary</p>
            <span style={{ fontFamily: sans, fontSize: 9, color: P.gold, letterSpacing: 1, cursor: "pointer" }}>VIEW ALL →</span>
          </div>
          {[
            { date: "Mar 27", name: "Golden Hour", notes: "Bergamot · Sandalwood · Vanilla", mood: "Warm", grad: [P.goldLight, P.blush] },
            { date: "Mar 25", name: "After Rain", notes: "Petrichor · Iris · White Tea", mood: "Fresh", grad: [P.blush, P.sage] },
            { date: "Mar 22", name: "Velvet Night", notes: "Oud · Rose · Amber", mood: "Sensual", grad: [P.deepPlum, P.charcoal] },
          ].map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${P.warmBeige}` : "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${e.grad[0]}, ${e.grad[1]})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "white" }}>❋</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: serif, fontSize: 14, fontWeight: 500, color: P.charcoal, margin: 0 }}>{e.name}</p>
                <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "2px 0 0" }}>{e.notes}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span style={{ padding: "3px 8px", borderRadius: 8, background: P.cream, fontFamily: sans, fontSize: 8, color: P.warmGray, letterSpacing: 1 }}>{e.mood}</span>
                <p style={{ fontFamily: sans, fontSize: 8, color: P.roseDust, margin: "4px 0 0" }}>{e.date}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

// ─── DISCOVER (Cartridge Recommendations) ───
function DiscoverScreen() {
  const [selectedCat, setSelectedCat] = useState("recommended");
  const categories = [
    { id: "recommended", label: "For You" },
    { id: "warm", label: "Warm" },
    { id: "fresh", label: "Fresh" },
    { id: "woody", label: "Woody" },
  ];

  const cartridges = [
    { name: "Warm Amber", family: "Oriental", notes: "Amber · Benzoin · Tonka", match: 94, color: P.gold, desc: "Your skin's acidity amplifies amber's warmth beautifully", badge: "Best Match" },
    { name: "Skin Musk", family: "Musky Floral", notes: "White musk · Iris · Cashmere", match: 89, color: P.roseDust, desc: "Your sebum level holds musk notes for 6+ hours" },
    { name: "Fig Leaf", family: "Green Aromatic", notes: "Fig · Basil · Coconut milk", match: 86, color: P.sage, desc: "Green notes balanced by your warm skin temperature" },
    { name: "Sandalwood Veil", family: "Woody", notes: "Sandalwood · Cream · Cedar", match: 82, color: "#B89878", desc: "Your microbiome Type B+ enhances woody base notes" },
    { name: "Bergamot Sun", family: "Citrus Fresh", notes: "Bergamot · Neroli · Vetiver", match: 71, color: "#D4C88A", desc: "Top notes fade faster on your skin — best as a layering accent" },
  ];

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><SectionLabel>Based on your Skin ID #VRQ</SectionLabel></FadeIn>
      <FadeIn delay={50}><SectionTitle>Discover Accords</SectionTitle></FadeIn>
      <FadeIn delay={80}>
        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, marginTop: 6, lineHeight: 1.6 }}>
          Cartridges ranked by compatibility with your skin chemistry.
        </p>
      </FadeIn>

      {/* Category tabs */}
      <FadeIn delay={120}>
        <div style={{ display: "flex", gap: 6, marginTop: 16, overflowX: "auto" }}>
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCat(c.id)} style={{
              padding: "6px 16px", borderRadius: 18, border: `1px solid ${selectedCat === c.id ? P.gold : P.warmBeige}`,
              background: selectedCat === c.id ? `${P.gold}12` : "transparent", fontFamily: sans, fontSize: 10,
              letterSpacing: 1, color: selectedCat === c.id ? P.gold : P.warmGray, cursor: "pointer", transition: "all 0.3s", whiteSpace: "nowrap",
            }}>{c.label}</button>
          ))}
        </div>
      </FadeIn>

      {/* Cartridge cards */}
      <div style={{ marginTop: 18 }}>
        {cartridges.map((c, i) => (
          <FadeIn key={i} delay={180 + i * 80}>
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 12, border: `1px solid ${P.glassBorder}`, background: P.glassBg }}>
              <div style={{ display: "flex", gap: 14, padding: "16px" }}>
                {/* Color swatch */}
                <div style={{ width: 52, height: 72, borderRadius: 10, background: `linear-gradient(180deg, ${c.color}40, ${c.color}15)`, border: `1px solid ${c.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                  <div style={{ width: 16, height: 40, borderRadius: 6, background: `${c.color}50` }}/>
                  {c.badge && <div style={{ position: "absolute", top: -6, right: -6, background: P.gold, borderRadius: 8, padding: "2px 6px", fontFamily: sans, fontSize: 7, color: P.charcoal, letterSpacing: 0.5, fontWeight: 500 }}>★</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, color: P.charcoal, margin: 0 }}>{c.name}</p>
                      <p style={{ fontFamily: sans, fontSize: 9, color: P.gold, margin: "2px 0 0", letterSpacing: 1 }}>{c.family}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, color: P.charcoal }}>{c.match}%</span>
                      <p style={{ fontFamily: sans, fontSize: 8, color: P.warmGray, margin: "1px 0 0" }}>skin match</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0" }}>{c.notes}</p>
                  <div style={{ marginTop: 8, height: 3, borderRadius: 2, background: P.warmBeige, overflow: "hidden" }}>
                    <div style={{ width: `${c.match}%`, height: "100%", borderRadius: 2, background: c.color, transition: "width 0.6s ease-out" }}/>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "8px 0 0", fontStyle: "italic", lineHeight: 1.4 }}>{c.desc}</p>
                </div>
              </div>
              <div style={{ display: "flex", borderTop: `1px solid ${P.warmBeige}` }}>
                <button style={{ flex: 1, padding: "10px", background: "none", border: "none", borderRight: `1px solid ${P.warmBeige}`, fontFamily: sans, fontSize: 9, color: P.gold, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}>Preview Scent</button>
                <button style={{ flex: 1, padding: "10px", background: "none", border: "none", fontFamily: sans, fontSize: 9, color: P.charcoal, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}>Add to Device</button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={700}>
        <div style={{ padding: "16px", borderRadius: 14, background: `${P.softPink}30`, border: `1px solid ${P.glassBorder}`, marginTop: 4 }}>
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>$29 per cartridge · 15 ml refillable</p>
          <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.5 }}>Find your nearest refill station or order replacement cartridges delivered to your door.</p>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── MEMORIES ───
function MemoriesScreen() {
  const [sel, setSel] = useState(null);
  const memories = [
    { title: "Barcelona, Summer 2024", emotion: "Joy · Warmth", scent: "Sun-warmed stone, orange blossom, sea salt", grad: "linear-gradient(135deg, #C4946A, #E8C4A0)", icon: "☀" },
    { title: "Grandmother's Kitchen", emotion: "Comfort · Nostalgia", scent: "Cinnamon, vanilla, worn wood, warm bread", grad: "linear-gradient(135deg, #8B6F5C, #C9A89A)", icon: "♡" },
    { title: "First Snowfall", emotion: "Wonder · Stillness", scent: "Cool air, pine needle, clean wool", grad: "linear-gradient(135deg, #A8B5C0, #D4DDE4)", icon: "❄" },
    { title: "Night Market, Taipei", emotion: "Adventure · Energy", scent: "Star anise, charcoal smoke, warm rain on pavement", grad: "linear-gradient(135deg, #3D2B3A, #6B5E52)", icon: "✦" },
  ];
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><SectionLabel>AI Memory Recognition</SectionLabel></FadeIn>
      <FadeIn delay={50}><SectionTitle>Your Memories</SectionTitle></FadeIn>
      <FadeIn delay={80}>
        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, marginTop: 6, lineHeight: 1.6, maxWidth: 280 }}>
          Upload a photo or describe a moment — AI maps its emotional cues to fragrance notes.
        </p>
      </FadeIn>

      <FadeIn delay={150}>
        <div style={{ marginTop: 18, borderRadius: 16, padding: "22px", border: `1.5px dashed ${P.gold}35`, background: `${P.cream}50`, textAlign: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 26, color: P.gold, display: "block", marginBottom: 6 }}>+</span>
          <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, fontWeight: 500 }}>Add a Memory</p>
          <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "4px 0 0" }}>Photo · Voice note · Written moment</p>
        </div>
      </FadeIn>

      <div style={{ marginTop: 16 }}>
        {memories.map((m, i) => (
          <FadeIn key={i} delay={220 + i * 70}>
            <div onClick={() => setSel(sel === i ? null : i)} style={{ borderRadius: 16, marginBottom: 10, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ background: m.grad, padding: "18px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22, opacity: 0.7 }}>{m.icon}</span>
                <div>
                  <p style={{ fontFamily: serif, fontSize: 15, fontWeight: 500, color: "white", margin: 0 }}>{m.title}</p>
                  <p style={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,0.65)", margin: "3px 0 0" }}>{m.emotion}</p>
                </div>
              </div>
              {sel === i && (
                <div style={{ background: P.glassBg, padding: "14px 16px", borderLeft: `1px solid ${P.glassBorder}`, borderRight: `1px solid ${P.glassBorder}`, borderBottom: `1px solid ${P.glassBorder}`, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                  <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: "0 0 5px" }}>AI Scent Translation</p>
                  <p style={{ fontFamily: serif, fontSize: 13, fontStyle: "italic", color: P.charcoal, margin: 0, lineHeight: 1.5 }}>{m.scent}</p>
                  <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                    <span style={{ padding: "4px 10px", borderRadius: 10, background: `${P.gold}12`, fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 1 }}>Apply to Blend</span>
                    <span style={{ padding: "4px 10px", borderRadius: 10, background: `${P.blush}18`, fontFamily: sans, fontSize: 8, color: P.roseDust, letterSpacing: 1 }}>Preview</span>
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
function DeviceScreen() {
  const [ratios, setRatios] = useState([42, 31, 27]);
  const [connected, setConnected] = useState(false);
  const carts = [
    { name: "Warm Amber", color: P.gold, family: "Oriental Woody", level: 68 },
    { name: "Skin Musk", color: P.roseDust, family: "Musky Floral", level: 45 },
    { name: "Fig Leaf", color: P.sage, family: "Green Aromatic", level: 82 },
  ];
  const adj = (idx, d) => {
    const n = [...ratios]; const nv = Math.max(5, Math.min(80, n[idx] + d)); const diff = nv - n[idx]; n[idx] = nv;
    const oi = [0,1,2].filter(i => i !== idx); const tot = oi.reduce((s,i) => s + n[i], 0);
    oi.forEach(i => { n[i] = Math.max(5, Math.round(n[i] - diff * (n[i] / tot))); });
    const s = n.reduce((a,b) => a+b, 0); n[oi[0]] += 100 - s; setRatios(n);
  };

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><SectionLabel>Smart layering</SectionLabel></FadeIn>
      <FadeIn delay={50}><SectionTitle>Your Device</SectionTitle></FadeIn>

      <FadeIn delay={120}>
        <div style={{ marginTop: 20, borderRadius: 22, background: `linear-gradient(150deg, ${P.charcoal}, ${P.deepPlum})`, padding: "26px 20px", textAlign: "center", position: "relative" }}>
          <div style={{ width: 56, height: 96, margin: "0 auto 16px", background: `linear-gradient(180deg, ${P.warmBeige}, ${P.cream})`, borderRadius: 10, position: "relative", boxShadow: `0 6px 24px rgba(0,0,0,0.3)` }}>
            <div style={{ position: "absolute", top: 8, left: 5, right: 5, bottom: 28, display: "flex", gap: 2, borderRadius: 4, overflow: "hidden" }}>
              {carts.map((c, i) => <div key={i} style={{ flex: ratios[i], background: c.color, transition: "flex 0.4s", opacity: 0.75 }}/>)}
            </div>
            <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 16, height: 16, borderRadius: "50%", background: connected ? P.gold : P.warmGray, boxShadow: connected ? `0 0 10px ${P.gold}50` : "none", transition: "all 0.4s" }}/>
          </div>
          <p style={{ fontFamily: serif, fontSize: 14, color: P.ivory, fontStyle: "italic", margin: 0 }}>Replica Layering Device</p>
          <button onClick={() => setConnected(!connected)} style={{ marginTop: 12, padding: "7px 20px", borderRadius: 16, background: connected ? `${P.gold}18` : "rgba(255,255,255,0.06)", border: `1px solid ${connected ? P.gold : "rgba(255,255,255,0.12)"}`, color: connected ? P.gold : P.roseDust, fontFamily: sans, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
            {connected ? "● Connected" : "Connect Device"}
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={250}>
        <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "20px 0 12px" }}>Blend Ratio</p>
        {carts.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: P.glassBg, borderRadius: 12, marginBottom: 8, border: `1px solid ${P.glassBorder}` }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.color }}/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: P.charcoal, margin: 0 }}>{c.name}</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: P.warmGray, margin: "1px 0 0" }}>{c.family}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => adj(i, -5)} style={{ width: 24, height: 24, borderRadius: "50%", background: P.cream, border: `1px solid ${P.warmBeige}`, cursor: "pointer", fontSize: 13, color: P.warmGray, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, color: P.charcoal, width: 34, textAlign: "center" }}>{ratios[i]}%</span>
              <button onClick={() => adj(i, 5)} style={{ width: 24, height: 24, borderRadius: "50%", background: P.cream, border: `1px solid ${P.warmBeige}`, cursor: "pointer", fontSize: 13, color: P.warmGray, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          </div>
        ))}
      </FadeIn>

      <FadeIn delay={400}>
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
            {carts.map((c, i) => <div key={i} style={{ flex: ratios[i], background: c.color, transition: "flex 0.4s" }}/>)}
          </div>
          <GoldButton dark onClick={() => {}} disabled={!connected}>Spray Blend</GoldButton>
          {!connected && <p style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, marginTop: 8 }}>Connect device to spray</p>}
        </div>
      </FadeIn>

      <FadeIn delay={500}>
        <div style={{ marginTop: 20, padding: "14px", borderRadius: 14, background: P.glassBg, border: `1px solid ${P.glassBorder}` }}>
          <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.warmGray, textTransform: "uppercase", margin: "0 0 10px" }}>Cartridge Levels</p>
          {carts.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, width: 76 }}>{c.name}</span>
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: P.warmBeige }}>
                <div style={{ width: `${c.level}%`, height: "100%", borderRadius: 2, background: c.level < 50 ? P.blush : c.color }}/>
              </div>
              <span style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, width: 28, textAlign: "right" }}>{c.level}%</span>
            </div>
          ))}
          <p style={{ fontFamily: sans, fontSize: 9, color: P.gold, margin: "10px 0 0", cursor: "pointer" }}>Find nearest refill station →</p>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── PROFILE (Skin ID card) ───
function ProfileScreen() {
  const accords = [
    { name: "Warm Amber", pct: 42, color: P.gold },
    { name: "Skin Musk", pct: 31, color: P.roseDust },
    { name: "Fig Leaf", pct: 27, color: P.sage },
  ];
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><SectionLabel>Your identity</SectionLabel></FadeIn>
      <FadeIn delay={50}><SectionTitle>Skin ID Profile</SectionTitle></FadeIn>

      {/* ID Card */}
      <FadeIn delay={150}>
        <div style={{ marginTop: 20, borderRadius: 22, background: `linear-gradient(155deg, ${P.charcoal} 0%, ${P.deepPlum} 60%, #2A2025 100%)`, padding: "28px 22px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, borderRadius: 22, background: `radial-gradient(circle at 30% 20%, ${P.gold}, transparent 50%)` }}/>
          <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 16px", background: `conic-gradient(from 45deg, ${P.gold} 0%, ${P.blush} 42%, ${P.sage} 70%, ${P.gold} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 50px ${P.gold}18` }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: sans, fontSize: 8, color: P.goldLight, letterSpacing: 2, opacity: 0.6 }}>SKIN ID</span>
              <span style={{ fontFamily: serif, fontSize: 20, color: P.ivory, fontWeight: 300, marginTop: 1 }}>#VRQ</span>
              <span style={{ fontFamily: sans, fontSize: 8, color: P.roseDust, marginTop: 1 }}>2026.03.28</span>
            </div>
          </div>
          <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 300, color: P.ivory, margin: 0, fontStyle: "italic" }}>Warm · Amber-Leaning</h3>
          <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: "6px 0 0" }}>High retention · Deep base notes</p>

          <div style={{ marginTop: 20, textAlign: "left" }}>
            {accords.map((a, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontFamily: sans, fontSize: 9, color: P.goldLight, letterSpacing: 1 }}>{a.name}</span>
                  <span style={{ fontFamily: sans, fontSize: 9, color: P.roseDust }}>{a.pct}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.05)" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: a.color, width: `${a.pct}%`, transition: "width 1s ease-out" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Skin metrics */}
      <FadeIn delay={300}>
        <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "22px 0 10px" }}>Your Skin Chemistry</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { label: "pH Level", value: "5.4", sub: "Slightly acidic" },
            { label: "Sebum", value: "Medium", sub: "Balanced retention" },
            { label: "Microbiome", value: "Type B+", sub: "Amber-amplifying" },
            { label: "Skin Temp", value: "33.2°C", sub: "Warm diffusion" },
            { label: "Hydration", value: "62%", sub: "Even evaporation" },
            { label: "Longevity", value: "6–8 hr", sub: "Above average" },
          ].map((m, i) => (
            <CardGlass key={i} style={{ padding: "12px 14px" }}>
              <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>{m.label}</p>
              <p style={{ fontFamily: serif, fontSize: 18, color: P.charcoal, margin: "4px 0 1px", fontWeight: 400 }}>{m.value}</p>
              <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: 0 }}>{m.sub}</p>
            </CardGlass>
          ))}
        </div>
      </FadeIn>

      {/* Olfactive map */}
      <FadeIn delay={450}>
        <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "22px 0 10px" }}>Olfactive Map</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { tier: "Top", notes: "Bergamot · Fig", time: "0–15 min", fade: "Fades faster on your skin" },
            { tier: "Heart", notes: "Iris · Amber", time: "15 min–3 hr", fade: "Strong presence" },
            { tier: "Base", notes: "Musk · Sandalwood", time: "3–8 hr", fade: "Your sweet spot" },
          ].map((n, i) => (
            <CardGlass key={i} style={{ flex: 1, padding: "14px 10px", textAlign: "center" }}>
              <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>{n.tier}</p>
              <p style={{ fontFamily: serif, fontSize: 11, color: P.charcoal, margin: "6px 0 3px", fontStyle: "italic", lineHeight: 1.3 }}>{n.notes}</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: P.roseDust, margin: 0 }}>{n.time}</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: P.warmGray, margin: "4px 0 0", lineHeight: 1.3, fontStyle: "italic" }}>{n.fade}</p>
            </CardGlass>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={550}>
        <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 14, background: `linear-gradient(135deg, ${P.softPink}30, ${P.cream})`, border: `1px solid ${P.glassBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 11 }}>✦</span>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>Scent Evolution</p>
          </div>
          <p style={{ fontFamily: serif, fontSize: 12, color: P.charcoal, margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            Your Skin ID is permanent, but your scent adapts. Seasonal shifts in humidity and temperature subtly change how your accords perform — your Personal Chapter evolves with you.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── MAIN APP ───
export default function ReplicaApp() {
  const [screen, setScreen] = useState("splash"); // splash → onboarding → scan → main
  const [activeTab, setActiveTab] = useState("home");
  const [transitioning, setTransitioning] = useState(false);

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => { setActiveTab(tab); setTransitioning(false); }, 180);
  };

  const renderMain = () => {
    switch (activeTab) {
      case "home": return <HomeScreen onNavigate={switchTab} />;
      case "discover": return <DiscoverScreen />;
      case "memories": return <MemoriesScreen />;
      case "device": return <DeviceScreen />;
      case "profile": return <ProfileScreen />;
      default: return <HomeScreen onNavigate={switchTab} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500&display=swap');
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#1a1816", padding: 20, fontFamily: sans }}>
        <div style={{ width: 390, height: 844, borderRadius: 48, background: P.ivory, position: "relative", overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.08)" }}>
          {/* Notch */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 126, height: 34, background: "#000", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: 50 }}/>

          {screen === "splash" && <SplashScreen onEnter={() => setScreen("onboarding")} />}
          {screen === "onboarding" && <OnboardingScreen onComplete={() => setScreen("scan")} />}
          {screen === "scan" && <SkinScanScreen onComplete={() => setScreen("main")} />}
          {screen === "main" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
              <StatusBar />
              <div style={{ flex: 1, overflow: "hidden", opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(6px)" : "translateY(0)", transition: "all 0.18s ease-out" }}>
                {renderMain()}
              </div>
              <TabBar active={activeTab} onChange={switchTab} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
