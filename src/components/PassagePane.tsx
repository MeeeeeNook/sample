import React, { useState, useRef, useEffect } from 'react';
import { Passage, FontSize, HighlightItem } from '../types';

interface PassagePaneProps {
  passage: Passage;
  fontSize: FontSize;
  highlights: HighlightItem[];
  onAddHighlight: (highlight: Omit<HighlightItem, 'id'>) => void;
  onAddNoteFromText: (paragraphLetter: string, selectedText: string) => void;
  locatedQuote?: { paragraphLetter: string; quote?: string; questionNum?: number } | null;
  onLookupDictionary?: (text: string) => void;
}

export const PassagePane: React.FC<PassagePaneProps> = ({
  passage,
  fontSize,
  highlights,
  onAddHighlight,
  onAddNoteFromText,
  locatedQuote,
  onLookupDictionary,
}) => {
  const [selectionPopover, setSelectionPopover] = useState<{
    x: number;
    y: number;
    text: string;
    paragraphLetter: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll to located paragraph on locate quote change
  useEffect(() => {
    if (locatedQuote && paragraphRefs.current[locatedQuote.paragraphLetter]) {
      paragraphRefs.current[locatedQuote.paragraphLetter]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [locatedQuote]);

  // Map font size
  const getFontSizeClass = (size: FontSize) => {
    switch (size) {
      case 'xs':
        return 'text-sm leading-relaxed';
      case 'sm':
        return 'text-base leading-relaxed';
      case 'md':
        return 'text-lg leading-loose';
      case 'lg':
        return 'text-xl leading-loose';
      case 'xl':
        return 'text-2xl leading-loose';
      default:
        return 'text-lg leading-loose';
    }
  };

  const handleMouseUp = (paragraphLetter: string) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectionPopover(null);
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length < 3) {
      setSelectionPopover(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setSelectionPopover({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 45,
        text: selectedText,
        paragraphLetter,
      });
    }
  };

  const applyHighlight = (color: 'yellow' | 'green' | 'blue') => {
    if (!selectionPopover) return;
    onAddHighlight({
      passageId: passage.id,
      paragraphLetter: selectionPopover.paragraphLetter,
      selectedText: selectionPopover.text,
      color,
    });
    setSelectionPopover(null);
    window.getSelection()?.removeAllRanges();
  };

  const handleCreateNote = () => {
    if (!selectionPopover) return;
    onAddNoteFromText(selectionPopover.paragraphLetter, selectionPopover.text);
    setSelectionPopover(null);
    window.getSelection()?.removeAllRanges();
  };

  // Render paragraph with highlights & reference quote location
  const renderParagraphText = (paragraphLetter: string, fullText: string) => {
    const pHighlights = highlights.filter(
      (h) => h.passageId === passage.id && h.paragraphLetter === paragraphLetter
    );

    const isLocated = locatedQuote && locatedQuote.paragraphLetter === paragraphLetter;

    // Check if we have a quote snippet to highlight
    let cleanQuote = locatedQuote?.quote ? locatedQuote.quote.replace(/^\.\.\.\s*/, '').replace(/\s*\.\.\.$/, '').trim() : '';

    if (!pHighlights.length && !isLocated) {
      return fullText;
    }

    // If located paragraph without user highlights, perform quote match or full highlight
    if (isLocated && pHighlights.length === 0) {
      if (cleanQuote && fullText.includes(cleanQuote)) {
        const idx = fullText.indexOf(cleanQuote);
        const before = fullText.substring(0, idx);
        const match = fullText.substring(idx, idx + cleanQuote.length);
        const after = fullText.substring(idx + cleanQuote.length);

        return (
          <>
            {before}
            <mark className="bg-amber-200/90 dark:bg-amber-600/80 text-gray-900 dark:text-amber-100 font-semibold px-1 py-0.5 rounded border border-amber-300 ring-2 ring-amber-400/50">
              {match}
            </mark>
            {after}
          </>
        );
      } else {
        // Highlight whole sentence or paragraph softly
        return (
          <span className="bg-amber-100/80 dark:bg-amber-950/40 text-gray-900 dark:text-amber-100 font-medium px-1 py-0.5 rounded border border-amber-300/60">
            {fullText}
          </span>
        );
      }
    }

    // Replace highlighted fragments
    let parts: { text: string; highlightColor?: string }[] = [{ text: fullText }];

    pHighlights.forEach((hl) => {
      const newParts: { text: string; highlightColor?: string }[] = [];
      parts.forEach((part) => {
        if (part.highlightColor) {
          newParts.push(part);
          return;
        }

        const idx = part.text.indexOf(hl.selectedText);
        if (idx !== -1) {
          const before = part.text.substring(0, idx);
          const match = part.text.substring(idx, idx + hl.selectedText.length);
          const after = part.text.substring(idx + hl.selectedText.length);

          if (before) newParts.push({ text: before });
          newParts.push({ text: match, highlightColor: hl.color });
          if (after) newParts.push({ text: after });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return (
      <>
        {parts.map((part, index) => {
          if (part.highlightColor) {
            const bgClass =
              part.highlightColor === 'yellow'
                ? 'bg-yellow-200 dark:bg-yellow-900/60 text-slate-900 dark:text-yellow-100'
                : part.highlightColor === 'green'
                ? 'bg-emerald-200 dark:bg-emerald-900/60 text-slate-900 dark:text-emerald-100'
                : 'bg-sky-200 dark:bg-sky-900/60 text-slate-900 dark:text-sky-100';

            return (
              <mark key={index} className={`${bgClass} rounded px-0.5 py-0.2 cursor-pointer`}>
                {part.text}
              </mark>
            );
          }
          return <span key={index}>{part.text}</span>;
        })}
      </>
    );
  };

  return (
    <section
      ref={containerRef}
      className="flex-1 h-full overflow-y-auto bg-white border-r border-slate-200 p-6 md:p-8 select-text custom-scrollbar"
    >
      {/* Floating Text Selection Popover */}
      {selectionPopover && (
        <div
          style={{
            left: `${Math.max(20, selectionPopover.x - 120)}px`,
            top: `${Math.max(10, selectionPopover.y)}px`,
          }}
          className="absolute z-50 bg-slate-900 text-white rounded-xl shadow-2xl p-1.5 flex items-center gap-1.5 border border-slate-700 animate-in zoom-in-95 duration-150"
        >
          <button
            onClick={() => applyHighlight('yellow')}
            className="w-5 h-5 rounded-full bg-amber-300 hover:scale-110 transition-transform shadow-2xs"
            title="Yellow Highlight"
          />
          <button
            onClick={() => applyHighlight('green')}
            className="w-5 h-5 rounded-full bg-emerald-400 hover:scale-110 transition-transform shadow-2xs"
            title="Green Highlight"
          />
          <button
            onClick={() => applyHighlight('blue')}
            className="w-5 h-5 rounded-full bg-sky-300 hover:scale-110 transition-transform shadow-2xs"
            title="Blue Highlight"
          />
          <div className="w-[1px] h-4 bg-slate-700 my-1 mx-0.5" />
          <button
            onClick={handleCreateNote}
            className="px-2.5 py-1 text-xs font-bold hover:bg-slate-800 rounded-lg flex items-center gap-1 text-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            Add Note
          </button>
          {onLookupDictionary && (
            <button
              onClick={() => {
                if (selectionPopover && selectionPopover.text) {
                  onLookupDictionary(selectionPopover.text);
                  setSelectionPopover(null);
                }
              }}
              className="px-2.5 py-1 text-xs font-bold bg-[#005581] hover:bg-[#004466] text-white rounded-lg flex items-center gap-1 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              Tra từ
            </button>
          )}
        </div>
      )}

      <div className="max-w-[760px] mx-auto pb-16">
        {/* Passage Title Header */}
        <div className="mb-6 pb-4 border-b border-slate-200">
          <div className="inline-block bg-[#005581]/10 text-[#005581] text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
            IELTS Academic Reading
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {passage.title}
          </h2>
        </div>

        {/* Intro Subtitle Block if available */}
        {passage.introParagraphs && passage.introParagraphs.length > 0 && (
          <div className="bg-slate-50 p-4 rounded-xl mb-6 border-l-4 border-[#005581] shadow-2xs">
            {passage.introParagraphs.map((para, idx) => (
              <p
                key={idx}
                className={`text-slate-700 font-medium ${
                  idx > 0 ? 'mt-2 text-slate-600' : ''
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Paragraph Blocks */}
        <div className="space-y-5 text-slate-800 leading-relaxed text-[15px]">
          {passage.paragraphs.map((p) => {
            const isLocated = locatedQuote && locatedQuote.paragraphLetter === p.letter;
            return (
              <div
                key={p.letter}
                ref={(el) => (paragraphRefs.current[p.letter] = el)}
                onMouseUp={() => handleMouseUp(p.letter)}
                className={`p-3.5 rounded-xl transition-all duration-300 border ${
                  isLocated
                    ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                    : 'bg-white border-transparent hover:bg-slate-50/80 hover:border-slate-200'
                }`}
              >
                <div className={getFontSizeClass(fontSize)}>
                  <span className="inline-flex items-center justify-center bg-[#e8f2fe] text-[#005581] text-xs font-black px-2 py-0.5 rounded-md mr-2.5 shadow-2xs align-middle">
                    {p.letter}
                  </span>
                  {renderParagraphText(p.letter, p.text)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
