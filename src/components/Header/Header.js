import React, { Component } from "react";
import axios from "../../axios";
import "./Header.css";
const imgBase = "https://image.tmdb.org/t/p/original";

export default class Header extends Component {
  state = {
    moviesData: [],
    selectedMovie: {},
  };
  async componentDidMount() {
    const moviesData = await axios.get(this.props.endPoint);
    this.setState({ moviesData: moviesData.data.results });
    const selectedMovieIndex = Math.floor(
      Math.random() * this.state.moviesData.length
    );
    this.setState({
      selectedMovie: this.state.moviesData[selectedMovieIndex],
    });
  }

  render() {
    return (
      <div
        className="Header"
        style={{
          backgroundImage: `url(
            ${imgBase}${this.state.selectedMovie.backdrop_path}
          )`,
        }}
      >
        <div className="Header__Content">
          <h1>
            {this.state.selectedMovie?.title ||
              this.state.selectedMovie?.original_title}
          </h1>
          <p>
            {this.state.selectedMovie.overview &&
              this.state.selectedMovie.overview.substr(0, 150)}
            ...
          </p>
          <button>Play</button>
          <button>More Info</button>
        </div>
        <div className="Header__bottom"></div>
      </div>
    );
  }
}
