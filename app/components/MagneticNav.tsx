"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: User, label: "About", href: "/#about" },
  { icon: Briefcase, label: "Work", href: "/#work" },
  { icon: FileText, label: "Experience", href: "/experience", isExternal: true },
  { icon: Mail, label: "Contact", href: "/#contact" },
];

export default function MagneticNav() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Show nav after a short delay (after loader)
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse position relative to nav
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate magnetic effect for each item
  const getMagneticEffect = (index: number) => {
    if (!navRef.current) return { scale: 1, y: 0 };

    const itemWidth = 64; // approximate width of each nav item
    const itemCenter = index * itemWidth + itemWidth / 2 + 16; // 16 = padding
    const distance = Math.abs(mousePosition.x - itemCenter);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const strength = 1 - distance / maxDistance;
      return {
        scale: 1 + strength * 0.15,
        y: -strength * 8,
      };
    }

    return { scale: 1, y: 0 };
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: 100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      }}
      className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="glass-surface backdrop-blur-[10px] flex items-center gap-1 rounded-full px-4 py-3 shadow-2xl">
        {navItems.map((item, index) => {
          const effect = getMagneticEffect(index);
          const Icon = item.icon;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                // For external page links, navigate normally
                if (item.isExternal) {
                  return;
                }
                
                // If we're on the home page and it's a hash link, smooth scroll
                if (pathname === "/" && item.href.includes("#")) {
                  e.preventDefault();
                  const id = item.href.replace("/#", "").replace("#", "");
                  if (id) {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
                
              }}
              animate={{
                scale: effect.scale,
                y: effect.y,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              whileHover={{
                scale: 1.2,
                y: -10,
              }}
              whileTap={{ scale: 0.9 }}
              className="group relative flex flex-col items-center justify-center rounded-full p-3 transition-colors hover:bg-white/10"
            >
              <Icon className="h-5 w-5 text-gray-500 transition-colors group-hover:text-cyan-400" />

              {/* Label tooltip */}
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                whileHover={{ opacity: 1, y: -8, scale: 1 }}
                className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 font-mono text-xs text-slate-100 opacity-0"
              >
                {item.label}
              </motion.span>
            </motion.a>
          );
        })}
      </div>

      {/* Glow effect under dock */}
      <div className="absolute -bottom-2 left-1/2 -z-10 h-8 w-3/4 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-xl" />
    </motion.nav>
  );
}
