export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tech: string[];
  category: 'Frontend' | 'Fullstack' | 'Creative';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design & Tools' | 'Core Concepts';
  level: number; // 1-5
  iconName?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  details?: string;
}

export const portfolioData = {
  personalInfo: {
    name: "Muhammad Emirzaki",
    title: "Front-End Developer",
    subtitle: "Front-end developer with experience across React.js, React Native, and Next.js, building responsive interfaces and collaborating closely with UI/UX and backend teams to ship optimal digital solutions.",
    location: "Jakarta, Indonesia",
    email: "emirzakimuhammad@gmail.com",
    whatsapp: "https://wa.me/6287889445946",
    github: "https://github.com/emirzaki23hub",
    linkedin: "https://linkedin.com/in/muhammad-emirzaki-a9229721b",
    bio: "Front-end developer with experience across React.js, React Native, and Next.js, building responsive interfaces and collaborating closely with UI/UX and backend teams to ship optimal digital solutions. Currently at PT Multi Bit Group Asia.",
    detailedBio: "Front-end developer with experience across React.js, React Native, and Next.js, building responsive interfaces and collaborating closely with UI/UX and backend teams to ship optimal digital solutions. Currently at PT Multi Bit Group Asia. Passionate about creating clean, performant, and accessible web applications with modern technologies.",
  },
  projects: [
    {
      id: "adgi",
      title: "ADGI",
      description: "Asosiasi Desainer Grafis Indonesia official website — company profile and organizational site.",
      image: "/adgi.webp",
      tech: ["React.js", "Next.js", "Tailwind CSS"],
      category: "Frontend",
      liveUrl: "https://www.adgi.or.id/",
      featured: true,
    },
    {
      id: "umb-pmb",
      title: "UMB PMB",
      description: "Admissions portal for Universitas Mercu Buana — student registration and information system.",
      image: "/umb.webp",
      tech: ["React.js", "Next.js", "Ant Design"],
      category: "Frontend",
      liveUrl: "https://semercu.mercubuana.ac.id/",
      featured: true,
    },
    {
      id: "petrotekno",
      title: "Petrotekno",
      description: "Multi-tenant Learning Management System (LMS) platform.",
      image: "/petro.webp",
      tech: ["React.js", "Next.js", "Tailwind CSS", "PostgreSQL"],
      category: "Frontend",
      liveUrl: "https://lms.petroteknoapp.com/",
      featured: true,
    },
    {
      id: "solbuss",
      title: "SOLBUSS",
      description: "Multi-tenant Learning Management System (LMS) — scalable education platform.",
      image: "/solbuss.webp",
      tech: ["React.js", "React Native", "Next.js"],
      category: "Frontend",
      featured: false,
    },
  ] as Project[],
  skills: [
    { name: "React.js", category: "Frontend", level: 5 },
    { name: "Next.js", category: "Frontend", level: 4 },
    { name: "React Native", category: "Frontend", level: 4 },
    { name: "TypeScript", category: "Frontend", level: 4 },
    { name: "Tailwind CSS", category: "Frontend", level: 5 },
    { name: "Ant Design", category: "Frontend", level: 4 },
    { name: "Bootstrap", category: "Frontend", level: 5 },
    { name: "Remix", category: "Frontend", level: 3 },
    { name: "JavaScript (ES6+)", category: "Frontend", level: 5 },
    { name: "RESTful APIs", category: "Backend", level: 4 },
    { name: "Node.js", category: "Backend", level: 3 },
    { name: "PostgreSQL", category: "Backend", level: 3 },
    { name: "Git & GitHub", category: "Design & Tools", level: 5 },
    { name: "Figma", category: "Design & Tools", level: 4 },
    { name: "Responsive Design", category: "Core Concepts", level: 5 },
    { name: "Web Performance", category: "Core Concepts", level: 4 },
  ] as Skill[],
  experiences: [
    {
      role: "Front-End Developer",
      company: "PT Multi Bit Group Asia",
      location: "Jakarta, Indonesia",
      period: "May 2023 – Present",
      description: [
        "Developing and revamping company and user websites, microsites, and landing pages.",
        "Optimizing performance, accessibility, and SEO across web properties.",
        "Implementing animations and interactive elements to increase user engagement.",
        "Collaborating closely with UI/UX and backend teams to ship optimal digital solutions.",
      ],
    },
    {
      role: "Front-End Engineer",
      company: "iSeller",
      location: "Jakarta, Indonesia",
      period: "Sep 2022 – Mar 2023",
      description: [
        "Assisted in developing and maintaining websites, admin websites, website templates, and custom themes.",
        "Implemented responsive designs and ensured cross-browser compatibility.",
        "Contributed to code reviews and maintained code quality standards.",
      ],
    },
    {
      role: "Front-End Developer (Internship)",
      company: "Adala.id",
      location: "Jakarta, Indonesia",
      period: "Apr 2022 – Aug 2022",
      description: [
        "Contributed to a Warehouse Management System — web app in React.js.",
        "Developed Android app in React Native for scanner sync features.",
        "Collaborated with the team to deliver features on schedule.",
      ],
    },
  ] as Experience[],
  education: [
    {
      degree: "Bachelor's Degree in Informatics and Computer Engineering Education",
      institution: "Universitas Negeri Jakarta (UNJ)",
      period: "2017 – 2021",
      details: "GPA: 3.46/4.00",
    },
  ] as Education[],
};
