"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/types";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import styles from "@/styles/components/NavigationBar.module.css";

interface NavigationBarProps {
  links: NavLink[];
  siteName: string;
}

export default function NavigationBar({ links, siteName }: NavigationBarProps) {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useMobileMenu();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false; // anchor links don't get active state from pathname alone
    if (href.startsWith("http")) return false;
    return pathname.startsWith(href);
  }

  function formatNumber(num: number): string {
    return num.toString().padStart(2, "0");
  }

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.siteName}>
        <img src="/favicon.png" alt="" className={styles.siteLogo} aria-hidden="true" />
        {siteName}
      </Link>

      {/* Desktop links */}
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
                <span className={styles.linkNumber}>{formatNumber(link.number)}</span>
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
              <span className={styles.linkNumber}>{formatNumber(link.number)}</span>
              {link.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </div>

      {/* Mobile: theme toggle + hamburger */}
      <div className={styles.mobileActions}>
        <ThemeToggle />
        <button
          className={styles.menuToggle}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuToggleBar} />
          <span className={styles.menuToggleBar} />
          <span className={styles.menuToggleBar} />
        </button>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        links={links}
        isOpen={isOpen}
        onClose={close}
        isActive={isActive}
        formatNumber={formatNumber}
      />
    </nav>
  );
}
