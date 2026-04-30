import React, { useState, useEffect } from "react";
import { P, T, sans, serif, mono } from "../../theme.js";
import { getRatioAssistantRecommendation, RATIO_ASSISTANT_STEPS } from "../../logic/scent.js";
import { Btn } from "../base/baseComponents.jsx";
import { ProductDeviceImage } from "../figures/deviceFigures.jsx";

const POPUP = {
  overlay: "rgba(0,0,0,0.44)",
  body: "#FFFFFF",
  panel: "#FFFFFF",
  line: "rgba(17,17,17,0.12)",
  lineStrong: "rgba(17,17,17,0.26)",
  brown: "#111111",
  brownSoft: "#1C1A17",
  gold: "#B78A32",
  goldLight: "#E5C98E",
  green: "#34C759",
  blue: "#007AFF",
  rose: "#C77B95",
  textMuted: "#6E6E73",
};

const popupHeaderStyle = {
  padding: "14px 18px 18px",
  background: `linear-gradient(145deg, ${POPUP.brownSoft}, ${POPUP.brown})`,
  position: "relative",
  color: P.ivory,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  overflow: "hidden",
  flexShrink: 0,
};

const popupGridStyle = {
  position: "absolute",
  inset: 0,
  opacity: 0.22,
  backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
  backgroundSize: "34px 34px",
};

const popupHandleStyle = {
  width: 42,
  height: 4,
  borderRadius: 4,
  background: "rgba(255,255,255,0.32)",
  margin: "0 auto 18px",
  position: "relative",
};

const popupCloseStyle = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.24)",
  background: "rgba(255,255,255,0.12)",
  color: P.ivory,
  fontSize: 18,
  cursor: "pointer",
  lineHeight: 1,
};

const popupSheetSurfaceStyle = {
  width: "100%",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  background: POPUP.body,
  overflow: "hidden",
  boxShadow: "0 -24px 54px rgba(0,0,0,0.34)",
  display: "flex",
  flexDirection: "column",
  maxHeight: "82%",
};

const popupBodyStyle = {
  padding: "18px 18px 28px",
  overflowY: "auto",
};

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: "absolute", top: 58, left: 20, right: 20, zIndex: 120, padding: "12px 14px", borderRadius: 14, background: "rgba(42,37,32,0.96)", border: `1px solid ${P.gold}20`, color: P.ivory, ...T.body, boxShadow: "0 16px 30px rgba(0,0,0,0.2)" }}>{message}</div>
  );
}

export function Sheet({ title, subtitle, children, onClose }) {
  if (!title) return null;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 115, background: POPUP.overlay, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={popupSheetSurfaceStyle} onClick={e => e.stopPropagation()}>
        <div style={popupHeaderStyle}>
          <div style={popupGridStyle} />
          <div style={popupHandleStyle} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <p style={{ ...T.eyebrow, color: POPUP.goldLight, margin: 0 }}>{subtitle}</p>
              <h3 style={{ ...T.sectionTitle, color: "#FFFFFF", margin: "8px 0 0" }}>{title}</h3>
            </div>
            <button type="button" onClick={onClose} style={popupCloseStyle} aria-label="Close popup">
              ×
            </button>
          </div>
        </div>
        <div style={{ ...popupBodyStyle, paddingBottom: 26 }}>
          {children}
          <Btn dark full onClick={onClose} style={{ marginTop: 16, background: POPUP.brown, borderColor: POPUP.brown, boxShadow: "0 12px 24px rgba(17,17,17,0.18)" }}>Close</Btn>
        </div>
      </div>
    </div>
  );
}

export function MemoryComposerSheet({ open, draft, onChange, onClose, onSave }) {
  if (!open) return null;
  const modes = [
    { id: "photo", label: "Photo" },
    { id: "camera", label: "Camera" },
    { id: "words", label: "Words" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 145, background: POPUP.overlay, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={popupSheetSurfaceStyle} onClick={(e) => e.stopPropagation()}>
        <div style={popupHeaderStyle}>
          <div style={popupGridStyle} />
          <div style={popupHandleStyle} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <h3 style={{ ...T.sectionTitle, color: "#FFFFFF", margin: "4px 0 0" }}>Add a memory</h3>
              <p style={{ ...T.body, color: "rgba(255,255,255,0.82)", margin: "6px 0 0" }}>
                Turn your memory into a scent you can wear.
              </p>
            </div>
            <button type="button" onClick={onClose} style={popupCloseStyle} aria-label="Close memory composer">
              ×
            </button>
          </div>
        </div>
        <div style={{ ...popupBodyStyle, paddingTop: 14 }}>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange("mode", mode.id)}
              style={{
                flex: 1,
                padding: "11px 12px",
                borderRadius: 14,
                border: `1px solid ${draft.mode === mode.id ? POPUP.brown : POPUP.line}`,
                background: draft.mode === mode.id ? POPUP.brown : POPUP.panel,
                color: draft.mode === mode.id ? P.ivory : P.charcoal,
                ...T.button,
                cursor: "pointer",
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: "16px", borderRadius: 20, border: `1px solid ${POPUP.line}`, background: POPUP.panel, boxShadow: "0 12px 24px rgba(17,17,17,0.06)" }}>
          <p style={{ ...T.cardTitle, color: P.charcoal, margin: 0 }}>
            {draft.mode === "camera" ? "Capture a moment" : draft.mode === "photo" ? "Choose a photo" : "Write a memory"}
          </p>
          <p style={{ ...T.body, color: POPUP.textMuted, margin: "6px 0 0" }}>
            {draft.mode === "camera" ? "Use a fresh moment as the start of your scent direction." : draft.mode === "photo" ? "Pick an image that carries a place, mood, or feeling." : "Describe a place, mood, or moment in words."}
          </p>
          <div style={{ marginTop: 14, borderRadius: 16, border: `1px dashed ${POPUP.lineStrong}`, background: "#FFFFFF", minHeight: 96, display: "flex", alignItems: "center", justifyContent: "center", color: POPUP.textMuted, fontFamily: sans, fontSize: 12, textAlign: "center", padding: 14 }}>
            {draft.mode === "camera" ? "Camera preview" : draft.mode === "photo" ? "Selected photo preview" : "Your words will become scent cues"}
          </div>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <input
            value={draft.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Memory title"
            style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1px solid ${POPUP.line}`, background: POPUP.panel, fontFamily: sans, fontSize: 13, color: P.charcoal, outline: "none" }}
          />
          <textarea
            value={draft.note}
            onChange={(e) => onChange("note", e.target.value)}
            placeholder="Add a few words about the place, mood, or feeling"
            rows={4}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1px solid ${POPUP.line}`, background: POPUP.panel, fontFamily: sans, fontSize: 13, color: P.charcoal, outline: "none", resize: "none", lineHeight: 1.5 }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <Btn full onClick={onClose} style={{ background: POPUP.panel, borderColor: POPUP.line }}>Cancel</Btn>
          <Btn dark full onClick={onSave} style={{ background: POPUP.brown, borderColor: POPUP.brown }}>Save Memory</Btn>
        </div>
        </div>
      </div>
    </div>
  );
}

export function PairingSheet({ open, pairingState, onClose, onConnect }) {
  if (!open) return null;
  const canClose = pairingState !== "loading";
  const isLoading = pairingState === "loading";

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 180, background: POPUP.overlay, display: "flex", alignItems: "flex-end" }} onClick={canClose ? onClose : undefined}>
      <div style={popupSheetSurfaceStyle} onClick={(e) => e.stopPropagation()}>
        <div style={popupHeaderStyle}>
          <div style={popupGridStyle} />
          <div style={popupHandleStyle} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", position: "relative" }}>
          <div>
            <p style={{ ...T.eyebrow, color: POPUP.goldLight, margin: 0 }}>Device pairing</p>
            <h3 style={{ ...T.sectionTitle, color: "#FFFFFF", margin: "8px 0 0" }}>
              {pairingState === "connected" ? "Device connected" : "Pair your device"}
            </h3>
          </div>
          <button
            type="button"
            onClick={canClose ? onClose : undefined}
            disabled={!canClose}
            style={{ ...popupCloseStyle, cursor: canClose ? "pointer" : "default", opacity: canClose ? 1 : 0.45 }}
          >
            ×
          </button>
        </div>
        </div>

        <div style={{ ...popupBodyStyle, paddingTop: 22 }}>
        <div style={{ marginTop: 0, display: "flex", justifyContent: "center" }}>
          <ProductDeviceImage width={172} height={136} glowColor="rgba(183,138,50,0.18)" />
        </div>

        <p style={{ ...T.body, color: POPUP.textMuted, margin: "14px 0 0", textAlign: "center" }}>
          {pairingState === "connected"
            ? "Your Personal Chapter device is now paired and ready to sync battery, cartridges, and blend updates."
            : isLoading
              ? "Connecting to your device. Hold the hardware button until the sync is complete."
              : "Bring the device near your phone, then press and hold the hardware button to begin pairing."}
        </p>

        <div style={{ marginTop: 22, padding: "14px 14px", borderRadius: 16, background: "linear-gradient(180deg, #FFFFFF, #F6F6F7)", border: `1px solid ${POPUP.line}`, boxShadow: "0 12px 24px rgba(17,17,17,0.05)" }}>
          <p style={{ ...T.eyebrow, color: POPUP.gold, margin: 0 }}>What unlocks after pairing</p>
          <p style={{ ...T.caption, color: P.charcoal, margin: "6px 0 0" }}>
            Live battery, cartridge detection, and blend updates sync from the physical device into the app.
          </p>
        </div>

        <Btn dark full onClick={pairingState === "connected" ? onClose : onConnect} disabled={isLoading} style={{ marginTop: 16, background: POPUP.brown, borderColor: POPUP.brown, boxShadow: "0 12px 24px rgba(17,17,17,0.18)" }}>
          {pairingState === "connected" ? "Done" : isLoading ? "Connecting..." : "Connect"}
        </Btn>
        </div>
      </div>
    </div>
  );
}

export function RatioAssistantSheet({ open, carts, hasProfileInput, hasSkinID, onClose, onApply }) {
  const [answers, setAnswers] = useState({});
  const [activeStepId, setActiveStepId] = useState(null);
  const [activeOtherStepId, setActiveOtherStepId] = useState(null);
  const [otherDraft, setOtherDraft] = useState("");
  const [inputMode, setInputMode] = useState("survey");
  const [outfitCaptured, setOutfitCaptured] = useState(false);
  const [outfitStyle, setOutfitStyle] = useState("minimal");
  const [outfitTime, setOutfitTime] = useState("day");

  useEffect(() => {
    if (open) {
      setAnswers({});
      setActiveStepId(null);
      setActiveOtherStepId(null);
      setOtherDraft("");
      setInputMode("survey");
      setOutfitCaptured(false);
      setOutfitStyle("minimal");
      setOutfitTime("day");
    }
  }, [open]);

  if (!open) return null;

  const firstUnansweredIndex = RATIO_ASSISTANT_STEPS.findIndex((step) => !answers[step.id]);
  const allAnswered = firstUnansweredIndex === -1;
  const selectedStepIndex = activeStepId ? RATIO_ASSISTANT_STEPS.findIndex((step) => step.id === activeStepId) : -1;
  const resolvedStepIndex = selectedStepIndex >= 0 ? selectedStepIndex : firstUnansweredIndex;
  const currentStepIndex = resolvedStepIndex;
  const currentStep = currentStepIndex === -1 ? null : RATIO_ASSISTANT_STEPS[currentStepIndex];
  const outfitStyles = [
    { id: "minimal", label: "Minimal" },
    { id: "tailored", label: "Tailored" },
    { id: "casual", label: "Casual" },
    { id: "romantic", label: "Romantic" },
    { id: "evening", label: "Evening" },
    { id: "sporty", label: "Sporty" },
  ];

  const getOutfitAnswers = () => {
    const styleMap = {
      minimal: { destination: "office", mood: "clean", projection: "subtle", time: outfitTime },
      tailored: { destination: "office", mood: "clean", projection: "balanced", time: outfitTime },
      casual: { destination: "home", mood: "soft", projection: "subtle", time: "all-day" },
      romantic: { destination: "date", mood: "romantic", projection: "balanced", time: "night" },
      evening: { destination: "dinner", mood: "warm", projection: "noticeable", time: "night" },
      sporty: { destination: "travel", mood: "fresh", projection: "balanced", time: "day" },
    };
    const mapped = styleMap[outfitStyle] || styleMap.minimal;
    return {
      destination: mapped.destination,
      mood: mapped.mood,
      projection: mapped.projection,
      time: mapped.time,
    };
  };

  const surveyRecommendation = allAnswered && !currentStep
    ? getRatioAssistantRecommendation(carts, answers, hasProfileInput, hasSkinID)
    : null;
  const outfitRecommendation = outfitCaptured && outfitStyle
    ? (() => {
      const suggestion = getRatioAssistantRecommendation(carts, getOutfitAnswers(), hasProfileInput, hasSkinID);
      const styleLabel = outfitStyles.find((style) => style.id === outfitStyle)?.label || "Outfit";
      return {
        ...suggestion,
        guidanceLabel: "Outfit-based suggestion",
        answerLine: `Outfit photo · ${styleLabel} · ${outfitTime === "night" ? "Night" : "Day"}`,
      };
    })()
    : null;
  const recommendation = inputMode === "survey" ? surveyRecommendation : outfitRecommendation;
  const hasRecommendation = Boolean(recommendation);

  const handleAnswer = (stepId, optionId) => {
    if (optionId === "other") {
      setActiveOtherStepId(stepId);
      setOtherDraft("");
      return;
    }
    setActiveStepId(null);
    setActiveOtherStepId(null);
    setOtherDraft("");
    setAnswers((current) => ({ ...current, [stepId]: optionId }));
  };

  const handleSaveOtherAnswer = (stepId) => {
    const trimmed = otherDraft.trim();
    if (!trimmed) return;
    setAnswers((current) => ({ ...current, [stepId]: { id: "other", text: trimmed } }));
    setActiveStepId(null);
    setActiveOtherStepId(null);
    setOtherDraft("");
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 175, background: POPUP.overlay, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div
        style={{
          ...popupSheetSurfaceStyle,
          height: "calc(100% - 180px)",
          maxHeight: "none",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={popupHeaderStyle}>
          <div style={popupGridStyle} />
          <div style={popupHandleStyle} />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", position: "relative" }}>
            <div>
              <p style={{ ...T.eyebrow, color: POPUP.goldLight, margin: 0 }}>Ratio assistant</p>
              <h3 style={{ ...T.sectionTitle, color: "#FFFFFF", margin: "8px 0 0" }}>
                Build today's ratio
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={popupCloseStyle}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ ...popupBodyStyle, flex: 1, minHeight: 0, padding: hasRecommendation ? "16px 18px 20px" : "16px 18px 20px", display: "grid", gap: hasRecommendation ? 12 : 10, alignContent: "start", overflowY: "hidden" }}>
          {!hasRecommendation && (
          <div style={{ padding: "13px 15px", borderRadius: 18, background: POPUP.panel, border: `1px solid ${POPUP.line}`, boxShadow: "0 10px 18px rgba(17,17,17,0.04)" }}>
            <p style={{ ...T.caption, fontSize: 13, color: P.charcoal, margin: 0, lineHeight: 1.36 }}>
              {inputMode === "survey"
                ? "Tell me what your day looks like, and I'll suggest a blend split that fits your mood and plans."
                : "Take a quick photo of what you're wearing, and I'll suggest a blend direction that matches your look."}
            </p>
            <p style={{ ...T.caption, fontSize: 11, color: POPUP.textMuted, margin: "6px 0 0", lineHeight: 1.28 }}>
              {hasSkinID
                ? "Skin-aware guidance is on."
                : hasProfileInput
                  ? "Your saved memory profile will guide this suggestion."
                  : "I'll base this on your occasion and style direction."}
            </p>
          </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 6, background: "rgba(17,17,17,0.04)", padding: 4, borderRadius: 15, border: `1px solid ${POPUP.line}` }}>
            {[
              { id: "survey", label: "Survey" },
              { id: "outfit", label: "Outfit Photo" },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setInputMode(mode.id)}
                style={{
                  height: 38,
                  borderRadius: 11,
                  border: "none",
                  background: inputMode === mode.id ? POPUP.brown : "transparent",
                  color: inputMode === mode.id ? "#FFFFFF" : POPUP.textMuted,
                  fontFamily: sans,
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {inputMode === "survey" && !hasRecommendation && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {RATIO_ASSISTANT_STEPS.map((step, index) => {
                const done = Boolean(answers[step.id]);
                const active = currentStep?.id === step.id;
                const canJump = done || active || index === firstUnansweredIndex || allAnswered;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (!canJump) return;
                      setActiveStepId(step.id);
                      setActiveOtherStepId(null);
                      setOtherDraft("");
                    }}
                    disabled={!canJump}
                    style={{
                      minHeight: 58,
                      borderRadius: 14,
                      border: `1px solid ${active ? POPUP.lineStrong : POPUP.line}`,
                      background: done ? "rgba(17,17,17,0.08)" : active ? "rgba(17,17,17,0.05)" : POPUP.panel,
                      padding: "7px 6px",
                      textAlign: "center",
                      cursor: canJump ? "pointer" : "default",
                      opacity: canJump ? 1 : 0.65,
                      borderWidth: 1,
                    }}
                  >
                    <div style={{ width: 23, height: 23, margin: "0 auto 6px", borderRadius: 9, background: done ? P.charcoal : "#FFFFFF", border: `1px solid ${done ? P.charcoal : POPUP.line}`, color: done ? P.ivory : P.charcoal, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans, fontSize: 10, fontWeight: 800 }}>
                      {done ? "✓" : index + 1}
                    </div>
                    <p style={{ fontFamily: mono, fontSize: 7.3, fontWeight: 800, color: active ? POPUP.gold : POPUP.textMuted, margin: 0, letterSpacing: 1.05, textTransform: "uppercase" }}>
                      {step.id}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {inputMode === "outfit" && (
            <div style={{ borderRadius: outfitCaptured ? 0 : 20, border: outfitCaptured ? "none" : `1px solid ${POPUP.line}`, background: outfitCaptured ? "transparent" : POPUP.panel, padding: outfitCaptured ? 0 : 14, boxShadow: outfitCaptured ? "none" : "0 12px 28px rgba(17,17,17,0.06)", display: "grid", gap: 10 }}>
              {!outfitCaptured && (
                <div style={{ height: 112, borderRadius: 16, border: `1px dashed ${POPUP.lineStrong}`, background: "#FFFFFF", display: "grid", placeItems: "center", textAlign: "center", padding: 12 }}>
                  <p style={{ ...T.body, color: POPUP.textMuted, margin: 0 }}>
                    Add your outfit
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={() => setOutfitCaptured(true)}
                style={{
                  height: outfitCaptured ? 38 : 42,
                  borderRadius: 13,
                  border: `1px solid ${POPUP.line}`,
                  background: "#FFFFFF",
                  color: P.charcoal,
                  ...T.button,
                  cursor: "pointer",
                }}
              >
                {outfitCaptured ? "Retake Outfit Photo" : "Take Outfit Photo"}
              </button>

            </div>
          )}

          {inputMode === "survey" && currentStep && (
            <div style={{ minHeight: 0, borderRadius: 20, border: `1px solid ${POPUP.line}`, background: POPUP.panel, padding: 16, boxShadow: "0 12px 28px rgba(17,17,17,0.06)" }}>
              <p style={{ ...T.eyebrow, color: POPUP.gold, margin: 0 }}>
                Question {currentStepIndex + 1}
              </p>
              <p style={{ ...T.sectionTitle, fontSize: 21, color: P.charcoal, margin: "7px 0 0" }}>
                {currentStep.prompt}
              </p>
              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gridAutoRows: "46px", gap: 10 }}>
                {currentStep.options.map((option) => {
                  if (!option) {
                    return null;
                  }
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleAnswer(currentStep.id, option.id)}
                      style={{
                        height: "100%",
                        padding: "9px 13px",
                        borderRadius: 15,
                        border: `1px solid ${POPUP.line}`,
                        background: "linear-gradient(145deg, #FFFFFF, #F4F4F4)",
                        color: P.charcoal,
                        cursor: "pointer",
                        fontFamily: sans,
                        fontSize: 12.5,
                        fontWeight: 700,
                        textAlign: "left",
                        boxShadow: "0 10px 18px rgba(17,17,17,0.04)",
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {activeOtherStepId === currentStep.id && (
                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  <input
                    value={otherDraft}
                    onChange={(event) => setOtherDraft(event.target.value)}
                    placeholder={`Tell me more about ${currentStep.prompt.toLowerCase()}`}
                    aria-label={`${currentStep.prompt} other answer`}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: 46,
                      borderRadius: 16,
                      border: `1px solid ${POPUP.line}`,
                      background: POPUP.panel,
                      color: P.charcoal,
                      padding: "0 14px",
                      fontFamily: sans,
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                  <div style={{ display: "flex", gap: 10 }}>
                    <Btn
                      full
                      onClick={() => {
                        setActiveOtherStepId(null);
                        setOtherDraft("");
                      }}
                      style={{ background: POPUP.panel, borderColor: POPUP.line }}
                    >
                      Cancel
                    </Btn>
                    <Btn dark full onClick={() => handleSaveOtherAnswer(currentStep.id)} disabled={!otherDraft.trim()} style={{ background: POPUP.brown, borderColor: POPUP.brown }}>
                      Save
                    </Btn>
                  </div>
                </div>
              )}
            </div>
          )}

          {recommendation && (
            <div style={{ padding: "16px 16px 17px", borderRadius: 20, border: `1px solid ${POPUP.lineStrong}`, background: "linear-gradient(180deg, #FFFFFF, #F4F4F4)", boxShadow: "0 12px 24px rgba(17,17,17,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <p style={{ ...T.eyebrow, fontSize: 9.5, color: P.gold, margin: 0 }}>
                    {recommendation.guidanceLabel}
                  </p>
                  <p style={{ ...T.sectionTitle, fontSize: 17, color: P.charcoal, margin: "6px 0 0" }}>
                    {recommendation.headline}
                  </p>
                </div>
                <div style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(52,199,89,0.16)", border: "1px solid rgba(52,199,89,0.3)", color: "#1F8C3A", fontFamily: sans, fontSize: 10, fontWeight: 760, whiteSpace: "nowrap" }}>
                  Suggested
                </div>
              </div>

              <p style={{ fontFamily: sans, fontSize: 11.2, color: POPUP.textMuted, margin: "7px 0 0", lineHeight: 1.35 }}>
                {recommendation.answerLine}
              </p>
              <p style={{ fontFamily: sans, fontSize: 11.8, color: P.charcoal, margin: "11px 0 0", lineHeight: 1.46 }}>
                {recommendation.summary}
              </p>

              <div style={{ marginTop: 13, height: 5, borderRadius: 999, overflow: "hidden", display: "flex", background: P.warmBeige }}>
                {recommendation.rows.map((row) => (
                  <div key={`${row.name}-bar`} style={{ flex: row.ratio, background: row.color }} />
                ))}
              </div>

              <div style={{ marginTop: 13, display: "grid", gap: 9 }}>
                {recommendation.rows.map((row) => (
                  <div key={row.name} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "start" }}>
                    <div>
                      <p style={{ fontFamily: sans, fontSize: 11.5, fontWeight: 700, color: P.charcoal, margin: 0 }}>{row.name}</p>
                      <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "2px 0 0", lineHeight: 1.25 }}>{row.reason}</p>
                    </div>
                    <p style={{ fontFamily: sans, fontSize: 13.5, fontWeight: 760, color: P.charcoal, margin: 0 }}>{row.ratio}%</p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <Btn
                  full
                  onClick={() => {
                    if (inputMode === "survey") {
                      setAnswers({});
                      setActiveStepId(null);
                      setActiveOtherStepId(null);
                      setOtherDraft("");
                    } else {
                      setOutfitCaptured(false);
                      setOutfitStyle("minimal");
                      setOutfitTime("day");
                    }
                  }}
                  style={{ height: 42, borderRadius: 13, background: POPUP.panel, borderColor: POPUP.line }}
                >
                  Ask Again
                </Btn>
                <Btn dark full onClick={() => onApply(recommendation.ratios)} style={{ height: 42, borderRadius: 13, background: POPUP.brown, borderColor: POPUP.brown }}>
                  Apply Ratio
                </Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
