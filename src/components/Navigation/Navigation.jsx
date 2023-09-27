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
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import AccountButton from '../AccountButton/AccountButton'
import './Navigation.css';
// import { AuthorizedContext } from '../../contexts/AuthorizedContext';
const Navigation = ({ isLoggedIn }) => {
  // const Authorized = React.useContext(AuthorizedContext);
  // console.log(`навигатион :${isLoggedIn}`);
  // console.log(isLoggedIn);
  // console.error(isLoggedIn);
  return (
    <nav
      className={`navigation ${isLoggedIn === true
        ? 'navigation_invisible'
        : ''}`}>
      {isLoggedIn === true
        ? (
          <ul className='navigation__container'>
            <ul className='navigation__wrapper'>
              <li className='navigation__item'>
                <NavLink
                  to='/movies'
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "navigation__link navigation__link_films links-hover"
                      :
                      isActive
                        ? "navigation__link navigation__link_films navigation__link_active"
                        : "navigation__link navigation__link_films links-hover"}
                >
                  Фильмы
                </NavLink>
              </li>
              <li className='navigation__item'>
                <NavLink
                  to='/saved-movies'
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "navigation__link navigation__link_films links-hover"
                      :
                      isActive
                        ? "navigation__link navigation__link_films navigation__link_active"
                        : "navigation__link navigation__link_films links-hover"}
                >
                  Сохранённые фильмы
                </NavLink></li>
            </ul>
            <li className='navigation__item'>
              <AccountButton></AccountButton>
            </li>

          </ul>
        )
        : (
          <ul className='navigation__container
                   navigation__container_auth'>
            <li className='navigation__item'>
              <Link
                to='/signup'
                className='navigation__link
                        navigation__link_registration
                        links-hover'>
                Регистрация
              </Link>
            </li>
            <li className='navigation__item'>
              <Link
                to='/signin'
                className='navigation__button-login
                        links-hover'>
                Войти
              </Link>
            </li>
          </ul>
        )}

    </nav>
  );
}

export default Navigation;
