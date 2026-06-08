/**
 * PraximaIMG — Document Checklist data.
 *
 * Single source of truth for the /checklist feature: document definitions per
 * pathway, section grouping, and country-specific certification rules. Edit
 * copy here without touching UI code.
 *
 * LINKS LAST VERIFIED: 2026-06-09.
 *
 * Educational guidance only. AHPRA/AMC document requirements change frequently
 * and vary by individual circumstance — always confirm against current official
 * guidance before submitting.
 */

export type Pathway = "competent-authority" | "standard" | "specialist";

export interface DocumentItem {
  id: string;
  name: string;
  section: string;
  description: string;
  format: string;
  certificationNotes: string;
  commonRejections: string[];
  tips: string[];
  requiresTranslation: boolean;
  pathways: Pathway[];
}

/* ------------------------------------------------------------------ */
/* Pathways & sections                                                 */
/* ------------------------------------------------------------------ */

export const PATHWAY_INFO: Record<
  Pathway,
  { label: string; blurb: string }
> = {
  "competent-authority": {
    label: "Competent Authority",
    blurb:
      "Trained and certified by the GMC (UK), MCC (Canada), ECFMG (USA), Medical Council of Ireland or MCNZ (New Zealand).",
  },
  standard: {
    label: "Standard",
    blurb:
      "Qualification listed in the World Directory of Medical Schools, assessed via the AMC examinations or Workplace Based Assessment.",
  },
  specialist: {
    label: "Specialist",
    blurb:
      "Recognised specialist qualifications assessed by the relevant Australian specialist college.",
  },
};

/** Sections render in this order. */
export const SECTIONS: { id: string; label: string }[] = [
  { id: "identity", label: "Identity documents" },
  { id: "qualifications", label: "Qualifications" },
  { id: "registration", label: "Registration and good standing" },
  { id: "english", label: "English language" },
  { id: "experience", label: "Professional experience" },
  { id: "photos", label: "Photos and signatures" },
  { id: "extras", label: "Pathway-specific extras" },
];

/* ------------------------------------------------------------------ */
/* Country-specific certification rules                                */
/* ------------------------------------------------------------------ */

export interface CertificationRule {
  code: string;
  country: string;
  certifiers: string[];
}

export const AHPRA_CERTIFICATION_URL =
  "https://www.ahpra.gov.au/Registration/Registration-Process/Certifying-Documents.aspx";

export const NAATI_URL = "https://www.naati.com.au/";

/**
 * Who may certify copies, by country where the documents were issued. These are
 * indicative categories — the AHPRA certifying-documents page is authoritative.
 */
export const CERTIFICATION_RULES: CertificationRule[] = [
  {
    code: "GB",
    country: "United Kingdom",
    certifiers: [
      "Solicitor",
      "Notary public",
      "GMC-registered medical practitioner",
    ],
  },
  {
    code: "IN",
    country: "India",
    certifiers: ["Notary public", "Gazetted officer"],
  },
  {
    code: "PK",
    country: "Pakistan",
    certifiers: ["Notary public", "Oath commissioner"],
  },
  {
    code: "EG",
    country: "Egypt",
    certifiers: ["Notary public", "Australian embassy / consulate"],
  },
  {
    code: "NG",
    country: "Nigeria",
    certifiers: ["Notary public", "Magistrate"],
  },
  {
    code: "PH",
    country: "Philippines",
    certifiers: ["Notary public", "Philippine consulate"],
  },
];

export const DEFAULT_CERTIFIERS = ["Notary public"];

export function getCertifiers(countryCode: string | undefined): {
  country?: string;
  certifiers: string[];
  isDefault: boolean;
} {
  const rule = CERTIFICATION_RULES.find((r) => r.code === countryCode);
  if (rule) {
    return {
      country: rule.country,
      certifiers: rule.certifiers,
      isDefault: false,
    };
  }
  return { certifiers: DEFAULT_CERTIFIERS, isDefault: true };
}

/* ------------------------------------------------------------------ */
/* Documents                                                           */
/* ------------------------------------------------------------------ */

const ALL: Pathway[] = ["competent-authority", "standard", "specialist"];

export const checklistDocuments: DocumentItem[] = [
  /* ---------------- Identity ---------------- */
  {
    id: "passport",
    name: "Passport (current, biographical page)",
    section: "identity",
    description:
      "The photo/biographical page of your current, valid passport. This is the primary identity document AHPRA matches against every other form.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Submit a certified colour copy. The certifier must sight the original, and endorse the copy.",
    commonRejections: [
      "Black-and-white scan instead of colour.",
      "Expired passport.",
      "Name spelling that doesn't match other documents.",
    ],
    tips: [
      "Make sure the name here matches your qualifications exactly — resolve any differences with change-of-name documents.",
      "Check the passport won't expire mid-application.",
    ],
    requiresTranslation: false,
    pathways: ALL,
  },
  {
    id: "birth-certificate",
    name: "Birth certificate",
    section: "identity",
    description:
      "Official birth certificate used to confirm identity and date of birth.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Certified colour copy. If not in English, attach a NAATI-accredited translation.",
    commonRejections: [
      "Missing English translation.",
      "Translation not from an accredited translator.",
    ],
    tips: [
      "If your birth certificate is not in English, arrange the translation early — accredited translators can have wait times.",
    ],
    requiresTranslation: true,
    pathways: ALL,
  },
  {
    id: "change-of-name",
    name: "Change of name documents (if applicable)",
    section: "identity",
    description:
      "Marriage certificate, deed poll or other legal evidence linking different versions of your name across documents.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Certified colour copy. Include a translation if not in English.",
    commonRejections: [
      "Name differs across documents with nothing to bridge them.",
    ],
    tips: [
      "Only required if your name is not identical across all documents — but if there's any difference, this is essential.",
    ],
    requiresTranslation: true,
    pathways: ALL,
  },

  /* ---------------- Qualifications ---------------- */
  {
    id: "primary-degree",
    name: "Primary medical degree certificate",
    section: "qualifications",
    description:
      "Your primary medical qualification (e.g. MBBS, MD) certificate awarded by your medical school.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Certified colour copy. Non-English certificates need a NAATI-accredited translation alongside the original.",
    commonRejections: [
      "Provisional/transcript used instead of the actual degree certificate.",
      "Translation missing or not accredited.",
    ],
    tips: [
      "Primary source verification (PSV) through the AMC/ECFMG via EPIC is usually also required — start it early as it can be slow.",
    ],
    requiresTranslation: true,
    pathways: ALL,
  },
  {
    id: "academic-transcript",
    name: "Academic transcript",
    section: "qualifications",
    description:
      "Full transcript of your medical course, listing subjects and results year by year.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Certified colour copy. Translate if not in English.",
    commonRejections: ["Incomplete transcript (missing years).", "Not certified."],
    tips: [
      "Request an official copy from your university registrar rather than using a student-held copy.",
    ],
    requiresTranslation: true,
    pathways: ALL,
  },
  {
    id: "school-accreditation",
    name: "Medical school accreditation evidence",
    section: "qualifications",
    description:
      "Evidence your medical school and qualification are listed in the World Directory of Medical Schools (WDOMS), with the relevant note for Australia.",
    format: "PDF printout / screenshot from the WDOMS website.",
    certificationNotes:
      "No certification required — you generate this from wdoms.org.",
    commonRejections: [
      "School listed but the specific qualification/period not covered.",
    ],
    tips: [
      "Confirm your graduation year falls within the school's recognised period in WDOMS.",
    ],
    requiresTranslation: false,
    pathways: ALL,
  },

  /* ---------------- Registration & good standing ---------------- */
  {
    id: "registration-certificate",
    name: "Current medical registration certificate",
    section: "registration",
    description:
      "Your current registration/licence to practise from your medical regulator.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Certified colour copy. Translate if not in English.",
    commonRejections: ["Expired registration.", "Translation missing."],
    tips: [
      "If you hold registration in more than one country, include all of them.",
    ],
    requiresTranslation: true,
    pathways: ALL,
  },
  {
    id: "good-standing",
    name: "Certificate of Good Standing (current and all previous regulators)",
    section: "registration",
    description:
      "A Certificate of Good Standing (CoGS), sometimes called a Certificate of Professional Status, from your current and every previous medical regulatory authority.",
    format:
      "Issued within the last 3 months and sent directly from the regulator (often to the AMC/AHPRA).",
    certificationNotes:
      "Usually sent regulator-to-regulator — not certified by you. Check each authority's process.",
    commonRejections: [
      "Older than 3 months at the time of assessment.",
      "Missing a regulator you were previously registered with.",
      "Submitted by the applicant when it had to come directly from the regulator.",
    ],
    tips: [
      "List every authority you've ever been registered with — gaps here are a common cause of delay.",
      "Request these last, as they expire after 3 months.",
    ],
    requiresTranslation: false,
    pathways: ALL,
  },

  /* ---------------- English language ---------------- */
  {
    id: "english-test",
    name: "English language test results (IELTS / OET / PTE / Cambridge / TOEFL iBT)",
    section: "english",
    description:
      "Evidence you meet the English language skills registration standard via an approved test: IELTS Academic, OET, PTE Academic, Cambridge C1 Advanced, or TOEFL iBT.",
    format: "Official results, typically verified online with the test provider.",
    certificationNotes:
      "Results are usually verified electronically by AHPRA with the test provider — keep your candidate/verification numbers.",
    commonRejections: [
      "Results older than 2 years at the time of application.",
      "Minimum score not met in every component (no rounding up).",
      "Scores combined across more than the permitted number of sittings.",
    ],
    tips: [
      "Test results are valid for 2 years only — time your test so it's still valid at submission.",
      "Check the current minimum scores for each test, as the standard is periodically updated.",
    ],
    requiresTranslation: false,
    pathways: ["standard", "specialist"],
  },
  {
    id: "english-exemption",
    name: "Evidence of medical education in English (exemption)",
    section: "english",
    description:
      "If claiming an exemption from English testing, evidence that your primary medical qualification (and often secondary education) was taught and assessed in English.",
    format: "Official letter from your institution, certified copy.",
    certificationNotes:
      "Certified copy of an official institutional letter confirming the language of instruction.",
    commonRejections: [
      "Letter doesn't explicitly state tuition AND assessment were in English.",
      "Country/education history doesn't meet the exemption criteria.",
    ],
    tips: [
      "An exemption is an alternative to a test — you generally need one or the other, not both.",
    ],
    requiresTranslation: false,
    pathways: ["standard", "specialist"],
  },

  /* ---------------- Professional experience ---------------- */
  {
    id: "cv",
    name: "Curriculum vitae (CV)",
    section: "experience",
    description:
      "A current CV in chronological order covering your education and entire work history, month by month.",
    format: "PDF document, prepared by you.",
    certificationNotes: "No certification required.",
    commonRejections: [
      "Unexplained gaps in the timeline.",
      "Dates that don't reconcile with employment letters.",
    ],
    tips: [
      "Account for every gap — even short ones — with a brief note (study, parental leave, relocation, etc.).",
      "Use month/year, not just years, so periods line up exactly with your other evidence.",
    ],
    requiresTranslation: false,
    pathways: ALL,
  },
  {
    id: "employment-letters",
    name: "Employment letters (last 5 years)",
    section: "experience",
    description:
      "Letters from each employer confirming your position, dates, and scope of practice for all positions in the last 5 years.",
    format: "Certified colour copies, scanned to PDF.",
    certificationNotes:
      "Certified copies on official letterhead. Translate if not in English.",
    commonRejections: [
      "Dates inconsistent with the CV.",
      "Letters not on official letterhead or unsigned.",
    ],
    tips: [
      "Ask for letters that state exact start and end dates and your role/level.",
    ],
    requiresTranslation: true,
    pathways: ALL,
  },
  {
    id: "logbook",
    name: "Logbook of procedures (where applicable)",
    section: "experience",
    description:
      "A record of procedures and clinical activity, where relevant to your role or required by your assessing body.",
    format: "PDF document or certified export.",
    certificationNotes:
      "Follow the format required by your assessing college/authority.",
    commonRejections: ["Format doesn't match the assessor's template."],
    tips: [
      "Check whether your specialist college specifies a logbook format before compiling it.",
    ],
    requiresTranslation: false,
    pathways: ALL,
  },

  /* ---------------- Photos & signatures ---------------- */
  {
    id: "photo",
    name: "Recent passport-style photograph",
    section: "photos",
    description:
      "A recent passport-standard photograph used to confirm identity, sometimes certified on the back by the same person who certifies your ID.",
    format: "Colour, passport-standard (plain background, full face, recent).",
    certificationNotes:
      "Often certified on the reverse by your document certifier as a true likeness.",
    commonRejections: [
      "Casual photo / selfie rather than passport-standard.",
      "Old photo that no longer resembles you.",
    ],
    tips: [
      "Get this taken professionally at the same time you arrange certification.",
    ],
    requiresTranslation: false,
    pathways: ALL,
  },
  {
    id: "signature",
    name: "Specimen signature / signed declarations",
    section: "photos",
    description:
      "Your signature on the application declarations, consistent with the signature on your identity documents.",
    format: "Signed PDF / certified as required by the form.",
    certificationNotes:
      "Sign exactly as per your passport; some declarations must be witnessed.",
    commonRejections: [
      "Signature differs from identity documents.",
      "Declaration left unsigned or undated.",
    ],
    tips: ["Double-check every declaration is signed AND dated before scanning."],
    requiresTranslation: false,
    pathways: ALL,
  },

  /* ---------------- Pathway-specific extras ---------------- */
  {
    id: "cct",
    name: "Certificate of completion of training (Competent Authority)",
    section: "extras",
    description:
      "Evidence of completion of training from your competent authority — for example a GMC CCT, or the relevant certificate from the Medical Council of Ireland, MCC, ECFMG or MCNZ.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Certified colour copy. Verify the issuing body is the recognised competent authority.",
    commonRejections: [
      "Certificate from a body that isn't the recognised competent authority.",
    ],
    tips: [
      "This is the document that places you on the Competent Authority pathway — make sure it's the correct authority-issued certificate.",
    ],
    requiresTranslation: false,
    pathways: ["competent-authority"],
  },
  {
    id: "specialist-certificate",
    name: "Specialist qualification certificate (country of training)",
    section: "extras",
    description:
      "Your specialist qualification certificate from the body that awarded it in your country of training.",
    format: "Certified colour copy, scanned to PDF.",
    certificationNotes:
      "Certified colour copy with a NAATI-accredited translation if not in English.",
    commonRejections: ["Translation missing.", "Sub-specialty scope unclear."],
    tips: [
      "Make sure the certificate clearly states the specialty being assessed by the Australian college.",
    ],
    requiresTranslation: true,
    pathways: ["specialist"],
  },
  {
    id: "training-curriculum",
    name: "Detailed training curriculum from training authority",
    section: "extras",
    description:
      "The formal curriculum/syllabus of your specialist training, used by the Australian college to compare with the local program.",
    format: "Official document from the training authority, PDF.",
    certificationNotes:
      "Obtain directly from the training authority; translate if not in English.",
    commonRejections: [
      "Generic course outline rather than the official curriculum.",
    ],
    tips: [
      "Request the version that matches the years you trained — curricula change over time.",
    ],
    requiresTranslation: true,
    pathways: ["specialist"],
  },
  {
    id: "cpd-evidence",
    name: "CPD evidence (last 3 years)",
    section: "extras",
    description:
      "Continuing Professional Development records for the last 3 years, in the format required by the assessing college.",
    format: "PDF, structured per the college's CPD requirements.",
    certificationNotes:
      "Follow the assessing college's CPD evidence format exactly.",
    commonRejections: [
      "CPD not in the required format.",
      "Gaps in the 3-year record.",
    ],
    tips: [
      "Check your college's CPD template before compiling — format is a frequent rejection reason.",
    ],
    requiresTranslation: false,
    pathways: ["specialist"],
  },
  {
    id: "reference-letters",
    name: "Reference letters from specialist colleagues",
    section: "extras",
    description:
      "Professional references from specialist colleagues who can attest to your training and practice.",
    format: "Signed letters on letterhead, PDF.",
    certificationNotes:
      "Provide referees' full contact details; the college may contact them directly.",
    commonRejections: [
      "Referees not at an appropriate specialist level.",
      "Missing contact details.",
    ],
    tips: [
      "Choose referees who supervised or worked alongside you and can speak to your specialty practice.",
    ],
    requiresTranslation: false,
    pathways: ["specialist"],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getDocumentsForPathway(pathway: Pathway): DocumentItem[] {
  return checklistDocuments.filter((d) => d.pathways.includes(pathway));
}

export function isPathway(value: string): value is Pathway {
  return (
    value === "competent-authority" ||
    value === "standard" ||
    value === "specialist"
  );
}

export const CHECKLIST_DISCLAIMER =
  "PraximaIMG provides educational guidance only. Document requirements change and vary by individual circumstance — always confirm against current AHPRA and AMC official guidance before submitting your application.";
