import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';
import useValidationsForms from '../../hooks/useValidationsForms';
import { REGEX_EMAIL, REGEX_NAME } from '../../utils/constats';

const Register = ({
  onRegister,
  sourceInfoTooltips,
  onBlockedButton,
  onResetSourceInfoTooltips,

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
        onResetSourceInfoTooltips={onResetSourceInfoTooltips}
      >
        <AuthInput
          inputType={'text'}
          labelName={'Имя'}
          inptValue={inputValues.name ?? ''}
          erorrMessage={errMessage.name ?? ''}
          // inptValue={inputValues.name ?? ''}
          // erorrMessage={errMessage.name ?? ''}
          idInput={'name'}
          nameInput={'name'}
          // nameInput={'name'}
          placeholderInput={'Введите имя'}
          onChange={handleChange}
          // onChange={handleChange}
          pattern={REGEX_NAME}
        />

        <AuthInput
          inputType={'email'}
          labelName={'E-mail'}
          inptValue={inputValues.email ?? ''}
          erorrMessage={errMessage.email ?? ''}
          // inptValue={inputValues.email ?? ''}
          // erorrMessage={errMessage.email ?? ''}
          idInput={'email'}
          nameInput={'email'}
          // nameInput={'email'}
          placeholderInput={'Введите email'}
          onChange={handleChange}
          // onChange={handleChange}
          pattern={REGEX_EMAIL}
        />

        <AuthInput
          inputType={'password'}
          labelName={'Пароль'}
          inptValue={inputValues.password ?? ''}
          erorrMessage={errMessage.password ?? ''}
          // inptValue={inputValues.password ?? ''}
          // erorrMessage={errMessage.password ?? ''}
          idInput={'pwd'}
          nameInput={'password'}
          // nameInput={'password'}
          placeholderInput={'Введите пароль'}
          onChange={handleChange}
          // onChange={handleChange}
          minLength="6"

        />
      </AuthForm >

    </main >
  );
}

export default Register;
