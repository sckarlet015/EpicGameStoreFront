import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './RegistrationForm.css';
import axios from 'axios';
import { getDataUser } from '../../actions';

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
          const {newCart, newUser} = response.data
          const dataUser = {
            nombre: newUser.userName,
            userID: newUser.id,
            cartID: newCart.id
          }
          const dataUserDispatch = dispatch(getDataUser(dataUser))
          console.log(dataUserDispatch);

        } catch (error) {
          console.log(error);
        }
      };      

    return (
        <div>
            <div className="registration-form">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
