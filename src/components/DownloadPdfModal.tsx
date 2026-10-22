import React, { useState } from 'react';
import { Passage, ListeningSection, TestMode } from '../types';

interface DownloadPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  testMode: TestMode;
  passages: Passage[];
  listeningSections: ListeningSection[];
  isFullTest?: boolean;
}

export const DownloadPdfModal: React.FC<DownloadPdfModalProps> = ({
  isOpen,
  onClose,
  testMode,
  passages,
  listeningSections,
  isFullTest = false,
}) => {
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [includeExplanations, setIncludeExplanations] = useState(false);

  if (!isOpen) return null;

  const handleGeneratePdf = () => {
    // Generate styled print view window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Vui lòng cho phép popup trình duyệt để tải tập tin PDF bài thi.');
      return;
    }

    const title = testMode === 'reading'
      ? (isFullTest ? 'IELTS Academic Reading Full Test' : passages[0]?.title || 'IELTS Reading Passage')
      : (isFullTest ? 'IELTS Academic Listening Full Test' : listeningSections[0]?.title || 'IELTS Listening Part');

    let htmlContent = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>${title} - Printable PDF</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: #1e293b;
            padding: 40px;
            max-width: 850px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .header {
            border-bottom: 2px solid #005581;
            padding-bottom: 15px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .logo {
            font-size: 22px;
            font-weight: 800;
            color: #005581;
          }
          .subtitle {
            font-size: 13px;
            color: #64748b;
          }
          .passage-title {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 700;
            margin-top: 30px;
            margin-bottom: 10px;
            color: #0f172a;
          }
          .passage-text {
            background-color: #f8fafc;
            border-left: 3px solid #005581;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
            font-size: 14px;
            text-align: justify;
          }
          .paragraph {
            margin-bottom: 12px;
          }
          .paragraph-letter {
            font-weight: 700;
            color: #005581;
            margin-right: 6px;
          }
          .question-group {
            margin-top: 25px;
            padding: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            page-break-inside: avoid;
          }
          .group-title {
            font-weight: 800;
            font-size: 14px;
            color: #0f172a;
            margin-bottom: 5px;
          }
          .instructions {
            font-style: italic;
            font-size: 13px;
            color: #475569;
            margin-bottom: 12px;
          }
          .question-item {
            margin-bottom: 12px;
            font-size: 13.5px;
          }
          .q-num {
            font-weight: 700;
            color: #005581;
            display: inline-block;
            width: 30px;
          }
          .answer-key {
            margin-top: 40px;
            border-top: 2px dashed #94a3b8;
            padding-top: 20px;
            page-break-before: always;
          }
          .answer-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            font-size: 13px;
          }
          .answer-table th, .answer-table td {
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            text-align: left;
          }
          .answer-table th {
            background-color: #f1f5f9;
            font-weight: 700;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print()" style="background:#005581; color:#fff; font-weight:bold; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
            🖨️ In / Tải file PDF ngay
          </button>
        </div>

        <div class="header">
          <div>
            <div class="logo">🍔 IELTS Academic Practice</div>
            <div class="subtitle">${title}</div>
          </div>
          <div style="text-align: right; font-size: 12px; color: #64748b;">
            <div>Họ tên thí sinh: .......................................................</div>
            <div style="margin-top: 4px;">Ngày làm bài: ...... / ...... / 2026</div>
          </div>
        </div>
    `;

    if (testMode === 'reading') {
      passages.forEach((p) => {
        htmlContent += `
          <div class="passage-title">Passage ${p.id}: ${p.title}</div>
          <div class="passage-text">
        `;
        p.paragraphs.forEach((para) => {
          htmlContent += `
            <div class="paragraph">
              <span class="paragraph-letter">[${para.letter}]</span>
              ${para.text}
            </div>
          `;
        });
        htmlContent += `</div>`;

        p.questionGroups.forEach((group) => {
          htmlContent += `
            <div class="question-group">
              <div class="group-title">${group.title}</div>
              <div class="instructions">${group.instructions} ${group.wordLimitNotice ? '(' + group.wordLimitNotice + ')' : ''}</div>
          `;

          group.questions.forEach((q) => {
            htmlContent += `
              <div class="question-item">
                <span class="q-num">${q.number}.</span>
                <span>${q.text || ''}</span>
                ${q.options ? `<div style="margin-left:30px; margin-top:4px; font-size:13px; color:#475569;">${q.options.map((o) => `<div>• ${o}</div>`).join('')}</div>` : ''}
              </div>
            `;
          });

          htmlContent += `</div>`;
        });
      });
    } else {
      listeningSections.forEach((sec) => {
        htmlContent += `
          <div class="passage-title">Part ${sec.partNumber}: ${sec.title}</div>
        `;
        sec.questionGroups.forEach((group) => {
          htmlContent += `
            <div class="question-group">
              <div class="group-title">${group.title}</div>
              <div class="instructions">${group.instructions} ${group.wordLimitNotice ? '(' + group.wordLimitNotice + ')' : ''}</div>
          `;

          group.questions.forEach((q) => {
            htmlContent += `
              <div class="question-item">
                <span class="q-num">${q.number}.</span>
                <span>${q.text || ''}</span>
                ${q.options ? `<div style="margin-left:30px; margin-top:4px; font-size:13px; color:#475569;">${q.options.map((o) => `<div>• ${o}</div>`).join('')}</div>` : ''}
              </div>
            `;
          });

          htmlContent += `</div>`;
        });
      });
    }

    if (includeAnswers) {
      htmlContent += `
        <div class="answer-key">
          <h2 style="font-size:20px; font-weight:800; color:#005581;">BẢNG ĐÁP ÁN & LỜI GIẢI CHI TIẾT</h2>
          <table class="answer-table">
            <thead>
              <tr>
                <th style="width: 70px;">Câu số</th>
                <th>Đáp án chính xác</th>
                ${includeExplanations ? '<th>Giải thích & Trích dẫn</th>' : ''}
              </tr>
            </thead>
            <tbody>
      `;

      if (testMode === 'reading') {
        passages.forEach((p) => {
          p.questionGroups.forEach((g) => {
            g.questions.forEach((q) => {
              htmlContent += `
                <tr>
                  <td style="font-weight:bold; color:#005581;">Câu ${q.number}</td>
                  <td style="font-weight:bold; color:#047857;">${q.correctAnswer}</td>
                  ${includeExplanations ? `<td>${q.explanation || ''} ${q.referenceQuote ? '<br><i>"' + q.referenceQuote + '"</i>' : ''}</td>` : ''}
                </tr>
              `;
            });
          });
        });
      } else {
        listeningSections.forEach((sec) => {
          sec.questionGroups.forEach((g) => {
            g.questions.forEach((q) => {
              htmlContent += `
                <tr>
                  <td style="font-weight:bold; color:#005581;">Câu ${q.number}</td>
                  <td style="font-weight:bold; color:#047857;">${q.correctAnswer}</td>
                  ${includeExplanations ? `<td>${q.explanation || ''}</td>` : ''}
                </tr>
              `;
            });
          });
        });
      }

      htmlContent += `
            </tbody>
          </table>
        </div>
      `;
    }

    htmlContent += `
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 dark:bg-[#161822]/95 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 text-center relative border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          <div className="w-12 h-12 bg-[#005581]/10 text-[#005581] dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tải Bài Thi Dạng PDF / Đề In
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Hỗ trợ in đề ra giấy cho học viên thực hành offline
          </p>
        </div>

        {/* Options Form */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <label
              onClick={() => {
                setIncludeAnswers(false);
                setIncludeExplanations(false);
              }}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                !includeAnswers
                  ? 'border-[#005581] bg-[#005581]/5 text-[#005581] dark:text-sky-300 font-extrabold'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name="pdf_option"
                checked={!includeAnswers}
                onChange={() => {
                  setIncludeAnswers(false);
                  setIncludeExplanations(false);
                }}
                className="accent-[#005581]"
              />
              <div>
                <div className="text-xs font-bold">Chỉ tải Đề bài (Không đáp án)</div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Thích hợp in ra giấy tự bấm giờ giải đề thực tế
                </div>
              </div>
            </label>

            <label
              onClick={() => setIncludeAnswers(true)}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                includeAnswers
                  ? 'border-[#005581] bg-[#005581]/5 text-[#005581] dark:text-sky-300 font-extrabold'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name="pdf_option"
                checked={includeAnswers}
                onChange={() => setIncludeAnswers(true)}
                className="accent-[#005581]"
              />
              <div>
                <div className="text-xs font-bold">Đề bài kèm Bảng đáp án chính xác</div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Bao gồm bảng key đáp án ở cuối đề
                </div>
              </div>
            </label>
          </div>

          {includeAnswers && (
            <div className="pl-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={includeExplanations}
                  onChange={(e) => setIncludeExplanations(e.target.checked)}
                  className="rounded accent-[#005581]"
                />
                <span>Kèm lời giải chi tiết & trích dẫn dẫn chứng</span>
              </label>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleGeneratePdf}
              className="flex-1 py-2.5 px-4 bg-[#005581] hover:bg-[#004466] text-white rounded-xl font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Xuất PDF / In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
