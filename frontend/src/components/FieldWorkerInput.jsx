import React, { useState } from 'react';
import { 
  UploadCloud, 
  Mic, 
  MicOff, 
  FileCheck, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  Compass, 
  User, 
  Check, 
  Info,
  Play,
  Square
} from 'lucide-react';
import { MOCK_PRESETS, SCHEMES } from '../mock/mockData';

export default function FieldWorkerInput({ onStartAnalysis }) {
  const [selectedScheme, setSelectedScheme] = useState('PM-KISAN');
  const [activePreset, setActivePreset] = useState(MOCK_PRESETS[0]);
  
  // File uploads
  const [docFile, setDocFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [docPreviewName, setDocPreviewName] = useState(MOCK_PRESETS[0].document_meta.file_name);
  const [audioPreviewName, setAudioPreviewName] = useState(MOCK_PRESETS[0].audio_meta.file_name);
  
  // Microphone recording simulation state
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);

  // Field metadata
  const [workerId, setWorkerId] = useState('FW-VAR-402');
  const [district, setDistrict] = useState('Varanasi');

  // Handle Preset selection
  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
    setSelectedScheme(preset.scheme_id);
    setDocPreviewName(preset.document_meta.file_name);
    setAudioPreviewName(preset.audio_meta.file_name);
    setWorkerId(preset.field_worker.worker_id);
    setDistrict(preset.field_worker.district);
    setHasRecordedAudio(false);
    setIsRecording(false);
  };

  // Mock mic toggle
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecordedAudio(true);
      setAudioPreviewName(`mic_deposition_${Date.now()}.wav`);
    } else {
      setIsRecording(true);
      setRecordTimer(0);
      const interval = setInterval(() => {
        setRecordTimer(prev => {
          if (prev >= 15) {
            clearInterval(interval);
            setIsRecording(false);
            setHasRecordedAudio(true);
            setAudioPreviewName(`mic_deposition_voice_note.wav`);
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Trigger submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onStartAnalysis({
      schemeId: selectedScheme,
      docFile: docFile,
      audioFile: audioFile,
      preset: activePreset,
      docPreviewName,
      audioPreviewName,
      workerId,
      district
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Intro Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage 1: Field Worker Intake Terminal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          New Welfare Claim Ingestion
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl">
          Upload vernacular voice depositions and physical identity credentials gathered by village-level field workers (VLE / Gram Sevak). JanSeva Agent orchestrates OCR, speech transcription, and statutory eligibility cross-checks.
        </p>
      </div>

      {/* Preset Quick Selectors */}
      <div className="mb-8 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Compass className="w-4 h-4 text-orange-400" />
            <span>1-Click Synthetic Case Presets (Zero Real PII)</span>
          </div>
          <span className="text-[11px] text-slate-500">Select any scenario to evaluate instantly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MOCK_PRESETS.map((preset) => {
            const isSelected = activePreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected 
                    ? 'bg-orange-500/10 border-orange-500/40 ring-1 ring-orange-500/30' 
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">{preset.applicant.full_name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                    {preset.scheme_id}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {preset.preset_name}
                </p>
                <div className="mt-2 flex items-center space-x-2 text-[10px]">
                  {preset.discrepancies.some(d => d.severity === 'WARNING') && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-medium">⚠️ Name Mismatch</span>
                  )}
                  {preset.discrepancies.some(d => d.severity === 'CRITICAL') && (
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-medium">🚨 Income Ceiling</span>
                  )}
                  {preset.discrepancies.every(d => d.severity === 'SUCCESS' || d.severity === 'INFO') && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-medium">✅ Clean Approval</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Welfare Scheme Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCHEMES.map((scheme) => {
            const isSelected = selectedScheme === scheme.id;
            return (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500/50 ring-1 ring-blue-500/30'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{scheme.icon}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-sm mt-2">{scheme.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{scheme.tagline}</p>
                <div className="mt-3 text-[11px] font-medium text-blue-400">
                  {scheme.category}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Panels (Document & Audio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Document Upload (ID Photo) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-white flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-orange-400" />
                <span>Applicant Identity Document</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">JPG / PNG / PDF</span>
            </div>

            <div className="border-2 border-dashed border-slate-700 hover:border-orange-500/50 rounded-xl p-6 text-center transition-all bg-slate-950/50 group cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*,application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setDocFile(e.target.files[0]);
                    setDocPreviewName(e.target.files[0].name);
                  }
                }}
              />
              <UploadCloud className="w-10 h-10 mx-auto text-slate-500 group-hover:text-orange-400 transition-colors" />
              <p className="text-xs font-semibold text-slate-200 mt-2">
                Drop synthetic ID card image here or <span className="text-orange-400">browse</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Aadhaar card, Voter EPIC, Ration card or Land record
              </p>
            </div>

            {/* Selected File Card */}
            <div className="mt-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="w-7 h-7 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-slate-300 truncate">{docPreviewName}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                Ready for OCR
              </span>
            </div>
          </div>

          {/* Audio Upload & Live Recording */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-white flex items-center space-x-2">
                <Mic className="w-4 h-4 text-blue-400" />
                <span>Vernacular Voice Note / Deposition</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">WAV / MP3 / M4A</span>
            </div>

            <div className="border border-slate-700/80 rounded-xl p-4 bg-slate-950/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold text-slate-200">
                    Record applicant verbal testimony
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Transcribed by SpeechAgent with dialect detection
                  </p>
                </div>

                {/* Record Button */}
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all shadow-md ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop ({recordTimer}s)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      <span>{hasRecordedAudio ? 'Re-Record Deposition' : 'Record Voice Note'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Or file upload */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <label className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer flex items-center space-x-1.5">
                  <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
                  <span>Or upload pre-recorded audio file</span>
                  <input 
                    type="file" 
                    accept="audio/*" 
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setAudioFile(e.target.files[0]);
                        setAudioPreviewName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Selected Audio Card */}
            <div className="mt-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="w-7 h-7 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-slate-300 truncate">{audioPreviewName}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                Dialect Ready
              </span>
            </div>
          </div>

        </div>

        {/* Field Worker Metadata */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-medium block mb-1">Field Worker ID</label>
            <input 
              type="text" 
              value={workerId}
              onChange={(e) => setWorkerId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-slate-400 font-medium block mb-1">District / Jurisdiction</label>
            <input 
              type="text" 
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
            />
          </div>
          <div>
            <label className="text-slate-400 font-medium block mb-1">Intake Modality</label>
            <div className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-medium">
              Multimodal (Voice + ID)
            </div>
          </div>
          <div>
            <label className="text-slate-400 font-medium block mb-1">Governance Standard</label>
            <div className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-semibold flex items-center space-x-1">
              <span>●</span>
              <span>Human-in-the-Loop</span>
            </div>
          </div>
        </div>

        {/* Submit & Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-800 gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Clicking Analyze triggers the 3-agent orchestration pipeline. No keys required.</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 flex items-center justify-center space-x-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Analyze Case with JanSeva Multi-Agent</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
