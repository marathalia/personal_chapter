import React, { useState, useEffect, useMemo } from "react";
import { P, T, sans, serif, mono } from "../../theme.js";
import { getAccordPhotoBackground, getBlendLabInsights, getLiveOlfactiveMap, getMemoryArchiveBackground, getMemoryRecommendedAccords, getReplicaMemoryWearAnalysis } from "../../logic/scent.js";
import { BatteryBadge, Btn, FadeIn, Glass, GuidedStepsCard, IntroPanel, Label, LayeringDeviceFigure, MiniAdjustDeviceFigure, MiniCartridgeIcon, PlaceholderDeviceFigure, ProductDeviceImage, ProfileStarterCard, ReplicaHeroCard, RunwayCampaignFigure, SegmentedControl, StatusBar, Title } from "../../components/appComponents.jsx";

export function ScentLabScreen({
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
  const [labSecondary, setLabSecondary] = useState("Clean Skin Musk");
  const [labTertiary, setLabTertiary] = useState("Fig & Leaf");

  useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);

  const labOptions = useMemo(() => accordLibrary, [accordLibrary]);
  const labSelectedNames = [labPrimary, labSecondary, labTertiary].filter(Boolean);
  const setLabSelectedNames = (next) => {
    setLabPrimary(next[0] || "");
    setLabSecondary(next[1] || "");
    setLabTertiary(next[2] || "");
  };
  const handleLabAccordToggle = (name) => {
    const isSelected = labSelectedNames.includes(name);
    if (isSelected) {
      setLabSelectedNames(labSelectedNames.filter((item) => item !== name));
      return;
    }
    if (labSelectedNames.length < 3) {
      setLabSelectedNames([...labSelectedNames, name]);
      return;
    }
    setLabSelectedNames([labSelectedNames[1], labSelectedNames[2], name]);
  };
  const primaryAccord = useMemo(() => labOptions.find((item) => item.name === labPrimary), [labOptions, labPrimary]);
  const secondaryAccord = useMemo(() => labOptions.find((item) => item.name === labSecondary), [labOptions, labSecondary]);
  const tertiaryAccord = useMemo(() => labOptions.find((item) => item.name === labTertiary), [labOptions, labTertiary]);
  const labInsight = useMemo(() => getBlendLabInsights(primaryAccord, secondaryAccord, tertiaryAccord), [primaryAccord, secondaryAccord, tertiaryAccord]);
  const labFamilyGroups = useMemo(() => {
    const order = [
      { id: "woody", label: "Woody", dot: "#111111" },
      { id: "fresh-citrus", label: "Fresh Citrus", dot: "#4A4A4A" },
      { id: "floral", label: "Floral", dot: "#666666" },
      { id: "warm-spice", label: "Warm Spice", dot: "#555555" },
      { id: "earthy-musk", label: "Earthy Musk", dot: "#777777" },
      { id: "amber-oriental", label: "Amber Oriental", dot: "#222222" },
      { id: "fresh-green", label: "Fresh Green", dot: "#5A5A5A" },
      { id: "gourmand", label: "Gourmand", dot: "#333333" },
    ];
    return order
      .map((family) => ({
        ...family,
        accords: accordLibrary.filter((accord) => accord.family === family.id).slice(0, 4),
      }))
      .filter((family) => family.accords.length);
  }, [accordLibrary]);

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 96, overflowY: "auto", height: "100%" }}>
      <FadeIn>
        <div style={{ marginTop: 8, borderRadius: 28, overflow: "hidden", background: "linear-gradient(145deg, #2A2A2A, #111111)", border: "1px solid rgba(17,17,17,0.24)", boxShadow: "0 18px 42px rgba(17,17,17,0.14)", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.24, backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
          <div style={{ position: "absolute", right: -52, top: -62, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.28)" }} />
          <div style={{ position: "relative", zIndex: 1, padding: "18px 18px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center" }}>
              <div>
                <p style={{ ...T.eyebrow, color: P.goldLight, margin: 0 }}>
                  Personal Chapter
                </p>
                <p style={{ ...T.pageTitle, color: "#FFFFFF", margin: "10px 0 0" }}>
                  Blend
                </p>
                <p style={{ ...T.caption, color: "rgba(255,255,255,0.72)", margin: "8px 0 0" }}>
                  {section === "adjust"
                    ? "Set the live ratio for the cartridges in your device."
                    : section === "memory"
                      ? "Add moments that shape your scent direction."
                      : "Test three accords before sending them to your blend."}
                </p>
              </div>
              <MiniCartridgeIcon size={48} />
            </div>

            <div style={{ marginTop: 16, padding: 4, borderRadius: 18, background: "rgba(255,255,255,0.13)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, border: "1px solid rgba(255,255,255,0.18)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
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
                    padding: "10px 8px",
                    borderRadius: 14,
                    border: "none",
                    background: section === item.id ? P.ivory : "transparent",
                    color: section === item.id ? P.charcoal : "rgba(255,255,255,0.68)",
                    ...T.button,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: section === item.id ? "0 10px 24px rgba(0,0,0,0.18)" : "none",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {section === "lab" && (
        <>
          <FadeIn delay={150}>
            <Glass style={{ marginTop: 18, padding: 14, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <p style={{ ...T.eyebrow, color: P.gold, margin: 0 }}>Build from 3 accords</p>
                  <p style={{ ...T.caption, color: P.warmGray, margin: "6px 0 0" }}>
                    Tap to select. After 3, the next tap replaces the oldest.
                  </p>
                </div>
                <span style={{ ...T.chip, color: P.ivory, background: P.charcoal, borderRadius: 999, padding: "7px 10px", whiteSpace: "nowrap" }}>
                  {labSelectedNames.length}/3
                </span>
              </div>

              {labInsight ? (
                <div style={{ marginTop: 14, padding: 16, borderRadius: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,248,248,0.96))", border: `1px solid ${P.glassBorder}`, boxShadow: "0 14px 32px rgba(17,17,17,0.045)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                    <div>
                      <p style={{ ...T.eyebrow, color: P.warmGray, margin: 0 }}>Result</p>
                      <p style={{ ...T.sectionTitle, color: P.charcoal, margin: "6px 0 0" }}>
                        {labInsight.mood}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <div style={{ padding: "7px 9px", borderRadius: 999, background: `${P.gold}18`, ...T.chip, color: P.charcoal }}>
                        {labInsight.accordFit}% accord
                      </div>
                    </div>
                  </div>

                  <p style={{ ...T.body, color: P.warmGray, margin: "10px 0 0" }}>
                    {labInsight.result}
                  </p>

                  <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ padding: "10px 11px", borderRadius: 16, background: P.ivory, border: `1px solid ${P.glassBorder}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                        <p style={{ fontFamily: mono, fontSize: 8, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.2 }}>Accord fit</p>
                        <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 760, color: P.charcoal }}>{labInsight.accordFit}%</span>
                      </div>
                      <div style={{ marginTop: 8, height: 5, borderRadius: 999, background: P.warmBeige, overflow: "hidden" }}>
                        <div style={{ width: `${labInsight.accordFit}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #111111, #8A8A8A)" }} />
                      </div>
                    </div>

                    <div style={{ padding: "10px 11px", borderRadius: 16, background: P.ivory, border: `1px solid ${P.glassBorder}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                        <p style={{ fontFamily: mono, fontSize: 8, color: P.warmGray, margin: 0, textTransform: "uppercase", letterSpacing: 1.2 }}>Skin fit</p>
                        <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 760, color: hasSkinID ? P.charcoal : P.warmGray }}>{hasSkinID ? `${labInsight.yourFit}%` : "Locked"}</span>
                      </div>
                      <div style={{ marginTop: 8, height: 5, borderRadius: 999, background: P.warmBeige, overflow: "hidden" }}>
                        <div style={{ width: hasSkinID ? `${labInsight.yourFit}%` : "0%", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #777777, #BDBDBD)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 14, padding: 14, borderRadius: 18, background: P.mist, border: `1px solid ${P.glassBorder}` }}>
                  <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: 0, lineHeight: 1.6 }}>Choose 3 accords to unlock the blend study.</p>
                </div>
              )}

              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 760, color: P.charcoal, margin: 0 }}>Accord library</p>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {labFamilyGroups.map((group) => (
                    <div key={group.id} style={{ padding: 12, borderRadius: 20, background: "rgba(255,255,255,0.82)", border: `1px solid ${P.glassBorder}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: group.dot, flexShrink: 0 }} />
                        <p style={{ fontFamily: mono, fontSize: 9, color: P.charcoal, margin: 0, textTransform: "uppercase", letterSpacing: 1.8 }}>
                          {group.label}
                        </p>
                      </div>

                      <div style={{ display: "grid", gap: 7 }}>
                        {group.accords.map((accord) => {
                          const selected = labSelectedNames.includes(accord.name);
                          return (
                            <AccordListRow
                              key={accord.name}
                              accord={accord}
                              selected={selected}
                              onClick={() => handleLabAccordToggle(accord.name)}
                              compact
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Glass>
          </FadeIn>
        </>
      )}

      {section === "adjust" && (
        <>
          <FadeIn delay={150}>
            <Glass style={{ marginTop: 14, padding: connected ? 18 : 0, overflow: "hidden", background: connected ? P.glassBg : "transparent", border: connected ? `1px solid ${P.glassBorder}` : "none", boxShadow: connected ? "0 16px 42px rgba(20,17,14,0.06)" : "none" }}>
              {!connected ? (
                <ReplicaHeroCard
                  label="Device Sync"
                  title={<>Pair your<br />device</>}
                  badge="Required"
                  icon={<ProductDeviceImage width={72} height={76} glowColor="rgba(183,138,50,0.16)" compact />}
                  actions={(
                    <Btn dark full onClick={onRequestPairing}>
                      Pair Device
                    </Btn>
                  )}
                >
                  <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: 0, lineHeight: 1.65 }}>
                    Connect the physical device first so Blend can read battery, detect the loaded cartridges, and unlock live updates.
                  </p>
                </ReplicaHeroCard>
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
            <Glass style={{ marginTop: 18, padding: 16, background: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(247,247,247,0.76))" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: P.gold, margin: 0, textTransform: "uppercase", letterSpacing: 2 }}>
                    {memories.length} saved
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 760, color: P.charcoal, margin: "7px 0 0" }}>
                    Add a memory
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "4px 0 0", lineHeight: 1.45 }}>
                    Photo, camera, or written moment.
                  </p>
                </div>
                <Btn dark onClick={onOpenMemoryComposer} style={{ padding: "10px 15px", whiteSpace: "nowrap" }}>
                  Add
                </Btn>
              </div>
            </Glass>
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
              <Glass style={{ marginTop: 14, padding: 16 }}>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: P.charcoal, margin: 0 }}>
                  No memories yet
                </p>
                <p style={{ fontFamily: sans, fontSize: 12, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.6 }}>
                  Add your first photo, camera capture, or written vibe to start shaping your scent profile.
                </p>
              </Glass>
            </FadeIn>
          )}
        </>
      )}
    </div>
  );
}
