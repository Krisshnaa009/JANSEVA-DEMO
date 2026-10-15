from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class FieldWorkerInfo(BaseModel):
    worker_id: str = "FW-GEN-001"
    worker_name: str = "Field Agent (VLE)"
    district: str = "Varanasi"
    state: str = "Uttar Pradesh"
    timestamp: str = "2026-10-14T10:00:00Z"

class ApplicantInfo(BaseModel):
    full_name: str = "Ramesh Dummy"
    alias_audio: Optional[str] = None
    alias_doc: Optional[str] = None
    dob: str = "1980-01-01"
    age: int = 45
    gender: str = "Male"
    id_type: str = "Aadhaar Card (Synthetic)"
    id_number: str = "1234-FAKE-5678"
    phone: str = "+91 98765-XXXXX"
    address: str = "Village Ramnagar, District Varanasi, UP"
    declared_income: int = 85000
    land_hectares: float = 1.5
    housing_type: str = "Kutcha"
    bank_account_linked: bool = True
    bank_ifsc: str = "SBIN0001234"

class AudioMetadata(BaseModel):
    file_name: str
    duration_sec: int = 30
    language_detected: str = "Hindi / Vernacular"
    transcription_confidence: float = 0.95
    transcript_hindi: str
    transcript_english: str
    extracted_claims: Dict[str, Any] = {}

class DocumentMetadata(BaseModel):
    file_name: str
    document_type: str = "Aadhaar Card"
    ocr_confidence: float = 0.96
    extracted_fields: Dict[str, Any] = {}
    card_image_svg_seed: str = "aadhaar-ramesh"

class Discrepancy(BaseModel):
    id: str
    type: str # NAME_MISMATCH, INCOME_CEILING_EXCEEDED, IDENTITY_MATCH, etc.
    severity: str # WARNING, CRITICAL, SUCCESS, INFO
    title: str
    description: str
    source_a: str
    source_b: str
    confidence_score: str
    policy_rule: str
    action_required: str

class ClaimCase(BaseModel):
    id: str
    preset_name: Optional[str] = None
    scheme_id: str
    scheme_name: str
    category: str
    field_worker: FieldWorkerInfo
    applicant: ApplicantInfo
    audio_meta: AudioMetadata
    document_meta: DocumentMetadata
    discrepancies: List[Discrepancy] = []
    status: str = "AWAITING_ADMIN_APPROVAL" # Strictly human-in-the-loop

class ApprovalRequest(BaseModel):
    claim_id: str
    officer_id: str = "OFFICER-GOV-901"
    officer_name: str = "District Welfare Magistrate (Admin)"
    officer_remarks: str = "Verified physical document photo and audio deposition. Discrepancies reviewed."
    override_flags: bool = True

class DossierResponse(BaseModel):
    dossier_id: str
    claim_id: str
    scheme_name: str
    applicant_name: str
    id_number: str
    approval_timestamp: str
    officer_id: str
    officer_name: str
    status: str = "VERIFIED_AND_APPROVED"
    cryptographic_seal_sha256: str
    digital_signature_id: str
    discrepancies_audited: int
    payout_schedule: str
    pdf_download_url: str
