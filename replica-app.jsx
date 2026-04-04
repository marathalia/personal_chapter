import { useState, useEffect } from "react";

// ─── PALETTE ───
const P = {
  ivory: "#FAF7F2", cream: "#F5F0E8", warmBeige: "#E8DFD0",
  gold: "#C4A265", goldLight: "#D4B87A", blush: "#E8C4B8",
  roseDust: "#C9A89A", charcoal: "#2A2520", warmGray: "#6B5E52",
  softPink: "#F0DDD6", sage: "#A8B5A0", deepPlum: "#3D2B3A",
  glassBg: "rgba(250,247,242,0.72)", glassBorder: "rgba(196,162,101,0.18)",
};
const serif = "'Cormorant Garamond', serif";
const sans = "'Outfit', sans-serif";

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
    { id: "home", icon: "◎", label: "Home" },
    { id: "discover", icon: "◇", label: "Accords" },
    { id: "memories", icon: "◈", label: "Memories" },
    { id: "device", icon: "▣", label: "Device" },
    { id: "profile", icon: "○", label: "Scent ID" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 76, background: "rgba(42,37,32,0.95)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "space-around", borderTop: `1px solid rgba(196,162,101,0.08)`, paddingBottom: 10 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: active === t.id ? P.gold : P.roseDust, transition: "color 0.3s", opacity: active === t.id ? 1 : 0.4 }}>
          <span style={{ fontSize: 17 }}>{t.icon}</span>
          <span style={{ fontFamily: sans, fontSize: 7.5, letterSpacing: 2, textTransform: "uppercase" }}>{t.label}</span>
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
  return <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 4, color: P.warmGray, textTransform: "uppercase", margin: 0 }}>{children}</p>;
}

function Title({ children, style = {} }) {
  return <h2 style={{ fontFamily: serif, fontSize: 26, fontWeight: 300, color: P.charcoal, margin: "5px 0 0", ...style }}>{children}</h2>;
}

function Btn({ children, onClick, dark, full, disabled, style = {} }) {
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

function Glass({ children, style = {} }) {
  return <div style={{ background: P.glassBg, border: `1px solid ${P.glassBorder}`, borderRadius: 16, padding: 16, backdropFilter: "blur(10px)", ...style }}>{children}</div>;
}

// ─── 1. SPLASH ───
function SplashScreen({ onEnter }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 300); }, []);
  return (
    <div style={{ position: "absolute", inset: 0, background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "opacity 0.8s", opacity: v ? 1 : 0 }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: `radial-gradient(ellipse at 50% 30%, ${P.gold}, transparent 70%)` }}/>
      <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 6, color: P.gold, textTransform: "uppercase", marginBottom: 20, opacity: 0.5 }}>Maison Margiela</p>
      <h1 style={{ fontFamily: serif, fontSize: 48, fontWeight: 300, color: P.ivory, letterSpacing: 4, margin: 0 }}>REPLICA</h1>
      <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${P.gold}, transparent)`, margin: "16px 0" }}/>
      <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 300, color: P.goldLight, fontStyle: "italic", margin: 0 }}>Personal Chapter</p>
      <p style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, marginTop: 48, letterSpacing: 2, opacity: 0.4, maxWidth: 180, textAlign: "center", lineHeight: 1.8 }}>
        No two skins. No two scents.
      </p>
      <button onClick={onEnter} style={{ marginTop: 48, padding: "14px 48px", background: "transparent", border: `1px solid ${P.gold}40`, color: P.gold, fontFamily: sans, fontSize: 9, letterSpacing: 5, textTransform: "uppercase", cursor: "pointer", borderRadius: 0, transition: "all 0.4s" }}>
        Begin Your Chapter
      </button>
    </div>
  );
}

// ─── 2. ONBOARDING (updated flow) ───
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Your Skin Is Unique", sub: "No two people share the same scent chemistry. Your microbiome, pH, and body heat shape how fragrance lives and lasts on your skin.", icon: "◉" },
    { title: "Discover Your Scent Profile", sub: "Share a photo, a place, a memory. AI reads the emotional cues and maps them to fragrance notes, building your initial Scent Profile.", icon: "◈" },
    { title: "Unlock Your Full Scent ID", sub: "Visit a Replica counter for a quick skin scan. Your biology merges with your preferences to create a scent that is biologically, emotionally, uniquely yours.", icon: "❋" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: P.ivory, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", textAlign: "center" }}>
        <FadeIn key={step}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: `conic-gradient(from ${step * 120}deg, ${P.gold}15, ${P.blush}12, ${P.sage}12, ${P.gold}15)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 30px", border: `1px solid ${P.gold}18` }}>
            <span style={{ fontSize: 34, color: P.gold }}>{steps[step].icon}</span>
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: P.charcoal, margin: "0 0 16px", fontStyle: "italic" }}>{steps[step].title}</h2>
          <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, lineHeight: 1.8, maxWidth: 260, margin: "0 auto" }}>{steps[step].sub}</p>
        </FadeIn>
      </div>
      <div style={{ padding: "0 40px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {steps.map((_, i) => <div key={i} style={{ width: i === step ? 28 : 6, height: 5, borderRadius: 3, background: i === step ? P.gold : P.warmBeige, transition: "all 0.4s" }}/>)}
        </div>
        <Btn dark full onClick={() => step < 2 ? setStep(step + 1) : onComplete()}>
          {step < 2 ? "Next" : "Start with a Memory"}
        </Btn>
      </div>
    </div>
  );
}

// ─── 3. DISCOVER: MEMORY UPLOAD (App Entry Point) ───
function MemoryEntryScreen({ onComplete }) {
  const [phase, setPhase] = useState("upload"); // upload → analyzing → profile
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [progress, setProgress] = useState(0);

  const memories = [
    { title: "A rainy morning in Kyoto", emotion: "Stillness, warmth, wet stone", icon: "🌧", grad: `linear-gradient(135deg, #6B7B6B, #A8B5A0)` },
    { title: "Dancing at a rooftop bar", emotion: "Energy, heat, amber lights", icon: "✦", grad: `linear-gradient(135deg, ${P.deepPlum}, #6B4060)` },
    { title: "Grandmother's garden", emotion: "Comfort, earth, sun on skin", icon: "❀", grad: `linear-gradient(135deg, #8B7B5C, ${P.roseDust})` },
    { title: "First snow of the year", emotion: "Wonder, crisp air, silence", icon: "❄", grad: `linear-gradient(135deg, #A8B5C0, #D4DDE4)` },
  ];

  const startAnalysis = (idx) => {
    setSelectedMemory(idx);
    setPhase("analyzing");
    let p = 0;
    const interval = setInterval(() => {
      p += 0.8;
      setProgress(Math.min(p, 100));
      if (p >= 100) { clearInterval(interval); setTimeout(() => setPhase("profile"), 500); }
    }, 50);
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
            <div style={{ marginTop: 22, borderRadius: 18, padding: "24px 20px", border: `1.5px dashed ${P.gold}30`, background: `${P.cream}40`, textAlign: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 28, color: P.gold, display: "block", marginBottom: 8 }}>+</span>
              <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, fontWeight: 500 }}>Upload Your Own</p>
              <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "5px 0 0", lineHeight: 1.5 }}>Photo, voice note, or written moment</p>
            </div>
          </FadeIn>

          <FadeIn delay={250}>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 3, color: P.warmGray, textTransform: "uppercase", margin: "24px 0 14px" }}>Or choose a starting memory</p>
          </FadeIn>

          {memories.map((m, i) => (
            <FadeIn key={i} delay={300 + i * 60}>
              <div onClick={() => startAnalysis(i)} style={{ borderRadius: 16, marginBottom: 10, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s", border: `1px solid ${P.glassBorder}` }}>
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
            <p style={{ fontFamily: serif, fontSize: 16, color: P.ivory, margin: 0, fontStyle: "italic" }}>Warm · Sensual · Grounded</p>
            <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: "6px 0 0" }}>Based on your emotional preferences</p>

            <div style={{ marginTop: 18, textAlign: "left" }}>
              {[
                { name: "Amber & Resin", pct: 38, color: P.gold },
                { name: "Woody & Earthy", pct: 28, color: P.roseDust },
                { name: "Green & Herbal", pct: 20, color: P.sage },
                { name: "Floral & Soft", pct: 14, color: P.blush },
              ].map((a, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
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

        <FadeIn delay={250}>
          <div style={{ marginTop: 16, padding: "16px 18px", borderRadius: 16, background: `${P.gold}08`, border: `1px solid ${P.gold}18` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: P.gold }}>◉</span>
              <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>Unlock your Full Scent ID</p>
            </div>
            <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, lineHeight: 1.6 }}>
              This profile reflects your emotional preferences. To see how fragrance actually performs on <em>your skin</em>, visit a Replica counter for a quick microbiome scan.
            </p>
            <p style={{ fontFamily: sans, fontSize: 10, color: P.gold, margin: "10px 0 0", cursor: "pointer", letterSpacing: 1 }}>Find nearest Replica counter →</p>
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

// ─── HOME ───
function HomeScreen({ onNavigate, hasSkinID }) {
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn>
        <Label>Welcome back</Label>
        <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 300, color: P.charcoal, margin: "4px 0 0" }}>Mia</h2>
      </FadeIn>

      {/* Scent ID Status */}
      <FadeIn delay={80}>
        <div style={{ marginTop: 16, borderRadius: 16, padding: "14px 16px", background: hasSkinID ? `${P.gold}08` : `${P.softPink}30`, border: `1px solid ${hasSkinID ? P.gold : P.blush}18`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: hasSkinID ? `conic-gradient(from 45deg, ${P.gold}, ${P.blush}, ${P.sage}, ${P.gold})` : P.warmBeige, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: hasSkinID ? P.charcoal : P.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: sans, fontSize: 7, color: hasSkinID ? P.goldLight : P.warmGray, letterSpacing: 1 }}>{hasSkinID ? "ID" : "?"}</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 500, color: P.charcoal, margin: 0 }}>
              {hasSkinID ? "Scent ID #MIA · Verified" : "Scent Profile · Partial"}
            </p>
            <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "2px 0 0" }}>
              {hasSkinID ? "Biology + Preferences synced" : "Visit a Replica counter to unlock full Scent ID"}
            </p>
          </div>
          {!hasSkinID && <span style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 1, cursor: "pointer" }}>DECODE →</span>}
        </div>
      </FadeIn>

      {/* Today's Accord */}
      <FadeIn delay={140}>
        <div style={{ marginTop: 16, borderRadius: 22, background: `linear-gradient(155deg, ${P.deepPlum}, ${P.charcoal})`, padding: "24px 22px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -10, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(${P.gold}15, transparent)`, filter: "blur(30px)" }}/>
          <p style={{ fontFamily: sans, fontSize: 7, letterSpacing: 4, color: P.goldLight, textTransform: "uppercase", margin: 0, opacity: 0.5 }}>
            {hasSkinID ? "Based on your Scent ID" : "Based on your Scent Profile"}
          </p>
          <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 300, color: P.ivory, margin: "8px 0 4px", fontStyle: "italic" }}>Sunlit Terrace</h3>
          <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: 0 }}>Warm amber · Fig leaf · Skin musk</p>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {["Amber", "Green", "Musky"].map(n => <span key={n} style={{ padding: "4px 12px", borderRadius: 16, background: "rgba(196,162,101,0.08)", border: "1px solid rgba(196,162,101,0.12)", fontFamily: sans, fontSize: 8, color: P.goldLight, letterSpacing: 1 }}>{n}</span>)}
          </div>
          {hasSkinID && (
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{ width: "91%", height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${P.gold}, ${P.blush})` }}/>
              </div>
              <span style={{ fontFamily: sans, fontSize: 9, color: P.goldLight, opacity: 0.5 }}>91% skin match</span>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={220}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
          {[
            { title: "Accords", sub: "Cartridges for you", icon: "◇", tab: "discover" },
            { title: "My Device", sub: "Blend & spray", icon: "▣", tab: "device" },
            { title: "Memories", sub: "Add a moment", icon: "◈", tab: "memories" },
            { title: "Scent ID", sub: hasSkinID ? "View profile" : "Unlock full ID", icon: "○", tab: "profile" },
          ].map((a, i) => (
            <button key={i} onClick={() => onNavigate(a.tab)} style={{ background: P.glassBg, border: `1px solid ${P.glassBorder}`, borderRadius: 14, padding: "16px 14px", cursor: "pointer", textAlign: "left", backdropFilter: "blur(10px)", transition: "all 0.2s" }}>
              <span style={{ fontSize: 18, display: "block", marginBottom: 8, color: P.gold }}>{a.icon}</span>
              <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: P.charcoal, margin: 0 }}>{a.title}</p>
              <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "3px 0 0" }}>{a.sub}</p>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Scent Diary */}
      <FadeIn delay={350}>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontFamily: serif, fontSize: 17, color: P.charcoal, margin: 0 }}>Scent Diary</p>
            <span style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 1.5, cursor: "pointer" }}>VIEW ALL →</span>
          </div>
          {[
            { date: "Mar 28", name: "Golden Hour", notes: "Bergamot · Sandalwood · Vanilla", mood: "Warm", grad: [P.goldLight, P.blush] },
            { date: "Mar 26", name: "After Rain", notes: "Petrichor · Iris · White Tea", mood: "Fresh", grad: [P.blush, P.sage] },
            { date: "Mar 23", name: "Velvet Night", notes: "Oud · Rose · Amber", mood: "Sensual", grad: [P.deepPlum, P.charcoal] },
          ].map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${P.warmBeige}` : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${e.grad[0]}, ${e.grad[1]})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white" }}>❋</div>
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

// ─── DISCOVER (Accords) ───
function DiscoverScreen({ hasSkinID }) {
  const [cat, setCat] = useState("for-you");
  const cats = [{ id: "for-you", l: "For You" }, { id: "warm", l: "Warm" }, { id: "fresh", l: "Fresh" }, { id: "woody", l: "Woody" }];
  const carts = [
    { name: "Warm Amber", family: "Oriental", notes: "Amber · Benzoin · Tonka", match: hasSkinID ? 94 : null, pref: "High affinity", color: P.gold, desc: hasSkinID ? "Your skin's acidity amplifies amber's warmth beautifully" : "Strong match with your preference for warm, resinous notes", badge: true },
    { name: "Skin Musk", family: "Musky Floral", notes: "White musk · Iris · Cashmere", match: hasSkinID ? 89 : null, pref: "Strong match", color: P.roseDust, desc: hasSkinID ? "Your sebum level holds musk notes for 6+ hours" : "Aligns with your comfort-seeking emotional cues" },
    { name: "Fig Leaf", family: "Green Aromatic", notes: "Fig · Basil · Coconut milk", match: hasSkinID ? 86 : null, pref: "Good match", color: P.sage, desc: hasSkinID ? "Green notes balanced by your warm skin temperature" : "Complements the grounding tones in your memory" },
    { name: "Sandalwood Veil", family: "Woody", notes: "Sandalwood · Cream · Cedar", match: hasSkinID ? 82 : null, pref: "Good match", color: "#B89878", desc: hasSkinID ? "Your microbiome Type B+ enhances woody base notes" : "Woody notes complement your earthy emotional profile" },
  ];
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><Label>{hasSkinID ? "Based on your Scent ID #MIA" : "Based on your Scent Profile"}</Label></FadeIn>
      <FadeIn delay={50}><Title>Discover Accords</Title></FadeIn>
      <FadeIn delay={80}>
        <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, marginTop: 6, lineHeight: 1.6 }}>
          {hasSkinID ? "Cartridges ranked by skin chemistry compatibility." : "Cartridges ranked by emotional preference. Skin-match % unlocks after Decode scan."}
        </p>
      </FadeIn>

      <FadeIn delay={110}>
        <div style={{ display: "flex", gap: 6, marginTop: 14, overflowX: "auto" }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              padding: "6px 16px", borderRadius: 18, border: `1px solid ${cat === c.id ? P.gold : P.warmBeige}`,
              background: cat === c.id ? `${P.gold}0a` : "transparent", fontFamily: sans, fontSize: 10,
              letterSpacing: 1, color: cat === c.id ? P.gold : P.warmGray, cursor: "pointer", transition: "all 0.3s", whiteSpace: "nowrap",
            }}>{c.l}</button>
          ))}
        </div>
      </FadeIn>

      <div style={{ marginTop: 16 }}>
        {carts.map((c, i) => (
          <FadeIn key={i} delay={160 + i * 70}>
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 12, border: `1px solid ${P.glassBorder}`, background: P.glassBg }}>
              <div style={{ display: "flex", gap: 14, padding: 16 }}>
                <div style={{ width: 48, height: 68, borderRadius: 10, background: `linear-gradient(180deg, ${c.color}35, ${c.color}10)`, border: `1px solid ${c.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                  <div style={{ width: 14, height: 36, borderRadius: 5, background: `${c.color}45` }}/>
                  {c.badge && <div style={{ position: "absolute", top: -5, right: -5, background: P.gold, borderRadius: 8, padding: "2px 5px", fontFamily: sans, fontSize: 6, color: P.charcoal, fontWeight: 500 }}>★</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, color: P.charcoal, margin: 0 }}>{c.name}</p>
                      <p style={{ fontFamily: sans, fontSize: 8, color: P.gold, margin: "2px 0 0", letterSpacing: 1.5 }}>{c.family}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {c.match ? (
                        <>
                          <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, color: P.charcoal }}>{c.match}%</span>
                          <p style={{ fontFamily: sans, fontSize: 7, color: P.warmGray, margin: "1px 0 0" }}>skin match</p>
                        </>
                      ) : (
                        <>
                          <span style={{ fontFamily: sans, fontSize: 10, fontWeight: 500, color: P.gold }}>{c.pref}</span>
                          <p style={{ fontFamily: sans, fontSize: 7, color: P.roseDust, margin: "1px 0 0" }}>preference</p>
                        </>
                      )}
                    </div>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0" }}>{c.notes}</p>
                  {c.match && (
                    <div style={{ marginTop: 6, height: 3, borderRadius: 2, background: P.warmBeige, overflow: "hidden" }}>
                      <div style={{ width: `${c.match}%`, height: "100%", borderRadius: 2, background: c.color }}/>
                    </div>
                  )}
                  <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "8px 0 0", fontStyle: "italic", lineHeight: 1.4 }}>{c.desc}</p>
                </div>
              </div>
              <div style={{ display: "flex", borderTop: `1px solid ${P.warmBeige}` }}>
                <button style={{ flex: 1, padding: "10px", background: "none", border: "none", borderRight: `1px solid ${P.warmBeige}`, fontFamily: sans, fontSize: 9, color: P.gold, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}>Preview</button>
                <button style={{ flex: 1, padding: "10px", background: "none", border: "none", fontFamily: sans, fontSize: 9, color: P.charcoal, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}>Add to Device</button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={500}>
        <div style={{ padding: "14px 16px", borderRadius: 14, background: `${P.softPink}20`, border: `1px solid ${P.glassBorder}`, marginTop: 4 }}>
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>$49 per cartridge · 15ml EDP · Refillable</p>
          <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "5px 0 0", lineHeight: 1.5 }}>Personalized. Skin-adaptive. Refill at any Replica counter.</p>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── MEMORIES ───
function MemoriesScreen() {
  const [sel, setSel] = useState(null);
  const memories = [
    { title: "A rainy morning in Kyoto", emotion: "Stillness · Warmth", scent: "Wet stone, hinoki wood, soft green tea steam", grad: `linear-gradient(135deg, #6B7B6B, #A8B5A0)`, icon: "🌧" },
    { title: "Dancing at a rooftop bar", emotion: "Energy · Heat", scent: "Warm amber, tobacco leaf, night-blooming jasmine", grad: `linear-gradient(135deg, ${P.deepPlum}, #6B4060)`, icon: "✦" },
    { title: "Grandmother's garden", emotion: "Comfort · Earth", scent: "Sun-warmed earth, fig leaf, dried lavender", grad: `linear-gradient(135deg, #8B7B5C, ${P.roseDust})`, icon: "❀" },
    { title: "First snow of the year", emotion: "Wonder · Silence", scent: "Cool air, pine resin, clean wool, woodsmoke", grad: `linear-gradient(135deg, #A8B5C0, #D4DDE4)`, icon: "❄" },
  ];
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
        <div style={{ marginTop: 16, borderRadius: 16, padding: "22px", border: `1.5px dashed ${P.gold}30`, background: `${P.cream}40`, textAlign: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 24, color: P.gold, display: "block", marginBottom: 6 }}>+</span>
          <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, fontWeight: 500 }}>Add a Memory</p>
          <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "4px 0 0" }}>Photo · Voice note · Written moment</p>
        </div>
      </FadeIn>

      <div style={{ marginTop: 14 }}>
        {memories.map((m, i) => (
          <FadeIn key={i} delay={200 + i * 60}>
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
                  <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                    <span style={{ padding: "5px 12px", borderRadius: 12, background: `${P.gold}0a`, border: `1px solid ${P.gold}18`, fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 1, cursor: "pointer" }}>Apply to Blend</span>
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
    { name: "Warm Amber", color: P.gold, family: "Oriental", level: 68 },
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
          <button onClick={() => setConnected(!connected)} style={{ marginTop: 12, padding: "7px 20px", borderRadius: 16, background: connected ? `${P.gold}15` : "rgba(255,255,255,0.05)", border: `1px solid ${connected ? P.gold : "rgba(255,255,255,0.1)"}`, color: connected ? P.gold : P.roseDust, fontFamily: sans, fontSize: 8, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
            {connected ? "● Connected" : "Connect Device"}
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={220}>
        <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "20px 0 10px" }}>Blend Ratio</p>
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
          <Btn dark onClick={() => {}} disabled={!connected}>Spray Blend</Btn>
          {!connected && <p style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, marginTop: 8 }}>Connect device to spray</p>}
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
          <p style={{ fontFamily: sans, fontSize: 9, color: P.gold, margin: "12px 0 0", cursor: "pointer", letterSpacing: 0.5 }}>Find nearest refill station →</p>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── PROFILE / SCENT ID ───
function ProfileScreen({ hasSkinID, onDecode }) {
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><Label>{hasSkinID ? "Your identity" : "Partial profile"}</Label></FadeIn>
      <FadeIn delay={50}><Title>{hasSkinID ? "Scent ID" : "Scent Profile"}</Title></FadeIn>

      <FadeIn delay={120}>
        <div style={{ marginTop: 18, borderRadius: 22, background: `linear-gradient(155deg, ${P.charcoal} 0%, ${P.deepPlum} 60%, #2A2025 100%)`, padding: "28px 22px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, borderRadius: 22, background: `radial-gradient(circle at 30% 20%, ${P.gold}, transparent 50%)` }}/>
          <div style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 14px", background: hasSkinID ? `conic-gradient(from 45deg, ${P.gold} 0%, ${P.blush} 42%, ${P.sage} 70%, ${P.gold} 100%)` : `conic-gradient(from 45deg, ${P.warmGray}40, ${P.warmBeige}40, ${P.warmGray}40)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hasSkinID ? `0 0 50px ${P.gold}15` : "none" }}>
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: P.charcoal, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: sans, fontSize: 7, color: P.goldLight, letterSpacing: 2, opacity: 0.5 }}>{hasSkinID ? "SCENT ID" : "PROFILE"}</span>
              <span style={{ fontFamily: serif, fontSize: 18, color: P.ivory, fontWeight: 300, marginTop: 2 }}>{hasSkinID ? "#MIA" : "Partial"}</span>
            </div>
          </div>
          <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 300, color: P.ivory, margin: 0, fontStyle: "italic" }}>
            {hasSkinID ? "Warm · Amber-Leaning · High Retention" : "Warm · Sensual · Grounded"}
          </h3>
          <p style={{ fontFamily: sans, fontSize: 10, color: P.roseDust, margin: "6px 0 0" }}>
            {hasSkinID ? "Biology + Preferences synced" : "Emotional preferences only"}
          </p>
        </div>
      </FadeIn>

      {!hasSkinID && (
        <FadeIn delay={200}>
          <div style={{ marginTop: 16, borderRadius: 18, padding: "20px", background: `linear-gradient(135deg, ${P.cream}, ${P.softPink}30)`, border: `1px solid ${P.gold}18`, textAlign: "center" }}>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 3, color: P.gold, textTransform: "uppercase", margin: "0 0 8px" }}>Step 2: Decode</p>
            <p style={{ fontFamily: serif, fontSize: 16, color: P.charcoal, margin: "0 0 6px", fontStyle: "italic" }}>Unlock Your Full Scent ID</p>
            <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "0 0 16px", lineHeight: 1.6 }}>
              Visit a Replica counter for a quick skin scan. Your microbiome, pH, and skin chemistry merge with your Scent Profile for a complete biological match.
            </p>
            <Btn dark onClick={onDecode}>Find Nearest Counter</Btn>
            <p style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, margin: "10px 0 0" }}>Quick, non-invasive, takes 60 seconds</p>
          </div>
        </FadeIn>
      )}

      {hasSkinID && (
        <FadeIn delay={220}>
          <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "22px 0 10px" }}>Your Skin Chemistry</p>
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
                <p style={{ fontFamily: sans, fontSize: 7, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>{m.label}</p>
                <p style={{ fontFamily: serif, fontSize: 18, color: P.charcoal, margin: "4px 0 1px", fontWeight: 400 }}>{m.value}</p>
                <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: 0 }}>{m.sub}</p>
              </Glass>
            ))}
          </div>
        </FadeIn>
      )}

      <FadeIn delay={hasSkinID ? 380 : 350}>
        <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "22px 0 10px" }}>Olfactive Map</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { tier: "Top", notes: "Bergamot · Fig", time: "0-15 min", note: hasSkinID ? "Fades faster on your skin" : "Light and bright" },
            { tier: "Heart", notes: "Iris · Amber", time: "15 min-3 hr", note: hasSkinID ? "Strong presence" : "Core expression" },
            { tier: "Base", notes: "Musk · Sandalwood", time: "3-8 hr", note: hasSkinID ? "Your sweet spot" : "Foundation layer" },
          ].map((n, i) => (
            <Glass key={i} style={{ flex: 1, padding: "14px 10px", textAlign: "center" }}>
              <p style={{ fontFamily: sans, fontSize: 7, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>{n.tier}</p>
              <p style={{ fontFamily: serif, fontSize: 11, color: P.charcoal, margin: "6px 0 3px", fontStyle: "italic", lineHeight: 1.3 }}>{n.notes}</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: P.roseDust, margin: 0 }}>{n.time}</p>
              <p style={{ fontFamily: sans, fontSize: 8, color: P.warmGray, margin: "4px 0 0", fontStyle: "italic" }}>{n.note}</p>
            </Glass>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={hasSkinID ? 480 : 420}>
        <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 14, background: `linear-gradient(135deg, ${P.softPink}25, ${P.cream})`, border: `1px solid ${P.glassBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: P.gold }}>✦</span>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.gold, textTransform: "uppercase", margin: 0 }}>Scent Evolution</p>
          </div>
          <p style={{ fontFamily: serif, fontSize: 12, color: P.charcoal, margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            {hasSkinID
              ? "Your Scent ID is permanent, but your fragrance evolves. Seasonal shifts subtly change how your accords perform. Your Personal Chapter grows with you."
              : "Your Scent Profile evolves as you add more memories. Each one refines your fragrance directions. Your chapter is always being written."
            }
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── MAIN ───
export default function ReplicaApp() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [transitioning, setTransitioning] = useState(false);
  const [hasSkinID, setHasSkinID] = useState(false);

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => { setActiveTab(tab); setTransitioning(false); }, 150);
  };

  const renderMain = () => {
    switch (activeTab) {
      case "home": return <HomeScreen onNavigate={switchTab} hasSkinID={hasSkinID} />;
      case "discover": return <DiscoverScreen hasSkinID={hasSkinID} />;
      case "memories": return <MemoriesScreen />;
      case "device": return <DeviceScreen />;
      case "profile": return <ProfileScreen hasSkinID={hasSkinID} onDecode={() => setHasSkinID(true)} />;
      default: return <HomeScreen onNavigate={switchTab} hasSkinID={hasSkinID} />;
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
        <div style={{ width: 390, height: 844, borderRadius: 48, background: P.ivory, position: "relative", overflow: "hidden", boxShadow: "0 30px 90px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.06)" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 126, height: 34, background: "#000", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: 50 }}/>

          {screen === "splash" && <SplashScreen onEnter={() => setScreen("onboarding")} />}
          {screen === "onboarding" && <OnboardingScreen onComplete={() => setScreen("discover-entry")} />}
          {screen === "discover-entry" && <MemoryEntryScreen onComplete={() => setScreen("main")} />}
          {screen === "main" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
              <StatusBar />
              <div style={{ flex: 1, overflow: "hidden", opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(5px)" : "translateY(0)", transition: "all 0.15s ease-out" }}>
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
