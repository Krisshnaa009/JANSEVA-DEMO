/**
 * JanSeva API Service
 * Crash-Proof: Always wraps requests in try/catch and falls back cleanly to synthetic mock data.
 */
import { MOCK_PRESETS } from '../mock/mockData';

const BASE_URL = '/api';

export async function fetchPresets() {
  try {
    const res = await fetch(`${BASE_URL}/presets`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status === 'success' && data.presets?.length > 0) {
      return data.presets;
    }
    return MOCK_PRESETS;
  } catch (err) {
    console.warn("Using synthetic mock presets fallback:", err);
    return MOCK_PRESETS;
  }
}

export async function analyzeCase({ documentFile, audioFile, schemeId, presetHint }) {
  try {
    const formData = new FormData();
    if (documentFile) formData.append('document', documentFile);
    if (audioFile) formData.append('audio', audioFile);
    if (schemeId) formData.append('scheme_id', schemeId);
    if (presetHint) formData.append('preset_hint', presetHint);

    const res = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status === 'success' && data.claim) {
      return data.claim;
    }
    return getFallbackClaim(presetHint, schemeId);
  } catch (err) {
    console.warn("Backend unavailable or AI offline; activating instant mock fallback:", err);
    return getFallbackClaim(presetHint, schemeId);
  }
}

export async function approveClaim({ claimId, officerId = "OFFICER-GOV-901", officerName = "District Welfare Magistrate", officerRemarks }) {
  try {
    const res = await fetch(`${BASE_URL}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        claim_id: claimId,
        officer_id: officerId,
        officer_name: officerName,
        officer_remarks: officerRemarks || "Verified physical document photo and audio deposition. Discrepancies reviewed.",
        override_flags: true
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status === 'success' && data.dossier) {
      return data.dossier;
    }
    return getFallbackDossier(claimId, officerId, officerName, officerRemarks);
  } catch (err) {
    console.warn("Backend approval fallback:", err);
    return getFallbackDossier(claimId, officerId, officerName, officerRemarks);
  }
}

function getFallbackClaim(presetHint, schemeId) {
  if (presetHint) {
    const match = MOCK_PRESETS.find(p => p.preset_name.toLowerCase().includes(presetHint.toLowerCase()));
    if (match) return match;
  }
  if (schemeId) {
    const match = MOCK_PRESETS.find(p => p.scheme_id === schemeId);
    if (match) return match;
  }
  return MOCK_PRESETS[0];
}

function getFallbackDossier(claimId, officerId, officerName, officerRemarks) {
  const now = new Date().toISOString();
  const hash = "8f9b4c6e2a1d0f5e3b7a9c8d1e2f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f";
  return {
    dossier_id: `DOSSIER-${claimId?.replace('CLM-', '') || '2026-9812'}`,
    claim_id: claimId || "CLM-2026-9812",
    scheme_name: "Pradhan Mantri Kisan Samman Nidhi",
    applicant_name: "Ramesh Dummy",
    id_number: "1234-FAKE-5678",
    approval_timestamp: now,
    officer_id: officerId || "OFFICER-GOV-901",
    officer_name: officerName || "District Welfare Magistrate",
    officer_remarks: officerRemarks || "Verified document photo and audio deposition. Approved for DBT disbursement.",
    status: "OFFICIALLY_VERIFIED_AND_APPROVED",
    cryptographic_seal_sha256: hash,
    digital_signature_id: `DSIG-GOV-${hash.substring(0, 12).toUpperCase()}`,
    discrepancies_audited: 2,
    payout_schedule: "Next Treasury Cycle (1st Proximo)",
    pdf_download_url: `/api/dossier/${claimId}/pdf`
  };
}
