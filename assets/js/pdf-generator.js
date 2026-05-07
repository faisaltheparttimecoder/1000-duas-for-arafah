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
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text(section.title, margin + 5, yPosition + 8);

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(
                `${section.range[0]}–${section.range[1]} • ${duas.length} duas`,
                pageWidth - margin - 5,
                yPosition + 8,
                { align: 'right' },
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

                // Dua number and text on same line
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(100, 100, 100);
                doc.text(`${dua.id}.`, margin, yPosition);

                // Dua text
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const lines = doc.splitTextToSize(dua.text, contentWidth - 12);
                doc.text(lines, margin + 8, yPosition);
                yPosition += lines.length * 4 + 2;
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
}

export default PDFGenerator;
