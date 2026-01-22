"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import MagneticNav from "./components/MagneticNav";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { siteConfig } from "./lib/data";

// Preload images in background (non-blocking)
const PRELOAD_ASSETS = [
  "/profile.jpg",
  "/projects/trailo.png",
  "/projects/paper-trail.png",
  "/projects/terrain-aware-path-recommendation.png",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Preload images in the background using requestIdleCallback for optimal performance
  useEffect(() => {
    const preloadImages = () => {
      PRELOAD_ASSETS.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages);
    } else {
      setTimeout(preloadImages, 1);
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
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
      <AnimatePresence>
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen bg-black"
          >
            <Hero />
            <AboutSection />
            <ProjectsSection />
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

            <MagneticNav />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
