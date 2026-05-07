import ThemeManager from './theme.js';
import SearchManager from './search.js';
import ViewManager from './views.js';
import PDFGenerator from './pdf-generator.js';

class DuaApp {
    constructor() {
        this.duas = [];
        this.sections = [];
        this.currentSearchQuery = '';
        this.currentDuaId = null;

        this.elements = {
            sidebar: document.getElementById('sidebar'),
            sectionsNav: document.getElementById('sections-nav'),
            menuToggle: document.querySelector('.menu-toggle'),
            pdfDownload: document.getElementById('pdf-download'),
            modalBackdrop: document.getElementById('modal-backdrop'),
            modal: document.getElementById('dua-modal'),
            modalNumber: document.getElementById('modal-number'),
            modalSection: document.getElementById('modal-section'),
            modalText: document.getElementById('modal-text'),
            modalClose: document.querySelector('.modal-close'),
            modalCopy: document.getElementById('modal-copy'),
            modalShare: document.getElementById('modal-share'),
            modalPrev: document.getElementById('modal-prev'),
            modalNext: document.getElementById('modal-next'),
            toast: document.getElementById('toast'),
        };

        this.init();
    }

    async init() {
        await this.loadData();

        this.themeManager = new ThemeManager();
        this.searchManager = new SearchManager((query) => this.handleSearch(query));
        this.viewManager = new ViewManager(() => this.render());

        this.renderSidebar();
        this.render();
        this.setupEventListeners();
        this.handleDeepLink();
        this.registerServiceWorker();
    }

    async loadData() {
        try {
            const [duasRes, sectionsRes] = await Promise.all([
                fetch('data/duas.json'),
                fetch('data/sections.json'),
            ]);

            this.duas = await duasRes.json();
            this.sections = await sectionsRes.json();
        } catch (error) {
            console.error('Failed to load data:', error);
            this.showToast('Failed to load duas. Please refresh the page.');
        }
    }

    setupEventListeners() {
        this.elements.menuToggle.addEventListener('click', () => this.toggleSidebar());

        this.elements.pdfDownload.addEventListener('click', () => this.downloadPDF());

        document.addEventListener('click', (e) => {
            const duaCard = e.target.closest('[data-dua-id]');
            if (duaCard) {
                const duaId = parseInt(duaCard.dataset.duaId);
                this.openModal(duaId);
            }

            if (e.target === this.elements.modalBackdrop) {
                this.closeModal();
            }

            if (
                this.elements.sidebar.classList.contains('open') &&
                !this.elements.sidebar.contains(e.target) &&
                !this.elements.menuToggle.contains(e.target)
            ) {
                this.closeSidebar();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.target.closest('[data-dua-id]') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const duaId = parseInt(e.target.closest('[data-dua-id]').dataset.duaId);
                this.openModal(duaId);
            }

            if (e.key === 'Escape' && !this.elements.modalBackdrop.hidden) {
                this.closeModal();
            }

            if (!this.elements.modalBackdrop.hidden) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.navigateDua(-1);
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigateDua(1);
                }
            }

            if (e.key === 't' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.themeManager.cycleTheme();
            }

            if (e.key === 'g' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                this.handleGCommand(e);
            }
        });

        this.elements.modalClose.addEventListener('click', () => this.closeModal());
        this.elements.modalCopy.addEventListener('click', () => this.copyDua());
        this.elements.modalShare.addEventListener('click', () => this.shareDua());
        this.elements.modalPrev.addEventListener('click', () => this.navigateDua(-1));
        this.elements.modalNext.addEventListener('click', () => this.navigateDua(1));
    }

    handleGCommand(e) {
        const nextKey = new Promise((resolve) => {
            const handler = (event) => {
                document.removeEventListener('keydown', handler);
                resolve(event.key);
            };
            document.addEventListener('keydown', handler);
            setTimeout(() => {
                document.removeEventListener('keydown', handler);
                resolve(null);
            }, 1000);
        });

        nextKey.then((key) => {
            if (key === 's') {
                e.preventDefault();
                const firstLink = this.elements.sectionsNav.querySelector('.section-link');
                if (firstLink) firstLink.focus();
            }
        });
    }

    toggleSidebar() {
        const isOpen = this.elements.sidebar.classList.toggle('open');
        this.elements.menuToggle.setAttribute('aria-expanded', isOpen);
    }

    closeSidebar() {
        this.elements.sidebar.classList.remove('open');
        this.elements.menuToggle.setAttribute('aria-expanded', 'false');
    }

    renderSidebar() {
        this.elements.sectionsNav.innerHTML = this.sections
            .map(
                (section) => `
      <a href="#section-${section.id}" class="section-link" data-section-id="${section.id}">
        <span class="section-name">${this.escapeHtml(section.title)}</span>
        <span class="section-range">${section.range[0]}–${section.range[1]}</span>
      </a>
    `,
            )
            .join('');

        this.elements.sectionsNav.addEventListener('click', (e) => {
            const link = e.target.closest('.section-link');
            if (link) {
                e.preventDefault();
                const sectionId = link.dataset.sectionId;
                this.scrollToSection(sectionId);
                this.closeSidebar();
            }
        });

        this.updateActiveSectionOnScroll();
    }

    updateActiveSectionOnScroll() {
        const mainContent = document.getElementById('main-content');
        let ticking = false;

        const updateActiveSection = () => {
            const sectionGroups = document.querySelectorAll('.section-group');
            let activeSection = null;

            sectionGroups.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom > 150) {
                    activeSection = section.id.replace('section-', '');
                }
            });

            if (activeSection) {
                this.setActiveSection(activeSection);
            }

            ticking = false;
        };

        mainContent.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateActiveSection);
                ticking = true;
            }
        });

        updateActiveSection();
    }

    setActiveSection(sectionId) {
        const links = this.elements.sectionsNav.querySelectorAll('.section-link');
        links.forEach((link) => {
            link.classList.toggle('active', link.dataset.sectionId === sectionId);
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(`section-${sectionId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.setActiveSection(sectionId);
        }
    }

    handleSearch(query) {
        this.currentSearchQuery = query;
        this.render();
    }

    render() {
        this.viewManager.render(this.duas, this.sections, this.currentSearchQuery);

        setTimeout(() => {
            this.updateActiveSectionOnScroll();
        }, 100);
    }

    openModal(duaId) {
        const dua = this.duas.find((d) => d.id === duaId);
        if (!dua) return;

        this.currentDuaId = duaId;

        this.elements.modalNumber.textContent = dua.id;
        this.elements.modalSection.textContent = dua.sectionTitle;
        this.elements.modalText.textContent = dua.text;

        this.elements.modalPrev.disabled = duaId === 1;
        this.elements.modalNext.disabled = duaId === this.duas.length;

        this.elements.modalBackdrop.removeAttribute('hidden');
        this.elements.modal.focus();

        window.history.replaceState(null, '', `?dua=${duaId}`);

        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.elements.modalBackdrop.setAttribute('hidden', '');
        this.currentDuaId = null;

        const url = new URL(window.location);
        url.searchParams.delete('dua');
        window.history.replaceState(null, '', url.pathname + url.hash);

        document.body.style.overflow = '';
    }

    navigateDua(direction) {
        if (!this.currentDuaId) return;

        const newId = this.currentDuaId + direction;
        if (newId >= 1 && newId <= this.duas.length) {
            this.openModal(newId);
        }
    }

    async copyDua() {
        const dua = this.duas.find((d) => d.id === this.currentDuaId);
        if (!dua) return;

        try {
            await navigator.clipboard.writeText(dua.text);
            this.showToast('Copied');
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showToast('Failed to copy');
        }
    }

    async shareDua() {
        const dua = this.duas.find((d) => d.id === this.currentDuaId);
        if (!dua) return;

        const url = `${window.location.origin}${window.location.pathname}?dua=${dua.id}`;
        const text = `Dua #${dua.id}: ${dua.text}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: `Dua #${dua.id}`, text, url });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to share:', error);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                this.showToast('Link copied');
            } catch (error) {
                console.error('Failed to copy link:', error);
                this.showToast('Failed to copy link');
            }
        }
    }

    showToast(message) {
        this.elements.toast.textContent = message;
        this.elements.toast.removeAttribute('hidden');

        setTimeout(() => {
            this.elements.toast.setAttribute('hidden', '');
        }, 2000);
    }

    handleDeepLink() {
        const params = new URLSearchParams(window.location.search);
        const duaId = parseInt(params.get('dua'));

        if (duaId && duaId >= 1 && duaId <= this.duas.length) {
            this.openModal(duaId);
        }

        const hash = window.location.hash;
        if (hash.startsWith('#section-')) {
            const sectionId = hash.replace('#section-', '');
            setTimeout(() => this.scrollToSection(sectionId), 100);
        }
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/service-worker.js');
            } catch (error) {
                console.error('Service worker registration failed:', error);
            }
        }
    }

    async downloadPDF() {
        try {
            this.showToast('Generating PDF... This may take a moment.');

            const generator = new PDFGenerator(this.duas, this.sections);
            await generator.generate();

            this.showToast('PDF downloaded successfully!');
        } catch (error) {
            console.error('PDF generation failed:', error);
            this.showToast('Failed to generate PDF. Please try again.');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

new DuaApp();
