import React, { useMemo } from "react";
import { T, sans, mono } from "../../theme.js";
import { getLiveOlfactiveMap, getMemoryArchiveBackground } from "../../logic/scent.js";
import { BatteryBadge, FadeIn, LayeringDeviceFigure, ProductDeviceImage, StoreAccessCard } from "../../components/appComponents.jsx";

export function HomeScreen({
  hasSkinID,
  carts,
  ratios,
  connected,
  batteryLevel,
  onRequestPairing,
  onAdjustRatio,
  onSprayBlend,
  onOpenRatioAssistant,
  onOpenStores,
  memories,
  setupSteps,
  onOpenProgressStep,
  onOpenProfile,
}) {
  const primaryMemory = memories[0];
  const displayMemory = primaryMemory || {
    title: "Golden Afternoon",
    emotion: "Warm light, soft cotton, quiet room",
    scent: "Citrus Bloom · Soft Floral · Warm Woods",
  };
  const connectionTone = connected ? "#34C759" : "#8E8E93";
  const setupComplete = setupSteps.every((step) => step.done);
  const setupDoneCount = setupSteps.filter((step) => step.done).length;
  const skinPreviewStats = [
    { label: "pH", value: "5.4", sub: "Slightly acidic" },
    { label: "Sebum", value: "Medium", sub: "Balanced" },
    { label: "Microbiome", value: "B+", sub: "Amber-friendly" },
  ];

  const handleDeviceAction = () => {
    if (connected) {
      onOpenRatioAssistant();
      return;
    }
    onRequestPairing();
  };

  const Card = ({ children, style = {} }) => (
    <section style={{ borderRadius: 18, background: "rgba(255,255,255,0.86)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 6px 18px rgba(0,0,0,0.04)", overflow: "hidden", ...style }}>
      {children}
    </section>
  );

  const DeviceBottle = ({ compact = false }) => (
    <ProductDeviceImage width={compact ? 42 : 82} height={compact ? 54 : 112} glowColor="rgba(183,138,50,0.16)" compact={compact} />
  );

  const SetupIcon = ({ id, done = false }) => {
    if (done) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 12.5l4.1 4.1L18 8.7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (id === "memory") {
      return <span style={{ fontSize: 26, lineHeight: 1, fontWeight: 430 }}>+</span>;
    }
    if (id === "decode") {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" strokeDasharray="1.2 3" />
        </svg>
      );
    }
    return (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="5" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="10" y="8" width="4" height="8" fill="currentColor" />
      </svg>
    );
  };

  const ChemistryPreviewCard = ({ delay = 70 }) => (
    <FadeIn delay={delay}>
      <Card style={{ marginTop: 12, padding: 15, background: "linear-gradient(135deg, #FFFFFF, #F7F7F7)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <p style={{ ...T.cardTitle, fontSize: 18, color: "#1D1D1F", margin: 0, lineHeight: 1.18 }}>Skin profile</p>
            <p style={{ ...T.caption, fontSize: 11.5, color: "#6E6E73", margin: "5px 0 0" }}>Your decoded skin data is active.</p>
          </div>
          <button type="button" onClick={onOpenProfile} style={{ border: "1px solid rgba(17,17,17,0.12)", background: "#FFFFFF", color: "#1D1D1F", borderRadius: 999, height: 32, padding: "0 12px", fontFamily: sans, fontSize: 11.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            Show more
          </button>
        </div>
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
          {skinPreviewStats.map((stat) => (
            <div key={stat.label} style={{ minHeight: 74, borderRadius: 14, border: "1px solid rgba(17,17,17,0.08)", background: "#FFFFFF", padding: "10px 9px", display: "grid", alignContent: "center" }}>
              <p style={{ fontFamily: mono, fontSize: 8.2, letterSpacing: 1.2, textTransform: "uppercase", color: "#6E6E73", margin: 0 }}>{stat.label}</p>
              <p style={{ fontFamily: sans, fontSize: 18, fontWeight: 780, color: "#1D1D1F", margin: "6px 0 0", lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontFamily: sans, fontSize: 9.6, color: "#6E6E73", margin: "5px 0 0", lineHeight: 1.2 }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </Card>
    </FadeIn>
  );

  const liveMap = useMemo(() => getLiveOlfactiveMap(carts, ratios), [carts, ratios]);
  const dominantLayer = useMemo(() => {
    if (!liveMap.length) return null;
    return [...liveMap].sort((a, b) => b.ratio - a.ratio)[0] || null;
  }, [liveMap]);
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 96, overflowY: "auto", height: "100%", background: "#F7F7F7", color: "#1D1D1F" }}>
      <FadeIn>
        <header style={{ marginTop: 0, marginBottom: 14 }}>
          <h1 style={{ ...T.pageTitle, color: "#1D1D1F", margin: 0 }}>Good morning, Maria</h1>
        </header>
      </FadeIn>

      <FadeIn delay={40}>
        <Card style={{ padding: setupComplete ? 12 : 14, minHeight: setupComplete ? undefined : 132, position: "relative", background: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)" }}>
          <div style={{ display: "grid", gridTemplateColumns: setupComplete ? "76px 1fr" : "1fr 70px", gap: setupComplete ? 10 : 12, alignItems: "center" }}>
            {setupComplete ? (
              <>
                <div style={{ height: 76, borderRadius: 16, overflow: "hidden", background: getMemoryArchiveBackground(displayMemory), filter: "saturate(0.9) contrast(0.98)", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(0,0,0,0.08))" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ ...T.eyebrow, fontSize: 10, color: "#B78A32", margin: 0 }}>Current Memory</p>
                  <h1 style={{ ...T.sectionTitle, fontSize: 17, color: "#1D1D1F", margin: "6px 0 0", lineHeight: 1.16, overflow: "hidden", wordBreak: "break-word", overflowWrap: "anywhere" }}>{displayMemory.title}</h1>
                  <p style={{ ...T.caption, fontSize: 11.5, color: "#6E6E73", margin: "6px 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{displayMemory.emotion}</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ minWidth: 0 }}>
                  <p style={{ ...T.eyebrow, fontSize: 10, color: "#111111", margin: 0 }}>Personal Chapter</p>
                  <h1 style={{ ...T.sectionTitle, fontSize: 16, color: "#1D1D1F", margin: "7px 0 0", lineHeight: 1.22 }}>Your scent, shaped by memory.</h1>
                  <p style={{ ...T.caption, fontSize: 11.5, color: "#6E6E73", margin: "7px 0 0" }}>Every memory has a scent that fits you.</p>
                </div>
                <div style={{ minHeight: 84, borderRadius: 16, background: "rgba(255,255,255,0.52)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.04)", padding: "8px 8px 9px", gap: 7 }}>
                  <span style={{ ...T.chip, fontSize: 10.2, color: "#1D1D1F" }}>{setupDoneCount}/3 ready</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, width: "100%" }}>
                    {setupSteps.map((step) => (
                      <span
                        key={step.id}
                        style={{
                          height: 5,
                          borderRadius: 999,
                          background: step.done ? "#1D1D1F" : "rgba(17,17,17,0.16)",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 9.6, lineHeight: 1.1, color: "#6E6E73", textAlign: "center" }}>
                    Setup Progress
                  </span>
                </div>
              </>
            )}
          </div>
          {!setupComplete && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, marginTop: 12 }}>
              {setupSteps.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onOpenProgressStep(step.id)}
                  style={{
                    minHeight: 86,
                    borderRadius: 16,
                    border: `1px solid ${step.done ? "rgba(17,17,17,0.2)" : "rgba(0,0,0,0.08)"}`,
                    background: step.done ? "#ECEEF1" : "rgba(255,255,255,0.78)",
                    color: "#1D1D1F",
                    padding: "10px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    opacity: step.done ? 0.92 : 1,
                  }}
                >
                  <span style={{ width: 30, height: 30, borderRadius: 11, border: `1px solid ${step.done ? "rgba(17,17,17,0.14)" : "rgba(0,0,0,0.10)"}`, background: step.done ? "#D6D9DF" : "#F0F1F4", display: "flex", alignItems: "center", justifyContent: "center", color: "#1D1D1F", flexShrink: 0 }}>
                    <SetupIcon id={step.id} done={step.done} />
                  </span>
                  <span style={{ ...T.chip, fontSize: 10.8, color: "#1D1D1F", textAlign: "center", maxWidth: 76, lineHeight: 1.14 }}>{step.title}</span>
                </button>
              ))}
            </div>
          )}
        </Card>
      </FadeIn>

      {!connected && (
        <>
          <FadeIn delay={80}>
            <Card style={{ marginTop: 12, padding: "18px 16px 16px", background: "linear-gradient(135deg, #FFFFFF, #F6F6F6)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <p style={{ ...T.cardTitle, fontSize: 19, color: "#1D1D1F", margin: 0 }}>Device</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, ...T.chip, fontSize: 14, color: connectionTone }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: connectionTone }} />
                  Not paired
                </span>
              </div>

              <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "86px 1fr", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 126 }}>
                  <div style={{ transform: "scale(0.98)", transformOrigin: "center center" }}>
                    <DeviceBottle />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <p style={{ ...T.chip, fontSize: 16, color: "#1D1D1F", margin: 0, lineHeight: 1.2 }}>Connect Personal Chapter</p>
                  <p style={{ ...T.caption, fontSize: 12.5, color: "#6E6E73", margin: "6px 0 0", lineHeight: 1.42 }}>
                    Unlock live battery, sync, and blend control.
                  </p>
                  <button type="button" onClick={handleDeviceAction} style={{ marginTop: 12, height: 36, width: "100%", borderRadius: 11, border: "none", background: "#111111", color: "#FFFFFF", ...T.button, fontSize: 13.5, cursor: "pointer" }}>
                    Pair
                  </button>
                </div>
              </div>
            </Card>
          </FadeIn>

          {hasSkinID && <ChemistryPreviewCard delay={110} />}

          <StoreAccessCard decoded={hasSkinID} onOpenStores={onOpenStores} />
        </>
      )}

      {connected && (
      <FadeIn delay={120}>
        <Card style={{ marginTop: 12, padding: 16, background: "linear-gradient(155deg, rgba(255,255,255,0.98), rgba(247,247,247,0.92))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <p style={{ ...T.eyebrow, fontSize: 9.5, color: "#8A8A8E", margin: 0 }}>Current Blend</p>
              <p style={{ ...T.sectionTitle, fontSize: 17, color: "#1D1D1F", margin: "6px 0 0", lineHeight: 1.2 }}>Today's Personal Chapter</p>
            </div>
            <BatteryBadge level={batteryLevel} />
          </div>

          <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
            <LayeringDeviceFigure carts={carts} ratios={ratios} connected={connected} width={98} height={138} />
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 9 }}>
            {carts.map((cart, index) => {
              const layer = liveMap[index];
              return (
                <div key={cart.name} style={{ borderRadius: 14, border: "1px solid rgba(17,17,17,0.10)", background: "#FFFFFF", padding: "10px 11px", display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ ...T.chip, fontSize: 12, color: "#1D1D1F", margin: 0, whiteSpace: "normal", overflow: "visible", textOverflow: "clip", lineHeight: 1.2 }}>
                      {cart.name}
                    </p>
                    <p style={{ ...T.caption, fontSize: 10, color: "#8A8A8E", margin: "2px 0 0" }}>
                      {cart.level}% left
                      {layer ? ` · ${layer.tier} · ${layer.time}` : ""}
                    </p>
                    {layer?.effect && (
                      <p style={{ ...T.caption, fontSize: 10, color: "#8A8A8E", margin: "2px 0 0" }}>
                        {layer.effect}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <button type="button" onClick={() => onAdjustRatio(index, -5)} aria-label={"Decrease " + cart.name} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(17,17,17,0.12)", background: "rgba(255,255,255,0.9)", color: "#1D1D1F", fontSize: 16, lineHeight: 1, cursor: "pointer" }}>−</button>
                    <p style={{ ...T.chip, color: "#1D1D1F", margin: 0, textAlign: "center", fontSize: 12, fontWeight: 700, width: 40 }}>{ratios[index]}%</p>
                    <button type="button" onClick={() => onAdjustRatio(index, 5)} aria-label={"Increase " + cart.name} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(17,17,17,0.12)", background: "rgba(255,255,255,0.9)", color: "#1D1D1F", fontSize: 16, lineHeight: 1, cursor: "pointer" }}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(17,17,17,0.08)", background: "rgba(255,255,255,0.74)" }}>
            <div style={{ display: "flex", height: 4, borderRadius: 999, overflow: "hidden", background: "#ECECEF" }}>
              {carts.map((c, i) => (
                <div key={c.name} style={{ flex: ratios[i], background: c.color, transition: "flex 0.35s ease" }} />
              ))}
            </div>
            {dominantLayer && (
              <p style={{ ...T.caption, fontSize: 10.5, color: "#6E6E73", margin: "7px 0 0" }}>
                Live now: {dominantLayer.notes} leads at {dominantLayer.ratio}%.
              </p>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginTop: 16 }}>
            <button type="button" onClick={onSprayBlend} style={{ width: "100%", height: 42, borderRadius: 13, border: "none", background: "#111111", color: "#FFFFFF", ...T.button, fontSize: 12, cursor: "pointer" }}>Update blend</button>
            <button type="button" onClick={onOpenRatioAssistant} style={{ width: "100%", height: 42, borderRadius: 13, border: "1px solid rgba(17,17,17,0.1)", background: "#FFFFFF", color: "#1D1D1F", ...T.button, fontSize: 12, cursor: "pointer" }}>Ask assistant</button>
          </div>
        </Card>
      </FadeIn>
      )}

      {hasSkinID && connected && <ChemistryPreviewCard delay={135} />}

      {connected && <StoreAccessCard decoded={hasSkinID} onOpenStores={onOpenStores} />}
    </div>
  );
}
