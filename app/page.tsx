"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import MagneticNav from "./components/MagneticNav";
import AboutSection from "./components/AboutSection";
// Project data
const projects = [
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
    tags: ["Python", "PyBullet", "PPO", "Reinforcement Learning"],
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



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    // Small delay before showing content for smoother transition
    setTimeout(() => {
      setShowContent(true);
      // After content shows, check for hash and scroll to it
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          const id = hash.replace('#', '');
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 100);
  }, []);

  return (
    <>
      {/* Decoder Loader */}
      <AnimatePresence>{isLoading && <Loader onComplete={handleLoaderComplete} />}</AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen bg-black"
          >
            {/* Hero Section */}
            <Hero />

            {/* About Section - Now above Projects */}
            <AboutSection />

            {/* Projects Section */}
            <section id="work" className="relative px-6 py-32 bg-black">
              <div className="mx-auto max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <p className="font-mono text-sm text-cyan-400 mb-2">// Work</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">&lt; Projects /&gt;</h2>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.title} {...project} index={index} />
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative px-6 py-32 bg-black">
              <div className="mx-auto max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <p className="font-mono text-sm text-cyan-400 mb-2">// Contact</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">&lt; Connect /&gt;</h2>
                  <p className="mb-10 text-lg text-gray-400 max-w-xl mx-auto">
                    I&apos;m always open to discussing new projects, creative ideas, or
                    opportunities to be part of something amazing.
                  </p>
                  <motion.a
                    href="mailto:sumitnair731@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 font-semibold text-black transition-colors hover:bg-cyan-400"
                  >
                    Get in Touch
                  </motion.a>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 px-6 py-8 bg-black">
              <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="font-mono text-sm text-gray-500">
                  © {new Date().getFullYear()} Sumit Nair. All rights reserved.
                </p>
                <p className="font-mono text-xs text-gray-600">
                  Built with Next.js, Tailwind, and Framer Motion
                </p>
              </div>
            </footer>

            {/* Magnetic Navigation Dock */}
            <MagneticNav />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
