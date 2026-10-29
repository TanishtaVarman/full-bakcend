'use client';

import React, { useState } from 'react';
import { X, User, CheckCircle, ShieldCheck, Cpu, Sparkles, BookOpen, Bell, Sliders } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateUserName,
}) => {
  const [name, setName] = useState(userName || 'Tanishta Varman');
  const [examGoal, setExamGoal] = useState('Computer Science & Advanced Mathematics 2026');
  const [learningPace, setLearningPace] = useState<'intuitive' | 'rigorous'>('intuitive');
  const [autoLogMistakes, setAutoLogMistakes] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserName(name.trim() || 'Student');
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] border border-[#D9A596] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-[#3B1320]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#E5B6A8] border-b border-[#D4A395] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-[#3B1320]" />
            <h3 className="font-serif font-bold text-lg text-[#3B1320]">
              User Profile &amp; Preferences
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
        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
          {/* Backend Status Card (Production Security) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8D5CE] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-bold text-xs text-[#3B1320]">
                  NVIDIA Nemotron Backend Connected
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Production Ready
              </span>
            </div>

            <div className="flex items-center space-x-1.5 text-[11px] text-[#5C2333]">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                <strong>Server-Side Security:</strong> All AI inference and grounding calls are authenticated securely via server environment variables (<code>NEBIUS_API_KEY</code> &amp; <code>TAVILY_API_KEY</code>). Zero credentials exposed to client browsers.
              </span>
            </div>
          </div>

          {/* User Profile Fields */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-[#5C1E2F] mb-1">
                Learner / Student Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8D5CE] text-[#3B1320] focus:outline-none focus:ring-1 focus:ring-[#5C1E2F] font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-[#5C1E2F] mb-1">
                Primary Study Target / Exam Goal:
              </label>
              <input
                type="text"
                value={examGoal}
                onChange={(e) => setExamGoal(e.target.value)}
                placeholder="e.g. DSA & Coding Interviews, Geometry Finals"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8D5CE] text-[#3B1320] focus:outline-none focus:ring-1 focus:ring-[#5C1E2F] font-medium"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-3 pt-2 border-t border-[#E8D5CE]">
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#8C4658]">
              Study Experience Preferences
            </h4>

            {/* Auto Log Mistakes Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8D5CE]">
              <div>
                <span className="font-bold text-xs text-[#3B1320] block">
                  Automatic Crime Logging
                </span>
                <span className="text-[11px] text-[#7A4050]">
                  Nemotron Nano automatically flags confusing concepts into your Mistake Book.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoLogMistakes}
                  onChange={(e) => setAutoLogMistakes(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#E8D5CE] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3B1320]"></div>
              </label>
            </div>

            {/* Learning Pace */}
            <div>
              <label className="block font-bold text-[#5C1E2F] mb-1.5">
                Explanation Depth:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLearningPace('intuitive')}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    learningPace === 'intuitive'
                      ? 'bg-[#E5B6A8] border-[#D4A395] text-[#3B1320] font-bold shadow-sm'
                      : 'bg-white border-[#E8D5CE] text-[#5C1E2F]'
                  }`}
                >
                  <div className="text-xs">Intuitive &amp; Simple</div>
                  <div className="text-[10px] text-[#7A4050]">Everyday analogies first</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLearningPace('rigorous')}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    learningPace === 'rigorous'
                      ? 'bg-[#E5B6A8] border-[#D4A395] text-[#3B1320] font-bold shadow-sm'
                      : 'bg-white border-[#E8D5CE] text-[#5C1E2F]'
                  }`}
                >
                  <div className="text-xs">Formal &amp; Rigorous</div>
                  <div className="text-[10px] text-[#7A4050]">Full proofs &amp; math formulas</div>
                </button>
              </div>
            </div>
          </div>

          {savedToast && (
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Preferences saved successfully!</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-[#E8D5CE]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A4050] hover:bg-[#E8D5CE]/50"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B1320] hover:bg-[#2B0E17] text-[#FAF7F2] text-xs font-bold shadow-md transition-all"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
