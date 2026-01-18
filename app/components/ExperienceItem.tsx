"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ExperienceData {
  id: string;
  title: string;
  company: string;
  date: string;
  hash: string;
  isCurrent?: boolean;
  description: string[];
  tags: string[];
}

interface ExperienceItemProps {
  data: ExperienceData;
  index: number;
}

export default function ExperienceItem({ data, index }: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Date/Hash Column */}
      <div className="w-20 md:w-24 flex-shrink-0 text-right pt-1">
        <span className="font-mono text-xs text-gray-600 block">{data.hash}</span>
        <span className="font-mono text-sm text-gray-500">{data.date}</span>
      </div>

      {/* Timeline Node & Line */}
      <div className="relative flex flex-col items-center">
        {/* Node */}
        <div className="relative z-10">
          {data.isCurrent ? (
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-cyan-400" />
              {/* Pulse ring */}
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-500 animate-ping opacity-30" />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-gray-600 bg-black" />
          )}
        </div>
        {/* Vertical line */}
        <div className="w-px flex-1 bg-gray-800 mt-2" />
      </div>

      {/* Content */}
      <motion.div
        layout
        className="flex-1 pb-10"
      >
        {/* Clickable header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left group"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Role Title */}
              <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                {data.title}
              </h3>
              {/* Company */}
              <p className="font-mono text-sm text-cyan-400">
                @ {data.company}
              </p>
            </div>
            
            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-600 group-hover:text-cyan-400 transition-colors mt-1"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Description bullets */}
                <ul className="space-y-2">
                  {data.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-gray-400"
                    >
                      <span className="text-cyan-500 mt-1">▹</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-gray-400 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
