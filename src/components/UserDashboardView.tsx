import React, { useState, useEffect } from 'react';
import { UserProfile } from './AuthModal';
import { FontSize, ThemeMode, Language } from '../types';
import { getT } from '../utils/i18n';
import { SiteHeader } from './SiteHeader';

export interface TestHistoryItem {
  id: string;
  testTitle: string;
  mode: 'reading' | 'listening';
  date: string;
  correct: number;
  total: number;
  bandScore: number;
  durationMins: number;
}

export interface VocabTopic {
  id: string;
  name: string;
  icon?: string;
  count?: number;
  masteredCount?: number;
}

export interface VocabItem {
  id: string;
  word: string;
  pos: string;
  mean: string;
  phonetic?: string;
  topicId?: string;
  topicName?: string;
  status?: 'mastered' | 'learning' | 'unmastered';
  ex?: string;
  collocations?: string;
  notes?: string;
}

interface UserDashboardViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  onSelectTestFromDashboard?: (mode: 'reading' | 'listening', targetId: number) => void;
  onNavigateHome: () => void;
  onNavigateLibrary: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  fontSize: FontSize;
  onChangeFontSize: (size: FontSize) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onSelectTestFromDashboard,
  onNavigateHome,
  onNavigateLibrary,
  language,
  onChangeLanguage,
  theme,
  onChangeTheme,
  fontSize,
  onChangeFontSize,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'vocab' | 'settings'>('overview');
  const t = getT(language);

  // User Goals & Exam Date State
  const [examDate, setExamDate] = useState<string>(() => {
    return localStorage.getItem('ielts_exam_date') || '2026-10-15';
  });
  const [targetOverall, setTargetOverall] = useState<number>(user.targetBand || 8.0);
  const [targetReading, setTargetReading] = useState<number>(8.5);
  const [targetListening, setTargetListening] = useState<number>(8.5);
  const [targetWriting, setTargetWriting] = useState<number>(7.5);
  const [targetSpeaking, setTargetSpeaking] = useState<number>(7.5);

  // Local Storage test history & vocabulary state
  const [historyItems, setHistoryItems] = useState<TestHistoryItem[]>([]);
  const [vocabTopics, setVocabTopics] = useState<VocabTopic[]>([
    { id: 't1', name: 'Topic 1: Environment & Climate Change', icon: '🌿' },
    { id: 't2', name: 'Topic 2: Technology & Artificial Intelligence', icon: '💻' },
    { id: 't3', name: 'Topic 3: Education & Academic Life', icon: '🎓' },
    { id: 't4', name: 'Topic 4: Health & Psychology', icon: '🧠' },
    { id: 't5', name: 'Topic 5: Society & Culture', icon: '🏛️' },
  ]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [vocabItems, setVocabItems] = useState<VocabItem[]>([]);
  const [vocabSearch, setVocabSearch] = useState<string>('');

  // New Vocab Form State / Modal
  const [isAddVocabModalOpen, setIsAddVocabModalOpen] = useState<boolean>(false);
  const [newWord, setNewWord] = useState('');
  const [newPos, setNewPos] = useState('noun');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newMean, setNewMean] = useState('');
  const [newEx, setNewEx] = useState('');
  const [newCollocations, setNewCollocations] = useState('');
  const [newTopicId, setNewTopicId] = useState('t1');
  const [newStatus, setNewStatus] = useState<'mastered' | 'learning' | 'unmastered'>('learning');

  // Flashcards Study Modal State
  const [isFlashcardOpen, setIsFlashcardOpen] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [userQuizAnswer, setUserQuizAnswer] = useState<string>('');

  // New Topic Creation Modal
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState<boolean>(false);
  const [newTopicNameInput, setNewTopicNameInput] = useState<string>('');

  // Editable Profile state
  const [userNameInput, setUserNameInput] = useState(user.name);
  const [userEmailInput, setUserEmailInput] = useState(user.email);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem('ielts_exam_date', examDate);
  }, [examDate]);

  useEffect(() => {
    // Load local history
    const savedHistory = localStorage.getItem('ielts_test_history');
    if (savedHistory) {
      try {
        setHistoryItems(JSON.parse(savedHistory));
      } catch (e) {
        // fallback
      }
    } else {
      const sampleHistory: TestHistoryItem[] = [
        {
          id: '1',
          testTitle: 'The Development of Modern Telegraphy',
          mode: 'reading',
          date: '2026-07-28',
          correct: 11,
          total: 13,
          bandScore: 7.5,
          durationMins: 17,
        },
        {
          id: '2',
          testTitle: 'Travel Agency Consultation & Mountain Tours',
          mode: 'listening',
          date: '2026-07-25',
          correct: 9,
          total: 10,
          bandScore: 8.0,
          durationMins: 12,
        },
        {
          id: '3',
          testTitle: 'Images and Places - Visual Geography & Perception',
          mode: 'reading',
          date: '2026-07-22',
          correct: 12,
          total: 13,
          bandScore: 8.5,
          durationMins: 18,
        },
      ];
      setHistoryItems(sampleHistory);
      localStorage.setItem('ielts_test_history', JSON.stringify(sampleHistory));
    }

    // Load local vocab
    const savedVocab = localStorage.getItem('ielts_user_vocab');
    if (savedVocab) {
      try {
        setVocabItems(JSON.parse(savedVocab));
      } catch (e) {
        // fallback
      }
    } else {
      const sampleVocab: VocabItem[] = [
        {
          id: 'v1',
          word: 'Egalitarian',
          pos: 'adj',
          phonetic: '/ɪˌɡæl.ɪˈteə.ri.ən/',
          mean: 'Believing in equal rights and opportunities for all people',
          ex: 'An egalitarian society values equal opportunities in higher education.',
          topicId: 't5',
          topicName: 'Topic 5: Society & Culture',
          status: 'mastered',
          collocations: 'Egalitarian principles, egalitarian approach',
          notes: 'Band 8.0 Essay Vocabulary for Writing Task 2',
        },
        {
          id: 'v2',
          word: 'Precipitation',
          pos: 'noun',
          phonetic: '/prɪˌsɪp.ɪˈteɪ.ʃən/',
          mean: 'Rain, snow, sleet, or hail that falls to the ground',
          ex: 'Annual precipitation levels have increased significantly in coastal zones.',
          topicId: 't1',
          topicName: 'Topic 1: Environment & Climate Change',
          status: 'learning',
          collocations: 'Heavy precipitation, extreme rainfall',
          notes: 'High frequency keyword in Academic Reading Passages',
        },
        {
          id: 'v3',
          word: 'Ubiquitous',
          pos: 'adj',
          phonetic: '/juːˈbɪk.wɪ.təs/',
          mean: 'Present, appearing, or found everywhere',
          ex: 'Smartphones and artificial intelligence tools have become ubiquitous in modern offices.',
          topicId: 't2',
          topicName: 'Topic 2: Technology & Artificial Intelligence',
          status: 'learning',
          collocations: 'Ubiquitous presence, virtually ubiquitous',
          notes: 'Great formal synonym for "common" or "widespread"',
        },
        {
          id: 'v4',
          word: 'Pedagogical',
          pos: 'adj',
          phonetic: '/ˌped.əˈɡɒdʒ.ɪ.kəl/',
          mean: 'Relating to teaching or educational methods',
          ex: 'The university introduced novel pedagogical strategies to enhance student engagement.',
          topicId: 't3',
          topicName: 'Topic 3: Education & Academic Life',
          status: 'unmastered',
          collocations: 'Pedagogical framework, pedagogical tools',
          notes: 'Essential Academic Word List item',
        },
        {
          id: 'v5',
          word: 'Cognitive',
          pos: 'adj',
          phonetic: '/ˈkɒɡ.nə.tɪv/',
          mean: 'Relating to mental processes of perception, memory, and judgment',
          ex: 'Regular exercise improves cognitive performance and memory retention in older adults.',
          topicId: 't4',
          topicName: 'Topic 4: Health & Psychology',
          status: 'mastered',
          collocations: 'Cognitive decline, cognitive abilities',
          notes: 'Appears frequently in psychology reading passages',
        },
      ];
      setVocabItems(sampleVocab);
      localStorage.setItem('ielts_user_vocab', JSON.stringify(sampleVocab));
    }
  }, []);

  // Speech Pronunciation Handler
  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddVocabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMean.trim()) return;

    const matchedTopic = vocabTopics.find((t) => t.id === newTopicId);

    const item: VocabItem = {
      id: Date.now().toString(),
      word: newWord.trim(),
      pos: newPos,
      phonetic: newPhonetic.trim() || '/.../',
      mean: newMean.trim(),
      ex: newEx.trim(),
      collocations: newCollocations.trim(),
      topicId: newTopicId,
      topicName: matchedTopic ? matchedTopic.name : 'General',
      status: newStatus,
    };

    const updated = [item, ...vocabItems];
    setVocabItems(updated);
    localStorage.setItem('ielts_user_vocab', JSON.stringify(updated));

    // Reset inputs
    setNewWord('');
    setNewPhonetic('');
    setNewMean('');
    setNewEx('');
    setNewCollocations('');
    setIsAddVocabModalOpen(false);
  };

  const handleDeleteVocab = (id: string) => {
    const updated = vocabItems.filter((v) => v.id !== id);
    setVocabItems(updated);
    localStorage.setItem('ielts_user_vocab', JSON.stringify(updated));
  };

  const handleToggleVocabStatus = (id: string, newStatus: 'mastered' | 'learning' | 'unmastered') => {
    const updated = vocabItems.map((v) => (v.id === id ? { ...v, status: newStatus } : v));
    setVocabItems(updated);
    localStorage.setItem('ielts_user_vocab', JSON.stringify(updated));
  };

  const handleAddTopic = () => {
    if (!newTopicNameInput.trim()) return;
    const newTopicObj: VocabTopic = {
      id: `t_${Date.now()}`,
      name: `Topic ${vocabTopics.length + 1}: ${newTopicNameInput.trim()}`,
      icon: '📁',
    };
    setVocabTopics([...vocabTopics, newTopicObj]);
    setNewTopicNameInput('');
    setIsAddTopicModalOpen(false);
  };

  const handleExportAnkiCsv = () => {
    if (vocabItems.length === 0) {
      alert('Your vocabulary vault is empty! Add some terms first.');
      return;
    }
    let csvContent = 'Front,Back,Context,Collocations\n';
    vocabItems.forEach((v) => {
      const front = `"${(v.word || '').replace(/"/g, '""')} ${v.phonetic || ''}"`;
      const back = `"${(v.mean || '').replace(/"/g, '""')} (${v.pos || ''})"`;
      const context = `"${(v.ex || '').replace(/"/g, '""')}"`;
      const colloc = `"${(v.collocations || '').replace(/"/g, '""')}"`;
      csvContent += `${front},${back},${context},${colloc}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `IeltsBurger_Vocab_Anki_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sample AI Vocab Extractor
  const handleAiExtractVocab = () => {
    const sampleExtracted: VocabItem[] = [
      {
        id: `ai_${Date.now()}_1`,
        word: 'Subterranean',
        pos: 'adj',
        phonetic: '/ˌsʌb.təˈreɪ.ni.ən/',
        mean: 'Existing, occurring, or done under the earth\'s surface',
        ex: 'Ancient aqueducts relied on extensive subterranean tunnels to preserve fresh water.',
        topicId: 't1',
        topicName: 'Topic 1: Environment & Climate Change',
        status: 'learning',
        collocations: 'Subterranean network, subterranean chambers',
      },
      {
        id: `ai_${Date.now()}_2`,
        word: 'Profound',
        pos: 'adj',
        phonetic: '/prəˈfaʊnd/',
        mean: 'Very great, intense, or possessing deep insight',
        ex: 'The invention of the telegraph had a profound impact on international commerce.',
        topicId: 't2',
        topicName: 'Topic 2: Technology & Artificial Intelligence',
        status: 'learning',
        collocations: 'Profound effect, profound implications',
      },
    ];
    const updated = [...sampleExtracted, ...vocabItems];
    setVocabItems(updated);
    localStorage.setItem('ielts_user_vocab', JSON.stringify(updated));
    alert('✨ AI successfully extracted 2 Band 8.0 academic vocabulary words from recent test passages!');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: userNameInput.trim(),
      email: userEmailInput.trim(),
      targetBand: targetOverall,
    });
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // Days remaining countdown calculation
  const calculateDaysRemaining = () => {
    const target = new Date(examDate).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((target - now) / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Filtered vocab list by topic and search
  const filteredVocab = vocabItems.filter((v) => {
    if (selectedTopicId !== 'all' && v.topicId !== selectedTopicId) return false;
    if (vocabSearch.trim()) {
      const q = vocabSearch.toLowerCase();
      const wMatch = v.word.toLowerCase().includes(q);
      const mMatch = v.mean.toLowerCase().includes(q);
      if (!wMatch && !mMatch) return false;
    }
    return true;
  });

  // Vocab Stats
  const totalVocabCount = vocabItems.length;
  const masteredCount = vocabItems.filter((v) => v.status === 'mastered').length;
  const learningCount = vocabItems.filter((v) => v.status === 'learning').length;
  const unmasteredCount = vocabItems.filter((v) => v.status === 'unmastered' || !v.status).length;

  const masteredPercentage = totalVocabCount > 0 ? Math.round((masteredCount / totalVocabCount) * 100) : 0;
  const learningPercentage = totalVocabCount > 0 ? Math.round((learningCount / totalVocabCount) * 100) : 0;

  // Calculate stats
  const totalTests = historyItems.length;
  const readingTests = historyItems.filter((h) => h.mode === 'reading');
  const listeningTests = historyItems.filter((h) => h.mode === 'listening');

  const avgReadingBand = readingTests.length > 0
    ? (readingTests.reduce((acc, curr) => acc + curr.bandScore, 0) / readingTests.length).toFixed(1)
    : '—';

  const avgListeningBand = listeningTests.length > 0
    ? (listeningTests.reduce((acc, curr) => acc + curr.bandScore, 0) / listeningTests.length).toFixed(1)
    : '—';

  return (
    <div className={`min-h-screen w-full bg-[#F8FAFC] dark:bg-[#12141c] text-slate-900 dark:text-slate-100 font-sans flex flex-col overflow-y-auto ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Universal Site Header */}
      <SiteHeader
        activeTab="dashboard"
        onNavigateHome={onNavigateHome}
        onNavigateLibrary={onNavigateLibrary}
        onNavigateFullTest={() => onNavigateLibrary()}
        onOpenUserDashboard={() => {}}
        userName={user.name}
        language={language}
        onChangeLanguage={onChangeLanguage}
        theme={theme}
        onChangeTheme={onChangeTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* User Profile Banner Header */}
        <div className="bg-white dark:bg-[#1a1c26] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm"
            />

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{user.name}</h1>
                <span className="px-2.5 py-0.5 bg-[#005581]/10 text-[#005581] dark:text-sky-300 font-extrabold text-[11px] rounded-lg">
                  Academic Scholar
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{user.email}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-2xs">
                  <span className="material-symbols-outlined text-amber-500 text-base">flag</span>
                  <span>Target Overall: <strong className="text-[#005581] dark:text-sky-400 font-black">{targetOverall}</strong></span>
                </div>
                <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-2xs">
                  <span className="material-symbols-outlined text-rose-500 text-base">timer</span>
                  <span>Exam Countdown: <strong className="text-rose-600 dark:text-rose-400 font-black">{calculateDaysRemaining()} Days</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 font-extrabold text-xs rounded-xl border border-rose-200 dark:border-rose-900 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-white dark:bg-[#1a1c26] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#005581] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            <span>Dashboard & Goals</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'vocab'
                ? 'bg-[#005581] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">auto_stories</span>
            <span>Vocabulary Vault ({vocabItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#005581] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">history</span>
            <span>Test History ({totalTests})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#005581] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab 1: OVERVIEW & GOALS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Row: Goal Score Cards & Exam Schedule Countdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Your Goal Band Score ("Mục tiêu của bạn") */}
              <div className="lg:col-span-7 bg-white dark:bg-[#1a1c26] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#005581] dark:text-sky-400 text-2xl">stars</span>
                    <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Your Target Band Scores</h2>
                  </div>
                  <span className="text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-[#005581] dark:text-sky-300 px-3 py-1 rounded-full">
                    Overall Goal: {targetOverall}
                  </span>
                </div>

                {/* Sub-skills Band Target Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Reading */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase">Reading</span>
                    <div className="text-2xl font-black text-[#005581] dark:text-sky-400">{targetReading}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Avg: {avgReadingBand}</div>
                  </div>

                  {/* Listening */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase">Listening</span>
                    <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{targetListening}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Avg: {avgListeningBand}</div>
                  </div>

                  {/* Writing */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase">Writing</span>
                    <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{targetWriting}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Target Only</div>
                  </div>

                  {/* Speaking */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase">Speaking</span>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{targetSpeaking}</div>
                    <div className="text-[10px] text-slate-400 font-medium">Target Only</div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-base">lightbulb</span>
                  <span>Tip: Completing 2 full practice tests per week boosts your score by +0.5 band!</span>
                </div>
              </div>

              {/* Right Column: Exam Schedule & Days Remaining ("Lịch thi") */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#005581] to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-400 text-slate-900 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Exam Schedule
                    </span>
                    <span className="material-symbols-outlined text-amber-300 text-2xl">event</span>
                  </div>

                  <h3 className="text-xl font-black tracking-tight">Official Test Date</h3>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="bg-white/10 text-white px-3 py-2 rounded-xl text-xs font-bold outline-none border border-white/20 focus:border-amber-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Big Countdown Number Box */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-amber-300">{calculateDaysRemaining()} Days</div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">Remaining until exam day</div>
                  </div>
                  <button
                    onClick={() => onNavigateLibrary()}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Practice Now
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Row: Study Activity Calendar / Heatmap ("Biểu đồ chăm chỉ") */}
            <div className="bg-white dark:bg-[#1a1c26] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-500 text-2xl">local_fire_department</span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Study Activity Heatmap</h3>
                </div>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  🔥 7 Days Streak!
                </span>
              </div>

              {/* Grid of Calendar Heatmap Blocks */}
              <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 gap-1.5 pt-2">
                {Array.from({ length: 28 }).map((_, idx) => {
                  const isActive = idx > 15 && idx < 25;
                  const isHeavy = idx === 20 || idx === 22 || idx === 24;
                  return (
                    <div
                      key={idx}
                      title={`Day ${idx + 1}: ${isHeavy ? '3 Tests Completed' : isActive ? '1 Test Completed' : 'Rest Day'}`}
                      className={`h-7 rounded-md transition-all cursor-pointer border ${
                        isHeavy
                          ? 'bg-emerald-600 border-emerald-700 shadow-2xs'
                          : isActive
                          ? 'bg-emerald-400 dark:bg-emerald-600 border-emerald-500'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                <span>Less Active</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-800 inline-block"></span>
                  <span className="w-3 h-3 rounded bg-emerald-300 inline-block"></span>
                  <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
                  <span className="w-3 h-3 rounded bg-emerald-700 inline-block"></span>
                </div>
                <span>More Active</span>
              </div>
            </div>

            {/* Bottom Row: Weekly Test Statistics Table ("Thống kê số bài đã làm trong tuần") */}
            <div className="bg-white dark:bg-[#1a1c26] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#005581] dark:text-sky-400">table_chart</span>
                  <span>Weekly Test Practice Activity Log</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Last 7 Days</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase text-[10px] font-black">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Reading</th>
                      <th className="py-3 px-4">Listening</th>
                      <th className="py-3 px-4">Writing</th>
                      <th className="py-3 px-4">Speaking</th>
                      <th className="py-3 px-4 text-right">Study Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Mon (27/07)</td>
                      <td className="py-3 px-4 text-[#005581] dark:text-sky-400 font-extrabold">1 Passage (Band 7.5)</td>
                      <td className="py-3 px-4 text-purple-600 dark:text-purple-400 font-extrabold">1 Part (Band 8.0)</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-right font-bold">35 Mins</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Tue (28/07)</td>
                      <td className="py-3 px-4 text-[#005581] dark:text-sky-400 font-extrabold">2 Passages (Band 8.0)</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-amber-600 font-bold">Task 2 Essay</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-right font-bold">50 Mins</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Wed (29/07)</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-purple-600 dark:text-purple-400 font-extrabold">2 Parts (Band 8.5)</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">Part 2 Cue Card</td>
                      <td className="py-3 px-4 text-right font-bold">40 Mins</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Thu (30/07)</td>
                      <td className="py-3 px-4 text-[#005581] dark:text-sky-400 font-extrabold">Full Reading Test (Band 8.0)</td>
                      <td className="py-3 px-4 text-purple-600 dark:text-purple-400 font-extrabold">Full Listening Test (Band 8.5)</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-slate-400">—</td>
                      <td className="py-3 px-4 text-right font-bold">90 Mins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: VOCABULARY VAULT ("Sổ Từ Vựng") */}
        {activeTab === 'vocab' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Stat Summary Bar */}
            <div className="bg-white dark:bg-[#1a1c26] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>📖 Vocabulary Notebook</span>
                    <span className="text-xs bg-[#005581] text-white px-2.5 py-0.5 rounded-full font-bold">
                      {totalVocabCount} Terms Total
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Organize vocabulary into topic groups, practice with 3D flashcards, and track mastery levels.
                  </p>
                </div>

                {/* Action Buttons Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsFlashcardOpen(true)}
                    className="px-4 py-2.5 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>🎴</span>
                    <span>Study with Flashcards</span>
                  </button>

                  <button
                    onClick={() => {
                      setQuizIndex(0);
                      setQuizScore(0);
                      setIsQuizOpen(true);
                    }}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>👁️</span>
                    <span>Quiz & Practice</span>
                  </button>

                  <button
                    onClick={handleAiExtractVocab}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>🤖</span>
                    <span>AI Extract Vocab</span>
                  </button>

                  <button
                    onClick={() => setIsAddVocabModalOpen(true)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>➕</span>
                    <span>Add Word</span>
                  </button>

                  <button
                    onClick={handleExportAnkiCsv}
                    className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                    title="Export CSV for Anki import"
                  >
                    <span>📥 Export Anki</span>
                  </button>
                </div>
              </div>

              {/* Progress Mastery Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-600 dark:text-emerald-400">Mastered: {masteredCount} ({masteredPercentage}%)</span>
                    <span className="text-amber-600 dark:text-amber-400">Learning: {learningCount} ({learningPercentage}%)</span>
                    <span className="text-slate-500">Unmastered: {unmasteredCount}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex p-0.5 border border-slate-200 dark:border-slate-700">
                  <div style={{ width: `${masteredPercentage}%` }} className="bg-emerald-500 h-full rounded-l-full transition-all duration-300"></div>
                  <div style={{ width: `${learningPercentage}%` }} className="bg-amber-400 h-full transition-all duration-300"></div>
                  <div style={{ width: `${100 - masteredPercentage - learningPercentage}%` }} className="bg-slate-300 dark:bg-slate-700 h-full rounded-r-full transition-all duration-300"></div>
                </div>
              </div>
            </div>

            {/* Main Vocab Body: Left Topic Sidebar + Right Vocab Cards Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Topic Sidebar ("My Topics") */}
              <div className="lg:col-span-4 bg-white dark:bg-[#1a1c26] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#005581] dark:text-sky-400">folder_open</span>
                    <span>My Topics</span>
                  </h3>
                  <button
                    onClick={() => setIsAddTopicModalOpen(true)}
                    className="text-xs font-extrabold text-[#005581] dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    + New Topic
                  </button>
                </div>

                {/* Topic Selector List */}
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedTopicId('all')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      selectedTopicId === 'all'
                        ? 'bg-[#005581] text-white shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>All Vocabulary Topics</span>
                    <span className="bg-white/20 text-xs px-2 py-0.5 rounded-md">{vocabItems.length}</span>
                  </button>

                  {vocabTopics.map((topic) => {
                    const topicItems = vocabItems.filter((v) => v.topicId === topic.id);
                    const topicMastered = topicItems.filter((v) => v.status === 'mastered').length;
                    const isSelected = selectedTopicId === topic.id;

                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#005581] text-white shadow-xs'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="mr-1.5">{topic.icon || '📁'}</span>
                          <span>{topic.name}</span>
                        </div>
                        <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                          {topicMastered}/{topicItems.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Vocabulary Items Table & List */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Search Bar */}
                <div className="bg-white dark:bg-[#1a1c26] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">search</span>
                  <input
                    type="text"
                    placeholder="Search word or definition..."
                    value={vocabSearch}
                    onChange={(e) => setVocabSearch(e.target.value)}
                    className="flex-1 bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none"
                  />
                  {vocabSearch && (
                    <button onClick={() => setVocabSearch('')} className="text-slate-400 text-xs font-bold hover:text-slate-600">Clear</button>
                  )}
                </div>

                {/* Vocabulary Cards List */}
                {filteredVocab.length === 0 ? (
                  <div className="bg-white dark:bg-[#1a1c26] p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                    <span className="material-symbols-outlined text-4xl text-slate-400">menu_book</span>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      No vocabulary words found in this category.
                    </p>
                    <button
                      onClick={() => setIsAddVocabModalOpen(true)}
                      className="px-4 py-2 bg-[#005581] text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
                    >
                      + Add First Word
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredVocab.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-[#1a1c26] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-[#005581] dark:hover:border-sky-500 transition-all space-y-3 group"
                      >
                        {/* Word Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-base font-black text-slate-900 dark:text-white">{item.word}</span>
                            
                            {item.phonetic && (
                              <span className="text-xs font-mono text-slate-500 font-medium">{item.phonetic}</span>
                            )}

                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] rounded uppercase">
                              {item.pos}
                            </span>

                            {/* Audio Speaker Button */}
                            <button
                              onClick={() => speakWord(item.word)}
                              className="p-1 rounded-full text-slate-400 hover:text-[#005581] hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Listen to pronunciation"
                            >
                              <span className="material-symbols-outlined text-base">volume_up</span>
                            </button>
                          </div>

                          {/* Status Toggle & Actions */}
                          <div className="flex items-center gap-2">
                            <select
                              value={item.status || 'learning'}
                              onChange={(e) => handleToggleVocabStatus(item.id, e.target.value as 'mastered' | 'learning' | 'unmastered')}
                              className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg outline-none cursor-pointer border ${
                                item.status === 'mastered'
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : item.status === 'learning'
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-300'
                              }`}
                            >
                              <option value="mastered">✅ Mastered</option>
                              <option value="learning">⏳ Learning</option>
                              <option value="unmastered">🔴 Unmastered</option>
                            </select>

                            <button
                              onClick={() => handleDeleteVocab(item.id)}
                              className="text-slate-300 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                              title="Delete word"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>

                        {/* Meaning & Definition */}
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {item.mean}
                        </div>

                        {/* Collocations & Examples */}
                        {item.collocations && (
                          <div className="text-[11px] font-medium text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 px-3 py-1.5 rounded-xl border border-sky-100 dark:border-sky-900">
                            <strong>Collocations:</strong> {item.collocations}
                          </div>
                        )}

                        {item.ex && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                            "{item.ex}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: TEST HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Recent Exam Practice History
            </h3>

            {historyItems.length === 0 ? (
              <div className="py-16 text-center text-slate-400 font-medium bg-white dark:bg-[#1a1c26] rounded-2xl border border-slate-200 dark:border-slate-800">
                No test history yet. Complete a test to see results logged here!
              </div>
            ) : (
              <div className="space-y-3">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-white dark:bg-[#1a1c26] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#005581] dark:hover:border-sky-500 transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shrink-0 ${
                          item.mode === 'reading' ? 'bg-[#005581]' : 'bg-purple-600'
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {item.mode === 'reading' ? 'menu_book' : 'headphones'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                          {item.testTitle}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          Date: {item.date} • Duration: {item.durationMins} mins
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-sm font-black text-[#005581] dark:text-sky-400">
                          BAND {item.bandScore.toFixed(1)}
                        </div>
                        <div className="text-xs font-bold text-slate-500">
                          {item.correct}/{item.total} Correct
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onSelectTestFromDashboard) {
                            onSelectTestFromDashboard(item.mode, 1);
                          }
                        }}
                        className="px-4 py-2 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Retake Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: ACCOUNT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white dark:bg-[#1a1c26] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6 animate-in fade-in duration-200">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Account Profile & Preferences
            </h3>

            {saveSuccessMsg && (
              <div className="p-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-extrabold">
                ✅ Profile settings updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none focus:border-[#005581]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={userEmailInput}
                  onChange={(e) => setUserEmailInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none focus:border-[#005581]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1">Target Overall Band Score</label>
                <select
                  value={targetOverall}
                  onChange={(e) => setTargetOverall(parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none focus:border-[#005581]"
                >
                  <option value={6.0}>6.0 Competent User</option>
                  <option value={6.5}>6.5 Good Competent User</option>
                  <option value={7.0}>7.0 Good User</option>
                  <option value={7.5}>7.5 Very Good User</option>
                  <option value={8.0}>8.0 Very Good / Advanced</option>
                  <option value={8.5}>8.5 Expert Scholar</option>
                  <option value={9.0}>9.0 Expert User</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD NEW VOCABULARY MODAL */}
      {isAddVocabModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181a22] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>➕</span>
                <span>Add Vocabulary to Notebook</span>
              </h3>
              <button onClick={() => setIsAddVocabModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddVocabSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1">Word / Term</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ubiquitous"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none focus:border-[#005581]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1">Phonetic IPA</label>
                  <input
                    type="text"
                    placeholder="e.g. /juːˈbɪk.wɪ.təs/"
                    value={newPhonetic}
                    onChange={(e) => setNewPhonetic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none focus:border-[#005581]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1">Part of Speech</label>
                  <select
                    value={newPos}
                    onChange={(e) => setNewPos(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none"
                  >
                    <option value="noun">Noun (n)</option>
                    <option value="verb">Verb (v)</option>
                    <option value="adj">Adjective (adj)</option>
                    <option value="adv">Adverb (adv)</option>
                    <option value="phrase">Phrase</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1">Topic Group</label>
                  <select
                    value={newTopicId}
                    onChange={(e) => setNewTopicId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none"
                  >
                    {vocabTopics.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1">Definition / Meaning</label>
                <input
                  type="text"
                  required
                  placeholder="Definition in English or Vietnamese..."
                  value={newMean}
                  onChange={(e) => setNewMean(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1">Collocations & Idioms</label>
                <input
                  type="text"
                  placeholder="e.g. Ubiquitous presence, virtually ubiquitous"
                  value={newCollocations}
                  onChange={(e) => setNewCollocations(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1">Example Sentence</label>
                <input
                  type="text"
                  placeholder="e.g. AI tools are ubiquitous in corporate offices."
                  value={newEx}
                  onChange={(e) => setNewEx(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddVocabModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#005581] hover:bg-[#004466] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save Vocabulary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE 3D FLASHCARD STUDY MODAL */}
      {isFlashcardOpen && vocabItems.length > 0 && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181a22] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-400">
              <span>🎴 Flashcard {currentCardIndex + 1} of {vocabItems.length}</span>
              <button onClick={() => setIsFlashcardOpen(false)} className="hover:text-slate-800">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* 3D Flip Card Element */}
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="min-h-[220px] p-6 bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-slate-900 dark:to-slate-800/80 rounded-3xl border-2 border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-3 cursor-pointer shadow-md transition-all hover:scale-102 select-none"
            >
              {!isCardFlipped ? (
                /* Front Side */
                <>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {vocabItems[currentCardIndex].word}
                  </span>
                  <span className="text-xs font-mono text-[#005581] dark:text-sky-300">
                    {vocabItems[currentCardIndex].phonetic}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 pt-2">
                    (Click card to reveal definition & context)
                  </span>
                </>
              ) : (
                /* Back Side */
                <>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {vocabItems[currentCardIndex].mean}
                  </span>
                  {vocabItems[currentCardIndex].collocations && (
                    <div className="text-[11px] font-bold text-sky-800 dark:text-sky-300">
                      Collocations: {vocabItems[currentCardIndex].collocations}
                    </div>
                  )}
                  {vocabItems[currentCardIndex].ex && (
                    <p className="text-xs text-slate-500 italic">
                      "{vocabItems[currentCardIndex].ex}"
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Memory Rating Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              <button
                onClick={() => {
                  handleToggleVocabStatus(vocabItems[currentCardIndex].id, 'unmastered');
                  setIsCardFlipped(false);
                  setCurrentCardIndex((prev) => (prev + 1) % vocabItems.length);
                }}
                className="py-2 bg-rose-100 text-rose-900 hover:bg-rose-200 font-extrabold text-[11px] rounded-xl cursor-pointer"
              >
                Again 🔴
              </button>
              <button
                onClick={() => {
                  handleToggleVocabStatus(vocabItems[currentCardIndex].id, 'learning');
                  setIsCardFlipped(false);
                  setCurrentCardIndex((prev) => (prev + 1) % vocabItems.length);
                }}
                className="py-2 bg-amber-100 text-amber-900 hover:bg-amber-200 font-extrabold text-[11px] rounded-xl cursor-pointer"
              >
                Hard 🟠
              </button>
              <button
                onClick={() => {
                  handleToggleVocabStatus(vocabItems[currentCardIndex].id, 'learning');
                  setIsCardFlipped(false);
                  setCurrentCardIndex((prev) => (prev + 1) % vocabItems.length);
                }}
                className="py-2 bg-sky-100 text-sky-900 hover:bg-sky-200 font-extrabold text-[11px] rounded-xl cursor-pointer"
              >
                Good 🔵
              </button>
              <button
                onClick={() => {
                  handleToggleVocabStatus(vocabItems[currentCardIndex].id, 'mastered');
                  setIsCardFlipped(false);
                  setCurrentCardIndex((prev) => (prev + 1) % vocabItems.length);
                }}
                className="py-2 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-extrabold text-[11px] rounded-xl cursor-pointer"
              >
                Easy 🟢
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: QUIZ & PRACTICE MODAL */}
      {isQuizOpen && vocabItems.length > 0 && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181a22] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#005581] dark:text-sky-400">👁️ Vocab Quiz ({quizIndex + 1}/{vocabItems.length})</span>
              <button onClick={() => setIsQuizOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">What is the meaning of:</span>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {vocabItems[quizIndex % vocabItems.length].word}
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2">
                {vocabItems.slice(0, 4).map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === vocabItems[quizIndex % vocabItems.length].id) {
                        setQuizScore((prev) => prev + 1);
                        alert('🎉 Correct answer!');
                      } else {
                        alert(`❌ Incorrect! The correct definition was: "${vocabItems[quizIndex % vocabItems.length].mean}"`);
                      }
                      if (quizIndex + 1 >= vocabItems.length) {
                        alert(`🏆 Quiz completed! Score: ${quizScore + 1}/${vocabItems.length}`);
                        setIsQuizOpen(false);
                      } else {
                        setQuizIndex((prev) => prev + 1);
                      }
                    }}
                    className="w-full text-left p-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {item.mean}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: NEW TOPIC MODAL */}
      {isAddTopicModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181a22] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Create New Vocabulary Topic</h3>
            <input
              type="text"
              placeholder="e.g. Science & Space Exploration"
              value={newTopicNameInput}
              onChange={(e) => setNewTopicNameInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddTopicModalOpen(false)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTopic}
                className="px-4 py-1.5 bg-[#005581] text-white font-extrabold text-xs rounded-xl shadow-xs"
              >
                Create Topic
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
