import React from "react";
import { useState } from "react";
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
      <div className={`${styles.searchBarContainer} searchBarContainer`}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={`${styles.input} input`}
            placeholder="Search..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className={`${styles.searchButton} searchButton`}
            onClick={handleSubmit}
          >
            <span className={styles.arrow}>&#10132;</span>
          </button>
        </div>
      </div>
    );
  }