import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Search from "./containers/Search/Search";
import MovieHome from "./containers/MovieHome/MovieHome";
import SearchGenre from "./containers/SearchGenre/SearchGenre";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movie/:movieID">
            <MovieHome />
          </Route>
          <Route exact path="/search/:searchID">
            <Search />
          </Route>
          <Route exact path="/genre/:genreID/:genreName">
            <SearchGenre />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
