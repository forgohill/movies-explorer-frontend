import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';
import AuthForm from '../AuthForm/AuthForm'
const Login = ({
  onAuth,
}) => {
  const Authorized = React.useContext(AuthorizedContext);
  console.log(Authorized);

  return (
    <main>
      <b>Login</b> — компонент страницы авторизации.
      <Link
        to='/'
        className='login__link'
        onClick={onAuth}
      >
        ВОЙТИ
      </Link>

      <AuthForm>
        <div>РЕБЕНОЧЕК</div>
      </AuthForm>
    </main>
  );
}

export default Login;
