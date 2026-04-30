import React, { useState } from "react";
import { P, T, sans, mono } from "../../theme.js";
import { STORE_LOCATIONS, SHOP_ITEMS } from "../../data/catalog.js";
import { Btn, FadeIn, Glass, Label, ProfileStarterCard, StatusBar, StoreAccessCard, Title } from "../../components/appComponents.jsx";
import skinprintScanDevice from "../../assets/skinprint-scan-device.png";

export function ProfileScreen({ hasSkinID, hasProfileInput, onOpenStores, onStartProfile }) {
  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn delay={50}><Title>Profile</Title></FadeIn>

      <FadeIn delay={120}>
        {!hasProfileInput ? (
          <ProfileStarterCard
            onStartProfile={onStartProfile}
            onOpenStores={onOpenStores}
            style={{ marginTop: 18 }}
          />
        ) : (
          <Glass style={{ marginTop: 18, padding: 16, background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(246,246,246,0.92))" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <p style={{ ...T.eyebrow, color: "#6E6E73", margin: 0 }}>
                  {hasSkinID ? "Verified Scent ID" : "Starting Profile"}
                </p>
                <p style={{ ...T.sectionTitle, fontSize: 18, color: P.charcoal, margin: "7px 0 0", lineHeight: 1.2 }}>
                  {hasSkinID ? "Amber / Clean Skin Musk" : "Warm / Soft Grounded"}
                </p>
              </div>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: hasSkinID ? "rgba(52,199,89,0.12)" : "rgba(17,17,17,0.06)", border: `1px solid ${hasSkinID ? "rgba(52,199,89,0.26)" : "rgba(17,17,17,0.12)"}`, ...T.chip, fontSize: 11, color: hasSkinID ? "#1F8C3A" : "#6E6E73", whiteSpace: "nowrap" }}>
                {hasSkinID ? "Verified" : "Pending"}
              </span>
            </div>

            <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: "12px 0 0", lineHeight: 1.55 }}>
              {hasSkinID
                ? "Your biology and preferences are combined, so recommendations reflect real skin performance."
                : "A memory has started your profile. Complete Decode to add microbiome, pH, and wear data."}
            </p>

            {!hasSkinID && (
              <div style={{ marginTop: 12 }}>
                <Btn dark full onClick={onOpenStores}>Complete Decode</Btn>
              </div>
            )}
          </Glass>
        )}
      </FadeIn>

      {hasSkinID && hasProfileInput && (
        <FadeIn delay={220}>
          <div style={{ marginTop: 14, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(17,17,17,0.14)", background: "#FFFFFF", boxShadow: "0 12px 26px rgba(17,17,17,0.06)" }}>
            <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(17,17,17,0.08)", background: "linear-gradient(180deg, #FFFFFF, #FCFCFC)" }}>
              <div style={{ marginTop: 6 }}>
                <p style={{ ...T.sectionTitle, color: P.charcoal, margin: 0 }}>Skin profile</p>
              </div>
            </div>

            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
              {[
                { label: "pH Level", value: "5.4", sub: "Slightly acidic" },
                { label: "Sebum", value: "Medium", sub: "Balanced retention" },
                { label: "Microbiome", value: "Type B+", sub: "Amber-amplifying" },
                { label: "Skin Temp", value: "33.2°C", sub: "Warm diffusion" },
                { label: "Hydration", value: "62%", sub: "Even evaporation" },
                { label: "Longevity", value: "6-8 hr", sub: "Above average" },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    borderRadius: 16,
                    border: "1px solid rgba(17,17,17,0.1)",
                    background: "linear-gradient(180deg, #FFFFFF, #FCFCFC)",
                    padding: "12px 12px 13px",
                    minHeight: 96,
                    display: "grid",
                    alignContent: "start",
                  }}
                >
                  <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1.4, textTransform: "uppercase", color: "#6E6E73", margin: 0 }}>
                    {m.label}
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 20, fontWeight: 760, color: "#1D1D1F", margin: "8px 0 0", lineHeight: 1.05 }}>
                    {m.value}
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 11.5, color: "#6A6A70", margin: "6px 0 0", lineHeight: 1.25 }}>
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      <StoreAccessCard decoded={hasSkinID} onOpenStores={onOpenStores} style={{ marginTop: 12 }} />

    </div>
  );
}

export function ShopScreen({ cartCount, onAddToCart, onOpenStores }) {
  const nearestStore = STORE_LOCATIONS[0];

  return (
    <div style={{ padding: "0 24px", paddingTop: 16, paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      <FadeIn><Label>Cartridges and Refill</Label></FadeIn>
      <FadeIn delay={50}><Title>Shop</Title></FadeIn>
      <FadeIn delay={80}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <p style={{ fontFamily: sans, fontSize: 13, color: P.warmGray, margin: 0, lineHeight: 1.6, maxWidth: 250 }}>
            Refill your cartridges, shop curated sets, or find the nearest store for in-person replenishment.
          </p>
          <div style={{ padding: "7px 12px", borderRadius: 999, background: `${P.gold}12`, border: `1px solid ${P.gold}20`, fontFamily: sans, fontSize: 11, color: P.charcoal }}>
            Cart {cartCount}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={140}>
        <Glass style={{ marginTop: 18, padding: 18 }}>
          <p style={{ ...T.eyebrow, color: P.warmGray, margin: 0 }}>Nearest Refill Counter</p>
          <p style={{ ...T.sectionTitle, color: P.charcoal, margin: "8px 0 2px" }}>{nearestStore.name}</p>
          <p style={{ ...T.caption, color: P.warmGray, margin: 0 }}>{nearestStore.area} · {nearestStore.distance}</p>
          <p style={{ ...T.body, color: P.charcoal, margin: "12px 0 0", maxWidth: 250 }}>
            {nearestStore.address}
          </p>
          <button onClick={onOpenStores} style={{ marginTop: 14, padding: 0, background: "none", border: "none", color: P.charcoal, ...T.button, cursor: "pointer" }}>
            Find store near me →
          </button>
        </Glass>
      </FadeIn>

      <div style={{ marginTop: 18 }}>
        {SHOP_ITEMS.map((item, index) => (
          <FadeIn key={item.id} delay={190 + index * 50}>
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 12, border: `1px solid ${P.glassBorder}`, background: P.glassBg }}>
              <div style={{ display: "flex", gap: 14, padding: 16 }}>
                <div style={{ width: 50, height: 72, borderRadius: 12, background: `linear-gradient(180deg, ${item.color}35, ${item.color}10)`, border: `1px solid ${item.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 14, height: 38, borderRadius: 6, background: `${item.color}48` }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: P.charcoal, margin: 0 }}>{item.name}</p>
                      <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "4px 0 0", letterSpacing: 0.2 }}>{item.type}</p>
                    </div>
                    <span style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: P.charcoal }}>{item.price}</span>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 11, color: P.warmGray, margin: "8px 0 0", lineHeight: 1.5 }}>{item.notes}</p>
                </div>
              </div>
              <div style={{ display: "flex", borderTop: `1px solid ${P.warmBeige}` }}>
                <button onClick={() => onAddToCart(item)} style={{ flex: 1, padding: "13px", background: "none", border: "none", fontFamily: sans, fontSize: 11, fontWeight: 600, color: P.charcoal, cursor: "pointer" }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function StoreLocatorScreen({ hasSkinID, onBack, onCompleteDecode }) {
  const [city, setCity] = useState("All");
  const cities = ["All", "Singapore", "Jakarta", "Seoul", "Tokyo", "Paris"];
  const stores = city === "All" ? STORE_LOCATIONS : STORE_LOCATIONS.filter(store => store.city === city);
  const nearestStore = STORE_LOCATIONS.find(store => store.city === "Singapore") || STORE_LOCATIONS[0];

  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #FFFFFF, #FFFFFF)", display: "flex", flexDirection: "column", zIndex: 140 }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "0 24px 34px", overflowY: "auto" }}>
        <FadeIn>
          <button type="button" onClick={onBack} style={{ padding: 0, marginTop: 8, background: "none", border: "none", fontFamily: sans, fontSize: 9, letterSpacing: 2, color: P.gold, textTransform: "uppercase", cursor: "pointer" }}>
            ← Back
          </button>
        </FadeIn>
        {!hasSkinID && (
          <FadeIn delay={80}>
            <Glass style={{ marginTop: 18, padding: 16, background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(246,244,240,0.9))" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <p style={{ ...T.eyebrow, color: P.gold, margin: 0 }}>Decode checks</p>
                  <p style={{ ...T.sectionTitle, color: P.charcoal, margin: "6px 0 0" }}>
                    What gets tested
                  </p>
                  <p style={{ ...T.caption, color: P.warmGray, margin: "6px 0 0", maxWidth: 270 }}>
                    Quick overview before your in-store scan.
                  </p>
                </div>
                <div style={{ width: 36, height: 62, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: -2 }}>
                  <img
                    src={skinprintScanDevice}
                    alt="Skinprint scan device"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 10px 18px rgba(17,17,17,0.10))",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
                {[
                  { label: "pH", value: "Acidity vs note clarity", tone: "#B78A32" },
                  { label: "Microbiome", value: "Skin flora + reaction", tone: "#C77B95" },
                  { label: "Temperature", value: "Warmth drives diffusion", tone: "#7E7469" },
                  { label: "Hydration", value: "Evaporation balance", tone: "#88A68B" },
                  { label: "Sebum / Oil", value: "Oil holds scent trail", tone: "#B89A65" },
                  { label: "Skin Fit", value: "Match score for your skin", tone: "#8C8374" },
                ].map(item => (
                  <div
                    key={item.label}
                    style={{
                      minHeight: 68,
                      borderRadius: 14,
                      border: `1px solid ${P.glassBorder}`,
                      background: "#FFFFFF",
                      padding: "10px 12px",
                      display: "grid",
                      gridTemplateRows: "auto auto",
                      gap: 5,
                      alignContent: "center",
                    }}
                  >
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <span style={{ width: 11, height: 11, borderRadius: "50%", background: item.tone, boxShadow: `0 0 0 4px ${item.tone}1A`, flexShrink: 0 }} />
                      <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 760, color: P.charcoal, margin: 0, lineHeight: 1.18, overflow: "hidden", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                        {item.label}
                      </p>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: sans, fontSize: 10.5, color: P.warmGray, margin: 0, lineHeight: 1.35 }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <Btn dark full onClick={onCompleteDecode}>Simulate Decode Complete</Btn>
              </div>
            </Glass>
          </FadeIn>
        )}

        <FadeIn delay={130}>
          <div style={{ marginTop: 18 }}>
            <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: P.charcoal, margin: 0 }}>Available locations</p>
            <p style={{ fontFamily: sans, fontSize: 10.5, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.55 }}>
              {hasSkinID ? "Visit any participating counter for refills, support, or another scan." : "Visit any participating counter below to complete Decode."}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 14, paddingBottom: 2 }}>
            {cities.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setCity(option)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: `1px solid ${city === option ? P.gold : P.warmBeige}`,
                  background: city === option ? `${P.gold}0a` : "transparent",
                  fontFamily: sans,
                  fontSize: 9,
                  letterSpacing: 1,
                  color: city === option ? P.gold : P.warmGray,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ marginTop: 18 }}>
          {stores.map((store, index) => (
            <FadeIn key={store.id} delay={260 + index * 50}>
              <div style={{ padding: "18px 16px", borderRadius: 18, background: P.glassBg, border: `1px solid ${P.glassBorder}`, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                  <div>
                    <p style={{ ...T.sectionTitle, fontSize: 14.5, color: P.charcoal, margin: 0, lineHeight: 1.2 }}>{store.name}</p>
                    <p style={{ ...T.caption, fontSize: 11.5, color: P.warmGray, margin: "5px 0 0" }}>{store.city} · {store.area}</p>
                  </div>
                  <span style={{ ...T.caption, fontSize: 11, color: P.warmGray, whiteSpace: "nowrap" }}>{store.distance}</span>
                </div>
                <p style={{ ...T.body, fontSize: 11.5, color: P.warmGray, margin: "12px 0 0", lineHeight: 1.5 }}>{store.address}</p>
                <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                  {store.tags.map(tag => (
                    <span key={tag} style={{ padding: "5px 9px", borderRadius: 999, background: P.ivory, border: `1px solid ${P.glassBorder}`, ...T.chip, fontSize: 10.5, color: P.charcoal }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 14, alignItems: "center" }}>
                  <div>
                    <p style={{ ...T.body, fontSize: 11.8, color: P.charcoal, margin: 0 }}>{store.service}</p>
                    <p style={{ ...T.caption, fontSize: 10.5, color: P.warmGray, margin: "4px 0 0" }}>{store.hours}</p>
                  </div>
                  <button type="button" style={{ padding: 0, background: "none", border: "none", ...T.button, fontSize: 11.5, color: P.charcoal, cursor: "pointer" }}>
                    View location →
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
}
