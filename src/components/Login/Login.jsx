import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';

const Login = ({
  onAuth,
}) => {
  const Authorized = React.useContext(AuthorizedContext);
  console.log(Authorized);

  return (
    <div>
      <b>Login</b> — компонент страницы авторизации.
      <Link
        to='/'
        className='login__link'
        onClick={onAuth}
      >
        ВОЙТИ
      </Link>
    </div>
  );
}

export default Login;
