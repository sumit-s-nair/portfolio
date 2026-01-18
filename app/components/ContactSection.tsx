"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../lib/data";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 mb-2">{`// Contact`}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">&lt; Connect /&gt;</h2>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of something amazing.
            </p>
            <p className="text-gray-500">
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
          </motion.div>

          {/* Right - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
              href={siteConfig.social.email}
              whileHover={{ y: -4 }}
              className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-1">
                Get in Touch
              </h3>
              <p className="font-mono text-sm text-cyan-400">
                {siteConfig.email}
              </p>
            </motion.a>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <motion.a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="flex-1 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 text-center text-gray-400 hover:text-cyan-400 font-mono text-sm transition-all"
              >
                GitHub
              </motion.a>
              <motion.a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="flex-1 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 text-center text-gray-400 hover:text-cyan-400 font-mono text-sm transition-all"
              >
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
