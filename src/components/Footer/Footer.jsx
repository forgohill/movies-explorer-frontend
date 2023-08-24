import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
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
