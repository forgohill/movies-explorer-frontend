import React from 'react';
import { useLocation } from 'react-router-dom'
import './Footer.css';

const Footer = () => {

  const { pathname } = useLocation();

  return (
    <footer className={`footer ${pathname === '/movies' ? 'footer_movies' : ''}`}>
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__line"></div>
      <div className="footer__container">
        <p className="footer__text footer__text_copyright">© 2020</p>
        <div className="footer__wrapper">
          <p className="footer__text">Яндекс.Практикум</p>
          <a href="#" className="footer__link">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
