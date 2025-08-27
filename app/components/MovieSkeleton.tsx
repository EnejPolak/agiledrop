// app/components/MovieSkeleton.tsx
export default function MovieSkeleton() {
  return (
    <article className="movie-skeleton">
      <div className="movie-skeleton__image">
        <div className="skeleton-shimmer"></div>
        <div className="movie-skeleton__rating"></div>
      </div>
      <div className="movie-skeleton__content">
        <div className="movie-skeleton__title"></div>
        <div className="movie-skeleton__date"></div>
      </div>
    </article>
  );
}


export function MovieSkeletonGrid({ count = 20 }: { count?: number }) {
  return (
    <section className="cards-grid">
      {Array.from({ length: count }, (_, index) => (
        <MovieSkeleton key={`skeleton-${index}`} />
      ))}
    </section>
  );
}
