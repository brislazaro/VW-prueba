import { FC } from "react";
import style from "./header.module.css";
import logo from "../../assets/img/logo.webp";

const Header: FC = () => {
  return (
    <header className={style.header}>
      <img src={logo} alt="logo" className={style.logo} />
      <h1>VW technical test</h1>
    </header>
  );
};

export default Header;
