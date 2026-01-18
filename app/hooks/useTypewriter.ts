"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  pauseDuration?: number;
  loop?: boolean;
  startDelay?: number;
}

interface UseTypewriterReturn {
  displayedText: string;
  isTyping: boolean;
  isComplete: boolean;
  restart: () => void;
}

export function useTypewriter({
  text,
  speed = 30,
  pauseDuration = 3000,
  loop = true,
  startDelay = 500,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const restart = useCallback(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsTyping(false);
    setIsComplete(false);
    setIsPaused(false);
  }, []);

  // Start delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  // Typing effect
  useEffect(() => {
    if (!isTyping || isPaused) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Typing complete
      setIsComplete(true);
      setIsTyping(false);

      if (loop) {
        setIsPaused(true);
        const pauseTimer = setTimeout(() => {
          restart();
        }, pauseDuration);

        return () => clearTimeout(pauseTimer);
      }
    }
  }, [currentIndex, isTyping, isPaused, text, speed, loop, pauseDuration, restart]);

  return {
    displayedText,
    isTyping,
    isComplete,
    restart,
  };
}
