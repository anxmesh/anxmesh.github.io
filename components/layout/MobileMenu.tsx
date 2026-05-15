"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { NavLink } from "@/types";
import styles from "@/styles/components/MobileMenu.module.css";

interface MobileMenuProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
  formatNumber: (num: number) => string;
}

export default function MobileMenu({
  links,
  isOpen,
  onClose,
  isActive,
  formatNumber,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");
          if (isExternal) {
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuLink}
                onClick={onClose}
              >
                <span className={styles.menuLinkNumber}>
                  {formatNumber(link.number)}
                </span>
                {link.label}
              </a>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.menuLink} ${isActive(link.href) ? styles.menuLinkActive : ""}`}
              onClick={onClose}
            >
              <span className={styles.menuLinkNumber}>
                {formatNumber(link.number)}
              </span>
              {link.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
