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
import { AuthorizedContext } from '../../contexts/AuthorizedContext';
const Navigation = () => {
  const Authorized = React.useContext(AuthorizedContext);
  console.log(Authorized);
  return (
    // <nav className='navigation'>
    <nav
      className={`navigation ${Authorized === true
        ? 'navigation_invisible'
        : ''}`}>
      {Authorized === true
        ? (
          <ul className='navigation__container'>
            <ul className='navigation__wrapper'>
              <li className='navigation__item'>
                <NavLink
                  to='/movies'
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "navigation__link navigation__link_films links__hover"
                      :
                      isActive
                        ? "navigation__link navigation__link_films navigation__link_active"
                        : "navigation__link navigation__link_films links__hover"}
                // className='navigation__link
                //   navigation__link_films
                //   links__hover'
                >
                  Фильмы
                </NavLink>
              </li>
              <li className='navigation__item'>
                <NavLink
                  to='/saved-movies'
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "navigation__link navigation__link_films links__hover"
                      :
                      isActive
                        ? "navigation__link navigation__link_films navigation__link_active"
                        : "navigation__link navigation__link_films links__hover"}
                // className='navigation__link
                //   navigation__link_films
                //   links__hover'
                >
                  Сохранённые фильмы
                </NavLink></li>
            </ul>
            {/* <li className='navigation__item'>
                      <Link
                        to='/profile'
                        className='navigation__link
                        navigation__link_account
                        links__hover'>
                        <div className='navigation__icon-account'></div>
                        Аккаунт
                      </Link>
                    </li> */}
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
                        links__hover'>
                Регистрация
              </Link>
            </li>
            <li className='navigation__item'>
              <Link
                to='/signin'
                className='navigation__button-login
                        links__hover'>
                Войти
              </Link>
            </li>
          </ul>
        )}
    </nav>
  );
}

export default Navigation;
