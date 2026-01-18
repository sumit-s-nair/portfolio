"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

// Meta code for background
const HERO_SOURCE_CODE = `// Hero.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold"
        >
          Sumit Santhosh Nair
        </motion.h1>
        
        <p className="text-cyan-400 font-mono">
          Full Stack Developer · Videographer
        </p>
        
        <p className="text-gray-400 max-w-xl">
          Engineering student at PES University.
          Building scalable web applications.
        </p>
        
        <div className="flex gap-4 mt-8">
          <Link href="#work">View Work</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </div>
    </section>
  );
};`;

// Syntax colors
const COLORS = {
  keyword: "#c678dd",
  string: "#98c379",
  function: "#61afef",
  type: "#e5c07b",
  comment: "#5c6370",
  variable: "#abb2bf",
  operator: "#56b6c2",
};

const KEYWORDS = ["const", "let", "return", "import", "from", "export", "default"];

function tokenize(line: string) {
  const tokens: { text: string; color: string }[] = [];
  let rest = line;
  
  while (rest.length > 0) {
    if (rest.startsWith("//")) {
      tokens.push({ text: rest, color: COLORS.comment });
      break;
    }
    const strMatch = rest.match(/^("[^"]*"|'[^']*')/);
    if (strMatch) {
      tokens.push({ text: strMatch[0], color: COLORS.string });
      rest = rest.slice(strMatch[0].length);
      continue;
    }
    let found = false;
    for (const kw of KEYWORDS) {
      if (rest.startsWith(kw) && !/\w/.test(rest[kw.length] || "")) {
        tokens.push({ text: kw, color: COLORS.keyword });
        rest = rest.slice(kw.length);
        found = true;
        break;
      }
    }
    if (found) continue;
    const tagMatch = rest.match(/^<\/?[a-zA-Z.]+/);
    if (tagMatch) {
      tokens.push({ text: tagMatch[0], color: COLORS.function });
      rest = rest.slice(tagMatch[0].length);
      continue;
    }
    tokens.push({ text: rest[0], color: COLORS.variable });
    rest = rest.slice(1);
  }
  return tokens;
}

function CodeBackground() {
  const [charIndex, setCharIndex] = useState(0);
  const total = HERO_SOURCE_CODE.length;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex(prev => (prev >= total ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, [total]);
  
  const text = HERO_SOURCE_CODE.slice(0, charIndex);
  const lines = text.split("\n");
  const currentLine = lines.length - 1;
  const lineHeight = 22;
  const scrollOffset = Math.max(0, currentLine * lineHeight - 300);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.55]"
      style={{
        maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 80%)",
      }}
    >
      <motion.div 
        className="font-mono text-sm leading-[22px] p-8 pt-32"
        animate={{ y: -scrollOffset }}
        transition={{ duration: 0.2 }}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-8 text-right mr-4 text-gray-700 select-none">{i + 1}</span>
            <span className={i === currentLine ? "border-l-2 border-cyan-500/40 pl-2" : "pl-2"}>
              {tokenize(line).map((t, j) => (
                <span key={j} style={{ color: t.color }}>{t.text}</span>
              ))}
              {i === currentLine && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle"
                />
              )}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function CornerMarker({ position }: { position: string }) {
  const pos: Record<string, string> = {
    "tl": "top-4 left-4",
    "tr": "top-4 right-4 rotate-90",
    "bl": "bottom-14 left-4 -rotate-90",
    "br": "bottom-14 right-4 rotate-180",
  };
  return (
    <div className={`absolute ${pos[position]} w-5 h-5 opacity-50`}>
      <div className="absolute top-0 left-0 w-full h-px bg-cyan-400" />
      <div className="absolute top-0 left-0 h-full w-px bg-cyan-400" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Micro grid */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      <CodeBackground />
      
      <CornerMarker position="tl" />
      <CornerMarker position="tr" />
      <CornerMarker position="bl" />
      <CornerMarker position="br" />

      {/* Main Content - IDE native, no card */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Name - single line with whitespace-nowrap */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white whitespace-nowrap mb-4">
            Sumit Santhosh Nair
          </h1>

          {/* Role - monospace, IDE style */}
          <p className="font-mono text-base sm:text-lg text-cyan-400 mb-6">
            <span className="text-gray-500">{"// "}</span>
            Full Stack Developer <span className="text-gray-500">·</span> Videographer
          </p>

          {/* Bio - code comment style */}
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-10 font-mono">
            <span className="text-gray-600">{"/* "}</span>
            Engineering student at PES University. Focused on building scalable web applications and exploring multi-modal AI systems.
            <span className="text-gray-600">{" */"}</span>
          </p>

          {/* Actions - capsule style */}
          <div className="flex items-center justify-center gap-3">
            {/* Primary - filled cyan capsule */}
            <motion.a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-cyan-500 text-black font-medium rounded-full transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              View Work
            </motion.a>
            
            {/* Secondary - ghost capsule */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 text-gray-400 font-medium rounded-full border border-white/10 transition-all hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/5"
            >
              Contact
            </motion.a>
          </div>

          {/* Social links - glass pill like nav */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              {[
                { icon: Github, href: "https://github.com/sumit-s-nair", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/sumit-santhosh-nair-3ba522283/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:sumitnair731@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 text-gray-500 transition-colors hover:text-cyan-400 rounded-full hover:bg-white/10"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 transition-colors hover:text-cyan-400"
      >
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between px-4 text-xs font-mono text-gray-600">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Hero.tsx</span>
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-green-500">Live</span>
          </span>
          <span>Next.js 16</span>
        </div>
      </div>
    </section>
  );
}
