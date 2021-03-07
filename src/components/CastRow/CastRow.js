import React from "react";
import "./CastRow.css";
import Cast from "./Cast/Cast";

function CastRow({ cast, title }) {
  return (
    <div className="castrow">
      <div className="cast_title">{title}</div>
      <div className="cast_row">
        {cast && cast.map((c, index) => <Cast cast={c} key={index} />)}
      </div>
    </div>
  );
}

export default CastRow;
