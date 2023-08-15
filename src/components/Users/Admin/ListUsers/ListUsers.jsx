import React, { useEffect } from 'react';
import styles from './ListUsers.module.css';

const ListUsers = ({ lista, boton, handleEditRole }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      <h2 className={styles.name}>Usuarios</h2>
      <ul className={styles.lista}>
        
        {lista.map((lista) => (
          <li key={lista.id} className={styles.usuario}>
            <div className={styles.containerDescript}>
              <span className={styles.name}>Nombre: {lista.userName}</span>
              <span className={styles.rol}> Rol: {lista.role}</span>
              <span className={styles.state}> State: {lista.isActive ? "Activo" : "Inactivo"}</span>
            </div>
            <button className={styles.botonBan} onClick={() => boton(lista.id, lista.isActive)}>{lista.isActive ? "Inac" : "Act"}</button>
            <select onChange={(e) => handleEditRole(e, lista.id)} className={styles.select}>
              <option value="">Seleccionar rol</option>
              <option value="vendedor">Vendedor</option>
              <option value="admin">Admin</option>
              <option value="cliente">Cliente</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;

