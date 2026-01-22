"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=[]{}|;':,./<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TARGET_TEXT = "Sumit Santhosh Nair";
const DECODE_SPEED = 10;
const CYCLES_PER_CHAR = 5;

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [displayText, setDisplayText] = useState<string[]>(Array(TARGET_TEXT.length).fill(""));
  const [revealedCount, setRevealedCount] = useState(0);
  const [phase, setPhase] = useState<"decode" | "hold" | "fadeout">("decode");
  const [cycleCount, setCycleCount] = useState(0);

  const getRandomChar = useCallback(() => CHARS[Math.floor(Math.random() * CHARS.length)], []);

  useEffect(() => {
    if (phase !== "decode") return;
    const interval = setInterval(() => {
      setDisplayText(prev => {
        const newText = [...prev];
        for (let i = revealedCount; i < TARGET_TEXT.length; i++) {
          newText[i] = TARGET_TEXT[i] === " " ? " " : getRandomChar();
        }
        return newText;
      });
      setCycleCount(prev => {
        if (prev + 1 >= CYCLES_PER_CHAR) {
          setRevealedCount(prevRevealed => {
            setDisplayText(prevText => {
              const newText = [...prevText];
              newText[prevRevealed] = TARGET_TEXT[prevRevealed];
              return newText;
            });
            if (prevRevealed + 1 >= TARGET_TEXT.length) setPhase("hold");
            return prevRevealed + 1;
          });
          return 0;
        }
        return prev + 1;
      });
    }, DECODE_SPEED);
    return () => clearInterval(interval);
  }, [phase, revealedCount, getRandomChar]);

  useEffect(() => {
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("fadeout"), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "fadeout") {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fadeout" ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center px-6">
            {/* Match Hero h1 sizing exactly */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight whitespace-nowrap">
              {displayText.map((char, i) => (
                <motion.span
                  key={i}
                  animate={{
                    opacity: i < revealedCount ? 1 : 0.4,
                    color: i < revealedCount ? "#ffffff" : "#6b7280",
                  }}
                  className={`inline-block ${char === " " ? "w-2 sm:w-3" : ""}`}
                >
                  {char || "\u00A0"}
                </motion.span>
              ))}
            </h1>
            
            {/* Progress line */}
            <motion.div
              animate={{ scaleX: revealedCount / TARGET_TEXT.length, opacity: 0.6 }}
              className="mt-4 mx-auto h-px w-48 origin-left bg-cyan-400"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white whitespace-nowrap">
            {TARGET_TEXT}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
