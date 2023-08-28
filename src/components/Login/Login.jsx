import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Login.css';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';
import AuthForm from '../AuthForm/AuthForm'
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
      >

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
            className='auth__input' id='pwd'
            type='text'
          />
          <span
            className='auth__error auth__error_pwd'>
            Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов).
          </span>
          {/* className='auth__error auth__error_pwd'>Что то  не так.</span> */}
        </label>
        <button
          type='button'
          onClick={handleClick}
          to='/'
          className='auth__btn'>Войти</button>
      </AuthForm >
      <div className='login__wrapper'>
        <p className="login__paragraph">Ещё не зарегистрированы? <Link
          to='/signup'
          className='login__link links__hover'
        >
          Регистрация
        </Link>
        </p>
      </div>
    </main >
  );
}

export default Login;
