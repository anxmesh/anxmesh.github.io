import type { ReadingEntryData } from "@/types";
import styles from "@/styles/components/ReadingList.module.css";

interface ReadingEntryProps {
  entry: ReadingEntryData;
}

export default function ReadingEntry({ entry }: ReadingEntryProps) {
  return (
    <div className={styles.entry}>
      <div>
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.entryTitleLink}
          >
            <span className={styles.entryTitle}>{entry.title}</span>
          </a>
        ) : (
          <span className={styles.entryTitle}>{entry.title}</span>
        )}
        <span className={styles.entryAuthor}>{entry.author}</span>
      </div>
      <p className={styles.entryNote}>{entry.note}</p>
    </div>
  );
}
