"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "@/styles/components/Typewriter.module.css";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[currentPhraseIndex];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else {
        // Finished typing — pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Finished deleting — move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [displayText, isDeleting, isPaused, currentPhrase, phrases.length, pauseDuration]);

  useEffect(() => {
    if (isPaused) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, isPaused, typingSpeed, deletingSpeed]);

  return (
    <span className={styles.typewriter}>
      <span className={styles.text}>{displayText}</span>
      <span className={styles.cursor}>|</span>
    </span>
  );
}
