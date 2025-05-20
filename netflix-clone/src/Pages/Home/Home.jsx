import React from "react";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Banner from "../../Components/Banner/Banner.jsx";
import Rowlist from "../../Components//Rows/Rowlist/Rowlist.jsx";
import SearchByGenre from "../../Components/SearchByGenre/SearchByGenre.jsx";

function Home() {
  return (
    <>
      <Header />
      <Banner />
      <SearchByGenre />
      <Rowlist />
      <Footer />
    </>
  );
}

export default Home;
