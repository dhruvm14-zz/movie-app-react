import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./App.css";
import Home from "./containers/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Search from "./containers/Search/Search";
import MovieHome from "./containers/MovieHome/MovieHome";
import SearchGenre from "./containers/SearchGenre/SearchGenre";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import Favourite from "./containers/Favourite/Favourite";
import { AuthContext } from "./Auth";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        {!currentUser ? (
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        ) : (
          <>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
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
              <Route exact path="/user/:query">
                <Favourite />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
