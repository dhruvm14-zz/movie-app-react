import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../axios";
import endPoints from "../../requests";
import Movie from "../../components/Movie/Movie";
import "./Search.css";

function Search() {
  const { searchID } = useParams();
  const [moviesData1, setMoviesData1] = useState([]);
  const [moviesData2, setMoviesData2] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let Data1 = await axios.get(endPoints.searchTemp1 + searchID);
      let Data2 = await axios.get(endPoints.searchTemp2 + searchID);

      setMoviesData1(Data1.data.results);
      setMoviesData2(Data2.data.results);
    };
    getData();
  }, [searchID]);

  return (
    <div className="Search">
      <div className="search__movies">
        {moviesData1.map((movie) => (
          <Movie key={movie.id} movie={movie} search />
        ))}
        {moviesData2.map((movie) => (
          <Movie key={movie.id} movie={movie} search />
        ))}
      </div>
    </div>
  );
}

export default Search;
