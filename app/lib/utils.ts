// Utility functions for Hero component

// Syntax colors for code tokenization
export const COLORS = {
  keyword: "#c678dd",
  string: "#98c379",
  function: "#61afef",
  type: "#e5c07b",
  comment: "#5c6370",
  variable: "#abb2bf",
  operator: "#56b6c2",
};

export const KEYWORDS = ["const", "let", "return", "import", "from", "export", "default"];

// Meta code for background animation
export const HERO_SOURCE_CODE = `// Hero.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-black p-6">
      <motion.div 
        className="text-center w-full max-w-lg px-8 py-12"
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        style={{ animation: "float 8s ease-in-out infinite" }}
      >
        {/* Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Sumit Santhosh Nair
        </motion.h1>

        {/* Role */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm sm:text-base text-cyan-400 mb-6"
        >
          <span className="text-gray-500">{"// "}</span>
          Full Stack Developer <span className="text-gray-500">·</span> Videographer
        </motion.p>

        {/* Bio */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm max-w-md mx-auto mb-8 font-mono leading-relaxed"
        >
          <span className="text-gray-600">{"/* "}</span>
          Engineering student at PES University. Focused on building scalable web
          applications and exploring multi-modal AI systems.
          <span className="text-gray-600">{" */"}</span>
        </motion.p>

        {/* Action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <motion.a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-cyan-500 text-black text-sm font-medium"
          >
            View Work
          </motion.a>
          
          <motion.a
            href="/experience"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-gray-300 text-sm font-medium rounded-full border border-white/20 transition-all hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-white/5"
          >
            Experience
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            {[
              { icon: Github, href: "https://github.com/", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-gray-400 transition-colors hover:text-cyan-400 rounded-full hover:bg-white/10"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};`;

/**
 * Tokenizes a line of code into syntax-highlighted tokens
 * @param line The line of code to tokenize
 * @returns Array of tokens with text and color properties
 */
export function tokenize(line: string): { text: string; color: string }[] {
  const tokens: { text: string; color: string }[] = [];
  let rest = line;

  while (rest.length > 0) {
    // Check for comments
    if (rest.startsWith("//")) {
      tokens.push({ text: rest, color: COLORS.comment });
      break;
    }

    // Check for strings
    const strMatch = rest.match(/^("[^"]*"|'[^']*')/);
    if (strMatch) {
      tokens.push({ text: strMatch[0], color: COLORS.string });
      rest = rest.slice(strMatch[0].length);
      continue;
    }

    // Check for keywords
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

    // Check for JSX tags
    const tagMatch = rest.match(/^<\/?[a-zA-Z.]+/);
    if (tagMatch) {
      tokens.push({ text: tagMatch[0], color: COLORS.function });
      rest = rest.slice(tagMatch[0].length);
      continue;
    }

    // Default: variable color
    tokens.push({ text: rest[0], color: COLORS.variable });
    rest = rest.slice(1);
  }

  return tokens;
}
