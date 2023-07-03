import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import styles from './RegistrationForm.module.css';
import axios from 'axios';
import ButtonGoogleRegister from './googleSingin/ButtonGoogleRegister'


const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUserPost = {
            userName: name,
            userPassword: password,
            userEmail: email, 
        };
        try {
          const response = await axios.post('http://localhost:3001/users/', newUserPost);
          const {newCart, newUser} = response.data
        alert("Usuario creado con exito")
          history.push("/login");
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div>
            <div className={styles.RegistrationForm}>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.buttonForm}>Registrarse</button>
                </form>
                <ButtonGoogleRegister className={styles.buttonGoogle}></ButtonGoogleRegister>
                {/* <button className={styles.buttonGoogle} onClick={handleRegisterByGoogle} >Registrarse con Google</button> */}
            </div>
        </div>
    );
};

export default RegistrationForm;
