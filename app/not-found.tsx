import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-md)",
        padding: "var(--gutter)",
      }}
    >
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>404</h1>
      <p style={{ color: "var(--color-muted)" }}>This page doesn't exist.</p>
      <Link
        href="/"
        style={{
          color: "var(--color-accent)",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        ← Back home
      </Link>
    </div>
  );
}
