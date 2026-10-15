import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Scan, Eye, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function DocumentViewer({ claim }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  const doc = claim.document_meta || {};
  const applicant = claim.applicant || {};
  const isAadhaar = doc.document_type?.toLowerCase().includes('aadhaar');
  const isVoter = doc.document_type?.toLowerCase().includes('voter');

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
      
      {/* Header bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scan className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Uploaded Document Inspection
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono border border-blue-500/20">
            {doc.document_type || 'Synthetic Government ID'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center space-x-1 transition-all ${
              showBoundingBoxes
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle OCR visual extraction boxes"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">OCR Boxes</span>
          </button>

          <button 
            type="button" 
            onClick={handleZoomOut} 
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-slate-400 w-9 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button 
            type="button" 
            onClick={handleZoomIn} 
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button" 
            onClick={handleResetZoom} 
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Document View Canvas */}
      <div className="relative flex-1 p-6 flex items-center justify-center bg-slate-950/80 overflow-hidden min-h-[360px]">
        
        {/* Synthetic ID Card Container with Zoom */}
        <div 
          className="transition-transform duration-200 ease-out origin-center select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Card Body */}
          <div className="w-[360px] sm:w-[420px] rounded-xl bg-gradient-to-br from-slate-100 via-white to-amber-50 text-slate-900 p-5 shadow-2xl border-2 border-slate-300 relative overflow-hidden">
            
            {/* Top National Emblem & Tri-color Ribbon */}
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-t absolute top-0 left-0"></div>
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs shadow">
                  भारत
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold uppercase text-slate-900 tracking-wider">
                    {isAadhaar ? 'UNIQUE IDENTIFICATION AUTHORITY OF INDIA' : 'ELECTION COMMISSION OF INDIA'}
                  </h4>
                  <p className="text-[9px] text-slate-600 font-medium">
                    {isAadhaar ? 'Mera Aadhaar, Meri Pehchan (Synthetic Sample)' : 'Voter Identity Card (Synthetic Sample)'}
                  </p>
                </div>
              </div>

              <div className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-bold">
                ZERO REAL PII
              </div>
            </div>

            {/* Photo & Details Layout */}
            <div className="flex space-x-4">
              
              {/* Photo box */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-20 h-24 rounded-lg bg-slate-200 border-2 border-slate-400 flex flex-col items-center justify-center overflow-hidden shadow-inner relative">
                  <div className="w-12 h-12 rounded-full bg-slate-400 mb-1 flex items-center justify-center text-slate-200 font-bold text-xl">
                    {applicant.full_name?.charAt(0) || 'D'}
                  </div>
                  <div className="w-16 h-8 bg-slate-300 rounded-t-full"></div>
                  
                  {/* Watermark overlay */}
                  <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center pointer-events-none">
                    <span className="text-[8px] font-bold text-slate-700/60 rotate-45 uppercase">MOCK ID</span>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Sample Photo</span>
              </div>

              {/* Extracted Details with OCR bounding box highlights */}
              <div className="flex-1 space-y-1.5 text-[11px]">
                
                {/* Name row */}
                <div className={`p-1 rounded transition-all ${
                  showBoundingBoxes 
                    ? 'ring-2 ring-orange-500 bg-orange-500/10' 
                    : ''
                }`}>
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Name / नाम:</span>
                  <span className="font-extrabold text-slate-900 text-xs">
                    {applicant.alias_doc || applicant.full_name}
                  </span>
                  {showBoundingBoxes && (
                    <span className="text-[8px] font-mono text-orange-600 block font-semibold">
                      [OCR: Name Mismatch vs Audio]
                    </span>
                  )}
                </div>

                {/* DOB & Gender */}
                <div className="grid grid-cols-2 gap-1">
                  <div className={`p-1 rounded ${showBoundingBoxes ? 'ring-1 ring-emerald-500 bg-emerald-500/10' : ''}`}>
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">DOB / जन्म तिथि:</span>
                    <span className="font-bold text-slate-800">{applicant.dob}</span>
                  </div>
                  <div className={`p-1 rounded ${showBoundingBoxes ? 'ring-1 ring-emerald-500 bg-emerald-500/10' : ''}`}>
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Gender / लिंग:</span>
                    <span className="font-bold text-slate-800">{applicant.gender}</span>
                  </div>
                </div>

                {/* Address */}
                <div className={`p-1 rounded ${showBoundingBoxes ? 'ring-1 ring-blue-500 bg-blue-500/10' : ''}`}>
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Address / पता:</span>
                  <span className="text-[10px] font-medium text-slate-700 line-clamp-2">
                    {applicant.address}
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom Number Bar */}
            <div className={`mt-3 pt-2 border-t border-slate-200 flex items-center justify-between ${
              showBoundingBoxes ? 'ring-2 ring-emerald-500 bg-emerald-500/10 rounded p-1' : ''
            }`}>
              <div>
                <span className="text-[8px] font-bold text-slate-500 uppercase block">
                  {isAadhaar ? 'Aadhaar Number' : 'EPIC Card Number'}
                </span>
                <span className="font-mono font-black text-slate-900 text-sm tracking-widest">
                  {applicant.id_number}
                </span>
              </div>

              {/* Mock QR Code */}
              <div className="w-10 h-10 border border-slate-400 bg-white p-0.5 rounded flex flex-col justify-between shadow-xs">
                <div className="flex justify-between">
                  <div className="w-2.5 h-2.5 bg-slate-900"></div>
                  <div className="w-2.5 h-2.5 bg-slate-900"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-1.5 h-1.5 bg-slate-900"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-2.5 h-2.5 bg-slate-900"></div>
                  <div className="w-2.5 h-2.5 bg-slate-900"></div>
                </div>
              </div>
            </div>

            {/* Synthetic Watermark across card */}
            <div className="absolute right-2 bottom-1 text-[8px] font-mono text-slate-400 font-semibold">
              SYNTHETIC GOVTECH TEST CARD
            </div>

          </div>
        </div>

      </div>

      {/* Metadata Footer */}
      <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vision OCR Confidence: <strong className="text-white">{Math.round((doc.ocr_confidence || 0.96) * 100)}%</strong></span>
        </div>
        <div className="font-mono text-[10px] text-slate-500">
          File: {doc.file_name}
        </div>
      </div>

    </div>
  );
}
