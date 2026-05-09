// PDF Generator using jsPDF
// This will be loaded dynamically when user clicks download

class PDFGenerator {
    constructor(duas, sections) {
        this.duas = duas;
        this.sections = sections;
    }

    async generate() {
        // Dynamically load jsPDF library
        if (!window.jspdf) {
            await this.loadJsPDF();
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - margin * 2;
        let yPosition = margin;

        // Detect current language from active button in the header
        const currentLang =
            document.querySelector('[data-lang].active')?.getAttribute('data-lang') || 'en';
        const isArabic = currentLang === 'ar';

        // Load an Arabic-capable font when needed
        if (isArabic) {
            await this.loadArabicFont(doc);
        }

        // Title Page
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');

        doc.setFontSize(24);
        doc.text('1000 Duas for Arafah', pageWidth / 2, 80, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text('A collection of supplications', pageWidth / 2, 95, {
            align: 'center',
        });
        doc.text('for the Day of Arafah and beyond', pageWidth / 2, 105, {
            align: 'center',
        });

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 120, {
            align: 'center',
        });

        doc.addPage();
        yPosition = margin;

        // Group duas by section
        const grouped = this.groupBySection();

        // Generate content for each section
        for (let i = 0; i < grouped.length; i++) {
            const { section, duas } = grouped[i];

            // Check if we need a new page for section header
            if (yPosition > pageHeight - 40) {
                doc.addPage();
                yPosition = margin;
            }

            // Section Header
            doc.setFillColor(212, 175, 55); // Golden color
            doc.rect(margin, yPosition, contentWidth, 12, 'F');

            doc.setFontSize(14);
            doc.setFont(isArabic ? 'arabic' : 'helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            const titleX = isArabic ? pageWidth - margin - 5 : margin + 5;
            const titleAlign = isArabic ? 'right' : 'left';
            doc.text(section.title, titleX, yPosition + 8, { align: titleAlign });

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            const rangeX = isArabic ? margin : pageWidth - margin - 5;
            const rangeAlign = isArabic ? 'left' : 'right';
            doc.text(
                `${section.range[0]}–${section.range[1]} • ${duas.length} duas`,
                rangeX,
                yPosition + 8,
                { align: rangeAlign },
            );

            yPosition += 18;
            doc.setTextColor(0, 0, 0);

            // Duas in this section
            for (const dua of duas) {
                // Check if we need a new page
                const estimatedHeight = this.estimateTextHeight(doc, dua.text, contentWidth - 10);
                if (yPosition + estimatedHeight + 10 > pageHeight - margin) {
                    doc.addPage();
                    yPosition = margin;
                }

                // Dua number and text on same line (avoid overlap by measuring number width)
                const numStr = `${dua.id}.`;
                const gap = 3; // spacing between number and text

                // Number
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(100, 100, 100);
                const numWidth = doc.getTextWidth(numStr);
                if (isArabic) {
                    const numberX = pageWidth - margin; // flush right margin
                    doc.text(numStr, numberX, yPosition, { align: 'right' });

                    // Text (right-aligned) starts to the left of number
                    doc.setFontSize(9);
                    doc.setFont('arabic', 'normal');
                    doc.setTextColor(0, 0, 0);
                    const textMaxWidth = contentWidth - (numWidth + gap);
                    const lines = doc.splitTextToSize(dua.text, textMaxWidth);
                    const textRightX = numberX - numWidth - gap;
                    doc.text(lines, textRightX, yPosition, { align: 'right' });
                    yPosition += lines.length * 4 + 2;
                } else {
                    const numberX = margin;
                    doc.text(numStr, numberX, yPosition, { align: 'left' });

                    // Text (left-aligned) starts to the right of number
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(0, 0, 0);
                    const textX = margin + numWidth + gap;
                    const textMaxWidth = contentWidth - (numWidth + gap);
                    const lines = doc.splitTextToSize(dua.text, textMaxWidth);
                    doc.text(lines, textX, yPosition, { align: 'left' });
                    yPosition += lines.length * 4 + 2;
                }
            }

            // Minimal space after section
            yPosition += 3;
        }

        // Save the PDF
        doc.save('1000-Duas-for-Arafah.pdf');
    }

    groupBySection() {
        const grouped = [];

        for (const section of this.sections) {
            const sectionDuas = this.duas.filter(
                (dua) => dua.id >= section.range[0] && dua.id <= section.range[1],
            );

            if (sectionDuas.length > 0) {
                grouped.push({ section, duas: sectionDuas });
            }
        }

        return grouped;
    }

    estimateTextHeight(doc, text, width) {
        const lines = doc.splitTextToSize(text, width);
        return lines.length * 6;
    }

    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async loadArabicFont(doc) {
        // Try multiple TTFs known to work well with jsPDF's TTF parser
        const candidates = [
            // Amiri (high-quality Arabic typeface)
            {
                family: 'arabic',
                regular:
                    'https://raw.githubusercontent.com/google/fonts/main/ofl/amiri/Amiri-Regular.ttf',
                bold: 'https://raw.githubusercontent.com/google/fonts/main/ofl/amiri/Amiri-Bold.ttf',
            },
            // Scheherazade New
            {
                family: 'arabic',
                regular:
                    'https://raw.githubusercontent.com/google/fonts/main/ofl/scheherazadenew/ScheherazadeNew-Regular.ttf',
                bold: 'https://raw.githubusercontent.com/google/fonts/main/ofl/scheherazadenew/ScheherazadeNew-Bold.ttf',
            },
            // Cairo
            {
                family: 'arabic',
                regular:
                    'https://raw.githubusercontent.com/google/fonts/main/ofl/cairo/Cairo-Regular.ttf',
                bold: 'https://raw.githubusercontent.com/google/fonts/main/ofl/cairo/Cairo-Bold.ttf',
            },
            // Almarai
            {
                family: 'arabic',
                regular:
                    'https://raw.githubusercontent.com/google/fonts/main/ofl/almarai/Almarai-Regular.ttf',
                bold: 'https://raw.githubusercontent.com/google/fonts/main/ofl/almarai/Almarai-Bold.ttf',
            },
        ];

        let lastError = null;
        for (const font of candidates) {
            try {
                const [regRes, boldRes] = await Promise.all([
                    fetch(font.regular),
                    fetch(font.bold).catch(() => null),
                ]);
                if (!regRes || !regRes.ok) throw new Error('Failed to fetch regular font');
                const regB64 = this._arrayBufferToBase64(await regRes.arrayBuffer());
                const boldB64 =
                    boldRes && boldRes.ok
                        ? this._arrayBufferToBase64(await boldRes.arrayBuffer())
                        : null;

                const regName = 'arabic-regular.ttf';
                const boldName = 'arabic-bold.ttf';

                doc.addFileToVFS(regName, regB64);
                doc.addFont(regName, font.family, 'normal');
                if (boldB64) {
                    doc.addFileToVFS(boldName, boldB64);
                    doc.addFont(boldName, font.family, 'bold');
                } else {
                    // map bold to normal if bold not available
                    doc.addFont(regName, font.family, 'bold');
                }
                // Sanity: select once to ensure it registered
                doc.setFont(font.family, 'normal');
                return;
            } catch (e) {
                lastError = e;
                // try next candidate
            }
        }
        throw lastError || new Error('Unable to load Arabic font');
    }

    _arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
}

export default PDFGenerator;
