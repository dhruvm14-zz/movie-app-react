import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Search from "./containers/Search/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movie/:movieID"></Route>
          <Route exact path="/search/:searchID">
            <Search />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
