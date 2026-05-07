const STORAGE_KEY = 'duas:theme';
const THEMES = ['system', 'light', 'dark'];

class ThemeManager {
  constructor() {
    this.currentTheme = this.loadTheme();
    this.systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggle = document.querySelector('.theme-toggle');
    
    this.init();
  }
  
  init() {
    this.applyTheme(this.currentTheme);
    this.updateToggleLabel();
    
    this.toggle.addEventListener('click', () => this.cycleTheme());
    this.systemMediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyResolvedTheme();
      }
    });
  }
  
  loadTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(stored) ? stored : 'system';
  }
  
  saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }
  
  resolveTheme(theme) {
    if (theme === 'system') {
      return this.systemMediaQuery.matches ? 'dark' : 'light';
    }
    return theme;
  }
  
  applyTheme(theme) {
    this.currentTheme = theme;
    this.applyResolvedTheme();
    this.saveTheme(theme);
  }
  
  applyResolvedTheme() {
    const resolved = this.resolveTheme(this.currentTheme);
    document.documentElement.setAttribute('data-theme', resolved);
  }
  
  cycleTheme() {
    const currentIndex = THEMES.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    
    this.applyTheme(nextTheme);
    this.updateToggleLabel();
  }
  
  updateToggleLabel() {
    const labels = {
      system: 'Theme: System',
      light: 'Theme: Light',
      dark: 'Theme: Dark'
    };
    this.toggle.setAttribute('aria-label', labels[this.currentTheme]);
  }
}

export default ThemeManager;
