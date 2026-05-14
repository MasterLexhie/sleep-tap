# Sleep Tap — UI Design Spec
> Visual reference for UI refresh · Dark brown iOS theme · v1.0

---

## 1. Colour Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#100c07` | App background — every screen |
| `surf` | `#1c1510` | Cards, list groups, player strip |
| `elev` | `#261d14` | Active/selected cards, pressed fills |
| `elev2` | `#30231a` | Track fills, inset elements |
| `acc` | `#c4844a` | Primary accent — buttons, active borders, fills |
| `accDim` | `#7a4e28` | Pressed accent state |
| `accGlow` | `#c4844a18` | Ripple ring borders (transparent accent) |
| `txtPrimary` | `#ede0cc` | All primary text |
| `txtSecondary` | `#8a7060` | Subtitles, values, secondary labels |
| `txtTertiary` | `#4a3e32` | Section headers, hints, disabled |
| `bdr` | `#2e2318` | Default border on all cards/groups |
| `bdr2` | `#3d2e20` | Elevated border (orb, icon wraps) |
| `success` | `#5ab060` | "Enabled / Always on" text |
| `successBg` | `#0d2010` | Success badge background |
| `successBdr` | `#2a5030` | Success badge border |

### Per-sound icon colours

| Sound | Icon background | Icon colour |
|-------|----------------|-------------|
| Water Drip | `#2e1e0e` | `#c4844a` |
| Rain | `#0e1a14` | `#3db890` |
| White Noise | `#1a1a14` | `#a09878` |
| Ocean | `#0e1420` | `#4a90d8` |
| Fireplace | `#241008` | `#e07830` |
| Forest Night | `#0c180c` | `#5ab060` |

---

## 2. Typography

Font: **system font** (`-apple-system` / SF Pro). No custom font import needed.

| Role | Size | Weight | Colour | Notes |
|------|------|--------|--------|-------|
| Eyebrow | 12 | 400 | `txtTertiary` | Above large titles |
| Large title | 26 | 700 | `txtPrimary` | Letter spacing −0.4 |
| Section header | 11 | 600 | `txtTertiary` | UPPERCASE, letter spacing +0.07 |
| Card title | 13 | 600 | `txtPrimary` | Active state: `acc` |
| Card subtitle | 10 | 400 | `txtSecondary` | margin-top 1 |
| List label | 13 | 500 | `txtPrimary` | Main row text |
| List value | 12 | 400 | `txtSecondary` | Right-side value |
| Body / strip name | 14 | 600 | `txtPrimary` | Player strip sound name |
| Body sub | 11 | 400 | `txtSecondary` | Player strip status |
| Timer big | 40 | 700 | `txtPrimary` | Inside SVG ring, letter spacing −1 |
| Timer unit | 13 | 400 | `txtSecondary` | "minutes" / "endless" below number |
| Badge | 10 | 500 | varies | see badge spec |
| Hint | 11 | 400 | `txtTertiary` | Centred, below list content |

---

## 3. Spacing & Radius

### Spacing

| Token | Value | Used for |
|-------|-------|----------|
| `xs` | 4px | Tight gaps (text-to-badge) |
| `sm` | 6px | Chip gaps, small internal gaps |
| `md` | 8px | Card grid gap, row dividers |
| `base` | 10px | Card internal padding (small) |
| `lg` | 12px | Row padding, strip internal |
| `xl` | 14px | Row horizontal padding |
| `page` | 22px | Horizontal screen margin |

### Border radius

| Token | Value | Used for |
|-------|-------|----------|
| `sm` | 8px | Icon wraps, small elements |
| `md` | 12px | Badges |
| `chip` | 18px | Timer chips |
| `card` | 16px | Sound cards, list groups |
| `strip` | 20px | Player strip |
| `hero` | 24px | Hero card (if used) |
| `pill` | 50% | Circular buttons (orb, play button) |

### Borders

- Default card/group border: `1px solid #2e2318`
- Active/selected border: `1px solid #c4844a`
- Elevated element border: `1px solid #3d2e20`
- No drop shadows anywhere — depth via background colour steps only

---

## 4. Animation Values

| Property | Value | Used for |
|----------|-------|----------|
| Ripple duration | 2800ms | Orb ring pulse loop |
| Ripple stagger | 900ms | Delay between each ring |
| Ripple scale | 0.85 → 1.45 | Ring grow animation |
| Ripple opacity | 0.4 → 0 | Ring fade animation |
| Icon breathe scale | 1.0 → 1.06 | Splash icon pulse |
| Icon breathe duration | 3000ms | ease-in-out, infinite |
| Fade in | 250ms | Text cross-fades |
| Press scale | 0.97 | Active/tap state on buttons |
| Audio fade-out | 3000ms | Volume taper on timer end |
| Timer ring update | 400ms | Arc stroke-dashoffset transition |
| Splash bar | 2400ms | Progress bar fill (ease cubic-bezier) |

---

## 5. Component Specs

---

### 5.1 Player Strip

Compact now-playing bar at the top of the Sleep screen.

```
┌─────────────────────────────────────────────┐
│  ●    Sound Name              ▶ / ⏸         │
│       Now playing · looping                 │
└─────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `surf` |
| Border | `1px bdr` |
| Border radius | 20px |
| Padding | 11px 14px |
| Horizontal margin | 16px |
| Gap between elements | 11px |

**Orb (left):**
- Size: 46 × 46px, circular
- Background: `elev`, border: `1px bdr2`
- Icon: 19px, colour from active sound token
- 2 ripple rings: sizes 46 & 62, border `accGlow`, animated (see §4)

**Text block (middle):**
- Sound name: 14px / 600 / `txtPrimary`
- Status sub: 11px / 400 / `txtSecondary`

**Play button (right):**
- Size: 40 × 40px, circular
- Background: `acc`
- Icon: 17px, white
- Pressed: background `accDim`, scale 0.97

---

### 5.2 Sound Card

Two-column grid. Tapping selects sound and starts playback.

```
┌──────────────────┐
│  [icon wrap]     │
│                  │
│  Sound Name      │
│  Subtitle        │
└──────────────────┘
```

| Property | Value |
|----------|-------|
| Background (default) | `surf` |
| Background (active) | `elev` |
| Border (default) | `1px bdr` |
| Border (active) | `1px acc` |
| Border radius | 16px |
| Padding | 9px 11px 8px |
| Grid gap | 8px |
| Grid horizontal margin | 16px |

**Icon wrap:**
- Size: 28 × 28px
- Border radius: 8px
- Background + icon colour: per-sound table in §1
- Icon size: 14px
- Margin bottom: 5px

**Text:**
- Name: 12px / 600 / `txtPrimary` (active: `acc`)
- Subtitle: 10px / 400 / `txtSecondary`, margin-top 1px

---

### 5.3 Timer Chip

Horizontal scrolling row of preset durations. One active at a time.

| Property | Default | Active |
|----------|---------|--------|
| Background | `surf` | `elev` |
| Border | `1px bdr` | `1px acc` |
| Text colour | `txtSecondary` | `acc` |
| Font | 12px / 500 | 12px / 500 |
| Border radius | 18px | 18px |
| Padding | 6px 13px | 6px 13px |

Row: horizontal scroll, gap 6px, padding 0 16px, no scrollbar visible.

Labels: `15 min` · `30 min` · `45 min` · `60 min` · `Endless`

---

### 5.4 Volume Slider

```
  🔈  ━━━━━━━━━━━●━━━━  🔊
```

| Property | Value |
|----------|-------|
| Track height | 3px |
| Track background | `elev2` |
| Filled track colour | `acc` |
| Thumb size | 14 × 14px, circular, white |
| Padding | 10px 22px 0 |
| Icon colour (left) | `txtTertiary` |
| Icon colour (right) | `acc` |

---

### 5.5 List Group & List Row

Rounded container grouping related settings rows.

**Group:**
- Background: `surf`
- Border: `1px bdr`
- Border radius: 16px
- Horizontal margin: 16px
- Overflow: hidden (clips row separators at edges)
- Row divider: `1px bdr` between rows (not after last row)

**Row layout:**
```
  [icon wrap]  Label text         Value text  ›
```

| Property | Value |
|----------|-------|
| Row padding | 11px 14px |
| Gap | 10px |
| Icon wrap size | 30 × 30px |
| Icon wrap radius | 8px |
| Icon size | 15px |
| Label | 13px / 500 / `txtPrimary` |
| Value | 12px / `txtSecondary` |
| Chevron | 13px / `txtTertiary` |

**Right-side element types:**
- Value + chevron → navigates to sub-screen
- `<Toggle>` → boolean
- `<Badge>` → status display only

---

### 5.6 Toggle

```
  Inactive:  ● ───────    Background: elev2
  Active:    ─────── ●    Background: acc
```

| Property | Value |
|----------|-------|
| Width | 42px |
| Height | 24px |
| Border radius | 12px |
| Thumb | 20 × 20px, white, circular |
| Thumb margin | 2px from edge |
| Active background | `acc` |
| Inactive background | `elev2` |

Animate thumb position with a spring (or 200ms ease) on state change.

---

### 5.7 Badge

Inline status indicator. Not tappable.

**Green variant** (offline, enabled):
- Background: `successBg` (`#0d2010`)
- Text: `success` (`#5ab060`)
- Border: `1px successBdr` (`#2a5030`)

**Brown variant** (info):
- Background: `elev`
- Text: `acc`
- Border: `1px bdr2`

Both: border radius 8px, padding 3px 8px, font 10px / 500.

---

### 5.8 Favourite Row

Full-width list row used on the Favourites screen.

```
  [icon 38×38]   Sound Name          ♥  or  ›
                 Subtitle / timestamp
```

| Property | Value |
|----------|-------|
| Icon wrap size | 38 × 38px |
| Icon wrap radius | 11px |
| Icon size | 17px |
| Row padding | 10px 14px |
| Gap | 11px |
| Name | 13px / 600 / `txtPrimary` |
| Sub | 11px / `txtSecondary`, margin-top 1px |
| Heart icon | `acc`, 17px |
| Chevron | `txtTertiary`, 14px |

Row divider: `1px bdr` (not after last row). Grouped in `ListGroup` container.

---

### 5.9 Timer Ring (SVG)

Centred SVG drawn with `react-native-svg`.

```
         ╭──────────╮
        /   30        \
       │   minutes    │
        \             /
         ╰──────────╯
```

| Property | Value |
|----------|-------|
| SVG canvas | 200 × 200 viewBox |
| Rendered size | 192 × 192px |
| Ring radius | 72 |
| Ring stroke width | 11px |
| Track colour | `elev` (`#261d14`) |
| Progress colour | `acc` (`#c4844a`) |
| Stroke cap | round |
| Circumference | ≈ 452px (2π × 72) |
| Inner fill circle | radius 55, fill `#171210` |
| Rotation offset | −90° (start arc at top) |

**Stroke dash calculation:**
```
strokeDasharray  = 452
strokeDashoffset = 452 × (1 − progress)

progress = selectedMinutes / 60
  e.g. 30 min → progress 0.5 → offset 226
  e.g. endless → progress 1.0 → offset 0 (full ring)
```

**Labels (centred in ring):**
- Large number: 40px / 700 / `txtPrimary`, y = 93
- Unit text: 13px / `txtSecondary`, y = 111
- Hint: 10px / `txtTertiary`, y = 127, "fades out at end"

Animate `strokeDashoffset` on chip change: 400ms, ease-out cubic.

---

### 5.10 Start Timer Button

Full-width primary CTA at the bottom of the Timer screen.

| Property | Value |
|----------|-------|
| Background | `acc` |
| Border radius | 16px |
| Padding | 14px vertical |
| Horizontal margin | 16px |
| Label | "Start timer" / "Cancel timer" |
| Font | 15px / 600 / white |
| Pressed background | `accDim` |

---

### 5.11 Section Header

```
  SOUNDS
```

| Property | Value |
|----------|-------|
| Font | 11px / 600 / `txtTertiary` |
| Case | UPPERCASE |
| Letter spacing | +0.07em |
| Padding | 8px 22px 5px (top, horizontal, bottom) |

---

### 5.12 Tab Bar

4 tabs across the bottom.

| Tab | Icon | Label |
|-----|------|-------|
| 0 | moon | Sleep |
| 1 | heart | Favourites |
| 2 | clock | Timer |
| 3 | gear / settings | Settings |

| Property | Value |
|----------|-------|
| Background | `bg` |
| Top border | `1px bdr` |
| Icon size | 21px |
| Label size | 10px / 500 |
| Inactive colour | `txtTertiary` |
| Active colour | `acc` |
| Item padding | 3px 14px |
| Gap (icon to label) | 3px |

---

## 6. Screen-by-Screen Layout

---

### 6.1 Splash Screen

Full screen, no tab bar.

```
─────────────────────────
         (flex: 1, centred vertically)

    [Orb + 4 ripple rings]    ← vertical centre − ~30px
         ↕ margin-bottom: 36px

    Sleep Tap                 30px / 700 / txtPrimary
    sounds for a quiet mind   14px / txtTertiary, margin-top 6px

         ↕ (flex pushes to bottom)

    [Progress bar 120×2px]    ← bottom: 72px
    Loading sounds…           11px / txtTertiary, margin-top 12px
─────────────────────────
[Home indicator area]
```

**Orb:**
- Size: 88 × 88px, circular
- Background: `#1a1208`, border: `1.5px bdr2`
- Icon: 38px, `acc`
- 4 ripple rings: radii 44, 58, 72, 86 (from centre)
- Animation: see §4 ripple values

**Progress bar:**
- Container: 120 × 2px, background `elev`, radius 1px
- Fill: `acc`, animates 0% → 100% over 2400ms

**Loading copy sequence (every ~700ms):**
1. Loading sounds…
2. Preparing loops…
3. Almost ready…
4. Welcome back

**Transition out:** fade whole screen to `bg` over 300ms then show main app.

---

### 6.2 Sleep Screen

```
─────────────────────────
  Good night              ← eyebrow
  Sleep Tap               ← large title
  [margin 6px 22px 8px]
─────────────────────────
  [PlayerStrip]           ← margin 0 16px 8px
─────────────────────────
  SOUNDS                  ← section header
  [SoundCard × 6]         ← 2-col grid, padding 0 16px
─────────────────────────
  SLEEP TIMER             ← section header, padding-top 10px
  [TimerChip × 5]         ← horizontal scroll
─────────────────────────
  [VolumeSlider]          ← padding 10px 22px 0
─────────────────────────
[TabBar]
```

**Sound cards order:** Water Drip · Rain · White Noise · Ocean · Fireplace · Forest Night

**Default state:** Water Drip selected, not playing.

---

### 6.3 Favourites Screen

```
─────────────────────────
  Your collection         ← eyebrow
  Favourites              ← large title
─────────────────────────
  PINNED                  ← section header
  [ListGroup]
    [FavouriteRow] × pinned sounds  ← heart icon right
─────────────────────────
  RECENTLY PLAYED         ← section header
  [ListGroup]
    [FavouriteRow] × recent sounds  ← chevron right, timestamp sub
─────────────────────────
  "Hold any sound card to pin it here"  ← hint, centred, padding 8px 24px
─────────────────────────
[TabBar]
```

**Empty pinned state:**
- Icon: heart, 40px, `txtTertiary`, centred
- Text: "No favourites yet" — 15px / `txtSecondary`
- Sub: "Hold any sound on the Sleep tab to pin it here." — 13px / `txtTertiary`
- Button: "Go to Sleep" — `acc`, 14px / 500

---

### 6.4 Timer Screen

```
─────────────────────────
  Wind-down               ← eyebrow
  Timer                   ← large title
─────────────────────────
  [TimerRing 192×192]     ← centred, padding-top 6px
─────────────────────────
  [TimerChip × 5]         ← centred, labels: 15 · 30 · 45 · 60 · ∞
  (justify: centre)
─────────────────────────
  OPTIONS                 ← section header, padding-top 10px
  [ListGroup]
    Fade out on stop       [Toggle: on by default]
    Fade duration          3 sec  ›
─────────────────────────
  [StartTimerButton]      ← margin 0 16px, label "Start timer"
─────────────────────────
[TabBar]
```

**Timer active state:**
- Button label changes to "Cancel timer"
- Ring `strokeDashoffset` decrements each second
- Ring centre number shows `MM:SS` countdown instead of `30`

**On expiry:**
- Audio fades to 0 over 3000ms
- Toast / banner: "Timer ended"
- Ring resets to selected duration

---

### 6.5 Settings Screen

```
─────────────────────────
  Preferences             ← eyebrow
  Settings                ← large title
─────────────────────────
  PLAYBACK                ← section header
  [ListGroup]
    🔊 Default volume      65%  ›
    〰 Fade out duration   3 sec  ›
    🎧 Background audio    [Badge: Enabled]
─────────────────────────
  TIMER                   ← section header
  [ListGroup]
    🕐 Default duration   30 min  ›
    ∞  Endless by default  [Toggle: off]
─────────────────────────
  ABOUT                   ← section header
  [ListGroup]
    ℹ  Version             1.0.0 MVP
    ⊘  Offline mode        [Badge: Always on]
    ✕  No account needed   [Checkmark icon, acc colour]
─────────────────────────
[TabBar]
```

**Icon specs per row:**

| Row | Icon bg | Icon colour |
|-----|---------|-------------|
| Default volume | `#2e1e0e` | `acc` |
| Fade out | `elev` | `txtSecondary` |
| Background audio | `elev` | `txtSecondary` |
| Default duration | `#2e1e0e` | `acc` |
| Endless by default | `elev` | `txtSecondary` |
| Version | `elev` | `txtSecondary` |
| Offline mode | `successBg` | `success` |
| No account | `successBg` | `success` |

---

## 7. Interaction States

| Element | Default | Pressed | Active/Selected |
|---------|---------|---------|-----------------|
| Sound card | `surf` bg, `bdr` border | `elev` bg | `elev` bg, `acc` border |
| Timer chip | `surf` bg, `bdr` border | `elev` bg | `elev` bg, `acc` border, `acc` text |
| Play button | `acc` bg | `accDim` bg, scale 0.97 | — |
| Start timer btn | `acc` bg | `accDim` bg, scale 0.97 | — |
| List row (tappable) | no bg change | `elev` bg | — |
| Favourite row | no bg change | `elev` bg | — |
| Tab item | `txtTertiary` | — | `acc` |

---

## 8. iOS System Chrome

- Status bar: **light content** (white time, icons)
- Tab bar: no blur — flat `bg` background
- Home indicator: system default (appears automatically)
- Orientation: **portrait only**
- Dark mode: this **is** the dark mode — `UIUserInterfaceStyle: Dark`
- No network permission requested
- `UIBackgroundModes: audio` must be set for lock-screen playback
