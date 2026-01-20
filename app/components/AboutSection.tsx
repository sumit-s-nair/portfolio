"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Code, Camera, Clock } from "lucide-react";
import { techStack, siteConfig } from "../lib/data";

// Bento card wrapper with subtle antigravity effect
function BentoCard({
  children,
  className = "",
  delay = 0,
  floatDelay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatDelay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/20 hover:bg-white/[0.05] hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.15)] ${className}`}
      style={{ animation: `float 8s ease-in-out infinite`, animationDelay: `${floatDelay}s` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
      </div>
      {children}
    </motion.div>
  );
}

// Tech marquee component
function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-3 group h-full flex items-center">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#030712] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#030712] to-transparent z-10" />

      <motion.div
        className="flex gap-3 group-hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-mono text-gray-400 bg-white/5 rounded-full border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });

  return (
    <section id="about" className="relative py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 mb-2">{`// About`}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">&lt; Profile &#47;&gt;</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(100px,auto)]">

          {/* Profile Photo Card */}
          <BentoCard className="md:col-span-1 lg:col-span-1 md:row-span-2 p-0" delay={0} floatDelay={0}>
            <div className="relative w-full h-full min-h-[280px]">
              <Image
                src="/profile.jpg"
                alt="Sumit Santhosh Nair"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">Sumit Santhosh Nair</h3>
                <p className="font-mono text-sm text-cyan-400">B.Tech @ PES University</p>
              </div>
            </div>
          </BentoCard>

          {/* Location & Time Card */}
          <BentoCard className="md:col-span-2 lg:col-span-2 p-5" delay={0.05} floatDelay={1}>
            <div className="flex flex-col sm:flex-row  items-start justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">Location</span>
                </div>
                <p className="text-xl font-semibold text-white">Bengaluru, Karnataka</p>
                <p className="text-sm text-gray-500">India 🇮🇳</p>
              </div>
              <div className="text-right">
                <Clock className="w-4 h-4 text-cyan-400 ml-auto mb-2 hidden sm:block" />
                <p className="text-2xl font-mono text-white">{time}</p>
              </div>
            </div>
          </BentoCard>

          {/* Tech Marquee Card - Wide */}
          <BentoCard className="md:col-span-1 lg:col-span-1 p-0 px-2" delay={0.4} floatDelay={2}>
            <div className="h-full flex flex-col justify-center">
              <p className="font-mono text-xs text-gray-500 uppercase tracking-wider px-2 pt-3 pb-1">Tech Stack</p>
              <TechMarquee />
            </div>
          </BentoCard>

          {/* Bio Card */}
          <BentoCard className="md:col-span-2 lg:col-span-2 row-span-2 p-6" delay={0.15} floatDelay={3}>
            <p className="text-lg leading-relaxed text-slate-300">
              Engineering student at <span className="text-cyan-400 font-medium">PES University</span> specializing in AI/ML.
              My technical foundation is built on research, having engineered RL navigation agents at <span className="text-cyan-400 font-medium">RAPID</span>.
              I am also deeply invested in mentorship as a <span className="text-cyan-400 font-medium">Subject Matter Expert (SME)</span> at PESU IO,
              guiding <span className="text-white font-bold">60+ students</span> in shipping full-stack apps.
              I support faculty as a <span className="text-cyan-400 font-medium">Teaching Assistant</span>,
              aiding in lab management and academic instruction.
            </p>
          </BentoCard>

          {/* Developer Card */}
          <BentoCard className="md:col-span-1 lg:col-span-1 p-5" delay={0.2} floatDelay={4}>
            <Code className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="text-base font-semibold text-white mb-1">Developer</h4>
            <p className="text-sm text-gray-400">
              Building scalable web apps and AI-powered solutions
            </p>
          </BentoCard>

          {/* Videographer Card */}
          <BentoCard className="md:col-span-1 lg:col-span-1 p-5" delay={0.25} floatDelay={1.5}>
            <Camera className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="text-base font-semibold text-white mb-1">Videographer</h4>
            <p className="text-sm text-gray-400">
              Capturing moments and telling visual stories
            </p>
          </BentoCard>

          {/* Status Card */}
          <BentoCard className="md:col-span-1 lg:col-span-1 p-5" delay={0.3} floatDelay={2.5}>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">Status</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <p className="text-sm text-white">{siteConfig.status}</p>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
