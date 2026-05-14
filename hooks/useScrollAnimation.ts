"use client";

import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Adds a CSS class when an element scrolls into view.
 * Returns a ref to attach to the target element.
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -80px 0px", once = true } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("animate-in");
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            element.classList.remove("animate-in");
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Adds staggered animation to a list of children.
 * Returns a ref to attach to the parent container.
 */
export function useStaggerAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions & { staggerDelay?: number } = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -60px 0px", staggerDelay = 100 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = container.querySelectorAll("[data-animate]");
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-in");
              }, index * staggerDelay);
            });
            observer.unobserve(container);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, staggerDelay]);

  return ref;
}
