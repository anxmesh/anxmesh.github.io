import ReadingList from "@/components/reading/ReadingList";
import { getReadingListGrouped } from "@/lib/reading";
import styles from "@/styles/components/ReadingList.module.css";

export default function ReadingPage() {
  const { books, articles } = getReadingListGrouped();

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Reading</h1>
      <ReadingList books={books} articles={articles} />
    </div>
  );
}
