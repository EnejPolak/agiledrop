import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";
const HEADERS = {
  Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  accept: "application/json",
};

const buildTMDBUrl = (page: number, genre?: string, search?: string) => {
  const safePage = Math.min(Math.max(page, 1), 100);
  
  if (search) {
    return `${TMDB_BASE}/search/movie?language=en-US&page=${safePage}&query=${encodeURIComponent(search)}`;
  }
  
  if (genre) {
    const genres = genre.replace(/,/g, '|');
    return `${TMDB_BASE}/discover/movie?language=en-US&page=${safePage}&with_genres=${genres}&sort_by=popularity.desc`;
  }
  
  return `${TMDB_BASE}/movie/popular?language=en-US&page=${safePage}`;
};

const transformMovie = (m: any) => ({
  id: m.id,
  title: m.title,
  poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
  rating: m.vote_average,
  releaseDate: m.release_date,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');
    
    const apiUrl = buildTMDBUrl(page, genre || undefined, search || undefined);
    const res = await fetch(apiUrl, { headers: HEADERS, cache: "no-store" });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }

    const data = await res.json();
    const safePage = Math.min(Math.max(page, 1), 100);
    const totalPages = Math.min(data.total_pages || 1, 100);
    
    const movies = (data.results || [])
      .filter((m: any) => m.id)
      .map(transformMovie);

    return NextResponse.json({
      movies,
      currentPage: safePage,
      hasMore: safePage < totalPages
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}