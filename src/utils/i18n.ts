import { Language } from '../types';

export const translations = {
  vi: {
    // Navigation & Header
    brandSubtitle: "Standard IELTS Exam Simulator",
    home: "Home",
    testLibrary: "Test Library",
    fullTest: "Full Exam Simulator",
    dashboard: "User Dashboard",
    practiceNow: "Practice Now",
    adminPortal: "Admin Portal",
    reportBug: "Report Issue",
    downloadPdf: "Download PDF",
    dictionary: "Dictionary",
    settings: "Settings",
    
    // User Dashboard Page
    dashboardTitle: "My Learning Dashboard",
    dashboardSubtitle: "Track your band score progress, study targets, vocabulary notebook and settings",
    overviewTab: "Overview & Analytics",
    historyTab: "Test History",
    vocabTab: "Vocabulary Vault",
    settingsTab: "Account Settings",
    
    // Dashboard Overview
    readingAvg: "Avg. Reading Band",
    listeningAvg: "Avg. Listening Band",
    totalTestsCompleted: "Tests Completed",
    savedVocabCount: "Saved Words",
    targetBandGoal: "Target Band Score",
    targetProgressTip: "Practice 1-2 Reading/Listening passages daily to reach your target band!",
    
    // Dashboard History
    recentHistoryTitle: "Recent Test Attempts",
    noHistory: "No test attempts yet. Complete a test to see results here!",
    redoTest: "Retake Test",
    
    // Dashboard Vocab
    addNewWord: "Add New Word",
    wordEng: "English word or phrase...",
    wordMeaning: "Definition / Meaning...",
    addWordBtn: "+ Add Word",
    
    // Dashboard Settings
    appSettingsTitle: "Application & Account Settings",
    interfaceLanguage: "Interface Language",
    vietnamese: "English",
    english: "English",
    themeMode: "Interface Theme",
    lightTheme: "Light Theme",
    darkTheme: "Dark Theme",
    fontSizeLabel: "Reading Font Size",
    targetBandLabel: "Target Band Score",
    saveProfileBtn: "Save Changes",
    
    // Full Test Selection / Picking Screen
    fullTestSetupTitle: "Full Exam Simulator Setup",
    fullTestSetupSubtitle: "Choose test modules, specific passages, or generate a randomized full exam set",
    pickSkills: "1. Select Test Modules",
    reading3Passages: "Reading (3 Passages • 60 Mins)",
    listening4Parts: "Listening (4 Parts • 40 Mins)",
    bothSkillsCombo: "Academic Combo (Reading & Listening)",
    randomizeBtn: "Randomize Test Set",
    pickExamExecutionMode: "2. Select Execution Mode",
    practiceExecutionMode: "Practice Mode",
    practiceExecutionDesc: "Custom timer, full audio controls (play/seek/pause), and AI dictionary lookup enabled.",
    testExecutionMode: "Real Exam Mode",
    testExecutionDesc: "100% Real Exam Simulation! Fixed timer, audio plays ONCE only, NO dictionary.",
    selectPassagesList: "3. Select Exam Passages",
    searchPlaceholder: "Search test papers by title or topic...",
    startFullTestNow: "Start Full Exam Now",
    startPracticeNow: "Start Practice Now",
    
    // Test Workspace
    readingPractice: "IELTS Reading Practice",
    listeningPractice: "IELTS Listening Practice",
    submitTest: "Submit Test",
    reviewAnswers: "Review & Explanations",
    nextPassage: "Next Passage",
    prevPassage: "Previous Passage",
  },
  en: {
    // Navigation & Header
    brandSubtitle: "Standard IELTS Exam Simulator",
    home: "Home",
    testLibrary: "Test Library",
    fullTest: "Full Exam Simulator",
    dashboard: "User Dashboard",
    practiceNow: "Practice Now",
    adminPortal: "Admin Portal",
    reportBug: "Report Issue",
    downloadPdf: "Download PDF",
    dictionary: "Dictionary",
    settings: "Settings",
    
    // User Dashboard Page
    dashboardTitle: "My Learning Dashboard",
    dashboardSubtitle: "Track your band score progress, study targets, vocabulary notebook and settings",
    overviewTab: "Overview & Analytics",
    historyTab: "Test History",
    vocabTab: "Vocabulary Vault",
    settingsTab: "Account Settings",
    
    // Dashboard Overview
    readingAvg: "Avg. Reading Band",
    listeningAvg: "Avg. Listening Band",
    totalTestsCompleted: "Tests Completed",
    savedVocabCount: "Saved Words",
    targetBandGoal: "Target Band Score",
    targetProgressTip: "Practice 1-2 Reading/Listening passages daily to reach your target band!",
    
    // Dashboard History
    recentHistoryTitle: "Recent Test Attempts",
    noHistory: "No test attempts yet. Complete a test to see results here!",
    redoTest: "Retake Test",
    
    // Dashboard Vocab
    addNewWord: "Add New Word",
    wordEng: "English word or phrase...",
    wordMeaning: "Definition / Meaning...",
    addWordBtn: "+ Add Word",
    
    // Dashboard Settings
    appSettingsTitle: "Application & Account Settings",
    interfaceLanguage: "Interface Language",
    vietnamese: "English",
    english: "English",
    themeMode: "Interface Theme",
    lightTheme: "Light Theme",
    darkTheme: "Dark Theme",
    fontSizeLabel: "Reading Font Size",
    targetBandLabel: "Target Band Score",
    saveProfileBtn: "Save Changes",
    
    // Full Test Selection / Picking Screen
    fullTestSetupTitle: "Full Exam Simulator Setup",
    fullTestSetupSubtitle: "Choose test modules, specific passages, or generate a randomized full exam set",
    pickSkills: "1. Select Test Modules",
    reading3Passages: "Reading (3 Passages • 60 Mins)",
    listening4Parts: "Listening (4 Parts • 40 Mins)",
    bothSkillsCombo: "Academic Combo (Reading & Listening)",
    randomizeBtn: "Randomize Test Set",
    pickExamExecutionMode: "2. Select Execution Mode",
    practiceExecutionMode: "Practice Mode",
    practiceExecutionDesc: "Custom timer, full audio controls (play/seek/pause), and AI dictionary lookup enabled.",
    testExecutionMode: "Real Exam Mode",
    testExecutionDesc: "100% Real Exam Simulation! Fixed timer, audio plays ONCE only, NO dictionary.",
    selectPassagesList: "3. Select Exam Passages",
    searchPlaceholder: "Search test papers by title or topic...",
    startFullTestNow: "Start Full Exam Now",
    startPracticeNow: "Start Practice Now",
    
    // Test Workspace
    readingPractice: "IELTS Reading Practice",
    listeningPractice: "IELTS Listening Practice",
    submitTest: "Submit Test",
    reviewAnswers: "Review & Explanations",
    nextPassage: "Next Passage",
    prevPassage: "Previous Passage",
  },
};

export const getT = (lang: Language = 'en') => translations.en;
