'use client';

import React, { useState } from 'react';
import { SubjectData, TestQuestion } from '@/lib/types';
import { FileQuestion, Send, CheckCircle, RefreshCw, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';

interface TestViewProps {
  subject: SubjectData;
  onSubmitAnswers: (answers: Record<string, string>) => void;
  onRegenerateQuestions: () => void;
  isSubmitting: boolean;
  isGenerating: boolean;
}

export const TestView: React.FC<TestViewProps> = ({
  subject,
  onSubmitAnswers,
  onRegenerateQuestions,
  isSubmitting,
  isGenerating,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    subject.testQuestions.forEach((q) => {
      initial[q.id] = q.userAnswer || '';
    });
    return initial;
  });

  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      onSubmitAnswers(answers);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF7F2] text-[#3B1320] h-screen overflow-hidden">
      {/* Test Top Header */}
      <div className="p-6 border-b border-[#E8D5CE] bg-[#FAF7F2] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8C4658]">
              {subject.name} • Diagnostic Evaluation
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5B6A8] text-[#3B1320] font-bold">
              Targeted to Your Mistakes
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#3B1320] mt-1">
            Personal Diagnostic Test
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRegenerateQuestions}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D9A596] text-[#3B1320] text-xs font-bold hover:bg-[#E5B6A8]/40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate Questions</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || subject.testQuestions.length === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#3B1320] hover:bg-[#2B0E17] text-white text-xs font-bold shadow-md shadow-[#3B1320]/20 disabled:opacity-40 transition-all"
          >
            {isSubmitting ? (
              <span>Grading with Nemotron 3 Ultra...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Corrections</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Area: Questions on Left + Search Paper Card on Right (Mockup Page 3) */}
      <div className="flex-1 overflow-y-auto p-8 relative flex gap-6">
        {/* Questions List */}
        <div className="flex-1 space-y-6 max-w-3xl">
          {subject.testQuestions.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <FileQuestion className="w-10 h-10 text-[#8C4658] opacity-40" />
              <p className="font-serif font-bold text-base text-[#3B1320]">
                No test questions generated yet
              </p>
              <p className="text-xs text-[#7A4050] max-w-sm">
                Click &ldquo;Regenerate Questions&rdquo; to have NVIDIA Nemotron create a test based on the exact concepts you tripped on in your Mistake Book!
              </p>
              <button
                onClick={onRegenerateQuestions}
                className="px-4 py-2 rounded-xl bg-[#3B1320] text-white text-xs font-bold"
              >
                Generate Diagnostic Test
              </button>
            </div>
          ) : (
            subject.testQuestions.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-white border border-[#E8D5CE] shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#E5B6A8] text-[#3B1320] font-bold text-xs font-serif">
                      Question {q.questionNumber}
                    </span>
                    <span className="text-xs text-[#8C4658] font-medium">
                      Targeting: <strong>{q.targetedMistakeTopic}</strong>
                    </span>
                  </div>
                </div>

                <p className="font-serif text-base text-[#2B0E17] font-semibold leading-relaxed">
                  {q.questionText}
                </p>

                {q.hint && (
                  <div className="text-xs text-[#7A4050] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#F0DDD8]">
                    💡 <em>Hint: {q.hint}</em>
                  </div>
                )}

                {/* Answer Box */}
                <div>
                  <label className="block text-xs font-bold text-[#5C1E2F] mb-1.5">
                    Your Answer / Solution:
                  </label>
                  <textarea
                    rows={4}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder="Type your explanation, formula steps, or answer here..."
                    className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8D5CE] text-sm text-[#2B0E17] placeholder-[#8C4658]/50 focus:outline-none focus:ring-1 focus:ring-[#5C1E2F]"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* The "Search Paper" Metadata Card (Directly from Mockup Page 3 bottom-right!) */}
        <div className="w-72 flex-shrink-0">
          <div className="p-5 rounded-3xl bg-[#E5B6A8] border border-[#D9A596] shadow-sm space-y-3 sticky top-4">
            <div className="font-serif font-bold text-sm text-[#3B1320] border-b border-[#D4A395] pb-2">
              Search Paper
            </div>

            <div className="text-xs space-y-2 text-[#4A1E2B]">
              <div>
                <span className="font-bold block text-[11px] text-[#7A3345]">Topic:</span>
                <span className="font-medium">{subject.paperInfo.topic}</span>
              </div>

              <div>
                <span className="font-bold block text-[11px] text-[#7A3345]">Date:</span>
                <span className="font-medium">{subject.paperInfo.date}</span>
              </div>

              <div>
                <span className="font-bold block text-[11px] text-[#7A3345] mb-1">Keywords:</span>
                <div className="flex flex-wrap gap-1">
                  {subject.paperInfo.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/70 text-[#3B1320] font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D4A395] text-[11px] text-[#5C1E2F] italic">
              Questions adapt in real-time as you chat and update your Crime Book!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
