import React from "react";
import MovieRow from "../../components/MovieRow/MovieRow";
import endPoints from "../../requests";
import Header from "../../components/Header/Header";

function Home() {
  return (
    <div className="Home">
      <Header endPoint={endPoints.trendingMovies} />
      <MovieRow title="Trending Movies" endPoint={endPoints.trendingMovies} />
      <MovieRow title="Latest Movies" endPoint={endPoints.latestMovies} />
      <MovieRow title="Top Rated" endPoint={endPoints.topRated} isLarge />
      <MovieRow title="Action Movies" endPoint={endPoints.actionMovies} />
      <MovieRow title="Comedy Movies" endPoint={endPoints.comedyMovies} />
      <MovieRow title="Drama Movies" endPoint={endPoints.dramaMovies} />
      <MovieRow title="Horror Movies" endPoint={endPoints.horrorMovies} />
      <MovieRow title="Romance Movies" endPoint={endPoints.romanceMovies} />
    </div>
  );
}

export default Home;
