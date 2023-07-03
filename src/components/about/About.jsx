import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPage } from "../../actions";
import styles from "./about.module.css"

import postgresqlImage from "./postgresql.png"
import nodeJs from "./node.png"
import react from "./react.jpg"
import redux from "./redux.png"
import express from "./express.png"
import sequalize from "./sequalize.png"
import linkedIn from "./linkedIn.png"
import github from "./gitHub.png"

export default function (){
    const history = useHistory();
    const dispatch = useDispatch();
    const [showAboutMe, setShowAboutMe] = useState(false);
    const [showTechnologies, setShowTechnologies] = useState(false);
    const [showFunctionalities, setShowFunctionalities] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const linkedInLink = "https://www.linkedin.com/in/gilberto-andres-casta%C3%B1o-rivera-04bab6251/";
    const gitHubLink = "https://github.com/GilCasR";


    function handleClick(e) {
        e.preventDefault();
        dispatch(setCurrentPage(1));
        history.push("/home");
    }; 

    const handleToggleAboutMe = () => {
        setShowAboutMe(!showAboutMe);
    };

    const handleToggleTechnologies = () => {
        setShowTechnologies(!showTechnologies);
    };

    const handleToggleFunctionalities = () => {
        setShowFunctionalities(!showFunctionalities);
    };

    const handleToggleContact = () => {
        setShowContact(!showContact);
    };

    const technologiesData = [
        { name: "Redux", image: redux },
        { name: "PostgreSQL", image: postgresqlImage },
        { name: "React", image: react },
        { name: "Node.js", image: nodeJs },
        { name: "Expres", image: express },
        { name: "Sequalize", image: sequalize }
      ];

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Welcome to My Henry PI</h1>
                <div className={styles.section}>
                    <h2 onClick={handleToggleAboutMe}>About the project</h2>
                    {showAboutMe && (
                    <div className={showAboutMe ? styles.show : ""}>
                        <p>
                        This project created in 2023 is part of the Soy Henry Bootcamp to become
                        a full stack Java Script developer, in this we consume data from the RAWG Video 
                        Games Database API and create an small database, as well as using technologies 
                        such as PostgreSQl, Node JS, and more.
                        </p>
                    </div>
                    )}
                </div>
                <div className={styles.section}>
                    <h2 onClick={handleToggleTechnologies}>Technologies used</h2>
                    {showTechnologies && (
                    <div>
                        <h3 className={showTechnologies ? styles.show : ""}>
                            The main technologies were:
                        </h3>
                        <div className={styles.technologiesContainer}>
                            {technologiesData.map((technology, index) => (
                            <div key={index} className={styles.technologyItem}>
                                <img
                                src={technology.image}
                                alt={technology.name}
                                className={styles.technologyImage}
                                />
                                <p className={styles.technologyName}>{technology.name}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
                <div className={styles.section}>
                    <h2 onClick={handleToggleFunctionalities}>Functionalities</h2>
                    {showFunctionalities && (
                    <div className={showFunctionalities ? styles.show : ""}>
                        <h3>Render videogames: </h3>
                        <p>
                            This feature allows users to view and explore a collection of video games 
                            available in our database. Using data retrieved from the RAWG Video Games Database API 
                            and our own database, we showcase various details about each game, including the title, genres and image.
                        </p>
                        <h3>Filters: </h3>
                        <p>
                            With this users are allowed to search and filter Video Games 
                            based on various criteria such as rating, alphabetical order 
                            and origin, games from the Database or the API, as well as the 
                            implementation of a searchbar to look for Videogames by their name.
                        </p>
                        <h3>Create Video Games: </h3>
                        <p>
                            I implemented a user-friendly form for adding new video games. 
                            Users can enter the name, rating, image, genres, platforms, launch date, and description 
                            of the game, at the end the information is handled in the Back End and added 
                            to the database.
                        </p>
                        <h3>Detail page: </h3>
                        <p>
                            In the detail section, users can view comprehensive information about a specific video game.
                            This includes details such as the game's name, genres, platforms, launch date, rating, and a 
                            brief description. 
                        </p>
                    </div>
                    )}
                </div>
                <div className={styles.section}>
                    <h2 onClick={handleToggleContact}>Contact</h2>
                    {showContact && (
                    <div className={showContact ? styles.show : ""}>
                        <p>
                            In the contact section, you can find my links to GitHub and LinkedIn. Feel free to 
                            connect with me and explore my work:
                        </p>
                        <div>
                            <a href={gitHubLink} target="_blank" rel="noopener noreferrer">
                                <img className={styles.contactImage} src={github} alt="GitHub" />
                            </a>

                            <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
                                <img  className={styles.contactImage} src={linkedIn} alt="LinkedIn" />
                            </a>
                        </div>
                        <p>
                            Don't hesitate to reach out to me if you have any questions, collaboration 
                            opportunities, or just want to connect and discuss technology and development!
                        </p>
                    </div>
                    )}
                </div>
                <button onClick={(e) => handleClick(e)} className={styles.button}>Go back</button>
            </div>
        </div>
    );
};

