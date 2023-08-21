import React from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
  return (
    <div>
      <b>Register</b> — компонент страницы регистрации.
      <Link
        to='/signin'
        className='login__link'

      >
        РЕГИСТРАЦИЯ
      </Link>
    </div>
  );
}

export default Register;
