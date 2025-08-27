"use client";

import { useEffect, useState, useCallback } from "react";
import MovieCardAlt from "./MovieCardAlt";
import GenreFilter from "./GenreFilter";
import SearchBar from "./SearchBar";
import { MovieSkeletonGrid } from "./MovieSkeleton";
import Button from "./Button";

type Movie = {
  id: number;
  title: string;
  poster: string | null;
  rating: number | null;
  releaseDate: string | null;
};

type ApiResponse = {
  movies: Movie[];
  currentPage: number;
  hasMore: boolean;
};

export default function MoviesFromApi() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const buildApiUrl = (pageNum: number) => {
    const params = new URLSearchParams({ page: pageNum.toString() });
    if (selectedGenres.length > 0) params.set('genre', selectedGenres.join(','));
    if (searchQuery) params.set('search', searchQuery);
    return `/api?${params}`;
  };

  const removeDuplicates = (movieList: Movie[]) => {
    const seen = new Set();
    return movieList.filter(movie => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
  };

  const fetchMovies = async (pageNum: number, append = false) => {
    try {
      setLoading(true);
      const res = await fetch(buildApiUrl(pageNum), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load movies");

      const data: ApiResponse = await res.json();
      
      setMovies(prev => {
        const newMovies = append ? [...prev, ...data.movies] : data.movies;
        return removeDuplicates(newMovies);
      });
      
      setPage(data.currentPage);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetAndFetch = () => {
    setMovies([]);
    setPage(1);
    setInfiniteScroll(false);
    setHasMore(true);
    fetchMovies(1);
  };

 
  useEffect(() => {
    resetAndFetch();
  }, [selectedGenres, searchQuery]);

 
  const handleScroll = useCallback(() => {
    if (!infiniteScroll || loading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      fetchMovies(page + 1, true);
    }
  }, [infiniteScroll, loading, hasMore, page]);

  useEffect(() => {
    if (!infiniteScroll) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [infiniteScroll, handleScroll]);

  const handleLoadMore = () => {
    fetchMovies(page + 1, true);
    setInfiniteScroll(true);
  };

  const handleGenreChange = (genreIds: number[]) => {
    setSelectedGenres(genreIds);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) setSelectedGenres([]);
  };

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <SearchBar onSearch={handleSearch} isLoading={loading} />
      
      <div className="movies-container">
        <GenreFilter 
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreChange}
        />
        
        <div className="movies-content">
          {loading && movies.length === 0 ? (
            <MovieSkeletonGrid count={20} />
          ) : (
            <section className="cards-grid">
              {movies.map((movie) => (
                <MovieCardAlt key={movie.id} {...movie} />
              ))}
            </section>
          )}

          {hasMore && !infiniteScroll && movies.length > 0 && (
            <div className="load-more-container">
              <Button onClick={handleLoadMore} loading={loading}>
                Load More Movies
              </Button>
            </div>
          )}

          {infiniteScroll && loading && (
            <div className="infinite-loading">
              <div className="loading-spinner"></div>
              <p>Loading more movies...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}