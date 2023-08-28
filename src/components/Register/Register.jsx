import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = () => {

  const { pathname } = useLocation();

  return (
    <main className='register auth'>
      <AuthForm
        title={'Добро пожаловать!'}
      >
        <label
          className='auth__label'
          htmlFor='name'>Имя
          <input
            value='Виталий'
            className='auth__input' id='name'
            type='text'
          />
          <span
            className='auth__error auth__error_name'>Что-то пошло не так...</span>
        </label>
        <label
          className='auth__label'
          htmlFor='email'>E-mail
          <input
            value='pochta@yandex.ru|'
            className='auth__input' id='email'
            type='text'
          />
          <span
            className='auth__error auth__error_email'>Что-то пошло не так...</span>
        </label>
        <label
          className='auth__label'
          htmlFor='pwd'>Пароль
          <input
            value='••••••••••••••'
            className='auth__input auth__input_error' id='pwd'
            type='text'
          />
          <span
            className='auth__error auth__error_pwd'>
            Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов).
          </span>
          {/* className='auth__error auth__error_pwd'>Что то  не так.</span> */}
        </label>
        <button
          type='submit'
          className='auth__btn'>Зарегистрироваться</button>
      </AuthForm >

    </main >
  );
}

export default Register;
