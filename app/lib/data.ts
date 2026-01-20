// Portfolio site data - centralized for easy maintenance

export interface Project {
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    liveUrl?: string;
    githubUrl?: string;
}

export interface SiteConfig {
    name: string;
    role: string;
    email: string;
    status: string;
    location: {
        city: string;
        country: string;
        timezone: string;
    };
    social: {
        github: string;
        linkedin: string;
        email: string;
    };
}

// Site configuration
export const siteConfig: SiteConfig = {
    name: "Sumit Santhosh Nair",
    role: "Full Stack Engineer & Creative",
    email: "sumitnair731@gmail.com",
    status: "Working on Trailo",
    location: {
        city: "Bengaluru, Karnataka",
        country: "India",
        timezone: "Asia/Kolkata",
    },
    social: {
        github: "https://github.com/sumit-s-nair",
        linkedin: "https://www.linkedin.com/in/sumit-santhosh-nair-3ba522283/",
        email: "mailto:sumitnair731@gmail.com",
    },
};

// Projects data
export const projects: Project[] = [
    {
        title: "Papertrail",
        description:
            "A full-stack, multi-user blogging platform with markdown editor, category management, OAuth authentication, and dark mode. Features tRPC for type-safe APIs and Drizzle ORM.",
        tags: ["Next.js 15", "tRPC", "PostgreSQL", "Drizzle ORM", "TypeScript"],
        imageUrl: "/projects/paper-trail.png",
        liveUrl: "https://papertrail-chi.vercel.app/",
        githubUrl: "https://github.com/sumit-s-nair/papertrail",
    },
    {
        title: "Terrain-Aware Path Recommendation",
        description:
            "An RL-based pathfinding system using PyBullet physics simulation. Trains agents to discover optimal hiking routes with realistic terrain friction and energy models.",
        tags: ["Python", "PyBullet", "PPO", "Reinforcement Learning", "A*"],
        imageUrl: "/projects/terrain-aware-path-recommendation.png",
        githubUrl: "https://github.com/sumit-s-nair/terrain-aware-path-recommendation",
    },
    {
        title: "Trailo",
        description:
            "A motorcycle group riding and real-time tracking app. Features live location sharing, group management, trail discovery, and SOS safety features for adventurers.",
        tags: ["Flutter", "NestJS", "Real-time", "Maps API", "WebSocket"],
        imageUrl: "/projects/trailo.png",
        liveUrl: "https://ridetrailo.com/",
    },
];

// Tech stack for About section
export const techStack = [
    "TypeScript", "React", "Next.js", "Node.js", "Python",
    "PostgreSQL", "TailwindCSS", "Framer Motion", "TensorFlow",
    "Prisma", "GraphQL", "Docker", "AWS", "Vercel", "JavaScript",
    "Flutter", "MongoDB", "PostgreSQL", "Firebase", "Git/GitHub",
    "Tailwind CSS", "Dart", "TensorFlow", "PyTorch", "C", "C++"
];

// Experience data
export interface Experience {
    id: string;
    role: string;
    company: string;
    date: string;
    desc: string;
    points: string[];
    tech: string[];
    isCurrent?: boolean;
}

export const experienceData: Experience[] = [
    {
        id: "01",
        role: "Full Stack Developer Intern",
        company: "Kapybara",
        date: "DEC 2025 - JAN 2026",
        desc: "Led the development of AI-powered utilities and core platform UI redesigns.",
        points: [
            "Engineered multiple complex tools from scratch, including an LLM text generator, copywriting assistant, backlink checker, and a comprehensive geo-analysis tool.",
            "Revamped the platform's frontend architecture, redesigning multiple sections for the Home and Pricing pages to align with new branding.",
            "Implemented analytics and user tracking pipelines by integrating PostHog and Google Analytics across the application."
        ],
        tech: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "LLM APIs"]
    },
    {
        id: "02",
        role: "Head of Web Development",
        company: "GronIT",
        date: "OCT 2024 - PRESENT",
        desc: "Led the development of the official club website",
        points: [
            "Architected the official club website with a custom CMS for resource management.",
            "Defined technical criteria and problem statements for multiple club events such as ideathons and hackathons while mentoring teams."
        ],
        tech: ["React", "Node.js", "System Design"],
        isCurrent: true
    },
    {
        id: "03",
        role: "Subject Matter Expert (SME)",
        company: "PESU IO",
        date: "AUG 2025 - DEC 2025",
        desc: "Technical mentorship for 60+ students in the full stack development course.",
        points: [
            "Guided a cohort of 60+ students through the full stack web development course.",
            "Conducted code reviews and debugging sessions to ensure project deployment.",

        ],
        tech: ["Mentorship", "Code Review", "Full Stack"]
    },
    {
        id: "04",
        role: "Teaching Assistant (Web Technologies)",
        company: "PES University",
        date: "AUG 2025 - DEC 2025",
        desc: "Built MERN docs platform & QBs for Web Technologies.",
        points: [
            "Assisted faculty in managing laboratory sessions and prepared QBs for the Web Technologies course.",
            "Provided debugging support for students in the Web Technologies course."
        ],
        tech: ["Academic", "MERN"]
    },
    {
        id: "05",
        role: "Research Intern",
        company: "RAPID",
        date: "JUN 2025 - JUL 2025",
        desc: "RL Agents for terrain navigation.",
        points: [
            "Engineered a training env using high-res Digital Elevation Models (DEMs).",
            "Trained PPO agents and validated generated paths against human GPX trails."
        ],
        tech: ["Python", "Reinforcement Learning", "PyTorch", "PyBullet", "Pathfinding"]
    }
];
