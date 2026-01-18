"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import MagneticNav from "./components/MagneticNav";

// Sample project data - replace with your actual projects
const projects = [
  {
    title: "Neural Canvas",
    description:
      "An AI-powered generative art platform that transforms text prompts into stunning visual artwork using deep learning models.",
    tags: ["Next.js", "Python", "TensorFlow", "WebGL"],
    imageUrl: "/projects/neural-canvas.jpg",
    liveUrl: "https://neural-canvas.demo",
    githubUrl: "https://github.com/sumit/neural-canvas",
  },
  {
    title: "Velocity",
    description:
      "Real-time collaborative code editor with AI pair programming, featuring live cursors and intelligent code suggestions.",
    tags: ["React", "WebSocket", "Monaco", "OpenAI"],
    imageUrl: "/projects/velocity.jpg",
    liveUrl: "https://velocity.demo",
    githubUrl: "https://github.com/sumit/velocity",
  },
  {
    title: "Quantum Dash",
    description:
      "A data visualization dashboard for quantum computing experiments with interactive 3D Bloch sphere representations.",
    tags: ["Three.js", "D3.js", "TypeScript", "Qiskit"],
    imageUrl: "/projects/quantum-dash.jpg",
    githubUrl: "https://github.com/sumit/quantum-dash",
  },
  {
    title: "SoundScape",
    description:
      "Immersive audio experience generator using spatial audio and procedural music generation based on user emotions.",
    tags: ["Web Audio API", "ToneJS", "React", "ML5.js"],
    imageUrl: "/projects/soundscape.jpg",
    liveUrl: "https://soundscape.demo",
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

            {/* Projects Section */}
            <section id="work" className="relative px-6 py-32">
              <div className="mx-auto max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="mb-16 text-center"
                >
                  <p className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Selected Work
                  </p>
                  <h2 className="text-4xl font-bold text-mist sm:text-5xl">Projects</h2>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.title} {...project} index={index} />
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative px-6 py-32">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="glass-surface rounded-3xl p-8 sm:p-12"
                >
                  <p className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
                    About
                  </p>
                  <h2 className="mb-6 text-3xl font-bold text-mist sm:text-4xl">
                    The mind behind the code
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-steel">
                    <p>
                      I&apos;m a creative developer passionate about pushing the boundaries
                      of what&apos;s possible on the web. With a background in both design
                      and engineering, I bridge the gap between aesthetics and functionality.
                    </p>
                    <p>
                      When I&apos;m not crafting pixel-perfect interfaces, you&apos;ll find me
                      experimenting with generative art, exploring new animation libraries,
                      or diving deep into the latest web technologies.
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {["React", "Next.js", "TypeScript", "Framer Motion", "Three.js", "Tailwind CSS"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/5 px-4 py-2 font-mono text-sm text-steel"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative px-6 py-32">
              <div className="mx-auto max-w-4xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Let&apos;s Connect
                  </p>
                  <h2 className="mb-6 text-4xl font-bold text-mist sm:text-5xl">
                    Have an idea?
                  </h2>
                  <p className="mb-10 text-lg text-steel">
                    I&apos;m always open to discussing new projects, creative ideas, or
                    opportunities to be part of something amazing.
                  </p>
                  <motion.a
                    href="mailto:hello@sumitnair.dev"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-cyan-400"
                  >
                    Get in Touch
                  </motion.a>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 px-6 py-8">
              <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="font-mono text-sm text-steel">
                  © {new Date().getFullYear()} Sumit Nair. All rights reserved.
                </p>
                <p className="font-mono text-xs text-steel/50">
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
