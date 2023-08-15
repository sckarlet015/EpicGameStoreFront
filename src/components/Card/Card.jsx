import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import styles from "./Card.module.css";


export default function Card({ game, handleClickCart, clickFavorite, buttonFavorites }) {

  const history = useHistory();
  const { name, price, rating, image, Genres } = game;
  const divisa = "USD";
  const decuent = "-30%";
  const roundedRating = Math.round(rating);
  const stars = Array?.from({ length: 5 }, (_, index) => {
    if (index < roundedRating) {
      return <FaStar key={index} className={styles.starFilled} />;
    } else {
      return <FaStar key={index} className={styles.starEmpty} />;
    }
  });

  const handleCarGame =  () => {
    history.push(`/home/${game.id}`)
  }
  
  function renderGenreTags(genres) {
    return genres?.map((genre, index) => (
      <span className={styles.genreTag} key={index}>
        {genre.genreName}
      </span>
    ));
  }

  return (
    <div className={styles.carGame}>
      <div className={styles.imageContainer}>
        <div className={styles.spaceImage}>
          <img src={image} alt={name} className={styles.image} />
        </div>
        <div className={styles.overlay}>
          <div className={styles.overlayContent}              >
            <Link className={styles.linkName} to={`/home/${game.id}`}>
            <h3 className={styles.gameName}>{name}</h3>
            </Link>
            <div className={styles.rating}>{stars}</div>
            <div className={styles.genres}>{renderGenreTags(Genres)}</div>
            <div className={styles.contButtons}>
              <button className={styles.addButton} onClick={() => handleClickCart(game.id)}>Add to Cart</button>
              <button className={styles.favoriteButton} onClick={() => clickFavorite(game.id)}>{buttonFavorites}</button>
            </div>
            <div className={styles.contPrice}>
              <p className={styles.gameDesc}>{decuent}</p>
              <p className={styles.gameDivisa}>{divisa}</p>
              <p className={styles.gamePrice}>{price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
