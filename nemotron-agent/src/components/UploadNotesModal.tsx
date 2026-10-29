'use client';

import React, { useState } from 'react';
import { X, UploadCloud, FileText, Sparkles, BookOpen } from 'lucide-react';

interface UploadNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSubject: (name: string, category: string, notes: string) => void;
}

export const UploadNotesModal: React.FC<UploadNotesModalProps> = ({
  isOpen,
  onClose,
  onCreateSubject,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateSubject(name.trim(), category, notes.trim());
      setName('');
      setNotes('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] border border-[#D9A596] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-[#3B1320]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#E5B6A8] border-b border-[#D4A395] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#3B1320]" />
            <h3 className="font-serif font-bold text-lg text-[#3B1320]">
              Upload Study Notes / Create Subject
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#3B1320] hover:bg-[#D4A395] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#5C1E2F] mb-1">
              Subject / Topic Name:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Physics: Quantum Mechanics or DSA: Trees & Graphs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8D5CE] text-[#3B1320] focus:outline-none focus:ring-1 focus:ring-[#5C1E2F] text-xs font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-[#5C1E2F] mb-1">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8D5CE] text-[#3B1320] focus:outline-none focus:ring-1 focus:ring-[#5C1E2F] text-xs font-medium"
            >
              <option value="Computer Science">Computer Science & DSA</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Natural Science">Natural Science</option>
              <option value="History & Humanities">History & Humanities</option>
              <option value="Languages">Languages & Literature</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#5C1E2F] mb-1">
              Paste Your Notes, Syllabus, or Difficult Material:
            </label>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste lecture notes, textbook passages, or code snippets here... CrimeBook will scan them to initialize your personal mistake notebook and test questions!"
              className="w-full p-3.5 rounded-2xl bg-white border border-[#E8D5CE] text-[#3B1320] placeholder-[#8C4658]/50 focus:outline-none focus:ring-1 focus:ring-[#5C1E2F] text-xs leading-relaxed"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#E5B6A8]/40 border border-[#D9A596] text-[11px] text-[#5C1E2F]">
            💡 <strong>Automatic Crime Detection:</strong> As soon as you begin studying, Nemotron Nano identifies concepts you ask repeatedly about and builds your custom mistake book!
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A4050] hover:bg-[#E8D5CE]/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B1320] hover:bg-[#2B0E17] text-[#FAF7F2] text-xs font-bold shadow-md transition-all"
            >
              Initialize Subject & Mistake Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
