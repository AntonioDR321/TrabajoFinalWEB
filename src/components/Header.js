import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ReactComponent as ForkKnifeIcon } from '../assets/fork-knife.svg';

function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>Food Quality</h1>
            <ForkKnifeIcon className="icon" />
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/about">Acerca de</Link></li>
            <li><Link to="/login" className="login-btn">Iniciar sesión</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;