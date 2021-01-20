import React from 'react';
import './Logo.css';

function Logo() {
  return (
    <img src={process.env.PUBLIC_URL + '/alice.jpg'} className="logo" alt='Our muse' />
  );
}

export default Logo;