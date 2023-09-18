import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';
import useValidationsForms from '../../hooks/useValidationsForms';

const Register = ({
  onRegister,
  sourceInfoTooltips,
  onBlockedButton
}) => {

  // стейт слушает запрет работы кнопки
  // const [isDisables, setIsDisables] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`сработал handleSubmit Register`);
    console.error(inputValues);
    console.log(`ВАЛИАДЦИЯ — ${isValid}`)
    if (isValid) {
      onRegister(inputValues);
    }
  }

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
  } = useValidationsForms();

  // useEffect(() => {
  //   setIsDisables(false)
  // }, [isValid]);

  const { pathname } = useLocation();

  return (
    <main className='register auth'>
      <AuthForm
        title={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        authMessage={'Уже зарегистрированы? '}
        authLinkMessage={'Войти'}
        endpoint={'/signin'}
        onSubmit={handleSubmit}
        onDisabled={isValid}
        sourceInfoTooltips={sourceInfoTooltips}
        onBlockedButton={onBlockedButton}
      >
        <AuthInput
          inputType={'text'}
          labelName={'Имя'}
          inptValue={inputValues.name ?? ''}
          erorrMessage={errMessage.name ?? ''}
          idInput={'name'}
          nameInput={'name'}
          placeholderInput={'Введите имя'}
          onChange={handleChange}

        />

        <AuthInput
          inputType={'email'}
          labelName={'E-mail'}
          inptValue={inputValues.email ?? ''}
          erorrMessage={errMessage.email ?? ''}
          idInput={'email'}
          nameInput={'email'}
          placeholderInput={'Введите email'}
          onChange={handleChange}
        />

        <AuthInput
          inputType={'password'}
          labelName={'Пароль'}
          inptValue={inputValues.password ?? ''}
          erorrMessage={errMessage.password ?? ''}
          idInput={'pwd'}
          nameInput={'password'}
          placeholderInput={'Введите пароль'}
          onChange={handleChange}
        />
      </AuthForm >

    </main >
  );
}

export default Register;
