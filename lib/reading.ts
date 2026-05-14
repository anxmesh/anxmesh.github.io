import fs from "fs";
import path from "path";
import type { ReadingEntryData } from "@/types";
import { validateReadingList } from "./validation";

const READING_FILE = path.join(process.cwd(), "content/reading.json");

/**
 * Reads the reading list JSON file, validates it, and returns
 * the entries array. Supports empty array (renders empty state).
 */
export function getReadingList(): ReadingEntryData[] {
  const raw = fs.readFileSync(READING_FILE, "utf-8");
  const data = JSON.parse(raw);
  const entries = validateReadingList(data);

  // Sort by displayOrder if present, otherwise preserve source order
  return entries.sort((a, b) => {
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder;
    }
    return 0;
  });
}

/**
 * Returns reading entries grouped by type.
 */
export function getReadingListGrouped(): {
  books: ReadingEntryData[];
  articles: ReadingEntryData[];
} {
  const entries = getReadingList();
  return {
    books: entries.filter((e) => e.type === "book"),
    articles: entries.filter((e) => e.type === "article"),
  };
}
