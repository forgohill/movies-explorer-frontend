/**
Подготовьте необходимые маршруты:
по роуту / отображается страница «О проекте»;
по роуту /movies отображается страница «Фильмы»;
по роуту /saved-movies отображается страница «Сохранённые фильмы»;
по роуту /profile отображается страница с профилем пользователя;
по роутам /signin и /signup отображаются страницы авторизации и регистрации.
Защищать маршруты авторизацией пока не требуется. Достаточно наладить работу всех ссылок:
нажатие на логотип ведёт на страницу «О проекте»;
нажатие на «Фильмы» — на роут /movies;
нажатие на «Сохранённые фильмы» — на роут /saved-movies;
нажатие на «Регистрация», «Авторизация», «Аккаунт» — на соответствующие роуты /signup, /signin и /profile.
4. Вёрстка
 */
import React from 'react';
import { Link } from 'react-router-dom'
import './Navigation.css';

const Navigation = () => {
  return (
    <div >
      <p><b>Navigation</b> — компонент, который отвечает за меню навигации на сайте.</p>
      <div className='navigation__navbar'>
        <Link to='/' className='navigation__link'>ЛОГОТИП</Link>
        <Link to='/movies' className='navigation__link'>ФИЛЬМЫ</Link>
        <Link to='/saved-movies' className='navigation__link'>СОХРАНЕНЫЕ ФИЛЬМЫ</Link>
        <Link to='/signin' className='navigation__link'>ВОЙТИ</Link>
        <Link to='/signup' className='navigation__link'>РЕГИСТРАЦИЯ</Link>
      </div>
    </div>
  );
}

export default Navigation;
