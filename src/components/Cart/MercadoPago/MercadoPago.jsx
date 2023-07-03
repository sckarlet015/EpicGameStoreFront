import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useSelector } from 'react-redux';

//rafce
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MercadoPago = (props) => {

    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago("TEST-4bcd69e1-12ca-43ef-b6c3-9b27fc8f00fd");
    
    const arrayGames = props.arrayGames
    const cardID = useSelector(state => state.dataUser.cardID);
    const userId = useSelector(state => state.dataUser.userID);
    
    const createPreference = async () => {
      try {
      
      const order = { 
        cardID,
        userId,
        Videogames: arrayGames
      }
        const response = await axios.post(
          "http://localhost:3001/pay/create_preference",
          order
        );
        const { id } = response.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleBuy = async () => {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
      }
    };
    
  return (
    <div>
     <button onClick={handleBuy}>MERCADO PAGO</button>
            {preferenceId && (
              console.log(preferenceId),
              <Wallet initialization={{ preferenceId: preferenceId }} />
            )} 
    </div>
    
  )
}

export default MercadoPago
