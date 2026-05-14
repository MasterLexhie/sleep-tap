# Sleep Tap – MVP Product Requirements Document  
**Version:** 1.0  
**Target Platforms:** iOS (primary) & Android  
**Purpose:** Provide a personal, offline-capable sleep sound app for a single user (the recipient), featuring a water drip sound and additional sleep aids.

---

## 1. Project Goal
Build a private, cross-platform mobile application that plays high-quality, looping sleep sounds (especially a “water dripping from a tap” sound). The app must work completely offline, include a sleep timer, and have a calm, dark-themed UI built to exactly match provided Figma design images. It will be distributed directly to one person, not through the public app stores.

---

## 2. User Story
*As someone who struggles to fall asleep without the sound of a dripping tap, I want to open a simple app, start my favorite sound, set a timer, and drift off, even when my phone is offline and the screen is locked.*

---

## 3. Core Features (MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| **Sound playback** | Loop the “tap drip” sound and at least 5 other sleep sounds (rain, white noise, ocean waves, fireplace, forest night). All audio files must be bundled locally. | P0 |
| **Play / Stop control** | A prominent play/pause button that starts or stops the currently selected sound. | P0 |
| **Sound selection** | A scrollable list or grid of sound cards. Tapping a card selects that sound and starts playback. | P0 |
| **Sleep timer** | A countdown timer (selectable from preset options: 15, 30, 45, 60 minutes, or “endless”). When the timer expires, playback fades out and stops. | P0 |
| **Background audio** | Playback continues when the app is minimised or the phone is locked. On iOS, this must be done correctly to survive screen lock. | P0 |
| **Offline mode** | All functionality works without any internet connection. No sign‑up, no streaming, no analytics. | P0 |
| **Dark interface** | Entire UI uses a dark, sleep‑friendly colour palette (deep greys, muted highlights). No bright white elements. | P0 |
| **Volume control** | A simple slider or hardware volume button integration. | P1 |
| **Fade‑out on timer end** | Instead of abruptly stopping, the sound fades out over ~3 seconds when the timer ends. | P1 |

**Out of scope for MVP:** user accounts, cloud sync, additional ambient layers, multiple playlists, alarms, or social features.

---

## 4. UI / UX Inspiration (Figma Designs)
- **Figma design files (or exported high‑fidelity images)** will be provided separately as the direct visual blueprint for the app.
- The AI agent must reference these designs to implement **pixel‑perfect UI components**, following the exact:
  - Layout structure and spacing
  - Colour palette (dark, sleep‑friendly tones)
  - Typography (font families, sizes, weights)
  - Component styles (buttons, cards, sliders, timer chips)
  - Any imagery or icons used
- Adapt the designs to a mobile‑friendly layout with:
  - A large cover‑image or sound‑icon area
  - Clearly tappable sound selection cards
  - A bottom or top control bar with play/pause button
  - Timer selector integrated seamlessly (e.g., a row of preset chips)
- The app should work in **portrait mode** only. Landscape support is not required.

---

## 5. Technical Requirements
- **Framework:** React Native (with Expo for easy building) **or** Flutter. Choose the one best suited for rapid cross‑platform development and robust background audio support.
- **Audio playback:** Use the framework’s best background‑audio library.
  - React Native: `expo-av` (with `staysActiveInBackground: true`)
  - Flutter: `just_audio` + `audio_service`
- **Audio file format:** MP3 (or AAC) files, bundled as assets. Ensure all loops are **seamless** (no clicks at join).
- **State management:** Keep it simple (React Context / Provider or Flutter’s `setState`/Provider).
- **Storage:** No external storage required. All sounds are pre‑loaded assets.
- **Offline guarantee:** The app must never attempt network requests (except optional future updates). The first launch should work in airplane mode.

---

## 6. Sound Assets Requirement
- **Primary sound:** `drip.mp3` – A slow, steady water droplet hitting a surface (e.g., kitchen sink tap dripping).
- **Additional sounds (minimum 5):** `rain.mp3`, `white_noise.mp3`, `ocean.mp3`, `fireplace.mp3`, `forest.mp3`.
- All files must be:
  - At least 30 minutes long **or** a seamless 1–2 minute loop that the app loops indefinitely.
  - Normalised to a comfortable volume.
  - Provided by the developer (the AI agent should create placeholders or note where to obtain them). For this PRD, assume the user will supply the files; the agent should define where to place them in the asset folder.

---

## 7. Offline Behavior & Requirements
- The app must launch and function fully with **no internet connection**.
- No network permission should be requested on Android/iOS.
- The app should not show any “No Connection” errors because no connectivity is needed.
- Installation must be done via **TestFlight** (or ad‑hoc) without App Store deployment.

---

## 8. User Acceptance Criteria (UAC)
These are the pass/fail checks the AI agent must guarantee before considering the MVP complete.

| # | Criteria | How to Verify |
|---|----------|---------------|
| 1 | **Offline launch** | Turn on airplane mode. Install and open app. All screens load, no errors. |
| 2 | **Play primary sound** | Tap the “Water Drip” card. Sound begins to loop. No noticeable gap between loops. |
| 3 | **Stop playback** | Tap the stop button. Sound stops immediately. |
| 4 | **Switch sounds** | While playing drip, tap “Rain”. Drip fades/stops and rain starts looping. |
| 5 | **Background playback** | Start a sound, lock the phone. Sound continues playing. Unlock, UI still responsive. |
| 6 | **Timer – auto stop** | Set timer to 1 minute (for testing). Play a sound. After 1 minute, sound fades out and stops completely. App shows timer expired state. |
| 7 | **Timer – endless** | Select “endless” timer. Sound plays indefinitely until manually stopped. |
| 8 | **UI matches Figma designs** | Compare the built UI side‑by‑side with the provided Figma images. Layout, colours, spacing, typography, and components are visually consistent. |
| 9 | **Dark theme** | No screen has a white or bright background. All text/controls are legible in low light. |
| 10 | **Works on both platforms** | Build and run on a real iOS device (via TestFlight) and an Android device. All criteria pass on both. |
| 11 | **No crashes** | Operate the app for 5 minutes, switching sounds, setting timers, backgrounding. No crashes. |
| 12 | **Audio fade out** | When the sleep timer ends, the volume drops smoothly to zero over about 3 seconds, not abruptly. |

---

## 9. Deliverables from AI Agent
1. Complete source code, well‑structured and commented.
2. A `README.md` explaining:
   - How to add sound files (directory, naming convention).
   - How to build the project (`eas build`, `flutter build`, etc.).
   - How to configure background audio capabilities (Info.plist for iOS, Android manifest).
3. A debug build (or instructions to generate one) for immediate TestFlight / APK sharing.
4. The project must include all necessary native configurations for background audio and offline support.
5. A visual walkthrough or screenshots showing the implemented UI against the Figma designs.

---

## 10. Distribution Note
The final app will be shared privately via **Apple TestFlight** (iOS) and an **APK file** (Android). Therefore, the project must be configured for **ad‑hoc / TestFlight builds**, not for App Store / Play Store submission.

**End of PRD**  
*Use this document as the complete requirements specification. All acceptance criteria must be met for the MVP to be considered delivered.*