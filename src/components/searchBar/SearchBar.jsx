import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName, setCurrentPage, setOrigin } from "../../actions";
import styles from "./searchBar.module.css"
export default function SearchBar(){
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    function handleInputChange (e){
        e.preventDefault();
        const name = e.target.value;
        setName(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setCurrentPage(1));
        dispatch(getVideogamesByName(name));
        dispatch(setOrigin("search"));
    }

    return (
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search..."
              onChange={handleInputChange}
            />
            <button type="submit" className={styles.searchButton} onClick={handleSubmit}>
              Search
            </button>
          </div>
      );
}