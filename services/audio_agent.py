import os
import json
import logging
from typing import Dict, Any

logger = logging.getLogger("JanSeva.AudioAgent")

class AudioAgent:
    """
    Audio Agent: Responsible for vernacular speech-to-text,
    dialect detection (Bhojpuri/Hindi/Chhattisgarhi), and extracting verbal claims.
    """
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("AI_API_KEY", "")

    def transcribe_and_extract(self, audio_filename: str = "", raw_bytes: bytes = None, preset_hint: str = None) -> Dict[str, Any]:
        """
        Transcribes speech and extracts applicant verbal statements.
        Protected by try/except to guarantee zero crashes and default to mock data.
        """
        try:
            # Future AI logic (Gemini Audio / Whisper API / Sarvam AI) will connect here once API key is provided
            if self.api_key:
                logger.info("Live AI API key detected. Attempting live vernacular audio inference...")
                # Live inference stub here
                pass
            
            # Default to high-fidelity synthetic mock data
            return self._fallback_synthetic_audio(audio_filename, preset_hint)
        except Exception as e:
            logger.warning(f"Audio transcription AI fallback triggered: {str(e)}")
            return self._fallback_synthetic_audio(audio_filename, preset_hint)

    def _fallback_synthetic_audio(self, filename: str, preset_hint: str = None) -> Dict[str, Any]:
        # Return synthetic audio metadata based on filename or preset
        if "sunita" in filename.lower() or (preset_hint and "housing" in preset_hint.lower()):
            return {
                "file_name": filename or "sunita_dummy_housing_claim.wav",
                "duration_sec": 42,
                "language_detected": "Hindi (Awadhi / Bhojpuri accent)",
                "transcription_confidence": 0.97,
                "transcript_hindi": "हमारा नाम सुनीता देवी डमी है। हमारा कच्चा मकान है और बारिश में पानी टपकता है। परिवार में 4 सदस्य हैं और कुल साल की कमाई लगभग एक लाख पैंतालीस हजार रुपये है। आवास योजना की मदद चाहिए।",
                "transcript_english": "My name is Sunita Devi Dummy. Our house is a kutcha dwelling and rainwater leaks during monsoon. There are 4 family members and annual income is approx ₹1,45,000. We need housing assistance.",
                "extracted_claims": {
                    "stated_name": "Sunita Devi Dummy",
                    "stated_housing": "Kutcha Thatch (Mud/Straw roof)",
                    "stated_income": "₹1,45,000 / year",
                    "family_size": "4 members",
                    "stated_scheme": "PMAY-G"
                }
            }
        elif "harish" in filename.lower() or (preset_hint and "pension" in preset_hint.lower()):
            return {
                "file_name": filename or "harish_dummy_pension_claim.wav",
                "duration_sec": 28,
                "language_detected": "Chhattisgarhi / Hindi",
                "transcription_confidence": 0.99,
                "transcript_hindi": "मोर नाम हरीश कुमार डमी हे। मोर उमर 67 साल हे। हमर कुल आय 42 हजार हे। हमर कोई पेंशन अभी नई मिलत हे। वृद्धावस्था पेंशन बर अर्जी देथंव।",
                "transcript_english": "My name is Harish Kumar Dummy. My age is 67 years. Our total income is ₹42,000. I am currently not receiving any other pension. I request old age pension assistance.",
                "extracted_claims": {
                    "stated_name": "Harish Kumar Dummy",
                    "stated_age": "67 years",
                    "stated_income": "₹42,000 / year",
                    "existing_pension": "None",
                    "stated_scheme": "NSAP-IGNOAPS"
                }
            }
        else:
            # Default Preset 1 (Ramesh Dummy - Farmer Welfare)
            return {
                "file_name": filename or "ramesh_dummy_audio_claim.wav",
                "duration_sec": 34,
                "language_detected": "Bhojpuri / Hindi (Eastern UP dialect)",
                "transcription_confidence": 0.94,
                "transcript_hindi": "हमर नाम रमेश चंद डमी बा। पिता जी के नाम शिव डमी बा। गाँव रामनगर, तहसील सदर। हमार डेढ़ हेक्टेयर खेत बा अउर हम किसान सम्मान निधि खातिर आवेदन करत बानी। हमार बैंक खाता चालू बा।",
                "transcript_english": "My name is Ramesh Chand Dummy. Father's name is Shiv Dummy. Village Ramnagar, Tehsil Sadar. I have one and a half hectares of farmland and I am applying for Kisan Samman Nidhi. My bank account is active.",
                "extracted_claims": {
                    "stated_name": "Ramesh Chand Dummy",
                    "stated_father": "Shiv Dummy",
                    "stated_land": "1.5 Hectares",
                    "stated_income": "Under 1 Lakh (₹85,000)",
                    "stated_scheme": "PM-KISAN"
                }
            }
