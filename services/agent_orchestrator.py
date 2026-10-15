import time
import json
import os
import logging
from typing import Dict, Any, Optional

from services.audio_agent import AudioAgent
from services.document_agent import DocumentAgent
from services.policy_agent import PolicyAgent
from services.dossier_agent import DossierAgent

logger = logging.getLogger("JanSeva.Orchestrator")

class AgentOrchestrator:
    """
    Coordinates the multi-agent pipeline:
    1. Speech Transcription Agent (vernacular audio)
    2. Vision Document Agent (OCR & visual fields)
    3. Policy Cross-Referencing Agent (rules & discrepancy flags)
    4. Dossier Agent (Human-in-the-loop verified output)
    """
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("AI_API_KEY", "")
        self.audio_agent = AudioAgent(self.api_key)
        self.doc_agent = DocumentAgent(self.api_key)
        self.policy_agent = PolicyAgent(api_key=self.api_key)
        self.dossier_agent = DossierAgent()
        self.mock_claims = self._load_mock_claims()

    def _load_mock_claims(self):
        try:
            path = "data/mock_claims.json"
            if os.path.exists(path):
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception as e:
            logger.warning(f"Failed to load mock claims: {e}")
        return []

    def get_presets(self):
        return self.mock_claims

    def process_case(
        self,
        doc_filename: str = "",
        audio_filename: str = "",
        scheme_id: str = "PM-KISAN",
        preset_hint: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Executes the multi-agent orchestration pipeline.
        All exceptions caught and routed to mock data to guarantee the app never crashes.
        """
        try:
            # Stage 1: Transcribe vernacular speech
            audio_result = self.audio_agent.transcribe_and_extract(
                audio_filename=audio_filename,
                preset_hint=preset_hint
            )

            # Stage 2: Extract vision document data
            doc_result = self.doc_agent.extract_document_data(
                doc_filename=doc_filename,
                preset_hint=preset_hint
            )

            # Stage 3: Cross-reference policies & detect discrepancies
            discrepancies = self.policy_agent.cross_reference_and_audit(
                audio_data=audio_result,
                doc_data=doc_result,
                scheme_id=scheme_id
            )

            # Map matching preset or construct synthetic claim
            claim_id = f"CLM-2026-{int(time.time()) % 10000:04d}"
            preset_match = None
            for p in self.mock_claims:
                if preset_hint and preset_hint.lower() in p.get("preset_name", "").lower():
                    preset_match = p
                    break
                elif scheme_id and scheme_id == p.get("scheme_id"):
                    preset_match = p
                    break

            if preset_match:
                result = dict(preset_match)
                result["audio_meta"] = audio_result
                result["document_meta"] = doc_result
                result["discrepancies"] = discrepancies
                result["status"] = "AWAITING_ADMIN_APPROVAL"
                return result

            # Default synthetic claim
            return {
                "id": claim_id,
                "preset_name": "Field Uploaded Claim",
                "scheme_id": scheme_id,
                "scheme_name": "Pradhan Mantri Kisan Samman Nidhi",
                "category": "Direct Benefit Transfer",
                "field_worker": {
                    "worker_id": "FW-GEN-042",
                    "worker_name": "Sunil Kumar (Gram Sahayak)",
                    "district": "Varanasi",
                    "state": "Uttar Pradesh",
                    "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                },
                "applicant": {
                    "full_name": "Ramesh Dummy",
                    "alias_audio": audio_result.get("extracted_claims", {}).get("stated_name", "Ramesh Chand Dummy"),
                    "alias_doc": doc_result.get("extracted_fields", {}).get("Full Name", "Ramesh C Dummy"),
                    "dob": "1978-08-14",
                    "age": 48,
                    "gender": "Male",
                    "id_type": doc_result.get("document_type", "Aadhaar Card (Synthetic)"),
                    "id_number": "1234-FAKE-5678",
                    "phone": "+91 98765-XXXXX",
                    "address": "Village Ramnagar, Tehsil Sadar, Varanasi, UP - 221001",
                    "declared_income": 85000,
                    "land_hectares": 1.5,
                    "housing_type": "Semi-Pucca",
                    "bank_account_linked": True,
                    "bank_ifsc": "SBIN0001234"
                },
                "audio_meta": audio_result,
                "document_meta": doc_result,
                "discrepancies": discrepancies,
                "status": "AWAITING_ADMIN_APPROVAL"
            }
        except Exception as e:
            logger.exception(f"Pipeline orchestration error: {e}")
            if self.mock_claims:
                return self.mock_claims[0]
            return {
                "id": "CLM-2026-9812",
                "scheme_id": "PM-KISAN",
                "scheme_name": "Pradhan Mantri Kisan Samman Nidhi",
                "category": "Farmer Welfare",
                "status": "AWAITING_ADMIN_APPROVAL"
            }
