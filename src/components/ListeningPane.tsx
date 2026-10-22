import React, { useState, useRef, useEffect } from 'react';
import { ListeningSection, Question, ExamExecutionMode } from '../types';
import { Resizer } from './Resizer';

interface ListeningPaneProps {
  section: ListeningSection;
  allSections: ListeningSection[];
  answers: Record<number, string>;
  onAnswerChange: (questionNum: number, value: string) => void;
  activeQuestionNum: number;
  isSolutionMode: boolean;
  isSubmitted: boolean;
  onSelectPart: (partNum: number) => void;
  examExecutionMode?: ExamExecutionMode;
}

export const ListeningPane: React.FC<ListeningPaneProps> = ({
  section,
  allSections,
  answers,
  onAnswerChange,
  activeQuestionNum,
  isSolutionMode,
  isSubmitted,
  onSelectPart,
  examExecutionMode = 'practice',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(false);
  const [hasFinishedOnce, setHasFinishedOnce] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(300);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Tapescript & Solution View States
  const isReadOnly = isSubmitted || isSolutionMode;
  const isTestMode = examExecutionMode === 'test' && !isSolutionMode;

  const [showTranscript, setShowTranscript] = useState<boolean>(isSolutionMode || isSubmitted);
  const [leftPanePercentage, setLeftPanePercentage] = useState<number>(44);
  const [highlightedQNum, setHighlightedQNum] = useState<number | null>(null);
  const [currentlyPlayingQNum, setCurrentlyPlayingQNum] = useState<number | null>(null);
  const [openExplains, setOpenExplains] = useState<Record<number, boolean>>({});

  // When solution mode activates, default showTranscript to true
  useEffect(() => {
    if (isSolutionMode || isSubmitted) {
      setShowTranscript(true);
    }
  }, [isSolutionMode, isSubmitted]);

  // Auto-scroll to active question if activeQuestionNum changes from outside
  useEffect(() => {
    if (activeQuestionNum && questionRefs.current[activeQuestionNum]) {
      questionRefs.current[activeQuestionNum]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeQuestionNum]);

  // Reset audio state when section changes
  useEffect(() => {
    setIsPlaying(false);
    setHasStartedPlaying(false);
    setHasFinishedOnce(false);
    setCurrentTime(0);
    setHighlightedQNum(null);
    setCurrentlyPlayingQNum(null);
  }, [section.partNumber]);

  // Audio Handlers
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isTestMode) {
      if (hasFinishedOnce) return;
      if (hasStartedPlaying && isPlaying) return;

      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStartedPlaying(true);
      }).catch(() => {});
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasFinishedOnce(true);
    setCurrentlyPlayingQNum(null);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTestMode) return;
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatAudioTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // "Listen from here" Handler: seeks audio to timestamp and plays
  const handleListenFromHere = (q: Question) => {
    if (!audioRef.current) return;

    let targetTime = q.audioTimestamp;

    if (targetTime === undefined) {
      if (q.referenceQuote && section.transcript.includes(q.referenceQuote)) {
        const idx = section.transcript.indexOf(q.referenceQuote);
        const ratio = idx / Math.max(1, section.transcript.length);
        const totalDur = duration || 300;
        targetTime = Math.round(ratio * totalDur);
      } else {
        const allQuestions = section.questionGroups.flatMap((g) => g.questions);
        const minNum = allQuestions[0]?.number || 1;
        const maxNum = allQuestions[allQuestions.length - 1]?.number || 10;
        const index = Math.max(0, q.number - minNum);
        const total = Math.max(1, maxNum - minNum + 1);
        const totalDur = duration || 300;
        targetTime = Math.round((index / total) * totalDur);
      }
    }

    audioRef.current.currentTime = targetTime;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setCurrentlyPlayingQNum(q.number);
      })
      .catch(() => {});
  };

  // "Locate" Handler: opens tapescript, highlights quote and scrolls to it
  const handleLocateQuestion = (q: Question) => {
    setShowTranscript(true);
    setHighlightedQNum(q.number);

    setTimeout(() => {
      const el = document.getElementById(`listening-quote-${q.number}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Render Transcript with Interactive Evidence Highlights
  const renderTranscriptWithHighlights = () => {
    const allQuestions = section.questionGroups.flatMap((g) => g.questions);
    const quotesMap = allQuestions.filter((q) => q.referenceQuote && q.referenceQuote.trim().length > 0);

    const lines = section.transcript.split('\n');

    return (
      <div id="listening-transcript-container" className="space-y-3 font-sans text-xs md:text-sm leading-relaxed text-slate-800 select-text">
        {lines.map((line, lineIdx) => {
          if (!line.trim()) return <div key={lineIdx} className="h-2" />;

          const speakerMatch = line.match(/^(\[[^\]]+\]:?)(.*)/);
          let speaker = '';
          let content = line;

          if (speakerMatch) {
            speaker = speakerMatch[1];
            content = speakerMatch[2];
          }

          const matchingQuotes = quotesMap.filter((q) => q.referenceQuote && content.includes(q.referenceQuote));

          if (matchingQuotes.length === 0) {
            return (
              <p key={lineIdx} className="text-slate-700 font-normal">
                {speaker && <strong className="text-[#005581] font-bold mr-1.5">{speaker}</strong>}
                {content}
              </p>
            );
          }

          // Sort quotes by order of appearance in content line
          const sorted = [...matchingQuotes].sort(
            (a, b) => content.indexOf(a.referenceQuote!) - content.indexOf(b.referenceQuote!)
          );

          let lastIndex = 0;
          const elements: React.ReactNode[] = [];

          sorted.forEach((q) => {
            const qText = q.referenceQuote!;
            const matchIdx = content.indexOf(qText, lastIndex);

            if (matchIdx >= 0) {
              if (matchIdx > lastIndex) {
                elements.push(content.substring(lastIndex, matchIdx));
              }

              const isLocated = highlightedQNum === q.number;

              elements.push(
                <mark
                  key={`q-${q.number}-${matchIdx}`}
                  id={`listening-quote-${q.number}`}
                  className={`transition-all duration-300 inline-block my-0.5 rounded-md px-2 py-0.5 font-medium border cursor-pointer ${
                    isLocated
                      ? 'bg-amber-300 text-amber-950 ring-4 ring-[#005581] border-[#005581] shadow-md font-bold scale-[1.02]'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                  }`}
                  onClick={() => handleListenFromHere(q)}
                  title={`Click to play audio for Question ${q.number} (${formatAudioTime(q.audioTimestamp || 0)})`}
                >
                  <span className="inline-flex items-center gap-1 mr-1 px-1.5 py-0.2 bg-[#005581] text-white font-extrabold text-[10px] rounded shrink-0">
                    Q{q.number}
                  </span>
                  <span className="italic font-serif">{qText}</span>
                </mark>
              );

              lastIndex = matchIdx + qText.length;
            }
          });

          if (lastIndex < content.length) {
            elements.push(content.substring(lastIndex));
          }

          return (
            <p key={lineIdx} className="text-slate-800 font-normal">
              {speaker && <strong className="text-[#005581] font-bold mr-1.5">{speaker}</strong>}
              {elements}
            </p>
          );
        })}
      </div>
    );
  };

  // Solution Box for Question Cards
  const renderSolutionBox = (q: Question) => {
    const isExpanded = openExplains[q.number] !== false; // Default open in solution mode
    const userAnswer = answers[q.number] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

    return (
      <div className="mt-3 space-y-2">
        {/* Answer Bar & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
              Answer: <strong className="ml-1 text-slate-900">{q.correctAnswer}</strong>
            </span>
            {userAnswer ? (
              <span
                className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                {isCorrect ? '✓ Correct' : `✗ Your answer: ${userAnswer}`}
              </span>
            ) : (
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-500 border border-slate-200">
                — Unanswered
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Locate Button */}
            <button
              type="button"
              onClick={() => handleLocateQuestion(q)}
              className="px-2.5 py-1 rounded-lg bg-[#e8f2fe] hover:bg-[#d0e4fd] text-[#005581] text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
              title="Highlight & locate evidence in tapescript"
            >
              <span className="material-symbols-outlined text-sm">location_on</span>
              Locate
            </button>

            {/* Listen from here Button */}
            <button
              type="button"
              onClick={() => handleListenFromHere(q)}
              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
              title={`Play audio starting at ${formatAudioTime(q.audioTimestamp || 0)}`}
            >
              <span className="material-symbols-outlined text-sm">play_circle</span>
              Listen from here
            </button>

            {/* Explain Toggle Button */}
            <button
              type="button"
              onClick={() =>
                setOpenExplains((prev) => ({
                  ...prev,
                  [q.number]: !isExpanded,
                }))
              }
              className="px-2.5 py-1 rounded-lg bg-[#005581] hover:bg-[#004466] text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              {isExpanded ? 'Hide' : 'Explain'}
            </button>
          </div>
        </div>

        {/* Detailed Explanation Box */}
        {isExpanded && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 shadow-2xs">
            {q.referenceQuote && (
              <div className="flex items-start gap-1.5 text-slate-800 leading-relaxed">
                <span className="font-bold text-[#005581] shrink-0">• Cụm từ then chốt:</span>
                <span className="italic font-serif text-slate-700">"{q.referenceQuote}"</span>
              </div>
            )}
            <div className="flex items-start gap-1.5 text-slate-800 leading-relaxed">
              <span className="font-bold text-[#005581] shrink-0">• Giải thích:</span>
              <span>{q.explanation}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#F9FAFB] text-slate-900 overflow-hidden">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={section.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Top Audio Player Bar */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-2.5 shadow-2xs shrink-0 flex flex-wrap items-center justify-between gap-3 z-10">
        {/* Play/Pause & Seeker */}
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <button
            onClick={togglePlay}
            disabled={isTestMode && (hasStartedPlaying || hasFinishedOnce)}
            className={`w-9 h-9 rounded-full text-white flex items-center justify-center transition-all shadow-2xs shrink-0 ${
              isTestMode && (hasStartedPlaying || hasFinishedOnce)
                ? 'bg-slate-400 cursor-not-allowed opacity-75'
                : 'bg-[#005581] hover:bg-[#004466] active:scale-95 cursor-pointer'
            }`}
            title={
              isTestMode
                ? hasFinishedOnce
                  ? 'Finished'
                  : 'Play audio'
                : isPlaying
                ? 'Pause'
                : 'Play'
            }
          >
            <span className="material-symbols-outlined text-xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <div className="flex-1 flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-slate-600 min-w-[36px]">
              {formatAudioTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              disabled={isTestMode}
              className={`w-full h-1.5 rounded-lg appearance-none ${
                isTestMode
                  ? 'bg-slate-200 cursor-not-allowed accent-slate-400'
                  : 'bg-slate-200 cursor-pointer accent-[#005581]'
              }`}
            />
            <span className="text-xs font-mono font-bold text-slate-600 min-w-[36px]">
              {formatAudioTime(duration)}
            </span>
          </div>

          {currentlyPlayingQNum && isPlaying && (
            <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <span className="material-symbols-outlined text-xs">volume_up</span>
              <span>Playing Q{currentlyPlayingQNum}</span>
            </span>
          )}
        </div>

        {/* Speed, Volume, Tapescript Toggle, and Part Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Speed selector */}
          {!isTestMode && (
            <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700">
              {[1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleRateChange(rate)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    playbackRate === rate ? 'bg-[#005581] text-white shadow-2xs' : 'hover:bg-slate-200'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          )}

          {/* Volume slider */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="material-symbols-outlined text-slate-500 text-base">
              {isMuted || volume === 0 ? 'volume_off' : 'volume_up'}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 h-1 bg-slate-200 rounded appearance-none cursor-pointer accent-[#005581]"
            />
          </div>

          {/* Tapescript Toggle Button */}
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
              showTranscript
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Toggle Tapescript / Transcript left panel"
          >
            <span className="material-symbols-outlined text-base">subtitles</span>
            <span>{showTranscript ? 'Hide Tapescript' : 'Show Tapescript'}</span>
          </button>

          {/* Part Switcher Pills */}
          <div className="flex items-center gap-1">
            {allSections.map((sec) => (
              <button
                key={sec.partNumber}
                onClick={() => onSelectPart(sec.partNumber)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  sec.partNumber === section.partNumber
                    ? 'bg-[#005581] text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Part {sec.partNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split-Pane or Full Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: Tapescript / Transcript */}
        {showTranscript && (
          <div
            style={{ flex: `0 0 ${leftPanePercentage}%` }}
            className="h-full flex flex-col min-w-[280px] bg-amber-50/40 border-r border-amber-200/80 overflow-hidden"
          >
            {/* Tapescript Pane Header */}
            <div className="p-3 bg-amber-100/60 border-b border-amber-200/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-800 text-lg">subtitles</span>
                <span className="font-extrabold text-xs text-amber-950 uppercase tracking-wider">
                  AUDIO TAPESCRIPT ({section.title})
                </span>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                Highlight evidence
              </span>
            </div>

            {/* Scrollable Transcript Box */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              {renderTranscriptWithHighlights()}
            </div>
          </div>
        )}

        {/* Resizer Divider */}
        {showTranscript && <Resizer onResize={(pct) => setLeftPanePercentage(pct)} />}

        {/* Right Pane: Questions & Solutions Canvas */}
        <div className="flex-1 h-full min-w-[280px] flex flex-col overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50">
          <div className="max-w-[800px] w-full mx-auto space-y-6">
            {/* Section Header */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">{section.questionRange}</p>
            </div>

            {/* Question Groups */}
            {section.questionGroups.map((group) => (
              <div key={group.id} className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">{group.title}</h3>
                  <p className="text-xs text-slate-600 italic mt-0.5">{group.instructions}</p>
                </div>

                {/* Questions */}
                <div className="space-y-5">
                  {group.questions.map((q) => {
                    const isActive = activeQuestionNum === q.number;
                    const userAnswer = answers[q.number] || '';

                    return (
                      <div
                        key={q.id}
                        ref={(el) => (questionRefs.current[q.number] = el)}
                        className={`p-4 rounded-xl transition-all border ${
                          isActive
                            ? 'border-[#005581] ring-2 ring-[#005581]/20 bg-sky-50/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Question Prompt */}
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0 border border-slate-300">
                            {q.number}
                          </span>
                          <div className="flex-1 pt-0.5">
                            <p className="text-sm font-semibold text-slate-900 leading-snug">{q.text}</p>

                            {/* Multiple Choice Options */}
                            {q.type === 'multiple_choice' && q.options && (
                              <div className="mt-3 space-y-2">
                                {q.options.map((opt) => {
                                  const optLetter = opt.charAt(0);
                                  const isSelected = userAnswer === opt;

                                  return (
                                    <label
                                      key={opt}
                                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-xs font-medium ${
                                        isSelected
                                          ? 'bg-sky-50 border-[#005581] text-[#005581] font-bold shadow-2xs'
                                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                                      } ${isReadOnly ? 'cursor-not-allowed' : ''}`}
                                    >
                                      <input
                                        type="radio"
                                        name={`listening_q_${q.number}`}
                                        value={opt}
                                        checked={isSelected}
                                        disabled={isReadOnly}
                                        onChange={() => !isReadOnly && onAnswerChange(q.number, opt)}
                                        className="w-4 h-4 text-[#005581] border-slate-300 focus:ring-[#005581]"
                                      />
                                      <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0 border border-slate-300">
                                        {optLetter}
                                      </span>
                                      <span>{opt.substring(2)}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}

                            {/* Text Fill-in-the-blank Input */}
                            {q.type === 'text_input' && (
                              <div className="mt-3 flex items-center gap-2">
                                <span>{q.prefixText || ''}</span>
                                <input
                                  type="text"
                                  value={userAnswer}
                                  disabled={isReadOnly}
                                  onChange={(e) => !isReadOnly && onAnswerChange(q.number, e.target.value)}
                                  placeholder="Your answer"
                                  className="w-44 h-9 px-3 border border-slate-300 rounded-lg bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#005581] focus:ring-1 focus:ring-[#005581]"
                                />
                                <span>{q.suffixText || ''}</span>
                              </div>
                            )}

                            {/* Solution Mode Controls & Explanation */}
                            {isSolutionMode && renderSolutionBox(q)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
