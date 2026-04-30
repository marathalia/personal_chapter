import React, { useState, useEffect, useMemo } from "react";
import { P, T, sans, serif, mono } from "../../theme.js";
import { ACCORD_LIBRARY, FAMILY_STYLES, STORE_LOCATIONS, SHOP_ITEMS } from "../../data/catalog.js";
import { getAccordPhotoBackground, getBlendLabInsights, getLiveOlfactiveMap, getMemoryArchiveBackground, getMemoryRecommendedAccords, getReplicaMemoryWearAnalysis } from "../../logic/scent.js";
import { BatteryBadge, Btn, FadeIn, Glass, GuidedStepsCard, IntroPanel, Label, LayeringDeviceFigure, MiniAdjustDeviceFigure, MiniCartridgeIcon, PlaceholderDeviceFigure, ProfileStarterCard, ReplicaHeroCard, RunwayCampaignFigure, SegmentedControl, StatusBar, Title } from "../../components/appComponents.jsx";
import { AccordListRow, AccordColorThumb, getAccordFeelsLikeLine, getAccordIngredientsLine } from "../shared/accordRows.jsx";

export function ExploreScreen({
  hasSkinID,
  hasProfileInput,
  accords,
  onPreviewAccord,
  onModalChange,
  initialMode = "lab",
  initialLabNames = ["Warm Amber", "Clean Skin Musk", "Fig & Leaf"],
}) {
  const [mode, setMode] = useState(initialMode === "lab" ? "lab" : "explore");
  const [cat, setCat] = useState("for-you");
  const [pickerCat, setPickerCat] = useState("for-you");
  const [pickerSlot, setPickerSlot] = useState(null);
  const [labPrimary, setLabPrimary] = useState(initialLabNames[0] || "Warm Amber");
  const [labSecondary, setLabSecondary] = useState(initialLabNames[1] || "Clean Skin Musk");
  const [labTertiary, setLabTertiary] = useState(initialLabNames[2] || "Fig & Leaf");
  const categories = [
    { id: "for-you", label: "All" },
    { id: "fresh-citrus", label: "Citrus" },
    { id: "floral", label: "Floral" },
    { id: "woody", label: "Woody" },
    { id: "fresh-green", label: "Fresh" },
    { id: "earthy-musk", label: "Musk" },
    { id: "warm-spice", label: "Warm" },
    { id: "amber-oriental", label: "Amber" },
    { id: "gourmand", label: "Gourmand" },
  ];
  const categoryTones = {
    "for-you": { border: "#D5D5D8", text: "#6E6E73", activeBg: "#1D1D1F", activeText: "#FFFFFF" },
    "warm-spice": { border: "#C3893C", text: "#8E5A1B", activeBg: "#F4F4F6", activeText: "#8E5A1B" },
    "amber-oriental": { border: "#B78A32", text: "#7F5F20", activeBg: "#F4F4F6", activeText: "#7F5F20" },
    "fresh-citrus": { border: "#A4AF59", text: "#5E6D2A", activeBg: "#EEF3D8", activeText: "#5E6D2A" },
    "fresh-green": { border: "#7E9874", text: "#47613F", activeBg: "#E7F0E4", activeText: "#47613F" },
    woody: { border: "#8C6A53", text: "#5E4636", activeBg: "#EEE5DF", activeText: "#5E4636" },
    floral: { border: "#B68095", text: "#7E4F62", activeBg: "#F3E4EA", activeText: "#7E4F62" },
    "earthy-musk": { border: "#8C8374", text: "#5D564C", activeBg: "#ECE7DD", activeText: "#5D564C" },
    gourmand: { border: "#A56A45", text: "#6F442A", activeBg: "#F4F4F6", activeText: "#6F442A" },
  };

  const labSelectedNames = [labPrimary, labSecondary, labTertiary].filter(Boolean);
  const labSlotNames = [labPrimary, labSecondary, labTertiary];
  const setLabSelectedNames = (next) => {
    setLabPrimary(next[0] || "");
    setLabSecondary(next[1] || "");
    setLabTertiary(next[2] || "");
  };

  const setLabSlotNames = (next) => {
    setLabPrimary(next[0] || "");
    setLabSecondary(next[1] || "");
    setLabTertiary(next[2] || "");
  };

  useEffect(() => {
    setMode(initialMode === "lab" ? "lab" : "explore");
  }, [initialMode]);

  useEffect(() => {
    const nextNames = initialLabNames.filter(Boolean).slice(0, 3);
    if (!nextNames.length) return;
    setLabSelectedNames(nextNames);
  }, [initialLabNames.join("|")]);

  useEffect(() => {
    onModalChange?.(pickerSlot !== null);
    return () => onModalChange?.(false);
  }, [pickerSlot, onModalChange]);

  const openAccordPicker = (slot = null) => {
    const firstEmpty = labSlotNames.findIndex((name) => !name);
    setPickerSlot(slot ?? (firstEmpty >= 0 ? firstEmpty : 0));
  };

  const closeAccordPicker = () => {
    setPickerSlot(null);
  };

  const chooseAccordForLab = (name) => {
    if (pickerSlot === null || !name) return;
    const next = [...labSlotNames];
    const existingIndex = next.indexOf(name);
    if (existingIndex >= 0) next[existingIndex] = "";
    next[pickerSlot] = name;
    setLabSlotNames(next);
    closeAccordPicker();
  };

  const removeLabSlot = (slot) => {
    const next = [...labSlotNames];
    next[slot] = "";
    setLabSlotNames(next);
  };

  const selectedAccords = labSelectedNames
    .map((name) => accords.find((item) => item.name === name))
    .filter(Boolean);
  const labSlotAccords = labSlotNames.map((name) => accords.find((item) => item.name === name) || null);
  const [primaryAccord, secondaryAccord, tertiaryAccord] = selectedAccords;
  const labInsight = useMemo(() => getBlendLabInsights(primaryAccord, secondaryAccord, tertiaryAccord), [primaryAccord, secondaryAccord, tertiaryAccord]);
  const filteredAccords = useMemo(() => {
    const familyFiltered = cat === "for-you" ? accords.slice() : accords.filter((accord) => accord.family === cat);
    return familyFiltered.sort((a, b) => b.match - a.match);
  }, [accords, cat]);
  const pickerAccords = useMemo(() => {
    const list = pickerCat === "for-you" ? accords.slice().sort((a, b) => b.match - a.match) : accords.filter((accord) => accord.family === pickerCat);
    return list.slice(0, 18);
  }, [accords, pickerCat]);
  const Card = ({ children, style = {} }) => (
    <section style={{ borderRadius: 22, background: "rgba(255,255,255,0.88)", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 8px 24px rgba(0,0,0,0.045)", overflow: "hidden", ...style }}>
      {children}
    </section>
  );

  const AccordThumb = ({ accord, size = 64 }) => {
    const familyStyle = FAMILY_STYLES[accord?.family] || FAMILY_STYLES["for-you"];
    return (
      <div style={{ width: size, height: size, borderRadius: size * 0.34, overflow: "hidden", backgroundColor: familyStyle.bg, backgroundImage: accord ? getAccordPhotoBackground(accord) : "none", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }} />
    );
  };

  const FitCard = ({ label, value, note, color, locked }) => (
    <div style={{ minHeight: 96, borderRadius: 16, background: locked ? "#F7F7F7" : "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", padding: 12 }}>
      <p style={{ ...T.eyebrow, fontSize: 9.5, color: "#6E6E73", margin: 0 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 8 }}>
        <p style={{ ...T.metric, fontSize: 22, color: locked ? "#8E8E93" : "#1D1D1F", margin: 0 }}>{value}</p>
        {!locked && <span style={{ ...T.chip, color }}>{note}</span>}
      </div>
      <div style={{ height: 5, borderRadius: 999, background: "#E5E5E5", overflow: "hidden", marginTop: 10 }}>
        <div style={{ width: locked ? "0%" : value, height: "100%", background: color, borderRadius: 999 }} />
      </div>
      <p style={{ ...T.caption, fontSize: 10.5, color: "#6E6E73", margin: "9px 0 0", lineHeight: 1.32 }}>{locked ? "Connect device for skin match." : "Aligned with your direction."}</p>
    </div>
  );

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 96, overflowY: "auto", height: "100%", background: "#F7F7F7", color: "#1D1D1F", position: "relative" }}>
      <FadeIn>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginTop: 0 }}>
          <div>
            <h1 style={{ ...T.pageTitle, color: "#1D1D1F", margin: 0 }}>Explore & Create</h1>
          </div>
        </header>
      </FadeIn>

      <FadeIn delay={35}>
        <div style={{ marginTop: 12, padding: 4, borderRadius: 16, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.045)" }}>
          {[
            { id: "lab", label: "Lab" },
            { id: "explore", label: "Library" },
          ].map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                style={{ height: 38, borderRadius: 12, border: "none", background: active ? "#1D1D1F" : "transparent", color: active ? "#FFFFFF" : "#6E6E73", ...T.button, cursor: "pointer", transition: "all 0.2s ease" }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {mode === "lab" && (
      <>
      <FadeIn delay={50}>
        <Card style={{ marginTop: 8, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <p style={{ ...T.eyebrow, color: "#1D1D1F", margin: 0 }}>Your Blend</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ ...T.caption, fontWeight: 600, color: "#3A3A3C" }}>{labSelectedNames.length} / 3 selected</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((index) => <span key={index} style={{ width: 24, height: 5, borderRadius: 999, background: index < labSelectedNames.length ? "#111111" : "#DADADA" }} />)}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 9, marginTop: 16 }}>
            {[0, 1, 2].map((slot) => {
              const accord = labSlotAccords[slot];
              return accord ? (
                <div key={slot} style={{ minHeight: 154, borderRadius: 20, border: "1px solid rgba(0,0,0,0.08)", background: "#FFFFFF", padding: 10, position: "relative", textAlign: "center", overflow: "hidden" }}>
                  <button type="button" aria-label={"Remove " + accord.name} onClick={() => removeLabSlot(slot)} style={{ position: "absolute", right: 8, top: 8, width: 26, height: 26, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.08)", background: "#FFFFFF", color: "#1D1D1F", fontSize: 18, lineHeight: 1, cursor: "pointer", zIndex: 2 }}>×</button>
                  <button type="button" onClick={() => openAccordPicker(slot)} style={{ width: "100%", padding: 0, border: "none", background: "transparent", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}><AccordThumb accord={accord} size={62} /></div>
                    <p
                      style={{
                        ...T.cardTitle,
                        color: "#1D1D1F",
                        margin: "10px 4px 0",
                        fontSize: 12.5,
                        lineHeight: 1.16,
                        fontWeight: 660,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "clip",
                        wordBreak: "break-word",
                        minHeight: 40,
                      }}
                    >
                      {accord.name}
                    </p>
                  </button>
                </div>
              ) : (
                <button key={slot} type="button" onClick={() => openAccordPicker(slot)} style={{ minHeight: 154, borderRadius: 20, border: "1px dashed rgba(0,0,0,0.18)", background: "rgba(255,255,255,0.42)", color: "#1D1D1F", textAlign: "center", cursor: "pointer", padding: 12 }}>
                  <span style={{ width: 54, height: 54, borderRadius: "50%", background: "#EFEFEF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 280 }}>+</span>
                  <span style={{ display: "block", ...T.button, marginTop: 13 }}>Add accord</span>
                  <span style={{ display: "block", ...T.caption, color: "#8E8E93", marginTop: 5 }}>Choose from library</span>
                </button>
              );
            })}
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={90}>
        <Card style={{ marginTop: 14, padding: "14px 14px 14px 18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 132px", gap: 12, alignItems: "start" }}>
            <div>
              {labInsight ? (
                <>
                  <p style={{ ...T.eyebrow, fontSize: 9, color: "#6E6E73", margin: 0 }}>Blend name</p>
                  <p style={{ fontFamily: sans, fontSize: 24, fontWeight: 780, color: "#1D1D1F", margin: "6px 0 0", lineHeight: 1.06 }}>
                    {labInsight.blendName}
                  </p>
                  <p style={{ ...T.body, color: "#5F5F64", margin: "10px 0 0", lineHeight: 1.34 }}>
                    {labInsight.result}
                  </p>
                </>
              ) : (
                <>
                  <p style={{ ...T.sectionTitle, color: "#1D1D1F", margin: 0, lineHeight: 1.14 }}>Build a blend</p>
                  <p style={{ ...T.body, color: "#5F5F64", margin: "8px 0 0", lineHeight: 1.42 }}>Select three accords to preview the scent story, structure, and fit.</p>
                </>
              )}
            </div>
            <div style={{ height: 132, borderRadius: 24, background: "linear-gradient(135deg, #FFFFFF, #F4F4F4)", position: "relative", overflow: "hidden" }}>
              {selectedAccords.slice(0, 3).map((accord, index) => (
                <div key={accord.name} style={{ position: "absolute", right: 12 + index * 24, top: 18 + index * 22, opacity: 0.92 }}>
                  <AccordThumb accord={accord} size={50} />
                </div>
              ))}
            </div>
          </div>

          {labInsight && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 9, marginTop: 12 }}>
              <div style={{ padding: "10px 11px", borderRadius: 14, background: "#F6F6F6", border: "1px solid rgba(17,17,17,0.07)" }}>
                <p style={{ ...T.eyebrow, fontSize: 8.8, color: "#6E6E73", margin: 0 }}>Smells like</p>
                <p style={{ ...T.caption, color: "#1D1D1F", margin: "5px 0 0", lineHeight: 1.3 }}>{labInsight.smellLine.replace(/^Smells like\s+/i, "")}</p>
              </div>
              <div style={{ padding: "10px 11px", borderRadius: 14, background: "#FFFFFF", border: "1px solid rgba(17,17,17,0.07)" }}>
                <p style={{ ...T.eyebrow, fontSize: 8.8, color: "#6E6E73", margin: 0 }}>Memory it can recreate</p>
                <p style={{ ...T.caption, color: "#1D1D1F", margin: "5px 0 0", lineHeight: 1.3 }}>{labInsight.memoryLine}</p>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginTop: 12 }}>
            <FitCard label="Accord Fit" value={labInsight ? labInsight.accordFit + "%" : "--"} note={labInsight && labInsight.accordFit >= 80 ? "Great match" : "Potential"} color="#3F7F3C" locked={!labInsight} />
            <FitCard label="Skin Fit" value={hasSkinID && labInsight ? labInsight.yourFit + "%" : "--"} note={hasSkinID && labInsight && labInsight.yourFit >= 80 ? "Great match" : "Potential"} color="#B47A2F" locked={!hasSkinID || !labInsight} />
          </div>
        </Card>
      </FadeIn>
      </>
      )}

      {mode === "explore" && (
      <FadeIn delay={50}>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "4px -2px 0", padding: "0 2px 2px" }}>
            {categories.map((item) => {
              const active = cat === item.id;
              const tone = categoryTones[item.id] || categoryTones["for-you"];
              return (
                <button key={item.id} type="button" onClick={() => setCat(item.id)} style={{ flex: "0 0 auto", height: 36, padding: "0 16px", borderRadius: 999, border: `1px solid ${active ? tone.border : "#D5D5D8"}`, background: active ? tone.activeBg : "#FFFFFF", color: active ? tone.activeText : "#6E6E73", fontFamily: sans, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{item.label}</button>
              );
            })}
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            {filteredAccords.map((accord) => {
              return (
                <AccordListRow key={accord.name} accord={accord} onClick={() => onPreviewAccord(accord)} showAction={false} />
              );
            })}
          </div>
          {filteredAccords.length === 0 && (
            <div style={{ marginTop: 12, borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.75)", padding: "12px 14px", ...T.caption, color: "#6E6E73" }}>
              No accords match this filter yet. Try switching field, layer, or clearing the query.
            </div>
          )}
        </div>
      </FadeIn>
      )}

      {pickerSlot !== null && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(0,0,0,0.48)", display: "flex", alignItems: "flex-end", justifyContent: "stretch", padding: 0 }}
          onClick={closeAccordPicker}
        >
          <div
            style={{ width: "100%", maxWidth: "none", height: "66vh", borderRadius: "30px 30px 0 0", background: "#121212", borderTop: "1px solid rgba(255,255,255,0.22)", boxShadow: "0 -24px 54px rgba(0,0,0,0.34)", overflow: "hidden", display: "flex", flexDirection: "column" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ padding: "12px 16px 14px", background: "linear-gradient(145deg, #1C1A17, #111111)", borderBottom: "1px solid rgba(255,255,255,0.12)", position: "relative", overflow: "hidden", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.22, backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
              <div style={{ width: 42, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.36)", margin: "0 auto 14px", position: "relative" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, position: "relative" }}>
                <div>
                  <p style={{ ...T.eyebrow, color: "#E5C98E", margin: 0 }}>Choose accord</p>
                  <p style={{ ...T.sectionTitle, color: "#FFFFFF", margin: "5px 0 0" }}>Slot {pickerSlot + 1}</p>
                </div>
                <button type="button" onClick={closeAccordPicker} aria-label="Close accord chooser" style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.12)", color: "#FFFFFF", fontSize: 20, lineHeight: 1, cursor: "pointer" }}>
                  ×
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "14px -2px 0", padding: "0 2px 2px", position: "relative" }}>
                {categories.map((item) => {
                  const active = pickerCat === item.id;
                  const tone = categoryTones[item.id] || categoryTones["for-you"];
                  return (
                    <button key={item.id} type="button" onClick={() => setPickerCat(item.id)} style={{ flex: "0 0 auto", height: 36, padding: "0 16px", borderRadius: 999, border: `1px solid ${active ? tone.border : "rgba(255,255,255,0.26)"}`, background: active ? "#FFFFFF" : "rgba(255,255,255,0.08)", color: active ? tone.text : "#F2F2F2", fontFamily: sans, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", background: "#FFFFFF", padding: "14px 14px 32px", display: "grid", gap: 10, alignContent: "start", gridAutoRows: "max-content" }}>
              {pickerAccords.map((accord) => {
                const selected = labSelectedNames.includes(accord.name);
                return (
                  <AccordListRow
                    key={accord.name}
                    accord={accord}
                    selected={selected}
                    onClick={() => chooseAccordForLab(accord.name)}
                    compact
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
