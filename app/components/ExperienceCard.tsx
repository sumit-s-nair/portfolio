"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Experience } from "../lib/data";

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

export default function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCurrent = exp.isCurrent || exp.date.includes("PRESENT");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative flex gap-4 md:gap-8"
    >
      {/* Date Column (Left) */}
      <div className="w-24 md:w-32 flex-shrink-0 text-right pt-1">
        <span className="font-mono text-xs text-slate-600 block">#{exp.id}</span>
        <span className="font-mono text-xs md:text-sm text-slate-500">{exp.date}</span>
      </div>

      {/* Timeline Node & Line */}
      <div className="relative flex flex-col items-center">
        {/* Node */}
        <div className="relative z-10 mt-1.5">
          {isCurrent ? (
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-cyan-500 border-2 border-cyan-400" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-500 animate-ping opacity-40" />
            </div>
          ) : (
            <div className="w-3 h-3 rounded-full border-2 border-slate-600 bg-black" />
          )}
        </div>
        {/* Vertical line */}
        <div className="w-px flex-1 bg-slate-800 mt-2" />
      </div>

      {/* Content Card (Right) */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex-1 pb-8 cursor-pointer group"
      >
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300">
          {/* Header - Always visible */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base md:text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                {exp.role}
              </h3>
              <p className="font-mono text-sm text-cyan-400">
                @ {exp.company}
              </p>
            </div>
          </div>
          
          {/* Description - Always visible */}
          <p className="text-sm text-slate-400 mt-2">{exp.desc}</p>

          {/* Expanded Content - On Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                {/* Bullet points */}
                <ul className="mt-4 space-y-2">
                  {exp.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-slate-400"
                    >
                      <span className="text-cyan-500 mt-0.5">▹</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs font-mono bg-white/5 text-slate-500 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
