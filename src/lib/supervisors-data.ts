/**
 * PraximaIMG — Supervisor Directory seed data.
 *
 * MVP / frontend-only. This is mock data designed to be swapped for a Supabase
 * table later without changing the UI: keep the `Supervisor` shape stable and
 * replace the `SUPERVISORS` array + accessor functions with real queries.
 *
 * Every entry here is FICTIONAL except Dr Amir Waly. Even so, nothing in this
 * directory is verified — listings are illustrative MVP seed data only.
 */

export type AustralianState =
  | "WA"
  | "NSW"
  | "VIC"
  | "QLD"
  | "SA"
  | "TAS"
  | "ACT"
  | "NT";

export type SupervisorLevel = 1 | 2 | 3;

export type SupervisionMode = "on-site" | "remote";

export type Availability = "accepting" | "waitlist" | "not-accepting";

export interface Supervisor {
  id: string;
  name: string;
  postNominals: string;
  practiceName: string;
  suburb: string;
  state: AustralianState;
  level: SupervisorLevel;
  specialty: string;
  modes: SupervisionMode[];
  availability: Availability;
  /** 1–2 sentence summary shown on the card. */
  bio: string;
  yearsExperience: number;
  clinicalInterests: string[];
  languages: string[];
  practiceType: string;
}

/* ------------------------------------------------------------------ */
/* Seed supervisors                                                    */
/* ------------------------------------------------------------------ */

export const SUPERVISORS: Supervisor[] = [
  {
    id: "amir-waly",
    name: "Dr Amir Waly",
    postNominals: "MBBS, FRACGP",
    practiceName: "Aureus Private Physician",
    suburb: "Bayswater",
    state: "WA",
    level: 3,
    specialty: "General Practice",
    modes: ["on-site", "remote"],
    availability: "accepting",
    bio: "Level 3 GP supervisor with a special interest in skin cancer medicine, telehealth and residential aged care. Experienced supervising IMGs through Limited registration and toward Fellowship.",
    yearsExperience: 12,
    clinicalInterests: [
      "Skin cancer medicine",
      "Telehealth",
      "Residential aged care (RACF)",
      "Chronic disease management",
    ],
    languages: ["English", "Arabic"],
    practiceType: "Urban GP / Telehealth",
  },
  {
    id: "priya-nair",
    name: "Dr Priya Nair",
    postNominals: "MBBS, FRACGP",
    practiceName: "Riverside Family Practice",
    suburb: "Parramatta",
    state: "NSW",
    level: 2,
    specialty: "General Practice",
    modes: ["on-site"],
    availability: "accepting",
    bio: "Family GP and Level 2 supervisor focused on women's health and mental health in a busy multicultural community practice. Enjoys mentoring early-career IMGs.",
    yearsExperience: 8,
    clinicalInterests: [
      "Women's health",
      "Mental health",
      "Paediatrics",
      "Preventive care",
    ],
    languages: ["English", "Hindi", "Tamil"],
    practiceType: "Urban GP",
  },
  {
    id: "james-osullivan",
    name: "Dr James O'Sullivan",
    postNominals: "MBBS, FACRRM",
    practiceName: "Goldfields Rural Medical",
    suburb: "Mareeba",
    state: "QLD",
    level: 3,
    specialty: "Rural Generalist (GP)",
    modes: ["on-site", "remote"],
    availability: "waitlist",
    bio: "Rural generalist and Level 3 supervisor with extensive emergency and procedural experience. Supports IMGs settling into rural and remote practice across Far North Queensland.",
    yearsExperience: 16,
    clinicalInterests: [
      "Emergency medicine",
      "Procedural GP",
      "Aboriginal & Torres Strait Islander health",
      "Chronic disease",
    ],
    languages: ["English"],
    practiceType: "Rural GP",
  },
  {
    id: "mei-chen",
    name: "Dr Mei Chen",
    postNominals: "MBBS, FRACGP",
    practiceName: "Southbank Health Collective",
    suburb: "Southbank",
    state: "VIC",
    level: 1,
    specialty: "General Practice",
    modes: ["on-site"],
    availability: "accepting",
    bio: "On-site Level 1 supervisor at a teaching-focused metropolitan clinic, well suited to IMGs in the early stages of Limited registration. Passionate about structured day-one support.",
    yearsExperience: 5,
    clinicalInterests: [
      "Diabetes & endocrinology",
      "Preventive health",
      "Travel medicine",
    ],
    languages: ["English", "Mandarin", "Cantonese"],
    practiceType: "Urban GP",
  },
  {
    id: "david-thompson",
    name: "Dr David Thompson",
    postNominals: "MBBS, FRACGP",
    practiceName: "Adelaide Hills Medical",
    suburb: "Stirling",
    state: "SA",
    level: 2,
    specialty: "General Practice",
    modes: ["remote"],
    availability: "not-accepting",
    bio: "Level 2 supervisor offering remote supervision for experienced IMGs, with a focus on cardiovascular risk and men's health. Currently at capacity.",
    yearsExperience: 11,
    clinicalInterests: [
      "Cardiovascular health",
      "Men's health",
      "Chronic disease management",
    ],
    languages: ["English"],
    practiceType: "Urban GP / Telehealth",
  },
  {
    id: "aisha-rahman",
    name: "Dr Aisha Rahman",
    postNominals: "MBBS, FRACGP",
    practiceName: "Tamar Valley Family Health",
    suburb: "Launceston",
    state: "TAS",
    level: 2,
    specialty: "General Practice",
    modes: ["on-site", "remote"],
    availability: "waitlist",
    bio: "Level 2 supervisor with a strong interest in refugee and migrant health, supporting IMGs adapting to the Australian system in a regional Tasmanian setting.",
    yearsExperience: 7,
    clinicalInterests: [
      "Refugee & migrant health",
      "Chronic disease",
      "Antenatal shared care",
    ],
    languages: ["English", "Bengali"],
    practiceType: "Regional GP",
  },
];

/* ------------------------------------------------------------------ */
/* Accessors (swap these for Supabase queries later)                   */
/* ------------------------------------------------------------------ */

export function getSupervisors(): Supervisor[] {
  return SUPERVISORS;
}

export function getSupervisor(id: string): Supervisor | undefined {
  return SUPERVISORS.find((s) => s.id === id);
}

export function getInitials(name: string): string {
  // Drop a leading "Dr " then take first letters of the next two words.
  const cleaned = name.replace(/^Dr\.?\s+/i, "");
  return cleaned
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/* ------------------------------------------------------------------ */
/* Filter option config (labels + display metadata)                    */
/* ------------------------------------------------------------------ */

export const STATES: { value: AustralianState; label: string }[] = [
  { value: "WA", label: "Western Australia" },
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" },
];

export const LEVEL_INFO: Record<
  SupervisorLevel,
  { label: string; short: string; description: string }
> = {
  1: {
    label: "Level 1",
    short: "L1",
    description:
      "Practice-based, on-site supervisor for early-stage IMGs in Limited registration.",
  },
  2: {
    label: "Level 2",
    short: "L2",
    description:
      "Remote / general supervisor for more experienced IMGs needing less intensive oversight.",
  },
  3: {
    label: "Level 3",
    short: "L3",
    description:
      "Most experienced supervisor — can support complex IMG arrangements and other supervisors.",
  },
};

export const MODE_LABELS: Record<SupervisionMode, string> = {
  "on-site": "On-site",
  remote: "Remote",
};

export const AVAILABILITY_INFO: Record<
  Availability,
  { label: string; dotClass: string; badgeClass: string }
> = {
  accepting: {
    label: "Currently accepting",
    dotClass: "bg-emerald-500",
    badgeClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
  waitlist: {
    label: "Waitlist",
    dotClass: "bg-amber-500",
    badgeClass:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300",
  },
  "not-accepting": {
    label: "Not accepting",
    dotClass: "bg-rose-500",
    badgeClass:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300",
  },
};

export function describeModes(modes: SupervisionMode[]): string {
  if (modes.length >= 2) return "On-site or remote";
  return MODE_LABELS[modes[0]] ?? "—";
}

export const SUPERVISOR_DISCLAIMER =
  "PraximaIMG is a directory only and does not endorse or accredit individual supervisors. All credentials must be independently verified by practices and IMGs via the AHPRA public register. This is not legal or regulatory advice.";
