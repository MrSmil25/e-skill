/**
 * EXCHANGE — session, credit, and teaching simulation for the signed-in student.
 *
 * Mock layer only. Models the day-to-day workspace of Raka Mahendra so the
 * prototype behaves like an account that has already been active for a semester.
 */

import { currentStudent, skillById, studentById, teachingHours, type Skill, type Student } from "./exchange";

export type SessionStatus = "upcoming" | "awaiting" | "completed";
export type SessionRole = "learning" | "teaching";

export type ExchangeSession = {
  id: string;
  role: SessionRole;
  status: SessionStatus;
  skillId: string;
  peerId: string;
  when: string;
  duration: number;
  credits: number;
  mode: "Online · Google Meet" | "On campus · FEB Study Hub" | "On campus · Fasilkom Lounge";
  agenda: string[];
  outcome?: string;
  rating?: number;
  feedback?: string;
};

export const sessions: ExchangeSession[] = [
  {
    id: "s1",
    role: "learning",
    status: "upcoming",
    skillId: "public-speaking",
    peerId: "alya-rahmadani",
    when: "Tomorrow · 19:00–19:45",
    duration: 45,
    credits: 6,
    mode: "Online · Google Meet",
    agenda: [
      "Diagnose your current delivery from a 2-minute recording",
      "Structure a competition pitch in the PREP format",
      "Practise the opening 30 seconds three times",
    ],
  },
  {
    id: "s2",
    role: "teaching",
    status: "upcoming",
    skillId: "python-basic",
    peerId: "satria-anugrah",
    when: "Thursday · 16:30–17:15",
    duration: 45,
    credits: 5,
    mode: "On campus · Fasilkom Lounge",
    agenda: [
      "Set up Python and a first script together",
      "Loops and functions through a small real task",
      "Leave with one script Satria can reuse",
    ],
  },
  {
    id: "s3",
    role: "learning",
    status: "awaiting",
    skillId: "financial-modeling",
    peerId: "nadia-putri",
    when: "Requested for Saturday · 10:00",
    duration: 30,
    credits: 5,
    mode: "On campus · FEB Study Hub",
    agenda: [
      "Walk through a projection model line by line",
      "Set revenue assumptions you can defend",
      "Build a simple valuation output",
    ],
  },
  {
    id: "s4",
    role: "learning",
    status: "completed",
    skillId: "excel-analytics",
    peerId: "dimas-prasetyo",
    when: "12 September · 20:00",
    duration: 30,
    credits: 4,
    mode: "Online · Google Meet",
    agenda: ["Clean a raw dataset", "Build pivot summaries", "Automate the repeat analysis"],
    outcome: "Skill progress 68% → 80% · assessment unlocked",
    rating: 5,
    feedback: "Raka came prepared with his own dataset, so we went straight to the hard part.",
  },
  {
    id: "s5",
    role: "teaching",
    status: "completed",
    skillId: "ai-automation",
    peerId: "citra-ayu",
    when: "9 September · 17:00",
    duration: 60,
    credits: 7,
    mode: "Online · Google Meet",
    agenda: ["Map a repetitive task", "Build the automation", "Handover and test"],
    outcome: "+7 Credits earned · 1 student helped",
    rating: 5,
    feedback: "Explained every step slowly and checked I could redo it alone.",
  },
  {
    id: "s6",
    role: "teaching",
    status: "completed",
    skillId: "python-basic",
    peerId: "yoga-permana",
    when: "5 September · 19:30",
    duration: 45,
    credits: 5,
    mode: "On campus · Fasilkom Lounge",
    agenda: ["Variables and loops", "Read a CSV", "Debug calmly"],
    outcome: "+5 Credits earned · peer rated 4.9",
    rating: 5,
    feedback: "First time programming felt possible. Patient and very structured.",
  },
  {
    id: "s7",
    role: "learning",
    status: "completed",
    skillId: "public-speaking",
    peerId: "alya-rahmadani",
    when: "28 August · 19:00",
    duration: 45,
    credits: 6,
    mode: "Online · Google Meet",
    agenda: ["Breathing and pace", "Structure a 3-minute answer", "Handle a hostile question"],
    outcome: "Skill progress 45% → 60%",
    rating: 5,
    feedback: "Strong improvement between the first and last practice round.",
  },
];

export function sessionsByStatus(status: SessionStatus) {
  return sessions.filter((s) => s.status === status);
}

export function sessionSkill(session: ExchangeSession): Skill {
  return skillById[session.skillId]!;
}

export function sessionPeer(session: ExchangeSession): Student {
  return studentById[session.peerId]!;
}

/* ------------------------------------------------------------------ wallet */

export type CreditEntry = {
  id: string;
  direction: "earned" | "spent";
  amount: number;
  reason: string;
  peer: string;
  when: string;
};

export const creditLedger: CreditEntry[] = [
  { id: "c1", direction: "earned", amount: 7, reason: "Taught Automation with AI Tools", peer: "Citra Ayu Lestari", when: "9 September" },
  { id: "c2", direction: "spent", amount: 4, reason: "Learned Excel Analytics", peer: "Dimas Prasetyo", when: "12 September" },
  { id: "c3", direction: "earned", amount: 5, reason: "Taught Python Basic", peer: "Yoga Permana", when: "5 September" },
  { id: "c4", direction: "earned", amount: 10, reason: "Referral reward — 2 invited students completed an exchange", peer: "EXCHANGE", when: "3 September" },
  { id: "c5", direction: "spent", amount: 6, reason: "Learned Public Speaking", peer: "Alya Rahmadani", when: "28 August" },
  { id: "c6", direction: "earned", amount: 15, reason: "Taught Website Development to 3 students", peer: "FT UI cohort", when: "22 August" },
  { id: "c7", direction: "earned", amount: 20, reason: "Welcome grant — verified UI student email", peer: "EXCHANGE", when: "14 July" },
];

export const creditsEarned = creditLedger
  .filter((e) => e.direction === "earned")
  .reduce((sum, e) => sum + e.amount, 0);

export const creditsSpent = creditLedger
  .filter((e) => e.direction === "spent")
  .reduce((sum, e) => sum + e.amount, 0);

/* ---------------------------------------------------------------- teaching */

export type Listing = {
  skillId: string;
  status: "live" | "draft";
  requests: number;
  studentsHelped: number;
  hours: number;
  slots: string;
};

export const listings: Listing[] = currentStudent.teaching.map((entry, index) => ({
  skillId: entry.skillId,
  status: index === currentStudent.teaching.length - 1 ? "draft" : "live",
  requests: [3, 2, 1, 0][index] ?? 0,
  studentsHelped: entry.students,
  hours: entry.hours,
  slots: ["Tue & Thu evening", "Weekend morning", "Wed evening", "Not scheduled"][index] ?? "Not scheduled",
}));

export type TeachRequest = {
  id: string;
  studentId: string;
  skillId: string;
  message: string;
  goal: string;
  when: string;
};

export const teachRequests: TeachRequest[] = [
  {
    id: "r1",
    studentId: "satria-anugrah",
    skillId: "python-basic",
    message: "I need to automate a legal document check for my internship task. Starting from zero.",
    goal: "Prepare internship",
    when: "Requested 3 hours ago",
  },
  {
    id: "r2",
    studentId: "nabila-syakira",
    skillId: "ai-automation",
    message: "I want to speed up transcript work for my thesis interviews.",
    goal: "Build career",
    when: "Requested yesterday",
  },
  {
    id: "r3",
    studentId: "putri-maharani",
    skillId: "web-development",
    message: "Our student organisation needs a landing page before the event opens.",
    goal: "Lead organisation",
    when: "Requested 2 days ago",
  },
];

/* ----------------------------------------------------------------- profile */

export const profileStats = {
  studentsHelped: currentStudent.studentsHelped,
  teachingHours: teachingHours(currentStudent),
  exchanges: currentStudent.exchangesCompleted,
  responseRate: 96,
  responseTime: "Usually replies within 3 hours",
  joined: "July 2026",
  languages: ["Bahasa Indonesia", "English"],
  interests: ["Data automation", "Product analytics", "Peer mentoring"],
  goalHeadline: "Land a data internship and keep teaching Python across faculties.",
};
