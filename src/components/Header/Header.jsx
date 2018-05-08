import React from 'react';
import './Header.css';
import logo from './img/logo.png';

const Header = () => (
  <header className="header-container">
    <img src={logo} alt="" className="header-logo"/>
    <h1 className="header-title">
      MTG Seeker
    </h1>
  </header>
)

export default Header;