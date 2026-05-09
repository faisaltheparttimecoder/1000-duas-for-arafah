const STORAGE_KEY = 'duas:view';

class ViewManager {
    constructor(onViewChange) {
        this.onViewChange = onViewChange;
        this.currentView = this.loadView();
        this.container = document.getElementById('duas-container');
        this.buttons = document.querySelectorAll('.view-btn');
        this.getStrings = () => {
            const htmlLang = document.documentElement.getAttribute('lang') || 'en';
            const isAr = htmlLang.toLowerCase().startsWith('ar');
            return {
                results: isAr ? 'النتائج' : 'Results',
                duas: isAr ? 'دعاء' : 'duas',
                tableDua: isAr ? 'الدعاء' : 'Dua',
                tableSection: isAr ? 'القسم' : 'Section',
            };
        };

        this.init();
    }

    init() {
        this.applyView(this.currentView);

        this.buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.setView(view);
            });
        });
    }

    loadView() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return ['cards', 'list', 'table'].includes(stored) ? stored : 'cards';
    }

    saveView(view) {
        localStorage.setItem(STORAGE_KEY, view);
    }

    setView(view) {
        this.currentView = view;
        this.applyView(view);
        this.saveView(view);
        this.onViewChange(view);
    }

    applyView(view) {
        this.container.setAttribute('data-view', view);

        this.buttons.forEach((btn) => {
            const isActive = btn.dataset.view === view;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    }

    renderCards(duas, sections) {
        const strings = this.getStrings();
        const grouped = this.groupBySection(duas, sections);

        return grouped
            .map(
                ({ section, duas }) => `
      <div class="section-group" id="section-${section.id}">
        <div class="section-header">
          <h2>${section.title}</h2>
          <p class="section-meta">${section.range[0]}–${section.range[1]} · ${duas.length} ${strings.duas}</p>
        </div>
        <div class="duas-container" data-view="cards">
          ${duas
              .map(
                  (dua) => `
            <div class="dua-card" data-dua-id="${dua.id}" tabindex="0" role="button">
              <span class="dua-number">${dua.id}</span>
              <p class="dua-text">${this.escapeHtml(dua.text)}</p>
            </div>
          `,
              )
              .join('')}
        </div>
      </div>
    `,
            )
            .join('');
    }

    renderList(duas, sections) {
        const strings = this.getStrings();
        const grouped = this.groupBySection(duas, sections);

        return grouped
            .map(
                ({ section, duas }) => `
      <div class="section-group" id="section-${section.id}">
        <div class="section-header">
          <h2>${section.title}</h2>
          <p class="section-meta">${section.range[0]}–${section.range[1]} · ${duas.length} ${strings.duas}</p>
        </div>
        ${duas
            .map(
                (dua) => `
          <div class="dua-list-item" data-dua-id="${dua.id}" tabindex="0" role="button">
            <span class="dua-list-number">${dua.id}</span>
            <p class="dua-list-text">${this.escapeHtml(dua.text)}</p>
          </div>
        `,
            )
            .join('')}
      </div>
    `,
            )
            .join('');
    }

    renderTable(duas, sections) {
        const strings = this.getStrings();
        const grouped = this.groupBySection(duas, sections);

        return grouped
            .map(
                ({ section, duas }) => `
      <div class="section-group" id="section-${section.id}">
        <div class="section-header">
          <h2>${section.title}</h2>
          <p class="section-meta">${section.range[0]}–${section.range[1]} · ${duas.length} ${strings.duas}</p>
        </div>
        <table class="duas-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${strings.tableDua}</th>
              <th>${strings.tableSection}</th>
            </tr>
          </thead>
          <tbody>
            ${duas
                .map(
                    (dua) => `
              <tr data-dua-id="${dua.id}" tabindex="0">
                <td class="table-number">${dua.id}</td>
                <td class="table-text">${this.escapeHtml(dua.text)}</td>
                <td class="table-section">${this.escapeHtml(dua.sectionTitle)}</td>
              </tr>
            `,
                )
                .join('')}
          </tbody>
        </table>
      </div>
    `,
            )
            .join('');
    }

    render(duas, sections, searchQuery = '') {
        const strings = this.getStrings();
        let html = '';

        if (searchQuery) {
            const filtered = duas.filter((dua) => dua.text.toLowerCase().includes(searchQuery));

            if (this.currentView === 'cards') {
                html = `
          <div class="section-group">
            <div class="section-header">
              <h2>${strings.results} (${filtered.length})</h2>
            </div>
            <div class="duas-container" data-view="cards">
              ${filtered
                  .map(
                      (dua) => `
                <div class="dua-card" data-dua-id="${dua.id}" tabindex="0" role="button">
                  <span class="dua-number">${dua.id}</span>
                  <p class="dua-text">${this.escapeHtml(dua.text)}</p>
                </div>
              `,
                  )
                  .join('')}
            </div>
          </div>
        `;
            } else if (this.currentView === 'list') {
                html = `
          <div class="section-group">
            <div class="section-header">
              <h2>${strings.results} (${filtered.length})</h2>
            </div>
            ${filtered
                .map(
                    (dua) => `
              <div class="dua-list-item" data-dua-id="${dua.id}" tabindex="0" role="button">
                <span class="dua-list-number">${dua.id}</span>
                <p class="dua-list-text">${this.escapeHtml(dua.text)}</p>
              </div>
            `,
                )
                .join('')}
          </div>
        `;
            } else {
                html = `
          <div class="section-group">
            <div class="section-header">
              <h2>${strings.results} (${filtered.length})</h2>
            </div>
            <table class="duas-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>${strings.tableDua}</th>
                  <th>${strings.tableSection}</th>
                </tr>
              </thead>
              <tbody>
                ${filtered
                    .map(
                        (dua) => `
                  <tr data-dua-id="${dua.id}" tabindex="0">
                    <td class="table-number">${dua.id}</td>
                    <td class="table-text">${this.escapeHtml(dua.text)}</td>
                    <td class="table-section">${this.escapeHtml(dua.sectionTitle)}</td>
                  </tr>
                `,
                    )
                    .join('')}
              </tbody>
            </table>
          </div>
        `;
            }
        } else {
            if (this.currentView === 'cards') {
                html = this.renderCards(duas, sections);
            } else if (this.currentView === 'list') {
                html = this.renderList(duas, sections);
            } else {
                html = this.renderTable(duas, sections);
            }
        }

        this.container.innerHTML = html;
    }

    groupBySection(duas, sections) {
        return sections
            .map((section) => {
                const sectionDuas = duas.filter((dua) => dua.sectionId === section.id);
                return { section, duas: sectionDuas };
            })
            .filter((group) => group.duas.length > 0);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

export default ViewManager;
