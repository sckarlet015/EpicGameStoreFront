import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByOrigin, setCurrentPage, setOrigin } from "../../actions/index.js";
import { Link, useLocation } from "react-router-dom";
import Card from "../card/Card.jsx";
import Pages from "../pages/Pages.jsx";
import SearchBar from "../searchBar/SearchBar.jsx";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./home.module.css"
import noGameFif from "./noGame.gif"
import noGameSearh from "./noGameSearch.gif"

export default function Home (){
    const dispatch = useDispatch();
    const location = useLocation();
    const allVideogames = useSelector((state) => state.videogames);
    const pageNumber = useSelector((state) => state.currentPage);
    const origin = useSelector((state) => state.origin || "all");
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const [ratingOrder, setRatingOrder] = useState("");
    const [alphabeticalOrder, setAlphabeticalOrder] = useState("");
    const indexOfLastVideogame = pageNumber * videogamesPerPage; // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0 


    useEffect(() => {
        dispatch(getVideogames());

        const handleLocationChange = () => {
          dispatch(setCurrentPage(1));
        };
      
        window.addEventListener('popstate', handleLocationChange);
        
        return () => {
          dispatch(setCurrentPage(1));  
          dispatch(setOrigin("all"));
          setRatingOrder("");
          setAlphabeticalOrder("");
        };
      }, [dispatch, location.pathname]);

    function handleClick(e){
        e.preventDefault();      
        dispatch(setCurrentPage(1));  
        dispatch(getVideogames());
        dispatch(setOrigin("all"));
        const originSelect = document.getElementById("originSelect");
        if (originSelect) {
          originSelect.selectedIndex = 0;
        };
        const alphabetSelect = document.getElementById("alphabeticalOrder");
        if (alphabetSelect) {
          alphabetSelect.selectedIndex = 0;
        };
        const ratingSelect = document.getElementById("ratingOrder");
        if (ratingSelect) {
          ratingSelect.selectedIndex = 0;
        };
    };

    function handleFilterOrigin(e){
        e.preventDefault();
        const handleLocationChange = () => {
          dispatch(setCurrentPage(1));
        };
      
        window.addEventListener('popstate', handleLocationChange);
        const origin = e.target.value
        dispatch(setOrigin(origin));
        dispatch(setCurrentPage(1));
        dispatch(filterVideogamesByOrigin(origin));
    };

    const handleRatingSort = (e) => {
        e.preventDefault();
        const order = e.target.value;
        if (order === "na") {
          return; 
        };
        const alphabetSelect = document.getElementById("alphabeticalOrder");
        if (alphabetSelect) {
          alphabetSelect.selectedIndex = 0;
        };
        dispatch(setCurrentPage(1));
        setRatingOrder(`Order ${order}`);
        dispatch({ type: "SORT_BY_RATING", payload: order });
      };

      const handleAlphabeticalOrder = (e) => {
        e.preventDefault();
        const order = e.target.value;
        if (order === "na") {
          return; 
        };
        const ratingSelect = document.getElementById("ratingOrder");
        if (ratingSelect) {
          ratingSelect.selectedIndex = 0;
        };
        dispatch(setCurrentPage(1));
        setAlphabeticalOrder(`order ${order}`);
        dispatch({ type: "SORT_BY_ALPHABET", payload: order });
      }
      
      const currentVideogames = allVideogames && allVideogames.length ? allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) : [];
      return (
        <div>
          {((origin === "db" || origin === "search") ? !allVideogames : (!allVideogames || allVideogames.length === 0))  ? (
              <LoadingPage/> 
            ) : ( 
            <div className={styles.container}>
              <div className={styles.header}>
                <h1 className={styles.heading}>Henry Videogames PI</h1>
                <Link to="/videogame" className={styles.button}>Create Videogame</Link>
                <Link to="/about" className={styles.button}>About</Link>
              </div>
              <div className={styles["filter-container"]}>
                <div>
                  <label className={styles.label}>Rating: </label>
                  <select onChange={(e) => handleRatingSort(e)}className={styles.select} id = "ratingOrder">
                  <option value="na">  --  </option>
                    <option value="lToH">Lowest to highest</option>
                    <option value="hToL">Highest to lowest</option>
                  </select>
                </div>
                <div>
                  <label className={styles.label}>Alphabetical order: </label>
                    <select onChange={(e) => handleAlphabeticalOrder(e)}className={styles.select} id = "alphabeticalOrder">
                    <option value="na">  --  </option>
                    <option value="aToZ">A to Z</option>
                    <option value="zToA">Z to A</option>
                  </select>
                </div>
                <div>
                  <label className={styles.label}>Origin: </label>
                  <select onChange={(e) => handleFilterOrigin(e)} className={styles.select} id = "originSelect"> 
                    <option value="all">All videogames</option>
                    <option value="db">Database</option>
                    <option value="api">Api</option>
                  </select>
                </div>
              </div>
              <div>
                <SearchBar/>
                  <button onClick={(e) => handleClick(e)} className={styles.button}>Reload videogames</button>
                  <Pages
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    pages={pageNumber}
                  />
              </div>
              <div className={styles.card}>
                {currentVideogames && currentVideogames.length > 0 ? (
                  <div className={styles["card-container"]}>
                    {currentVideogames.map((el) => (
                      <Card
                        name={el.name}
                        genres={el.genres}
                        image={el.background_image || el.image}
                        id={el.id}
                        key={el.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div>
                    {origin === "db" ? (
                      <Card
                        name={"No videogame Found, click here to create one"}
                        image={noGameFif}
                        id={-5}
                        key={"noGameFound"}
                      />
                    ) : (
                      <Card
                        name={"No videogame Found in search results"}
                        image={noGameSearh}
                        id={-6}
                        key={"noGameSearchFound"}
                      />
                    )}
                  </div>
                  )}
                </div>
                <div className={styles.paginationContainer}>
                  <Pages
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                  />
                </div>
            </div>
          )}
        </div>
      );
      
};

