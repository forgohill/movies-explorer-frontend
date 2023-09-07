import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';

import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import './Login.css';
const Login = ({
  onAuth,
}) => {
  const Authorized = React.useContext(AuthorizedContext);
  // console.log(Authorized);
  const { pathname } = useLocation();

  const [formValue, setFormValue] = useState({
    authEmail: '',
    authPwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  }
  console.log(formValue);

  const handleClick = (e) => {
    console.log(e);
    e.preventDefault();
    onAuth();
  }

  return (
    <main className='login auth'>
      <AuthForm
        title={'Рады видеть!'}
        buttonText={'Войти'}
        authMessage={'Ещё не зарегистрированы? '}
        authLinkMessage={'Регистрация'}
        endpoint={'/signup'}
        onClickLogin={handleClick}
      >

        <AuthInput
          inputValue={formValue.authEmail}
          inputType={'email'}
          labelName={'E-mail'}
          placeholderInput={'Введите email'}

          inptValue={'pochta@yandex.ru|'}
          idInput={'email'}
          nameInput={'authEmail'}
          erorrMessage={'Что - то пошло не так...'}
          onChange={handleChange}
        />

        <AuthInput
          inputValue={formValue.authPwd}
          inputType={'password'}
          labelName={'Пароль'}
          placeholderInput={'Введите пароль'}
          // inptValue={'••••••••••••••'}
          idInput={'pwd'}
          nameInput={'authPwd'}
          erorrMessage={'Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов).'}
          onChange={handleChange}
        />
      </AuthForm >
    </main >
  );
}

export default Login;
