import React, { useState, useEffect } from 'react';
import { Passage, FontSize, ThemeMode, NoteItem, HighlightItem, TestMode, ListeningSection, AppScreen, ExamExecutionMode, Language } from './types';
import { ieltsPassages, calculateIELTSBandScore } from './data/ieltsData';
import { ieltsListeningSections } from './data/listeningData';
import { TopHeader } from './components/TopHeader';
import { PassagePane } from './components/PassagePane';
import { Resizer } from './components/Resizer';
import { QuestionsPane } from './components/QuestionsPane';
import { ListeningPane } from './components/ListeningPane';
import { NotesSidebar } from './components/NotesSidebar';
import { BottomFooter } from './components/BottomFooter';
import { SettingsModal } from './components/SettingsModal';
import { ReviewModal } from './components/ReviewModal';
import { ScoreReportModal } from './components/ScoreReportModal';
import { SubmitConfirmationModal } from './components/SubmitConfirmationModal';
import { LibraryView } from './components/LibraryView';
import { HomeScreen } from './components/HomeScreen';
import { PreTestModal } from './components/PreTestModal';
import { DictionaryModal } from './components/DictionaryModal';
import { SolutionScoreBanner } from './components/SolutionScoreBanner';
import { AnswerSheetModal } from './components/AnswerSheetModal';
import { AuthModal, UserProfile } from './components/AuthModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { UserDashboardView } from './components/UserDashboardView';
import { FullTestPickerView } from './components/FullTestPickerView';
import { AdminPortalModal } from './components/AdminPortalModal';
import { BugReportModal } from './components/BugReportModal';
import { DownloadPdfModal } from './components/DownloadPdfModal';
import { PreTestCountdownModal } from './components/PreTestCountdownModal';

export default function App() {
  // Test Datasets
  const passages: Passage[] = ieltsPassages;
  const listeningSections: ListeningSection[] = ieltsListeningSections;

  // Active Screen ('home' | 'library' | 'test')
  const [appScreen, setAppScreen] = useState<AppScreen>('home');
  const [libraryInitialTab, setLibraryInitialTab] = useState<string>('Reading Practices');

  // Active Test Mode & Type ('reading' | 'listening', full test vs individual test)
  const [testMode, setTestMode] = useState<TestMode>('listening');
  const [isFullTest, setIsFullTest] = useState<boolean>(false);
  const [examExecutionMode, setExamExecutionMode] = useState<ExamExecutionMode>('practice');

  // Active Passage / Part State
  const [activePassageId, setActivePassageId] = useState<number>(() => {
    const saved = localStorage.getItem('ielts_activePassage');
    return saved ? JSON.parse(saved) : 1;
  });

  const [activeListeningPart, setActiveListeningPart] = useState<number>(1);
  const [activeQuestionNum, setActiveQuestionNum] = useState<number>(11);

  // User Answers & Flags
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('ielts_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [flagged, setFlagged] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem('ielts_flagged');
    return saved ? JSON.parse(saved) : {};
  });

  // Notes & Highlights
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('ielts_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [highlights, setHighlights] = useState<HighlightItem[]>(() => {
    const saved = localStorage.getItem('ielts_highlights');
    return saved ? JSON.parse(saved) : [];
  });

  // Timer State (59 minutes = 3540 seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(() => {
    const saved = localStorage.getItem('ielts_timerSeconds');
    return saved ? JSON.parse(saved) : 3540;
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showTimer, setShowTimer] = useState<boolean>(true);

  // UI Preferences
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ielts_language');
    return saved === 'en' ? 'en' : 'vi';
  });
  const [leftPanePercentage, setLeftPanePercentage] = useState<number>(50);

  useEffect(() => {
    localStorage.setItem('ielts_language', language);
  }, [language]);

  // Modals & Panels
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState<boolean>(false);
  const [isScoreReportOpen, setIsScoreReportOpen] = useState<boolean>(false);
  const [isSolutionMode, setIsSolutionMode] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [locatedQuote, setLocatedQuote] = useState<{ paragraphLetter: string; quote?: string; questionNum?: number } | null>(null);

  // Pre-Test & Dictionary States
  const [isPreTestOpen, setIsPreTestOpen] = useState<boolean>(false);
  const [pendingTestInfo, setPendingTestInfo] = useState<{
    mode: TestMode;
    targetId: number;
    isFullTest: boolean;
    title: string;
    sourceBook?: string;
    totalQuestions?: number;
  } | null>(null);

  const [isDictionaryOpen, setIsDictionaryOpen] = useState<boolean>(false);
  const [dictionarySelectedText, setDictionarySelectedText] = useState<string>('');

  // User Profile & Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ielts_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: 'Vũ Ngọc Mạnh Cường',
      email: 'manhcuong2006ht@gmail.com',
      targetBand: 8.0,
      joinedDate: '15/05/2026',
      isVip: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isAnswerSheetOpen, setIsAnswerSheetOpen] = useState<boolean>(false);

  // New Features: Admin Portal, Bug Report, Download PDF, Pre-Test Countdown
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState<boolean>(false);
  const [isDownloadPdfOpen, setIsDownloadPdfOpen] = useState<boolean>(false);
  const [isCountdownOpen, setIsCountdownOpen] = useState<boolean>(false);
  const [countdownTestTitle, setCountdownTestTitle] = useState<string>('');
  const [countdownTestMode, setCountdownTestMode] = useState<TestMode>('reading');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ielts_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ielts_user');
    }
  }, [currentUser]);

  // Auto-Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('ielts_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('ielts_flagged', JSON.stringify(flagged));
  }, [flagged]);

  useEffect(() => {
    localStorage.setItem('ielts_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('ielts_highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem('ielts_activePassage', JSON.stringify(activePassageId));
  }, [activePassageId]);

  useEffect(() => {
    localStorage.setItem('ielts_timerSeconds', JSON.stringify(timerSeconds));
  }, [timerSeconds]);

  // Theme Sync
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Anti-Cheating Restrictions during Real Exam Mode (block Ctrl+F, Copy, Paste)
  useEffect(() => {
    if (appScreen !== 'test' || examExecutionMode !== 'test' || isSubmitted || isSolutionMode) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Intercept Ctrl+F (Find), Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+U (Source), Ctrl+P (Print)
      if (
        (e.ctrlKey || e.metaKey) &&
        ['f', 'F', 'c', 'C', 'v', 'V', 'u', 'U', 'p', 'P'].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleCopyPaste = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('copy', handleCopyPaste, true);
    window.addEventListener('cut', handleCopyPaste, true);
    window.addEventListener('paste', handleCopyPaste, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('copy', handleCopyPaste, true);
      window.removeEventListener('cut', handleCopyPaste, true);
      window.removeEventListener('paste', handleCopyPaste, true);
    };
  }, [appScreen, examExecutionMode, isSubmitted, isSolutionMode]);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isTimerRunning || timerSeconds <= 0 || isSubmitted || isSolutionMode) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          setIsSubmitted(true);
          setIsScoreReportOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, isSubmitted, isSolutionMode]);

  // Active passage / listening section objects
  const currentPassage = passages.find((p) => p.id === activePassageId) || passages[0];
  const currentListeningSection =
    listeningSections.find((s) => s.partNumber === activeListeningPart) || listeningSections[0];

  // Active dataset for full test vs individual test
  const activePassages = isFullTest
    ? passages
    : passages.filter((p) => p.id === activePassageId);

  const activeListeningSections = isFullTest
    ? listeningSections
    : listeningSections.filter((s) => s.partNumber === activeListeningPart);

  // Action Handlers
  const handleAnswerChange = (questionNum: number, value: string) => {
    if (isSubmitted || isSolutionMode) return; // Prevent changing answers after submit
    setAnswers((prev) => ({ ...prev, [questionNum]: value }));
  };

  const handleToggleFlag = (questionNum: number) => {
    setFlagged((prev) => ({ ...prev, [questionNum]: !prev[questionNum] }));
  };

  const handleSelectPassage = (passageId: number) => {
    setActivePassageId(passageId);
    setLocatedQuote(null);
    const firstGroup = passages.find((p) => p.id === passageId)?.questionGroups[0];
    if (firstGroup && firstGroup.questions[0]) {
      setActiveQuestionNum(firstGroup.questions[0].number);
    }
  };

  const handleSelectListeningPart = (partNum: number) => {
    setActiveListeningPart(partNum);
    const firstGroup = listeningSections.find((s) => s.partNumber === partNum)?.questionGroups[0];
    if (firstGroup && firstGroup.questions[0]) {
      setActiveQuestionNum(firstGroup.questions[0].number);
    }
  };

  const handleSelectQuestionNum = (questionNum: number) => {
    setActiveQuestionNum(questionNum);
    if (testMode === 'reading') {
      const targetPassage = passages.find((p) =>
        p.questionGroups.some((g) => g.questions.some((q) => q.number === questionNum))
      );
      if (targetPassage && targetPassage.id !== activePassageId) {
        setActivePassageId(targetPassage.id);
      }
    } else {
      const targetSection = listeningSections.find((s) =>
        s.questionGroups.some((g) => g.questions.some((q) => q.number === questionNum))
      );
      if (targetSection && targetSection.partNumber !== activeListeningPart) {
        setActiveListeningPart(targetSection.partNumber);
      }
    }
  };

  const handleLocateQuestion = (paragraphLetter: string, referenceQuote?: string, questionNum?: number) => {
    if (questionNum) {
      setActiveQuestionNum(questionNum);
    }
    setLocatedQuote({ paragraphLetter, quote: referenceQuote, questionNum });
  };

  const handleRequestSubmit = () => {
    setIsSubmitConfirmOpen(true);
  };

  const handleConfirmFinalSubmit = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    setIsSubmitConfirmOpen(false);
    setIsScoreReportOpen(true);

    // Save result to local test history
    let correct = 0;
    let total = 0;
    if (testMode === 'reading') {
      activePassages.forEach((p) => {
        p.questionGroups.forEach((g) => {
          g.questions.forEach((q) => {
            total++;
            const u = (answers[q.number] || '').trim().toLowerCase();
            const c = q.correctAnswer.trim().toLowerCase();
            if (u && (u === c || c.split('/').map((s) => s.trim()).includes(u))) {
              correct++;
            }
          });
        });
      });
    } else {
      activeListeningSections.forEach((s) => {
        s.questionGroups.forEach((g) => {
          g.questions.forEach((q) => {
            total++;
            const u = (answers[q.number] || '').trim().toLowerCase();
            const c = q.correctAnswer.trim().toLowerCase();
            if (u && (u === c || c.split('/').map((s) => s.trim()).includes(u))) {
              correct++;
            }
          });
        });
      });
    }

    const bandScore = calculateIELTSBandScore(correct, total);
    const testTitle = isFullTest
      ? `Full ${testMode === 'reading' ? 'Reading' : 'Listening'} Test`
      : (testMode === 'reading' ? currentPassage.title : currentListeningSection.title);

    const historyItem = {
      id: Date.now().toString(),
      testTitle,
      mode: testMode,
      date: new Date().toLocaleDateString('vi-VN'),
      correct,
      total,
      bandScore,
      durationMins: Math.max(1, Math.round((3600 - timerSeconds) / 60)),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('ielts_test_history') || '[]');
      localStorage.setItem('ielts_test_history', JSON.stringify([historyItem, ...existing]));
    } catch (e) {
      // fallback
    }
  };

  const handleToggleSolutionMode = () => {
    const nextMode = !isSolutionMode;
    setIsSolutionMode(nextMode);
    if (nextMode) {
      setIsSubmitted(true);
      setIsTimerRunning(false);
    }
  };

  const handleEnableSolutionMode = () => {
    setIsSolutionMode(true);
    setIsSubmitted(true);
    setIsTimerRunning(false);
    setIsScoreReportOpen(false);
  };

  const handleAddHighlight = (highlight: Omit<HighlightItem, 'id'>) => {
    const newItem: HighlightItem = { ...highlight, id: `hl_${Date.now()}` };
    setHighlights((prev) => [...prev, newItem]);
  };

  const handleAddNoteFromText = (paragraphLetter: string, selectedText: string) => {
    const newNote: NoteItem = {
      id: `note_${Date.now()}`,
      passageId: activePassageId,
      paragraphLetter,
      quotedText: selectedText,
      note: 'Added reflection note for quote.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotes((prev) => [newNote, ...prev]);
    setIsNotesOpen(true);
  };

  const handleAddCustomNote = (text: string) => {
    const newNote: NoteItem = {
      id: `note_${Date.now()}`,
      passageId: activePassageId,
      note: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleResetAnswers = () => {
    setAnswers({});
    setFlagged({});
    localStorage.removeItem('ielts_answers');
    localStorage.removeItem('ielts_flagged');
  };

  const handleResetTimer = () => {
    setTimerSeconds(3540);
    setIsTimerRunning(true);
  };

  const handleRetakeTest = () => {
    handleResetAnswers();
    handleResetTimer();
    setIsSubmitted(false);
    setIsScoreReportOpen(false);
    setIsSolutionMode(false);
    setLocatedQuote(null);
    setActivePassageId(1);
    setActiveListeningPart(1);
    setActiveQuestionNum(1);
  };

  const handleNavigateToLibrary = (initialTab: string = 'Reading Practices') => {
    setLibraryInitialTab(initialTab);
    setAppScreen('library');
  };

  const handleSelectTestFromLibrary = (mode: TestMode, targetId: number, fullTest: boolean = false) => {
    let title = mode === 'reading'
      ? (passages.find((p) => p.id === targetId)?.title || `Passage ${targetId}`)
      : (listeningSections.find((s) => s.partNumber === targetId)?.title || `Part ${targetId}`);

    if (fullTest) {
      title = mode === 'reading' ? 'IELTS Academic Reading Full Test' : 'IELTS Academic Listening Full Test';
    }

    setPendingTestInfo({
      mode,
      targetId,
      isFullTest: fullTest,
      title,
      sourceBook: 'Cambridge IELTS 18 Practice Tests',
      totalQuestions: fullTest ? 40 : (mode === 'reading' ? 13 : 10),
    });
    setIsPreTestOpen(true);
  };

  const handleConfirmStartFromModal = (settings: {
    timeMinutes: number;
    enableDictionary: boolean;
    examExecutionMode: ExamExecutionMode;
    selectedSkill?: 'reading' | 'listening' | 'both';
    selectedPassageIds?: number[];
  }) => {
    if (!pendingTestInfo) return;

    const { mode, targetId, isFullTest: fullTest } = pendingTestInfo;

    const execMode = settings.examExecutionMode || 'practice';
    setExamExecutionMode(execMode);

    let activeMode = mode;
    if (settings.selectedSkill === 'reading') activeMode = 'reading';
    else if (settings.selectedSkill === 'listening') activeMode = 'listening';

    setTestMode(activeMode);
    setIsFullTest(fullTest);
    setIsSubmitted(false);
    setIsSolutionMode(false);

    if (activeMode === 'reading') {
      const startId =
        settings.selectedPassageIds && settings.selectedPassageIds.length > 0
          ? settings.selectedPassageIds[0]
          : targetId;
      setActivePassageId(startId);
      const firstGroup = passages.find((p) => p.id === startId)?.questionGroups[0];
      if (firstGroup && firstGroup.questions[0]) {
        setActiveQuestionNum(firstGroup.questions[0].number);
      }
    } else {
      const startId =
        settings.selectedPassageIds && settings.selectedPassageIds.length > 0
          ? settings.selectedPassageIds[0]
          : targetId;
      setActiveListeningPart(startId);
      const firstGroup = listeningSections.find((s) => s.partNumber === startId)?.questionGroups[0];
      if (firstGroup && firstGroup.questions[0]) {
        setActiveQuestionNum(firstGroup.questions[0].number);
      }
    }

    if (execMode === 'test') {
      const testSecs = fullTest ? 3600 : 1200;
      setTimerSeconds(testSecs);
      setIsTimerRunning(true);
      setShowTimer(true);
    } else {
      if (settings.timeMinutes > 0) {
        setTimerSeconds(settings.timeMinutes * 60);
        setIsTimerRunning(true);
        setShowTimer(true);
      } else {
        setTimerSeconds(0);
        setIsTimerRunning(false);
        setShowTimer(false);
      }
    }

    setIsDictionaryOpen(false);

    setCountdownTestTitle(pendingTestInfo.title);
    setCountdownTestMode(activeMode);
    setIsPreTestOpen(false);
    setPendingTestInfo(null);
    setIsCountdownOpen(true);
  };

  const handleRedoTest = () => {
    setIsSubmitted(false);
    setIsSolutionMode(false);
    setAnswers({});
    setFlagged({});
    setIsDictionaryOpen(false);
    setTimerSeconds(isFullTest ? 3600 : 1200);
    setIsTimerRunning(true);
    setCountdownTestTitle(
      isFullTest
        ? `Full ${testMode === 'reading' ? 'Reading' : 'Listening'} Test`
        : (testMode === 'reading' ? currentPassage.title : currentListeningSection.title)
    );
    setCountdownTestMode(testMode);
    setIsCountdownOpen(true);
  };

  const handleCountdownFinished = () => {
    setIsCountdownOpen(false);
    setAppScreen('test');
  };

  const handleLookupDictionary = (text: string) => {
    setDictionarySelectedText(text);
    setIsDictionaryOpen(true);
  };

  const handleOpenDashboard = () => {
    if (currentUser) {
      setAppScreen('dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleStartFullTestFromPicker = (
    mode: TestMode,
    executionMode: ExamExecutionMode,
    isCombo?: boolean
  ) => {
    setTestMode(mode);
    setIsFullTest(true);
    setExamExecutionMode(executionMode);
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setIsSolutionMode(false);
    setActivePassageId(1);
    setActiveListeningPart(1);
    setTimerSeconds(mode === 'reading' ? 3600 : 1800);
    setIsTimerRunning(true);
    setCountdownTestTitle(`Full ${mode === 'reading' ? 'Reading' : 'Listening'} Test`);
    setCountdownTestMode(mode);
    setIsCountdownOpen(true);
  };

  if (appScreen === 'home') {
    return (
      <>
        <HomeScreen
          onNavigateToLibrary={handleNavigateToLibrary}
          onNavigateToFullTest={() => handleSelectTestFromLibrary('reading', 1, true)}
          onSelectTest={handleSelectTestFromLibrary}
          userName={currentUser ? currentUser.name : 'Đăng nhập'}
          onOpenUserDashboard={handleOpenDashboard}
          onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
          language={language}
          onChangeLanguage={setLanguage}
          theme={theme}
          onChangeTheme={setTheme}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        {pendingTestInfo && (
          <PreTestModal
            isOpen={isPreTestOpen}
            onClose={() => {
              setIsPreTestOpen(false);
              setPendingTestInfo(null);
            }}
            testTitle={pendingTestInfo.title}
            testMode={pendingTestInfo.mode}
            isFullTest={pendingTestInfo.isFullTest}
            passageOrPartNumber={pendingTestInfo.targetId}
            sourceBook={pendingTestInfo.sourceBook}
            totalQuestions={pendingTestInfo.totalQuestions}
            onConfirmStart={handleConfirmStartFromModal}
          />
        )}
        <PreTestCountdownModal
          isOpen={isCountdownOpen}
          onFinished={handleCountdownFinished}
          testTitle={countdownTestTitle}
          testMode={countdownTestMode}
        />
        <AdminPortalModal
          isOpen={isAdminPortalOpen}
          onClose={() => setIsAdminPortalOpen(false)}
        />
        <DictionaryModal
          isOpen={isDictionaryOpen}
          onClose={() => setIsDictionaryOpen(false)}
          selectedText={dictionarySelectedText}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          fontSize={fontSize}
          onChangeFontSize={setFontSize}
          theme={theme}
          onChangeTheme={setTheme}
          onRedoTest={handleRedoTest}
          language={language}
          onChangeLanguage={setLanguage}
        />
      </>
    );
  }

  if (appScreen === 'fulltest') {
    return (
      <>
        <FullTestPickerView
          onStartFullTest={handleStartFullTestFromPicker}
          onNavigateHome={() => setAppScreen('home')}
          onNavigateLibrary={() => setAppScreen('library')}
          language={language}
          userName={currentUser ? currentUser.name : 'Đăng nhập'}
          onOpenUserDashboard={handleOpenDashboard}
          onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
          onChangeLanguage={setLanguage}
          theme={theme}
          onChangeTheme={setTheme}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        <PreTestCountdownModal
          isOpen={isCountdownOpen}
          onFinished={handleCountdownFinished}
          testTitle={countdownTestTitle}
          testMode={countdownTestMode}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          fontSize={fontSize}
          onChangeFontSize={setFontSize}
          theme={theme}
          onChangeTheme={setTheme}
          onRedoTest={handleRedoTest}
          language={language}
          onChangeLanguage={setLanguage}
        />
        <AdminPortalModal
          isOpen={isAdminPortalOpen}
          onClose={() => setIsAdminPortalOpen(false)}
        />
        <DictionaryModal
          isOpen={isDictionaryOpen}
          onClose={() => setIsDictionaryOpen(false)}
          selectedText={dictionarySelectedText}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      </>
    );
  }

  if (appScreen === 'dashboard') {
    return (
      <>
        <UserDashboardView
          user={currentUser || {
            name: 'Vũ Ngọc Mạnh Cường',
            email: 'manhcuong2006ht@gmail.com',
            targetBand: 8.0,
            joinedDate: '15/05/2026',
            isVip: true,
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          }}
          onNavigateHome={() => setAppScreen('home')}
          onNavigateLibrary={() => setAppScreen('library')}
          onSelectTestFromDashboard={(mode, id) => handleSelectTestFromLibrary(mode, id)}
          onLogout={() => {
            setCurrentUser(null);
            setAppScreen('home');
          }}
          language={language}
          onChangeLanguage={setLanguage}
          theme={theme}
          onChangeTheme={setTheme}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          fontSize={fontSize}
          onChangeFontSize={setFontSize}
          theme={theme}
          onChangeTheme={setTheme}
          onRedoTest={handleRedoTest}
          language={language}
          onChangeLanguage={setLanguage}
        />
      </>
    );
  }

  if (appScreen === 'library') {
    return (
      <>
        <LibraryView
          onSelectTest={handleSelectTestFromLibrary}
          onNavigateHome={() => setAppScreen('home')}
          onNavigateFullTest={() => handleSelectTestFromLibrary('reading', 1, true)}
          initialTab={libraryInitialTab}
          userName={currentUser ? currentUser.name : 'Đăng nhập'}
          onOpenUserDashboard={handleOpenDashboard}
          onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          language={language}
          onChangeLanguage={setLanguage}
          theme={theme}
          onChangeTheme={setTheme}
        />
        {pendingTestInfo && (
          <PreTestModal
            isOpen={isPreTestOpen}
            onClose={() => {
              setIsPreTestOpen(false);
              setPendingTestInfo(null);
            }}
            testTitle={pendingTestInfo.title}
            testMode={pendingTestInfo.mode}
            isFullTest={pendingTestInfo.isFullTest}
            passageOrPartNumber={pendingTestInfo.targetId}
            sourceBook={pendingTestInfo.sourceBook}
            totalQuestions={pendingTestInfo.totalQuestions}
            onConfirmStart={handleConfirmStartFromModal}
          />
        )}
        <PreTestCountdownModal
          isOpen={isCountdownOpen}
          onFinished={handleCountdownFinished}
          testTitle={countdownTestTitle}
          testMode={countdownTestMode}
        />
        <AdminPortalModal
          isOpen={isAdminPortalOpen}
          onClose={() => setIsAdminPortalOpen(false)}
        />
        <DictionaryModal
          isOpen={isDictionaryOpen}
          onClose={() => setIsDictionaryOpen(false)}
          selectedText={dictionarySelectedText}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          fontSize={fontSize}
          onChangeFontSize={setFontSize}
          theme={theme}
          onChangeTheme={setTheme}
          onRedoTest={handleRedoTest}
          language={language}
          onChangeLanguage={setLanguage}
        />
        {currentUser && (
          <UserDashboardModal
            isOpen={isDashboardOpen}
            onClose={() => setIsDashboardOpen(false)}
            user={currentUser}
            onLogout={() => setCurrentUser(null)}
            onSelectTestFromDashboard={(mode, id) => handleSelectTestFromLibrary(mode, id)}
          />
        )}
      </>
    );
  }

  return (
    <div className={`h-screen overflow-hidden flex flex-col font-sans antialiased select-none ${theme === 'dark' ? 'dark bg-[#12141c] text-slate-100' : 'bg-white text-slate-900'}`}>
      {/* Top Header */}
      <TopHeader
        testMode={testMode}
        onSelectTestMode={setTestMode}
        currentPassage={currentPassage}
        passages={activePassages}
        onSelectPassage={handleSelectPassage}
        currentListeningSection={currentListeningSection}
        listeningSections={activeListeningSections}
        onSelectListeningPart={handleSelectListeningPart}
        timerSeconds={timerSeconds}
        showTimer={showTimer}
        onToggleSettings={() => setIsSettingsOpen(true)}
        onToggleNotes={() => setIsNotesOpen(!isNotesOpen)}
        isNotesOpen={isNotesOpen}
        onOpenLibrary={() => setAppScreen('library')}
        onOpenHome={() => setAppScreen('home')}
        onOpenFullTest={() => setAppScreen('fulltest')}
        onOpenUserDashboard={handleOpenDashboard}
        onOpenBugReport={() => setIsBugReportOpen(true)}
        onOpenDownloadPdf={() => setIsDownloadPdfOpen(true)}
        isFullTest={isFullTest}
        isDictionaryOpen={isDictionaryOpen}
        onToggleDictionary={() => setIsDictionaryOpen(!isDictionaryOpen)}
        examExecutionMode={examExecutionMode}
      />

      {/* Main Test Workspace Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Solution Score Banner - Shown at top of solution page after submission */}
        {(isSubmitted || isSolutionMode) && (
          <SolutionScoreBanner
            testMode={testMode}
            passages={activePassages}
            listeningSections={activeListeningSections}
            answers={answers}
            timeSpentSeconds={timerSeconds > 0 ? (isFullTest ? 3600 : 1200) - timerSeconds : 900}
            onRetake={() => {
              setIsSubmitted(false);
              setIsSolutionMode(false);
              setAnswers({});
              setFlagged({});
              setTimerSeconds(20 * 60);
              setIsTimerRunning(true);
            }}
            onGoHome={() => setAppScreen('home')}
            onGoLibrary={() => setAppScreen('library')}
          />
        )}

        <main className="flex-1 flex overflow-hidden relative">
          {testMode === 'reading' ? (
            <>
              {/* Reading Mode: Split Pane Workspace */}
              <div style={{ flex: `0 0 ${leftPanePercentage}%` }} className="h-full flex flex-col min-w-[280px]">
                <PassagePane
                  passage={currentPassage}
                  fontSize={fontSize}
                  highlights={highlights}
                  onAddHighlight={handleAddHighlight}
                  onAddNoteFromText={handleAddNoteFromText}
                  locatedQuote={locatedQuote}
                  onLookupDictionary={examExecutionMode === 'test' ? undefined : handleLookupDictionary}
                />
              </div>

              {/* Resizer Divider */}
              <Resizer onResize={(pct) => setLeftPanePercentage(pct)} />

              {/* Right Pane: Questions Area */}
              <div className="flex-1 h-full min-w-[280px] flex flex-col">
                <QuestionsPane
                  questionGroups={currentPassage.questionGroups}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  activeQuestionNum={activeQuestionNum}
                  isSolutionMode={isSolutionMode}
                  isSubmitted={isSubmitted}
                  onLocateQuestion={handleLocateQuestion}
                  onLookupDictionary={examExecutionMode === 'test' ? undefined : handleLookupDictionary}
                />
              </div>
            </>
          ) : (
            /* Listening Mode Workspace */
            <div className="w-full h-full">
              <ListeningPane
                section={currentListeningSection}
                allSections={activeListeningSections}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                activeQuestionNum={activeQuestionNum}
                isSolutionMode={isSolutionMode}
                isSubmitted={isSubmitted}
                onSelectPart={(partNum) => setActiveListeningPart(partNum)}
                examExecutionMode={examExecutionMode}
              />
            </div>
          )}

          {/* Notes Collapsible Drawer */}
          <NotesSidebar
            isOpen={isNotesOpen}
            onClose={() => setIsNotesOpen(false)}
            notes={notes}
            currentPassageId={activePassageId}
            onAddCustomNote={handleAddCustomNote}
            onAddNote={handleAddCustomNote}
            onDeleteNote={handleDeleteNote}
          />
        </main>
      </div>

      {/* Bottom Answer Palette & Action Bar */}
      <BottomFooter
        testMode={testMode}
        currentPassage={currentPassage}
        currentListeningSection={currentListeningSection}
        allListeningSections={activeListeningSections}
        answers={answers}
        flagged={flagged}
        activeQuestionNum={activeQuestionNum}
        onSelectQuestionNum={handleSelectQuestionNum}
        onToggleFlag={handleToggleFlag}
        onOpenReview={() => {
          if (isSolutionMode || isSubmitted) {
            setIsAnswerSheetOpen(true);
          } else {
            setIsReviewOpen(true);
          }
        }}
        isSolutionMode={isSolutionMode}
        isSubmitted={isSubmitted}
        onToggleSolutionMode={handleToggleSolutionMode}
        onSubmitTest={handleRequestSubmit}
        onRetakeTest={handleRetakeTest}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        theme={theme}
        onChangeTheme={setTheme}
        onRedoTest={handleRedoTest}
        language={language}
        onChangeLanguage={setLanguage}
      />

      {/* Test Review Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        passages={activePassages}
        answers={answers}
        flagged={flagged}
        onNavigateToQuestion={(_pId, qNum) => handleSelectQuestionNum(qNum)}
        onSubmitTest={handleRequestSubmit}
      />

      {/* Answer Sheet Table Modal for Review Mode */}
      <AnswerSheetModal
        isOpen={isAnswerSheetOpen}
        onClose={() => setIsAnswerSheetOpen(false)}
        testMode={testMode}
        passages={activePassages}
        listeningSections={activeListeningSections}
        answers={answers}
        onNavigateToQuestion={(partId, qNum) => {
          if (testMode === 'reading') {
            setActivePassageId(partId);
          } else {
            setActiveListeningPart(partId);
          }
          handleSelectQuestionNum(qNum);
        }}
      />

      {/* Submission Confirmation Modal */}
      <SubmitConfirmationModal
        isOpen={isSubmitConfirmOpen}
        onClose={() => setIsSubmitConfirmOpen(false)}
        onConfirmSubmit={handleConfirmFinalSubmit}
        testMode={testMode}
        passages={activePassages}
        listeningSections={activeListeningSections}
        activePassageId={activePassageId}
        activeListeningPart={activeListeningPart}
        answers={answers}
        flagged={flagged}
      />

      {/* Final Score Report & Answer Feedback Modal */}
      <ScoreReportModal
        isOpen={isScoreReportOpen}
        onClose={() => setIsScoreReportOpen(false)}
        testMode={testMode}
        passages={activePassages}
        listeningSections={activeListeningSections}
        activePassageId={activePassageId}
        activeListeningPart={activeListeningPart}
        answers={answers}
        onEnableSolutionMode={handleEnableSolutionMode}
        onRetakeTest={handleRetakeTest}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Pre-Test Modal */}
      {pendingTestInfo && (
        <PreTestModal
          isOpen={isPreTestOpen}
          onClose={() => {
            setIsPreTestOpen(false);
            setPendingTestInfo(null);
          }}
          testTitle={pendingTestInfo.title}
          testMode={pendingTestInfo.mode}
          isFullTest={pendingTestInfo.isFullTest}
          passageOrPartNumber={pendingTestInfo.targetId}
          sourceBook={pendingTestInfo.sourceBook}
          totalQuestions={pendingTestInfo.totalQuestions}
          onConfirmStart={handleConfirmStartFromModal}
        />
      )}

      {/* Dictionary Tra Cứu AI Modal */}
      <DictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        selectedText={dictionarySelectedText}
      />

      {/* User Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* User Dashboard Modal */}
      {currentUser && (
        <UserDashboardModal
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          user={currentUser}
          onLogout={() => setCurrentUser(null)}
          onSelectTestFromDashboard={(mode, id) => handleSelectTestFromLibrary(mode, id)}
        />
      )}

      {/* Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

      {/* Bug Report Modal */}
      <BugReportModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
        testTitle={
          isFullTest
            ? `Full ${testMode === 'reading' ? 'Reading' : 'Listening'} Test`
            : (testMode === 'reading' ? currentPassage.title : currentListeningSection.title)
        }
        testMode={testMode}
        passageOrPartTitle={
          testMode === 'reading'
            ? `Passage ${currentPassage.id}: ${currentPassage.title}`
            : `Part ${currentListeningSection.partNumber}: ${currentListeningSection.title}`
        }
        activeQuestionNum={activeQuestionNum}
        userName={currentUser ? currentUser.name : 'Học viên'}
      />

      {/* Download PDF Modal */}
      <DownloadPdfModal
        isOpen={isDownloadPdfOpen}
        onClose={() => setIsDownloadPdfOpen(false)}
        testMode={testMode}
        passages={activePassages}
        listeningSections={activeListeningSections}
        isFullTest={isFullTest}
      />

      {/* Pre-Test Countdown Modal */}
      <PreTestCountdownModal
        isOpen={isCountdownOpen}
        onFinished={handleCountdownFinished}
        testTitle={countdownTestTitle}
        testMode={countdownTestMode}
      />
    </div>
  );
}
