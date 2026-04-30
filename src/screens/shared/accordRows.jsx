import React from "react";
import { T, serif } from "../../theme.js";
import { getAccordPhotoBackground } from "../../logic/scent.js";

export function getAccordIngredientsLine(accord) {
  const notes = (accord?.notes || "").replaceAll(" · ", ", ").trim();
  return notes ? `Made with ${notes}` : "Made with signature aroma materials";
}

export function getAccordFeelsLikeLine(accord) {
  const character = (accord?.character || "").trim();
  if (character) return `Feels like ${character.toLowerCase()}`;
  const desc = (accord?.desc || "").trim().replace(/\.$/, "");
  return desc ? `Feels like ${desc.toLowerCase()}` : "Feels like a polished, wearable memory";
}

export const ACCORD_THUMB = {
  compact: { width: 50, height: 78, radius: 18 },
  regular: { width: 54, height: 86, radius: 20 },
};

export function AccordColorThumb({ accord, compact = false, style = {} }) {
  const thumb = compact ? ACCORD_THUMB.compact : ACCORD_THUMB.regular;
  return (
    <div
      style={{
        width: thumb.width,
        height: thumb.height,
        borderRadius: thumb.radius,
        overflow: "hidden",
        backgroundImage: getAccordPhotoBackground(accord),
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "1px solid rgba(0,0,0,0.06)",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

export function AccordListRow({ accord, selected = false, onClick, compact = false, showAction = true }) {
  if (!accord) return null;
  const isCompact = compact;
  const thumb = isCompact ? ACCORD_THUMB.compact : ACCORD_THUMB.regular;
  const containerHeight = isCompact ? 94 : 106;
  const actionSize = compact ? 34 : 38;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: containerHeight,
        height: containerHeight,
        borderRadius: 15,
        border: `1px solid ${selected ? "rgba(17,17,17,0.42)" : "rgba(0,0,0,0.11)"}`,
        background: "#FFFFFF",
        padding: isCompact ? "6px 8px" : "9px 10px",
        display: "grid",
        gridTemplateColumns: showAction ? `${thumb.width}px 1fr ${actionSize}px` : `${thumb.width}px 1fr`,
        gap: isCompact ? 9 : 11,
        alignItems: "center",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <AccordColorThumb accord={accord} compact={isCompact} />
      <div style={{ minWidth: 0, paddingLeft: isCompact ? 1 : 3 }}>
        <p style={{ ...T.cardTitle, color: "#1D1D1F", margin: 0, fontSize: isCompact ? 12.5 : 15, lineHeight: 1.18, whiteSpace: "normal", overflow: "hidden", wordBreak: "break-word", overflowWrap: "anywhere" }}>
          {accord.name}
        </p>
        <p style={{ ...T.caption, color: "#6A6A70", margin: "4px 0 0", fontSize: isCompact ? 9.6 : 10, lineHeight: 1.22, whiteSpace: "normal", overflow: "visible", textOverflow: "clip" }}>
          {getAccordIngredientsLine(accord)}
        </p>
        <p style={{ ...T.caption, color: "#54545A", margin: "3px 0 0", fontFamily: serif, fontSize: isCompact ? 10.3 : 11.3, lineHeight: 1.2, whiteSpace: "normal", overflow: "visible", textOverflow: "clip" }}>
          {getAccordFeelsLikeLine(accord)}
        </p>
      </div>
      {showAction && (
        <span style={{ width: actionSize, height: actionSize, borderRadius: "50%", background: selected ? "#111111" : "#F1F1F3", color: selected ? "#FFFFFF" : "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {selected ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5.5 12.5 4.2 4.2 8.8-9.4" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          )}
        </span>
      )}
    </button>
  );
}
