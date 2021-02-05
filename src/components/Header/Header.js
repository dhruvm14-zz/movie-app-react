import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";

const imgBase = "https://image.tmdb.org/t/p/original";

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
]);

function Header(props) {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    axios.get(props.endPoint).then((data) => {
      setmovies(data.data.results);
      console.log(data.data.results);
    });
    // const getData = async () => {
    //   const moviesData = await axios.get(props.endPoint);
    //   setmovies(moviesData.data.results);
    //   console.log(movies);
    // };
    // getData();
  }, [props.endPoint]);

  return (
    <div className="Header">
      {movies.length > 0 && (
        <Swiper
          className="main-swiper"
          spaceBetween={0}
          navigation
          slidesPerView={3}
          effectCube
          autoplay
          loop
          effect="coverflow"
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {movies.map((movie) => (
            <SwiperSlide
              className="slide"
              style={{
                backgroundImage: `url(${imgBase}${movie.poster_path})`,
              }}
            ></SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Header;
