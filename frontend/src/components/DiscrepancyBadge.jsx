import React from 'react';
import { AlertTriangle, AlertOctagon, CheckCircle2, Info, ArrowRight, ShieldAlert } from 'lucide-react';

export default function DiscrepancyBadge({ discrepancies = [] }) {
  if (!discrepancies || discrepancies.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center space-x-3">
        <CheckCircle2 className="w-5 h-5 shrink-0" />
        <span className="text-xs font-semibold">No discrepancy flags detected. All sources concordant.</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {discrepancies.map((disc) => {
        const isCritical = disc.severity === 'CRITICAL';
        const isWarning = disc.severity === 'WARNING';
        const isSuccess = disc.severity === 'SUCCESS';

        const borderClass = isCritical 
          ? 'border-rose-500/50 bg-rose-950/20 shadow-lg shadow-rose-950/20 ring-1 ring-rose-500/30' 
          : isWarning
            ? 'border-amber-500/50 bg-amber-950/20 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/30'
            : isSuccess
              ? 'border-emerald-500/30 bg-emerald-950/15'
              : 'border-blue-500/30 bg-blue-950/15';

        const titleColor = isCritical 
          ? 'text-rose-400' 
          : isWarning
            ? 'text-amber-400'
            : isSuccess
              ? 'text-emerald-400'
              : 'text-blue-400';

        const Icon = isCritical 
          ? AlertOctagon 
          : isWarning 
            ? AlertTriangle 
            : isSuccess 
              ? CheckCircle2 
              : Info;

        return (
          <div key={disc.id} className={`p-4 rounded-xl border transition-all ${borderClass}`}>
            
            {/* Header: Badge & Confidence */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon className={`w-4 h-4 shrink-0 ${titleColor}`} />
                <span className={`text-xs font-extrabold uppercase tracking-wider ${titleColor}`}>
                  {disc.severity === 'WARNING' ? '⚠️ Discrepancy Warning' : disc.severity === 'CRITICAL' ? '🚨 Critical Policy Violation' : 'Verification Check'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  Confidence: {disc.confidence_score}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h4 className="text-sm font-bold text-white mb-1">
              {disc.title}
            </h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {disc.description}
            </p>

            {/* Comparison Pill (Audio vs Document) */}
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mb-2.5">
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span className="text-[10px] font-bold text-blue-400 block uppercase">Source A (Vernacular Audio)</span>
                <span className="text-slate-200 font-medium">{disc.source_a}</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span className="text-[10px] font-bold text-amber-400 block uppercase">Source B (ID / Policy Rule)</span>
                <span className="text-slate-200 font-medium">{disc.source_b}</span>
              </div>
            </div>

            {/* Action Required Recommendation for Human */}
            <div className="flex items-start space-x-2 text-[11px] text-slate-400 bg-slate-900/50 p-2 rounded">
              <span className="font-bold text-slate-300 shrink-0">Required Action:</span>
              <span className="text-slate-300">{disc.action_required}</span>
            </div>

          </div>
        );
      })}
    </div>
  );
}
