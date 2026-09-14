/**
 * EXCHANGE — mock student ecosystem.
 *
 * Simulation layer only. No backend calls: this module models a university
 * skill-exchange network that already feels active, so the prototype behaves
 * like a real product (matching, trust signals, activity, leaderboards).
 */

export type Faculty =
  | "FEB UI"
  | "Fasilkom UI"
  | "FIB UI"
  | "Psikologi UI"
  | "FISIP UI"
  | "FH UI"
  | "FT UI"
  | "FMIPA UI"
  | "FK UI"
  | "Vokasi UI";

export type ExchangeLevel =
  | "Skill Explorer"
  | "Contributor"
  | "Skill Specialist"
  | "Campus Mentor";

export type Goal = "internship" | "competition" | "organization" | "career";

export const goalLabels: Record<Goal, string> = {
  internship: "Prepare internship",
  competition: "Win competition",
  organization: "Lead organization",
  career: "Build career",
};

export type SkillCategory =
  | "business"
  | "technology"
  | "design"
  | "communication"
  | "career";

export const categoryLabels: Record<SkillCategory, string> = {
  business: "Business",
  technology: "Technology",
  design: "Design",
  communication: "Communication",
  career: "Career",
};

export type Student = {
  id: string;
  name: string;
  faculty: Faculty;
  major: string;
  year: number;
  photo: string; // initials placeholder
  bio: string;
  skillScore: number;
  level: ExchangeLevel;
  credits: number;
  rating: number;
  verifiedSkills: string[]; // skill ids
  teaching: { skillId: string; students: number; hours: number }[];
  learning: { skillId: string; progress: number }[];
  studentsHelped: number;
  exchangesCompleted: number;
  goals: Goal[];
  availability: string;
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  outcomes: string[];
  completedExchanges: number;
  verifiedTeachers: number;
  credits: number;
  durationMinutes: number;
  goals: Goal[];
  growth: number; // % growth in exchanges over the last 30 days
};

/* ------------------------------------------------------------------ skills */

export const skills: Skill[] = [
  {
    id: "business-case",
    name: "Business Case Framework",
    category: "business",
    level: "Beginner",
    description:
      "Structure any business problem the way case competition judges and consulting interviewers expect.",
    outcomes: [
      "Break a messy problem into a clean issue tree",
      "Choose the right framework instead of forcing one",
      "Present a recommendation in 3 minutes",
    ],
    completedExchanges: 61,
    verifiedTeachers: 14,
    credits: 5,
    durationMinutes: 45,
    goals: ["competition", "internship", "career"],
    growth: 34,
  },
  {
    id: "financial-modeling",
    name: "Financial Modeling",
    category: "business",
    level: "Beginner",
    description:
      "Build a working projection model in Excel from real company assumptions.",
    outcomes: [
      "Build a simple financial projection",
      "Understand revenue assumptions",
      "Create a basic valuation model",
    ],
    completedExchanges: 48,
    verifiedTeachers: 12,
    credits: 5,
    durationMinutes: 30,
    goals: ["internship", "competition", "career"],
    growth: 41,
  },
  {
    id: "excel-analytics",
    name: "Excel Analytics",
    category: "business",
    level: "Beginner",
    description:
      "Turn a raw spreadsheet into a decision-ready analysis with pivot tables and lookups.",
    outcomes: [
      "Clean and structure raw data",
      "Build pivot summaries recruiters ask for",
      "Automate repeated analysis with formulas",
    ],
    completedExchanges: 74,
    verifiedTeachers: 18,
    credits: 4,
    durationMinutes: 30,
    goals: ["internship", "career", "organization"],
    growth: 52,
  },
  {
    id: "marketing-strategy",
    name: "Marketing Strategy",
    category: "business",
    level: "Intermediate",
    description:
      "Move from audience insight to a positioning statement and campaign plan.",
    outcomes: [
      "Define a sharp target segment",
      "Write positioning that survives a critique",
      "Plan a campaign with measurable goals",
    ],
    completedExchanges: 37,
    verifiedTeachers: 9,
    credits: 5,
    durationMinutes: 45,
    goals: ["competition", "organization", "career"],
    growth: 18,
  },
  {
    id: "python-basic",
    name: "Python Basic",
    category: "technology",
    level: "Beginner",
    description:
      "Write your first useful Python scripts without a computer science background.",
    outcomes: [
      "Understand variables, loops, and functions",
      "Read and write files programmatically",
      "Debug your own errors calmly",
    ],
    completedExchanges: 83,
    verifiedTeachers: 21,
    credits: 5,
    durationMinutes: 45,
    goals: ["internship", "career"],
    growth: 47,
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    category: "technology",
    level: "Intermediate",
    description:
      "Take a real dataset from messy CSV to a chart that answers a question.",
    outcomes: [
      "Clean and join real datasets",
      "Choose the right chart for the claim",
      "Explain a finding to a non-technical audience",
    ],
    completedExchanges: 56,
    verifiedTeachers: 13,
    credits: 6,
    durationMinutes: 60,
    goals: ["internship", "competition", "career"],
    growth: 38,
  },
  {
    id: "web-development",
    name: "Website Development",
    category: "technology",
    level: "Beginner",
    description:
      "Ship a small live website for your organization or portfolio.",
    outcomes: [
      "Structure a page with HTML and CSS",
      "Add interactivity with JavaScript",
      "Deploy so anyone can open the link",
    ],
    completedExchanges: 45,
    verifiedTeachers: 11,
    credits: 6,
    durationMinutes: 60,
    goals: ["organization", "internship", "career"],
    growth: 22,
  },
  {
    id: "ai-automation",
    name: "Automation with AI Tools",
    category: "technology",
    level: "Beginner",
    description:
      "Use AI tools responsibly to remove repetitive academic and organizational work.",
    outcomes: [
      "Design prompts that produce reliable output",
      "Automate a recurring weekly task",
      "Check AI output for factual risk",
    ],
    completedExchanges: 92,
    verifiedTeachers: 16,
    credits: 4,
    durationMinutes: 30,
    goals: ["organization", "internship", "career"],
    growth: 68,
  },
  {
    id: "canva-design",
    name: "Canva Design",
    category: "design",
    level: "Beginner",
    description:
      "Produce clean event and campaign visuals fast, without a design degree.",
    outcomes: [
      "Apply a consistent visual system",
      "Design a poster set for one event",
      "Export correctly for print and social",
    ],
    completedExchanges: 68,
    verifiedTeachers: 17,
    credits: 3,
    durationMinutes: 30,
    goals: ["organization", "career"],
    growth: 29,
  },
  {
    id: "presentation-design",
    name: "Presentation Design",
    category: "design",
    level: "Beginner",
    description:
      "Turn a dense deck into a story judges and recruiters can follow.",
    outcomes: [
      "Build one message per slide",
      "Use hierarchy instead of decoration",
      "Design a closing slide that lands",
    ],
    completedExchanges: 53,
    verifiedTeachers: 12,
    credits: 4,
    durationMinutes: 30,
    goals: ["competition", "internship", "organization"],
    growth: 31,
  },
  {
    id: "video-editing",
    name: "Video Editing",
    category: "design",
    level: "Beginner",
    description:
      "Edit a short campus or portfolio video with clean pacing and sound.",
    outcomes: [
      "Cut footage to a tight narrative",
      "Balance audio levels properly",
      "Export for social platforms",
    ],
    completedExchanges: 34,
    verifiedTeachers: 8,
    credits: 4,
    durationMinutes: 45,
    goals: ["organization", "career"],
    growth: 15,
  },
  {
    id: "public-speaking",
    name: "Public Speaking",
    category: "communication",
    level: "Intermediate",
    description:
      "Speak with structure and presence under real pressure, with live feedback.",
    outcomes: [
      "Open a talk without filler",
      "Control pace, pause, and posture",
      "Handle hard questions confidently",
    ],
    completedExchanges: 71,
    verifiedTeachers: 15,
    credits: 5,
    durationMinutes: 45,
    goals: ["competition", "organization", "career"],
    growth: 44,
  },
  {
    id: "academic-writing",
    name: "Academic Writing",
    category: "communication",
    level: "Intermediate",
    description:
      "Write a paper section that a reviewer can follow and a lecturer can grade well.",
    outcomes: [
      "Build a defensible argument structure",
      "Integrate sources without padding",
      "Edit for clarity, not length",
    ],
    completedExchanges: 42,
    verifiedTeachers: 10,
    credits: 5,
    durationMinutes: 60,
    goals: ["competition", "career"],
    growth: 17,
  },
  {
    id: "english-presentation",
    name: "English Presentation",
    category: "communication",
    level: "Intermediate",
    description:
      "Present professionally in English, from phrasing to Q&A handling.",
    outcomes: [
      "Use precise professional phrasing",
      "Reduce hesitation in Q&A",
      "Present a 5-minute pitch in English",
    ],
    completedExchanges: 39,
    verifiedTeachers: 11,
    credits: 5,
    durationMinutes: 45,
    goals: ["internship", "competition", "career"],
    growth: 26,
  },
  {
    id: "cv-optimization",
    name: "CV Optimization",
    category: "career",
    level: "Beginner",
    description:
      "Rewrite your CV around evidence and impact instead of responsibilities.",
    outcomes: [
      "Write achievement bullets with numbers",
      "Pass a first screening read in 8 seconds",
      "Tailor one CV per role family",
    ],
    completedExchanges: 88,
    verifiedTeachers: 19,
    credits: 3,
    durationMinutes: 30,
    goals: ["internship", "career"],
    growth: 57,
  },
  {
    id: "linkedin-branding",
    name: "LinkedIn Branding",
    category: "career",
    level: "Beginner",
    description:
      "Build a profile recruiters actually find, read, and trust.",
    outcomes: [
      "Write a headline that states value",
      "Turn activity into visible credibility",
      "Reach out to alumni without sounding generic",
    ],
    completedExchanges: 64,
    verifiedTeachers: 14,
    credits: 3,
    durationMinutes: 30,
    goals: ["internship", "career"],
    growth: 49,
  },
  {
    id: "interview-preparation",
    name: "Interview Preparation",
    category: "career",
    level: "Intermediate",
    description:
      "Practice real interview rounds with a peer who has passed them.",
    outcomes: [
      "Answer behavioural questions with STAR",
      "Handle case and technical probes",
      "Close an interview with good questions",
    ],
    completedExchanges: 57,
    verifiedTeachers: 13,
    credits: 5,
    durationMinutes: 45,
    goals: ["internship", "career"],
    growth: 39,
  },
];

export const skillById = Object.fromEntries(skills.map((s) => [s.id, s])) as Record<string, Skill>;

/* ---------------------------------------------------------------- students */

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");
}

type StudentSeed = Omit<Student, "photo" | "level"> & { level?: ExchangeLevel };

function levelFor(score: number): ExchangeLevel {
  if (score >= 900) return "Campus Mentor";
  if (score >= 780) return "Skill Specialist";
  if (score >= 560) return "Contributor";
  return "Skill Explorer";
}

const studentSeeds: StudentSeed[] = [
  {
    id: "nadia-putri",
    name: "Nadia Putri",
    faculty: "FEB UI",
    major: "Management",
    year: 3,
    bio: "Interested in business strategy, financial analysis, and helping students prepare for case competitions.",
    skillScore: 942,
    credits: 125,
    rating: 4.9,
    verifiedSkills: ["financial-modeling", "business-case", "excel-analytics"],
    teaching: [
      { skillId: "financial-modeling", students: 24, hours: 11 },
      { skillId: "business-case", students: 14, hours: 9 },
    ],
    learning: [{ skillId: "data-analysis", progress: 55 }],
    studentsHelped: 38,
    exchangesCompleted: 46,
    goals: ["competition", "career"],
    availability: "Weekdays 16:00–20:00",
  },
  {
    id: "raka-mahendra",
    name: "Raka Mahendra",
    faculty: "Fasilkom UI",
    major: "Computer Science",
    year: 3,
    bio: "Backend-leaning student who likes explaining code to non-tech friends. Preparing for a product internship.",
    skillScore: 842,
    credits: 125,
    rating: 4.8,
    verifiedSkills: ["python-basic", "excel-analytics", "web-development", "ai-automation"],
    teaching: [
      { skillId: "python-basic", students: 11, hours: 8 },
      { skillId: "ai-automation", students: 4, hours: 4 },
    ],
    learning: [
      { skillId: "excel-analytics", progress: 80 },
      { skillId: "public-speaking", progress: 60 },
      { skillId: "python-basic", progress: 30 },
    ],
    studentsHelped: 15,
    exchangesCompleted: 31,
    goals: ["internship", "career"],
    availability: "Evenings after 19:00",
  },
  {
    id: "alya-rahmadani",
    name: "Alya Rahmadani",
    faculty: "FISIP UI",
    major: "Communication Science",
    year: 4,
    bio: "Debate alumna. I coach students who freeze the moment a microphone appears.",
    skillScore: 918,
    credits: 164,
    rating: 5.0,
    verifiedSkills: ["public-speaking", "english-presentation", "presentation-design"],
    teaching: [
      { skillId: "public-speaking", students: 29, hours: 18 },
      { skillId: "english-presentation", students: 12, hours: 7 },
    ],
    learning: [{ skillId: "excel-analytics", progress: 35 }],
    studentsHelped: 41,
    exchangesCompleted: 52,
    goals: ["competition", "career"],
    availability: "Tue & Thu 15:00–18:00",
  },
  {
    id: "dimas-prasetyo",
    name: "Dimas Prasetyo",
    faculty: "FEB UI",
    major: "Accounting",
    year: 3,
    bio: "Spreadsheet person. I believe every finance concept can be taught with one clean model.",
    skillScore: 806,
    credits: 98,
    rating: 4.8,
    verifiedSkills: ["excel-analytics", "financial-modeling"],
    teaching: [{ skillId: "excel-analytics", students: 19, hours: 10 }],
    learning: [{ skillId: "python-basic", progress: 45 }],
    studentsHelped: 22,
    exchangesCompleted: 28,
    goals: ["internship", "career"],
    availability: "Weekends 09:00–12:00",
  },
  {
    id: "sinta-larasati",
    name: "Sinta Larasati",
    faculty: "Psikologi UI",
    major: "Psychology",
    year: 3,
    bio: "Researching learning motivation. I help peers write papers that stay readable.",
    skillScore: 774,
    credits: 88,
    rating: 4.9,
    verifiedSkills: ["academic-writing", "public-speaking"],
    teaching: [{ skillId: "academic-writing", students: 16, hours: 12 }],
    learning: [{ skillId: "data-analysis", progress: 40 }],
    studentsHelped: 19,
    exchangesCompleted: 25,
    goals: ["competition", "career"],
    availability: "Mon & Wed 13:00–16:00",
  },
  {
    id: "bagas-wicaksono",
    name: "Bagas Wicaksono",
    faculty: "Fasilkom UI",
    major: "Information Systems",
    year: 4,
    bio: "Built three campus websites. Happy to walk anyone through their first deploy.",
    skillScore: 861,
    credits: 142,
    rating: 4.7,
    verifiedSkills: ["web-development", "python-basic", "ai-automation"],
    teaching: [
      { skillId: "web-development", students: 17, hours: 14 },
      { skillId: "ai-automation", students: 9, hours: 5 },
    ],
    learning: [{ skillId: "cv-optimization", progress: 65 }],
    studentsHelped: 26,
    exchangesCompleted: 34,
    goals: ["internship", "career"],
    availability: "Fri 16:00–21:00",
  },
  {
    id: "keisha-anindita",
    name: "Keisha Anindita",
    faculty: "FIB UI",
    major: "English Studies",
    year: 3,
    bio: "Translator in training. I fix the sentences that make good ideas sound unsure.",
    skillScore: 728,
    credits: 76,
    rating: 4.9,
    verifiedSkills: ["english-presentation", "academic-writing"],
    teaching: [{ skillId: "english-presentation", students: 15, hours: 9 }],
    learning: [{ skillId: "canva-design", progress: 50 }],
    studentsHelped: 18,
    exchangesCompleted: 23,
    goals: ["internship", "career"],
    availability: "Weekdays 10:00–13:00",
  },
  {
    id: "fajar-nugroho",
    name: "Fajar Nugroho",
    faculty: "FT UI",
    major: "Industrial Engineering",
    year: 4,
    bio: "Process-obsessed. I teach automation so student organizations stop doing manual recaps.",
    skillScore: 795,
    credits: 110,
    rating: 4.7,
    verifiedSkills: ["ai-automation", "excel-analytics"],
    teaching: [{ skillId: "ai-automation", students: 21, hours: 11 }],
    learning: [{ skillId: "interview-preparation", progress: 70 }],
    studentsHelped: 24,
    exchangesCompleted: 30,
    goals: ["internship", "organization"],
    availability: "Sat 10:00–15:00",
  },
  {
    id: "putri-maharani",
    name: "Putri Maharani",
    faculty: "Vokasi UI",
    major: "Advertising & Marketing Communication",
    year: 2,
    bio: "Agency intern. I design campaign visuals fast and teach others to do the same.",
    skillScore: 682,
    credits: 64,
    rating: 4.8,
    verifiedSkills: ["canva-design", "video-editing"],
    teaching: [{ skillId: "canva-design", students: 23, hours: 10 }],
    learning: [{ skillId: "marketing-strategy", progress: 45 }],
    studentsHelped: 27,
    exchangesCompleted: 29,
    goals: ["organization", "career"],
    availability: "Weeknights 20:00–22:00",
  },
  {
    id: "gilang-satria",
    name: "Gilang Satria",
    faculty: "FMIPA UI",
    major: "Statistics",
    year: 3,
    bio: "I like the moment a messy dataset finally answers a question.",
    skillScore: 833,
    credits: 121,
    rating: 4.9,
    verifiedSkills: ["data-analysis", "python-basic", "excel-analytics"],
    teaching: [
      { skillId: "data-analysis", students: 18, hours: 13 },
      { skillId: "python-basic", students: 12, hours: 8 },
    ],
    learning: [{ skillId: "public-speaking", progress: 30 }],
    studentsHelped: 30,
    exchangesCompleted: 37,
    goals: ["internship", "competition"],
    availability: "Wed & Fri 14:00–18:00",
  },
  {
    id: "amanda-syafira",
    name: "Amanda Syafira",
    faculty: "FH UI",
    major: "Law",
    year: 4,
    bio: "Moot court finalist. Argument structure is a transferable skill, not a legal one.",
    skillScore: 787,
    credits: 95,
    rating: 4.8,
    verifiedSkills: ["public-speaking", "academic-writing"],
    teaching: [{ skillId: "public-speaking", students: 14, hours: 10 }],
    learning: [{ skillId: "linkedin-branding", progress: 55 }],
    studentsHelped: 17,
    exchangesCompleted: 22,
    goals: ["competition", "career"],
    availability: "Thu 09:00–12:00",
  },
  {
    id: "rizky-hidayat",
    name: "Rizky Hidayat",
    faculty: "FEB UI",
    major: "Business Economics",
    year: 3,
    bio: "Two national case competitions later, I mostly teach how to stay calm in Q&A.",
    skillScore: 869,
    credits: 133,
    rating: 4.9,
    verifiedSkills: ["business-case", "presentation-design", "financial-modeling"],
    teaching: [
      { skillId: "business-case", students: 22, hours: 15 },
      { skillId: "presentation-design", students: 10, hours: 6 },
    ],
    learning: [{ skillId: "data-analysis", progress: 60 }],
    studentsHelped: 32,
    exchangesCompleted: 39,
    goals: ["competition", "internship"],
    availability: "Weekdays 17:00–20:00",
  },
  {
    id: "tiara-ramadhani",
    name: "Tiara Ramadhani",
    faculty: "Psikologi UI",
    major: "Industrial & Organizational Psychology",
    year: 4,
    bio: "I have sat on the recruiter side of campus hiring. CVs are my favourite puzzle.",
    skillScore: 901,
    credits: 148,
    rating: 5.0,
    verifiedSkills: ["cv-optimization", "interview-preparation", "linkedin-branding"],
    teaching: [
      { skillId: "cv-optimization", students: 31, hours: 16 },
      { skillId: "interview-preparation", students: 18, hours: 12 },
    ],
    learning: [{ skillId: "excel-analytics", progress: 40 }],
    studentsHelped: 44,
    exchangesCompleted: 51,
    goals: ["career", "internship"],
    availability: "Tue 18:00–21:00",
  },
  {
    id: "yoga-permana",
    name: "Yoga Permana",
    faculty: "Fasilkom UI",
    major: "Computer Science",
    year: 2,
    bio: "First-time teacher on EXCHANGE. Learning Python together is faster than learning alone.",
    skillScore: 548,
    credits: 52,
    rating: 4.6,
    verifiedSkills: ["python-basic"],
    teaching: [{ skillId: "python-basic", students: 6, hours: 4 }],
    learning: [
      { skillId: "web-development", progress: 35 },
      { skillId: "cv-optimization", progress: 20 },
    ],
    studentsHelped: 6,
    exchangesCompleted: 11,
    goals: ["internship"],
    availability: "Weekends 13:00–17:00",
  },
  {
    id: "salsabila-hana",
    name: "Salsabila Hana",
    faculty: "FIB UI",
    major: "History",
    year: 3,
    bio: "Archive research taught me how to write. Now I help others structure long papers.",
    skillScore: 641,
    credits: 71,
    rating: 4.7,
    verifiedSkills: ["academic-writing"],
    teaching: [{ skillId: "academic-writing", students: 9, hours: 7 }],
    learning: [{ skillId: "canva-design", progress: 60 }],
    studentsHelped: 11,
    exchangesCompleted: 16,
    goals: ["competition", "career"],
    availability: "Mon 10:00–13:00",
  },
  {
    id: "arif-santoso",
    name: "Arif Santoso",
    faculty: "FT UI",
    major: "Civil Engineering",
    year: 4,
    bio: "Organization treasurer twice over. Spreadsheets saved my sanity.",
    skillScore: 712,
    credits: 84,
    rating: 4.6,
    verifiedSkills: ["excel-analytics", "presentation-design"],
    teaching: [{ skillId: "excel-analytics", students: 13, hours: 8 }],
    learning: [{ skillId: "interview-preparation", progress: 45 }],
    studentsHelped: 15,
    exchangesCompleted: 20,
    goals: ["organization", "internship"],
    availability: "Sat 09:00–12:00",
  },
  {
    id: "citra-ayu",
    name: "Citra Ayu Lestari",
    faculty: "Vokasi UI",
    major: "Physiotherapy",
    year: 2,
    bio: "Health campaigns need clear posters. I make them and teach the process.",
    skillScore: 596,
    credits: 58,
    rating: 4.7,
    verifiedSkills: ["canva-design"],
    teaching: [{ skillId: "canva-design", students: 10, hours: 5 }],
    learning: [{ skillId: "public-speaking", progress: 25 }],
    studentsHelped: 10,
    exchangesCompleted: 14,
    goals: ["organization"],
    availability: "Weeknights 19:00–21:00",
  },
  {
    id: "hafiz-alfarizi",
    name: "Hafiz Alfarizi",
    faculty: "FK UI",
    major: "Medicine",
    year: 4,
    bio: "Presenting cases daily made me care about slide clarity more than slide beauty.",
    skillScore: 758,
    credits: 92,
    rating: 4.8,
    verifiedSkills: ["presentation-design", "academic-writing"],
    teaching: [{ skillId: "presentation-design", students: 12, hours: 7 }],
    learning: [{ skillId: "ai-automation", progress: 50 }],
    studentsHelped: 14,
    exchangesCompleted: 19,
    goals: ["competition", "career"],
    availability: "Sun 14:00–18:00",
  },
  {
    id: "maria-tobing",
    name: "Maria Tobing",
    faculty: "FISIP UI",
    major: "International Relations",
    year: 3,
    bio: "MUN regular. English fluency is practice, not talent.",
    skillScore: 803,
    credits: 106,
    rating: 4.9,
    verifiedSkills: ["english-presentation", "public-speaking"],
    teaching: [{ skillId: "english-presentation", students: 20, hours: 12 }],
    learning: [{ skillId: "linkedin-branding", progress: 40 }],
    studentsHelped: 25,
    exchangesCompleted: 31,
    goals: ["competition", "career"],
    availability: "Wed 16:00–19:00",
  },
  {
    id: "dhika-pratama",
    name: "Dhika Pratama",
    faculty: "FMIPA UI",
    major: "Mathematics",
    year: 3,
    bio: "I explain statistics without the jargon wall.",
    skillScore: 769,
    credits: 89,
    rating: 4.8,
    verifiedSkills: ["data-analysis", "excel-analytics"],
    teaching: [{ skillId: "data-analysis", students: 14, hours: 10 }],
    learning: [{ skillId: "english-presentation", progress: 35 }],
    studentsHelped: 18,
    exchangesCompleted: 24,
    goals: ["internship", "competition"],
    availability: "Tue & Thu 13:00–16:00",
  },
  {
    id: "laras-wulandari",
    name: "Laras Wulandari",
    faculty: "FEB UI",
    major: "Marketing",
    year: 3,
    bio: "Brand strategy is my hobby and my part-time job.",
    skillScore: 741,
    credits: 87,
    rating: 4.7,
    verifiedSkills: ["marketing-strategy", "canva-design"],
    teaching: [{ skillId: "marketing-strategy", students: 15, hours: 9 }],
    learning: [{ skillId: "data-analysis", progress: 30 }],
    studentsHelped: 17,
    exchangesCompleted: 21,
    goals: ["competition", "career"],
    availability: "Fri 15:00–18:00",
  },
  {
    id: "ilham-kurniawan",
    name: "Ilham Kurniawan",
    faculty: "Fasilkom UI",
    major: "Information Systems",
    year: 3,
    bio: "I automate everything I have to do twice, then teach it.",
    skillScore: 812,
    credits: 118,
    rating: 4.8,
    verifiedSkills: ["ai-automation", "web-development", "python-basic"],
    teaching: [{ skillId: "ai-automation", students: 24, hours: 12 }],
    learning: [{ skillId: "public-speaking", progress: 45 }],
    studentsHelped: 28,
    exchangesCompleted: 33,
    goals: ["internship", "organization"],
    availability: "Weekdays 20:00–22:00",
  },
  {
    id: "annisa-fadhilah",
    name: "Annisa Fadhilah",
    faculty: "Psikologi UI",
    major: "Psychology",
    year: 2,
    bio: "Peer counsellor. Interview nerves are mostly a preparation problem.",
    skillScore: 604,
    credits: 61,
    rating: 4.7,
    verifiedSkills: ["interview-preparation"],
    teaching: [{ skillId: "interview-preparation", students: 8, hours: 6 }],
    learning: [{ skillId: "cv-optimization", progress: 55 }],
    studentsHelped: 9,
    exchangesCompleted: 15,
    goals: ["internship", "career"],
    availability: "Mon 15:00–18:00",
  },
  {
    id: "bayu-saputra",
    name: "Bayu Saputra",
    faculty: "Vokasi UI",
    major: "Broadcasting & Digital Media",
    year: 2,
    bio: "Campus videographer. Editing rhythm is a teachable craft.",
    skillScore: 573,
    credits: 54,
    rating: 4.6,
    verifiedSkills: ["video-editing"],
    teaching: [{ skillId: "video-editing", students: 11, hours: 8 }],
    learning: [{ skillId: "canva-design", progress: 65 }],
    studentsHelped: 11,
    exchangesCompleted: 14,
    goals: ["organization", "career"],
    availability: "Sat 13:00–18:00",
  },
  {
    id: "farhan-abdullah",
    name: "Farhan Abdullah",
    faculty: "FT UI",
    major: "Electrical Engineering",
    year: 4,
    bio: "Robotics team lead. I teach Python through things that move.",
    skillScore: 826,
    credits: 127,
    rating: 4.9,
    verifiedSkills: ["python-basic", "data-analysis"],
    teaching: [{ skillId: "python-basic", students: 19, hours: 14 }],
    learning: [{ skillId: "interview-preparation", progress: 50 }],
    studentsHelped: 23,
    exchangesCompleted: 29,
    goals: ["internship", "competition"],
    availability: "Thu 18:00–21:00",
  },
  {
    id: "gita-permatasari",
    name: "Gita Permatasari",
    faculty: "FH UI",
    major: "Law",
    year: 3,
    bio: "Legal writing trained my structure. Now I help students argue on paper.",
    skillScore: 667,
    credits: 73,
    rating: 4.7,
    verifiedSkills: ["academic-writing"],
    teaching: [{ skillId: "academic-writing", students: 10, hours: 7 }],
    learning: [{ skillId: "english-presentation", progress: 40 }],
    studentsHelped: 12,
    exchangesCompleted: 17,
    goals: ["competition", "career"],
    availability: "Wed 10:00–13:00",
  },
  {
    id: "reza-adiputra",
    name: "Reza Adiputra",
    faculty: "FEB UI",
    major: "Management",
    year: 4,
    bio: "Ex-startup intern. I teach the version of financial modeling that survives real meetings.",
    skillScore: 884,
    credits: 139,
    rating: 4.9,
    verifiedSkills: ["financial-modeling", "excel-analytics", "business-case"],
    teaching: [
      { skillId: "financial-modeling", students: 21, hours: 13 },
      { skillId: "excel-analytics", students: 15, hours: 8 },
    ],
    learning: [{ skillId: "python-basic", progress: 55 }],
    studentsHelped: 33,
    exchangesCompleted: 41,
    goals: ["internship", "career"],
    availability: "Weekdays 19:00–21:00",
  },
  {
    id: "nabila-syakira",
    name: "Nabila Syakira",
    faculty: "FIB UI",
    major: "Japanese Studies",
    year: 3,
    bio: "Language learner turned language coach. Fluency grows in conversation.",
    skillScore: 655,
    credits: 69,
    rating: 4.8,
    verifiedSkills: ["english-presentation"],
    teaching: [{ skillId: "english-presentation", students: 12, hours: 8 }],
    learning: [{ skillId: "presentation-design", progress: 50 }],
    studentsHelped: 13,
    exchangesCompleted: 18,
    goals: ["career", "competition"],
    availability: "Tue 10:00–13:00",
  },
  {
    id: "aditya-firmansyah",
    name: "Aditya Firmansyah",
    faculty: "FMIPA UI",
    major: "Physics",
    year: 4,
    bio: "Teaching assistant. Explaining hard things simply is the whole job.",
    skillScore: 779,
    credits: 97,
    rating: 4.8,
    verifiedSkills: ["academic-writing", "data-analysis"],
    teaching: [{ skillId: "data-analysis", students: 13, hours: 9 }],
    learning: [{ skillId: "linkedin-branding", progress: 35 }],
    studentsHelped: 16,
    exchangesCompleted: 22,
    goals: ["career", "internship"],
    availability: "Fri 09:00–12:00",
  },
  {
    id: "kevin-tanjung",
    name: "Kevin Tanjung",
    faculty: "FK UI",
    major: "Medicine",
    year: 3,
    bio: "Med student who runs an LinkedIn study group for health students.",
    skillScore: 698,
    credits: 79,
    rating: 4.7,
    verifiedSkills: ["linkedin-branding", "cv-optimization"],
    teaching: [{ skillId: "linkedin-branding", students: 17, hours: 8 }],
    learning: [{ skillId: "public-speaking", progress: 40 }],
    studentsHelped: 19,
    exchangesCompleted: 24,
    goals: ["career"],
    availability: "Sun 10:00–13:00",
  },
  {
    id: "dinda-ayuningtyas",
    name: "Dinda Ayuningtyas",
    faculty: "FISIP UI",
    major: "Sociology",
    year: 3,
    bio: "Community organizer. Good campaigns start with a clear message.",
    skillScore: 634,
    credits: 66,
    rating: 4.6,
    verifiedSkills: ["marketing-strategy", "canva-design"],
    teaching: [{ skillId: "marketing-strategy", students: 9, hours: 6 }],
    learning: [{ skillId: "video-editing", progress: 30 }],
    studentsHelped: 10,
    exchangesCompleted: 15,
    goals: ["organization", "career"],
    availability: "Mon 16:00–19:00",
  },
  {
    id: "satria-anugrah",
    name: "Satria Anugrah",
    faculty: "FH UI",
    major: "Law",
    year: 2,
    bio: "New here. Trading my writing help for anything spreadsheet related.",
    skillScore: 512,
    credits: 45,
    rating: 4.5,
    verifiedSkills: [],
    teaching: [],
    learning: [
      { skillId: "excel-analytics", progress: 25 },
      { skillId: "cv-optimization", progress: 15 },
    ],
    studentsHelped: 2,
    exchangesCompleted: 5,
    goals: ["internship"],
    availability: "Weekends flexible",
  },
];

export const students: Student[] = studentSeeds.map((seed) => ({
  ...seed,
  photo: initials(seed.name),
  level: seed.level ?? levelFor(seed.skillScore),
}));

export const studentById = Object.fromEntries(students.map((s) => [s.id, s])) as Record<string, Student>;

/** The signed-in student for this simulation. */
export const currentStudent = studentById["raka-mahendra"]!;

export const faculties: Faculty[] = [
  "FEB UI",
  "Fasilkom UI",
  "FIB UI",
  "Psikologi UI",
  "FISIP UI",
  "FH UI",
  "FT UI",
  "FMIPA UI",
  "FK UI",
  "Vokasi UI",
];

/* --------------------------------------------------------------- offerings */

export type Offering = {
  id: string;
  skill: Skill;
  teacher: Student;
  studentsHelped: number;
  rating: number;
  verified: boolean;
  availability: string;
};

export const offerings: Offering[] = students.flatMap((teacher) =>
  teacher.teaching
    .filter((entry) => skillById[entry.skillId])
    .map((entry) => ({
      id: `${teacher.id}--${entry.skillId}`,
      skill: skillById[entry.skillId]!,
      teacher,
      studentsHelped: entry.students,
      rating: teacher.rating,
      verified: teacher.verifiedSkills.includes(entry.skillId),
      availability: teacher.availability,
    }))
);

/* ---------------------------------------------------------------- matching */

export type MatchBreakdown = {
  score: number;
  reasons: string[];
  components: { label: string; weight: number; earned: number }[];
};

/**
 * Rule-based match score (no AI).
 *   Skill relevance 40% · Goal compatibility 30% · Availability 20% · Rating 10%
 */
export function matchScore(offering: Offering, viewer: Student = currentStudent): MatchBreakdown {
  const reasons: string[] = [];

  // Skill relevance — is the viewer already learning it, or is it adjacent?
  const learning = viewer.learning.find((l) => l.skillId === offering.skill.id);
  const alreadyVerified = viewer.verifiedSkills.includes(offering.skill.id);
  let relevance = 0.45;
  if (learning) {
    relevance = 1;
    reasons.push("Already on your learning list");
  } else if (alreadyVerified) {
    relevance = 0.6;
    reasons.push("Deepens a skill you already hold");
  } else if (offering.skill.goals.some((g) => viewer.goals.includes(g))) {
    relevance = 0.8;
    reasons.push("Fills a gap in your current goal");
  }

  // Goal compatibility
  const sharedGoals = offering.skill.goals.filter((g) => viewer.goals.includes(g));
  const goalFit = sharedGoals.length >= 2 ? 1 : sharedGoals.length === 1 ? 0.75 : 0.3;
  if (sharedGoals[0]) reasons.push(`Supports your ${goalLabels[sharedGoals[0]].toLowerCase()} goal`);

  // Availability — overlapping window with the viewer
  const viewerEvening = /even|19|20|21|22/i.test(viewer.availability);
  const teacherEvening = /even|17|18|19|20|21|22/i.test(offering.availability);
  const weekendBoth = /sat|sun|weekend/i.test(viewer.availability) && /sat|sun|weekend/i.test(offering.availability);
  const availability = viewerEvening && teacherEvening ? 1 : weekendBoth ? 0.85 : 0.5;
  if (availability >= 0.85) reasons.push("Schedules overlap this week");

  // Rating
  const rating = Math.min(1, (offering.rating - 4) / 1);
  if (offering.rating >= 4.8) reasons.push("High teacher rating from peers");
  if (offering.skill.level === "Beginner") reasons.push("Beginner friendly");

  const components = [
    { label: "Skill relevance", weight: 40, earned: Math.round(relevance * 40) },
    { label: "Goal compatibility", weight: 30, earned: Math.round(goalFit * 30) },
    { label: "Availability", weight: 20, earned: Math.round(availability * 20) },
    { label: "Teacher rating", weight: 10, earned: Math.round(rating * 10) },
  ];

  return {
    score: components.reduce((sum, c) => sum + c.earned, 0),
    reasons: reasons.slice(0, 3),
    components,
  };
}

export function rankedOfferings(viewer: Student = currentStudent) {
  return offerings
    .filter((offering) => offering.teacher.id !== viewer.id)
    .map((offering) => ({ offering, match: matchScore(offering, viewer) }))
    .sort((a, b) => b.match.score - a.match.score);
}


/** Skills recommended for the viewer's stated goals. */
export function recommendedSkills(viewer: Student = currentStudent, limit = 3) {
  return skills
    .filter((skill) => skill.goals.some((g) => viewer.goals.includes(g)))
    .filter((skill) => !viewer.teaching.some((t) => t.skillId === skill.id))
    .sort((a, b) => b.growth - a.growth)
    .slice(0, limit);
}

export const trendingSkills = [...skills].sort((a, b) => b.growth - a.growth).slice(0, 4);
export const mostExchangedSkills = [...skills]
  .sort((a, b) => b.completedExchanges - a.completedExchanges)
  .slice(0, 4);

export function offeringsFromFaculty(faculty: Faculty) {
  return offerings.filter(
    (o) => o.teacher.faculty === faculty && o.teacher.id !== currentStudent.id,
  );
}

export function offeringsAcrossCampus(faculty: Faculty) {
  return offerings.filter((o) => o.teacher.faculty !== faculty);
}


/* ----------------------------------------------------------- activity feed */

export type ActivityItem = {
  id: string;
  kind: "learned" | "taught" | "verified" | "joined";
  actorId: string;
  peerId?: string;
  skillId?: string;
  detail: string;
  outcome: string;
  when: string;
};

export const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    kind: "learned",
    actorId: "raka-mahendra",
    peerId: "dimas-prasetyo",
    skillId: "excel-analytics",
    detail: "completed an Excel Analytics session",
    outcome: "Skill progress updated · 80%",
    when: "2 hours ago",
  },
  {
    id: "a2",
    kind: "taught",
    actorId: "nadia-putri",
    skillId: "business-case",
    detail: "taught Business Case Framework to 3 students",
    outcome: "+10 Credits earned",
    when: "4 hours ago",
  },
  {
    id: "a3",
    kind: "verified",
    actorId: "alya-rahmadani",
    skillId: "public-speaking",
    detail: "passed the Public Speaking assessment",
    outcome: "Verified Intermediate unlocked",
    when: "6 hours ago",
  },
  {
    id: "a4",
    kind: "learned",
    actorId: "yoga-permana",
    peerId: "farhan-abdullah",
    skillId: "python-basic",
    detail: "completed a Python Basic session",
    outcome: "First verified evidence added",
    when: "Yesterday",
  },
  {
    id: "a5",
    kind: "taught",
    actorId: "tiara-ramadhani",
    skillId: "cv-optimization",
    detail: "taught CV Optimization to 2 students",
    outcome: "+6 Credits earned",
    when: "Yesterday",
  },
  {
    id: "a6",
    kind: "learned",
    actorId: "citra-ayu",
    peerId: "putri-maharani",
    skillId: "canva-design",
    detail: "completed a Canva Design session",
    outcome: "Skill progress updated · 65%",
    when: "2 days ago",
  },
  {
    id: "a7",
    kind: "taught",
    actorId: "ilham-kurniawan",
    skillId: "ai-automation",
    detail: "taught Automation with AI Tools to 4 students",
    outcome: "+12 Credits earned",
    when: "2 days ago",
  },
  {
    id: "a8",
    kind: "joined",
    actorId: "satria-anugrah",
    detail: "joined EXCHANGE from FH UI",
    outcome: "Looking for an Excel Analytics mentor",
    when: "3 days ago",
  },
];

/* ------------------------------------------------------------ leaderboards */

export const topContributors = [...students]
  .sort((a, b) => b.skillScore - a.skillScore)
  .slice(0, 8);

export const topMentors = [...students]
  .sort((a, b) => b.studentsHelped - a.studentsHelped)
  .slice(0, 8);

export const mostHelpful = [...students]
  .filter((s) => s.rating >= 4.8)
  .sort((a, b) => b.rating - a.rating || b.exchangesCompleted - a.exchangesCompleted)
  .slice(0, 8);

export const fastestGrowingSkills = [...skills].sort((a, b) => b.growth - a.growth).slice(0, 8);

export function teachingHours(student: Student) {
  return student.teaching.reduce((sum, t) => sum + t.hours, 0);
}

/* --------------------------------------------------------------- passport */

export type EvidenceLine = { label: string; met: boolean };

export function passportSkills(student: Student = currentStudent) {
  const ids = new Set([
    ...student.verifiedSkills,
    ...student.learning.map((l) => l.skillId),
    ...student.teaching.map((t) => t.skillId),
  ]);

  return [...ids]
    .filter((id) => skillById[id])
    .map((id) => {
      const skill = skillById[id]!;
      const taught = student.teaching.find((t) => t.skillId === id);
      const learned = student.learning.find((l) => l.skillId === id);
      const verified = student.verifiedSkills.includes(id);
      const learningSessions = learned ? Math.max(2, Math.round(learned.progress / 10)) : 4;
      const evidence: EvidenceLine[] = [
        { label: `Completed ${learningSessions} learning sessions`, met: true },
        {
          label: taught ? `Taught ${taught.students} students` : "Not taught yet",
          met: Boolean(taught),
        },
        { label: verified ? "Passed assessment" : "Assessment scheduled", met: verified },
        { label: `Rating ${student.rating.toFixed(1)}`, met: true },
      ];
      return {
        skill,
        verified,
        level: verified ? `Verified ${skill.level}` : "In progress",
        competency: verified ? Math.min(96, 60 + learningSessions * 3 + (taught?.students ?? 0)) : learned?.progress ?? 30,
        evidence,
      };
    })
    .sort((a, b) => Number(b.verified) - Number(a.verified) || b.competency - a.competency);
}

export type TimelineEntry = { month: string; items: string[] };

export const learningJourney: TimelineEntry[] = [
  {
    month: "September 2026",
    items: [
      "Completed Excel Analytics session with Dimas Prasetyo",
      "Taught Python Basic to 3 students",
      "Passed the Excel Analytics assessment",
    ],
  },
  {
    month: "August 2026",
    items: [
      "Completed 2 Public Speaking sessions with Alya Rahmadani",
      "Taught Automation with AI Tools to 4 students",
      "Reached Contributor level",
    ],
  },
  {
    month: "July 2026",
    items: [
      "Verified Website Development after 3 peer reviews",
      "Completed first exchange on EXCHANGE",
    ],
  },
];

/* --------------------------------------------------------------- referral */

export const referral = {
  identity: "Campus Ambassador",
  code: "RAKAUI26",
  studentsJoined: 18,
  successfulExchanges: 12,
  creditsEarned: 60,
  invited: [
    { name: "Satria Anugrah", faculty: "FH UI" as Faculty, status: "Completed first exchange" },
    { name: "Yoga Permana", faculty: "Fasilkom UI" as Faculty, status: "Teaching Python Basic" },
    { name: "Citra Ayu Lestari", faculty: "Vokasi UI" as Faculty, status: "Learning Public Speaking" },
    { name: "Nabila Syakira", faculty: "FIB UI" as Faculty, status: "Verified 1 skill" },
  ],
};
