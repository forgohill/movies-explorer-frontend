import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Header.css';

const Header = ({
  onAuth,
}) => {

  const { pathname } = useLocation();
  console.log(pathname);

  return (
    pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile'
      ?
      <header className={`header ${pathname === '/' ? 'header_place_hero' : ''} ${pathname === '/movies' ? 'header_place_movies' : ''}`}>
        <Link to='/' className='header__logo links-hover'></Link>
        <Navigation onAuth={onAuth} />
        <BurgerMenu />
      </header>
      : <header className={`header ${pathname === '/signin' || pathname === '/signup' ? 'header_place_auth' : 'header_type_disable'}`}>
        <Link to='/' className='header__logo links-hover'></Link>
      </header>
  );
}

export default Header;
