import React from 'react';
import './Header.css';
import Logo from './Logo.js';
import './Logo.css';
import { loadToken } from '../localStorage';
function Header() {

  const persistedToken = loadToken();
  return (
    <div className="header-wrap">
        <h3 className="sticky-inner-left-alice"> Alice, your assistant.</h3>
        <div className="sticky-inner-left-logo"> 
            <Logo />
        </div>
        <h3 className="sticky-inner-right-name">Welcome, {persistedToken.givenName}</h3>
        <div className="sticky-inner-right-logo">
            <img src={persistedToken.imageUrl} className="logo" alt='yourself' />
        </div>
    </div>
  );
}

export default Header;