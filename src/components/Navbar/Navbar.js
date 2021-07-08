import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../Auth";
import { auth } from "../../firebase";
import SearchIcon from "@material-ui/icons/Search";
import logo from "./logo.png";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSignout = () => {
    auth.signOut();
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" style={{ position: "absolute", width: "100px" }}>
          <img src={logo} className="logo-img" />
        </Link>
        <div className="navbar__header">
          <ul class="menu-bar">
            <li>
              <Link to="/genre/28/action" className="nav_links">
                Action
              </Link>
            </li>
            <li>
              <Link to="/genre/35/comedy" className="nav_links">
                Comedy
              </Link>
            </li>
            <li>
              <Link to="/genre/18/drama" className="nav_links">
                Drama
              </Link>
            </li>
            <li>
              <Link to="/genre/10749/romance" className="nav_links">
                Romance
              </Link>
            </li>
            <li>
              <Link to="/user/favourite" className="nav_links">
                Favourite
              </Link>
            </li>
            <li>
              <Link to="/user/watchLater" className="nav_links">
                Watch Later
              </Link>
            </li>
          </ul>
          <div class="searchBox">
            <input
              class="searchInput"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to={`/search/${searchTerm}`}>
              <SearchIcon class="searchButton" />
            </Link>
          </div>
        </div>
        <Link to="/">
          <button className="signoutBtn" onClick={handleSignout}>
            LOG OUT
          </button>
        </Link>
      </div>
    </>
    // <nav className="Navbar">
    //   <div className="navbar__brand">
    //     <Link style={{ color: "white", textDecoration: "none" }} to="/">
    //       <h1>MOVIE_APP</h1>
    //     </Link>
    //   </div>
    //   <div className="navbar__search">
    //     <input
    //       type="text"
    //       placeholder="Search..."
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //     <Link to={`/search/${searchTerm}`}>
    //       <SearchIcon />
    //     </Link>
    //     <button onClick={handleSignout}>Sign Out</button>
    //   </div>
    // </nav>
  );
}

export default Navbar;
