import type { ReadingEntryData } from "@/types";
import ReadingEntry from "./ReadingEntry";
import styles from "@/styles/components/ReadingList.module.css";

interface ReadingListProps {
  books: ReadingEntryData[];
  articles: ReadingEntryData[];
}

export default function ReadingList({ books, articles }: ReadingListProps) {
  const isEmpty = books.length === 0 && articles.length === 0;

  if (isEmpty) {
    return <p className={styles.emptyState}>No recommendations available yet.</p>;
  }

  return (
    <div>
      {books.length > 0 && (
        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Books</h2>
          {books.map((entry) => (
            <ReadingEntry key={entry.title} entry={entry} />
          ))}
        </div>
      )}
      {articles.length > 0 && (
        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Articles</h2>
          {articles.map((entry) => (
            <ReadingEntry key={entry.title} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
