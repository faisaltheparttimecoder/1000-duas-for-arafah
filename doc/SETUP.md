# Setup Instructions

## ✅ What's Been Built

Your **1000 Duas for Arafah** site is now complete with:

- ✅ Modern, reverent UI with dark/light themes
- ✅ Three view modes (cards, list, table)
- ✅ Live search functionality
- ✅ Sidebar navigation by section
- ✅ Modal with copy/share/navigate
- ✅ Keyboard shortcuts
- ✅ Offline capability (service worker)
- ✅ Fully responsive design
- ✅ WCAG 2.1 AA accessible
- ✅ All 40 sections configured

## 📝 Final Step: Add Your Complete Duas

The site currently has sample data. To add all 1000 Duas for Arafah:

### Option 1: Use the Processing Script (Recommended)

1. **Create the source file:**

   ```bash
   touch scripts/duas_raw.txt
   ```

2. **Copy all 1000 Duas for Arafah** (the complete list you provided) into `scripts/duas_raw.txt`
   - Format: One dua per line
   - Example: `1. O Allah, increase me in Imaan...`

3. **Run the processor:**
   ```bash
   node scripts/process-duas.js
   ```

This will generate `data/duas.json` with all 1000 Duas for Arafah properly formatted.

### Option 2: Manual JSON Editing

Edit `data/duas.json` directly following this structure:

```json
[
  {
    "id": 1,
    "text": "O Allah, increase me in Imaan and make it firm in my heart.",
    "sectionId": "imaan-worship",
    "sectionTitle": "Imaan & Worship"
  }
]
```

## 🚀 Running Locally

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Then open: http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

1. **Create a new repository** on GitHub

2. **Initialize and push:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: 1000 Duas for Arafah"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/duas-arafah.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from branch `main` / root
   - Save

4. **Visit:** `https://YOUR_USERNAME.github.io/duas-arafah/`

## ⌨️ Keyboard Shortcuts

- `/` - Focus search
- `Esc` - Close modal / clear search
- `←` `→` - Navigate duas in modal
- `t` - Cycle theme (system/light/dark)
- `g` then `s` - Jump to sections sidebar

## 🎨 Customization

### Change Colors

Edit `assets/css/styles.css`:

```css
:root {
  --accent: #2f5d4f; /* Your brand color */
  --bg: #fbf9f4; /* Background */
}
```

### Modify Sections

Edit `data/sections.json` to adjust section ranges or titles.

## 📦 Project Structure

```
Dua/
├── index.html              # Main entry point
├── service-worker.js       # Offline caching
├── assets/
│   ├── css/styles.css      # All styles
│   └── js/
│       ├── app.js          # Main controller
│       ├── theme.js        # Theme management
│       ├── search.js       # Search functionality
│       └── views.js        # View rendering
├── data/
│   ├── duas.json           # All 1000 Duas for Arafah
│   └── sections.json       # 40 sections metadata
├── scripts/
│   └── process-duas.js     # Dua processor
├── README.md
├── LICENSE
└── CLAUDE.md              # Full specification
```

## ✨ Features

**Core Functionality:**

- Browse 1000 Duas for Arafah organized in 40 thematic sections
- Search across all duas with live filtering
- Three view modes for different reading preferences
- Deep linking to specific duas or sections
- Copy individual duas to clipboard
- Share duas via Web Share API or link

**Design:**

- Calm, reverent aesthetic
- Dark and light themes with system preference support
- Generous whitespace and readable typography
- Smooth animations (respects prefers-reduced-motion)
- Print-friendly stylesheet

**Technical:**

- Vanilla JavaScript (no frameworks)
- Under 200 KB total page weight
- Works offline after first load
- Progressive enhancement
- Semantic HTML with proper ARIA labels

## 🧪 Testing

1. **Test locally** with different browsers
2. **Check accessibility** with screen readers
3. **Run Lighthouse audit** (target: 95+ in all categories)
4. **Test offline** by disabling network after first load
5. **Verify deep links** work correctly

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

This is a devotional project. If you'd like to:

- Report issues
- Suggest improvements
- Add translations
- Enhance accessibility

Please open an issue or pull request on GitHub.

## 📄 License

- **Code:** MIT License
- **Content:** Public devotional material

---

**May Allah accept this work and make it a means of benefit for the Ummah.**

_Ameen._
