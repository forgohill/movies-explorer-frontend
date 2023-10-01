import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

import useValidationsForms from '../../hooks/useValidationsForms';
import { REGEX_EMAIL } from '../../utils/constats';

import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';

import './Login.css';

const Login = ({
  onLogin,
  sourceInfoTooltips,
  onBlockedButton,
  onResetSourceInfoTooltips,
}) => {
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
        onSubmit={handleSubmit}
        onDisabled={isValid}
        sourceInfoTooltips={sourceInfoTooltips}
        onBlockedButton={onBlockedButton}
        onResetSourceInfoTooltips={onResetSourceInfoTooltips}
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
          pattern={REGEX_EMAIL}
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
          minLength="6"
        />
      </AuthForm >
    </main >
  );
}

export default Login;
