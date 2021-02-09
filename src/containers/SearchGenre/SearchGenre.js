import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../axios";
import endPoints from "../../requests";
import Movie from "../../components/Movie/Movie";
import "./SearchGenre.css";
import { Link } from "react-router-dom";

function Search() {
  const { genreID, genreName } = useParams();
  const [moviesData1, setMoviesData1] = useState([]);
  const [moviesData2, setMoviesData2] = useState([]);
  console.log(genreID);
  useEffect(() => {
    const getData = async () => {
      let Data1 = await axios.get(endPoints.searchGenre1 + genreID);
      let Data2 = await axios.get(endPoints.searchGenre2 + genreID);

      setMoviesData1(Data1.data.results);
      setMoviesData2(Data2.data.results);
    };
    getData();
  }, [genreID]);

  return (
    <div className="Search">
      <p className="searchgenre__header">
        SEARCH RESULTS FOR <strong>{genreName.toUpperCase()}</strong>
      </p>
      <div className="search__movies">
        {moviesData1.map((movie) => (
          <Link className="text-link" to={`/movie/${movie.id}`}>
            <Movie key={movie.id} movie={movie} search />
          </Link>
        ))}
        {moviesData2.map((movie) => (
          <Movie key={movie.id} movie={movie} search />
        ))}
      </div>
    </div>
  );
}

export default Search;
