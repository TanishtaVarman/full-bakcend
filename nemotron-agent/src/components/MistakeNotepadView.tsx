'use client';

import React, { useState } from 'react';
import { SubjectData, MistakeEntry } from '@/lib/types';
import { BookOpen, Sparkles, Send, ArrowUpRight, Plus, CheckCircle, RefreshCw, AlertCircle, FileText } from 'lucide-react';

interface MistakeNotepadViewProps {
  subject: SubjectData;
  onSendSideChatMessage: (text: string) => void;
  onAddManualMistakeNote: (topic: string, note: string) => void;
  isLoadingSideChat: boolean;
  onGenerateTest: () => void;
}

export const MistakeNotepadView: React.FC<MistakeNotepadViewProps> = ({
  subject,
  onSendSideChatMessage,
  onAddManualMistakeNote,
  isLoadingSideChat,
  onGenerateTest,
}) => {
  const [sideInput, setSideInput] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleSideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sideInput.trim() && !isLoadingSideChat) {
      onSendSideChatMessage(sideInput.trim());
      setSideInput('');
    }
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim() && newNote.trim()) {
      onAddManualMistakeNote(newTopic.trim(), newNote.trim());
      setNewTopic('');
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="flex-1 flex bg-[#FAF7F2] text-[#3B1320] h-screen overflow-hidden">
      {/* LEFT 65%: The "Notepad Kinda Thing" (Mockup Page 2) */}
      <div className="w-[62%] border-r border-[#E8D5CE] flex flex-col justify-between h-full bg-[#FCF9F5]">
        {/* Notepad Top Header */}
        <div className="p-6 border-b border-[#E8D5CE] flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#8C4658]">
                {subject.name} • Crime Book
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5B6A8] text-[#3B1320] font-bold">
                {subject.mistakeBook.length} Concepts Under Watch
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#3B1320] mt-1">
              Mistake Notebook & Troublesome Topics
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAddingNote(!isAddingNote)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#E5B6A8]/70 hover:bg-[#E5B6A8] text-[#3B1320] text-xs font-bold transition-all border border-[#D9A596]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Note</span>
            </button>

            <button
              onClick={onGenerateTest}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#3B1320] hover:bg-[#2B0E17] text-[#FAF7F2] text-xs font-bold transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5B6A8]" />
              <span>Generate Test</span>
            </button>
          </div>
        </div>

        {/* Notepad Document Body (Lined / Bullet Point Notepad Style) */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {isAddingNote && (
            <form
              onSubmit={handleCreateNote}
              className="p-4 rounded-2xl bg-white border border-[#D4A395] shadow-sm space-y-3 animate-fadeIn"
            >
              <div className="font-bold text-xs text-[#5C1E2F]">
                Log a New Mistake or Concept You Find Difficult:
              </div>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Topic name (e.g. C++ Function Pointers, Pythagorean 3D)"
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8D5CE] text-xs focus:outline-none font-medium"
              />
              <textarea
                rows={2}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="What did you trip on? What is the rule to remember?"
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8D5CE] text-xs focus:outline-none"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="px-3 py-1 rounded-lg text-xs text-[#7A4050]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded-lg bg-[#3B1320] text-white text-xs font-bold"
                >
                  Save to Crime Book
                </button>
              </div>
            </form>
          )}

          {subject.mistakeBook.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 text-[#7A4050]">
              <BookOpen className="w-8 h-8 opacity-40" />
              <p className="font-serif font-bold text-sm">No mistakes logged yet!</p>
              <p className="text-xs max-w-sm">
                Chat with the AI on the main page or in the side chat on the right. When you struggle with a topic, it will appear here automatically!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Bulleted Notepad entries matching mockup Page 2 */}
              <div className="space-y-4">
                {subject.mistakeBook.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-[#E8D5CE] shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#E5B6A8] text-[#3B1320] font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="font-serif font-bold text-base text-[#3B1320]">
                          {item.topic}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F0DDD8] text-[#5C1E2F] font-bold border border-[#D9A596]">
                          Tripped {item.frequency}x
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-medium">
                          {item.mistakeType}
                        </span>
                      </div>
                    </div>

                    {/* What was confusing / Tripped up on */}
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8D5CE] text-xs leading-relaxed space-y-1">
                      <div className="font-bold text-[#8C344A] flex items-center gap-1 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Where you tripped up:</span>
                      </div>
                      <p className="text-[#3B1320]">{item.mistakeDescription}</p>
                    </div>

                    {/* Simple Mental Rule to Remember */}
                    <div className="text-xs text-[#2B0E17] leading-relaxed">
                      <span className="font-bold text-[#3B1320]">💡 Golden Rule to Remember: </span>
                      {item.simplifiedExplanation}
                    </div>

                    {/* Bullet Points of Notes */}
                    {item.notes && item.notes.length > 0 && (
                      <div className="pt-2 border-t border-[#F0DDD8] space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C4658]">
                          Personal Study Notes:
                        </span>
                        <ul className="list-disc list-inside text-xs text-[#5C2333] space-y-0.5">
                          {item.notes.map((note, nIdx) => (
                            <li key={nIdx}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notepad Footer Status */}
        <div className="p-4 border-t border-[#E8D5CE] bg-[#FAF7F2] flex items-center justify-between text-xs text-[#7A4050]">
          <span>Notes auto-sync with Nebius Nemotron persistent memory</span>
          <span className="font-mono text-[11px]">Last synced: Just now</span>
        </div>
      </div>

      {/* RIGHT 38%: Dedicated Side Chatbot (Mockup Page 2) */}
      <div className="w-[38%] flex flex-col justify-between h-full bg-[#FAF7F2]">
        {/* Side Chat Header */}
        <div className="p-4 border-b border-[#E8D5CE] bg-[#FAF7F2] flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-sm text-[#3B1320]">
              Mistake Book Copilot
            </h3>
            <p className="text-[11px] text-[#7A4050]">
              Ask questions to refine these difficult topics
            </p>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        </div>

        {/* Side Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {subject.sideChatMessages.length === 0 ? (
            <div className="text-center py-10 px-4 text-xs text-[#7A4050] space-y-2">
              <p className="font-semibold text-[#3B1320]">Ask more questions on this topic!</p>
              <p>
                Anything you ask or practice here will automatically update into your Mistake Book on the left.
              </p>
            </div>
          ) : (
            subject.sideChatMessages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-0.5`}
                >
                  <div
                    className={`max-w-[90%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#E5B6A8] text-[#3B1320] font-medium rounded-br-none shadow-sm'
                        : 'bg-white text-[#2B0E17] border border-[#E8D5CE] rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                  <span className="text-[9px] text-[#9E6573] font-mono px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })
          )}

          {isLoadingSideChat && (
            <div className="text-xs text-[#7A4050] p-2 bg-white/70 rounded-lg border border-[#E8D5CE] w-fit">
              Updating Crime Book...
            </div>
          )}
        </div>

        {/* Side Chat Input (Matching Page 2 Pill) */}
        <div className="p-4 border-t border-[#E8D5CE] bg-[#FAF7F2]">
          <form onSubmit={handleSideSubmit} className="relative flex items-center">
            <input
              type="text"
              value={sideInput}
              onChange={(e) => setSideInput(e.target.value)}
              placeholder="exapnd on the topic in more easy terms"
              className="w-full py-2.5 pl-4 pr-10 rounded-full bg-white border border-[#3B1320] text-xs text-[#3B1320] placeholder-[#8C4658]/70 focus:outline-none focus:ring-1 focus:ring-[#5C1E2F]/30 shadow-sm"
              disabled={isLoadingSideChat}
            />
            <button
              type="submit"
              disabled={!sideInput.trim() || isLoadingSideChat}
              className="absolute right-1.5 w-7 h-7 rounded-full bg-[#E5B6A8] hover:bg-[#D9A596] disabled:opacity-40 text-[#3B1320] flex items-center justify-center transition-all"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
