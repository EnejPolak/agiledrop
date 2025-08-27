import { NextResponse } from "next/server";

export async function GET() {
 
    const page = Math.floor(Math.random() * 50) + 1;

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            accept: "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await res.json();

      const movies =
      (data.results || [] ).slice(0,20).map((m: any) => ({
        id: m.id,
        title: m.title,
        poster: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : null,
        rating: m.vote_average,
        releaseDate: m.release_date,
      })) ?? [];
return NextResponse.json(movies);
}
