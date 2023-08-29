import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({ onAuth }) => {
  return (
    <main
      className='profile'>
      {/* <b>Profile</b> — компонент страницы изменения профиля. */}
      <h1 className="profile__title">Привет Виталий!</h1>

      <form className='profile__form'>
        <label
          htmlFor="email"
          className='profile__label'>
          <input
            type="text"
            id='email'
            className='profile__input' />
        </label>
        <label
          htmlFor="name"
          className='profile__label'>
          <input
            type="text"
            id='name'
            className='profile__input' />
        </label>
        <span
          className='profile__error'
        ></span>
        <button
          className='profile__btn-save'
        >Сохранить</button>
      </form>
      <button
        className='profile__btn-redact'
      >Редактировать</button>

      <Link
        to='/'
        className='profile__link'
        onClick={onAuth}
      >
        Выйти из аккаунта
      </Link>
    </main>
  );
}

export default Profile;
