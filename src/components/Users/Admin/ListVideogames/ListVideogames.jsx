import React, { useEffect } from 'react';
import styles from './Listvideogames.module.css';
import axios from 'axios';


const ListVideogames = ({ lista, token, handleGetStatsVideogames, getListVideogame}) => {

  console.log(lista);
  const handleBamVideogame = (id) => {
    const update = {
      active: "banned"
    };
    try {
      axios.patch(`http://localhost:3001/videogames/${id}`, update, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          .then((response) => {
              console.log(response);
              getListVideogame()
              handleGetStatsVideogames()
          });
  } catch (error) {
      console.log(error);
  }
  }

  const handleInaVideogame = async (id,state) => {
    
    if(state === "inactive" || state === "pendingApproval" || state === "banned"){
      state = "active"
    }else{
      state = "inactive" 
    }
    const update = {
      active: state
    };
    try {
        axios.patch(`http://localhost:3001/videogames/${id}`, update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                getListVideogame()
                handleGetStatsVideogames()
            });
    } catch (error) {
        console.log(error);
    }
  };

  
  return (
    <div className={styles.container}>
      <h2 className={styles.nombre}>Videogames</h2>
      <ul className={styles.lista}>
        {lista.map((lista) => (
          <li key={lista.id} className={styles.usuario}>
            <div>
              <span className={styles.nombre}>Nombre: {lista.name}</span>
              <span className={styles.price}>Price: {lista.price}</span>
              <span className={styles.status}>status: {lista.status}</span>
            </div>
            <button className={styles.botonBam} onClick={() => handleBamVideogame(lista.id)}>Bam</button>
            <button className={styles.botonBan} onClick={() => handleInaVideogame(lista.id,lista.status )}>{lista.status === "inactive" || lista.status === "pendingApproval" || lista.status === "banned"  ? "Act" : "Inac"}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVideogames;