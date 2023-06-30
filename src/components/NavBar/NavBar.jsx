import React from "react";
import style from "./NavBar.module.css"
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function NavBar(size) {
  return (
    
    <nav>
      {/* <div className="nav_box">
        <span className="my_shop"> Epic Game Store </span>
      </div> */}
      <div>
        <span className={style.cart} > Carrito: {size.size} </span>
        <IconButton aria-label="mostrar items" color= 'inherit'>
              <Badge badgeContent={size.size} color="secondary">
               <ShoppingCartIcon fontSize="large" color='white'/>
              </Badge>
        </IconButton>
      </div>
    </nav>
    
  );
}
