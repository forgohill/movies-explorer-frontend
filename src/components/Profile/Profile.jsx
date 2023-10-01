import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useValidationsForms from '../../hooks/useValidationsForms';

import './Profile.css';

const Profile = ({
  onAuth,
  onRemoveCookie,
  sourceInfoTooltips,
  onResetSourceInfoTooltips,
  onUpdateUserInfo,
  onBlockedButton
}) => {
  // const { email, name } = useContext(CurrentUserContext);
  const { name, email } = useContext(CurrentUserContext);
  const [isVisible, setIsVisible] = useState(true);
  const [isRedact, setIsRedact] = useState(false);
  const [changesInput, setChangesInput] = useState({
    name: '',
    email: '',
  });

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
    setIsValid,
  } = useValidationsForms();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('СРАБОТАЛ handleSubmit Profile');
    // setIsValid(true);
    // const date = { inputValues.name, inputValues.email }
    if (isValid) {
      console.log('СРАБОТАЛ isValid Profile');
      onUpdateUserInfo(inputValues);
      // setIsVisible(!isVisible);
    }
  }

  // const inputName = useRef(null);
  // const focusInputName = () => {
  //   inputName.current.focus();
  // };


  const handleRedact = (e) => {
    console.log('СРАБОТАЛ handleRedact Profile');
    e.preventDefault();
    onResetSourceInfoTooltips();
    setIsVisible(!isVisible);
    setIsValid(true);
    // if (isVisible === true) {
    //   return setIsVisible(false)
    // }
    // return setIsVisible(true);
  }

  const btnCU = () => {
    console.log(name, email);
  }

  // эффект котороый отвечает за
  // отображение на странице из
  // карентЮзер контекста
  useEffect(() => {
    setInputValues({ name, email });
    setChangesInput({ name, email });
    console.log(`isValid  ${isValid}`);
    // setIsVisible(true);
  }, [name, email]);

  useEffect(() => {
    console.log('хуяк');
    if (
      inputValues.name === changesInput.name
      && inputValues.email === changesInput.email
    ) {
      console.error('РАВНО!!!')
      // setIsVisible(true);
      setIsRedact(true);
    } else {
      console.error('___НЕРАВНО___');
      // setIsVisible(false);
      setIsRedact(false);
      // setIsValid(true);
    }
  }, [inputValues])

  useEffect(() => {
    // focusInputName();
    if (sourceInfoTooltips.isSuccess) {
      setIsVisible(true);
    } else { console.error('ХУЕЦ') }
  }, [sourceInfoTooltips]);

  return (
    <main
      className='profile'>

      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${name}!`}</h1>
        <form className='profile__form'
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
              type="text"
              id='email'
              className='profile__input'
              onChange={handleChange}
              required />
            <span
              className='profile__error'>
              {errMessage.name}
            </span>
          </label>

          <div className="profile__line"></div>

          <label
            htmlFor="name"
            className='profile__label'>
            E-mail
            <input
              // disabled={isVisible}
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
                : ''}
            ${sourceInfoTooltips.isSuccess ? 'profile__error-submit_success' : ''}`}>
            {sourceInfoTooltips.message}
            {/* При обновлении профиля произошла ошибка. */}
          </span>

          <button
            disabled={!isValid || onBlockedButton}
            // onClick={handleRedact}
            className={`profile__btn-save
            ${isVisible === false
                ? 'profile__btn-save_show'
                : ''}`}>
            Сохранить
          </button>

        </form>

        <button
          disabled={isRedact || !isValid}
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
