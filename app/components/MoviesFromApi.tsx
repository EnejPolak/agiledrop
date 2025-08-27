"use client";
// app/components/MoviesFromApi.tsx
import { useEffect, useState } from "react";
import MovieCard from "./movieCard";

type Movie = {
  id: number;
  title: string;
  poster: string | null;
  rating: number | null;
  releaseDate: string | null;
};

export default function MoviesFromApi() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch('/api', { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section className="cards-grid">
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          title={m.title}
          poster={m.poster}
          rating={m.rating}
          releaseDate={m.releaseDate}
        />
      ))}
    </section>
  );
}
