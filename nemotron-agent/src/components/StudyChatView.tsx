'use client';

import React, { useState } from 'react';
import { SubjectData, ChatMessage } from '@/lib/types';
import { ArrowUpRight, Sparkles, BookOpen, AlertTriangle, Send, Loader2 } from 'lucide-react';

interface StudyChatViewProps {
  subject: SubjectData;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onNavigateToMistakeBook: () => void;
}

export const StudyChatView: React.FC<StudyChatViewProps> = ({
  subject,
  onSendMessage,
  isLoading,
  onNavigateToMistakeBook,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!isLoading) {
      onSendMessage(prompt);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF7F2] text-[#3B1320] h-screen overflow-hidden">
      {/* Subject Header Banner */}
      <header className="px-8 py-5 border-b border-[#E8D5CE] bg-[#FAF7F2]/90 backdrop-blur-sm flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8C4658]">
              {subject.category} • Study Session
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E5B6A8] text-[#3B1320] font-bold">
              Personal AI Active
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#3B1320] mt-0.5">
            {subject.name}
          </h2>
        </div>

        {/* Mistake Count Pill */}
        <button
          onClick={onNavigateToMistakeBook}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#E5B6A8]/70 hover:bg-[#E5B6A8] text-[#3B1320] text-xs font-bold transition-all border border-[#D9A596]"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#5C1E2F]" />
          <span>Mistake Book ({subject.mistakeBook.length} logged)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {subject.chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E5B6A8] flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6 text-[#5C1E2F]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#3B1320]">
                Start studying {subject.name}
              </h3>
              <p className="text-xs text-[#7A4B58] leading-relaxed">
                Ask anything from your notes or textbook. When you ask questions repeatedly or get confused, our personal AI tutor automatically marks your trouble spots into your private <strong>Mistake Book (Crime Book)</strong>!
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button
                onClick={() => handleQuickPrompt('can you expand on the topic in more easy terms?')}
                className="text-xs px-3 py-1.5 rounded-full bg-[#E5B6A8]/50 hover:bg-[#E5B6A8] text-[#3B1320] font-medium border border-[#D9A596] transition-colors"
              >
                &ldquo;can you expand on the topic in more easy terms&rdquo;
              </button>
              <button
                onClick={() => handleQuickPrompt('What are the most common mistakes students make here?')}
                className="text-xs px-3 py-1.5 rounded-full bg-[#E5B6A8]/50 hover:bg-[#E5B6A8] text-[#3B1320] font-medium border border-[#D9A596] transition-colors"
              >
                &ldquo;What are common mistakes students make here?&rdquo;
              </button>
            </div>
          </div>
        ) : (
          subject.chatMessages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                {/* Detected Mistake Notification Toast */}
                {msg.detectedMistake && (
                  <div className="mb-2 max-w-xl p-2.5 rounded-xl bg-[#F0DDD8] border border-[#D4A395] text-xs flex items-start space-x-2 text-[#5C1E2F] shadow-sm animate-fadeIn">
                    <AlertTriangle className="w-4 h-4 text-[#8C344A] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">
                        Logged to Mistake Book: &ldquo;{msg.detectedMistake.topic}&rdquo;
                      </span>
                      <p className="text-[11px] text-[#7A4050] mt-0.5">
                        {msg.detectedMistake.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-2xl px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#E5B6A8] text-[#3B1320] font-medium rounded-br-sm shadow-sm'
                      : 'bg-white text-[#2B0E17] border border-[#E8D5CE] rounded-bl-sm shadow-sm font-sans'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>

                <span className="text-[10px] text-[#9E6573] px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-[#7A4050] p-3 rounded-xl bg-white/60 border border-[#E8D5CE] w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-[#5C1E2F]" />
            <span>Nemotron AI is reviewing your notes & detecting trouble spots...</span>
          </div>
        )}
      </div>

      {/* Bottom Pill Input (Exactly matching Page 1 of the user's PDF!) */}
      <div className="p-6 bg-[#FAF7F2] border-t border-[#E8D5CE]">
        <form
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto flex items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="can you expand on the topic in more easy terms"
            className="w-full py-3.5 pl-6 pr-14 rounded-full bg-white border border-[#3B1320] text-sm text-[#3B1320] placeholder-[#8C4658]/70 focus:outline-none focus:ring-2 focus:ring-[#5C1E2F]/30 shadow-md font-sans"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-2 w-9 h-9 rounded-full bg-[#E5B6A8] hover:bg-[#D9A596] disabled:opacity-40 text-[#3B1320] flex items-center justify-center transition-all shadow-sm"
            title="Ask Personal AI Tutor"
          >
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
