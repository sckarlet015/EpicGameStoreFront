import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import noImage from "./noImageFound.jpg";

export default function Card({ name, price, genres, Genres, image, id }) {
  let genreList = [];

  if (genres) {
    genreList = genres;
  } else if (Genres) {
    genreList = Genres.map((genre) => ({
      id: "",
      name: genre.name,
    }));
  }

  const addCarrito = () => {};

  return (
    <div className={styles.card}>
      <Link
        to={id === -5 ? "/videogame" : id === -6 ? "#" : `/home/${id}`}
        key={id}
      >
        <img
          className={styles.image}
          src={image || noImage}
          alt="image not found"
        />
        <h3 className={styles.cardTitle}>{name}</h3>

        <h3 className={styles.cardTitle}>Price: $ {price}</h3>
      </Link>
      <hr />
      <button className={styles.buttonBuyVideoGame}>
        <Link to="/buy">Comprar</Link>
      </button>
      <hr />
      <button className={styles.buttonAddCarrito} onClick={addCarrito}>
        Agregar al carrito
      </button>
    </div>
  );
}
