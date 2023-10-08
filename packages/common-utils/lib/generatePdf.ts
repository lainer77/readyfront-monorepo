import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { RefObject } from 'react';

export const generatePdf = async (contentRef: RefObject<HTMLDivElement>, fileName?: string) => {
    const content = contentRef.current;
    if (content) {
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${(fileName || 'download').replace('.pdf', '')}.pdf`);
    }
};
