import os
import logging
from typing import Dict, Any

logger = logging.getLogger("JanSeva.DocumentAgent")

class DocumentAgent:
    """
    Document Agent: Vision OCR & visual document processing for government IDs
    (Synthetic Aadhaar, Voter ID, Ration Cards).
    """
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("AI_API_KEY", "")

    def extract_document_data(self, doc_filename: str = "", doc_bytes: bytes = None, preset_hint: str = None) -> Dict[str, Any]:
        """
        Extracts structured fields from uploaded ID document.
        Protected with try/except to fall back cleanly to synthetic mock data.
        """
        try:
            if self.api_key:
                logger.info("Live AI API key detected. Running vision OCR pipeline...")
                # Live vision model integration stub
                pass
            
            return self._fallback_synthetic_doc(doc_filename, preset_hint)
        except Exception as e:
            logger.warning(f"Document extraction AI fallback triggered: {str(e)}")
            return self._fallback_synthetic_doc(doc_filename, preset_hint)

    def _fallback_synthetic_doc(self, filename: str, preset_hint: str = None) -> Dict[str, Any]:
        if "voter" in filename.lower() or "sunita" in filename.lower() or (preset_hint and "housing" in preset_hint.lower()):
            return {
                "file_name": filename or "synthetic_voter_sunita_dummy.png",
                "document_type": "Election Commission Voter ID (Synthetic)",
                "ocr_confidence": 0.98,
                "card_image_svg_seed": "voter-sunita",
                "extracted_fields": {
                    "Full Name": "Sunita Devi Dummy",
                    "Husband Name": "Rajendra Dummy",
                    "Date of Birth": "02/05/1986",
                    "Age": "40",
                    "Gender": "Female / F",
                    "EPIC / ID Number": "VTR-9988-FAKE",
                    "Address": "Ward 4, Kasba Mau, District Mau, UP - 275101",
                    "Issuing Authority": "Election Commission of India (Synthetic Sample)"
                }
            }
        elif "harish" in filename.lower() or (preset_hint and "pension" in preset_hint.lower()):
            return {
                "file_name": filename or "synthetic_aadhaar_harish_dummy.png",
                "document_type": "Aadhaar Identity Card (Synthetic)",
                "ocr_confidence": 0.99,
                "card_image_svg_seed": "aadhaar-harish",
                "extracted_fields": {
                    "Full Name": "Harish Kumar Dummy",
                    "Father Name": "Ganga Ram Dummy",
                    "Date of Birth": "10/01/1959",
                    "Age": "67",
                    "Gender": "Male / M",
                    "Aadhaar Number": "8821-FAKE-4309",
                    "Address": "Gram Panchayat Bilaspur, Tehsil Bilha, Bilaspur, CG - 495001",
                    "Issuing Authority": "UIDAI (Synthetic Test Environment)"
                }
            }
        else:
            # Default Preset 1 (Ramesh Dummy - Aadhaar card with middle initial)
            return {
                "file_name": filename or "synthetic_aadhaar_ramesh_dummy.png",
                "document_type": "Aadhaar Identity Card (Synthetic)",
                "ocr_confidence": 0.96,
                "card_image_svg_seed": "aadhaar-ramesh",
                "extracted_fields": {
                    "Full Name": "Ramesh C Dummy",
                    "Father Name": "Shiv R Dummy",
                    "Date of Birth": "14/08/1978",
                    "Age": "48",
                    "Gender": "Male / M",
                    "Aadhaar Number": "1234-FAKE-5678",
                    "Address": "Village Ramnagar, Tehsil Sadar, District Varanasi, UP - 221001",
                    "Issuing Authority": "UIDAI (Synthetic Test Environment)"
                }
            }
