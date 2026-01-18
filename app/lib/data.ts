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
        linkedin: "https://linkedin.com/in/sumit-s-nair",
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
