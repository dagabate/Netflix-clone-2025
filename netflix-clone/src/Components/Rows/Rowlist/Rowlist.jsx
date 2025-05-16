import React from "react";
import Row from "../Row/Row";
import requests from "../../../Utils/requests";
function Rowlist() {
  const rowSections = [
    { title: "NETFLIX ORIGINALS", fetchUrl: requests.fetchNetflixOriginals },
    { title: "TRENDING NOW", fetchUrl: requests.fetchTrending },
    { title: "Top Rated", fetchUrl: requests.fetchTopRatedMovies },
    { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
    { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies },
    { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies },
    { title: "Romance Movies", fetchUrl: requests.fetchRomanceMovies },
    { title: "TV Shows", fetchUrl: requests.fetchTvShow },
    { title: "Documentaries", fetchUrl: requests.fetchDocumentaries },
  ];
  return (
    <div>
      {rowSections.map(({ title, fetchUrl }, index) => (
        <Row key={index} title={title} fetchUrl={fetchUrl} />
      ))}
    </div>
  );
}

export default Rowlist;
