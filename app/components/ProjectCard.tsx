"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  liveUrl,
  githubUrl,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        y: 0,
        transition: { duration: 0.3 },
      }}
      className="group relative"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          y: 0,
          transition: { duration: 0.2 },
        }}
        className="relative overflow-hidden rounded-2xl glass"
      >
        {/* Ambient glow on hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber/0 via-transparent to-amber/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

        {/* Project thumbnail */}
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden">
            <motion.div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-6">
          {/* Title with hover glow */}
          <h3 className="mb-2 text-xl font-semibold text-mist transition-colors group-hover:text-amber">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-steel">
            {description}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-steel transition-colors group-hover:bg-amber/10 group-hover:text-amber/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm text-steel transition-colors hover:text-amber"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="font-mono">Live</span>
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm text-steel transition-colors hover:text-amber"
              >
                <Github className="h-4 w-4" />
                <span className="font-mono">Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Deep shadow effect */}
        <div className="absolute -bottom-4 left-4 right-4 -z-10 h-16 rounded-2xl bg-black/50 blur-2xl transition-all duration-300 group-hover:-bottom-6 group-hover:bg-amber/20 group-hover:blur-3xl" />
      </motion.div>
    </motion.article>
  );
}
