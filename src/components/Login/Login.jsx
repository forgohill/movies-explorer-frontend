import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';

import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthForm/AuthInput/AuthInput';
import './Login.css';
const Login = ({
  onAuth,
}) => {
  const Authorized = React.useContext(AuthorizedContext);
  console.log(Authorized);
  const { pathname } = useLocation();

  const handleClick = (e) => {
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

        {/* <button
          type='button'
          onClick={handleClick}
          to='/'
          className='auth__btn'>Войти</button> */}
      </AuthForm >

      {/* <div className='login__wrapper'>
        <p className="login__paragraph">Ещё не зарегистрированы? <Link
          to='/signup'
          className='login__link links-hover'
        >
          Регистрация
        </Link>
        </p>
      </div> */}

    </main >
  );
}

export default Login;
