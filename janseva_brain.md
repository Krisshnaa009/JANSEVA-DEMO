# 🧠 JanSeva Agent — Project Brain & Source of Truth

> **System Overview:**
> The **JanSeva Agent** is an AI-powered Multi-Agent Welfare Claim Orchestrator designed for government welfare delivery systems (e.g., Digital India / Citizen Services). It bridges field workers and administrative officers by orchestrating synthetic audio transcription, vision document extraction, policy rule cross-referencing, discrepancy flagging, and human-in-the-loop approval dossiers.

---

## 📁 1. Project Directory & File Structure

```text
janseva2/
├── janseva_brain.md                    # Project tracking, architecture, state & checklist
├── requirements.txt                    # Python backend dependencies (FastAPI, Uvicorn, Pydantic, etc.)
├── run.sh                              # One-command full-stack starter script
├── app.py                              # FastAPI backend gateway & API orchestrator
├── models/
│   ├── __init__.py
│   └── claim_models.py                 # Pydantic schemas (ClaimData, Discrepancy, AgentStatus, Dossier)
├── services/
│   ├── __init__.py
│   ├── agent_orchestrator.py           # Multi-agent pipeline manager (Speech -> Doc -> Policy -> Dossier)
│   ├── audio_agent.py                  # Vernacular speech transcription & intent extraction
│   ├── document_agent.py               # OCR & synthetic ID card visual extraction
│   ├── policy_agent.py                 # Scheme rule engine & discrepancy detection
│   └── dossier_agent.py                # Official verified application dossier generation
├── data/
│   ├── mock_claims.json                # Synthetic claim presets (Zero Real PII)
│   └── welfare_policies.json           # Welfare scheme eligibility criteria & thresholds
└── frontend/
    ├── package.json                    # Frontend dependencies (React, Vite, TailwindCSS, Lucide, jsPDF)
    ├── vite.config.js                  # Vite configuration with proxy to FastAPI backend
    ├── tailwind.config.js              # Custom GovTech design tokens (navy, saffron, emerald, slate)
    ├── postcss.config.js
    ├── index.html                      # Entry HTML with modern typography & meta tags
    └── src/
        ├── main.jsx                    # React root entry
        ├── App.jsx                     # State-based view orchestrator (Field Input -> Loading -> Dashboard -> Success)
        ├── index.css                   # Tailwind directives & GovTech theme utility classes
        ├── components/
        │   ├── Header.jsx              # Official portal header with national emblem & security badge
        │   ├── FieldWorkerInput.jsx    # View 1: Audio/doc upload, mic recorder, scheme selection & presets
        │   ├── AnalysisLoadingView.jsx # Transition State: Dynamic multi-agent step progress & status cycling
        │   ├── AdminDashboard.jsx      # View 2: Split-screen (ID doc preview vs extracted data & discrepancy flags)
        │   ├── DocumentViewer.jsx      # Document preview with zoom, detected fields overlay
        │   ├── DiscrepancyBadge.jsx    # Visual alerts for mismatches, eligibility warnings & policy notes
        │   ├── AudioTranscriptView.jsx # Audio player simulator with vernacular transcript and highlighted claims
        │   ├── ApprovalGateModal.jsx   # Human-in-the-loop confirmation modal with officer signature/stamp
        │   └── SuccessDossierView.jsx  # View 3: Verified application success screen with PDF download
        ├── mock/
        │   └── mockData.js             # Synthetic mock claims, ID images, audio wave mock & schemes
        └── utils/
            ├── api.js                  # API client with fallback to mock data (crash-proof)
            └── pdfGenerator.js         # Client-side official PDF dossier generator (jsPDF)
```

---

## 🎯 2. Progress Tracker & Milestones

### Phase 1: Planning, Scaffolding & Architecture
- [x] Initial workspace analysis and environment check
- [x] Create `janseva_brain.md` project memory and source of truth
- [x] Initialize Python backend architecture (`requirements.txt`, `models/`, `services/`, `data/`, `app.py`)
- [x] Initialize Frontend with Vite + React + Tailwind CSS + Lucide Icons + jsPDF

### Phase 2: Synthetic Mock Data & Core Engine (Zero Real PII)
- [x] Create synthetic claim records (e.g., "Ramesh Dummy", fake ID "1234-FAKE-5678", synthetic ID card cards)
- [x] Implement Multi-Agent mock orchestrator:
  - `AudioAgent`: Vernacular Hindi/Bhojpuri audio transcript + extracted verbal claims
  - `DocumentAgent`: Vision OCR extraction for mock Aadhaar/Voter/Ration ID cards
  - `PolicyAgent`: Cross-referencing engine flagging discrepancies (name spelling mismatch, income threshold)
  - `DossierAgent`: Official government dossier summary with cryptographic hash & QR verification
- [x] Build FastAPI endpoints with crash-proof `try/except` fallbacks

### Phase 3: UI/UX & State-Based Workflow
- [x] Design System: Trustworthy GovTech portal palette (India Gov Blue, Ashoka Chakra Navy, Saffron, Emerald)
- [x] **View 1: Field Worker Input**
  - Document upload (drag & drop / file picker / camera simulator)
  - Audio voice note upload & in-browser microphone recorder
  - 1-Click "Load Mock Presets" (e.g. Preset A: Name Mismatch, Preset B: Income Exceeded, Preset C: Clean Approval)
  - Metadata selector (District, Scheme, Worker ID)
- [x] **Transition State: Dynamic Multi-Agent Visualizer**
  - Animated spinner and progress indicator
  - Cycling status text:
    1. *"Agent transcribing vernacular audio..."*
    2. *"Agent extracting document data..."*
    3. *"Agent cross-referencing policies..."*
  - Live agent status cards with progress pulses
- [x] **View 2: Admin Dashboard (Split-Screen)**
  - Left Side: Mock ID document inspection with zoom & visual bounding boxes
  - Right Side: AI-extracted structured JSON/data card (Name, DOB, Income, Address, Scheme)
  - Highly visible "Discrepancy Flags" banner & audit checklist
  - Synced Audio transcription player
  - **The Approval Gate (Mandatory Human-in-the-Loop)**: Prominent "Approve & Finalize" button
- [x] **View 3: Success & Verified Dossier**
  - Official approval certificate with verification stamp, officer badge, timestamp, SHA-256 hash
  - "Download Verified Application (PDF)" action
  - Action to process new claim / review claim queue

### Phase 4: PDF Generation & Client Crash-Proofing
- [x] Implement client-side PDF dossier generator (`jsPDF`) with official layout, emblem, tables, and verification seal
- [x] Complete end-to-end testing with mock data ensuring zero crashes
- [x] Live automated browser subagent verification completed (recorded session `janseva_e2e_flow`)
- [ ] Ready for live API integration (all AI hooks wrapped in try/except, awaiting user API key at the end)

---

## 🔒 3. Compliance & Constraint Guardrails

1. **Zero Real PII**: Purely synthetic names, dummy ID numbers, fictitious addresses.
2. **Human-in-the-Loop Gate**: System strictly presents data and discrepancies; approval strictly requires administrative human action. No auto-approval text.
3. **Crash-Proof Resilience**: All API calls and AI pipelines protected by fallback handlers returning valid synthetic responses.
4. **No API Blockers**: App is 100% functional immediately without requiring external keys.
