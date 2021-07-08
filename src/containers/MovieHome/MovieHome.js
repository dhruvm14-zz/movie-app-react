import React, { useState, useEffect, useContext } from "react";
import YouTube from "react-youtube";
import "./MovieHome.css";
import axios from "axios";
import { APIKey } from "../../requests";
import { useParams } from "react-router";
import BigMovie from "../../components/BigMovie/BigMovie";
import CastRow from "../../components/CastRow/CastRow";
import MovieRow from "../../components/MovieRow/MovieRow";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../../Auth";

function MovieHome() {
  const { movieID } = useParams();
  const { currentUser } = useContext(AuthContext);
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
      let selectedMovie = { ...Data.data, isFav: false, isWatch: false };
      await db
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((response) => {
          response.data().favourite.forEach((movies) => {
            if (selectedMovie.id === movies.id) selectedMovie.isFav = true;
          });
        });
      await db
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((response) => {
          response.data().watchLater.forEach((movies) => {
            if (selectedMovie.id === movies.id) selectedMovie.isWatch = true;
          });
        });
      setmovie(selectedMovie);
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

  const addToFav = async () => {
    let selectedMovie = { ...movie };
    let orgMovie = { ...movie };
    orgMovie.isFav = true;
    delete selectedMovie.isWatch;
    delete selectedMovie.isFav;

    console.log(selectedMovie);
    await db
      .collection("users")
      .doc(currentUser.uid)
      .update({
        favourite: firebase.firestore.FieldValue.arrayUnion({
          ...selectedMovie,
        }),
      });
    setmovie(orgMovie);
  };

  const remFav = async () => {
    let selectedMovie = { ...movie };
    delete selectedMovie.isWatch;
    delete selectedMovie.isFav;
    console.log(selectedMovie);
    await db
      .collection("users")
      .doc(currentUser.uid)
      .update({
        favourite: firebase.firestore.FieldValue.arrayRemove({
          ...selectedMovie,
        }),
      });
    selectedMovie = { ...movie, isFav: false };
    setmovie(selectedMovie);
  };

  const addToWatch = async () => {
    console.log(currentUser.uid);
    let selectedMovie = { ...movie };
    let orgMovie = { ...movie };
    orgMovie.isWatch = true;
    delete selectedMovie.isWatch;
    delete selectedMovie.isFav;
    console.log(selectedMovie);

    await db
      .collection("users")
      .doc(currentUser.uid)
      .update({
        watchLater: firebase.firestore.FieldValue.arrayUnion({
          ...selectedMovie,
        }),
      });
    setmovie(orgMovie);
  };

  const remWatch = async () => {
    console.log(movie);
    let selectedMovie = { ...movie };
    delete selectedMovie.isWatch;
    delete selectedMovie.isFav;
    console.log(selectedMovie);

    await db
      .collection("users")
      .doc(currentUser.uid)
      .update({
        watchLater: firebase.firestore.FieldValue.arrayRemove({
          ...selectedMovie,
        }),
      });
    selectedMovie = { ...movie, isWatch: false };
    setmovie(selectedMovie);
  };
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {!movie.isFav ? (
            <button
              style={{ margin: "5px" }}
              onClick={addToFav}
              className="movie__button"
            >
              ADD TO FAV
            </button>
          ) : (
            <button
              style={{ margin: "5px" }}
              onClick={remFav}
              className="movie__remFav"
            >
              REMOVE FAV
            </button>
          )}
          {!movie.isWatch ? (
            <button
              style={{ margin: "5px" }}
              onClick={addToWatch}
              className="movie__button"
            >
              ADD TO WATCH LATER
            </button>
          ) : (
            <button
              style={{ margin: "5px" }}
              onClick={remWatch}
              className="movie__remWat"
            >
              REMOVE WATCH LATER
            </button>
          )}
        </div>
      </div>
      {cast.cast && <CastRow cast={cast.cast} title="CAST" />}
      {crew && <CastRow cast={crew} title="CREW" />}
      <MovieRow
        title="Recommended Movies "
        endPoint={recommendedEndPoint}
        isLarge
      />
      <MovieRow title="Similar Movies " endPoint={similarEndPoint} isLarge />
    </div>
  );
}

export default MovieHome;
