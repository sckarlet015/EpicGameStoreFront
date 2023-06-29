import React from "react";
import style from "./NavBar.module.css"

export default function NavBar(size) {
  return (
    
    <nav>
      {/* <div className="nav_box">
        <span className="my_shop"> Epic Game Store </span>
      </div> */}
      <div>
        <span className={style.cart} > Carrito: {size.size} </span>
      </div>
    </nav>
    
  );
}
