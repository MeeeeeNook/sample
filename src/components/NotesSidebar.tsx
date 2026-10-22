import React, { useState } from 'react';
import { NoteItem } from '../types';

interface NotesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  notes: NoteItem[];
  currentPassageId?: number;
  onAddCustomNote?: (text: string) => void;
  onAddNote?: (text: string) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesSidebar: React.FC<NotesSidebarProps> = ({
  isOpen,
  onClose,
  notes,
  currentPassageId,
  onAddCustomNote,
  onAddNote,
  onDeleteNote,
}) => {
  const [newNoteInput, setNewNoteInput] = useState('');

  if (!isOpen) return null;

  const currentPassageNotes = currentPassageId
    ? notes.filter((n) => n.passageId === currentPassageId)
    : notes;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    if (onAddCustomNote) {
      onAddCustomNote(newNoteInput.trim());
    } else if (onAddNote) {
      onAddNote(newNoteInput.trim());
    }
    setNewNoteInput('');
  };

  return (
    <aside className="w-80 h-full bg-white dark:bg-[#1a1c23] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col shrink-0 transition-all duration-300 z-30 animate-in slide-in-from-right-4">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#005581] dark:text-sky-400 text-xl">edit_note</span>
          <h2 className="font-ui font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            {currentPassageId ? `Passage ${currentPassageId} Notes` : 'Test Notes'}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-lg"
          title="Close Sidebar"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Quick Add Note Form */}
      <form onSubmit={handleAdd} className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1c23]">
        <textarea
          value={newNoteInput}
          onChange={(e) => setNewNoteInput(e.target.value)}
          placeholder="Type a note or quote reflection..."
          className="w-full h-20 p-3 text-xs font-ui rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#005581] focus:ring-1 focus:ring-[#005581] resize-none placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={!newNoteInput.trim()}
          className="mt-2 w-full py-2 bg-[#005581] hover:bg-[#004466] disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs"
        >
          Save Note
        </button>
      </form>

      {/* Notes List */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-[#1a1c23]">
        {currentPassageNotes.length === 0 ? (
          <div className="text-center py-10 px-4">
            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">
              sticky_note_2
            </span>
            <p className="text-xs font-ui text-slate-500 dark:text-slate-400 italic leading-relaxed">
              Select text in the passage to add notes or highlight quotes. Your notes will appear here.
            </p>
          </div>
        ) : (
          currentPassageNotes.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 relative group shadow-2xs"
            >
              {item.quotedText && (
                <blockquote className="border-l-2 border-[#005581] dark:border-sky-400 pl-2.5 py-0.5 text-xs italic text-slate-700 dark:text-slate-200 mb-2 bg-sky-50 dark:bg-sky-950/40 rounded-r-lg">
                  "{item.quotedText}"
                  {item.paragraphLetter && (
                    <span className="block font-bold text-[10px] text-[#005581] dark:text-sky-300 not-italic mt-0.5">
                      Paragraph {item.paragraphLetter}
                    </span>
                  )}
                </blockquote>
              )}

              <p className="text-xs font-ui text-slate-800 dark:text-slate-100 font-medium leading-normal pr-6">
                {item.note}
              </p>

              <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400">
                <span>{item.timestamp}</span>
                <button
                  onClick={() => onDeleteNote(item.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  title="Delete Note"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
