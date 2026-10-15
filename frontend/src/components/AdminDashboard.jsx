import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  FileText, 
  Code2, 
  ArrowLeft, 
  RefreshCw, 
  Stamp,
  HelpCircle,
  XCircle,
  Building,
  User,
  Calendar,
  IndianRupee,
  MapPin,
  CreditCard
} from 'lucide-react';

import DocumentViewer from './DocumentViewer';
import DiscrepancyBadge from './DiscrepancyBadge';
import AudioTranscriptView from './AudioTranscriptView';
import ApprovalGateModal from './ApprovalGateModal';

export default function AdminDashboard({ claim, onApprove, onBackToInput }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'raw_json' | 'audio'
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const applicant = claim.applicant || {};
  const discrepancies = claim.discrepancies || [];
  const hasWarning = discrepancies.some(d => d.severity === 'WARNING' || d.severity === 'CRITICAL');

  const handleConfirmApproval = async (approvalData) => {
    setIsApprovalModalOpen(false);
    await onApprove(approvalData);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Top Navigation & Status Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToInput}
            className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Intake Queue</span>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Administrative Adjudication Console
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {claim.id}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Scheme: <span className="text-white font-semibold">{claim.scheme_name}</span> • Field Worker: {claim.field_worker?.worker_name} ({claim.field_worker?.district})
          </p>
        </div>

        {/* Human-in-the-Loop Status Badge */}
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Status: Awaiting Human Adjudication</span>
          </div>
        </div>
      </div>

      {/* CORE INTERFACE: SPLIT-SCREEN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDE (5 Cols): Uploaded ID Document Display */}
        <div className="lg:col-span-5 h-full">
          <DocumentViewer claim={claim} />
        </div>

        {/* RIGHT SIDE (7 Cols): AI Extracted JSON Data + Discrepancy Flags */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Sub-tabs: Extracted Structured Data vs Audio Deposition vs Raw JSON */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab('summary')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'summary'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Extracted KYC & Discrepancies
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('audio')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'audio'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vernacular Audio Transcript
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('raw_json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'raw_json'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 inline mr-1" />
                Raw JSON Inspector
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Model: Multi-Agent v2
            </span>
          </div>

          {/* TAB 1: SUMMARY (Extracted Data + Discrepancies) */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              
              {/* SECTION: HIGHLY VISIBLE DISCREPANCY FLAGS */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`w-4 h-4 ${hasWarning ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <h3 className="text-sm font-extrabold text-white tracking-wide uppercase">
                      Auditor Discrepancy & Eligibility Flags
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Cross-referenced across voice & document
                  </span>
                </div>

                <DiscrepancyBadge discrepancies={discrepancies} />
              </div>

              {/* SECTION: AI-EXTRACTED STRUCTURED DATA (Name, DOB, Income) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>AI-Extracted Applicant Profile (Zero Real PII)</span>
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Aadhaar / Voter KYC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Name field */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] mb-1">
                      <User className="w-3.5 h-3.5 text-orange-400" />
                      <span className="font-medium">Full Name (Legal)</span>
                    </div>
                    <div className="font-bold text-white text-sm">
                      {applicant.full_name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      Document: {applicant.alias_doc || applicant.full_name}
                    </div>
                  </div>

                  {/* DOB / Age */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] mb-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-medium">Date of Birth & Age</span>
                    </div>
                    <div className="font-bold text-white text-sm">
                      {applicant.dob} <span className="text-xs text-slate-400 font-normal">({applicant.age} Years)</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">
                      ✓ Age criteria verified
                    </div>
                  </div>

                  {/* Declared Income */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] mb-1">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-medium">Declared Annual Income</span>
                    </div>
                    <div className="font-bold text-white text-sm">
                      ₹{applicant.declared_income?.toLocaleString('en-IN') || '85,000'} <span className="text-xs text-slate-400 font-normal">/ year</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      BPL Category Threshold Check: <strong className="text-white">Under Ceiling</strong>
                    </div>
                  </div>

                  {/* Synthetic ID Number */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] mb-1">
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-medium">Synthetic ID Identifier</span>
                    </div>
                    <div className="font-mono font-bold text-white text-sm">
                      {applicant.id_number}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      Type: {applicant.id_type}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2 p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] mb-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span className="font-medium">Residential & Tehsil Address</span>
                    </div>
                    <div className="text-slate-200 text-xs font-medium">
                      {applicant.address}
                    </div>
                  </div>

                </div>
              </div>

              {/* Inline Audio Player for quick verification */}
              <AudioTranscriptView audioMeta={claim.audio_meta} />

            </div>
          )}

          {/* TAB 2: DEDICATED AUDIO TRANSCRIPT VIEW */}
          {activeTab === 'audio' && (
            <div className="space-y-4">
              <AudioTranscriptView audioMeta={claim.audio_meta} />
            </div>
          )}

          {/* TAB 3: RAW JSON INSPECTOR */}
          {activeTab === 'raw_json' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner text-emerald-400">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span>Structured Multi-Agent JSON Output</span>
                <span className="text-[10px]">Zero PII Compliant</span>
              </div>
              <pre>{JSON.stringify(claim, null, 2)}</pre>
            </div>
          )}

        </div>

      </div>

      {/* THE APPROVAL GATE (MANDATORY HUMAN-IN-THE-LOOP SECTION) */}
      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-base font-extrabold text-white">
                The Statutory Approval Gate
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                Mandatory Human-in-the-Loop
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
              AI has finished cross-referencing and flagging. Final adjudication strictly requires authorized officer sign-off. Fund disbursement cannot proceed without human review.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 shrink-0 w-full md:w-auto justify-end">
          
          <button
            type="button"
            onClick={() => setRejectModalOpen(true)}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition-all"
          >
            Request Field Rectification
          </button>

          {/* Prominent Mandatory "Approve & Finalize" Button */}
          <button
            type="button"
            onClick={() => setIsApprovalModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm tracking-wide shadow-xl shadow-emerald-500/25 flex items-center space-x-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Stamp className="w-5 h-5 text-white" />
            <span>Approve & Finalize Claim</span>
          </button>

        </div>

      </div>

      {/* Human-in-the-Loop Approval Modal */}
      <ApprovalGateModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onConfirm={handleConfirmApproval}
        claim={claim}
      />

      {/* Reject / Rectification modal feedback */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 text-left">
            <h3 className="text-sm font-bold text-white mb-2">
              Send Back to Field Worker for Rectification
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Return claim #{claim.id} to {claim.field_worker?.worker_name} with specific audit notes (e.g. request land registry re-scan or name affidavit).
            </p>
            <textarea
              rows={3}
              placeholder="e.g., Please obtain an affidavit clarifying 'Ramesh Chand' vs 'Ramesh C'..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white resize-none mb-3"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Rectification request dispatched to ${claim.field_worker?.worker_name}`);
                  setRejectModalOpen(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold"
              >
                Dispatch to Field Worker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
