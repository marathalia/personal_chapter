import React, { useEffect } from "react";
import { P, T, sans } from "../../theme.js";
import { Btn } from "../base/baseComponents.jsx";

export function GuidedStepsCard({ steps, activeIndex, onChange, onAction }) {
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
                background: isLocked ? "#F0F0F0" : P.ivory,
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
              <p style={{ ...T.cardTitle, color: P.charcoal, margin: "10px 0 0" }}>
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
