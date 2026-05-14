# CLAUDE.md

## Project Overview

**SleepTap** is a personal offline sleep sound app built with React Native and Expo. It plays looping ambient sounds (rain, ocean, fireplace, etc.) with a sleep timer, volume control, and favorites. Fully offline — all audio files are bundled `.wav` assets. Dark brown theme only, iOS-first with portrait lock.

## Tech Stack

| Category       | Technology                                          |
| -------------- | --------------------------------------------------- |
| Language       | TypeScript 5.9+                                     |
| Framework      | React Native 0.81 + Expo SDK 54 (New Architecture)  |
| Routing        | expo-router 6 (file-based, Tab + Stack navigator)   |
| Audio          | expo-audio (`createAudioPlayer`, background + silent mode) |
| Animation      | react-native-reanimated 4 + react-native-svg        |
| Haptics        | expo-haptics                                        |
| Persistence    | @react-native-async-storage/async-storage           |
| Icons          | @expo/vector-icons (Ionicons)                       |
| Package Manager| npm                                                 |

## Commands

```bash
npm start          # Start Expo dev server
npm run ios        # Start on iOS simulator
npm run android    # Start on Android emulator
```

## Project Structure

```
sleep-tap/
├── app/
│   ├── _layout.tsx            # Root layout — AudioProvider + splash overlay
│   └── (tabs)/
│       ├── _layout.tsx        # Tab navigator (Sleep, Favourites, Timer, Settings)
│       ├── index.tsx          # Sleep screen (sound grid, player strip, timer chips, volume)
│       ├── favourites.tsx     # Favourites screen (pinned + recently played)
│       ├── timer.tsx          # Timer screen (SVG ring, chips, options, start button)
│       └── settings.tsx       # Settings screen (playback, timer, about list groups)
├── components/
│   ├── Badge.tsx              # Inline status badge (success/info variants)
│   ├── FavouriteRow.tsx       # Full-width list row for favourites
│   ├── ListGroup.tsx          # Rounded container grouping ListRow items
│   ├── ListRow.tsx            # Settings-style row (icon, label, value/right element)
│   ├── PlayerStrip.tsx        # Compact now-playing bar with orb + ripple rings
│   ├── SectionHeader.tsx      # Uppercase section label
│   ├── SoundCard.tsx          # 2-column grid card with icon wrap
│   ├── SplashScreen.tsx       # Animated splash (orb, ripples, progress bar)
│   ├── StartTimerButton.tsx   # Full-width CTA for timer start/cancel
│   ├── TimerChips.tsx         # Horizontal scrolling timer preset chips
│   ├── TimerRing.tsx          # SVG circular progress ring with labels
│   ├── Toggle.tsx             # Animated boolean switch
│   └── VolumeSlider.tsx       # Horizontal volume slider
├── constants/
│   ├── colors.ts              # Design tokens (dark brown warm palette)
│   └── sounds.ts              # SOUNDS array, SoundItem type, TIMER_PRESETS
├── context/
│   └── AudioContext.tsx        # Audio state (useReducer) + expo-audio player + recently played tracking
├── hooks/
│   └── useFavorites.ts        # AsyncStorage-backed favorites (Set<string>)
└── assets/
    └── sounds/                # Bundled .wav files (drip, rain, white_noise, ocean, fireplace, forest)
```

## Architecture

### State Management

- **AudioContext** — single React context using `useReducer` for all playback state: current sound, playing status, volume, sleep timer, and recently played history. Wraps the entire app at the root layout level.
- **useFavorites** — standalone hook with `AsyncStorage` persistence. Long-press a sound card on the Sleep tab to pin as favourite.
- No external state library. Keep state in context + hooks.

### Audio Playback

- Uses `expo-audio` `createAudioPlayer` — not the older `expo-av` API.
- Players are created per sound selection, stored in a `useRef`. Previous player is `.remove()`d before creating a new one.
- Audio mode: `playsInSilentMode: true`, `shouldPlayInBackground: true`.
- All sounds loop (`player.loop = true`).

### Sleep Timer

- Timer presets: 15 min, 30 min, 45 min, 60 min, and Endless (0).
- Countdown runs via `setInterval` dispatching `TICK_TIMER` every second.
- When timer hits 0, a 3-second fade-out (`fadeOutAndStop`) gradually reduces volume before stopping.
- Timer has a dedicated tab with SVG ring visualization and start/cancel button.

### Navigation

- 4-tab layout: Sleep, Favourites, Timer, Settings.
- Tab bar: flat `bg` background, `bdr` top border, `acc` active tint.
- Root layout renders a Stack containing the `(tabs)` group.
- Custom splash screen renders as an overlay on top of the tab navigator, fades out after 3 seconds.

## UI Spec

UI design spec is in `sleep-tap-ui-spec.md`. All visual changes must reference it.

## Design System

- **Dark brown warm palette** — background `#100c07`, surfaces `#1c1510`, elevated `#261d14`.
- **Accent**: `#c4844a` (warm amber). Used for active states, timer ring, play buttons, selected chips.
- **Accent dim**: `#7a4e28` for pressed states.
- Each sound has unique `iconBg` + `iconColor` for its card and row icon wrap.
- All colors defined in `constants/colors.ts` — import from `Colors` object, don't hardcode hex values.
- Haptic feedback on all interactive elements (`expo-haptics`).
- No drop shadows — depth via background colour steps only.
- Borders: `1px bdr` on cards/groups, `1px acc` on active/selected, `1px bdr2` on elevated elements.

## Code Conventions

- Function components only, exported as named exports for components. Screen files use default exports.
- `StyleSheet.create` for all styles, colocated at the bottom of each file.
- Path aliases: `@/*`, `@components/*`, `@context/*`, `@hooks/*`, `@constants/*` — but most imports currently use relative paths.
- Accessibility: `accessibilityLabel` and `accessibilityRole` on all interactive `Pressable` elements.
- Reanimated plugin is listed last in `babel.config.js` (required by reanimated).
- Metro config extends default with `.wav` added to `assetExts`.

## Important Notes

1. **EAS submit config is placeholder** — `eas.json` has `YOUR_APPLE_ID` / `YOUR_ASC_APP_ID` / `YOUR_TEAM_ID` that need real values before submitting to App Store.
2. **No test suite** — no tests exist yet.
3. **Single-sound playback** — only one sound plays at a time. No sound mixing/layering.
4. **Sound catalog is static** — all sounds are in `constants/sounds.ts` with bundled `.wav` files. Adding a sound requires adding the file to `assets/sounds/` and a new entry in the `SOUNDS` array.
5. **Settings screen is display-only** — values are hardcoded for MVP. Toggles and navigation rows are wired visually but not yet persisted.
