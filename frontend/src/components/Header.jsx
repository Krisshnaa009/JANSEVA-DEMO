import React from 'react';
import { ShieldCheck, UserCheck, Layers, FileText, CheckCircle2 } from 'lucide-react';

export default function Header({ currentView, onNavigate }) {
  const steps = [
    { id: 'FIELD_INPUT', label: '1. Field Intake', icon: FileText },
    { id: 'ANALYZING', label: '2. Multi-Agent Engine', icon: Layers },
    { id: 'ADMIN_DASHBOARD', label: '3. Admin Review & Gate', icon: UserCheck },
    { id: 'SUCCESS_DOSSIER', label: '4. Verified Dossier', icon: CheckCircle2 }
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('FIELD_INPUT')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-600 to-blue-700 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold text-xl">
              <span>जन</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white">JanSeva<span className="text-orange-500">Agent</span></span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  GovTech 2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Multi-Agent Welfare Claim Orchestrator • Citizen Welfare Delivery
              </p>
            </div>
          </div>

          {/* Stepper indicator */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentView === step.id;
              const isPast = steps.findIndex(s => s.id === currentView) > idx;

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30 font-semibold' 
                      : isPast
                        ? 'text-emerald-400 hover:text-emerald-300'
                        : 'text-slate-500'
                  }`}>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400 animate-pulse' : isPast ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{step.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-slate-700 mx-1">›</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Compliance & Safety Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium" title="Mandatory Human Approval Enforced">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Human-in-the-Loop</span>
            </div>
            
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium" title="Zero Real PII — Pure Synthetic Sandbox">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="font-mono text-[11px]">Synthetic PII Safe</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
