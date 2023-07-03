import React from 'react'
import axios from 'axios'
import { useState } from 'react';

//rafce
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MercadoPago = () => {

    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago("TEST-4bcd69e1-12ca-43ef-b6c3-9b27fc8f00fd");
  
    const createPreference = async () => {
      try {
        const arrayItems = 
          [{
            description: "Bananita contenta",
            price: 100,
            quantity: 1,
            // currency_id:"ARS"
          },
          {
            description: "Bananita contenta2",
            price: 100,
            quantity: 1,
            // currency_id:"ARS"
          }]
      
        const response = await axios.post(
          "http://localhost:3001/pay/create_preference",
          arrayItems
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
              <Wallet initialization={{ preferenceId: preferenceId }} />
            )} 
    </div>
    
  )
}

export default MercadoPago
