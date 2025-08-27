// app/page.tsx
import MoviesFromApi from "./components/MoviesFromApi";

export default function Page() {
  return (
    <main style={{ padding: 24, display: "grid", gap: 20 }}>
      <h1 style={{ margin: 0 }}>Filmi 🎬</h1>
      <MoviesFromApi />
    </main>
  );
}
