"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects, siteConfig } from "../lib/data";

export default function ProjectsSection() {
  return (
    <section id="work" className="relative px-6 py-32 bg-black">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 mb-2">{`// Work`}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">&lt; Projects /&gt;</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-300 font-medium rounded-full border border-white/10 bg-white/5 transition-all hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10"
          >
            <Github className="w-4 h-4" />
            View More Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
