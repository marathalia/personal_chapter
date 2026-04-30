# Source Map

This prototype is organized around a small set of stable barrel files so app code can stay easy to scan while individual features live in focused modules.

## Entry Points

- `main.jsx` mounts the React app.
- `ReplicaPersonalChapter.jsx` owns app-wide state, navigation, overlays, and cross-screen actions.

## Shared Design

- `theme.js` holds color and typography tokens used by the inline styles.
- `styles.css` contains global page reset and Vite-level styling.
- `data/catalog.js` contains static memories, accord data, store locations, and shop items.
- `logic/scent.js` is the public barrel for scent-related logic.
- `logic/accordBackgrounds.js` creates accord and memory visual backgrounds.
- `logic/accordPreview.js` builds the accord preview sheet content.
- `logic/blendLab.js` scores three-accord blends.
- `logic/memoryAnalysis.js` maps memories to recommended accords and wear analysis.
- `logic/olfactiveMap.js` maps device cartridges into live olfactive layers.
- `logic/ratioAssistant.js` contains the ratio assistant survey and scoring model.

## Components

- `components/appComponents.jsx` is the public barrel for shared components.
- `components/base/` contains reusable UI primitives and cards.
- `components/sheets/` contains modal and bottom-sheet surfaces.
- `components/figures/` contains decorative device/runway illustrations.
- `components/guidance/` contains guided setup components.

## Screens

- `screens/appScreens.jsx` is the public barrel for screens.
- `screens/welcome/` contains splash, onboarding, and memory-entry flows.
- `screens/home/` contains the Home tab.
- `screens/memory/` contains memory list and detail screens.
- `screens/explore/` contains Explore and Lab.
- `screens/profile/` contains Profile, Shop, and Store Locator.
- `screens/blend/` and `screens/legacy/` hold older screen surfaces that are still exported for compatibility.

When adding a new screen or shared component, place it in the closest feature folder and export it through the matching barrel only if another module needs it.
