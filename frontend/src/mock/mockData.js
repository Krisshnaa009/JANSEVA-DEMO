/**
 * JanSeva Agent — Synthetic Mock Data Repository
 * MANDATORY CONSTRAINT: Zero Real PII.
 * All names, numbers, and addresses are purely fictitious synthetic placeholders.
 */

export const MOCK_PRESETS = [
  {
    id: "CLM-2026-9812",
    preset_name: "Preset 1: Farmer Welfare (Name Mismatch Warning)",
    scheme_id: "PM-KISAN",
    scheme_name: "Pradhan Mantri Kisan Samman Nidhi",
    category: "Agriculture & Farmer Welfare",
    field_worker: {
      worker_id: "FW-VAR-402",
      worker_name: "Pooja Varma (VLE)",
      district: "Varanasi",
      state: "Uttar Pradesh",
      timestamp: "2026-10-14T09:42:00Z"
    },
    applicant: {
      full_name: "Ramesh Dummy",
      alias_audio: "Ramesh Chand Dummy",
      alias_doc: "Ramesh C Dummy",
      dob: "1978-08-14",
      age: 48,
      gender: "Male",
      id_type: "Aadhaar Card (Synthetic)",
      id_number: "1234-FAKE-5678",
      phone: "+91 98765-XXXXX",
      address: "Village Ramnagar, Tehsil Sadar, District Varanasi, UP - 221001",
      declared_income: 85000,
      land_hectares: 1.5,
      housing_type: "Semi-Pucca",
      bank_account_linked: true,
      bank_ifsc: "SBIN0001234"
    },
    audio_meta: {
      file_name: "ramesh_dummy_audio_claim.wav",
      duration_sec: 34,
      language_detected: "Bhojpuri / Hindi (Eastern UP dialect)",
      transcription_confidence: 0.94,
      transcript_hindi: "हमर नाम रमेश चंद डमी बा। पिता जी के नाम शिव डमी बा। गाँव रामनगर, तहसील सदर। हमार डेढ़ हेक्टेयर खेत बा अउर हम किसान सम्मान निधि खातिर आवेदन करत बानी। हमार बैंक खाता चालू बा।",
      transcript_english: "My name is Ramesh Chand Dummy. Father's name is Shiv Dummy. Village Ramnagar, Tehsil Sadar. I have one and a half hectares of farmland and I am applying for Kisan Samman Nidhi. My bank account is active.",
      extracted_claims: {
        stated_name: "Ramesh Chand Dummy",
        stated_father: "Shiv Dummy",
        stated_land: "1.5 Hectares",
        stated_income: "Under 1 Lakh (₹85,000)",
        stated_scheme: "PM-KISAN"
      }
    },
    document_meta: {
      file_name: "synthetic_aadhaar_ramesh_dummy.png",
      document_type: "Aadhaar Identity Card (Synthetic)",
      ocr_confidence: 0.96,
      extracted_fields: {
        "Full Name": "Ramesh C Dummy",
        "Father Name": "Shiv R Dummy",
        "Date of Birth": "14/08/1978",
        "Age": "48",
        "Gender": "Male / M",
        "Aadhaar Number": "1234-FAKE-5678",
        "Address": "Village Ramnagar, Tehsil Sadar, District Varanasi, UP - 221001",
        "Issuing Authority": "UIDAI (Synthetic Test Environment)"
      },
      card_image_svg_seed: "aadhaar-ramesh"
    },
    discrepancies: [
      {
        id: "DISC-001",
        type: "NAME_MISMATCH",
        severity: "WARNING",
        title: "Name Spelling Mismatch Between Audio & ID",
        description: "Vernacular audio transcript states 'Ramesh Chand Dummy', whereas extracted ID card reads 'Ramesh C Dummy'.",
        source_a: "Audio Transcript: 'Ramesh Chand Dummy'",
        source_b: "ID Document: 'Ramesh C Dummy'",
        confidence_score: "84%",
        policy_rule: "Direct Benefit Transfer (DBT) requires strict bank name concordance.",
        action_required: "Officer must verify middle initial with bank linkage before final disbursement."
      },
      {
        id: "DISC-002",
        type: "ELIGIBILITY_PASS",
        severity: "SUCCESS",
        title: "Landholding & Income Thresholds Compliant",
        description: "Declared 1.5 hectares is below the 2.0 hectare limit. Annual income ₹85,000 is under the ₹2,00,000 ceiling.",
        source_a: "Stated Land: 1.5 Ha",
        source_b: "Policy Ceiling: <= 2.0 Ha",
        confidence_score: "98%",
        policy_rule: "PM-KISAN small/marginal farmer definition met.",
        action_required: "None. Automatic statutory eligibility met."
      }
    ],
    status: "AWAITING_ADMIN_APPROVAL"
  },
  {
    id: "CLM-2026-7731",
    preset_name: "Preset 2: Rural Housing (Income Ceiling Exceeded)",
    scheme_id: "PMAY-G",
    scheme_name: "Pradhan Mantri Awaas Yojana (Gramin)",
    category: "Rural Housing Assistance",
    field_worker: {
      worker_id: "FW-MAU-118",
      worker_name: "Anil Saini (Gram Sevak)",
      district: "Mau",
      state: "Uttar Pradesh",
      timestamp: "2026-10-14T11:15:00Z"
    },
    applicant: {
      full_name: "Sunita Devi Dummy",
      alias_audio: "Sunita Devi Dummy",
      alias_doc: "Sunita Devi Dummy",
      dob: "1986-05-02",
      age: 40,
      gender: "Female",
      id_type: "Voter ID (Synthetic)",
      id_number: "VTR-9988-FAKE",
      phone: "+91 97654-XXXXX",
      address: "Ward 4, Kasba Mau, District Mau, UP - 275101",
      declared_income: 145000,
      land_hectares: 0.2,
      housing_type: "Kutcha Thatch",
      bank_account_linked: true,
      bank_ifsc: "BARB0MAUXXX"
    },
    audio_meta: {
      file_name: "sunita_dummy_housing_claim.wav",
      duration_sec: 42,
      language_detected: "Hindi (Awadhi / Bhojpuri accent)",
      transcription_confidence: 0.97,
      transcript_hindi: "हमारा नाम सुनीता देवी डमी है। हमारा कच्चा मकान है और बारिश में पानी टपकता है। परिवार में 4 सदस्य हैं और कुल साल की कमाई लगभग एक लाख पैंतालीस हजार रुपये है। आवास योजना की मदद चाहिए।",
      transcript_english: "My name is Sunita Devi Dummy. Our house is a kutcha dwelling and rainwater leaks during monsoon. There are 4 family members and annual income is approx ₹1,45,000. We need housing assistance.",
      extracted_claims: {
        stated_name: "Sunita Devi Dummy",
        stated_housing: "Kutcha Thatch (Mud/Straw roof)",
        stated_income: "₹1,45,000 / year",
        family_size: "4 members",
        "stated_scheme": "PMAY-G"
      }
    },
    document_meta: {
      file_name: "synthetic_voter_sunita_dummy.png",
      document_type: "Election Commission Voter ID (Synthetic)",
      ocr_confidence: 0.98,
      extracted_fields: {
        "Full Name": "Sunita Devi Dummy",
        "Husband Name": "Rajendra Dummy",
        "Date of Birth": "02/05/1986",
        "Age": "40",
        "Gender": "Female / F",
        "EPIC / ID Number": "VTR-9988-FAKE",
        "Address": "Ward 4, Kasba Mau, District Mau, UP - 275101",
        "Issuing Authority": "Election Commission of India (Synthetic Sample)"
      },
      card_image_svg_seed: "voter-sunita"
    },
    discrepancies: [
      {
        id: "DISC-003",
        type: "INCOME_CEILING_EXCEEDED",
        severity: "CRITICAL",
        title: "Income Ceiling Exceeded for Priority A Housing",
        description: "Verbal audio testimony declares ₹1,45,000/yr which exceeds the maximum cutoff limit of ₹1,20,000/yr for Priority A Gramin Housing.",
        source_a: "Audio Declared Income: ₹1,45,000 / year",
        source_b: "Scheme Threshold: Max ₹1,20,000 / year",
        confidence_score: "95%",
        policy_rule: "PMAY-G Chapter 4, Clause 12: Household income cap for rural unit grant.",
        action_required: "Administrative officer must review SECC deprivation score or recommend Priority B interest subvention."
      },
      {
        id: "DISC-004",
        type: "IDENTITY_MATCH",
        severity: "SUCCESS",
        title: "Identity & Address 100% Concordant",
        description: "Name 'Sunita Devi Dummy' matches identically between voice testimony, Voter ID, and Tehsil electoral roll.",
        source_a: "Voice: 'Sunita Devi Dummy'",
        source_b: "Voter ID: 'Sunita Devi Dummy'",
        confidence_score: "99%",
        policy_rule: "Standard KYC verification passed.",
        action_required: "None."
      }
    ],
    status: "AWAITING_ADMIN_APPROVAL"
  },
  {
    id: "CLM-2026-4402",
    preset_name: "Preset 3: Old Age Pension (Clean - Ready for Approval)",
    scheme_id: "NSAP-IGNOAPS",
    scheme_name: "Indira Gandhi National Old Age Pension Scheme",
    category: "Social Security & Senior Support",
    field_worker: {
      worker_id: "FW-BIL-890",
      worker_name: "Rohan Deshmukh (Panchayat Sahayak)",
      district: "Bilaspur",
      state: "Chhattisgarh",
      timestamp: "2026-10-14T08:30:00Z"
    },
    applicant: {
      full_name: "Harish Kumar Dummy",
      alias_audio: "Harish Kumar Dummy",
      alias_doc: "Harish Kumar Dummy",
      dob: "1959-01-10",
      age: 67,
      gender: "Male",
      id_type: "Aadhaar Card (Synthetic)",
      id_number: "8821-FAKE-4309",
      phone: "+91 94123-XXXXX",
      address: "Gram Panchayat Bilaspur, Tehsil Bilha, Bilaspur, CG - 495001",
      declared_income: 42000,
      land_hectares: 0.0,
      housing_type: "Kutcha",
      bank_account_linked: true,
      bank_ifsc: "PUNB0192800"
    },
    audio_meta: {
      file_name: "harish_dummy_pension_claim.wav",
      duration_sec: 28,
      language_detected: "Chhattisgarhi / Hindi",
      transcription_confidence: 0.99,
      transcript_hindi: "मोर नाम हरीश कुमार डमी हे। मोर उमर 67 साल हे। हमर कुल आय 42 हजार हे। हमर कोई पेंशन अभी नई मिलत हे। वृद्धावस्था पेंशन बर अर्जी देथंव।",
      transcript_english: "My name is Harish Kumar Dummy. My age is 67 years. Our total income is ₹42,000. I am currently not receiving any other pension. I request old age pension assistance.",
      extracted_claims: {
        stated_name: "Harish Kumar Dummy",
        stated_age: "67 years",
        stated_income: "₹42,000 / year",
        existing_pension: "None",
        stated_scheme: "NSAP-IGNOAPS"
      }
    },
    document_meta: {
      file_name: "synthetic_aadhaar_harish_dummy.png",
      document_type: "Aadhaar Identity Card (Synthetic)",
      ocr_confidence: 0.99,
      extracted_fields: {
        "Full Name": "Harish Kumar Dummy",
        "Father Name": "Ganga Ram Dummy",
        "Date of Birth": "10/01/1959",
        "Age": "67",
        "Gender": "Male / M",
        "Aadhaar Number": "8821-FAKE-4309",
        "Address": "Gram Panchayat Bilaspur, Tehsil Bilha, Bilaspur, CG - 495001",
        "Issuing Authority": "UIDAI (Synthetic Test Environment)"
      },
      card_image_svg_seed: "aadhaar-harish"
    },
    discrepancies: [
      {
        id: "DISC-005",
        type: "PERFECT_MATCH",
        severity: "SUCCESS",
        title: "All Statutory Criteria Fully Satisfied",
        description: "Age 67 exceeds 60-year statutory threshold. Declared ₹42,000/yr is well under the ₹60,000 BPL ceiling. Zero duplicate pension records found.",
        source_a: "Age: 67 (DoB 1959)",
        source_b: "Scheme Criteria: Age >= 60, Income < ₹60k",
        confidence_score: "99%",
        policy_rule: "NSAP Guidelines (2014) Rule 3.1: Complete eligibility.",
        action_required: "Ready for administrative officer sign-off and immediate DBT mapping."
      },
      {
        id: "DISC-006",
        type: "BIOMETRIC_LINKAGE",
        severity: "INFO",
        title: "Aadhaar & Bank Account Direct Benefit Transfer Ready",
        description: "Aadhaar number 8821-FAKE-4309 is mapped to active bank account with Punjab National Bank (IFSC: PUNB0192800).",
        source_a: "NPCI DBT Mapper: Active",
        source_b: "Aadhaar Status: Verified",
        confidence_score: "99%",
        policy_rule: "DBT Mandate 2023.",
        action_required: "No action required."
      }
    ],
    status: "AWAITING_ADMIN_APPROVAL"
  }
];

export const SCHEMES = [
  {
    id: "PM-KISAN",
    name: "Pradhan Mantri Kisan Samman Nidhi",
    tagline: "Direct income support of ₹6,000/year to all farmer families across India",
    category: "Agriculture & Farmer Welfare",
    icon: "🌾"
  },
  {
    id: "PMAY-G",
    name: "Pradhan Mantri Awaas Yojana (Gramin)",
    tagline: "Pucca house financial grant of ₹1,20,000 for rural homeless & kutcha households",
    category: "Rural Housing Assistance",
    icon: "🏠"
  },
  {
    id: "NSAP-IGNOAPS",
    name: "National Old Age Pension Scheme",
    tagline: "Monthly social security pension for senior citizens below the poverty line",
    category: "Social Security & Senior Support",
    icon: "👴"
  }
];
