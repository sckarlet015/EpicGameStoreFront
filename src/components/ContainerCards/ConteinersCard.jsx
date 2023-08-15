import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Pagination from "@mui/material/Pagination";
import styles from "./ConteinerCars.module.css";
import NavbarSec from "../NavBarSec/NavSec";
import { order } from "./filters";
import noGame from "../Home/noGameSearch.gif";

export default function ConteinerCars({
  allVideogames,
  handleClickCart,
  clickFavorite,
  buttonFavorites,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState("");

  const videogamesPerPage = 15;

  useEffect(() => {
    let localOrder = localStorage.getItem("order");
    if (localOrder && localOrder.length > 0) {
      setSortOrder(localOrder);
    }
    let localGenres = localStorage.getItem("genres");
    if (localGenres && localGenres.length > 0) {
      setGenres(localGenres);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, genres, allVideogames]);

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleGenres = (genre) => {
    localStorage.setItem("genres", genre.target.value);
    setGenres(genre.target.value);
  };

  const handleSort = (order) => {
    localStorage.setItem("order", order);
    setSortOrder(order);
  };

  const handleSearch = (name) => {
    setSearchTerm(name);
  };

  const handleReset = () => {
    setSearchTerm("");
    setGenres("");
    setSortOrder("");
    localStorage.removeItem("genres");
    localStorage.removeItem("order");
    setCurrentPage(1);
  };
  const filteredVideogames = allVideogames?.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVideogames = order(
    filteredVideogames,
    sortOrder,
    genres,
    searchTerm
  );

  const videogames = sortedVideogames?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  return (
    <div className={styles.container}>
      <NavbarSec
        handleSort={handleSort}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleGenres={handleGenres}
      />
      <div className={styles.cardsContainer}>
        {videogames && videogames.length > 0 ? (
          videogames.map((game) => (
            <Card
              key={game.id}
              game={game}
              handleClickCart={handleClickCart}
              clickFavorite={clickFavorite}
              buttonFavorites={buttonFavorites}
            />
          ))
        ) : (
          <div>
            <h3 className={styles.textNoGame}>No favorite games</h3>
            <img className={styles.noGame} src={noGame} alt="" />
          </div>
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          count={Math.ceil(sortedVideogames?.length / videogamesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
