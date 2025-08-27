// app/components/GenreFilter.tsx
"use client";

type Genre = {
  id: number;
  name: string;
};

type GenreFilterProps = {
  selectedGenres: number[];
  onGenreChange: (genreIds: number[]) => void;
};

const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export default function GenreFilter({ selectedGenres, onGenreChange }: GenreFilterProps) {
  const toggleGenre = (genreId: number) => {
    const isSelected = selectedGenres.includes(genreId);
    onGenreChange(
      isSelected 
        ? selectedGenres.filter(id => id !== genreId)
        : [...selectedGenres, genreId]
    );
  };

  const isAllActive = selectedGenres.length === 0;

  return (
    <aside className="genre-filter">
      <h2 className="genre-filter__title">Genres</h2>
      <div className="genre-filter__list">
        <button
          className={`genre-filter__item ${isAllActive ? 'genre-filter__item--active' : ''}`}
          onClick={() => onGenreChange([])}
        >
          All Movies
        </button>
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            className={`genre-filter__item ${selectedGenres.includes(genre.id) ? 'genre-filter__item--active' : ''}`}
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
