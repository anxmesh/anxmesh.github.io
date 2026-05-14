import fs from "fs";
import path from "path";
import type { SiteConfig } from "@/types";
import { validateSiteConfig } from "./validation";

const SITE_CONFIG_FILE = path.join(process.cwd(), "content/site.json");

/**
 * Reads the site configuration JSON file, validates it,
 * and returns the typed config object.
 */
export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(SITE_CONFIG_FILE, "utf-8");
  const data = JSON.parse(raw);
  return validateSiteConfig(data);
}
