import ThemeManager from './theme.js';
import SearchManager from './search.js';
import ViewManager from './views.js';
import PDFGenerator from './pdf-generator.js';

const LANG_STORAGE_KEY = 'duas:lang';

const I18N = {
    en: {
        lang: 'en',
        dir: 'ltr',
        ui: {
            skipToContent: 'Skip to content',
            siteTitle: '1000 Duas',
            sidebarTitle: 'Sections',
            searchLabel: 'Search duas',
            searchPlaceholder: 'Search duas...',
            clearSearch: 'Clear search',
            pdf: 'PDF',
            pdfAria: 'Download as PDF',
            pdfTitle: 'Download all duas as PDF',
            modalNoLabel: 'No.',
            modalBismillah: 'In the name of Allah',
            modalAmeen: '— Ameen —',
            copied: 'Copied',
            failedToCopy: 'Failed to copy',
            linkCopied: 'Link copied',
            failedToCopyLink: 'Failed to copy link',
            failedToLoad: 'Failed to load duas. Please refresh the page.',
            generatingPdf: 'Generating PDF... This may take a moment.',
            pdfSuccess: 'PDF downloaded successfully!',
            pdfFail: 'Failed to generate PDF. Please try again.',
            results: (n) => `Results (${n})`,
            duasCount: (n) => `${n} duas`,
        },
        footer: {
            line1: '1000 supplications, gathered for the Day of Arafah.',
            line2: 'May Allah accept.',
        },
    },
    ar: {
        lang: 'ar',
        dir: 'rtl',
        ui: {
            skipToContent: 'تخطي إلى المحتوى',
            siteTitle: '١٠٠٠ دعاء',
            sidebarTitle: 'الأقسام',
            searchLabel: 'البحث في الأدعية',
            searchPlaceholder: 'ابحث في الأدعية...',
            clearSearch: 'مسح البحث',
            pdf: 'PDF',
            pdfAria: 'تنزيل بصيغة PDF',
            pdfTitle: 'تنزيل جميع الأدعية بصيغة PDF',
            modalNoLabel: 'رقم',
            modalBismillah: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ',
            modalAmeen: '— آمين —',
            copied: 'تم النسخ',
            failedToCopy: 'تعذّر النسخ',
            linkCopied: 'تم نسخ الرابط',
            failedToCopyLink: 'تعذّر نسخ الرابط',
            failedToLoad: 'تعذّر تحميل الأدعية. حدّث الصفحة.',
            generatingPdf: 'جارٍ إنشاء ملف PDF... قد يستغرق ذلك لحظة.',
            pdfSuccess: 'تم تنزيل ملف PDF بنجاح!',
            pdfFail: 'تعذّر إنشاء ملف PDF. حاول مرة أخرى.',
            results: (n) => `النتائج (${n})`,
            duasCount: (n) => `${n} دعاء`,
        },
        footer: {
            line1: '١٠٠٠ دعاء جُمعت ليوم عرفة.',
            line2: 'تقبل الله.',
        },
    },
};

class DuaApp {
    constructor() {
        this.duas = [];
        this.sections = [];
        this.currentSearchQuery = '';
        this.currentDuaId = null;
        this.currentLang = this.resolveInitialLang();
        this.t = I18N[this.currentLang] || I18N.en;

        this.elements = {
            sidebar: document.getElementById('sidebar'),
            sectionsNav: document.getElementById('sections-nav'),
            menuToggle: document.querySelector('.menu-toggle'),
            pdfDownload: document.getElementById('pdf-download'),
            langButtons: document.querySelectorAll('.lang-btn'),
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
        this.applyLanguageToDocument();
        this.applyLanguageToUI();
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

    resolveInitialLang() {
        const url = new URL(window.location.href);
        const fromUrl = url.searchParams.get('lang');
        if (fromUrl === 'en' || fromUrl === 'ar') return fromUrl;

        const stored = localStorage.getItem(LANG_STORAGE_KEY);
        if (stored === 'en' || stored === 'ar') return stored;

        const browser = (navigator.language || '').toLowerCase();
        if (browser.startsWith('ar')) return 'ar';

        return 'en';
    }

    setLanguage(lang) {
        if (lang !== 'en' && lang !== 'ar') return;
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        this.t = I18N[this.currentLang] || I18N.en;
        localStorage.setItem(LANG_STORAGE_KEY, this.currentLang);

        const url = new URL(window.location.href);
        url.searchParams.set('lang', this.currentLang);
        window.history.replaceState(null, '', url.toString());

        this.applyLanguageToDocument();
        this.applyLanguageToUI();

        this.loadData().then(() => {
            this.renderSidebar();
            this.render();
            this.handleDeepLink();
        });
    }

    applyLanguageToDocument() {
        const html = document.documentElement;
        html.setAttribute('lang', this.t.lang);
        html.setAttribute('dir', this.t.dir);
    }

    applyLanguageToUI() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) skipLink.textContent = this.t.ui.skipToContent;

        const siteTitle = document.querySelector('.site-title');
        if (siteTitle) siteTitle.textContent = this.t.ui.siteTitle;

        const sidebarTitle = document.querySelector('.sidebar-title');
        if (sidebarTitle) sidebarTitle.textContent = this.t.ui.sidebarTitle;

        const searchLabel = document.querySelector('label[for="search-input"]');
        if (searchLabel) searchLabel.textContent = this.t.ui.searchLabel;

        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.setAttribute('placeholder', this.t.ui.searchPlaceholder);

        const clearBtn = document.querySelector('.search-clear');
        if (clearBtn) clearBtn.setAttribute('aria-label', this.t.ui.clearSearch);

        const pdfBtn = document.getElementById('pdf-download');
        if (pdfBtn) {
            pdfBtn.setAttribute('aria-label', this.t.ui.pdfAria);
            pdfBtn.setAttribute('title', this.t.ui.pdfTitle);
            const span = pdfBtn.querySelector('span');
            if (span) span.textContent = this.t.ui.pdf;
        }

        const modalBismillah = document.querySelector('.modal-bismillah');
        if (modalBismillah) modalBismillah.textContent = this.t.ui.modalBismillah;

        const modalAmeen = document.querySelector('.modal-ameen');
        if (modalAmeen) modalAmeen.textContent = this.t.ui.modalAmeen;

        const modalNumberLabel = document.querySelector('.modal-number-label');
        if (modalNumberLabel) {
            const span = modalNumberLabel.querySelector('span');
            modalNumberLabel.textContent = '';
            const prefix = document.createTextNode(`${this.t.ui.modalNoLabel} `);
            const midSpan = span || document.createElement('span');
            midSpan.id = 'modal-number';
            midSpan.textContent = this.elements?.modalNumber?.textContent || '';
            const suffix = document.createTextNode(` / 1000`);
            modalNumberLabel.appendChild(prefix);
            modalNumberLabel.appendChild(midSpan);
            modalNumberLabel.appendChild(suffix);
            // keep element reference valid
            this.elements.modalNumber = midSpan;
        }

        const footerPs = document.querySelectorAll('.footer p');
        if (footerPs && footerPs.length >= 2) {
            footerPs[0].textContent = this.t.footer.line1;
            footerPs[1].textContent = this.t.footer.line2;
        }

        this.elements.langButtons.forEach((btn) => {
            const isActive = btn.dataset.lang === this.currentLang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    async loadData() {
        try {
            const suffix = this.currentLang === 'ar' ? '.ar' : '';
            const [duasRes, sectionsRes] = await Promise.all([
                fetch(`data/duas${suffix}.json`),
                fetch(`data/sections${suffix}.json`),
            ]);

            this.duas = await duasRes.json();
            this.sections = await sectionsRes.json();
        } catch (error) {
            console.error('Failed to load data:', error);
            this.showToast(this.t.ui.failedToLoad);
        }
    }

    setupEventListeners() {
        this.elements.menuToggle.addEventListener('click', () => this.toggleSidebar());

        this.elements.pdfDownload.addEventListener('click', () => this.downloadPDF());

        this.elements.langButtons.forEach((btn) => {
            btn.addEventListener('click', () => this.setLanguage(btn.dataset.lang));
        });

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
                    this.navigateDua(this.currentLang === 'ar' ? 1 : -1);
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigateDua(this.currentLang === 'ar' ? -1 : 1);
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

        const url = new URL(window.location.href);
        url.searchParams.set('dua', String(duaId));
        window.history.replaceState(null, '', url.toString());

        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.elements.modalBackdrop.setAttribute('hidden', '');
        this.currentDuaId = null;

        const url = new URL(window.location.href);
        url.searchParams.delete('dua');
        window.history.replaceState(null, '', url.toString());

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
            this.showToast(this.t.ui.copied);
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showToast(this.t.ui.failedToCopy);
        }
    }

    async shareDua() {
        const dua = this.duas.find((d) => d.id === this.currentDuaId);
        if (!dua) return;

        const urlObj = new URL(window.location.href);
        urlObj.searchParams.set('dua', String(dua.id));
        const url = urlObj.toString();
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
                this.showToast(this.t.ui.linkCopied);
            } catch (error) {
                console.error('Failed to copy link:', error);
                this.showToast(this.t.ui.failedToCopyLink);
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
            this.showToast(this.t.ui.generatingPdf);

            const generator = new PDFGenerator(this.duas, this.sections);
            await generator.generate();

            this.showToast(this.t.ui.pdfSuccess);
        } catch (error) {
            console.error('PDF generation failed:', error);
            this.showToast(this.t.ui.pdfFail);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

new DuaApp();
