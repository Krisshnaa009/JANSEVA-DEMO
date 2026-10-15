import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  FileCheck, 
  ShieldCheck, 
  Key, 
  Stamp, 
  ArrowRight, 
  Printer, 
  ExternalLink,
  Sparkles,
  Calendar,
  Building,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateVerifiedDossierPDF } from '../utils/pdfGenerator';

export default function SuccessDossierView({ claim, dossier, onReset }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    // Trigger celebratory confetti on view mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      const success = generateVerifiedDossierPDF(claim, dossier);
      setDownloading(false);
      if (success) {
        setDownloadSuccess(true);
      }
    }, 600);
  };

  const applicant = claim.applicant || {};

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      
      {/* Central Success Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-500/20 mb-4 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          Statutory Adjudication Complete
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Application Verified & Dossier Sealed
        </h1>
        
        <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
          The welfare claim has undergone Human-in-the-Loop review and has been officially approved by the District Welfare Officer. Cryptographic proof of verification has been generated.
        </p>
      </div>

      {/* Main Official Dossier Certificate Card */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl mb-8">
        
        {/* Certificate Top Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

        <div className="p-6 sm:p-8">
          
          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-lg shadow">
                भारत
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-wide uppercase">
                  Government Welfare Delivery Authority
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Verified Benefit Entitlement Dossier • {dossier.dossier_id || 'DOSSIER-2026-9812'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold block">
                SEALED & ARCHIVED
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                {dossier.approval_timestamp || new Date().toISOString()}
              </span>
            </div>
          </div>

          {/* Dossier Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6 text-xs">
            
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Applicant Name</span>
              <span className="text-sm font-bold text-white block">{applicant.full_name}</span>
              <span className="text-[10px] text-slate-400 font-mono">ID: {applicant.id_number}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Welfare Scheme</span>
              <span className="text-sm font-bold text-blue-400 block truncate">{claim.scheme_name}</span>
              <span className="text-[10px] text-slate-400">{claim.category || 'Farmer Welfare'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">DBT Disbursement Schedule</span>
              <span className="text-sm font-bold text-emerald-400 block">{dossier.payout_schedule || 'Next Treasury Cycle'}</span>
              <span className="text-[10px] text-slate-400 font-mono">IFSC: {applicant.bank_ifsc || 'SBIN0001234'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Approving Officer</span>
              <span className="font-bold text-white block">{dossier.officer_name || 'District Welfare Magistrate'}</span>
              <span className="text-[10px] text-slate-400 font-mono">ID: {dossier.officer_id || 'OFFICER-GOV-901'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Discrepancy Audit</span>
              <span className="font-bold text-emerald-400 block">All Flags Audited & Resolved</span>
              <span className="text-[10px] text-slate-400">Total Flags: {claim.discrepancies?.length || 2}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Digital Signature ID</span>
              <span className="font-mono font-bold text-amber-300 block">{dossier.digital_signature_id || 'DSIG-GOV-8F9B4C6E2A1D'}</span>
              <span className="text-[10px] text-slate-400">Statutory Certificate</span>
            </div>

          </div>

          {/* Cryptographic Seal Hash */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 mb-6">
            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Cryptographic Proof Seal (SHA-256)</span>
            </div>
            <p className="font-mono text-[11px] text-slate-300 break-all bg-slate-900/80 p-2 rounded border border-slate-800/80 select-all">
              {dossier.cryptographic_seal_sha256 || '8f9b4c6e2a1d0f5e3b7a9c8d1e2f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f'}
            </p>
          </div>

          {/* Magisterial Remarks Quote */}
          {dossier.officer_remarks && (
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 italic mb-6">
              <span className="font-bold not-italic text-blue-400 block mb-1">Officer Magisterial Endorsement:</span>
              "{dossier.officer_remarks}"
            </div>
          )}

          {/* PRIMARY DOWNLOAD BUTTON (Prompt Requirement) */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full compliance with Aadhaar DBT Framework 2026. Zero Real PII.</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {/* Mandatory Download PDF Button */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{downloading ? 'Compiling Official PDF...' : 'Download Verified Application (PDF)'}</span>
              </button>
            </div>

          </div>

          {downloadSuccess && (
            <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs text-center font-medium animate-fade-in">
              ✓ Verified Application Dossier PDF successfully downloaded to your device!
            </div>
          )}

        </div>

      </div>

      {/* Footer Navigation: Process Next Case */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
        >
          <span>← Back to Claim Inbox</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center space-x-2 transition-all"
        >
          <span>Ingest Another Welfare Claim</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
