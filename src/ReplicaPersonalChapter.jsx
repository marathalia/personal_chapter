import React, { useEffect, useState } from "react";
import { P, sans, serif } from "./theme.js";
import { ACCORD_LIBRARY, DUMMY_UPLOAD_MEMORIES, MEMORY_PROMPTS } from "./data/catalog.js";
import { getAccordPreview, getMemoryIcon } from "./logic/scent.js";
import { MemoryComposerSheet, PairingSheet, Sheet, StatusBar, TabBar, Toast, RatioAssistantSheet } from "./components/appComponents.jsx";
import { ExploreScreen, HomeScreen, MemoryDetailScreen, MemoryEntryScreen, MemoryScreen, OnboardingScreen, ProfileScreen, SplashScreen, StoreLocatorScreen } from "./screens/appScreens.jsx";

export default function ReplicaApp() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [transitioning, setTransitioning] = useState(false);
  const [hasSkinID, setHasSkinID] = useState(false);
  const [memories, setMemories] = useState([]);
  const [batteryLevel, setBatteryLevel] = useState(84);
  const [deviceCarts, setDeviceCarts] = useState([
    { name: "Warm Amber", color: "#B78A32", family: "amber-oriental", level: 68 },
    { name: "Clean Skin Musk", color: P.roseDust, family: "earthy-musk", level: 45 },
    { name: "Fig & Leaf", color: "#7E9874", family: "fresh-green", level: 82 },
  ]);
  const [ratios, setRatios] = useState([42, 31, 27]);
  const [connected, setConnected] = useState(false);
  const [toast, setToast] = useState("");
  const [memoryComposerOpen, setMemoryComposerOpen] = useState(false);
  const [memoryDraft, setMemoryDraft] = useState({
    mode: "photo",
    title: "",
    note: "",
  });
  const [previewAccord, setPreviewAccord] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [deviceStatusAccord, setDeviceStatusAccord] = useState(null);
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);
  const [pairingSheetOpen, setPairingSheetOpen] = useState(false);
  const [pairingState, setPairingState] = useState("idle");
  const [ratioAssistantOpen, setRatioAssistantOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [exploreInitialMode, setExploreInitialMode] = useState("lab");
  const [labSeedNames, setLabSeedNames] = useState(["Warm Amber", "Clean Skin Musk", "Fig & Leaf"]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const hasUploadedMemory = memories.some(memory => memory.id.startsWith("m-upload-"));
  const hasProfileInput = hasUploadedMemory || hasSkinID;
  const setupSteps = [
    {
      id: "memory",
      title: "Add Memory",
      caption: hasUploadedMemory ? "Your scent direction has started with a saved memory." : "Add a memory to create your starting scent direction.",
      done: hasUploadedMemory,
      cta: "Add memory",
    },
    {
      id: "decode",
      title: "Decode In Store",
      caption: hasSkinID ? "Your profile is now verified with skin-based data." : "Visit a Replica counter to verify your profile on skin.",
      done: hasSkinID,
      cta: "Open Decode",
    },
    {
      id: "spray",
      title: "Pair Device",
      caption: connected ? "Your device is paired and ready for live blend updates." : "Pair the device so your ratios can sync to the hardware.",
      done: connected,
      cta: connected ? "Open device" : "Pair device",
    },
  ];

  const switchTab = (tab) => {
    if (tab === "create") {
      setExploreInitialMode("lab");
      if (activeTab === "explore") return;
      setTransitioning(true);
      setTimeout(() => { setActiveTab("explore"); setTransitioning(false); }, 150);
      return;
    }
    if (tab === "explore") {
      setExploreInitialMode("lab");
    }
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => { setActiveTab(tab); setTransitioning(false); }, 150);
  };

  const handleDummyUpload = () => {
    const uploadCount = memories.filter(memory => memory.id.startsWith("m-upload-")).length;
    const variant = DUMMY_UPLOAD_MEMORIES[uploadCount % DUMMY_UPLOAD_MEMORIES.length];
    const uploaded = {
      id: `m-upload-${memories.length + 1}`,
      ...variant,
    };
    setMemories(current => [uploaded, ...current]);
    setToast("Dummy memory uploaded successfully.");
    return uploaded;
  };

  const handleMemoryDraftChange = (field, value) => {
    setMemoryDraft((current) => ({ ...current, [field]: value }));
  };

  const openMemoryComposer = (mode = "photo") => {
    const allowedModes = ["photo", "camera", "words"];
    const nextMode = allowedModes.includes(mode) ? mode : "photo";
    setMemoryDraft((current) => ({ ...current, mode: nextMode }));
    setMemoryComposerOpen(true);
  };

  const closeMemoryComposer = () => {
    setMemoryComposerOpen(false);
    setMemoryDraft({ mode: "photo", title: "", note: "" });
  };

  const handleSaveMemoryComposer = () => {
    const uploadCount = memories.filter(memory => memory.id.startsWith("m-upload-")).length;
    const variant = DUMMY_UPLOAD_MEMORIES[uploadCount % DUMMY_UPLOAD_MEMORIES.length];
    const title = memoryDraft.title.trim() || variant.title;
    const note = memoryDraft.note.trim();
    const emotion = note
      ? note.replace(/\s*[,.]\s*/g, ", ").split(",").map((part) => part.trim()).filter(Boolean).slice(0, 3).join(", ")
      : variant.emotion;
    const uploaded = {
      id: `m-upload-${memories.length + 1}`,
      ...variant,
      title,
      emotion,
      scent: note ? `${variant.scent} · ${note}` : variant.scent,
      icon: getMemoryIcon(title, note, memoryDraft.mode),
    };
    setMemories((current) => [uploaded, ...current]);
    setToast("Memory added successfully.");
    closeMemoryComposer();
  };

  const handleAdjustRatio = (idx, d) => {
    setRatios(current => {
      const next = [...current];
      const nextValue = Math.max(5, Math.min(80, next[idx] + d));
      const diff = nextValue - next[idx];
      next[idx] = nextValue;
      const otherIndexes = [0, 1, 2].filter(i => i !== idx);
      const total = otherIndexes.reduce((sum, i) => sum + next[i], 0);
      otherIndexes.forEach(i => {
        next[i] = Math.max(5, Math.round(next[i] - diff * (next[i] / total)));
      });
      const sum = next.reduce((a, b) => a + b, 0);
      next[otherIndexes[0]] += 100 - sum;
      return next;
    });
  };

  const handlePreviewAccord = accord => setPreviewAccord(accord);

  const handleOpenMemoryDetail = memory => setSelectedMemory(memory);

  const handleCheckDevice = accord => setDeviceStatusAccord(accord);

  const openLabWithAccords = (accordNames) => {
    const nextNames = accordNames.filter(Boolean).slice(0, 3);
    if (!nextNames.length) return;
    setLabSeedNames(nextNames);
    setExploreInitialMode("lab");
    switchTab("explore");
    setToast("Memory accords opened in Lab.");
  };

  const handleSprayBlend = () => {
    if (!connected) return;
    setToast("Blend updated to the device.");
  };

  const handleApplySuggestedRatios = (nextRatios) => {
    setRatios(nextRatios);
    setRatioAssistantOpen(false);
    setToast("Suggested ratio applied.");
  };

  const openStoreLocator = () => setStoreLocatorOpen(true);
  const closeStoreLocator = () => setStoreLocatorOpen(false);
  const openPairingSheet = () => {
    setPairingState("idle");
    setPairingSheetOpen(true);
  };
  const closePairingSheet = () => {
    if (pairingState === "loading") return;
    setPairingSheetOpen(false);
    setPairingState("idle");
  };
  const handleConfirmPairing = () => {
    if (pairingState !== "idle") return;
    setPairingState("loading");
    setTimeout(() => {
      setConnected(true);
      setPairingState("connected");
      setToast("Device paired successfully.");
    }, 1400);
  };
  const handleCompleteDecode = () => {
    setHasSkinID(true);
    setStoreLocatorOpen(false);
    setActiveTab("profile");
    setToast("Decode completed. Skin profile unlocked.");
  };

  const handleOpenProgressStep = (stepId) => {
    if (stepId === "memory") {
      switchTab("memory");
      setMemoryComposerOpen(true);
      return;
    }
    if (stepId === "decode") {
      if (hasSkinID) {
        switchTab("profile");
      } else {
        openStoreLocator();
      }
      return;
    }
    if (stepId === "spray") {
      if (connected) {
        handleSprayBlend();
      } else {
        openPairingSheet();
      }
    }
  };
  const startMemoryProfile = () => {
    setMemoryComposerOpen(true);
    switchTab("memory");
  };

  const renderMain = () => {
    switch (activeTab) {
      case "home": return <HomeScreen hasSkinID={hasSkinID} carts={deviceCarts} ratios={ratios} connected={connected} batteryLevel={batteryLevel} onRequestPairing={openPairingSheet} onAdjustRatio={handleAdjustRatio} onSprayBlend={handleSprayBlend} onOpenRatioAssistant={() => setRatioAssistantOpen(true)} onOpenStores={openStoreLocator} memories={memories} setupSteps={setupSteps} onOpenProgressStep={handleOpenProgressStep} onOpenProfile={() => switchTab("profile")} />;
      case "memory": return <MemoryScreen memories={memories} memoryPrompts={MEMORY_PROMPTS} accordLibrary={ACCORD_LIBRARY} onOpenMemoryComposer={openMemoryComposer} onOpenMemoryDetail={handleOpenMemoryDetail} />;
      case "explore": return <ExploreScreen hasSkinID={hasSkinID} hasProfileInput={hasProfileInput} accords={ACCORD_LIBRARY} onPreviewAccord={handlePreviewAccord} onModalChange={setExploreModalOpen} initialMode={exploreInitialMode} initialLabNames={labSeedNames} />;
      case "profile": return <ProfileScreen hasSkinID={hasSkinID} hasProfileInput={hasProfileInput} onOpenStores={openStoreLocator} onStartProfile={startMemoryProfile} />;
      default: return <HomeScreen hasSkinID={hasSkinID} carts={deviceCarts} ratios={ratios} connected={connected} batteryLevel={batteryLevel} onRequestPairing={openPairingSheet} onAdjustRatio={handleAdjustRatio} onSprayBlend={handleSprayBlend} onOpenRatioAssistant={() => setRatioAssistantOpen(true)} onOpenStores={openStoreLocator} memories={memories} setupSteps={setupSteps} onOpenProgressStep={handleOpenProgressStep} onOpenProfile={() => switchTab("profile")} />;
    }
  };

  const hasPopupOpen = Boolean(
    memoryComposerOpen ||
    pairingSheetOpen ||
    ratioAssistantOpen ||
    previewAccord ||
    deviceStatusAccord ||
    storeLocatorOpen ||
    exploreModalOpen
  );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
        .app-shell {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          min-height: 100dvh;
          background: #17130F;
          padding: 20px;
          font-family: ${sans};
        }
        .app-frame {
          width: 390px;
          height: 844px;
          border-radius: 48px;
          background: #F7F7F7;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0,0,0,0.48), inset 0 0 0 1px rgba(20,17,14,0.08);
        }
        .app-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.12;
          background-image:
            linear-gradient(90deg, rgba(20,17,14,0.05) 1px, transparent 1px),
            linear-gradient(rgba(20,17,14,0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          z-index: 0;
        }
        .app-frame > * {
          position: relative;
          z-index: 1;
        }
        .app-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 126px;
          height: 34px;
          background: #000;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          z-index: 50;
        }
        @media (max-width: 520px) {
          .app-shell {
            padding: 8px;
            align-items: center;
            background: #17130F;
          }
          .app-frame {
            width: min(390px, calc(100vw - 16px), calc((100dvh - 16px) * 390 / 844));
            height: auto;
            max-height: calc(100dvh - 16px);
            aspect-ratio: 390 / 844;
            border-radius: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(0,0,0,0.05);
          }
          .app-notch {
            width: 132px;
          }
        }
        @media (max-width: 520px) and (hover: none) and (pointer: coarse) {
          .app-shell {
            display: block;
            width: 100vw;
            min-height: 100svh;
            height: 100svh;
            padding: 0;
            background: #F7F7F7;
            overflow: hidden;
          }
          .app-frame {
            width: 100vw;
            height: 100svh;
            max-height: none;
            aspect-ratio: auto;
            border-radius: 0;
            box-shadow: none;
          }
          .app-notch {
            display: none;
          }
          .app-status-bar {
            display: none !important;
          }
          .ratio-assistant-surface {
            height: min(680px, calc(100svh - 84px)) !important;
            max-height: calc(100svh - 84px) !important;
          }
          .ratio-assistant-body {
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            padding-bottom: calc(18px + env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>
      <div className="app-shell">
        <div className="app-frame">
          <div className="app-notch" />
          <Toast message={toast} />
          <PairingSheet
            open={pairingSheetOpen}
            pairingState={pairingState}
            onClose={closePairingSheet}
            onConnect={handleConfirmPairing}
          />
          <RatioAssistantSheet
            open={ratioAssistantOpen}
            carts={deviceCarts}
            hasProfileInput={hasProfileInput}
            hasSkinID={hasSkinID}
            onClose={() => setRatioAssistantOpen(false)}
            onApply={handleApplySuggestedRatios}
          />
          <MemoryComposerSheet
            open={memoryComposerOpen}
            draft={memoryDraft}
            onChange={handleMemoryDraftChange}
            onClose={closeMemoryComposer}
            onSave={handleSaveMemoryComposer}
          />
          <Sheet
            title={previewAccord ? previewAccord.name : deviceStatusAccord ? deviceStatusAccord.name : ""}
            subtitle={previewAccord ? "Accord preview" : deviceStatusAccord ? "Device status" : ""}
            onClose={() => { setPreviewAccord(null); setDeviceStatusAccord(null); }}
          >
            {previewAccord ? (
              <div>
                {(() => {
                  const preview = getAccordPreview(previewAccord, hasSkinID);
                  const previewMatch = typeof previewAccord?.previewMatch === "number" ? previewAccord.previewMatch : previewAccord.match;
                  const previewLabel = previewAccord?.previewScoreLabel || (hasSkinID ? "Skin Fit" : "Profile Fit");
                  const fitSummary = hasSkinID
                    ? `${previewMatch}% skin fit`
                    : "Early profile preview";
                  const stageLabel = {
                    Opening: "First note",
                    Heart: "Middle note",
                    "Dry down": "Last note",
                  };
                  return (
                    <>
                      <p style={{ fontFamily: serif, fontSize: 16, color: P.charcoal, margin: 0, fontStyle: "italic", lineHeight: 1.45 }}>
                        {preview.title}
                      </p>
                      <div style={{ marginTop: 10, display: "flex", gap: 7, flexWrap: "wrap" }}>
                        <span style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(17,17,17,0.08)", color: P.charcoal, fontFamily: sans, fontSize: 10.5, fontWeight: 700 }}>
                          {fitSummary}
                        </span>
                        <span style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(17,17,17,0.06)", color: P.charcoal, fontFamily: sans, fontSize: 10.5, fontWeight: 700 }}>
                          Best for: {preview.wearMoment}
                        </span>
                      </div>
                      <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 14, background: "#FFFFFF", border: "1px solid rgba(17,17,17,0.14)" }}>
                        <p style={{ fontFamily: sans, fontSize: 10.5, color: P.warmGray, margin: 0, lineHeight: 1.55 }}>
                          {preview.impression}
                        </p>
                      </div>
                      <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
                        {preview.structure.map(item => (
                          <div key={item.stage} style={{ padding: "10px 10px", borderRadius: 14, background: "#FFFFFF", border: "1px solid rgba(17,17,17,0.14)", minHeight: 82 }}>
                            <p style={{ fontFamily: sans, fontSize: 8.5, color: P.gold, letterSpacing: 1.6, textTransform: "uppercase", margin: 0 }}>
                              {stageLabel[item.stage] || item.stage}
                            </p>
                            <p style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 760, color: P.charcoal, margin: "7px 0 0", lineHeight: 1.2 }}>
                              {item.note}
                            </p>
                            <p style={{ fontFamily: sans, fontSize: 9, color: P.warmGray, margin: "5px 0 0", lineHeight: 1.35 }}>
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                      {hasSkinID ? (
                        <div style={{ marginTop: 10 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: 1.4, textTransform: "uppercase", color: P.warmGray, margin: 0 }}>
                              {previewLabel} score
                            </p>
                            <p style={{ fontFamily: sans, fontSize: 11.5, fontWeight: 700, color: P.charcoal, margin: 0 }}>
                              {previewMatch}%
                            </p>
                          </div>
                          <div style={{ height: 4, borderRadius: 3, background: P.warmBeige, overflow: "hidden" }}>
                          <div style={{ width: `${previewMatch}%`, height: "100%", borderRadius: 3, background: P.gold }} />
                          </div>
                        </div>
                      ) : (
                        <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 14, background: "rgba(255,255,255,0.95)", border: "1px solid rgba(17,17,17,0.14)" }}>
                          <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: 0, lineHeight: 1.55 }}>
                            Visit a Decode counter to unlock exact Skin Fit scores.
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : null}
            {deviceStatusAccord ? (
              <div>
                {(() => {
                  const loadedIndex = deviceCarts.findIndex(cart => cart.name === deviceStatusAccord.name);
                  const loadedCart = loadedIndex >= 0 ? deviceCarts[loadedIndex] : null;
                  return loadedCart ? (
                    <div>
                      <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: 0, fontStyle: "italic" }}>
                        This cartridge is currently detected in the physical device.
                      </p>
                      <div style={{ marginTop: 12, padding: "12px 12px", borderRadius: 14, background: "#FFFFFF", border: "1px solid rgba(17,17,17,0.20)" }}>
                        <p style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Current hardware slot</p>
                        <p style={{ fontFamily: serif, fontSize: 16, color: P.charcoal, margin: "6px 0 0" }}>Slot {loadedIndex + 1} · {loadedCart.name}</p>
                        <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.7 }}>
                          Remaining cartridge level: {loadedCart.level}%. You can use it from the Home device controls.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontFamily: serif, fontSize: 15, color: P.charcoal, margin: 0, fontStyle: "italic" }}>
                        This accord is not currently loaded in the device.
                      </p>
                      <div style={{ marginTop: 12, padding: "12px 12px", borderRadius: 14, background: "#FFFFFF", border: "1px solid rgba(17,17,17,0.20)" }}>
                        <p style={{ fontFamily: sans, fontSize: 8, color: P.gold, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Physical swap required</p>
                        <p style={{ fontFamily: sans, fontSize: 10, color: P.warmGray, margin: "6px 0 0", lineHeight: 1.7 }}>
                          Cartridge changes happen on the physical device, not inside the app. Insert <span style={{ color: P.gold }}>{deviceStatusAccord.name}</span> into the hardware, then reconnect or sync the device so the app can read the new cartridge set.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : null}
          </Sheet>

          {screen === "splash" && <SplashScreen onEnter={() => setScreen("onboarding")} />}
          {screen === "onboarding" && <OnboardingScreen onComplete={() => setScreen("main")} />}
          {screen === "discover-entry" && <MemoryEntryScreen memories={memories} onDummyUpload={handleDummyUpload} onShowToast={setToast} onOpenStores={openStoreLocator} onComplete={() => setScreen("main")} />}
          {screen === "main" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
              <StatusBar />
              <div style={{ flex: 1, overflow: "hidden", opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(5px)" : "translateY(0)", transition: "all 0.15s ease-out" }}>
                {selectedMemory ? (
                  <MemoryDetailScreen
                    memory={selectedMemory}
                    accordLibrary={ACCORD_LIBRARY}
                    hasSkinID={hasSkinID}
                    onBack={() => setSelectedMemory(null)}
                    onOpenStores={openStoreLocator}
                    onPreviewAccord={handlePreviewAccord}
                  />
                ) : renderMain()}
              </div>
              {!selectedMemory && !hasPopupOpen && <TabBar active={activeTab} onChange={switchTab} />}
            </div>
          )}
          {storeLocatorOpen && <StoreLocatorScreen hasSkinID={hasSkinID} onBack={closeStoreLocator} onCompleteDecode={handleCompleteDecode} />}
        </div>
      </div>
    </>
  );
}
