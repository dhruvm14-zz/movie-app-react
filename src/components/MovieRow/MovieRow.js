import React, { Component } from "react";
import "./MovieRow.css";
import axios from "../../axios";
import Movie from "../Movie/Movie";
import Content from "../Content/Content";

class MovieRow extends Component {
  state = {
    movies: [],
    clickedMovie: null,
  };
  large = this.props.isLarge;
  async componentDidMount() {
    const moviesData = await axios.get(this.props.endPoint);
    console.log(moviesData);
    this.setState({ movies: moviesData.data.results });
  }

  handleClick = (id) => {
    this.setState({ clickedMovie: id });
    console.log(this.state.clickedMovie);
  };

  render() {
    return (
      <div className="MovieRow">
        <h2 className="row__title">{this.props.title}</h2>
        <div className={`movie__row`}>
          {this.state.movies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              large={this.large}
              click={() => this.handleClick(movie.id)}
            />
          ))}
        </div>

        {this.state.clickedMovie && (
          <Content movieId={this.state.clickedMovie} />
        )}
      </div>
    );
  }
}

export default MovieRow;
