class SearchManager {
  constructor(onSearch) {
    this.onSearch = onSearch;
    this.input = document.getElementById('search-input');
    this.clearBtn = document.querySelector('.search-clear');
    this.debounceTimer = null;
    
    this.init();
  }
  
  init() {
    this.input.addEventListener('input', (e) => this.handleInput(e.target.value));
    this.clearBtn.addEventListener('click', () => this.clear());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== this.input) {
        e.preventDefault();
        this.input.focus();
      }
      
      if (e.key === 'Escape' && document.activeElement === this.input) {
        this.clear();
        this.input.blur();
      }
    });
  }
  
  handleInput(value) {
    clearTimeout(this.debounceTimer);
    
    this.debounceTimer = setTimeout(() => {
      this.onSearch(value.trim().toLowerCase());
      this.updateClearButton(value);
    }, 150);
  }
  
  updateClearButton(value) {
    if (value) {
      this.clearBtn.removeAttribute('hidden');
    } else {
      this.clearBtn.setAttribute('hidden', '');
    }
  }
  
  clear() {
    this.input.value = '';
    this.updateClearButton('');
    this.onSearch('');
  }
  
  getQuery() {
    return this.input.value.trim().toLowerCase();
  }
}

export default SearchManager;
