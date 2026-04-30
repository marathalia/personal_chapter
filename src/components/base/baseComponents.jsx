import React, { useState, useEffect } from "react";
import { P, T, sans, mono } from "../../theme.js";
import { getLiveOlfactiveMap } from "../../logic/scent.js";

export function StatusBar() {
  return (
    <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
      <span style={{ ...T.status, color: P.charcoal }}>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="3" width="3" height="8" rx=".5" fill={P.charcoal}/><rect x="4" y="2" width="3" height="9" rx=".5" fill={P.charcoal}/><rect x="8" y="0" width="3" height="11" rx=".5" fill={P.charcoal}/><rect x="12" y="0" width="3" height="11" rx=".5" fill={P.charcoal} opacity=".3"/></svg>
        <svg width="22" height="12" viewBox="0 0 22 12"><rect x=".5" y=".5" width="18" height="11" rx="2.5" stroke={P.charcoal} fill="none"/><rect x="19" y="3.5" width="2.5" height="5" rx="1" fill={P.charcoal} opacity=".4"/><rect x="2" y="2" width="13" height="8" rx="1.5" fill={P.charcoal}/></svg>
      </div>
    </div>
  );
}

export function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "memory", label: "Memory" },
    { id: "explore", label: "Explore" },
    { id: "profile", label: "Profile" },
  ];
  const iconForTab = (id, isActive) => {
    const stroke = isActive ? "#2F2F33" : "#A0A0A6";
    const strokeWidth = 1.9;
    if (id === "home") {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10.8 12 4l8 6.8v8.4a.8.8 0 0 1-.8.8h-4.7v-5.5h-5V20H4.8a.8.8 0 0 1-.8-.8v-8.4Z" fill={isActive ? stroke : "none"} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
        </svg>
      );
    }
    if (id === "memory") {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5.8 5.1h5.7c1.3 0 2.3.4 3 1.1.7-.7 1.7-1.1 3-1.1h.7v13.2h-.7c-1.7 0-2.8.4-3.5 1.2-.7-.8-1.8-1.2-3.5-1.2H5.8V5.1Z" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M12 6.3v12.4" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    }
    if (id === "explore") {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 4.8h9v14.4h-9z" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M9.7 8h4.6M9.7 11h4.6M9.7 14h3.2" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
        <path d="M5.7 19.2c1.2-3.1 3.4-4.7 6.3-4.7s5.1 1.6 6.3 4.7" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    );
  };
  return (
    <div style={{ position: "absolute", bottom: 16, left: 22, right: 22, height: 74, borderRadius: 28, background: "rgba(255,255,255,0.94)", border: "1px solid rgba(17,17,17,0.08)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", alignItems: "center", padding: "6px 12px 8px", boxShadow: "0 18px 38px rgba(0,0,0,0.12)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", zIndex: 40 }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-label={t.label}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isActive ? "#2F2F33" : "#8F8F95",
              transition: "all 0.25s ease",
              opacity: 1,
              minWidth: 0,
              height: 58,
              padding: 0,
            }}
          >
            <span
              style={{
                width: "100%",
                height: 58,
                borderRadius: 18,
                background: isActive ? "#F0F1F4" : "transparent",
                border: `1px solid ${isActive ? "rgba(17,17,17,0.08)" : "transparent"}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 26 }}>{iconForTab(t.id, isActive)}</span>
              <span
                style={{
                  ...T.nav,
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function FadeIn({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 80 + delay); return () => clearTimeout(t); }, []);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: `all 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`, ...style }}>{children}</div>;
}

export function Label({ children }) {
  return <p style={{ ...T.eyebrow, color: P.warmGray, margin: 0 }}>{children}</p>;
}

export function Title({ children, style = {} }) {
  return <h2 style={{ ...T.pageTitle, color: P.charcoal, margin: "10px 0 0", ...style }}>{children}</h2>;
}

export function Btn({ children, onClick, dark, full, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "14px 22px", background: dark ? P.charcoal : P.ivory,
      border: `1px solid ${dark ? P.charcoal : P.glassBorder}`, color: dark ? P.ivory : P.charcoal,
      ...T.button,
      borderRadius: 12, cursor: disabled ? "default" : "pointer", transition: "all 0.3s",
      width: full ? "100%" : "auto", opacity: disabled ? 0.4 : 1, ...style,
    }}>{children}</button>
  );
}

export function Glass({ children, style = {} }) {
  return <div style={{ background: P.glassBg, border: `1px solid ${P.glassBorder}`, borderRadius: 22, padding: 16, boxShadow: "0 16px 42px rgba(20,17,14,0.06)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", ...style }}>{children}</div>;
}

export function SegmentedControl({ items, active, onChange, style = {} }) {
  return (
    <div
      style={{
        padding: 4,
        borderRadius: 18,
        background: "rgba(20,17,14,0.05)",
        border: `1px solid ${P.glassBorder}`,
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        gap: 4,
        ...style,
      }}
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            style={{
              minHeight: 40,
              border: "none",
              borderRadius: 14,
              background: isActive ? P.charcoal : "transparent",
              color: isActive ? P.ivory : P.warmGray,
              fontFamily: sans,
              ...T.button,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: isActive ? "0 10px 24px rgba(20,17,14,0.12)" : "none",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function IntroPanel({ eyebrow, title, body, aside, children, style = {} }) {
  return (
    <Glass
      style={{
        overflow: "hidden",
        background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(248,248,248,0.86))",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(90deg, rgba(20,17,14,0.05) 1px, transparent 1px), linear-gradient(rgba(20,17,14,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div style={{ minWidth: 0 }}>
            {eyebrow && (
              <p
                style={{
                  ...T.eyebrow,
                  color: P.gold,
                  margin: 0,
                }}
              >
                {eyebrow}
              </p>
            )}
            <p
              style={{
                ...T.sectionTitle,
                color: P.charcoal,
                margin: eyebrow ? "7px 0 0" : 0,
              }}
            >
              {title}
            </p>
            {body && (
              <p style={{ ...T.body, color: P.warmGray, margin: "8px 0 0" }}>
                {body}
              </p>
            )}
          </div>
          {aside}
        </div>
        {children && <div style={{ marginTop: 14 }}>{children}</div>}
      </div>
    </Glass>
  );
}

export function ReplicaHeroCard({ label, title, badge, children, icon, actions, compact = false, style = {} }) {
  return (
    <Glass style={{ padding: 0, overflow: "hidden", ...style }}>
      <div style={{ padding: compact ? "14px 16px" : "18px 18px", minHeight: compact ? 122 : 150, background: "linear-gradient(145deg, #2A2A2A, #111111)", position: "relative", color: P.ivory }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.24, backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
        <div style={{ position: "absolute", right: -42, top: -54, width: 156, height: 156, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.28)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start" }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ ...T.eyebrow, color: P.goldLight, margin: 0 }}>
              {label}
            </p>
            <p style={{ ...T.heroTitle, fontSize: compact ? 18 : T.heroTitle.fontSize, color: P.ivory, margin: compact ? "14px 0 0" : "22px 0 0" }}>
              {title}
            </p>
          </div>
          {badge && (
            <div style={{ padding: compact ? "6px 10px" : "8px 12px", borderRadius: 999, background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.24)", ...T.chip, fontSize: compact ? 11 : T.chip.fontSize, color: "#FFFFFF", whiteSpace: "nowrap" }}>
              {badge}
            </div>
          )}
        </div>
        {icon && <div style={{ position: "absolute", right: compact ? 14 : 20, bottom: compact ? 12 : 18, zIndex: 1 }}>{icon}</div>}
      </div>
      {(children || actions) && (
        <div style={{ padding: compact ? "12px 16px 14px" : "16px 18px 18px", background: "linear-gradient(180deg, #FFFFFF, #F4F4F4)" }}>
          {children}
          {actions && <div style={{ marginTop: compact ? 10 : 14 }}>{actions}</div>}
        </div>
      )}
    </Glass>
  );
}

export function MiniCartridgeIcon({ size = 72 }) {
  const shellRadius = Math.round(size * 0.28);
  const cartridgeWidth = size * 0.27;
  const cartridgeHeight = size * 0.5;
  return (
    <div
      style={{
        width: size,
        height: size * 1.25,
        borderRadius: shellRadius,
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(241,241,241,0.92))",
        boxShadow: "0 14px 26px rgba(0,0,0,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        border: "1px solid rgba(17,17,17,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: size * 0.16,
          right: size * 0.16,
          bottom: size * 0.13,
          height: size * 0.14,
          borderRadius: 999,
          background: "linear-gradient(90deg, rgba(17,17,17,0.05), rgba(17,17,17,0.02), rgba(17,17,17,0.05))",
        }}
      />
      <div
        style={{
          width: cartridgeWidth,
          height: cartridgeHeight,
          borderRadius: size * 0.16,
          background: "linear-gradient(100deg, #A67845 0%, #E8D2B0 52%, #A9763F 100%)",
          boxShadow: "inset 0 0 0 1px rgba(17,17,17,0.10)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -size * 0.08,
            left: "50%",
            transform: "translateX(-50%)",
            width: cartridgeWidth * 0.86,
            height: size * 0.1,
            borderRadius: 999,
            background: "#1D1D1F",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "28%",
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.max(4, size * 0.065),
            height: "44%",
            borderRadius: 999,
            background: "rgba(255,255,255,0.9)",
          }}
        />
      </div>
    </div>
  );
}

export function ProfileStarterCard({ onStartProfile, onOpenStores, style = {} }) {
  return (
    <Glass
      style={{
        padding: 0,
        borderRadius: 18,
        overflow: "hidden",
        background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(247,247,247,0.92))",
        border: "1px solid rgba(17,17,17,0.07)",
        boxShadow: "0 8px 22px rgba(17,17,17,0.045)",
        ...style,
      }}
    >
      <div style={{ padding: "13px 14px 11px", background: "#FFFFFF", borderBottom: "1px solid rgba(17,17,17,0.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <p style={{ ...T.eyebrow, fontSize: 9.5, color: "#8A8A8E", margin: 0 }}>Profile Setup</p>
            <h3 style={{ ...T.sectionTitle, fontSize: 16.5, color: "#1D1D1F", margin: "5px 0 0", lineHeight: 1.18 }}>Start your scent profile</h3>
          </div>
          <span
            style={{
              ...T.chip,
              fontSize: 10.5,
              color: "#6E6E73",
              border: "1px solid rgba(17,17,17,0.10)",
              background: "#F6F6F7",
              borderRadius: 999,
              padding: "6px 10px",
              whiteSpace: "nowrap",
            }}
          >
            Draft
          </span>
        </div>
      </div>

      <div style={{ padding: "12px 14px 14px" }}>
        <p style={{ ...T.caption, fontSize: 12, color: "#6E6E73", margin: 0, lineHeight: 1.45 }}>
          Add a memory, then complete Decode to unlock skin-aware recommendations.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          <Btn dark full onClick={onStartProfile} style={{ height: 42, borderRadius: 13, boxShadow: "0 10px 22px rgba(20,16,12,0.12)" }}>Add Memory</Btn>
          <Btn full onClick={onOpenStores} style={{ height: 42, borderRadius: 13, background: "#FFFFFF" }}>Decode</Btn>
        </div>
      </div>
    </Glass>
  );
}

export function StoreAccessCard({ decoded = false, onOpenStores, delay = 110, style = {} }) {
  return (
    <FadeIn delay={delay}>
      <Glass
        style={{
          marginTop: 10,
          padding: 15,
          borderRadius: 18,
          background: "linear-gradient(135deg, #FFFFFF, #F7F7F7)",
          border: "1px solid rgba(17,17,17,0.07)",
          boxShadow: "0 8px 22px rgba(17,17,17,0.045)",
          ...style,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "42px 1fr auto", alignItems: "center", gap: 11 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "#F0F1F4", border: "1px solid rgba(17,17,17,0.08)", display: "grid", placeItems: "center", color: "#1D1D1F", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ ...T.chip, fontSize: 13.5, color: "#1D1D1F", margin: 0 }}>
              {decoded ? "Store support" : "Decode in store"}
            </p>
            <p style={{ ...T.caption, fontSize: 11.5, color: "#6E6E73", margin: "5px 0 0", lineHeight: 1.34 }}>
              {decoded ? "Find counters for refills, scans, and in-person help." : "Find the nearest counter to complete Decode."}
            </p>
          </div>
          <button type="button" onClick={onOpenStores} style={{ border: "1px solid rgba(17,17,17,0.14)", background: "#FFFFFF", color: "#1D1D1F", borderRadius: 12, height: 36, padding: "0 12px", fontFamily: sans, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            Find Store
          </button>
        </div>
      </Glass>
    </FadeIn>
  );
}

export function BatteryBadge({ level }) {
  const tone = level > 60 ? "#34C759" : level > 25 ? "#FF9500" : "#FF3B30";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: P.ivory, border: `1px solid ${P.glassBorder}`, ...T.chip, color: P.charcoal }}>
      <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
        <rect x="0.75" y="0.75" width="14" height="8.5" rx="2" fill="none" stroke={tone} strokeWidth="1.2" />
        <rect x="15.4" y="3" width="2" height="4" rx="1" fill={tone} />
        <rect x="2.2" y="2.1" width={`${Math.max(2, (level / 100) * 11)}`} height="5.8" rx="1.3" fill={tone} />
      </svg>
      <span>{level}%</span>
    </div>
  );
}

export function LiveOlfactiveMap({ carts, ratios }) {
  const map = getLiveOlfactiveMap(carts, ratios);
  const dominant = map.reduce((winner, item) => (item.ratio > winner.ratio ? item : winner), map[0]);

  return (
    <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(17,17,17,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 11 }}>
        <div>
          <p style={{ ...T.eyebrow, fontSize: 9.5, color: "#8A8A8E", margin: 0 }}>
            Scent Timeline
          </p>
          <p style={{ ...T.caption, fontSize: 10.5, color: "#6E6E73", margin: "4px 0 0" }}>
            {dominant.notes} leads the blend at {dominant.ratio}%.
          </p>
        </div>
        <span style={{ ...T.chip, fontSize: 10.5, color: "#1D1D1F", border: "1px solid rgba(17,17,17,0.1)", background: "rgba(255,255,255,0.85)", borderRadius: 999, padding: "6px 11px", whiteSpace: "nowrap" }}>
          Live
        </span>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {map.map((item) => {
          const isDominant = item.tier === dominant.tier;
          return (
            <div
              key={item.tier}
              style={{
                minHeight: 52,
                padding: "9px 11px",
                borderRadius: 16,
                border: "1px solid rgba(17,17,17,0.09)",
                background: isDominant ? `${item.color}14` : "rgba(255,255,255,0.78)",
                display: "grid",
                gridTemplateColumns: "44px 1fr auto",
                gap: 10,
                alignItems: "center",
                boxShadow: isDominant ? "0 10px 20px rgba(17,17,17,0.05)" : "none",
              }}
            >
              <div style={{ height: 32, borderRadius: 11, background: `${item.color}24`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: item.color }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ ...T.chip, fontSize: 11.5, color: "#1D1D1F", margin: 0, fontWeight: 650 }}>{item.tier} · {item.notes}</p>
                <p style={{ ...T.caption, fontSize: 10.2, color: "#6E6E73", margin: "3px 0 0" }}>{item.time} · {item.effect}</p>
              </div>
              <p style={{ ...T.cardTitle, fontSize: 13, color: "#1D1D1F", margin: 0 }}>{item.ratio}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
