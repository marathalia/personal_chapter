import React, { useState } from "react";
import { P, T, sans, serif, mono } from "../../theme.js";
import { getAccordPhotoBackground, getBlendLabInsights, getLiveOlfactiveMap, getMemoryArchiveBackground, getMemoryRecommendedAccords, getReplicaMemoryWearAnalysis } from "../../logic/scent.js";
import { BatteryBadge, Btn, FadeIn, Glass, GuidedStepsCard, IntroPanel, Label, LayeringDeviceFigure, MiniAdjustDeviceFigure, MiniCartridgeIcon, PlaceholderDeviceFigure, ProfileStarterCard, ReplicaHeroCard, RunwayCampaignFigure, SegmentedControl, StatusBar, Title } from "../../components/appComponents.jsx";
import { ACCORD_THUMB, AccordListRow, AccordColorThumb, getAccordFeelsLikeLine, getAccordIngredientsLine } from "../shared/accordRows.jsx";

export function MemoryScreen({ memories, memoryPrompts, accordLibrary, onOpenMemoryComposer, onOpenMemoryDetail }) {
  const savedMemories = memories;
  const visibleMemories = savedMemories;
  const memoryInputOptions = [
    { label: "Photo", copy: "Upload a place or atmosphere", kind: "photo" },
    { label: "Camera", copy: "Capture the moment now", kind: "camera" },
    { label: "Words", copy: "Describe a memory or vibe", kind: "words" },
  ];
  const renderMemoryInputIcon = (kind) => {
    const iconProps = {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.7,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
    };
    if (kind === "camera") {
      return (
        <svg {...iconProps}>
          <path d="M7.5 8.2 9 6.3h6l1.5 1.9H19a2 2 0 0 1 2 2v7.1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.1a2 2 0 0 1 2-2h2.5Z" />
          <circle cx="12" cy="13.5" r="3.4" />
        </svg>
      );
    }
    if (kind === "words") {
      return (
        <svg {...iconProps}>
          <path d="M5 19h14" />
          <path d="M7 15.5 16.7 5.8a1.8 1.8 0 0 1 2.5 2.5L9.5 18 6 18.5l1-3Z" />
          <path d="m15.4 7.1 1.5 1.5" />
        </svg>
      );
    }
    return (
      <svg {...iconProps}>
        <rect x="4" y="5" width="16" height="14" rx="2.4" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m6.5 17 4.2-4.3 2.9 2.7 2-2.1 2.9 3.7" />
      </svg>
    );
  };

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 96, overflowY: "auto", height: "100%" }}>
      <FadeIn>
        <h1 style={{ ...T.pageTitle, color: "#1D1D1F", margin: 0 }}>Memory</h1>
      </FadeIn>
      <FadeIn delay={80}>
        <div style={{ marginTop: 14 }}>
          <IntroPanel
            title="Tell us about a memory you want to wear"
            body={savedMemories.length ? "Add another memory to refine your profile." : "Start with a photo, camera, or words."}
            aside={(
              <button
                type="button"
                onClick={() => onOpenMemoryComposer("photo")}
                style={{ width: 42, height: 42, borderRadius: "50%", border: `1px solid ${P.charcoal}`, background: P.charcoal, color: P.ivory, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </button>
            )}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
              {memoryInputOptions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onOpenMemoryComposer(item.kind)}
                  style={{
                    minHeight: 94,
                    borderRadius: 18,
                    border: `1px solid ${P.glassBorder}`,
                    background: "rgba(255,255,255,0.68)",
                    padding: "12px 8px",
                    textAlign: "center",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ width: 38, height: 38, borderRadius: 14, background: "linear-gradient(145deg, rgba(17,17,17,0.1), rgba(255,255,255,0.96))", border: `1px solid ${P.gold}22`, color: P.charcoal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {renderMemoryInputIcon(item.kind)}
                  </span>
                  <span style={{ display: "block", fontFamily: sans, fontSize: 12.5, fontWeight: 820, color: P.charcoal, lineHeight: 1.1 }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </IntroPanel>

          <div style={{ marginTop: 18, marginBottom: visibleMemories.length > 0 ? 12 : 0 }}>
            <p style={{ ...T.sectionTitle, color: "#1D1D1F", margin: 0 }}>Your Memories</p>
          </div>
          {visibleMemories.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
              {visibleMemories.map((m, i) => {
                const caption = (m.emotion || "").trim() || "No emotional cue yet";
                return (
                  <FadeIn key={m.id} delay={220 + i * 35}>
                    <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(20,17,14,0.12)", background: "#FFFFFF", boxShadow: "0 14px 28px rgba(20,17,14,0.08)", padding: 10, height: 212 }}>
                      <button
                        type="button"
                        onClick={() => onOpenMemoryDetail(m)}
                        style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 0, border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}
                      >
                        <div style={{ height: 114, borderRadius: 12, background: getMemoryArchiveBackground(m), filter: "grayscale(1)", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))" }} />
                          <div style={{ position: "absolute", inset: 0, opacity: 0.14, backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
                        </div>
                        <div style={{ padding: "10px 7px 0", background: "#FFFFFF", flex: 1, minHeight: 0, overflow: "hidden" }}>
                          <p style={{ fontFamily: sans, fontSize: 10.2, fontWeight: 820, letterSpacing: 1.35, textTransform: "uppercase", color: P.charcoal, margin: 0, lineHeight: 1.12, maxHeight: 42, overflow: "hidden", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                            {m.title}
                          </p>
                          <p style={{ fontFamily: sans, fontSize: 10.8, color: P.warmGray, margin: "5px 0 0", lineHeight: 1.22, maxHeight: 47, overflow: "hidden", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                            {caption}
                          </p>
                        </div>
                      </button>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
          {visibleMemories.length === 0 && (
            <div style={{ marginTop: 14 }}>
              <Glass style={{ padding: "20px 16px 16px", background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,248,248,0.92))" }}>
                <div style={{ width: 150, height: 98, margin: "0 auto 10px", position: "relative", transform: "scale(1.2)", transformOrigin: "center top" }}>
                  <div style={{ position: "absolute", left: "50%", top: 4, width: 118, height: 90, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(circle at 50% 42%, rgba(183,138,50,0.10), rgba(183,138,50,0.04) 52%, rgba(183,138,50,0) 72%)" }} />
                  <div style={{ position: "absolute", left: 38, top: 20, width: 64, height: 50, borderRadius: 10, background: "linear-gradient(145deg, #FFFFFF, #F2F2F2)", border: "1px solid rgba(20,17,14,0.1)", transform: "rotate(-8deg)", boxShadow: "0 8px 20px rgba(20,17,14,0.08)" }}>
                    <div style={{ position: "absolute", left: 10, right: 10, bottom: 8, height: 17, borderRadius: 5, background: "linear-gradient(180deg, rgba(183,138,50,0.2), rgba(183,138,50,0.1))" }} />
                  </div>
                  <div style={{ position: "absolute", left: 86, top: 40, width: 36, height: 30, borderRadius: 8, background: "linear-gradient(145deg, #FFFFFF, #F4F4F4)", border: "1px solid rgba(20,17,14,0.08)", transform: "rotate(9deg)", boxShadow: "0 8px 18px rgba(20,17,14,0.07)" }}>
                    <div style={{ position: "absolute", left: 7, right: 7, top: 8, height: 2, borderRadius: 2, background: "rgba(20,17,14,0.14)" }} />
                    <div style={{ position: "absolute", left: 7, right: 10, top: 14, height: 2, borderRadius: 2, background: "rgba(20,17,14,0.1)" }} />
                  </div>
                  <div style={{ position: "absolute", left: 27, top: 28, width: 3, height: 3, borderRadius: "50%", background: "rgba(183,138,50,0.25)" }} />
                  <div style={{ position: "absolute", right: 24, top: 18, width: 3, height: 3, borderRadius: "50%", background: "rgba(183,138,50,0.25)" }} />
                  <div style={{ position: "absolute", right: 18, top: 50, width: 2, height: 2, borderRadius: "50%", background: "rgba(183,138,50,0.20)" }} />
                </div>

                <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 700, color: P.charcoal, margin: 0, textAlign: "center", letterSpacing: 0 }}>
                  No memories yet
                </p>
                <p style={{ fontFamily: sans, fontSize: 11.8, color: P.warmGray, margin: "8px auto 0", lineHeight: 1.5, textAlign: "center", maxWidth: 260 }}>
                  Add your first photo, camera capture, or written vibe to start shaping your scent profile.
                </p>
              </Glass>

              <div style={{ marginTop: 14 }}>
                <p style={{ ...T.sectionTitle, color: "#1D1D1F", margin: 0 }}>
                  Ideas to begin
                </p>
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { label: "A childhood place", icon: "home" },
                    { label: "A favorite person", icon: "person" },
                    { label: "A rainy day", icon: "rain" },
                    { label: "A quiet morning", icon: "home" },
                    { label: "A weekend trip", icon: "rain" },
                    { label: "A dinner date", icon: "person" },
                  ].map((idea) => (
                    <div
                      key={idea.label}
                      style={{
                        border: `1px solid ${P.glassBorder}`,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.78)",
                        color: "#2F2F33",
                        fontFamily: sans,
                        fontSize: 11.2,
                        fontWeight: 600,
                        letterSpacing: 0,
                        padding: "8px 12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        whiteSpace: "nowrap",
                        cursor: "default",
                        userSelect: "none",
                      }}
                    >
                      {idea.icon === "home" && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4 10.8 12 4l8 6.8v8.4a.8.8 0 0 1-.8.8h-4.7v-5.5h-5V20H4.8a.8.8 0 0 1-.8-.8v-8.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        </svg>
                      )}
                      {idea.icon === "person" && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M5.7 19.2c1.2-3.1 3.4-4.7 6.3-4.7s5.1 1.6 6.3 4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      )}
                      {idea.icon === "rain" && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 10a5 5 0 0 1 9.6-1.6A4 4 0 1 1 17 16H8a3 3 0 0 1-1-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                          <path d="M8 19.2v.6M12 19.2v.6M16 19.2v.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      )}
                      {idea.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export function MemoryDetailScreen({ memory, accordLibrary, hasSkinID, onBack, onOpenStores, onPreviewAccord }) {
  const accords = getMemoryRecommendedAccords(memory, accordLibrary);
  const memoryTitle = memory.title || "Untitled memory";
  const smellStory = (memory.scent || memory.emotion || "")
    .replace(/^Replica scent:\s*/i, "")
    .replace(/\s*·\s*/g, ", ");
  const isReplicaMemory = memory.id?.startsWith("replica-");
  const replicaAnalysis = isReplicaMemory ? getReplicaMemoryWearAnalysis(memory, hasSkinID) : null;
  const scoredAccords = accords.map((accord, index) => {
    const memoryFit = Math.max(64, Math.min(97, accord.match - index * 3 + (memoryTitle.length % 5)));
    const skinFit = Math.max(58, Math.min(98, accord.match + (hasSkinID ? 5 : -2) - index));
    return {
      accord,
      memoryFit,
      skinFit,
      scentIdFit: Math.round(memoryFit * 0.5 + skinFit * 0.5),
    };
  });
  const stageDefinitions = [
    { id: "top", title: "Opening lift", label: "Top", subtitle: "The first impression", families: ["fresh-citrus", "fresh-green"] },
    { id: "heart", title: "Emotional heart", label: "Heart", subtitle: "The part that carries the memory", families: ["floral", "gourmand", "warm-spice"] },
    { id: "base", title: "Lasting base", label: "Base", subtitle: "What stays closest to skin", families: ["amber-oriental", "earthy-musk", "woody"] },
  ];
  const accordGroups = stageDefinitions.map((group, groupIndex) => {
    const grouped = scoredAccords.filter(({ accord }) => group.families.includes(accord.family));
    const fallback = scoredAccords.slice(groupIndex * 2, groupIndex * 2 + 3);
    const sorted = (grouped.length ? grouped : fallback)
      .slice()
      .sort((a, b) => hasSkinID ? b.scentIdFit - a.scentIdFit : b.memoryFit - a.memoryFit);
    return {
      ...group,
      bestPick: sorted[0] || null,
      picks: sorted.slice(0, 3),
      otherPicks: sorted.slice(1, 4),
    };
  });
  const totalMatches = accordGroups.reduce((sum, group) => sum + (hasSkinID ? (group.bestPick ? 1 : 0) + group.otherPicks.length : group.picks.length), 0);
  const AccordSuggestionCard = ({ item, compact = false, best = false }) => {
    const { accord, memoryFit, scentIdFit } = item;
    const score = hasSkinID ? scentIdFit : memoryFit;
    const scoreLabel = hasSkinID ? "Skin Fit" : "Memory Fit";
    const handleCardClick = () => {
      if (onPreviewAccord) onPreviewAccord({ ...accord, previewMatch: score, previewScoreLabel: scoreLabel });
    };
    const thumb = compact ? ACCORD_THUMB.compact : ACCORD_THUMB.regular;
    return (
      <button
        type="button"
        onClick={handleCardClick}
        style={{
          width: "100%",
          borderRadius: 16,
          border: `1px solid ${best ? "rgba(17,17,17,0.36)" : "rgba(0,0,0,0.11)"}`,
          background: "#FFFFFF",
          padding: compact ? "8px 10px" : "10px 11px",
          display: "grid",
          gridTemplateColumns: `${thumb.width}px 1fr ${compact ? 46 : 50}px`,
          gap: compact ? 9 : 10,
          alignItems: "center",
          textAlign: "left",
          cursor: onPreviewAccord ? "pointer" : "default",
        }}
      >
        <AccordColorThumb accord={accord} compact={compact} />
        <div style={{ minWidth: 0 }}>
          <p style={{ ...T.cardTitle, color: "#1D1D1F", margin: 0, fontSize: compact ? 14 : 15, lineHeight: 1.16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {accord.name}
          </p>
          <p style={{ ...T.caption, color: "#5F5F64", margin: "4px 0 0", fontSize: compact ? 9.8 : 10.5, lineHeight: 1.25 }}>
            {getAccordIngredientsLine(accord)}
          </p>
          <p style={{ ...T.caption, color: "#737379", margin: "2px 0 0", fontSize: compact ? 9.8 : 10.5, lineHeight: 1.25 }}>
            {getAccordFeelsLikeLine(accord)}
          </p>
        </div>
        <span style={{ width: compact ? 46 : 50, height: compact ? 46 : 50, borderRadius: "50%", background: best ? "#111111" : "#F2F2F4", color: best ? "#FFFFFF" : "#4D4D4F", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: sans, flexShrink: 0, gap: compact ? 1 : 2 }}>
          <span style={{ fontSize: compact ? 10 : 11.5, fontWeight: 760 }}>{score}%</span>
          <span style={{ fontSize: compact ? 6 : 6.5, fontWeight: 650, letterSpacing: 0.35, textTransform: "uppercase", opacity: 0.92, lineHeight: 1.05, textAlign: "center" }}>
            {scoreLabel.split(" ")[0]}<br />{scoreLabel.split(" ")[1]}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "0 24px 96px" }}>
      <FadeIn>
        <button
          type="button"
          onClick={onBack}
          style={{ marginTop: 8, padding: 0, border: "none", background: "transparent", color: P.gold, ...T.eyebrow, cursor: "pointer" }}
        >
          ← Back
        </button>
      </FadeIn>

      <FadeIn delay={40}>
        <div style={{ marginTop: 14, borderRadius: 28, overflow: "hidden", background: "#FFFFFF", border: `1px solid ${P.glassBorder}`, boxShadow: "0 18px 42px rgba(20,17,14,0.08)" }}>
          <div style={{ height: 170, background: getMemoryArchiveBackground(memory), filter: "grayscale(1)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.3))" }} />
            <div style={{ position: "absolute", inset: 0, opacity: 0.16, backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
          </div>
          <div style={{ padding: "18px 18px 20px" }}>
            <p style={{ ...T.eyebrow, color: P.gold, margin: 0 }}>
              {isReplicaMemory ? replicaAnalysis.eyebrow : "Memory accord map"}
            </p>
            <h2 style={{ ...T.pageTitle, color: P.charcoal, margin: "8px 0 0" }}>
              {memoryTitle}
            </h2>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={90}>
        <div style={{ marginTop: 14, padding: 16, borderRadius: 22, background: `linear-gradient(145deg, ${P.charcoal}, ${P.smoke})`, color: P.ivory, position: "relative", overflow: "hidden", boxShadow: "0 18px 36px rgba(20,17,14,0.14)" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "linear-gradient(90deg, rgba(244,244,244,0.08) 1px, transparent 1px), linear-gradient(rgba(244,244,244,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ ...T.eyebrow, color: P.goldLight, margin: 0 }}>
              {isReplicaMemory ? "Replica scent identity" : "How this memory smells"}
            </p>
            <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 760, color: P.ivory, margin: "9px 0 0", lineHeight: 1.45 }}>
              {smellStory}
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={120}>
        <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 18, background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,248,248,0.92))", border: `1px solid ${P.glassBorder}`, boxShadow: "0 10px 24px rgba(20,17,14,0.05)" }}>
          <p style={{ fontFamily: mono, fontSize: 8, color: P.gold, letterSpacing: 1.8, textTransform: "uppercase", margin: 0 }}>Emotional cue</p>
          <p style={{ fontFamily: sans, fontSize: 11.5, color: P.charcoal, margin: "7px 0 0", lineHeight: 1.55 }}>
            {memory.emotion}
          </p>
        </div>
      </FadeIn>

      {isReplicaMemory ? (
        <FadeIn delay={150}>
          <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
            <div style={{ padding: "14px 16px", borderRadius: 20, background: "#FFFFFF", border: `1px solid ${P.glassBorder}`, boxShadow: "0 12px 28px rgba(20,17,14,0.05)" }}>
              <p style={{ fontFamily: mono, fontSize: 8.5, fontWeight: 820, color: P.gold, letterSpacing: 1.9, textTransform: "uppercase", margin: 0 }}>
                {replicaAnalysis.title}
              </p>
              <p style={{ fontFamily: sans, fontSize: 12, color: P.charcoal, margin: "10px 0 0", lineHeight: 1.65 }}>
                {replicaAnalysis.summary}
              </p>
              {replicaAnalysis.cueLine && (
                <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.6 }}>
                  {replicaAnalysis.cueLine}
                </p>
              )}
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {replicaAnalysis.stages.map((stage) => (
                <div key={stage.stage} style={{ padding: "14px 16px", borderRadius: 20, background: "#FFFFFF", border: `1px solid ${P.glassBorder}`, boxShadow: "0 12px 28px rgba(20,17,14,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div>
                      <p style={{ fontFamily: mono, fontSize: 8, color: P.gold, letterSpacing: 1.8, textTransform: "uppercase", margin: 0 }}>
                        {stage.stage}
                      </p>
                      <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 820, color: P.charcoal, margin: "7px 0 0" }}>
                        {stage.name}
                      </p>
                    </div>
                    <span style={{ flexShrink: 0, fontFamily: sans, fontSize: 11, fontWeight: 840, color: P.gold }}>
                      {stage.fit}%
                    </span>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.58 }}>
                    {stage.text}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 20, background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(248,248,248,0.86))", border: `1px solid ${P.glassBorder}`, boxShadow: "0 12px 28px rgba(20,17,14,0.05)" }}>
              <p style={{ fontFamily: mono, fontSize: 8.5, fontWeight: 820, color: P.gold, letterSpacing: 1.9, textTransform: "uppercase", margin: 0 }}>
                What your profile brings out
              </p>
              <p style={{ fontFamily: sans, fontSize: 12, color: P.charcoal, margin: "10px 0 0", lineHeight: 1.65 }}>
                {replicaAnalysis.amplification}
              </p>
              <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.6 }}>
                {replicaAnalysis.drydownLine}
              </p>
            </div>
          </div>
        </FadeIn>
      ) : null}

      <FadeIn delay={isReplicaMemory ? 220 : 150}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 10, marginTop: 18 }}>
          <div>
            <p style={{ ...T.eyebrow, color: P.gold, margin: 0 }}>Accords that can build it</p>
            <p style={{ fontFamily: sans, fontSize: 10.5, color: P.warmGray, margin: "5px 0 0", lineHeight: 1.45 }}>
              {hasSkinID ? "Ranked by Skin Fit with your Scent ID." : "Memory-based picks before skin matching."}
            </p>
          </div>
          <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0 }}>{totalMatches} picks</p>
        </div>

        {!hasSkinID && (
          <div style={{ marginTop: 10, padding: 14, borderRadius: 20, background: "linear-gradient(145deg, rgba(244,244,244,0.94), rgba(255,255,255,0.92))", border: `1px solid ${P.glassBorder}`, boxShadow: "0 12px 28px rgba(20,17,14,0.05)" }}>
            <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 840, color: P.charcoal, margin: 0 }}>Decode unlocks skin match</p>
            <p style={{ fontFamily: sans, fontSize: 10.8, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.52 }}>
              Complete Decode to see which three accords will sit best on your skin for this memory.
            </p>
            <button
              type="button"
              onClick={onOpenStores}
              style={{ marginTop: 11, border: `1px solid ${P.charcoal}`, background: P.charcoal, color: P.ivory, borderRadius: 999, padding: "9px 14px", fontFamily: sans, fontSize: 10.5, fontWeight: 820, cursor: "pointer" }}
            >
              Find Decode
            </button>
          </div>
        )}

        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {accordGroups.map((group) => (
            <div key={group.id} style={{ borderRadius: 22, border: `1px solid ${P.glassBorder}`, background: P.mist, padding: 12, boxShadow: "0 12px 28px rgba(20,17,14,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12, marginBottom: 10 }}>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 8, color: P.gold, letterSpacing: 1.8, textTransform: "uppercase", margin: 0 }}>{group.label}</p>
                  <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 840, color: P.charcoal, margin: "5px 0 0" }}>{group.title}</p>
                </div>
                <span style={{ borderRadius: 999, border: `1px solid ${P.glassBorder}`, background: "#FFFFFF", color: P.warmGray, padding: "5px 9px", fontFamily: sans, fontSize: 9, fontWeight: 760 }}>
                  {group.subtitle}
                </span>
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {hasSkinID ? (
                  <>
                    {group.bestPick && (
                      <div>
                        <p style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: 1.5, textTransform: "uppercase", color: P.gold, margin: "0 0 7px" }}>Best skin fit</p>
                        <AccordSuggestionCard item={group.bestPick} compact best />
                      </div>
                    )}
                    {group.otherPicks.length > 0 && (
                      <div style={{ display: "grid", gap: 8, marginTop: 2 }}>
                        <p style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: 1.5, textTransform: "uppercase", color: P.warmGray, margin: "2px 0 0" }}>Other skin-fit options</p>
                        {group.otherPicks.map((item) => (
                          <AccordSuggestionCard key={`${group.id}-${item.accord.name}`} item={item} compact />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  group.picks.map((item) => (
                    <AccordSuggestionCard key={`${group.id}-${item.accord.name}`} item={item} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
