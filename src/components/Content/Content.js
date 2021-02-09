import { APIKey } from "../../requests";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import "./Content.css";
import ClearIcon from "@material-ui/icons/Clear";
import { Link } from "react-router-dom";
const imgBase = "https://image.tmdb.org/t/p/original";

function Content(props) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (selectedMovie && selectedMovie.id === props.movieId) return;
    const getData = async () => {
      const Data = await axios.get(
        `/movie/${props.movieId}?api_key=${APIKey}&language=en-US`
      );
      setSelectedMovie(Data.data);
    };
    getData();
  }, [props.movieId]);

  console.log(selectedMovie);
  if (selectedMovie) {
    const day = new Date(selectedMovie.release_date);
    console.log(day.toDateString());
  }

  return (
    selectedMovie && (
      <div className="Content">
        <div className="Content__text">
          <h2 className="Context__title">
            {selectedMovie?.title ||
              selectedMovie?.original_title ||
              selectedMovie?.original_name}
          </h2>
          <p className="Content__overview">{selectedMovie.overview}</p>
          <div className="content_info">
            <p>
              Genre :
              {selectedMovie.genres.map((genre) => {
                return (
                  <Link
                    className="content__genre"
                    to={`/genre/${genre.id}/${genre.name}`}
                  >
                    {genre.name}
                  </Link>
                );
              })}
            </p>
            <p>
              Release Date :{" "}
              {new Date(selectedMovie.release_date).toDateString()}
            </p>
            <p>Run Time : {selectedMovie.runtime} Minutes</p>
            <Link className="content__link" to={`/movie/${selectedMovie.id}`}>
              READ MORE
            </Link>
          </div>
        </div>
        <div
          className="Content__img"
          style={{
            backgroundImage: `url(
            ${imgBase}${selectedMovie.backdrop_path}
          )`,
          }}
        >
          <div className="Content__fade"></div>
        </div>
        <button
          onClick={() => {
            setSelectedMovie(null);
          }}
        >
          <ClearIcon />
        </button>
      </div>
    )
  );
}

export default Content;
