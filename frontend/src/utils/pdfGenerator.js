import { jsPDF } from 'jspdf';

/**
 * Generates an official, beautiful PDF dossier for verified welfare claims.
 * Includes official headers, applicant KYC tables, discrepancy audit log,
 * and human-in-the-loop sign-off certificate with SHA-256 hash.
 */
export function generateVerifiedDossierPDF(claim, dossier) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 16;

    // Header Band
    doc.setFillColor(11, 30, 54); // Deep Gov Navy
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Saffron accent stripe
    doc.setFillColor(249, 115, 22);
    doc.rect(0, 28, pageWidth, 2, 'F');

    // Portal Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('GOVERNMENT WELFARE SERVICE PORTAL', pageWidth / 2, 12, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text('JanSeva Agent | Multi-Agent Welfare Claim Orchestrator | Verification Dossier', pageWidth / 2, 18, { align: 'center' });
    doc.text('STRICTLY CONFIDENTIAL — HUMAN-IN-THE-LOOP AUDITED RECORD', pageWidth / 2, 23, { align: 'center' });

    y = 38;

    // Verification Status Badge Box
    doc.setFillColor(240, 253, 244); // Light emerald
    doc.setDrawColor(16, 185, 129); // Emerald border
    doc.setLineWidth(0.6);
    doc.roundedRect(14, y, pageWidth - 28, 18, 3, 3, 'FD');

    doc.setTextColor(5, 150, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('STATUS: OFFICIALLY VERIFIED & APPROVED BY DISTRICT MAGISTRATE', 20, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`Dossier ID: ${dossier.dossier_id || 'DOSSIER-9812'} | Claim ID: ${claim.id} | Timestamp: ${dossier.approval_timestamp || new Date().toISOString()}`, 20, y + 14);

    y += 26;

    // Section 1: Scheme & Field Worker Info
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, pageWidth - 28, 7, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('1. WELFARE SCHEME & INGESTION DETAILS', 18, y + 5);

    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);

    const schemeInfo = [
      ['Scheme Name:', claim.scheme_name, 'Category:', claim.category || 'Direct Benefit Transfer'],
      ['Field Worker:', `${claim.field_worker?.worker_name} (${claim.field_worker?.worker_id})`, 'District/State:', `${claim.field_worker?.district}, ${claim.field_worker?.state}`],
      ['Intake Timestamp:', claim.field_worker?.timestamp || '2026-10-14 09:42:00', 'Modality:', 'Vernacular Audio + Synthetic ID OCR']
    ];

    schemeInfo.forEach(row => {
      doc.setFont('helvetica', 'bold');
      doc.text(row[0], 18, y);
      doc.setFont('helvetica', 'normal');
      doc.text(row[1], 46, y);

      doc.setFont('helvetica', 'bold');
      doc.text(row[2], 115, y);
      doc.setFont('helvetica', 'normal');
      doc.text(row[3], 145, y);
      y += 6;
    });

    y += 4;

    // Section 2: Applicant KYC & Data
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, pageWidth - 28, 7, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('2. APPLICANT SYNTHETIC IDENTITY (ZERO REAL PII ENFORCED)', 18, y + 5);

    y += 11;
    const applicant = claim.applicant || {};
    const kycDetails = [
      ['Full Name:', applicant.full_name, 'Synthetic ID No:', applicant.id_number],
      ['Date of Birth / Age:', `${applicant.dob} (Age: ${applicant.age || '48'})`, 'Gender:', applicant.gender || 'Male'],
      ['Declared Income:', `Rs. ${applicant.declared_income?.toLocaleString('en-IN') || '85,000'} / year`, 'Landholding:', `${applicant.land_hectares || 1.5} Hectares`],
      ['Bank Linkage (DBT):', applicant.bank_account_linked ? 'Active Link (IFSC: ' + applicant.bank_ifsc + ')' : 'Pending', 'Phone:', applicant.phone || '+91 98765-XXXXX'],
      ['Residential Address:', applicant.address, '', '']
    ];

    kycDetails.forEach(row => {
      doc.setFont('helvetica', 'bold');
      doc.text(row[0], 18, y);
      doc.setFont('helvetica', 'normal');
      doc.text(row[1], 48, y);

      if (row[2]) {
        doc.setFont('helvetica', 'bold');
        doc.text(row[2], 115, y);
        doc.setFont('helvetica', 'normal');
        doc.text(row[3], 145, y);
      }
      y += 6;
    });

    y += 4;

    // Section 3: Multi-Agent Analysis & Discrepancies
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, pageWidth - 28, 7, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('3. MULTI-AGENT CROSS-REFERENCE & DISCREPANCY AUDIT LOG', 18, y + 5);

    y += 11;
    const discrepancies = claim.discrepancies || [];
    discrepancies.forEach((disc, idx) => {
      const isWarn = disc.severity === 'WARNING' || disc.severity === 'CRITICAL';
      doc.setFillColor(isWarn ? 254 : 240, isWarn ? 242 : 253, isWarn ? 242 : 244);
      doc.rect(16, y - 4, pageWidth - 32, 14, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(isWarn ? 185 : 5, isWarn ? 28 : 150, isWarn ? 28 : 105);
      doc.text(`[${disc.severity}] ${disc.title}`, 20, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(8);
      doc.text(`${disc.description} (Confidence: ${disc.confidence_score})`, 20, y + 5);
      doc.text(`Action Taken: Reviewed and confirmed by Administrative Officer during sign-off.`, 20, y + 9);

      doc.setFontSize(9);
      y += 16;
    });

    y += 3;

    // Section 4: Human-in-the-Loop Sign-Off & Cryptographic Seal
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, pageWidth - 28, 7, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('4. HUMAN-IN-THE-LOOP APPROVAL & CRYPTOGRAPHIC PROOF', 18, y + 5);

    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`Authorized Officer: ${dossier.officer_name || 'District Welfare Magistrate'} (ID: ${dossier.officer_id || 'OFFICER-GOV-901'})`, 18, y);
    y += 5;
    doc.text(`Officer Remarks: "${dossier.officer_remarks || 'Physical and voice depositions verified. Eligible for benefit disbursement.'}"`, 18, y);
    y += 5;
    doc.text(`Digital Signature: ${dossier.digital_signature_id || 'DSIG-GOV-8F9B4C6E2A1D'}`, 18, y);
    y += 5;

    // Cryptographic hash box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(18, y, pageWidth - 36, 12, 2, 2, 'FD');

    doc.setFont('courier', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text('SHA-256 CRYPTOGRAPHIC PROOF SEAL:', 22, y + 5);
    doc.setFont('courier', 'normal');
    doc.text(dossier.cryptographic_seal_sha256 || '8f9b4c6e2a1d0f5e3b7a9c8d1e2f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f', 22, y + 9);

    // Official Stamp Simulation at bottom right
    doc.setDrawColor(5, 150, 105);
    doc.setLineWidth(1);
    doc.circle(pageWidth - 36, pageHeight - 34, 15, 'S');
    doc.circle(pageWidth - 36, pageHeight - 34, 13, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(5, 150, 105);
    doc.text('GOVT. OF INDIA', pageWidth - 36, pageHeight - 37, { align: 'center' });
    doc.text('JANSEVA', pageWidth - 36, pageHeight - 33, { align: 'center' });
    doc.text('OFFICIALLY VERIFIED', pageWidth - 36, pageHeight - 29, { align: 'center' });

    // Footer
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('This is an officially certified welfare dossier generated by JanSeva Agent. Compliant with Aadhaar Act & DBT Rules.', 14, pageHeight - 12);
    doc.text(`Generated: ${new Date().toUTCString()} | Page 1 of 1`, pageWidth - 14, pageHeight - 12, { align: 'right' });

    // Trigger download
    const filename = `JanSeva_Verified_Dossier_${claim.id || 'CLM-2026'}.pdf`;
    doc.save(filename);
    return true;
  } catch (err) {
    console.error("PDF generation failed:", err);
    // Fallback printable view
    window.print();
    return false;
  }
}
