import React, { useState, useEffect } from "react";
import axios from "../../Utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import requests from "../../Utils/requests";
import "./SearchByGenre.css";

function SearchByGenre() {
  const [genres, setGenres] = useState([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Fetchnig genre list on mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await axios.get(
          `/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
        );
        setGenres(res.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    fetchGenres();
  }, []);

  const handleSearch = async () => {
    if (!input) return;

    try {
      const response = await axios.get(requests.fetchGenreMovies(input));
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
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
    <div className="search-genre-box">
      <select onChange={(e) => setInput(e.target.value)} value={input}>
        <option value="">Select Genre from the dropdown list</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} style={{ marginLeft: "50px" }}>
        Search
      </button>

      <div className="results-grid">
        {results.map((movie) => (
          <div key={movie.id} className="result-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie?.backdrop_path}`}
              onClick={() => handleClick(movie)}
              alt={movie.name}
              className={`row_poster`}
            />
            <p>{movie?.title || movie?.name || movie?.original_name}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default SearchByGenre;
