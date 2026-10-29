'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StudyChatView } from '@/components/StudyChatView';
import { MistakeNotepadView } from '@/components/MistakeNotepadView';
import { TestView } from '@/components/TestView';
import { TestCorrectionsView } from '@/components/TestCorrectionsView';
import { UploadNotesModal } from '@/components/UploadNotesModal';
import { SettingsModal } from '@/components/SettingsModal';
import { ActiveView, SubjectData, ChatMessage, MistakeEntry } from '@/lib/types';
import { INITIAL_SUBJECTS } from '@/lib/initial-data';

export default function Home() {
  const [subjects, setSubjects] = useState<SubjectData[]>(INITIAL_SUBJECTS);
  const [activeSubjectId, setActiveSubjectId] = useState<string>('maths-geometry');
  const [activeView, setActiveView] = useState<ActiveView>('chat');

  const [userName, setUserName] = useState<string>('Tanishta Varman');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoadingSideChat, setIsLoadingSideChat] = useState(false);
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);

  const activeSubject =
    subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  // 1. Send Message in Main Study Chat (Secure server-to-server call)
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSubjects((prev) =>
      prev.map((sub) =>
        sub.id === activeSubjectId
          ? { ...sub, chatMessages: [...sub.chatMessages, userMsg] }
          : sub
      )
    );

    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: activeSubject.name,
          userMessage: text,
        }),
      });

      const data = await res.json();
      const detected = data.detectedMistake;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Let us review that step together carefully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        detectedMistake: detected || undefined,
      };

      setSubjects((prev) =>
        prev.map((sub) => {
          if (sub.id !== activeSubjectId) return sub;

          let updatedMistakes = [...sub.mistakeBook];

          if (detected && detected.topic) {
            const existingIdx = updatedMistakes.findIndex(
              (m) => m.topic.toLowerCase() === detected.topic.toLowerCase()
            );

            if (existingIdx >= 0) {
              const item = updatedMistakes[existingIdx];
              updatedMistakes[existingIdx] = {
                ...item,
                frequency: item.frequency + 1,
                lastEncountered: 'Just now',
                mistakeDescription: detected.mistakeDescription || item.mistakeDescription,
              };
            } else {
              const newEntry: MistakeEntry = {
                id: `m-${Date.now()}`,
                topic: detected.topic,
                triggerQuestion: text,
                mistakeDescription: detected.mistakeDescription || 'Struggling with this concept.',
                simplifiedExplanation: detected.simplifiedExplanation || 'Review core definitions carefully.',
                mistakeType: detected.mistakeType || 'Concept Misunderstanding',
                frequency: 1,
                lastEncountered: 'Just now',
                notes: [`Detected during study chat on ${new Date().toLocaleDateString()}`],
              };
              updatedMistakes.unshift(newEntry);
            }
          }

          return {
            ...sub,
            chatMessages: [...sub.chatMessages, aiMsg],
            mistakeBook: updatedMistakes,
          };
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // 2. Send Message in Mistake Book Side Chatbot (Secure server-to-server call)
  const handleSendSideChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `sc-usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSubjects((prev) =>
      prev.map((sub) =>
        sub.id === activeSubjectId
          ? { ...sub, sideChatMessages: [...sub.sideChatMessages, userMsg] }
          : sub
      )
    );

    setIsLoadingSideChat(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: activeSubject.name,
          userMessage: text,
        }),
      });

      const data = await res.json();
      const detected = data.detectedMistake;

      const aiMsg: ChatMessage = {
        id: `sc-ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Noted! I have analyzed that difficulty for your Mistake Book.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setSubjects((prev) =>
        prev.map((sub) => {
          if (sub.id !== activeSubjectId) return sub;

          let updatedMistakes = [...sub.mistakeBook];
          if (detected && detected.topic) {
            const existingIdx = updatedMistakes.findIndex(
              (m) => m.topic.toLowerCase() === detected.topic.toLowerCase()
            );

            if (existingIdx >= 0) {
              const item = updatedMistakes[existingIdx];
              updatedMistakes[existingIdx] = {
                ...item,
                frequency: item.frequency + 1,
                lastEncountered: 'Just now',
              };
            } else {
              updatedMistakes.unshift({
                id: `m-${Date.now()}`,
                topic: detected.topic,
                triggerQuestion: text,
                mistakeDescription: detected.mistakeDescription || 'Refined during side chat.',
                simplifiedExplanation: detected.simplifiedExplanation || 'Review rule carefully.',
                mistakeType: detected.mistakeType || 'Concept Misunderstanding',
                frequency: 1,
                lastEncountered: 'Just now',
                notes: [`Logged from side-chat consultation: "${text}"`],
              });
            }
          }

          return {
            ...sub,
            sideChatMessages: [...sub.sideChatMessages, aiMsg],
            mistakeBook: updatedMistakes,
          };
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingSideChat(false);
    }
  };

  // 3. Manually add a mistake note directly in the Notepad
  const handleAddManualMistakeNote = (topic: string, note: string) => {
    const newEntry: MistakeEntry = {
      id: `m-manual-${Date.now()}`,
      topic,
      triggerQuestion: 'Self-identified trouble spot',
      mistakeDescription: note,
      simplifiedExplanation: note,
      mistakeType: 'Concept Misunderstanding',
      frequency: 1,
      lastEncountered: 'Today',
      notes: [note],
    };

    setSubjects((prev) =>
      prev.map((sub) =>
        sub.id === activeSubjectId
          ? { ...sub, mistakeBook: [newEntry, ...sub.mistakeBook] }
          : sub
      )
    );
  };

  // 4. Generate Diagnostic Test Questions from Mistake Book (Secure server-to-server call)
  const handleGenerateTest = async () => {
    setIsGeneratingTest(true);

    try {
      const res = await fetch('/api/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: activeSubject.name,
          mistakes: activeSubject.mistakeBook,
        }),
      });

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        setSubjects((prev) =>
          prev.map((sub) =>
            sub.id === activeSubjectId
              ? { ...sub, testQuestions: data.questions }
              : sub
          )
        );
      }
      setActiveView('test');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTest(false);
    }
  };

  // 5. Submit Test Answers & Generate Test Corrections (Secure server-to-server call)
  const handleSubmitAnswers = async (userAnswers: Record<string, string>) => {
    setIsSubmittingTest(true);

    try {
      const res = await fetch('/api/grade-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: activeSubject.name,
          questions: activeSubject.testQuestions,
          userAnswers,
        }),
      });

      const data = await res.json();
      if (data.corrections) {
        setSubjects((prev) =>
          prev.map((sub) =>
            sub.id === activeSubjectId
              ? { ...sub, testCorrections: data.corrections }
              : sub
          )
        );
      }
      setActiveView('test-corrections');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingTest(false);
    }
  };

  // 6. Sync gaps from Test Corrections back to Mistake Book
  const handleSyncGapsToMistakeBook = () => {
    const wrongAnswers = activeSubject.testCorrections.filter((c) => !c.isCorrect);

    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== activeSubjectId) return sub;

        const updatedMistakes = [...sub.mistakeBook];

        wrongAnswers.forEach((w) => {
          const title = `Exam Question ${w.questionNumber} Gap: ${w.mistakeType || 'Concept Error'}`;
          const existingIdx = updatedMistakes.findIndex(
            (m) => m.topic.toLowerCase() === title.toLowerCase()
          );

          if (existingIdx >= 0) {
            updatedMistakes[existingIdx].frequency += 1;
            updatedMistakes[existingIdx].lastEncountered = 'Recent Test';
          } else {
            updatedMistakes.unshift({
              id: `m-test-${Date.now()}-${w.questionNumber}`,
              topic: title,
              triggerQuestion: w.questionText,
              mistakeDescription: w.whatWentWrong,
              simplifiedExplanation: w.remedyTip || 'Review step-by-step model solution.',
              mistakeType: w.mistakeType || 'Concept Misunderstanding',
              frequency: 1,
              lastEncountered: 'Recent Test',
              notes: [`What went wrong: ${w.whatWentWrong}`, `Remedy tip: ${w.remedyTip}`],
            });
          }
        });

        return { ...sub, mistakeBook: updatedMistakes };
      })
    );

    setActiveView('mistake-book');
  };

  // 7. Create New Subject / Upload Notes
  const handleCreateSubject = (name: string, category: string, notes: string) => {
    const newId = `sub-${Date.now()}`;
    const newSub: SubjectData = {
      id: newId,
      name,
      category,
      paperInfo: {
        topic: name,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        keywords: [category, 'Personal AI', 'Notes'],
      },
      chatMessages: notes
        ? [
            {
              id: `init-${Date.now()}`,
              role: 'assistant',
              content: `I have ingested your notes for **${name}**! Ask any questions or let me know where you're struggling, and I'll keep your private Mistake Book updated.`,
              timestamp: 'Just now',
            },
          ]
        : [],
      mistakeBook: notes
        ? [
            {
              id: `m-init-${Date.now()}`,
              topic: `${name}: Initial Watch Area`,
              triggerQuestion: 'Uploaded syllabus / notes',
              mistakeDescription: 'Concept highlighted for review from newly uploaded notes.',
              simplifiedExplanation: 'Start by asking the tutor to explain this in easy terms.',
              mistakeType: 'Concept Misunderstanding',
              frequency: 1,
              lastEncountered: 'Today',
              notes: [notes.slice(0, 140) + '...'],
            },
          ]
        : [],
      testQuestions: [],
      testCorrections: [],
      sideChatMessages: [],
    };

    setSubjects((prev) => [newSub, ...prev]);
    setActiveSubjectId(newId);
    setActiveView('chat');
  };

  return (
    <div className="flex h-screen bg-[#FAF7F2] font-sans antialiased overflow-hidden">
      {/* Left Sidebar (Matching user's PDF!) */}
      <Sidebar
        subjects={subjects}
        activeSubjectId={activeSubjectId}
        activeView={activeView}
        onSelectSubject={(id) => {
          setActiveSubjectId(id);
          setActiveView('chat');
        }}
        onSelectView={(view) => setActiveView(view)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Display (1 of 4 Views) */}
      {activeView === 'chat' && (
        <StudyChatView
          subject={activeSubject}
          onSendMessage={handleSendMessage}
          isLoading={isLoadingChat}
          onNavigateToMistakeBook={() => setActiveView('mistake-book')}
        />
      )}

      {activeView === 'mistake-book' && (
        <MistakeNotepadView
          subject={activeSubject}
          onSendSideChatMessage={handleSendSideChatMessage}
          onAddManualMistakeNote={handleAddManualMistakeNote}
          isLoadingSideChat={isLoadingSideChat}
          onGenerateTest={handleGenerateTest}
        />
      )}

      {activeView === 'test' && (
        <TestView
          subject={activeSubject}
          onSubmitAnswers={handleSubmitAnswers}
          onRegenerateQuestions={handleGenerateTest}
          isSubmitting={isSubmittingTest}
          isGenerating={isGeneratingTest}
        />
      )}

      {activeView === 'test-corrections' && (
        <TestCorrectionsView
          subject={activeSubject}
          onSyncGapsToMistakeBook={handleSyncGapsToMistakeBook}
          onBackToTest={() => setActiveView('test')}
        />
      )}

      {/* Upload Notes Modal */}
      <UploadNotesModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onCreateSubject={handleCreateSubject}
      />

      {/* User Profile & Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userName={userName}
        onUpdateUserName={(name) => setUserName(name)}
      />
    </div>
  );
}
