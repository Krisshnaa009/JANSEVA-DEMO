import React, { useState } from 'react';
import { Play, Pause, Volume2, Mic, Globe, CheckCircle2 } from 'lucide-react';

export default function AudioTranscriptView({ audioMeta }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Simulate playback
      let current = 0;
      const interval = setInterval(() => {
        current += 5;
        if (current >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          setProgress(0);
        } else {
          setProgress(current);
        }
      }, 300);
    }
  };

  const audio = audioMeta || {};

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
      
      {/* Audio Player Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Mic className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Audio Deposition & Verified Transcript
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
          {audio.language_detected || 'Bhojpuri / Hindi Dialect'}
        </span>
      </div>

      {/* Simulated Audio Player Bar */}
      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-3 mb-4">
        <button
          type="button"
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md transition-all"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>

        <div className="flex-1">
          {/* Waveform Bars */}
          <div className="h-6 flex items-center space-x-1">
            {[40, 70, 30, 90, 60, 45, 80, 100, 75, 40, 60, 85, 30, 50, 90, 70, 40, 65, 80, 45].map((val, i) => {
              const active = (i / 20) * 100 <= progress;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    active ? 'bg-blue-400' : 'bg-slate-700'
                  }`}
                  style={{ height: isPlaying ? `${Math.max(20, (val * (0.6 + Math.random() * 0.4)))}%` : `${val * 0.5}%` }}
                ></div>
              );
            })}
          </div>

          {/* Scrubber progress */}
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
            <div className="bg-blue-500 h-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-400 shrink-0">
          0:{progress > 0 ? String(Math.round((progress / 100) * 34)).padStart(2, '0') : '00'} / 0:{audio.duration_sec || 34}
        </div>
      </div>

      {/* Bilingual Transcript */}
      <div className="space-y-3">
        {/* Vernacular Script */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Globe className="w-3 h-3" />
            <span>Vernacular Audio Transcription (Original Speech)</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            "{audio.transcript_hindi}"
          </p>
        </div>

        {/* English Certified Translation */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">
            <Globe className="w-3 h-3" />
            <span>AI English Translation</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "{audio.transcript_english}"
          </p>
        </div>
      </div>

      {/* Extracted Key Verbal Claims */}
      {audio.extracted_claims && Object.keys(audio.extracted_claims).length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Verbal Claims Extracted by SpeechAgent:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(audio.extracted_claims).map(([k, v]) => (
              <span key={k} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                <span className="text-slate-400">{k}:</span> <strong className="text-white">{v}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
