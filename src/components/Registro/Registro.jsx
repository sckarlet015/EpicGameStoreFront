import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './RegistrationForm.module.css';
import axios from 'axios';
import { getDataUser } from '../../actions';   
///
 import Login from './googleSingin/Login'  

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUserPost = {
            userName: name,
            userPassword: password,
            userEmail: email, 
        };
        try {
          const response = await axios.post('http://localhost:3001/users', newUserPost);
        //   const {newCart, newUser} = response.data
        //   const dataUser = {
        //     nombre: newUser.userName,
        //     userID: newUser.id,
        //     cartID: newCart.id
        //   }
        //   const dataUserDispatch = dispatch(getDataUser(dataUser))
        //   console.log(dataUserDispatch);

        } catch (error) {
          console.log(error);
        }
      };

/////////////////   

    const handleRegisterByGoogle = async() => {
    


    const response = await axios.get('http://localhost:3001/users')
    const arrayUsers = response.data;

    const result = arrayUsers.find( user => user.userEmail === 'fmontoya3@soyhenry.com')
    if(result){
        console.log('el usuario existe')
    }else{
        const obj = {
            userName: 'stateName',
            userPassword: 'statePassword',
            userEmail: 'stateEmail', 
        }
        await axios.post('http://localhost:3001/users', obj)
    }

    }
/////////////////       

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
                <Login className={styles.buttonGoogle}></Login>
                {/* <button className={styles.buttonGoogle} onClick={handleRegisterByGoogle} >Registrarse con Google</button> */}
            </div>
        </div>
    );
};

export default RegistrationForm;
