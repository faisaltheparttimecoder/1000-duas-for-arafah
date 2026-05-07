# Quick Start Guide

## Project Structure

```
Dua/
├── index.html              # Main entry point
├── service-worker.js       # Offline caching
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles
│   └── js/
│       ├── app.js          # Main controller
│       ├── theme.js        # Theme management
│       ├── search.js       # Search functionality
│       └── views.js        # View rendering
├── data/
│   ├── duas.json           # All duas (sample data included)
│   └── sections.json       # Section metadata
├── scripts/
│   └── build-data.js       # Parser for source text
├── README.md
├── LICENSE
└── CLAUDE.md              # Full specification
```

## Running Locally

### Option 1: Python HTTP Server

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`

### Option 2: Node.js HTTP Server

```bash
npx http-server -p 8000
```

### Option 3: VS Code Live Server

Install the Live Server extension and click "Go Live"

## Adding Your Duas

The current `data/duas.json` contains sample data. To add all 1000 Duas for Arafah:

### Method 1: Manual JSON Editing

Edit `data/duas.json` directly following this format:

```json
{
  "id": 1,
  "text": "O Allah, increase me in Imaan...",
  "sectionId": "imaan-worship",
  "sectionTitle": "Imaan & Worship"
}
```

### Method 2: Parse from Text File

1. Create a text file with your duas (e.g., `source.txt`)
2. Format: Each dua on a line starting with number: `1. O Allah...`
3. Run the parser:

```bash
node scripts/build-data.js source.txt
```

## Features Implemented

✅ Three view modes (cards, list, table)
✅ Dark/light/system themes
✅ Live search with debouncing
✅ Sidebar navigation by section
✅ Modal with copy/share/navigate
✅ Keyboard shortcuts:

- `/` - Focus search
- `Esc` - Close modal/clear search
- `←` `→` - Navigate duas in modal
- `t` - Cycle theme
- `g` then `s` - Jump to sections
  ✅ Deep linking (`?dua=42`, `#section-imaan-worship`)
  ✅ Offline capability (service worker)
  ✅ Fully responsive
  ✅ WCAG 2.1 AA accessible
  ✅ Print stylesheet

## Deploying to GitHub Pages

1. Create a new repository on GitHub
2. Push this code:

```bash
git init
git add .
git commit -m "Initial commit: 1000 Duas for Arafah"
git branch -M main
git remote add origin https://github.com/USERNAME/duas-arafah.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: Deploy from branch `main` / root
   - Save

4. Visit: `https://USERNAME.github.io/duas-arafah/`

## Customization

### Colors

Edit CSS custom properties in `assets/css/styles.css`:

```css
:root {
  --accent: #2f5d4f; /* Change accent color */
  --bg: #fbf9f4; /* Change background */
}
```

### Fonts

The site uses system fonts by default. To add custom fonts:

1. Download woff2 files
2. Place in `assets/fonts/`
3. Update CSS with `@font-face` declarations

### Sections

To modify sections, edit `data/sections.json` and update the section array in `scripts/build-data.js`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

Current bundle sizes (sample data):

- HTML: ~8 KB
- CSS: ~12 KB
- JS: ~8 KB (all modules)
- JSON: ~3 KB (sample, will be ~80 KB with full 1000)

Total: ~31 KB (under 200 KB target)

## Troubleshooting

**Service worker not working?**

- Must be served over HTTPS or localhost
- Check browser console for errors
- Clear cache and reload

**Duas not loading?**

- Check browser console
- Verify `data/duas.json` is valid JSON
- Ensure files are served from correct paths

**Modal not opening?**

- Check that dua IDs in JSON match the data
- Verify JavaScript is loading (check console)

## Next Steps

1. Replace sample duas with full 1000 Duas for Arafah
2. Test on multiple devices
3. Run Lighthouse audit
4. Deploy to GitHub Pages
5. Share with the community

---

_May Allah accept this work and make it beneficial._
