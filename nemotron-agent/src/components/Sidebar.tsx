'use client';

import React from 'react';
import { ActiveView, SubjectData } from '@/lib/types';
import { ChevronDown, ChevronRight, Check, Plus, BookOpen, MessageSquare, Award, AlertCircle, Settings, Shield } from 'lucide-react';

interface SidebarProps {
  subjects: SubjectData[];
  activeSubjectId: string;
  activeView: ActiveView;
  onSelectSubject: (id: string) => void;
  onSelectView: (view: ActiveView) => void;
  onOpenUpload: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  subjects,
  activeSubjectId,
  activeView,
  onSelectSubject,
  onSelectView,
  onOpenUpload,
  onOpenSettings,
}) => {
  const activeSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  return (
    <aside className="w-80 flex-shrink-0 bg-[#E5B6A8] text-[#3B1320] flex flex-col justify-between border-r border-[#D9A596] select-none min-h-screen">
      <div className="p-6 space-y-6">
        {/* Top Header - Stylized like the PDF */}
        <div className="border-b border-[#D4A395] pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#723242]">
              Personal AI • Crime Book
            </span>
            <button
              onClick={onOpenSettings}
              className="p-1 rounded-md text-[#5B1F2F] hover:bg-[#D9A596]/60 transition-colors"
              title="API Keys & Personal AI Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <h1 className="text-4xl font-serif font-bold tracking-tight text-[#3B1320] mt-1">
            {activeSubject?.name.split(':')[0] || 'CrimeBook'}
          </h1>
        </div>

        {/* Subjects & Nested Mistake Book Tree */}
        <nav className="space-y-3">
          {subjects.map((sub) => {
            const isSelected = sub.id === activeSubjectId;

            return (
              <div key={sub.id} className="space-y-1">
                {/* Subject Header Row */}
                <button
                  onClick={() => onSelectSubject(sub.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#DDAEA0] text-[#3B1320] font-bold shadow-sm'
                      : 'text-[#4A1E2B] hover:bg-[#DEB2A4]/60 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span className="text-sm truncate">{sub.name}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-[#3B1320]">
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <ChevronDown className="w-4 h-4" />
                      </>
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    )}
                  </div>
                </button>

                {/* Expanded Sub-Sections (Exactly matching the user's PDF!) */}
                {isSelected && (
                  <div className="pl-6 pr-2 py-1 space-y-1 animate-fadeIn">
                    {/* 1. Study Chat */}
                    <button
                      onClick={() => onSelectView('chat')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        activeView === 'chat'
                          ? 'bg-[#3B1320] text-[#FAF7F2] shadow-sm'
                          : 'text-[#4A1E2B] hover:bg-[#D9A596]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Study Chat</span>
                      </div>
                      <span className="text-[10px] opacity-80">
                        {sub.chatMessages.length} msgs
                      </span>
                    </button>

                    {/* 2. Mistake Book (Crime Book) */}
                    <button
                      onClick={() => onSelectView('mistake-book')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        activeView === 'mistake-book'
                          ? 'bg-[#3B1320] text-[#FAF7F2] shadow-sm'
                          : 'text-[#4A1E2B] hover:bg-[#D9A596]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Mistake Book</span>
                      </div>
                      {sub.mistakeBook.length > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E5B6A8] text-[#3B1320] font-bold">
                          {sub.mistakeBook.length}
                        </span>
                      )}
                    </button>

                    {/* 3. Test */}
                    <button
                      onClick={() => onSelectView('test')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        activeView === 'test'
                          ? 'bg-[#3B1320] text-[#FAF7F2] shadow-sm'
                          : 'text-[#4A1E2B] hover:bg-[#D9A596]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Test</span>
                      </div>
                      <span className="text-[10px] opacity-80">
                        {sub.testQuestions.length} Qs
                      </span>
                    </button>

                    {/* 4. Test Corrections */}
                    <button
                      onClick={() => onSelectView('test-corrections')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        activeView === 'test-corrections'
                          ? 'bg-[#3B1320] text-[#FAF7F2] shadow-sm'
                          : 'text-[#4A1E2B] hover:bg-[#D9A596]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Award className="w-3.5 h-3.5" />
                        <span>Test corrections</span>
                      </div>
                      {sub.testCorrections.length > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-800 text-white font-bold">
                          Review
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action: Add Subject / Upload Notes */}
      <div className="p-4 border-t border-[#D4A395] space-y-2">
        <button
          onClick={onOpenUpload}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#3B1320] hover:bg-[#2B0E17] text-[#FAF7F2] text-xs font-bold transition-all shadow-md shadow-[#3B1320]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Material / New Subject</span>
        </button>

        <div className="flex items-center justify-between px-1 text-[11px] text-[#5C2333]">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-800" /> Private Data Control
          </span>
          <span className="font-mono text-[10px]">Nebius AI</span>
        </div>
      </div>
    </aside>
  );
};
