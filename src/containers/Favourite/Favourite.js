import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Movie from "../../components/Movie/Movie";
import "./Favourite.css";
import { Link } from "react-router-dom";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../../Auth";

function Favourite() {
  const [moviesData1, setMoviesData1] = useState([]);
  const [moviesData2, setMoviesData2] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { query } = useParams();
  useEffect(() => {
    const getData = async () => {
      const movies1 = [];
      const movies2 = [];

      await db
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((response) => {
          response.data().favourite.forEach((movie) => {
            movies1.push(movie);
          });
        });
      await db
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((response) => {
          response.data().watchLater.forEach((movie) => {
            movies2.push(movie);
          });
        });
      setMoviesData1(movies1);
      setMoviesData2(movies2);
    };
    getData();
  }, []);

  return (
    <div className="Search">
      <p className="searchgenre__header">
        {query === "favourite" ? "FAVOURITE" : "WATCH LATER"}
      </p>
      <div className="search__gmovies">
        {query === "favourite"
          ? moviesData1.map((movie) => (
              <Link className="text-link" to={`/movie/${movie.id}`}>
                <Movie key={movie.id} movie={movie} search large />
              </Link>
            ))
          : moviesData2.map((movie) => (
              <Link className="text-link" to={`/movie/${movie.id}`}>
                <Movie key={movie.id} movie={movie} search large />
              </Link>
            ))}
      </div>
    </div>
  );
}
export default Favourite;
