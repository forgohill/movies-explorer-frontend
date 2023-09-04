import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';


const AuthForm = ({ title,
  buttonText,
  authMessage,
  authLinkMessage,
  endpoint,
  onClickLogin,
  ...props }) => {
  console.log(props);

  return (
    <>
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form'>
        {props.children}
        <button
          onClick={onClickLogin}
          type='submit'
          className='auth__btn'>{buttonText}</button>

      </form>

      <div className='auth__wrapper'>
        <p className="auth__paragraph">{authMessage}<span className='auth__link'><Link
          to={endpoint}
          className='auth__link links__hover'
        >
          {authLinkMessage}
        </Link>
        </span>
        </p>
      </div>

    </>
  );
}

export default AuthForm;