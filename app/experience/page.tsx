"use client";

import { motion } from "framer-motion";
import { ArrowLeft, GitBranch } from "lucide-react";
import Link from "next/link";
import MagneticNav from "../components/MagneticNav";
import ExperienceCard from "../components/ExperienceCard";
import { experienceData } from "../lib/data";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">cd ~</span>
          </Link>
          
          <div className="flex items-center gap-2 text-gray-500">
            <GitBranch className="w-4 h-4" />
            <span className="font-mono text-sm">main</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 mb-2">// Experience</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            &lt; Changelog /&gt;
          </h1>
          <p className="font-mono text-sm text-slate-500 mt-2">
            git log --oneline --graph
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
            />
          ))}
          
          {/* End node */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: experienceData.length * 0.1 }}
            className="flex gap-4 md:gap-8"
          >
            <div className="w-24 md:w-32 flex-shrink-0 text-right">
              <span className="font-mono text-xs text-slate-700">init</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full border border-slate-700 bg-black" />
            </div>
            <div className="flex-1 pb-4">
              <p className="font-mono text-xs text-slate-700">
                git init journey
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="font-mono text-xs text-gray-600">
            Last commit: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
          <Link 
            href="/"
            className="font-mono text-xs text-gray-600 hover:text-cyan-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>

      {/* Navigation Dock */}
      <MagneticNav />
    </main>
  );
}
