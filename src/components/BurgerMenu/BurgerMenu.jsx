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


import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'
import AccountButton from '../AccountButton/AccountButton';
import './BurgerMenu.css';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';


const BurgerMenu = () => {
  const Authorized = React.useContext(AuthorizedContext);
  const [isChecked, setChecked] = useState(false);

  const togleChecked = () => {
    if (isChecked === true) {
      return setChecked(false)
    }
    return setChecked(true);
  };

  const handlerCheched = (e) => {
    const checked = e.target.checked;
    setChecked(checked);
    console.log(isChecked);
  }
  return (
    <>
      {Authorized === true ?
        < div className={`burger-menu ${(isChecked === true ? '' : '')}`} >
          < input
            checked={isChecked}
            onChange={handlerCheched}
            name='burgerCheckbox'
            type="checkbox"
            className='burger-menu__checkbox'
            id='burger-menu__checkbox' />

          <label
            htmlFor='burger-menu__checkbox'
            className={`burger-menu__label ${(isChecked === true ? 'burger-menu__label_active' : '')} `}>
          </label>

          <ul
            onClick={togleChecked}
            className='burger-menu__line-list links-hover'>
            <li className="burger-menu__line-item"></li>
            <li className="burger-menu__line-item"></li>
            <li className="burger-menu__line-item"></li>
            <li className="burger-menu__line-item"></li>
          </ul>

          <div
            className='burger-menu__cover'
            onClick={togleChecked}>
          </div>

          <nav className={`burger-menu__navigation ${(isChecked === true ? 'burger-menu__navigation_active' : '')}`}>
            <ul
              className='burger-menu__list'>
              <li className='burger-menu__item'>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "burger-menu__link links-hover"
                      :
                      isActive
                        ? "burger-menu__link burger-menu__link_active"
                        : "burger-menu__link links-hover"}
                  onClick={togleChecked}
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <NavLink

                  className={({ isActive, isPending }) =>
                    isPending
                      ? "burger-menu__link links-hover"
                      :
                      isActive
                        ? "burger-menu__link burger-menu__link_active"
                        : "burger-menu__link links-hover"}
                  onClick={togleChecked}
                  to="/movies">
                  Фильмы
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <NavLink

                  className={({ isActive, isPending }) =>
                    isPending
                      ? "burger-menu__link links-hover"
                      :
                      isActive
                        ? "burger-menu__link burger-menu__link_active"
                        : "burger-menu__link links-hover"}
                  onClick={togleChecked}
                  to="/saved-movies">
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <AccountButton
                  isChecked={isChecked}
                  togleChecked={togleChecked}></AccountButton>
              </li>
            </ul>
          </nav>

        </div >
        : null
      }
    </>
  );
}

export default BurgerMenu;
