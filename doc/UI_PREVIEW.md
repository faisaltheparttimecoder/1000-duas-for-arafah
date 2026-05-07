# UI Preview - 1000 Duas for Arafah

## 🎨 Visual Design Overview

### Color Palette

**Light Theme:**

```
Background:     #FBF9F4 (warm parchment)
Elevated:       #FFFFFF (white)
Surface:        #F4F0E8 (light tan)
Border:         #E8E2D4 (soft beige)
Text:           #1C1A14 (near-black)
Text Muted:     #6B6657 (warm gray)
Accent:         #2F5D4F (deep masjid green)
Accent Soft:    #E5EDE9 (light green tint)
```

**Dark Theme:**

```
Background:     #0E0F0D (almost-black)
Elevated:       #161815 (dark gray)
Surface:        #1A1C19 (charcoal)
Border:         #2A2D28 (dark border)
Text:           #ECE9E0 (off-white)
Text Muted:     #8F8B7E (muted tan)
Accent:         #7BB89C (lifted green)
Accent Soft:    #1F2D27 (dark green tint)
```

---

## 📱 Layout Structure

### Desktop View (1024px+)

```
┌─────────────────────────────────────────────────────────────────┐
│  [☰] 1000 Duas for Arafah    [🔍 Search]  [⊞⊟⊞]  [☾]          │ ← Top Bar
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                      │
│ Sections │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│          │  │ Dua #1   │  │ Dua #2   │  │ Dua #3   │         │
│ • Imaan  │  │          │  │          │  │          │         │
│ • Forgiv │  │ O Allah, │  │ O Allah, │  │ O Allah, │         │
│ • Health │  │ increase │  │ make me  │  │ let me   │         │
│ • Wealth │  │ me...    │  │ love...  │  │ taste... │         │
│ • Family │  └──────────┘  └──────────┘  └──────────┘         │
│ • Marria │                                                      │
│ • Work   │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│ • Akhira │  │ Dua #4   │  │ Dua #5   │  │ Dua #6   │         │
│ • Protec │  │          │  │          │  │          │         │
│ • Emotio │  │ O Allah, │  │ O Allah, │  │ O Allah, │         │
│ • Knowle │  │ keep my  │  │ grant me │  │ guide me │         │
│ ...      │  │ heart... │  │ sinceri..│  │ to...    │         │
│          │  └──────────┘  └──────────┘  └──────────┘         │
│          │                                                      │
│  280px   │                Main Content Area                    │
│          │                                                      │
└──────────┴──────────────────────────────────────────────────────┘
```

### Mobile View (<768px)

```
┌─────────────────────────────┐
│ [☰] 1000 Duas for Arafah  [🔍]  [☾]   │ ← Top Bar
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐   │
│  │ Dua #1              │   │
│  │                     │   │
│  │ O Allah, increase   │   │
│  │ me in Imaan and     │   │
│  │ make it firm in     │   │
│  │ my heart.           │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Dua #2              │   │
│  │                     │   │
│  │ O Allah, make me    │   │
│  │ love what You love  │   │
│  │ and hate what You   │   │
│  │ hate.               │   │
│  └─────────────────────┘   │
│                             │
│  Single Column              │
│  Stacked Cards              │
│                             │
└─────────────────────────────┘
```

---

## 🎴 View Modes

### 1. Cards View (Default)

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 1            │  │ 2            │  │ 3            │
│              │  │              │  │              │
│ O Allah,     │  │ O Allah,     │  │ O Allah,     │
│ increase me  │  │ make me love │  │ let me taste │
│ in Imaan and │  │ what You     │  │ the sweetness│
│ make it firm │  │ love and hate│  │ of faith.    │
│ in my heart. │  │ what You hate│  │              │
│              │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

- Grid layout (1-4 columns based on screen size)
- Hover: Lifts with subtle shadow
- Click: Opens modal

### 2. List View

```
┌────────────────────────────────────────────────────┐
│ 1    O Allah, increase me in Imaan and make it    │
│      firm in my heart.                             │
├────────────────────────────────────────────────────┤
│ 2    O Allah, make me love what You love and hate │
│      what You hate.                                │
├────────────────────────────────────────────────────┤
│ 3    O Allah, let me taste the sweetness of faith.│
├────────────────────────────────────────────────────┤
```

- Full-width rows
- Dense, information-rich
- Ideal for scrolling through sections

### 3. Table View

```
┌────┬──────────────────────────────────┬─────────────────┐
│ #  │ Dua                              │ Section         │
├────┼──────────────────────────────────┼─────────────────┤
│ 1  │ O Allah, increase me in Imaan   │ Imaan & Worship │
│    │ and make it firm in my heart.   │                 │
├────┼──────────────────────────────────┼─────────────────┤
│ 2  │ O Allah, make me love what You  │ Imaan & Worship │
│    │ love and hate what You hate.    │                 │
├────┼──────────────────────────────────┼─────────────────┤
│ 3  │ O Allah, let me taste the       │ Imaan & Worship │
│    │ sweetness of faith.             │                 │
└────┴──────────────────────────────────┴─────────────────┘
```

- Three columns with sticky header
- Striped rows (light mode)
- Click any row to open modal

---

## 🔍 Search Interface

### Search Bar (Top Right)

```
┌─────────────────────────────────┐
│ 🔍  Search duas...          [×] │
└─────────────────────────────────┘
```

### Active Search

```
┌─────────────────────────────────┐
│ 🔍  forgiveness              [×] │
└─────────────────────────────────┘

Results (47)
─────────────────────────────────

┌──────────────┐  ┌──────────────┐
│ 51           │  │ 52           │
│              │  │              │
│ O Allah,     │  │ O Allah, Your│
│ forgive all  │  │ mercy is vast│
│ my sins...   │  │ encompass... │
└──────────────┘  └──────────────┘
```

---

## 📖 Dua Modal

```
┌─────────────────────────────────────────────┐
│                                         [×] │
│                                             │
│              42                             │
│         IMAAN & WORSHIP                     │
│                                             │
│   O Allah, make my Imaan a light           │
│   that guides others.                      │
│                                             │
│                                             │
│  [Copy text]  [Share]      [←]  [→]       │
└─────────────────────────────────────────────┘
```

**Features:**

- Large, readable dua text (1.5rem serif)
- Dua number at top
- Section name in small caps
- Copy and Share buttons
- Previous/Next navigation
- Click outside to close
- `Esc` key to close
- Arrow keys to navigate

---

## 🎛️ Top Bar Controls

### View Switcher

```
┌─────────────┐
│ [⊞] [⊟] [⊞] │  ← Cards, List, Table
└─────────────┘
```

- Active view highlighted
- Instant switching
- Persists to localStorage

### Theme Toggle

```
[☾]  ← Click to cycle: System → Light → Dark → System
```

- Shows current theme icon
- Small dot indicator for "system" mode
- Smooth 200ms transition
- Persists to localStorage

---

## 📱 Mobile Sidebar

### Closed State

```
┌─────────────────────────────┐
│ [☰] 1000 Duas for Arafah  [🔍]  [☾]   │
└─────────────────────────────┘
```

### Open State

```
┌──────────────┐──────────────┐
│              │              │
│  Sections    │ [Backdrop]   │
│              │              │
│  • Imaan     │              │
│  • Forgive   │              │
│  • Health    │              │
│  • Wealth    │              │
│  • Family    │              │
│  ...         │              │
│              │              │
└──────────────┘──────────────┘
```

- Slides in from left
- Semi-transparent backdrop
- Click outside to close
- Smooth animation

---

## 🎨 Typography

### Fonts

- **UI Text:** System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- **Dua Text:** Georgia, 'Times New Roman', serif
- **Weights:** 400 (regular), 500 (medium), 600 (semibold)

### Sizes

- **Site Title:** 1.125rem (18px)
- **Section Headers:** 1.5rem (24px)
- **Card Dua Text:** 1.125rem (18px)
- **Modal Dua Text:** 1.5rem (24px)
- **Modal Number:** 2.5rem (40px)
- **Small Text:** 0.875rem (14px)

### Line Heights

- **UI:** 1.5
- **Dua Text:** 1.6 (more generous for readability)

---

## ✨ Interactions

### Hover States

- **Cards:** Lift 2px with subtle shadow
- **Buttons:** Background color change
- **Links:** Background highlight

### Focus States

- **All interactive elements:** 2px accent-colored outline
- **Offset:** 2px for clarity
- **Keyboard navigation:** Clearly visible

### Transitions

- **Duration:** 200ms (all)
- **Easing:** cubic-bezier(0.2, 0, 0, 1) for enters
- **Easing:** cubic-bezier(0.4, 0, 1, 1) for exits
- **Respects:** prefers-reduced-motion

---

## 🌙 Theme Comparison

### Light Theme Feel

- Warm, inviting
- Like reading from parchment
- Soft shadows for depth
- High contrast text

### Dark Theme Feel

- Calm, focused
- Easy on eyes at night
- No harsh whites
- Lifted green for accent

---

## 📐 Spacing System

```
4px   → Small gaps (pills, icons)
8px   → Compact spacing
12px  → Medium spacing
16px  → Standard padding
24px  → Section gaps
32px  → Large spacing
48px  → Modal padding (desktop)
64px  → Major sections
```

---

## 🎯 Visual Hierarchy

1. **Primary:** Dua text (largest, serif, high contrast)
2. **Secondary:** Section titles (semibold, medium size)
3. **Tertiary:** Dua numbers (accent color, tabular)
4. **Quaternary:** Metadata (small, muted color)

---

## 🖼️ Empty States

### No Search Results

```
┌─────────────────────────────┐
│                             │
│   No duas match that search.│
│                             │
└─────────────────────────────┘
```

- Centered, muted text
- No illustration (keeps it minimal)
- Clear, understated message

---

## 🎊 Toast Notifications

```
┌──────────┐
│ Copied   │  ← Appears at bottom center
└──────────┘
```

- Small, unobtrusive
- 2-second duration
- Slides up with fade
- Dark background, light text

---

## 🖨️ Print View

```
1000 Duas for Arafah

Imaan & Worship (1–50)

1. O Allah, increase me in Imaan and make it firm in my heart.
2. O Allah, make me love what You love and hate what You hate.
3. O Allah, let me taste the sweetness of faith.
...

Forgiveness & Mercy (51–100)

51. O Allah, forgive all my sins, major and minor.
...
```

- Strips all UI chrome
- Black text on white
- Numbered paragraphs
- Section headers
- Clean, readable

---

**This UI embodies:**

- Reverence
- Clarity
- Simplicity
- Accessibility
- Beauty in restraint

_May it serve its purpose well._
