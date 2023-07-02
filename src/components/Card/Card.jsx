import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import noImage from "./noImageFound.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Favorites from "../Favorites/Favorites";

export default function Card({
  name,
  price,
  genres,
  Genres,
  image,
  id,
  handleClickCart,
  item,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const favorites = [];

  const handleToggleFavorite = () => {
    favorites.push({ image, name, price });
    setIsFavorite(!isFavorite);
    Favorites(favorites);
  };

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
      <button
        className={`${styles.favoriteButton} ${
          isFavorite ? styles.favorite : ""
        }`}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? (
          <FavoriteIcon className={styles.favoriteIcon} />
        ) : (
          <FavoriteBorderIcon className={styles.favoriteIcon} />
        )}
      </button>
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
        <h3 className={styles.cardTitle}>Price: U$S {price}</h3>
      </Link>
      <button onClick={() => handleClickCart(item)}>Add to cart</button>
    </div>
  );
}
