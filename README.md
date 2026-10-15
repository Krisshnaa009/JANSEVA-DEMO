# 🇮🇳 JanSeva Agent — Multi-Agent Welfare Claim Orchestrator

> **GovTech 2.0 • Citizen Welfare Delivery System**  
> An AI-orchestrated welfare claim adjudication platform designed for government welfare delivery systems (e.g., Digital India). It bridges rural village-level field workers and district welfare magistrates through multi-agent vernacular audio transcription, vision document OCR, policy cross-referencing, discrepancy flagging, and human-in-the-loop magisterial approval dossiers.

---

## 🌟 Key Highlights

- **Multi-Agent Orchestration**:
  - `SpeechRecognitionAgent`: Transcribes vernacular audio depositions (Bhojpuri/Hindi/Chhattisgarhi) and extracts applicant verbal claims.
  - `DocumentExtractionAgent`: Vision OCR isolating synthetic ID credentials (Aadhaar / Voter ID).
  - `PolicyCrossReferencingAgent`: Cross-audits spoken claims against visual ID data and welfare policy rules, flagging discrepancies (e.g. name spelling mismatches, income caps).
  - `DossierAgent`: Generates tamper-evident verified application dossiers with SHA-256 cryptographic proofs and digital signatures.
- **Strict Human-in-the-Loop Gate**: AI strictly assists and flags; final approval and fund disbursement **strictly requires authorized administrative officer sign-off**.
- **Zero Real PII Sandbox**: Fully compliant with privacy regulations using synthetic test records (*Ramesh Dummy*, *Sunita Devi Dummy*, *Harish Kumar Dummy*).
- **Client-Side PDF Generation**: Generates and downloads official multi-page Government of India format verification dossiers (`jsPDF`).
- **Crash-Proof Design**: All AI and backend routes have seamless fallback handlers ensuring zero crashes during live demos.

---

## 📁 Repository Structure

```text
janseva2/
├── app.py                     # FastAPI backend gateway & API orchestrator
├── run.sh                     # One-click startup script
├── requirements.txt           # Python backend dependencies
├── janseva_brain.md           # Project tracking & architecture source of truth
├── models/
│   └── claim_models.py        # Pydantic schemas (ClaimCase, Discrepancy, Dossier)
├── services/
│   ├── agent_orchestrator.py  # Multi-agent pipeline coordinator
│   ├── audio_agent.py         # Vernacular speech transcription & intent engine
│   ├── document_agent.py      # Vision OCR & synthetic ID processing
│   ├── policy_agent.py        # Statutory rules & discrepancy detector
│   └── dossier_agent.py       # Verified dossier compiler & SHA-256 sealer
├── data/
│   ├── mock_claims.json       # Synthetic claim datasets (Zero Real PII)
│   └── welfare_policies.json  # Welfare scheme eligibility criteria
└── frontend/
    ├── package.json           # React, Vite, TailwindCSS, Lucide, jsPDF
    ├── vite.config.js         # Vite configuration with API proxy
    ├── tailwind.config.js     # Custom GovTech theme tokens
    └── src/
        ├── App.jsx            # State-based view router (Zero page reloads)
        ├── components/
        │   ├── Header.jsx             # GovTech header with compliance badges
        │   ├── FieldWorkerInput.jsx   # View 1: Audio/doc upload, mic recorder & presets
        │   ├── AnalysisLoadingView.jsx# Transition: Cycling dynamic multi-agent status
        │   ├── AdminDashboard.jsx     # View 2: Split-screen ID viewer & discrepancy flags
        │   ├── DocumentViewer.jsx     # Synthetic ID viewer with OCR bounding boxes
        │   ├── DiscrepancyBadge.jsx   # Warning & mismatch visual alerts
        │   ├── AudioTranscriptView.jsx# Audio waveform player & bilingual transcripts
        │   ├── ApprovalGateModal.jsx  # Mandatory Human-in-the-Loop sign-off modal
        │   └── SuccessDossierView.jsx # View 3: Verified certificate & PDF downloader
        ├── mock/
        │   └── mockData.js            # Synthetic presets & welfare schemes
        └── utils/
            ├── api.js                 # Crash-proof API client
            └── pdfGenerator.js        # Client-side official PDF generator
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### One-Command Launch
```bash
chmod +x run.sh
./run.sh
```

### Manual Setup

1. **Backend (FastAPI)**:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

2. **Frontend (React + Vite)**:
```bash
cd frontend
npm install
npm run build   # FastAPI serves the production build directly on port 8000
# OR for hot-reload dev server:
npm run dev     # Runs on http://localhost:5173 with proxy to backend
```

Open your browser at **`http://localhost:8000`**.

---

## 📋 Evaluation Scenarios (1-Click Demo Presets)

1. **Preset 1 (PM-KISAN - Farmer Welfare)**: *Ramesh Dummy* — Detects a name spelling mismatch between audio testimony (`Ramesh Chand Dummy`) and ID card (`Ramesh C Dummy`).
2. **Preset 2 (PMAY-G - Rural Housing)**: *Sunita Devi Dummy* — Flags income ceiling violation (`₹1,45,000/yr` exceeding the `₹1,20,000` BPL limit).
3. **Preset 3 (NSAP - Old Age Pension)**: *Harish Kumar Dummy* — Clean statutory match ready for immediate officer sign-off.

---

## ⚖️ Compliance & Privacy
- **Aadhaar Privacy Guidelines**: No real citizen PII is collected, stored, or processed.
- **Explainable AI**: Every discrepancy highlights the exact conflicting sources and statutory policy reference.
- **Human-in-the-Loop Mandate**: AI provides decision-support; administrative officers hold ultimate approval authority.
