// 🥚 KIRO TIP: Use Kiro specs to plan changes to your resume structure before editing this file.

export interface HeaderData {
  name: string;
  title: string;
  avatarInitials: string;
  avatarAlt: string;
}

export interface AboutData {
  bio: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  dateRange: string;
  responsibilities: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  graduationYear: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  url: string;
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
}

export interface ResumeData {
  header: HeaderData;
  about: AboutData;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillsData;
  projects: ProjectEntry[];
  contact: ContactData;
}

export const resumeData: ResumeData = {
  header: {
    name: "Alex Rivera",
    title: "Full-Stack Developer",
    avatarInitials: "AR",
    avatarAlt: "Alex Rivera profile avatar",
  },
  about: {
    bio: "I'm a passionate full-stack developer with 5 years of experience building web applications. I love working at the intersection of design and engineering to create intuitive user experiences. When I'm not coding, you'll find me hiking or experimenting with new recipes.",
  },
  experience: [
    {
      company: "Acme Corp",
      role: "Senior Software Engineer",
      dateRange: "Mar 2021 – Present",
      responsibilities: [
        "Led migration of monolithic Rails app to microservices, reducing deploy time by 40%.",
        "Mentored a team of 4 junior engineers through weekly code reviews and pair programming.",
        "Designed and shipped a real-time notification system serving 50k daily active users.",
      ],
    },
    {
      company: "Globex Solutions",
      role: "Software Engineer",
      dateRange: "Jun 2019 – Feb 2021",
      responsibilities: [
        "Built RESTful APIs in Node.js consumed by iOS and Android clients.",
        "Improved test coverage from 42% to 87% by introducing property-based testing.",
        "Collaborated with product and design to ship 3 major feature releases on schedule.",
      ],
    },
  ],
  education: [
    {
      institution: "State University",
      degree: "B.Sc. Computer Science",
      graduationYear: "2019",
    },
  ],
  skills: {
    categories: [
      {
        category: "Languages",
        skills: ["TypeScript", "JavaScript", "Python", "SQL"],
      },
      {
        category: "Tools & Frameworks",
        skills: ["Astro", "React", "Node.js", "PostgreSQL", "Docker", "Git"],
      },
    ],
  },
  projects: [
    {
      name: "DevDash",
      description: "A developer productivity dashboard that aggregates GitHub activity, CI status, and Jira tickets into a single view.",
      url: "https://github.com/alexrivera/devdash",
    },
    {
      name: "RecipeBox",
      description: "A full-stack recipe management app with ingredient scaling, meal planning, and a public recipe discovery feed.",
      url: "https://github.com/alexrivera/recipebox",
    },
  ],
  contact: {
    email: "alex.rivera@example.com",
    github: "https://github.com/alexrivera",
    linkedin: "https://linkedin.com/in/alexrivera",
  },
};
