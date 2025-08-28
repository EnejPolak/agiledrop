export type MovieCardAltProps = {
  title: string;
  poster: string | null;
  rating: number | null;
  releaseDate: string | null;
};

export default function MovieCardAlt({ title, poster, rating, releaseDate }: MovieCardAltProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRatingPercentage = (rating: number | null) => {
    if (!rating) return 0;
    return Math.round(rating * 10); 
  };

  const getRatingColor = (percentage: number) => {
    if (percentage >= 70) return '#4ade80'; 
    if (percentage >= 40) return '#fbbf24';  
    return '#ef4444'; 
  };

  const percentage = getRatingPercentage(rating);
  const color = getRatingColor(percentage);

  return (
    <article className="movie-card-alt">
      <div className="movie-card-alt__image-container">
        {poster ? (
          <img className="movie-card-alt__image" src={poster} alt={title} />
        ) : (
          <div className="movie-card-alt__placeholder">No Image</div>
        )}
        
        {rating && (
          <div className="movie-card-alt__rating" style={{ '--rating-color': color } as any}>
            <svg className="rating-circle" viewBox="0 0 42 42">
              <circle
                className="rating-circle-bg"
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
              />
              <circle
                className="rating-circle-progress"
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                strokeDasharray={`${percentage} 100`}
                style={{ stroke: color }}
              />
            </svg>
            <div className="rating-text">
              <span className="rating-number">{percentage}</span>
              <span className="rating-percent">%</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="movie-card-alt__content">
        <h3 className="movie-card-alt__title">{title}</h3>
        <p className="movie-card-alt__date">{formatDate(releaseDate)}</p>
      </div>
    </article>
  );
}
