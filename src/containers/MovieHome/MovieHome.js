import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./MovieHome.css";
import axios from "axios";
import { APIKey } from "../../requests";
import { useParams } from "react-router";
import BigMovie from "../../components/BigMovie/BigMovie";
import CastRow from "../../components/CastRow/CastRow";
import MovieRow from "../../components/MovieRow/MovieRow";

function MovieHome() {
  const { movieID } = useParams();

  const [movie, setmovie] = useState({ genres: [] });
  const [cast, setcast] = useState({});
  const [crew, setcrew] = useState([]);
  const recommendedEndPoint = `/movie/${movieID}/recommendations?api_key=${APIKey}&language=en-US&page=1`;
  const similarEndPoint = `/movie/${movieID}/similar?api_key=${APIKey}&language=en-US&page=1`;

  useEffect(() => {
    const getData = async () => {
      const Data = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${APIKey}&language=en-US&append_to_response=videos,images`
      );
      console.log(Data.data);
      setmovie(Data.data);
    };
    const getCrew = async () => {
      const castData = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${APIKey}&language=en-US`
      );
      setcast(castData.data);
      setcrew(castData.data.crew);
    };
    getData();
    getCrew();
    window.scrollTo(0, 0);
  }, [movieID]);

  const opts = {
    height: "400",
    width: "700",
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  return (
    <div className="MovieHome">
      {movie && <BigMovie movie={movie} crew={crew} />}
      <div className="movieHome__trailer">
        <div>
          {movie.videos && movie.videos.results[0] && (
            <YouTube videoId={movie.videos.results[0].key} opts={opts} />
          )}
        </div>
        <div>Hello This is Home</div>
      </div>
      {cast.cast && <CastRow cast={cast.cast} title="CAST" />}
      {crew && <CastRow cast={crew} title="CREW" />}
      <MovieRow
        title="Recommended Movies "
        endPoint={recommendedEndPoint}
        isLarge
      />
      {console.log(similarEndPoint)}
      <MovieRow title="Similar Movies " endPoint={similarEndPoint} isLarge />
    </div>
  );
}

export default MovieHome;
