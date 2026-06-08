/**
 * PraximaIMG — pathway diagnostic data & rules.
 *
 * This file is the single source of truth for the pathway questionnaire:
 * country lists, specialty → college mappings, fees, timeframes, result copy
 * and official links. Update values here without touching UI code.
 *
 * NOTE: figures are indicative only and change frequently. Always confirm
 * against the official AHPRA / AMC / college sources linked below.
 *
 * LINKS LAST VERIFIED: 2026-06-09.
 *   All college, AMC, Medical Board and WDOMS URLs below were checked on this
 *   date. Note the Competent Authority and Specialist pathways are
 *   administered by the Medical Board of Australia (medicalboard.gov.au), not
 *   the AMC — the AMC handles primary source verification only. A few sources
 *   (RCPA, RANZCR, CICM, medicalboard.gov.au) block automated checks, so those
 *   were confirmed via canonical search results rather than a direct fetch.
 *   Re-verify periodically and bump this date when you do.
 */

/* ------------------------------------------------------------------ */
/* Countries                                                           */
/* ------------------------------------------------------------------ */

export interface Country {
  /** ISO 3166-1 alpha-2 code, used as a stable value. */
  code: string;
  name: string;
  /** Emoji flag, purely decorative. */
  flag: string;
  /**
   * True if a primary medical qualification from this country is issued by a
   * recognised Competent Authority (GMC, MCI, ECFMG, MCC, MCNZ).
   */
  competentAuthority?: boolean;
}

/**
 * The five Competent Authorities recognised by the Medical Board of Australia,
 * keyed by the country whose graduates they certify.
 */
export const COMPETENT_AUTHORITIES: Record<string, string> = {
  GB: "General Medical Council (UK)",
  IE: "Medical Council of Ireland",
  US: "Educational Commission for Foreign Medical Graduates (USA)",
  CA: "Medical Council of Canada",
  NZ: "Medical Council of New Zealand",
};

/**
 * Country list for the Q1 dropdown. The five competent-authority countries are
 * flagged; the rest fall through to the Standard pathway. List is intentionally
 * broad but not exhaustive — extend as needed.
 */
export const COUNTRIES: Country[] = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", competentAuthority: true },
  { code: "IE", name: "Ireland", flag: "🇮🇪", competentAuthority: true },
  { code: "US", name: "United States of America", flag: "🇺🇸", competentAuthority: true },
  { code: "CA", name: "Canada", flag: "🇨🇦", competentAuthority: true },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", competentAuthority: true },

  { code: "AF", name: "Afghanistan", flag: "🇦🇫" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", flag: "🇦🇲" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "BY", name: "Belarus", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "KH", name: "Cambodia", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "HR", name: "Croatia", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", flag: "🇨🇺" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾" },
  { code: "CZ", name: "Czechia", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "FJ", name: "Fiji", flag: "🇫🇯" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "GE", name: "Georgia", flag: "🇬🇪" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "IR", name: "Iran", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", flag: "🇮🇶" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧" },
  { code: "LY", name: "Libya", flag: "🇱🇾" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", flag: "🇲🇻" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "MU", name: "Mauritius", flag: "🇲🇺" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "MD", name: "Moldova", flag: "🇲🇩" },
  { code: "MN", name: "Mongolia", flag: "🇲🇳" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲" },
  { code: "NP", name: "Nepal", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "PS", name: "Palestine", flag: "🇵🇸" },
  { code: "PG", name: "Papua New Guinea", flag: "🇵🇬" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "SD", name: "Sudan", flag: "🇸🇩" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SY", name: "Syria", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳" },
  { code: "TR", name: "Türkiye", flag: "🇹🇷" },
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
  { code: "OTHER", name: "Other / not listed", flag: "🌐" },
];

export function getCountry(code: string | undefined): Country | undefined {
  if (!code) return undefined;
  return COUNTRIES.find((c) => c.code === code);
}

export function isCompetentAuthorityCountry(code: string | undefined): boolean {
  return !!getCountry(code)?.competentAuthority;
}

/* ------------------------------------------------------------------ */
/* Specialties → Australian colleges                                   */
/* ------------------------------------------------------------------ */

export interface Specialty {
  value: string;
  label: string;
  /** Short name of the assessing Australian specialist college. */
  college: string;
  collegeFull: string;
  collegeUrl: string;
}

export const SPECIALTIES: Specialty[] = [
  {
    value: "general_practice",
    label: "General Practice",
    college: "RACGP / ACRRM",
    collegeFull:
      "Royal Australian College of General Practitioners / Australian College of Rural & Remote Medicine",
    collegeUrl: "https://www.racgp.org.au/education/imgs",
  },
  {
    value: "internal_medicine",
    label: "Internal Medicine",
    college: "RACP",
    collegeFull: "Royal Australasian College of Physicians",
    collegeUrl: "https://www.racp.edu.au/become-a-physician/overseas-trained-physicians",
  },
  {
    value: "surgery",
    label: "Surgery",
    college: "RACS",
    collegeFull: "Royal Australasian College of Surgeons",
    collegeUrl: "https://www.surgeons.org/become-a-surgeon/specialist-international-medical-graduates",
  },
  {
    value: "psychiatry",
    label: "Psychiatry",
    college: "RANZCP",
    collegeFull: "Royal Australian & New Zealand College of Psychiatrists",
    collegeUrl: "https://www.ranzcp.org/become-a-psychiatrist/international-specialists/applying-for-specialist-assessment",
  },
  {
    value: "paediatrics",
    label: "Paediatrics",
    college: "RACP",
    collegeFull: "Royal Australasian College of Physicians",
    collegeUrl: "https://www.racp.edu.au/become-a-physician/overseas-trained-physicians",
  },
  {
    value: "anaesthesia",
    label: "Anaesthesia",
    college: "ANZCA",
    collegeFull: "Australian & New Zealand College of Anaesthetists",
    collegeUrl: "https://www.anzca.edu.au/education-and-training/specialist-international-medical-graduates",
  },
  {
    value: "emergency_medicine",
    label: "Emergency Medicine",
    college: "ACEM",
    collegeFull: "Australasian College for Emergency Medicine",
    collegeUrl: "https://acem.org.au/Content-Sources/International-Qualified-Specialists/Assessment-of-Specialist-International-Medical-Gra",
  },
  {
    value: "pathology",
    label: "Pathology",
    college: "RCPA",
    collegeFull: "Royal College of Pathologists of Australasia",
    collegeUrl: "https://www.rcpa.edu.au/Trainees/Specialist-International-Medical-Graduates",
  },
  {
    value: "radiology",
    label: "Radiology / Diagnostic Imaging",
    college: "RANZCR",
    collegeFull: "Royal Australian & New Zealand College of Radiologists",
    collegeUrl: "https://www.ranzcr.com/join-our-professions/img/recognition-for-img",
  },
  {
    value: "intensive_care",
    label: "Intensive Care Medicine",
    college: "CICM",
    collegeFull: "College of Intensive Care Medicine of Australia & New Zealand",
    collegeUrl: "https://cicm.org.au/Web/Web/IMGs/Specialist-International-Medical-Graduate.aspx",
  },
  {
    value: "obgyn",
    label: "Obstetrics & Gynaecology",
    college: "RANZCOG",
    collegeFull: "Royal Australian & New Zealand College of Obstetricians and Gynaecologists",
    collegeUrl: "https://ranzcog.edu.au/training/specialist-international-medical-graduates/",
  },
  {
    value: "other",
    label: "Other",
    college: "Relevant specialist college",
    collegeFull:
      "The Australian specialist college relevant to your field, via the AMC",
    collegeUrl: "https://www.amc.org.au/accredited-education-providers/specialist-medical-colleges/",
  },
];

export function getSpecialty(value: string | undefined): Specialty | undefined {
  if (!value) return undefined;
  return SPECIALTIES.find((s) => s.value === value);
}

/* ------------------------------------------------------------------ */
/* Questionnaire answer shape                                          */
/* ------------------------------------------------------------------ */

export type YearsSinceDegree = "lt2" | "2to5" | "6to10" | "10plus";
export type EnglishBackground = "studied_in_english" | "native" | "neither";
export type WdomsListed = "yes" | "no" | "not_sure";

export interface PathwayAnswers {
  countryCode?: string;
  isSpecialist?: boolean;
  specialty?: string;
  wdomsListed?: WdomsListed;
  yearsSinceDegree?: YearsSinceDegree;
  englishBackground?: EnglishBackground;
}

/* ------------------------------------------------------------------ */
/* Pathways                                                            */
/* ------------------------------------------------------------------ */

export type PathwayId = "competent_authority" | "standard" | "specialist";

export interface ChecklistItem {
  label: string;
  detail?: string;
}

export interface NextStep {
  label: string;
  href: string;
}

export interface Pathway {
  id: PathwayId;
  name: string;
  tagline: string;
  description: string;
  requirements: ChecklistItem[];
  timeframe: string;
  costRange: string;
  nextSteps: NextStep[];
}

export const PATHWAYS: Record<PathwayId, Pathway> = {
  competent_authority: {
    id: "competent_authority",
    name: "Competent Authority Pathway",
    tagline: "For graduates certified by a recognised authority",
    description:
      "Because your training was certified by a Medical Board–recognised Competent Authority, you can seek registration without sitting the AMC examinations. You will instead complete a period of supervised practice in an approved position to demonstrate you meet Australian standards.",
    requirements: [
      {
        label: "Primary source verification of your qualifications",
        detail: "Confirmed through the AMC / AHPRA.",
      },
      {
        label: "Evidence of Competent Authority certification",
        detail: "E.g. GMC, ECFMG, MCC, MCNZ or Medical Council of Ireland.",
      },
      {
        label: "12 months of supervised practice in an approved position",
        detail: "Under a Board-approved supervision plan.",
      },
      {
        label: "English language proficiency (or recognised exemption)",
        detail: "IELTS Academic, OET, or an education-based exemption.",
      },
    ],
    timeframe: "12–18 months",
    costRange: "A$3,000 – A$8,000 (excl. relocation & registration fees)",
    nextSteps: [
      {
        label: "Read the Competent Authority pathway (Medical Board of Australia)",
        href: "https://www.medicalboard.gov.au/Registration/International-Medical-Graduates/Competent-Authority-Pathway.aspx",
      },
      {
        label: "Review AHPRA registration standards for IMGs",
        href: "https://www.medicalboard.gov.au/Registration/International-Medical-Graduates.aspx",
      },
      {
        label: "Check English language skills registration standard",
        href: "https://www.medicalboard.gov.au/Registration-Standards/English-language-skills.aspx",
      },
    ],
  },

  standard: {
    id: "standard",
    name: "Standard Pathway",
    tagline: "The AMC examination route for most IMGs",
    description:
      "The Standard pathway is for internationally trained doctors whose primary qualification is listed in the World Directory of Medical Schools and recognised by the AMC. You demonstrate your knowledge and clinical skills through the AMC examinations (or an approved Workplace Based Assessment) before completing supervised practice.",
    requirements: [
      {
        label: "AMC CAT MCQ examination",
        detail: "Computer-adaptive multiple-choice exam (~A$2,800).",
      },
      {
        label:
          "AMC Clinical Examination OR an approved Workplace Based Assessment",
        detail: "Clinical exam ~A$3,700, or WBA in an accredited health service.",
      },
      {
        label: "English language proficiency (or recognised exemption)",
        detail:
          "IELTS Academic 7.0 each band, OET B in each, or an education-based exemption.",
      },
      {
        label: "Supervised practice toward general registration",
        detail: "In an approved position once exams are complete.",
      },
    ],
    timeframe: "2–3 years",
    costRange: "A$8,000 – A$15,000 (excl. relocation & registration fees)",
    nextSteps: [
      {
        label: "Start with the AMC Standard pathway overview",
        href: "https://www.amc.org.au/assessment/standard-pathway/",
      },
      {
        label: "Confirm your medical school in the World Directory",
        href: "https://www.wdoms.org/",
      },
      {
        label: "Review AHPRA requirements for IMG registration",
        href: "https://www.medicalboard.gov.au/Registration/International-Medical-Graduates.aspx",
      },
    ],
  },

  specialist: {
    id: "specialist",
    name: "Specialist Pathway",
    tagline: "Assessment of your specialist qualifications",
    description:
      "The Specialist pathway is for doctors with recognised specialist qualifications seeking to practise as a specialist in Australia. Your training and experience are assessed by the relevant Australian specialist college, which determines whether they are substantially comparable, partially comparable, or not comparable to the Australian standard.",
    requirements: [
      {
        label: "Application to the relevant Australian specialist college",
        detail: "The college assesses your specialist training and experience.",
      },
      {
        label: "Comparability assessment",
        detail:
          "Outcome: substantially, partially, or not comparable — this sets your requirements.",
      },
      {
        label: "College-directed upskilling, exams or peer review (if required)",
        detail: "Conditions depend on your comparability outcome.",
      },
      {
        label: "Period of supervised / peer-reviewed practice",
        detail: "Length is set by the college.",
      },
      {
        label: "English language proficiency (or recognised exemption)",
        detail: "IELTS Academic, OET, or an education-based exemption.",
      },
    ],
    timeframe: "1–2 years for assessment (additional time if upskilling required)",
    costRange:
      "A$5,000 – A$20,000+ depending on college & requirements (excl. relocation)",
    nextSteps: [
      {
        label: "Read the Specialist pathway (Medical Board of Australia)",
        href: "https://www.medicalboard.gov.au/Registration/International-Medical-Graduates/Specialist-Pathway.aspx",
      },
      {
        label: "Contact your relevant Australian specialist college",
        href: "https://www.amc.org.au/accredited-education-providers/specialist-medical-colleges/",
      },
      {
        label: "Review AHPRA specialist registration information",
        href: "https://www.medicalboard.gov.au/Registration/International-Medical-Graduates.aspx",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Decision logic                                                      */
/* ------------------------------------------------------------------ */

export interface PathwayResult {
  pathway: Pathway;
  /** Specialty + college info, present only for the specialist pathway. */
  specialty?: Specialty;
  /** One-line explanation of why this pathway was recommended. */
  reason: string;
}

/**
 * Core recommendation logic.
 *
 *  1. Specialist (Q2 = Yes)            → Specialist pathway, matched to college.
 *  2. Competent-authority country (Q1) → Competent Authority pathway.
 *  3. Otherwise                         → Standard pathway.
 */
export function recommendPathway(answers: PathwayAnswers): PathwayResult {
  if (answers.isSpecialist) {
    const specialty = getSpecialty(answers.specialty);
    return {
      pathway: PATHWAYS.specialist,
      specialty,
      reason: specialty
        ? `You're seeking recognition as a specialist, so your qualifications would be assessed by the ${specialty.college} (${specialty.collegeFull}).`
        : "You're seeking recognition of specialist qualifications, which is assessed by the relevant Australian specialist college.",
    };
  }

  if (isCompetentAuthorityCountry(answers.countryCode)) {
    const country = getCountry(answers.countryCode);
    const authority = country ? COMPETENT_AUTHORITIES[country.code] : undefined;
    return {
      pathway: PATHWAYS.competent_authority,
      reason: authority
        ? `Your primary qualification is from ${country?.name}, certified by the ${authority} — a recognised Competent Authority.`
        : "Your qualification is from a recognised Competent Authority country, so you can skip the AMC exams.",
    };
  }

  const country = getCountry(answers.countryCode);
  return {
    pathway: PATHWAYS.standard,
    reason: country
      ? `Your qualification is from ${country.name}, which isn't a Competent Authority country, so the AMC examination route applies.`
      : "The AMC examination route applies to most internationally trained doctors.",
  };
}

/* ------------------------------------------------------------------ */
/* Static copy                                                         */
/* ------------------------------------------------------------------ */

export const DISCLAIMER =
  "This is informational guidance only. Final eligibility is determined by AHPRA, the AMC, and (for specialists) the relevant Australian college. Always verify current requirements on official websites.";

export const WDOMS_HELP = {
  text: "The World Directory of Medical Schools (WDOMS) is the official global list of medical schools. Your school must be listed for the Standard pathway.",
  href: "https://www.wdoms.org/",
};
