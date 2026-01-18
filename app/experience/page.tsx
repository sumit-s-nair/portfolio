"use client";

import { motion, LayoutGroup } from "framer-motion";
import { ArrowLeft, GitBranch } from "lucide-react";
import Link from "next/link";
import ExperienceItem from "../components/ExperienceItem";
import MagneticNav from "../components/MagneticNav";

// Experience data
const experiences = [
  {
    id: "exp-1",
    title: "Freelance Developer & Videographer",
    company: "Self-Employed",
    date: "2025 - Present",
    hash: "0xHEAD",
    isCurrent: true,
    description: [
      "Building custom web applications for clients using Next.js, React, and TypeScript",
      "Creating cinematic video content and documentaries for brands and individuals",
      "Exploring multi-modal AI systems and their integration into web platforms",
      "Managing end-to-end project delivery from concept to deployment",
    ],
    tags: ["Next.js", "React", "TypeScript", "Premiere Pro", "DaVinci Resolve", "AI/ML"],
  },
  {
    id: "exp-2",
    title: "Full Stack Developer Intern",
    company: "Startup",
    date: "Dec 2025 - Jan 2026",
    hash: "0xfa3b2c",
    description: [
      "Developed and maintained full-stack web applications using modern frameworks",
      "Implemented responsive UI components with React and Tailwind CSS",
      "Collaborated with the team on API design and database architecture",
      "Participated in code reviews and agile development processes",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "exp-3",
    title: "Teaching Assistant",
    company: "PES University",
    date: "Nov 2025",
    hash: "0xd7e9a1",
    description: [
      "Assisted professors in conducting lab sessions for programming courses",
      "Helped students understand core programming concepts and debug their code",
      "Graded assignments and provided constructive feedback",
    ],
    tags: ["Python", "C++", "Data Structures", "Algorithms"],
  },
  {
    id: "exp-4",
    title: "Nexus Project Lead",
    company: "PES University",
    date: "Nov 2025",
    hash: "0xc4b821",
    description: [
      "Led a team of developers to build an innovative campus project",
      "Coordinated project timelines, milestones, and deliverables",
      "Presented the project to faculty and stakeholders",
    ],
    tags: ["Project Management", "Team Leadership", "Full Stack"],
  },
];

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
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Experience
          </h1>
          <p className="font-mono text-gray-500">
            // Professional History & Changelog
          </p>
        </motion.div>

        {/* Timeline */}
        <LayoutGroup>
          <div className="relative">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.id}
                data={exp}
                index={index}
              />
            ))}
            
            {/* End node */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: experiences.length * 0.1 }}
              className="flex gap-6 md:gap-8"
            >
              <div className="w-20 md:w-24 flex-shrink-0 text-right">
                <span className="font-mono text-xs text-gray-700">init</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border border-gray-700 bg-black" />
              </div>
              <div className="flex-1 pb-4">
                <p className="font-mono text-sm text-gray-700">
                  git init career
                </p>
              </div>
            </motion.div>
          </div>
        </LayoutGroup>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="font-mono text-xs text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
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
