
import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about' id='about'>
      <h2 className="about__title">О проекте</h2>
      <div className='about__line'></div>
      <ul className='about__list'>
        <li className='about_item'>
          <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='about_item'>
          <h3 className='about__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className='about__table'>
        <li className='about__cell'>
          <p className='about__cell-paragraph about__cell-paragraph_one-week'>1 неделя</p>
          <p className='about__cell-paragraph about__cell-paragraph_backend'>Back-end</p>
        </li>
        <li className='about__cell'>
          <p className='about__cell-paragraph about__cell-paragraph_four-week'>4 недели</p>
          <p className='about__cell-paragraph about__cell-paragraph_frontend'>Front-end</p>
        </li>
      </ul>
      {/* <b>AboutProject</b> компонент с описанием дипломного проекта. */}
    </section>
  );
}

export default AboutProject;
