import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import style from "./Cart.module.css";
import axios from "axios";
import MercadoPago from "./MercadoPago/MercadoPago";

const Cart = () => {
  const dataUser = useSelector((state) => state.dataUser);
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const history = useHistory();

  const handleDataCart = async () => {
    const cartID = dataUser.cartID;
    const response = await axios.get(`http://localhost:3001/cart/${cartID}`);
    setCart(response.data[0]?.Videogames);
  };

  const deleteGame = async (gameId) => {
    try {
      const cartIdLocal = dataUser.cartID;
      const data = {
        gameID: gameId,
        cartID: cartIdLocal
      };
      const response = await axios.post(`http://localhost:3001/cart/delete`, data);
      setCart(response.data[0]?.Videogames);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   handleDataCart();
  //   handlePrice();
  // }, []);

  useEffect(() => {
    handleDataCart();
  }, []);

  useEffect(() => {
    handlePrice();
  }, [cart]);

  const handlePrice = () => {
      const total = cart.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.unit_price;
    }, 0);
    setPrice(total); 
  };

  return (
    <div className={style.all}>
      <div>
        <NavBar />
      </div>
      {cart?.length > 0 ? (
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
              <button onClick={() => deleteGame(item.id)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <div className={style.emptyCart}>
          <p>Aún no hay juegos en tu carrito</p>
          <button onClick={() => history.push("/home")}>Ir al Home</button>
        </div>
      )}
      <div className={style.total}>
        <span>Total Price of your Cart</span>
        <span>{price.toFixed(2)}</span>
      </div>
      <div>
        <MercadoPago />
      </div>
    </div>
  );
};

export default Cart;
