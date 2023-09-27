import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';




const AuthForm = ({ title,
  buttonText,
  authMessage,
  authLinkMessage,
  endpoint,
  onClickLogin,
  onSubmit,
  onDisabled,
  sourceInfoTooltips,
  onBlockedButton,
  ...props }) => {
  // console.log(props);



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('сработал handleSubmit AuthForm');
  //   onSubmit();
  // }



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('сработал handleSubmit AuthForm');
  //   onSubmit();
  // }

  return (
    <>
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form'
        // onSubmit={onClickLogin}
        // onSubmit={handleSubmit}
        onSubmit={onSubmit}
        noValidate
      // onSubmit={onClickLogin}
      // onSubmit={handleSubmit}
      // onSubmit={onSubmit}
      // noValidate
      >
        {props.children}

        {sourceInfoTooltips.access ? <span
          className='auth__error'
        >{sourceInfoTooltips.message}</span> : ''}



        <button
          // onClick={onClickLogin}
          type='submit'
          className='auth__btn'
          // disabled={!onDisabled && onBlockedButton}
          disabled={!onDisabled || onBlockedButton}
        // disabled={!onDisabled}
        >{buttonText}</button>
      </form>

      <div className='auth__wrapper'>
        <p className="auth__paragraph">{authMessage}<span className='auth__link'><Link
          to={endpoint}
          className='auth__link links-hover'
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
