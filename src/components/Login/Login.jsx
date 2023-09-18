import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';

import useValidationsForms from '../../hooks/useValidationsForms';

import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';

import './Login.css';


const Login = ({
  onAuth,
  onLogin,


  sourceInfoTooltips,
}) => {
  const Authorized = React.useContext(AuthorizedContext);
  // console.log(Authorized);
  const { pathname } = useLocation();

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
  } = useValidationsForms();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('сработал Login handleSubmit');
    if (isValid) {
      onLogin(inputValues);
    }
  }

  return (
    <main className='login auth'>
      <AuthForm
        title={'Рады видеть!'}
        buttonText={'Войти'}
        authMessage={'Ещё не зарегистрированы? '}
        authLinkMessage={'Регистрация'}
        endpoint={'/signup'}
        // onClickLogin={handleClick}
        onSubmit={handleSubmit}
        onDisabled={isValid}
        sourceInfoTooltips={sourceInfoTooltips}
      >

        <AuthInput
          inputValue={inputValues.email ?? ''}
          erorrMessage={errMessage.email ?? ''}
          inputType={'email'}
          labelName={'E-mail'}
          placeholderInput={'Введите email'}
          idInput={'email'}
          nameInput={'email'}
          onChange={handleChange}
        />

        <AuthInput
          inputValue={inputValues.password ?? ''}
          erorrMessage={errMessage.password ?? ''}
          inputType={'password'}
          labelName={'Пароль'}
          placeholderInput={'Введите пароль'}
          idInput={'pwd'}
          nameInput={'password'}
          onChange={handleChange}
        />
      </AuthForm >
    </main >
  );
}

export default Login;
