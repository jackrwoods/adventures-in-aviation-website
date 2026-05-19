export type Step = {
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ChecklistItem = {
  label: string;
  detail?: string;
};

export const aboutPageTitle = "About the Program";

export const aboutPageSubtitle =
  "How Adventures in Aviation operates — from jet arrival to digital legacy.";

export const aboutSections = [
  {
    id: "overview",
    title: "Program Overview",
    background: "primary" as const,
  },
  {
    id: "episode-structure",
    title: "The 4-Step Episode Structure",
    background: "secondary" as const,
  },
  {
    id: "safety",
    title: "Safety Briefing",
    background: "primary" as const,
  },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    background: "secondary" as const,
  },
  {
    id: "host-guide",
    title: "Host Participation Guide",
    background: "primary" as const,
  },
  {
    id: "apply",
    title: "Apply to Be a Student Fellow",
    background: "secondary" as const,
  },
];

export const programOverviewCopy = {
  intro:
    "Adventures in Aviation is a cinematic educational initiative that flies a small jet to aviation companies, bringing STEM students for facility tours, CEO interviews, and hands-on experiences — all filmed for YouTube and educational distribution.",
  mission:
    "The sky is not the limit, it's the classroom.",
  crisis:
    "Aviation faces a dual crisis: a massive talent shortage and a perception gap that keeps capable students from seeing themselves in aerospace careers. We don't just talk about planes; we bring the jet to the students. One landing for 10 students becomes a lesson for 10,000.",
};

export const episodeStructureSteps: Step[] = [
  {
    title: "The Arrival",
    description:
      "The jet lands at a regional airport near the host company. Ten STEM students meet the flight crew on the tarmac, receive a safety briefing, and prepare for the day.",
  },
  {
    title: "The Insight Session",
    description:
      "Students sit down for a 10-on-1 interview with the company Principal — a CEO, Lead Engineer, or Chief Pilot. This is access that money can't buy, demystifying the career path by landing the opportunity directly in their backyard.",
  },
  {
    title: "The Immersive Tour",
    description:
      "A behind-the-scenes facility tour takes students through hangars, labs, and control rooms. A 10-minute hands-on Q&A session lets them touch tools, ask questions, and see the work up close.",
  },
  {
    title: "The Departure & Digital Legacy",
    description:
      "The jet takes off — and carries their aspirations with it. Each episode is distributed via YouTube, schools, and planetariums, turning one day's experience into a lasting educational resource.",
  },
];

export const safetyChecklist: ChecklistItem[] = [
  {
    label: "EYES UP",
    detail: "Situational awareness at all times. Watch for moving aircraft, vehicles, and equipment.",
  },
  {
    label: "STAY WITH THE CREW",
    detail: "Never wander off alone on the tarmac. The flight crew is your guide and your safety net.",
  },
  {
    label: "HEARING PROTECTION",
    detail: "PPE is required near running engines. Earplugs or earmuffs must be worn in designated zones.",
  },
  {
    label: "NO TOUCHING",
    detail: "Hands off aircraft, tools, and equipment unless explicitly invited by the host or crew.",
  },
  {
    label: "REPRESENT",
    detail: "You are ambassadors for your school and community. Professionalism and respect are non-negotiable.",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "Who can participate?",
    answer:
      "STEM students aged 14–18 with a teacher recommendation. We prioritize students from underrepresented communities and schools with limited access to aviation resources.",
  },
  {
    question: "How is content distributed?",
    answer:
      "Episodes are released on YouTube and shared directly with partner schools, planetariums, and educational networks. Every episode is free to watch and share.",
  },
  {
    question: "What does it cost a host company?",
    answer:
      "Nothing. Host companies provide facility access and a Principal for the Insight Session. We handle filming, travel, and post-production.",
  },
  {
    question: "How do you measure impact?",
    answer:
      "We track viewership, educator feedback, and follow-up career interest surveys. Our goal is measurable pipeline growth into aviation and aerospace fields.",
  },
];

export const hostGuideChecklist: ChecklistItem[] = [
  {
    label: "Facility Access",
    detail:
      "Provide entry for a small film crew and 10 students, including any required badging or escort arrangements.",
  },
  {
    label: "A Company Principal",
    detail:
      "A CEO, Lead Engineer, Chief Pilot, or equivalent who can sit for a 30-minute interview with students.",
  },
  {
    label: "A Behind-the-Scenes Tour Route",
    detail:
      "A pre-planned path through hangars, labs, control rooms, or production floors with hands-on stops.",
  },
  {
    label: "Tarmac or Ramp Access",
    detail:
      "Access to an arrival/departure area for jet footage. This is often the most cinematic moment of the episode.",
  },
];

export const hostGuideTimeline: Step[] = [
  {
    title: "Pre-Flight Call",
    description:
      "A 30-minute logistics call two weeks before arrival to confirm schedule, safety protocols, and filming locations.",
  },
  {
    title: "Arrival Day",
    description:
      "The crew and students arrive in the morning. Safety briefing, Insight Session, tour, and departure filming — all in one day.",
  },
  {
    title: "Episode Release",
    description:
      "Edited episode delivered to the host company for review, then published to YouTube and educational channels within 4–6 weeks.",
  },
  {
    title: "Digital Legacy",
    description:
      "The episode lives on as a free educational resource, shared with schools and planetariums for years to come.",
  },
];

export const applicationCopy = {
  who: "STEM students aged 14–18 with a teacher recommendation.",
  how: "Submit a short essay and teacher nomination through your school. We do not collect personal information online; all applications are coordinated through trusted educators.",
  what:
    "Selected students join a cohort of 10 for a single-day episode experience. One landing for 10 students becomes a lesson for 10,000.",
  note:
    "We are currently recruiting schools and educators for our first season. If you're a teacher or administrator interested in nominating students, please reach out through your school's STEM department.",
};
