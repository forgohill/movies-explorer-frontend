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
      <header className={`header ${pathname === '/' ? 'header_hero' : ''} ${pathname === '/movies' ? 'header_movies' : ''}`}>
        <Link to='/' className='header__logo links-hover'></Link>
        <Navigation onAuth={onAuth} />
        <BurgerMenu />
      </header>
      : <header className='header header_auth'>
        <Link to='/' className='header__logo links-hover'></Link>
      </header>
  );
}

export default Header;

/**
 *
    <Routes>

      <Route
        path={'/'}
        element={
          <header className={`header ${pathname === '/' ? 'header_hero' : ''} ${pathname === '/movies' ? 'header_movies' : ''}`}>
            <Link to='/' className='header__logo links-hover'></Link>
            <Navigation onAuth={onAuth} />
            <BurgerMenu />
          </header>
        }>
      </Route>

      <Route
        path={'/movies'}
        element={
          <header className={`header ${pathname === '/' ? 'header_hero' : ''} ${pathname === '/movies' ? 'header_movies' : ''}`}>
            <Link to='/' className='header__logo links-hover'></Link>
            <Navigation onAuth={onAuth} />
            <BurgerMenu />
          </header>
        }>
      </Route>

      <Route
        path={'/saved-movies'}
        element={
          <header className={`header ${pathname === '/' ? 'header_hero' : ''} ${pathname === '/movies' ? 'header_movies' : ''}`}>
            <Link to='/' className='header__logo links-hover'></Link>
            <Navigation onAuth={onAuth} />
            <BurgerMenu />
          </header>
        }>
      </Route>

      <Route
        path={'/profile'}
        element={
          <header className={`header ${pathname === '/' ? 'header_hero' : ''} ${pathname === '/movies' ? 'header_movies' : ''}`}>
            <Link to='/' className='header__logo links-hover'></Link>
            <Navigation onAuth={onAuth} />
            <BurgerMenu />
          </header>
        }>
      </Route>
    </Routes>
 */
