import html2canvas from 'html2canvas';
import { RefObject } from 'react';

export const printContent = async (contentRef: RefObject<HTMLDivElement>) => {
    const content = contentRef.current;
    if (content) {
        const canvas = await html2canvas(content);
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write('<html><head><title>Print</title></head><body>');
            printWindow.document.write('<img src="' + canvas.toDataURL() + '" />');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    }
};
