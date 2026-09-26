'use client';

import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Edit3,
  Eye,
  FileCheck,
  FileDown,
  Loader2,
  Building,
  Home,
  Briefcase,
  FolderLock,
  ArrowRight,
} from 'lucide-react';
import jsPDF from 'jspdf';
import { LETTER_TEMPLATES, LetterTemplate } from '@/lib/data';

export default function LetterTemplates() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(LETTER_TEMPLATES[0].id);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [pdfDownloaded, setPdfDownloaded] = useState<boolean>(false);

  const currentTemplate =
    LETTER_TEMPLATES.find((t) => t.id === selectedTemplateId) || LETTER_TEMPLATES[0];

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const generatedText = currentTemplate.generateContent(formData);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentTemplate.id}-lettera.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let cursorY = 25;

      // Header top line
      doc.setDrawColor(126, 34, 206); // purple-700
      doc.setLineWidth(0.6);
      doc.line(margin, 14, pageWidth - margin, 14);

      // Document Category/Brand sub-header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(110, 110, 110);
      doc.text('MODULO FACSIMILE UFFICIALE • REPUBBLICA ITALIANA', margin, 11);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Bangla-Italy Portal', pageWidth - margin, 11, { align: 'right' });

      // Body text formatting
      const paragraphs = generatedText.split('\n');
      doc.setFont('times', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(25, 25, 25);
      const lineHeight = 5.8;

      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];

        if (paragraph.trim() === '') {
          cursorY += 3.8;
          continue;
        }

        const isHeading =
          paragraph.startsWith('OGGETTO:') ||
          paragraph.startsWith('Mittente:') ||
          paragraph.startsWith('Destinatario:') ||
          paragraph.startsWith('Spettabile') ||
          paragraph.startsWith('Raccomandata');

        if (isHeading) {
          doc.setFont('times', 'bold');
        } else {
          doc.setFont('times', 'normal');
        }

        const lines = doc.splitTextToSize(paragraph, contentWidth);

        for (let j = 0; j < lines.length; j++) {
          if (cursorY + lineHeight > pageHeight - 18) {
            doc.addPage();
            cursorY = 22;
            doc.setDrawColor(210, 210, 210);
            doc.setLineWidth(0.3);
            doc.line(margin, 14, pageWidth - margin, 14);
          }

          doc.text(lines[j], margin, cursorY);
          cursorY += lineHeight;
        }
      }

      // Add page numbering & formal notice to each page
      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 13, pageWidth - margin, pageHeight - 13);

        doc.setFont('times', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(
          `Pagina ${p} di ${totalPages} • Documento redatto secondo la normativa italiana vigente`,
          pageWidth / 2,
          pageHeight - 8.5,
          { align: 'center' }
        );
      }

      const filename = `${currentTemplate.id}-lettera-ufficiale.pdf`;
      doc.save(filename);

      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3500);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${currentTemplate.titleIt}</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; font-size: 13pt; color: #111; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${generatedText}</pre>
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <section id="letters" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 text-xs font-bold mb-3 border border-purple-300 dark:border-purple-800">
            <FileDown className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>ইতালিয়ান দরখাস্ত ও নোটিস জেনারেটর (PDF এক্সপোর্টসহ)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            দরকারি ইতালিয়ান চিঠির ফরম্যাট ও সরাসরি PDF ডাউনলোড
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            বাসা ছাড়ার নোটিস, পদত্যাগপত্র, ডাক্তারের ছুটির আবেদন বা অথরাইজেশন চিঠি নিজের তথ্য বসিয়ে সরাসরি A4 সাইজ{' '}
            <span className="font-bold text-purple-600 dark:text-purple-400">অফিশিয়াল PDF ফাইলে ডাউনলোড</span> বা প্রিন্ট করুন।
          </p>
        </div>

        {/* Template Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center scrollbar-none">
          {LETTER_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => {
                setSelectedTemplateId(tmpl.id);
                setFormData({});
              }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedTemplateId === tmpl.id
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-900/20 ring-2 ring-purple-400'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{tmpl.titleBn.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* Dual Pane Interactive Form & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {currentTemplate.titleBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {currentTemplate.titleIt}
                </p>
              </div>
              <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <Edit3 className="w-4 h-4" />
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              💡 {currentTemplate.description}
            </p>

            {/* Form Fields */}
            <div className="space-y-3.5">
              {currentTemplate.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                তথ্য লিখলে ডানে স্বয়ংক্রিয়ভাবে আপডেট হবে
              </span>
              <button
                onClick={() => setFormData({})}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ফর্ম ক্লিয়ার করুন
              </button>
            </div>
          </div>

          {/* Right Column: Formal Letter Live Preview (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {/* Preview Toolbar */}
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  ইতালিয়ান চিঠি প্রিভিউ
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* PDF Download Button - High Prominence */}
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                    pdfDownloaded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30'
                  }`}
                  title="A4 সাইজ অফিশিয়াল PDF ফাইল ডাউনলোড করুন"
                >
                  {isExportingPdf ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>তৈরি হচ্ছে...</span>
                    </>
                  ) : pdfDownloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>PDF ডাউনলোড হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="w-3.5 h-3.5" />
                      <span>PDF ডাউনলোড</span>
                    </>
                  )}
                </button>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                  title="কপি করুন"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'কপি হয়েছে!' : 'কপি'}</span>
                </button>

                {/* Plain TXT Download Button */}
                <button
                  onClick={handleDownloadTxt}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="টেক্সট (.txt) ফাইল ডাউনলোড করুন"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>TXT</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
                  title="সরাসরি প্রিন্ট করুন"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>প্রিন্ট</span>
                </button>
              </div>
            </div>

            {/* Actual Document Sheet View */}
            <div className="p-6 sm:p-8 bg-amber-50/20 dark:bg-slate-950 font-serif min-h-[420px] text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed overflow-x-auto select-text">
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {generatedText}
              </pre>
            </div>

            {/* Bottom Help Notice */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  চিঠিটি <strong>PDF ফরম্যাটে ডাউনলোড</strong> করে প্রিন্ট করুন এবং নিচে স্বহস্তে স্বাক্ষর (Firma) প্রদান করুন।
                </span>
              </span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                A4 স্ট্যান্ডার্ড ইতালিয়ান আইনি ফরম্যাট
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

