# SleepTap

A personal, offline-capable sleep sound app. Dark-themed, background audio, sleep timer with fade-out.

## Quick Start

```bash
npm install
npx expo start
```

## Adding Sound Files

Replace the placeholder files in `assets/sounds/` with your own audio:

| File | Sound |
|------|-------|
| `drip.mp3` | Water dripping from a tap |
| `rain.mp3` | Gentle rain |
| `white_noise.mp3` | White noise |
| `ocean.mp3` | Ocean waves |
| `fireplace.mp3` | Crackling fireplace |
| `forest.mp3` | Forest at night |

Requirements:
- Format: MP3 or AAC
- Either 30+ minutes long, or a seamless 1-2 minute loop (the app loops automatically)
- Normalised to a comfortable volume

## Building

### Prerequisites

```bash
npm install -g eas-cli
eas login
```

### Android (APK)

```bash
eas build --profile preview --platform android
```

Downloads an `.apk` file you can share directly.

### iOS (TestFlight)

1. Set up an [Apple Developer account](https://developer.apple.com)
2. Update `eas.json` with your Apple Team ID and App Store Connect details
3. Run:

```bash
eas build --profile preview --platform ios
eas submit --platform ios
```

Then invite testers via TestFlight in App Store Connect.

## Background Audio (iOS)

Already configured in `app.json`:

```json
{
  "ios": {
    "infoPlist": {
      "UIBackgroundModes": ["audio"]
    }
  }
}
```

The app uses `expo-av` with `staysActiveInBackground: true` and `playsInSilentModeIOS: true`.

## Project Structure

```
sleep-tap/
├── app/                    # Screens (expo-router)
│   ├── _layout.tsx         # Root layout + providers
│   ├── index.tsx           # Sound list
│   └── now-playing.tsx     # Now playing (modal)
├── components/             # UI components
├── context/                # Audio state management
├── hooks/                  # Custom hooks (favorites, timer)
├── constants/              # Colors, sound metadata
└── assets/sounds/          # Audio files (replace placeholders)
```

## Offline

The app works fully offline. No network requests, no analytics, no sign-up. First launch works in airplane mode.
