import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";
const HEADERS = {
  Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  accept: "application/json",
};

const buildUrl = (page: number, genre?: string, search?: string) => {
  if (search) {
    return `${TMDB_BASE}/search/movie?language=en-US&page=${page}&query=${encodeURIComponent(search)}`;
  }
  
  if (genre) {
    const genres = genre.replace(/,/g, '|');
    return `${TMDB_BASE}/discover/movie?language=en-US&page=${page}&with_genres=${genres}&sort_by=popularity.desc`;
  }
  
  return `${TMDB_BASE}/movie/popular?language=en-US&page=${page}`;
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
    
    const apiUrl = buildUrl(page, genre || undefined, search || undefined);
    const res = await fetch(apiUrl, { headers: HEADERS, cache: "no-store" });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }

    const data = await res.json();
    const movies = data.results?.map(transformMovie) || [];

    return NextResponse.json({
      movies,
      currentPage: page,
      hasMore: page < (data.total_pages || 1)
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}