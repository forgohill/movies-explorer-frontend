import React from 'react';
import NavTab from '../NavTab/NavTab'
import './Promo.css';

const Promo = () => {
  return (
    <section className='promo'>
      {/* <b>Promo</b> — компонент с вёрсткой баннера страницы «О проекте». */}
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab></NavTab>
    </section>
  );
}

export default Promo;
