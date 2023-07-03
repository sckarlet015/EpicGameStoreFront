import { useState, useEffect } from "react"
import { useSelector} from "react-redux"
import NavBar from "../NavBar/NavBar";
import style from "./Cart.module.css"
import axios from "axios";


export default function Cart() {

    const dataUser = useSelector((state) => state.dataUser)
    const [price, setPrice] = useState(0)
    const [cart, setCart] = useState([])


    // console.log(dataUser);

    const handleDataCart = async () => {
        
        // const cartID =  {
        //     cartID: dataUser.cartID
        // };
        const cartID = dataUser.cartID

        const response = await (await axios.get(`http://localhost:3001/cart/${cartID}`)).data
        // console.log(response[0].Videogames);
        setCart(response[0]?.Videogames)
    }

    console.log(cart);

    useEffect(() => {
        handleDataCart();
        handlePrice();
    },[])

    const handlePrice = ()=>{
        let total = 0;
        cart.map((item)=>(
            total += item.quantity * item.price
        ))
        setPrice(total);
    }

    return (
        <div className={style.all}>
            <div>
                <NavBar />
            </div>
            {
                cart.map((item) => (
                    <div key={item.id} className={style.cart_box}>
                    <div className={style.cart_img}>
                        <img src={item.image} alt={item.title} className={style.image} />
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <p>{item.quantity}</p>
                    </div>
                    <div>
                        <span>{item.unit_price}</span>
                        <button>Remove</button>
                    </div>
                </div>
                ))
            }
            <div className={style.total}>
                <span>Total Price of your Cart</span>
                <span>{price}</span>
            </div>
        </div>
    )
}