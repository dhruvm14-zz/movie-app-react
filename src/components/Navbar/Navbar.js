import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="Navbar">
      <div className="navbar__brand">
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          <h1>MOVIE_APP</h1>
        </Link>
      </div>
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={`/search/${searchTerm}`}>
          <SearchIcon />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
