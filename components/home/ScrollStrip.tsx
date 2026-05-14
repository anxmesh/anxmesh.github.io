"use client";

import { useRef, useCallback } from "react";
import styles from "@/styles/components/ScrollStrip.module.css";

interface ScrollStripProps {
  children: React.ReactNode;
  enableScroll?: boolean;
}

export default function ScrollStrip({ children, enableScroll = true }: ScrollStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!enableScroll || !stripRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeft.current = stripRef.current.scrollLeft;
  }, [enableScroll]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    stripRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!stripRef.current) return;
    const scrollAmount = 320;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stripRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stripRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={stripRef}
      className={`${styles.strip} ${!enableScroll ? styles.stripNoScroll : ""}`}
      role="region"
      aria-label="Project carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
