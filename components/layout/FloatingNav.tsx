"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/types";
import ThemeToggle from "./ThemeToggle";
import styles from "@/styles/components/FloatingNav.module.css";

interface FloatingNavProps {
  links: NavLink[];
}

export default function FloatingNav({ links }: FloatingNavProps) {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    if (href.startsWith("http")) return false;
    return pathname.startsWith(href);
  }

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav} aria-label="Main navigation">
        <ThemeToggle />
        <span className={styles.divider} />
        <div className={styles.links}>
          {links.map((link) => {
            const isExternal = link.href.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${isActive(link.href) ? styles.linkActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
