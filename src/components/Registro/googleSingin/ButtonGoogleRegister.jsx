import { auth , provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import  style  from '../RegistrationForm.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'

const Login = () => {
    const history = useHistory()
    
    const handleClick = () => {

        signInWithPopup(auth,provider).then( async(data) => {    
            const response =  await axios.get('http://localhost:3001/users')
            const arrayUsers = response.data

            const result = arrayUsers.find( user => user.userEmail === data.user.email)

            if(result){
                alert('ya existe ese usuario')   
            }else{
                const value = ({
                userName: data.user.displayName,
                        userPassword: 'firepass',        
                        userEmail: data.user.email,     
                        userImage: data.user.photoURL
                        // data.user.photoURL '               
                        // userProvider: data.user.providerId,
                        // userUid: data.user.uid
                }) 
                    await axios.post('http://localhost:3001/users', value) 
                    history.push("/Login");
            } 
         }       
        )
    }
  return (
    <div>
        <button className={style.buttonGoogle} onClick={handleClick}>Registrar con Google</button>      
    </div>
  )
}

export default Login