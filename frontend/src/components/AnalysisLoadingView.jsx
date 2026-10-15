import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  FileSearch, 
  Scale, 
  CheckCircle2, 
  Loader2, 
  Cpu, 
  Activity, 
  ShieldAlert 
} from 'lucide-react';

export default function AnalysisLoadingView({ onComplete, claimData }) {
  // Cycle stages required by user specification:
  // 1. "Agent transcribing vernacular audio..."
  // 2. "Agent extracting document data..."
  // 3. "Agent cross-referencing policies..."
  const steps = [
    {
      id: 'audio',
      title: 'Agent transcribing vernacular audio...',
      agent: 'SpeechRecognitionAgent (Vernacular)',
      detail: 'Dialect model processing acoustic phonemes & converting to Devanagari/English text.',
      icon: Mic,
      color: 'blue'
    },
    {
      id: 'doc',
      title: 'Agent extracting document data...',
      agent: 'DocumentExtractionAgent (Vision OCR)',
      detail: 'Isolating synthetic ID boundaries, OCR bounding boxes, and parsing demographic fields.',
      icon: FileSearch,
      color: 'amber'
    },
    {
      id: 'policy',
      title: 'Agent cross-referencing policies...',
      agent: 'PolicyCrossReferencingAgent (Auditor)',
      detail: 'Cross-checking declared assets, income caps, and flagging name/spelling discrepancies.',
      icon: Scale,
      color: 'emerald'
    }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Step progression timer
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    // Smooth progress bar timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 120);

    // Complete transition after 4.8s
    const completeTimeout = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 4800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const activeStep = steps[currentStepIndex];

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 max-w-4xl mx-auto py-12">
      
      {/* Central High-Tech Spinner */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full border-4 border-slate-800 border-t-orange-500 border-r-blue-500 border-b-emerald-500 animate-spin flex items-center justify-center">
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner">
            <Bot className="w-8 h-8 text-orange-400 animate-pulse" />
          </div>
        </div>
        {/* Glow */}
        <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-xl -z-10 animate-pulse"></div>
      </div>

      {/* Primary Dynamic Status Text (Prompt Requirement) */}
      <div className="text-center mb-8 h-20 flex flex-col items-center justify-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300 mb-2 font-mono">
          <Activity className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>Stage {currentStepIndex + 1} of 3: Multi-Agent In-Flight</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight animate-fade-in transition-all">
          {activeStep.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
          {activeStep.detail}
        </p>
      </div>

      {/* Multi-Agent Cards Pipeline */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'bg-slate-900 border-orange-500/50 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/20'
                  : isDone
                    ? 'bg-slate-900/60 border-emerald-500/30'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isCurrent 
                    ? 'bg-orange-500/20 text-orange-400' 
                    : isDone
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {isDone ? (
                  <span className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                ) : isCurrent ? (
                  <span className="flex items-center space-x-1 text-[11px] font-semibold text-orange-400 animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-600 font-mono">Queued</span>
                )}
              </div>

              <h4 className="text-xs font-bold text-white tracking-tight">{step.agent}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {step.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-full p-1 shadow-inner">
        <div 
          className="h-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="w-full max-w-xl flex justify-between text-[11px] text-slate-500 font-mono mt-2 px-1">
        <span>Synthetic Sandbox Pipeline</span>
        <span>{progress}% Synthesized</span>
      </div>

      {/* Safeguard Footnote */}
      <div className="mt-8 flex items-center space-x-2 text-[11px] text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Next screen: Admin Dashboard with Human-in-the-Loop review and discrepancy highlighting.</span>
      </div>

    </div>
  );
}
