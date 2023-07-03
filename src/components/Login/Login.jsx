import React, { useState } from 'react';
import { getDataUser } from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styles from './Login.module.css';
import ButtonGoogleLogin from './googleSingin/ButtonGoogleLogin'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:3001/users/login', user);
            const { id, userName, Carrito} = response.data
            const dataUser = {
                nombre: userName,
                userID: id,
                cartID: Carrito.id
            }
            const resDataUsuer = dispatch(getDataUser(dataUser))
            history.push("/home");
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className= {styles.loginForm}>
            <h2 className={styles.loginFormH2}>Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className={styles.loginFormForm}>
                <div className={styles.loginForm}>
                    <label className={styles.loginFormLabel} htmlFor="email">Correo electrónico:</label>
                    <input 
                        className={styles.loginFormInput}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className={styles.loginForm}>
                    <label className={styles.loginFormLabel}  htmlFor="password">Contraseña:</label>
                    <input
                        className={styles.loginFormInput}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginForm}>Iniciar sesión</button>
            </form>
            <ButtonGoogleLogin className={styles.buttonGoogle}></ButtonGoogleLogin>
        </div>
    );
};

export default Login;
