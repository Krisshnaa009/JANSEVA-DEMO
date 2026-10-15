import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X, AlertTriangle, Key, Stamp } from 'lucide-react';

export default function ApprovalGateModal({ isOpen, onClose, onConfirm, claim }) {
  if (!isOpen) return null;

  const [officerId, setOfficerId] = useState('OFFICER-GOV-901');
  const [officerName, setOfficerName] = useState('Dr. S. K. Awasthi, IAS (District Magistrate)');
  const [remarks, setRemarks] = useState('Audited vernacular audio testimony and verified synthetic identity credentials. Approved for DBT benefit disbursement.');
  const [auditAcknowledged, setAuditAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasWarnings = claim.discrepancies?.some(d => d.severity === 'WARNING' || d.severity === 'CRITICAL');

  const handleApprove = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onConfirm({
      officerId,
      officerName,
      remarks,
      overrideFlags: true
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Stamp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Human-in-the-Loop Statutory Sign-Off
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Mandatory Administrative Verification • Claim ID: {claim.id}
            </p>
          </div>
        </div>

        {/* Compliance Warning Box */}
        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 mb-4 flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            By proceeding, you certify that as an authorized government administrative officer, you have reviewed all automated AI flags, cross-referenced vernacular audio, and verified synthetic credentials before authorizing public fund disbursal.
          </p>
        </div>

        {/* Warnings checklist if any */}
        {hasWarnings && (
          <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
            <div className="flex items-center space-x-2 font-bold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Discrepancy Flags Pending Officer Review:</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-amber-200/90">
              {claim.discrepancies.filter(d => d.severity === 'WARNING' || d.severity === 'CRITICAL').map(d => (
                <li key={d.id}>{d.title}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleApprove} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Officer Government ID</label>
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Officer Name & Title</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-slate-300 font-medium block mb-1">Magisterial Endorsement & Remarks</label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white resize-none"
            />
          </div>

          {/* Mandatory Checkbox */}
          <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-300 select-none">
            <input
              type="checkbox"
              checked={auditAcknowledged}
              onChange={(e) => setAuditAcknowledged(e.target.checked)}
              required
              className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
            />
            <span>
              I formally approve this claim under statutory welfare rules and authorize the generation of the cryptographically sealed verified application dossier.
            </span>
          </label>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel & Return
            </button>

            <button
              type="submit"
              disabled={!auditAcknowledged || isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Sealing Dossier...' : 'Approve & Digitally Seal Dossier'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
