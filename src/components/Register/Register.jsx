import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthForm/AuthInput/AuthInput';
import './Register.css';

const Register = () => {

  const { pathname } = useLocation();

  return (
    <main className='register auth'>
      <AuthForm
        title={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        authMessage={'Уже зарегистрированы? '}
        authLinkMessage={'Войти'}
        endpoint={'/signin'}

      >
        <AuthInput

          labelName={'Имя'}
          inptValue={'Виталий'}
          idInput={'name'}
          nameInput={'authName'}
          placeholderInput={''}
          erorrMessage={'Что - то пошло не так...'}
        />

        <AuthInput
          labelName={'E-mail'}
          inptValue={'pochta@yandex.ru|'}
          idInput={'email'}
          nameInput={'authEmail'}
          erorrMessage={'Что - то пошло не так...'}
        />

        <AuthInput
          labelName={'Пароль'}
          inptValue={'••••••••••••••'}
          idInput={'pwd'}
          nameInput={'authEmail'}
          erorrMessage={'Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов).'}
        />


      </AuthForm >

    </main >
  );
}

export default Register;
