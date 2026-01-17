"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789";
const TARGET_TEXT = "SUMIT NAIR";
const DECODE_SPEED = 50; // ms per character cycle
const CYCLES_PER_CHAR = 8; // random cycles before revealing each char

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [displayText, setDisplayText] = useState<string[]>(
    Array(TARGET_TEXT.length).fill("")
  );
  const [revealedCount, setRevealedCount] = useState(0);
  const [phase, setPhase] = useState<"decode" | "transition" | "done">("decode");
  const [cycleCount, setCycleCount] = useState(0);

  // Get a random character
  const getRandomChar = useCallback(() => {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }, []);

  // Decode animation effect
  useEffect(() => {
    if (phase !== "decode") return;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        const newText = [...prev];

        // Update unrevealed characters with random chars
        for (let i = revealedCount; i < TARGET_TEXT.length; i++) {
          if (TARGET_TEXT[i] === " ") {
            newText[i] = " ";
          } else {
            newText[i] = getRandomChar();
          }
        }

        return newText;
      });

      setCycleCount((prev) => {
        const newCount = prev + 1;

        // Every CYCLES_PER_CHAR cycles, reveal the next character
        if (newCount >= CYCLES_PER_CHAR) {
          setRevealedCount((prevRevealed) => {
            const nextRevealed = prevRevealed + 1;

            // Update to show the revealed character
            setDisplayText((prevText) => {
              const newText = [...prevText];
              newText[prevRevealed] = TARGET_TEXT[prevRevealed];
              return newText;
            });

            // Check if all characters are revealed
            if (nextRevealed >= TARGET_TEXT.length) {
              setPhase("transition");
            }

            return nextRevealed;
          });

          return 0;
        }

        return newCount;
      });
    }, DECODE_SPEED);

    return () => clearInterval(interval);
  }, [phase, revealedCount, getRandomChar]);

  // Transition phase - wait then complete
  useEffect(() => {
    if (phase !== "transition") return;

    const timer = setTimeout(() => {
      setPhase("done");
    }, 800);

    return () => clearTimeout(timer);
  }, [phase]);

  // Done phase - notify parent
  useEffect(() => {
    if (phase === "done") {
      onComplete();
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void"
        >
          <motion.div
            animate={
              phase === "transition"
                ? {
                    scale: 0.6,
                    x: "-40vw",
                    y: "-40vh",
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <h1 className="font-mono text-4xl font-bold tracking-widest sm:text-5xl md:text-6xl">
              {displayText.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: index < revealedCount ? 1 : 0.6,
                    color:
                      index < revealedCount
                        ? "var(--mist)"
                        : "var(--steel)",
                  }}
                  className={`inline-block ${
                    char === " " ? "w-4" : ""
                  }`}
                >
                  {char || "\u00A0"}
                </motion.span>
              ))}
            </h1>

            {/* Subtle underline glow */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: revealedCount / TARGET_TEXT.length,
                opacity: 0.6,
              }}
              transition={{ duration: 0.1 }}
              className="mt-4 h-[2px] origin-left bg-gradient-to-r from-amber to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
