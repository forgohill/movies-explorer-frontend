import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useValidationsForms from '../../hooks/useValidationsForms';

import './Profile.css';

const Profile = ({
  onAuth,
  onRemoveCookie,
  onUpdateUserInfo
}) => {
  // const { email, name } = useContext(CurrentUserContext);
  const { name, email } = useContext(CurrentUserContext);
  const [isVisible, setIsVisible] = useState(true);

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
  } = useValidationsForms();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('СРАБОТАЛ handleSubmit Profile');
    // const date = { inputValues.name, inputValues.email }
    onUpdateUserInfo(inputValues);
    setIsVisible(!isVisible);
  }


  const handleRedact = (e) => {
    console.log('СРАБОТАЛ handleRedact Profile');
    e.preventDefault();
    setIsVisible(!isVisible);

    // if (isVisible === true) {
    //   return setIsVisible(false)
    // }
    // return setIsVisible(true);

  }

  const btnCU = () => {
    console.log(name, email);
  }

  useEffect(() => {
    setInputValues({ name, email })
    // setIsVisible(true);
  }, [name, email]);

  return (
    <main
      className='profile'>

      <button
        onClick={btnCU}>
        click btnCU
      </button>

      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${inputValues.name}!`}</h1>
        <form className='profile__form'
          // onSubmit={handleRedact}
          onSubmit={handleSubmit}

          noValidate
        >
          <label
            htmlFor="email"
            className='profile__label'>
            Имя
            <input
              placeholder='Введите имя'
              value={inputValues.name ?? ''}
              name='name'
              disabled={isVisible}
              type="text"
              id='email'
              className='profile__input'
              onChange={handleChange}
              required />
            <span
              className='profile__error'>
              {errMessage.name}
              {/* Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов). */}
            </span>
          </label>

          <div className="profile__line"></div>

          <label
            htmlFor="name"
            className='profile__label'>
            E-mail
            <input
              disabled={isVisible}
              // value={'pochta@yandex.ru'}
              placeholder='Введите e-mail'
              value={inputValues.email ?? ''}
              name='email'
              type="email"
              id='name'
              className='profile__input'
              onChange={handleChange}
              required />
            <span
              className='profile__error'>
              {errMessage.email}
              {/* Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов). */}
            </span>
          </label>

          <span
            className={`profile__error-submit
            ${isVisible === false
                ? 'profile__error-submit_show'
                : ''}`}>
            При обновлении профиля произошла ошибка.
          </span>
          <button
            // disabled
            // onClick={handleRedact}
            className={`profile__btn-save
            ${isVisible === false
                ? 'profile__btn-save_show'
                : ''}`}>
            Сохранить
          </button>

        </form>

        <button
          onClick={handleRedact}
          className={`profile__btn-redact
              ${isVisible === true
              ? 'profile__btn-redact_show'
              : ''}
              links-hover`}>
          Редактировать
        </button>

        <Link
          to='/'
          className={`profile__link
          ${isVisible === true
              ? 'profile__link_show'
              : ''} links-hover`}
          onClick={onRemoveCookie}>
          Выйти из аккаунта
        </Link>

      </div>
    </main >
  );
}

export default Profile;
