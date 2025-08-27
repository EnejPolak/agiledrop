// app/page.tsx
import MoviesFromApi from "./components/MoviesFromApi";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="main-container">
      <header className="page-header">
        <h1 className="page-title">Polak Movies</h1>
        <p className="page-subtitle">Discover the most popular movies from around the world</p>
      </header>
      <MoviesFromApi />
      <Footer />
    </main>
  );
}
