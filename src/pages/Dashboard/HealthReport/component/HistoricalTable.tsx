import React, { useState, useRef } from 'react';
import { Download, FileText } from 'lucide-react';
import { useHealthReport } from '../../../../services/fetchApi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface HistoricalLog {
  date: string;
  topSymptom: string;
  totalSymptoms: string;
  note: string;
}

const HistoricalTable: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('Oct 2025');
  const tableRef = useRef(null);
  const { HealthData, isLoading } = useHealthReport();

  // Format date to display format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  // Format time to display format
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get historical logs from API data
  const historicalLogs = HealthData?.historicalLogs || [];

  // Download PDF function
  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Historical Cycle Data', 14, 20);
    
    // Add month
    doc.setFontSize(12);
    doc.text(selectedMonth, 14, 30);
    
    // Add date generated
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 38);
    
    // Prepare table data
    const tableData = historicalLogs.map((row: HistoricalLog) => [
      formatDate(row.date),
      formatTime(row.date),
      row.topSymptom,
      row.totalSymptoms,
      row.note || '—'
    ]);
    
    // Add table
    autoTable(doc, {
      startY: 45,
      head: [['Date', 'Time', 'Top Symptom', 'Total Symptoms', 'Note']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [236, 72, 153], // Pink color
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        4: { cellWidth: 50 } // Note column wider
      }
    });
    
    // Add summary if available
    if (HealthData?.summary) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const finalY = (doc as any).lastAutoTable?.finalY || 45;
      doc.setFontSize(10);
      doc.text('Summary:', 14, finalY + 15);
      doc.setFontSize(9);
      const splitSummary = doc.splitTextToSize(HealthData.summary, 180);
      doc.text(splitSummary, 14, finalY + 22);
    }
    
    // Save the PDF
    doc.save(`cycle-data-${selectedMonth.replace(' ', '-')}.pdf`);
  };

  return (
    <div className="min-h-screen w-full mt-6">
      <div className="w-full max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-600 mb-2">Historical Cycle Data</h2>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-lg font-semibold border-none bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-2"
              >
                <option>Oct 2025</option>
                <option>Sep 2025</option>
                <option>Aug 2025</option>
              </select>
            </div>
            <button 
              onClick={downloadPDF}
              disabled={isLoading || historicalLogs.length === 0}
              className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto" ref={tableRef}>
                <table className="w-full min-w-160">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Date</th>
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Top Symptom</th>
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Total Symptoms</th>
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Note</th>
                      <th className="w-10 sm:w-12 px-3 sm:px-6 py-3 sm:py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          No data available for this month
                        </td>
                      </tr>
                    ) : (
                      historicalLogs.map((row: HistoricalLog, index: number) => (
                        <tr 
                          key={index} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">
                              {formatDate(row.date)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(row.date)}
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-700">
                              {row.topSymptom}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-medium text-gray-900">
                              {row.totalSymptoms}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                              {row.note || '—'}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                              <FileText size={16} className="sm:w-4.5 sm:h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile-friendly scroll indicator */}
            <div className="mt-2 text-center text-xs text-gray-500 sm:hidden">
              ← Scroll horizontally to view all columns →
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoricalTable;