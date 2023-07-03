import { auth , provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import  style  from '../Login.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getDataUser } from '../../../actions'


const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleClick = () => {

        signInWithPopup(auth,provider).then( async(data) => {    
            const response =  await axios.get('http://localhost:3001/users')
            const arrayUsers = response.data

            const result = arrayUsers.find( user => user.userEmail === data.user.email)

            if(result){
                const dataUser = {
                    nombre: result.userName,
                    userID: result.id,
                    cartID: result.Carrito.id
                }
                 dispatch(getDataUser(dataUser))
                history.push("/Home");    
            }else{
                alert('No existe este usuario')    
            } 
         }       
        )
    }
  return (
    <div>
        <button className={style.buttonGoogle} onClick={handleClick}>Logear con Google</button>      
    </div>
  )
}

export default Login