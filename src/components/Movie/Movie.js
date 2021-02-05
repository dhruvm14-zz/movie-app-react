import React from "react";
import "./Movie.css";
const imgBase = "https://image.tmdb.org/t/p/original";

function Movie({ movie, large, click, search }) {
  const rating = Number(movie.vote_average);
  let ratingColor = "red";
  if (rating >= 8) ratingColor = "green";
  else if (rating >= 7 && rating < 8) ratingColor = "orange";

  return (
    movie.poster_path &&
    movie.backdrop_path && (
      <div
        className={`movieRow__poster ${large && "movie__rowlarge"} ${
          search && "movie__search"
        }`}
        onClick={click}
      >
        {!large && (
          <h2 className="movie__title">
            {movie?.title || movie?.original_title || movie?.original_name}
          </h2>
        )}
        <p className="movie__vote" style={{ backgroundColor: ratingColor }}>
          {movie.vote_average}
        </p>

        <img
          key={movie.id}
          src={`${imgBase}${large ? movie.poster_path : movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
    )
  );
}

export default Movie;
