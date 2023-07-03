import React, { useEffect, useState } from 'react'
import { auth,provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import  style  from '../RegistrationForm.module.css'

const Login = () => {
    const [ value , setValue] = useState('null')

    const handleClick = () => {
        signInWithPopup(auth,provider).then( (data) => {
            console.log(data.user)
            setValue({
                userName: data.user.displayName,
                userEmail: data.user.email, 
                userPhotoUrl: data.user.photoURL,                
                userProvider: data.user.providerId,
                userUid: data.user.uid
            })
          

        })
    }
    console.log(value.userEmail)

  return (
    <div>
        <button className={style.buttonGoogle} onClick={handleClick}>Ingresar con Google</button>      
    </div>
  )
}

export default Login