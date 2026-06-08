/**
 * PraximaIMG — DPA / Job Eligibility Checker copy.
 *
 * All explainer text for the /eligibility feature lives here so the wording can
 * be edited without touching UI code. Plain-English, non-legal guidance only.
 *
 * LINKS LAST VERIFIED: 2026-06-09.
 *
 * NOTE: s19AB restrictions, DPA/DWS classifications and the moratorium rules
 * change over time. This is educational context only — the Health Workforce
 * Locator is the official source of truth.
 */

export const HEALTH_WORKFORCE_LOCATOR_URL =
  "https://www.health.gov.au/resources/apps-and-tools/health-workforce-locator";

export interface Exemption {
  label: string;
  detail: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export const eligibilityContent = {
  /* ---- Perspective intros (hero → checker framing) ---------------- */

  imgIntro:
    "If you're an International Medical Graduate, where you work in Australia can affect whether you can bill Medicare. Most IMGs are restricted to Distribution Priority Areas (for GPs) or Districts of Workforce Shortage (for other specialists) for their first 10 years. Use the checker below to look up a location and understand what the rules mean for you.",

  employerIntro:
    "If you're a practice or health service looking to hire an International Medical Graduate, the location of the role determines whether they can access a Medicare provider number under section 19AB. Check whether your site is a Distribution Priority Area (for GPs) or a District of Workforce Shortage (for other specialists) before you advertise or make an offer.",

  /* ---- Core explainers -------------------------------------------- */

  dpaExplainer:
    "A Distribution Priority Area (DPA) is a location the Department of Health has identified as having a shortage of GPs, based on the needs of the local community. A District of Workforce Shortage (DWS) is the equivalent classification for non-GP specialists. Under section 19AB of the Health Insurance Act 1973, most International Medical Graduates can only access a Medicare provider number if they work in a DPA (GPs) or DWS (other specialists). Working in these areas is how the system directs doctors to communities that need them most. A location's classification can change as workforce data is updated, so it must be checked at the time of the role.",

  moratoriumExplainer:
    "The '10-year moratorium' is the period during which the section 19AB location restriction applies. It runs for 10 years from the date of your first medical registration in Australia — not from when you arrive, and not from when you start a particular job. During this time you generally need to work in a DPA or DWS to bill Medicare. Once the 10 years are complete, the geographic restriction no longer applies and you can access a Medicare provider number anywhere in Australia (subject to the usual registration and credentialing requirements).",

  fyotdExplainer:
    "The Five Year Overseas Trained Doctor (5YOTD) scheme can shorten your 10-year moratorium. By working in eligible locations — generally more remote and underserved areas — you earn 'scaling' that reduces the moratorium. The more remote the location (measured by the Modified Monash Model, MM1–MM7), the faster the reduction: time spent in the most remote areas can reduce the moratorium more quickly, so committed doctors may finish well before the full 10 years. The exact reduction depends on where and how long you work, so confirm your scaling with the Department of Health.",

  /* ---- Who is exempt ---------------------------------------------- */

  exemptions: [
    {
      label: "Australian permanent residents or citizens at the start of training",
      detail:
        "If you were an Australian permanent resident or citizen when you began your basic medical training, section 19AB generally does not apply to you.",
    },
    {
      label: "New Zealand citizens (in defined circumstances)",
      detail:
        "Some New Zealand citizens and graduates are treated differently under the rules — check your specific situation.",
    },
    {
      label: "Doctors who have completed the 10-year moratorium",
      detail:
        "Once 10 years have passed since your first Australian medical registration, the geographic restriction no longer applies.",
    },
    {
      label: "Practitioners not billing Medicare",
      detail:
        "Section 19AB is about access to a Medicare provider number. Roles that do not rely on Medicare billing (for example, some salaried hospital or non-clinical positions) may not be affected — but get advice specific to the role.",
    },
  ] as Exemption[],

  /* ---- FAQ -------------------------------------------------------- */

  faqs: [
    {
      question: "What is section 19AB?",
      answer:
        "Section 19AB of the Health Insurance Act 1973 restricts where International Medical Graduates and other 'overseas trained doctors' and 'foreign graduates of accredited medical schools' can access a Medicare provider number. In practice it means most IMGs must work in a Distribution Priority Area (GPs) or District of Workforce Shortage (other specialists) for 10 years from their first Australian medical registration.",
    },
    {
      question: "What is section 19AA and how is it different?",
      answer:
        "Section 19AA is a separate requirement that applies to almost all doctors, not just IMGs. It requires you to be vocationally registered — that is, a Fellow of a recognised specialist college (such as the RACGP, ACRRM, or another college) — to access the full Medicare rebate. 19AA is about your qualifications and Fellowship; 19AB is about your location and immigration/training background. Many IMGs need to satisfy both at the same time.",
    },
    {
      question: "Can I work anywhere if I'm bulk-billing only or not using Medicare?",
      answer:
        "Section 19AB is specifically about access to a Medicare provider number, so whether you bulk-bill or charge a gap makes no difference — both rely on Medicare. However, roles that genuinely do not involve Medicare billing at all (for example, certain salaried public hospital positions) may sit outside 19AB. This is fact-specific, so confirm the exact arrangement before relying on it.",
    },
    {
      question: "What happens after 10 years?",
      answer:
        "Once you complete the 10-year moratorium, the section 19AB location restriction ends. You can then apply for a Medicare provider number to work anywhere in Australia, subject to the usual AHPRA registration and section 19AA (Fellowship) requirements. The moratorium is counted from your first Australian medical registration, and can be reduced earlier through the 5YOTD scheme.",
    },
    {
      question: "I'm a permanent resident — does this apply to me?",
      answer:
        "It depends on when you became a permanent resident. If you were already an Australian permanent resident or citizen when you began your basic medical training, section 19AB generally does not apply. If you became a permanent resident later (for example, after graduating overseas and moving to Australia), the moratorium usually still applies. Your status at the start of your medical training is the key fact.",
    },
    {
      question: "Can my moratorium be reduced?",
      answer:
        "Yes. The Five Year Overseas Trained Doctor (5YOTD) scheme reduces the 10-year moratorium based on where you work. Time spent in more remote and underserved locations (higher Modified Monash Model categories) earns faster 'scaling', shortening the restriction — sometimes substantially. The reduction is calculated from your work history and location classifications, so check your individual scaling with the Department of Health.",
    },
  ] as Faq[],

  /* ---- Disclaimer ------------------------------------------------- */

  disclaimer:
    "PraximaIMG provides educational guidance only. The official source for DPA/DWS classification is the Health Workforce Locator. Restrictions and classifications can change — always verify on official government sources before making employment decisions.",
};

export type EligibilityContent = typeof eligibilityContent;
