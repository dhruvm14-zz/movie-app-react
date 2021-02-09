import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./MovieHome.css";
import axios from "axios";
import { APIKey } from "../../requests";
import { useParams } from "react-router";

function MovieHome() {
  const { movieID } = useParams();
  const [movie, setmovie] = useState({});

  useEffect(() => {
    const getData = async () => {
      const Data = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${APIKey}&language=en-US&append_to_response=videos,images`
      );
      console.log(Data.data);
      setmovie(Data.data);
    };
    getData();
  }, [movieID]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="MovieHome">
      <div className="moviehome__header">
        <div>Hey This is page for {movie.title}</div>
        <div>
          {movie.videos && (
            <YouTube videoId={movie.videos.results[0].key} opts={opts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieHome;
