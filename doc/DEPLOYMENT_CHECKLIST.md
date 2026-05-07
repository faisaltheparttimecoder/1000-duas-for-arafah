# Deployment Checklist

## ✅ Pre-Deployment

### 1. Add Complete Duas Data

- [ ] Create `scripts/duas_raw.txt` with all 1000 Duas for Arafah
- [ ] Run `node scripts/process-duas.js`
- [ ] Verify `data/duas.json` has exactly 1000 entries
- [ ] Check JSON is valid (no syntax errors)
- [ ] Verify all section mappings are correct

### 2. Local Testing

- [ ] Start local server: `python3 -m http.server 8000`
- [ ] Open `http://localhost:8000`
- [ ] Test all 1000 Duas for Arafah display correctly
- [ ] Verify no console errors
- [ ] Check all sections appear in sidebar

### 3. Feature Testing

#### Navigation

- [ ] Sidebar shows all 40 sections
- [ ] Clicking section scrolls to correct location
- [ ] Active section highlights properly
- [ ] Mobile hamburger menu works
- [ ] Sidebar drawer closes on outside click

#### Search

- [ ] Search filters duas correctly
- [ ] Results counter shows accurate count
- [ ] Clear button (×) appears when typing
- [ ] `/` key focuses search input
- [ ] `Esc` key clears search
- [ ] No search lag (debounce working)

#### View Modes

- [ ] Cards view displays grid layout
- [ ] List view shows dense rows
- [ ] Table view renders three columns
- [ ] View switcher buttons highlight active mode
- [ ] View preference persists after refresh
- [ ] All views work on mobile

#### Dua Modal

- [ ] Modal opens when clicking any dua
- [ ] Displays correct dua number and text
- [ ] Section name shows correctly
- [ ] Copy button copies text to clipboard
- [ ] Share button works (or copies link)
- [ ] Previous/Next buttons navigate
- [ ] `←` `→` arrow keys navigate
- [ ] `Esc` key closes modal
- [ ] Click outside closes modal
- [ ] Deep link `?dua=42` opens correct dua

#### Theme System

- [ ] Theme toggle cycles: system → light → dark
- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly
- [ ] System theme respects OS preference
- [ ] Theme persists after refresh
- [ ] No flash of unstyled content (FOUC)
- [ ] Smooth transitions between themes

### 4. Responsive Testing

#### Desktop (1024px+)

- [ ] Sidebar visible by default
- [ ] Cards display in 3-4 columns
- [ ] All controls visible in top bar
- [ ] Modal centered and readable

#### Tablet (768px-1023px)

- [ ] Sidebar becomes drawer
- [ ] Cards display in 2 columns
- [ ] Hamburger menu appears
- [ ] Touch interactions work

#### Mobile (<768px)

- [ ] Single column layout
- [ ] Sidebar drawer works smoothly
- [ ] Search bar fits properly
- [ ] Modal fits screen
- [ ] Touch targets large enough (44px+)

### 5. Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

### 6. Accessibility Testing

#### Keyboard Navigation

- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Skip-to-content link works
- [ ] Modal traps focus when open
- [ ] `g` then `s` jumps to sections
- [ ] All keyboard shortcuts work

#### Screen Reader

- [ ] Page title reads correctly
- [ ] Headings hierarchy makes sense
- [ ] ARIA labels present and accurate
- [ ] Buttons have descriptive labels
- [ ] Links describe destination
- [ ] Form inputs have labels

#### Visual

- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators visible
- [ ] No information conveyed by color alone
- [ ] Text resizes up to 200% without breaking
- [ ] No horizontal scrolling at 320px width

### 7. Performance Testing

- [ ] Run Lighthouse audit
    - Performance: Target 95+
    - Accessibility: Target 100
    - Best Practices: Target 100
    - SEO: Target 100
- [ ] Check total page weight (<200 KB)
- [ ] Verify images optimized (if any)
- [ ] Test on slow 3G connection
- [ ] Check First Contentful Paint (<1s)

### 8. Offline Testing

- [ ] Load site once
- [ ] Disable network in DevTools
- [ ] Refresh page - should still work
- [ ] Browse duas - should work
- [ ] Search - should work
- [ ] Service worker registered correctly

### 9. Deep Linking

- [ ] `?dua=1` opens first dua
- [ ] `?dua=1000` opens last dua
- [ ] `?dua=9999` handles gracefully (no error)
- [ ] `#section-imaan-worship` scrolls to section
- [ ] URL updates when opening modal
- [ ] URL updates when navigating sections

### 10. Content Verification

- [ ] All 1000 Duas for Arafah present
- [ ] No duplicate IDs
- [ ] No missing duas in sequence
- [ ] Section ranges correct (1-50, 51-100, etc.)
- [ ] Section titles match specification
- [ ] No typos in dua text
- [ ] Proper punctuation and formatting

---

## 🚀 Deployment Steps

### GitHub Pages Deployment

#### 1. Create Repository

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: 1000 Duas for Arafah"

# Rename branch to main
git branch -M main
```

#### 2. Push to GitHub

```bash
# Add remote (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/duas-arafah.git

# Push
git push -u origin main
```

#### 3. Enable GitHub Pages

- Go to repository Settings
- Navigate to Pages section
- Source: Deploy from branch
- Branch: `main`
- Folder: `/ (root)`
- Click Save

#### 4. Wait for Deployment

- Check Actions tab for build status
- Usually takes 1-2 minutes
- Visit: `https://USERNAME.github.io/duas-arafah/`

### 5. Verify Live Site

- [ ] Site loads correctly
- [ ] All duas display
- [ ] Search works
- [ ] Modal opens
- [ ] Theme switching works
- [ ] Mobile responsive
- [ ] Service worker registers
- [ ] No console errors

---

## 📝 Post-Deployment

### 1. Documentation

- [ ] Update README with live URL
- [ ] Add screenshot to README
- [ ] Document any custom setup needed
- [ ] Add contributing guidelines (if accepting PRs)

### 2. Social Sharing

- [ ] Test Open Graph tags (if added)
- [ ] Share on social media
- [ ] Get feedback from users

### 3. Monitoring

- [ ] Check for any reported issues
- [ ] Monitor browser console for errors
- [ ] Test on different devices
- [ ] Gather user feedback

### 4. Maintenance

- [ ] Set up GitHub Issues for bug reports
- [ ] Plan for content updates
- [ ] Consider adding features based on feedback

---

## 🐛 Common Issues & Fixes

### Issue: Service Worker Not Registering

**Fix:** Ensure site is served over HTTPS or localhost

### Issue: Duas Not Loading

**Fix:** Check `data/duas.json` is valid JSON and accessible

### Issue: Modal Not Opening

**Fix:** Verify JavaScript is loading, check console for errors

### Issue: Search Not Working

**Fix:** Check debounce timer, verify event listeners attached

### Issue: Theme Not Persisting

**Fix:** Check localStorage is enabled, verify key name matches

### Issue: Mobile Menu Not Closing

**Fix:** Verify backdrop click handler, check z-index values

### Issue: Offline Mode Not Working

**Fix:** Check service worker registration, verify cache names

---

## 📊 Success Metrics

After deployment, verify:

- [ ] Site loads in under 2 seconds
- [ ] Lighthouse scores all 95+
- [ ] No JavaScript errors in console
- [ ] Works on all major browsers
- [ ] Fully functional offline
- [ ] Accessible to screen readers
- [ ] Mobile responsive on all devices

---

## 🎉 Launch Checklist

Final checks before announcing:

- [ ] All 1000 Duas for Arafah verified
- [ ] No typos or errors
- [ ] All features working
- [ ] Tested on multiple devices
- [ ] Accessibility verified
- [ ] Performance optimized
- [ ] Documentation complete
- [ ] License file present
- [ ] README updated with live URL

---

## 📢 Announcement Template

```markdown
# 1000 Duas for Arafah

A beautiful, modern web app presenting 1000 supplications for the Day of Arafah.

🔗 **Live Site:** https://USERNAME.github.io/duas-arafah/

✨ **Features:**

- 1000 carefully curated duas
- Three view modes (cards, list, table)
- Live search across all duas
- Dark and light themes
- Works offline
- Fully accessible
- Mobile responsive

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no tracking, no distractions.

May Allah accept this work and make it beneficial.
```

---

## 🤲 Final Dua

Before deploying, make dua:

_O Allah, accept this work and make it a means of benefit for all who use it. Forgive any mistakes and shortcomings. Make it a source of continuous reward and a means of drawing people closer to You. Ameen._

---

**Ready to deploy? Follow the checklist above and launch with confidence!**

_Bismillah._
