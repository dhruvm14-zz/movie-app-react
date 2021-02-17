import React from "react";
import "./Cast.css";
const imgBase = "https://image.tmdb.org/t/p/original";

function Cast({ cast }) {
  return (
    <div className="cast">
      <div className="cast__img">
        <img
          className={cast.profile_path ? "" : "cast_ava"}
          src={
            cast.profile_path == null
              ? "http://www.gravatar.com/avatar/?d=mp&&s=190"
              : `${imgBase}${cast.profile_path}`
          }
        />
      </div>
      <div className="cast__content">
        <p style={{ fontSize: "20px", marginTop: "5px" }}>
          <strong>{cast.name}</strong>
        </p>
        <p style={{ fontSize: "15px", marginTop: "5px", marginBottom: "10px" }}>
          {cast.character ? cast.character : cast.job}
        </p>
      </div>
    </div>
  );
}

export default Cast;
