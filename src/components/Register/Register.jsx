import React from 'react';

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


  const handleSubmit = (e) => {
    e.preventDefault();
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
          idInput={'name'}
          nameInput={'name'}
          placeholderInput={'Введите имя'}
          onChange={handleChange}
          pattern={REGEX_NAME}
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
          pattern={REGEX_EMAIL}
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
          minLength="6"
        />
      </AuthForm >
    </main >
  );
}

export default Register;
