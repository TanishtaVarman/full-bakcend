'use client';

import React from 'react';
import { SubjectData, TestCorrection } from '@/lib/types';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, BookOpen, Sparkles, Check, BookmarkPlus } from 'lucide-react';

interface TestCorrectionsViewProps {
  subject: SubjectData;
  onSyncGapsToMistakeBook: () => void;
  onBackToTest: () => void;
}

export const TestCorrectionsView: React.FC<TestCorrectionsViewProps> = ({
  subject,
  onSyncGapsToMistakeBook,
  onBackToTest,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF7F2] text-[#3B1320] h-screen overflow-hidden">
      {/* Top Header */}
      <div className="p-6 border-b border-[#E8D5CE] bg-[#FAF7F2] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8C4658]">
              {subject.name} • AI Diagnostic Feedback
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              Evaluated by Nemotron 3 Ultra
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#3B1320] mt-1">
            Test Corrections & Mistake Diagnosis
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToTest}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D9A596] text-[#3B1320] text-xs font-bold hover:bg-[#E5B6A8]/40 transition-colors"
          >
            Retake Test
          </button>

          <button
            onClick={onSyncGapsToMistakeBook}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#3B1320] hover:bg-[#2B0E17] text-white text-xs font-bold shadow-md shadow-[#3B1320]/20 transition-all"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-[#E5B6A8]" />
            <span>Sync New Gaps to Crime Book</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Corrections on Left + Search Paper Card on Right (Mockup Page 4) */}
      <div className="flex-1 overflow-y-auto p-8 relative flex gap-6">
        {/* Corrections Stream */}
        <div className="flex-1 space-y-6 max-w-3xl">
          {subject.testCorrections.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 opacity-60" />
              <p className="font-serif font-bold text-base text-[#3B1320]">
                No test corrections yet
              </p>
              <p className="text-xs text-[#7A4050] max-w-sm">
                Head over to the <strong>Test</strong> tab, answer the questions, and submit your responses to get a detailed diagnosis of your mistakes!
              </p>
              <button
                onClick={onBackToTest}
                className="px-4 py-2 rounded-xl bg-[#3B1320] text-white text-xs font-bold"
              >
                Go to Test Tab
              </button>
            </div>
          ) : (
            subject.testCorrections.map((corr, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#E8D5CE] shadow-sm space-y-5"
              >
                {/* Question Title Header */}
                <div className="flex items-start justify-between border-b border-[#F0DDD8] pb-3">
                  <div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#E5B6A8] text-[#3B1320] font-bold text-xs font-serif mr-2">
                      Answer {corr.questionNumber}
                    </span>
                    <span className="text-xs font-semibold text-[#3B1320]">
                      {corr.questionText}
                    </span>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
                      corr.isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {corr.isCorrect ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Revision Needed
                      </>
                    )}
                  </span>
                </div>

                {/* 1. Correct Model Answer (First section, as requested in mockup Page 4) */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1. Correct Model Answer:</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs leading-relaxed text-[#1F4430] whitespace-pre-line font-mono">
                    {corr.correctAnswer}
                  </div>
                </div>

                {/* 2. Your Answer and Mistakes Made (Second section under it, as requested in mockup Page 4) */}
                <div className="space-y-2 pt-2 border-t border-[#F0DDD8]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8C344A] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#8C344A]" />
                    <span>2. Your Answers and Mistakes Made:</span>
                  </div>

                  {/* Student's Raw Answer */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8D5CE] text-xs text-[#2B0E17] font-mono leading-relaxed">
                    <span className="font-bold text-[#7A3345] block mb-1">What you wrote:</span>
                    &ldquo;{corr.userAnswer || '(Blank)'}&rdquo;
                  </div>

                  {/* What Was Wrong: Diagnostic Breakdown */}
                  <div className="p-4 rounded-2xl bg-[#FDF2F0] border border-[#F2C5BE] text-xs space-y-2 text-[#4A1E2B]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#8C344A]">Diagnostic Breakdown:</span>
                      {corr.mistakeType && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5B6A8] text-[#3B1320] font-bold">
                          Tag: {corr.mistakeType}
                        </span>
                      )}
                    </div>

                    <p className="leading-relaxed">{corr.whatWentWrong}</p>

                    {corr.remedyTip && (
                      <div className="pt-2 border-t border-[#F2C5BE]/80 text-[#2B0E17] font-medium">
                        💡 <strong>How to avoid this next time:</strong> {corr.remedyTip}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* The "Search Paper" Metadata Card (Matching Mockup Page 4 bottom-right!) */}
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
              &ldquo;Here we first have the correct answer, and then a section under it with your wrong answers and what went wrong.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
