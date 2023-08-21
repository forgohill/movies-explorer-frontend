import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Header.css';

const Header = ({
  onAuth,
}) => {

  return (
    <div className='header'>
      <Link to='/' className='header__logo links__hover'></Link>
      <Navigation onAuth={onAuth} />
      <BurgerMenu />
    </div>
  );
}

export default Header;
