import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BigMovie.css";
const imgBase = "https://image.tmdb.org/t/p/original";

const BigMovie = ({ movie, crew }) => {
  const [Director, setDirector] = useState({ name: "" });
  console.log(crew);
  useEffect(() => {
    crew.forEach((crew) => {
      if (crew["job"] === "Director") {
        setDirector(crew);
        return;
      }
    });
  }, [crew]);

  const rating = Number(movie.vote_average);
  let ratingColor = "red";
  if (rating >= 8) ratingColor = "green";
  else if (rating >= 7 && rating < 8) ratingColor = "orange";

  return (
    <div
      className="moviehome__header"
      style={{ backgroundImage: `url(${imgBase}${movie.backdrop_path})` }}
    >
      <div class="card">
        <div class="card_left">
          <img src={imgBase + movie.poster_path} />
        </div>
        <div class="card_right">
          <h1>
            {movie?.title || movie?.original_title || movie?.original_name}
          </h1>
          <div class="card_right__details">
            <ul>
              <li>{new Date(movie.release_date).getFullYear()}</li>
              <li>{movie.runtime} min</li>
            </ul>
            <ul>
              {movie.genres.map((genre, index) => {
                return (
                  <li>
                    <Link
                      key={index++}
                      className="bigmovie__link"
                      to={`/genre/${genre.id}/${genre.name}`}
                    >
                      {genre.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div class="card_right__review">
              <p>{movie.overview && movie.overview.slice(0, 250)}...</p>
            </div>
            <div className="bigmovie__dir">Director : {Director.name}</div>
            <div className="bigmovie__rating">
              Rating :
              <span
                style={{
                  fontSize: "30px",
                  color: ratingColor,
                  paddingLeft: "5px",
                }}
              >
                {movie.vote_average}
              </span>
              /10
            </div>
            <div className="bigmovie__runtime">
              Runtime : {movie.runtime} min
            </div>

            {/* <div class="card_right__button">
              <a
                href="https://www.youtube.com/watch?v=ot6C1ZKyiME"
                target="_blank"
              >
                WATCH TRAILER
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigMovie;

//  <div
//     className="moviehome__header"
//     style={{ backgroundImage: `url(${imgBase}${movie.backdrop_path})` }}
//   >
//     <div className="moviehome__title">
//       <div className="moviehome__poster">
//         <img src={imgBase + movie.poster_path} />
//       </div>

//       <div className="moviehome__content">
//         <div className="movie__home__maintitle">
//           {movie?.title || movie?.original_title || movie?.original_name}
//         </div>
//         <div className="moviehome__overview">{movie.overview}</div>
//         <div className="moviehome__genre">
//           <div></div>

//           <div className="BigMovie__rating">
//             <span style={{ fontSize: "28px", color: { ratingColor } }}>
//               {console.log(ratingColor)}
//               {movie.vote_average}
//             </span>
//             /10
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
{
  /* <a
  href={`http://www.imdb.com/title/${movie.imdb_id}/plotsummary?ref_=tt_stry_pl`}
  target="_blank"
>
  Read more
</a>; */
}
