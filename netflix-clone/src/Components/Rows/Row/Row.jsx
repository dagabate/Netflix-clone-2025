import React, { useState, useEffect } from "react";
import axios from "../../../Utils/axios.jsx";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

import "./Row.css";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching from:", fetchUrl);
        const request = await axios.get(fetchUrl);
        console.log("API response:", request);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          console.log("YouTube URL:", url);
          const urlParams = new URLSearchParams(new URL(url).search);
          const videoId = urlParams.get("v");
          console.log("Video ID:", videoId);
          setTrailerUrl(videoId);
        })
        .catch((error) => console.log("Trailer not found", error));
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row_posters">
        {movies?.map((movie, index) => (
          <div key={index} className="row_poster_container">
            <img
              onClick={() => handleClick(movie)}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            />
            <p className="row_poster_title">
              {movie?.title || movie?.name || movie?.original_name}
            </p>
          </div>
        ))}
      </div>

      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
