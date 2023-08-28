import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';


const AuthForm = ({ title, ...props }) => {
  console.log(props);

  return (
    <>
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form'>
        {props.children}
      </form>
      <div className='register__wrapper'>
        <p className="register__paragraph">Уже зарегистрированы? <Link
          to='/signin'
          className='register__link links__hover'
        >
          Войти
        </Link>
        </p>
      </div>
    </>
  );
}

export default AuthForm;
