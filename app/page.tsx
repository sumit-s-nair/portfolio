"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import MagneticNav from "./components/MagneticNav";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import { projects, siteConfig } from "./lib/data";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
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

            {/* About Section */}
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

                <div className="grid gap-8 md:grid-cols-2">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.title} {...project} index={index} />
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <footer className="border-t border-white/5 px-6 py-8 bg-black">
              <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="font-mono text-sm text-gray-500">
                  © {new Date().getFullYear()} {siteConfig.name.split(' ')[0]} {siteConfig.name.split(' ')[2]}. All rights reserved.
                </p>
                <p className="font-mono text-xs text-gray-600">
                  Built with Next.js
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
