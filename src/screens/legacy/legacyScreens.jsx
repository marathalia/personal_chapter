import React, { useState } from "react";
import { P, T, sans, serif, mono } from "../../theme.js";
import { BatteryBadge, Btn, FadeIn, Glass, GuidedStepsCard, IntroPanel, Label, LayeringDeviceFigure, MiniAdjustDeviceFigure, MiniCartridgeIcon, PlaceholderDeviceFigure, ProfileStarterCard, ReplicaHeroCard, RunwayCampaignFigure, SegmentedControl, StatusBar, Title } from "../../components/appComponents.jsx";

export function MemoriesScreen({ memories, onDummyUpload }) {
  const [sel, setSel] = useState(null);
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
        <button type="button" onClick={onDummyUpload} style={{ width: "100%", marginTop: 16, borderRadius: 16, padding: "22px", border: `1.5px dashed ${P.gold}30`, background: `${P.cream}40`, textAlign: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 24, color: P.gold, display: "block", marginBottom: 6 }}>+</span>
          <p style={{ fontFamily: sans, fontSize: 11, color: P.charcoal, margin: 0, fontWeight: 500 }}>Add a Memory</p>
          <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "4px 0 0" }}>Photo · Voice note · Written moment</p>
        </button>
      </FadeIn>

      <div style={{ marginTop: 14 }}>
        {memories.map((m, i) => (
          <FadeIn key={m.id || i} delay={200 + i * 60}>
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
                  <div style={{ marginTop: 10 }}>
                    <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: 2, color: P.warmGray, textTransform: "uppercase", margin: "0 0 8px" }}>Olfactive Breakdown</p>
                    {m.breakdown.slice(0, 3).map((b, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontFamily: sans, fontSize: 9, color: P.charcoal }}>{b.name}</span>
                          <span style={{ fontFamily: sans, fontSize: 8, color: P.roseDust }}>{b.accord}% accord · {b.fit}% fit</span>
                        </div>
                        <div style={{ height: 3, borderRadius: 2, background: P.warmBeige, overflow: "hidden" }}>
                          <div style={{ width: `${b.fit}%`, height: "100%", borderRadius: 2, background: b.color }} />
                        </div>
                      </div>
                    ))}
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
export function DeviceScreen({ carts, ratios, connected, onToggleConnected, onAdjustRatio, onSprayBlend, onOpenRefill }) {
  const adj = (idx, d) => onAdjustRatio(idx, d);

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
          <button onClick={onToggleConnected} style={{ marginTop: 12, padding: "7px 20px", borderRadius: 16, background: connected ? `${P.gold}15` : "rgba(255,255,255,0.05)", border: `1px solid ${connected ? P.gold : "rgba(255,255,255,0.1)"}`, color: connected ? P.gold : P.roseDust, fontFamily: sans, fontSize: 8, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
            {connected ? "● Connected" : "Connect Device"}
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={220}>
        <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: "20px 0 4px" }}>Loaded Cartridges</p>
        <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "0 0 10px", lineHeight: 1.5 }}>Reported by the physical device. Cartridge swaps happen on hardware, then sync back here.</p>
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
          <Btn dark onClick={onSprayBlend} disabled={!connected}>Update Blend</Btn>
          {!connected && <p style={{ fontFamily: sans, fontSize: 9, color: P.roseDust, marginTop: 8 }}>Connect device to update</p>}
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
          <button onClick={onOpenRefill} style={{ padding: 0, background: "none", border: "none", fontFamily: sans, fontSize: 9, color: P.gold, margin: "12px 0 0", cursor: "pointer", letterSpacing: 0.5 }}>Find nearest refill station →</button>
        </div>
      </FadeIn>
    </div>
  );
}
