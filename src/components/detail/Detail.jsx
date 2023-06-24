import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, setCurrentPage } from "../../actions";
import { useHistory } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./detail.module.css"

export default function Detail(props){
    const id = props.match.params.id
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => 
        dispatch(getDetail(id)),
      [dispatch]);

    const videogameDetail = useSelector((state) => state.detail);
        
    const origin = isNaN(id) ? "db" : "api";

    let apiRatings = [];
    if (origin === "api" && videogameDetail.ratings) {
        apiRatings = videogameDetail.ratings.map((rating) => rating.title);
    };

    function handleClick(e) {
        e.preventDefault();
        dispatch(setCurrentPage(1));
        history.push("/home");
    }   

    return (
        <div >
            {origin === "api" && (!videogameDetail.genres || !videogameDetail.platforms) ||
                origin === "db" && (!videogameDetail.Genres || !videogameDetail.Platforms) ? (
                <div><LoadingPage/></div>
                ) :
                <div className={styles.container}>
                    <h1 className={styles.title}>{videogameDetail.name}</h1>
                    <img
                        src={origin === "api" ? videogameDetail.background_image : videogameDetail.image}
                        alt=""
                    />
                    <div className={styles.content}>
                        <h2 className={styles.description}>{origin === 'api' ? <span dangerouslySetInnerHTML={{ __html: videogameDetail.description }}></span> : videogameDetail.description}</h2>
                        <h2>Launch date: {origin === "api" ? videogameDetail.released : videogameDetail.launchDate}</h2>
                        <h2>Rating: {origin === "api" ? apiRatings.join(", ") : videogameDetail.rating }</h2>
                        <h3>Platforms: {origin === "api"
                            ? videogameDetail.platforms.map(el => el.platform.name).join(", ")
                            : videogameDetail.Platforms.map(el => el.platformName).join(", ")}
                        </h3>
                        <h3>Genres: {origin === "api" 
                            ? videogameDetail.genres.map(genre => genre.name).join(", ") 
                            : videogameDetail.Genres.map(genre => genre.genreName).join(", ")}
                        </h3>
                        <button onClick={(e) => handleClick(e)} className={styles.button}>Go back</button>
                    </div> 
                </div> 
            }
        </div>
    );
};