import React, { useState, useEffect } from "react";
import { P, T, sans, serif, mono } from "../../theme.js";
import { BatteryBadge, Btn, FadeIn, Glass, GuidedStepsCard, IntroPanel, Label, LayeringDeviceFigure, MiniAdjustDeviceFigure, MiniCartridgeIcon, PlaceholderDeviceFigure, ProfileStarterCard, ReplicaHeroCard, RunwayCampaignFigure, SegmentedControl, StatusBar, Title } from "../../components/appComponents.jsx";

export function SplashScreen({ onEnter }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 300); }, []);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#F8F8F8", transition: "opacity 0.8s", opacity: v ? 1 : 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, rgba(17,17,17,0.035) 1px, transparent 1px), linear-gradient(rgba(17,17,17,0.025) 1px, transparent 1px)", backgroundSize: "36px 36px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 18%, rgba(17,17,17,0.06), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.64), rgba(248,248,248,0.98))", pointerEvents: "none" }} />

      <div style={{ position: "absolute", left: 24, right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 2, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 15, fontWeight: 650, letterSpacing: 3.1, color: P.charcoal, margin: 0 }}>
            PERSONAL CHAPTER
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 46, fontWeight: 760, letterSpacing: 0.2, color: P.charcoal, margin: "9px 0 0", textTransform: "uppercase", lineHeight: 0.96 }}>
            REPLICA
          </p>
          <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 18, fontWeight: 500, letterSpacing: 0.1, color: "#2B2625", margin: "14px 0 0", lineHeight: 1.1, whiteSpace: "nowrap" }}>
            Maison Margiela
          </p>
          <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 9, fontWeight: 500, letterSpacing: 2.2, color: "#2B2625", margin: "2px 0 0", textTransform: "uppercase" }}>
            Paris
          </p>
        </div>
      </div>

      <div style={{ position: "absolute", left: 28, right: 28, bottom: 34, zIndex: 3 }}>
        <button
          type="button"
          onClick={onEnter}
          onPointerUp={onEnter}
          style={{
            width: "100%",
            padding: "16px 22px",
            background: "#111111",
            border: "none",
            color: "#FFFFFF",
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 720,
            letterSpacing: 0,
            cursor: "pointer",
            borderRadius: 14,
            boxShadow: "0 18px 38px rgba(17,17,17,0.18)",
            transition: "all 0.3s",
          }}
        >
          Begin Your Chapter
        </button>
      </div>
    </div>
  );
}

// ─── 2. ONBOARDING (updated flow) ───
export function OnboardingScreen({ onComplete }) {
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
            <div style={{ marginTop: 8, borderRadius: 13, overflow: "hidden", background: "linear-gradient(135deg, #242424, #8A8A8A)", padding: "9px 10px", width: "100%" }}>
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
            <div style={{ marginTop: 10, borderRadius: 18, background: "linear-gradient(180deg, #FFFFFF, #F5F5F5)", border: `1px solid ${P.glassBorder}`, padding: "12px 10px", display: "flex", alignItems: "center", gap: 10, width: "100%", flex: 1 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #FFFFFF, #F3F3F3)", border: `1px solid ${P.glassBorder}`, position: "relative", flexShrink: 0, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }}>
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
    <div style={{ position: "absolute", inset: 0, background: "#F8F8F8", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, rgba(17,17,17,0.03) 1px, transparent 1px), linear-gradient(rgba(17,17,17,0.02) 1px, transparent 1px)", backgroundSize: "36px 36px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 18%, rgba(17,17,17,0.045), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.64), rgba(248,248,248,0.98))", pointerEvents: "none" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", textAlign: "center" }}>
        <FadeIn key={step} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 198, display: "flex", justifyContent: "center", margin: "0 auto 18px" }}>{steps[step].visual}</div>
          <p style={{ ...T.eyebrow, color: P.warmGray, margin: "0 0 10px" }}>
            {steps[step].stepLabel}
          </p>
          <h2 style={{ ...T.pageTitle, color: P.charcoal, margin: "0 0 12px", maxWidth: 312, textAlign: "center" }}>{steps[step].title}</h2>
          <p style={{ ...T.body, color: P.warmGray, maxWidth: 286, margin: "0 auto", textAlign: "center" }}>{steps[step].sub}</p>
        </FadeIn>
      </div>
      <div style={{ position: "relative", zIndex: 2, padding: "0 28px 34px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
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
        <button
          type="button"
          onClick={() => step < 2 ? setStep(step + 1) : onComplete()}
          style={{
            width: "100%",
            padding: "16px 22px",
            background: "#111111",
            border: "none",
            color: "#FFFFFF",
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 720,
            letterSpacing: 0,
            cursor: "pointer",
            borderRadius: 14,
            boxShadow: "0 18px 38px rgba(17,17,17,0.18)",
            transition: "all 0.3s",
          }}
        >
          {step < 2 ? "Next" : "Enter Home"}
        </button>
      </div>
    </div>
  );
}

// ─── 3. DISCOVER: MEMORY UPLOAD (App Entry Point) ───
export function MemoryEntryScreen({ onComplete, memories, onDummyUpload, onShowToast, onOpenStores }) {
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
        <div style={{ flex: 1, padding: "0 24px", overflowY: "auto", paddingBottom: 40 }}>
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
      <div style={{ flex: 1, padding: "0 24px", overflowY: "auto", paddingBottom: 40 }}>
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
            { name: "Warm Amber", notes: "Amber, benzoin, tonka", match: "High affinity", color: "#B78A32" },
            { name: "Clean Skin Musk", notes: "Ambrette seeds, musks, iris accord", match: "Strong match", color: P.roseDust },
            { name: "Sandalwood Cream", notes: "Sandalwood, musks, Iso E Super", match: "Good match", color: "#B89878" },
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
