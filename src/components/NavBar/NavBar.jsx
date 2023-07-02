import React from "react";
import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import joystick from "../NavBar/joystick.jpg";

export default function NavBar({ size, userName }) {
  return (
    <nav className={style.nav}>
      <div className={style.a}>
        <a href="/home">HOME</a>
        <a href="/favorites">FAVORITES</a>
        <a href="/videogame">VENDER</a>
        <a href="/about">ABOUT</a>
        <a href="/login">LOGIN</a>
        <a href="/register">REGISTER</a>
      </div>
      <div>
        <IconButton aria-label="mostrar items" color="inherit">
          <Badge badgeContent={size.size} color="secondary">
            <ShoppingCartIcon fontSize="large" color="white" />
          </Badge>
        </IconButton>
      </div>
      <div>
        <img className={style.userImg} src={joystick} alt="Imagen de perfil" />
      </div>
    </nav>
  );
}

{
  /* <img src={userName ? userName : { joystick }} alt="Imagen de perfil" />
"""""silenciado hasta que reciba el userName""""" */
}
