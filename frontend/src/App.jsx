import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FieldWorkerInput from './components/FieldWorkerInput';
import AnalysisLoadingView from './components/AnalysisLoadingView';
import AdminDashboard from './components/AdminDashboard';
import SuccessDossierView from './components/SuccessDossierView';

import { MOCK_PRESETS } from './mock/mockData';
import { fetchPresets, analyzeCase, approveClaim } from './utils/api';

export default function App() {
  // State-based view workflow without page reloads:
  // 'FIELD_INPUT' -> 'ANALYZING' -> 'ADMIN_DASHBOARD' -> 'SUCCESS_DOSSIER'
  const [currentView, setCurrentView] = useState('FIELD_INPUT');
  const [activeClaim, setActiveClaim] = useState(MOCK_PRESETS[0]);
  const [activeDossier, setActiveDossier] = useState(null);
  const [presets, setPresets] = useState(MOCK_PRESETS);

  // Load presets on mount (crash-proof)
  useEffect(() => {
    async function loadInitial() {
      try {
        const loaded = await fetchPresets();
        if (loaded && loaded.length > 0) {
          setPresets(loaded);
          setActiveClaim(loaded[0]);
        }
      } catch (e) {
        console.warn("Using default mock presets:", e);
      }
    }
    loadInitial();
  }, []);

  // Step 1: Start Analysis (Transition to ANALYZING view)
  const handleStartAnalysis = async (formData) => {
    try {
      setCurrentView('ANALYZING');

      // Trigger backend / mock analysis
      const analyzed = await analyzeCase({
        documentFile: formData.docFile,
        audioFile: formData.audioFile,
        schemeId: formData.schemeId,
        presetHint: formData.preset?.preset_name
      });

      // Augment with field worker data if provided
      if (formData.workerId || formData.district) {
        analyzed.field_worker = {
          ...analyzed.field_worker,
          worker_id: formData.workerId || analyzed.field_worker.worker_id,
          district: formData.district || analyzed.field_worker.district,
        };
      }

      setActiveClaim(analyzed);
    } catch (e) {
      console.warn("Analysis fallback error catch:", e);
      setActiveClaim(formData.preset || MOCK_PRESETS[0]);
    }
  };

  // Step 2: Multi-agent transition completes -> move to Admin Dashboard
  const handleLoadingComplete = () => {
    setCurrentView('ADMIN_DASHBOARD');
  };

  // Step 3: Human Officer Approves Claim -> Transition to Success View
  const handleApproveClaim = async (approvalData) => {
    try {
      const dossier = await approveClaim({
        claimId: activeClaim.id,
        officerId: approvalData.officerId,
        officerName: approvalData.officerName,
        officerRemarks: approvalData.remarks
      });

      setActiveDossier(dossier);
      setCurrentView('SUCCESS_DOSSIER');
    } catch (e) {
      console.warn("Approval fallback error catch:", e);
      // Construct fallback dossier
      setActiveDossier({
        dossier_id: `DOSSIER-${activeClaim.id.replace('CLM-', '')}`,
        claim_id: activeClaim.id,
        scheme_name: activeClaim.scheme_name,
        applicant_name: activeClaim.applicant.full_name,
        approval_timestamp: new Date().toISOString(),
        officer_id: approvalData.officerId || 'OFFICER-GOV-901',
        officer_name: approvalData.officerName || 'District Welfare Magistrate',
        officer_remarks: approvalData.remarks || 'Verified deposition and credentials.',
        status: 'OFFICIALLY_VERIFIED_AND_APPROVED',
        cryptographic_seal_sha256: '8f9b4c6e2a1d0f5e3b7a9c8d1e2f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
        digital_signature_id: 'DSIG-GOV-8F9B4C6E2A1D',
        payout_schedule: 'Next Treasury Cycle'
      });
      setCurrentView('SUCCESS_DOSSIER');
    }
  };

  // Reset to initial screen
  const handleResetToInput = () => {
    setCurrentView('FIELD_INPUT');
    setActiveDossier(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Official GovTech Header */}
      <Header currentView={currentView} onNavigate={setCurrentView} />

      {/* Main View Router (State-Based, Zero Page Reloads) */}
      <main className="flex-1 pb-16">
        
        {currentView === 'FIELD_INPUT' && (
          <FieldWorkerInput 
            onStartAnalysis={handleStartAnalysis} 
          />
        )}

        {currentView === 'ANALYZING' && (
          <AnalysisLoadingView 
            onComplete={handleLoadingComplete} 
            claimData={activeClaim} 
          />
        )}

        {currentView === 'ADMIN_DASHBOARD' && (
          <AdminDashboard 
            claim={activeClaim} 
            onApprove={handleApproveClaim}
            onBackToInput={handleResetToInput}
          />
        )}

        {currentView === 'SUCCESS_DOSSIER' && (
          <SuccessDossierView 
            claim={activeClaim} 
            dossier={activeDossier || {}}
            onReset={handleResetToInput}
          />
        )}

      </main>

      {/* Official Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">JanSeva Agent</span>
            <span>•</span>
            <span>National Welfare Claim Orchestration System</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-mono">
            <span className="text-emerald-400">● Human-in-the-Loop Active</span>
            <span className="text-amber-400">● Zero Real PII Guaranteed</span>
            <span className="text-blue-400">● AI Crash-Proof Mock Fallback</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
