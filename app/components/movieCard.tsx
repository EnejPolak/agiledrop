// app/components/movieCard.tsx
export type MovieCardProps = {
    title: string;
    poster: string | null;
    rating: number | null;
    releaseDate: string | null;
  };
  
  export default function MovieCard({ title, poster, rating, releaseDate }: MovieCardProps) {
    return (
      <article className="movie-card">
        {poster ? (
          <img className="movie-card__media" src={poster} alt={title} />
        ) : (
          <div className="movie-card__placeholder">No image</div>
        )}
        <div className="movie-card__body">
          <h3 className="movie-card__title">{title}</h3>
          <p className="movie-card__meta">
            {releaseDate ?? "Unknown date"}
            {typeof rating === "number" ? ` • ⭐ ${rating.toFixed(1)}` : ""}
          </p>
        </div>
      </article>
    );
  }
  