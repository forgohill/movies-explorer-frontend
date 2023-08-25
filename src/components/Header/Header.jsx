import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Header.css';

const Header = ({
  onAuth,
}) => {

  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <div className={`header ${pathname === '/' ? 'header_hero' : ''} ${pathname === '/movies' ? 'header_movies' : ''}`}>
      <Link to='/' className='header__logo links__hover'></Link>
      <Navigation onAuth={onAuth} />
      <BurgerMenu />
    </div>
  );
}

export default Header;
