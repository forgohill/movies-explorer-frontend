/**
Подготовьте необходимые маршруты:
по роуту / отображается страница «О проекте»;
по роуту /movies отображается страница «Фильмы»;
по роуту /saved-movies отображается страница «Сохранённые фильмы»;
по роуту /profile отображается страница с профилем пользователя;
по роутам /signin и /signup отображаются страницы авторизации и регистрации.
Защищать маршруты авторизацией пока не требуется. Достаточно наладить работу всех ссылок:
нажатие на логотип ведёт на страницу «О проекте»;
нажатие на «Фильмы» — на роут /movies;
нажатие на «Сохранённые фильмы» — на роут /saved-movies;
нажатие на «Регистрация», «Авторизация», «Аккаунт» — на соответствующие роуты /signup, /signin и /profile.
4. Вёрстка
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthorizedContext } from '../../contexts/AuthorizedContext';
import { register, authorize, logout, getUser } from '../../utils/mainApi';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isAuthorized, setAuthorized] = useState(false);

  // стейт блокирует кнопку в момент отправки формы
  const [isBlockedButton, setIsBlockedButton] = useState(false);
  // стейт для хранения типа ошибок
  const [sourceInfoTooltips, setSourceInfoTooltips] = React.useState({
    access: false,
    message: '',
  });

  const togleAuthorized = () => {
    console.log('togleAuthorized');
    if (isAuthorized === true) {
      return setAuthorized(false)
    }
    return setAuthorized(true);
  };

  const onlyLogin = () => {
    setAuthorized(true);
  }

  // //////////////////////////////////////////
  // //////////// РЕГИСТРАЦИЯ АВТОРИЗАЦИЯ /////
  // //////////////////////////////////////////

  // регистрация
  const handlerRegister = ({ email, password, name }) => {
    console.log(`сработал handlerRegister App`);
    console.error(`
    email — ${email}
    password — ${password}
    name — ${name}`);
    setIsBlockedButton(true);
    const date = { email, password, name };
    register(date)
      .then((res) => {
        // setSourceInfoTooltips({
        //   access: true,
        //   message: 'Усешная регистрация',
        // });
        console.log(res);
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setSourceInfoTooltips({
            access: true,
            message: 'Пользователь с таким email уже существует.',
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            message: 'При регистрации пользователя произошла ошибка.',
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        setIsBlockedButton(false);
      })
  };

  // авторизация
  const handlerLogin = ({ email, password }) => {
    const date = { email, password };
    console.log('сработал Login handlerLogin')
    console.error(`
    email — ${email}
    password — ${password}`);
    authorize(date)
      .then((res) => {
        console.log(res);
        localStorage.setItem('loginInMestoTrue', true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      })
  };


  //  Проверка токена/кукиса
  const cookieCheck = () => {
    getUser()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    const token = localStorage.getItem('loginInMestoTrue');
    console.log(token);
    console.log('сработал App cookieCheck');
    if (token) {
      // setIsLoggedIn(true);
      // navigate('/', { replace: true });
    }
  }

  // удаление кукиса JWT
  const removeCookie = () => {
    console.log('сработал App removeCookie')
    logout()
      .then((res) => {
        if (res.exit) {
          console.log('user logged out');

          localStorage.removeItem('loginInMestoTrue');
          // setIsLoggedIn(false);
          // setUserEmail('');
          // navigate('/sign-in', { replace: true });
          document.cookie = "jwtChek=; expires=Mon, 26 Dec 1991 00:00:01 GMT;";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    cookieCheck();
  }, []);

  return (
    <div className='app'>
      <div className='page'>
        <AuthorizedContext.Provider
          value={isAuthorized}>
          <Header
            onAuth={togleAuthorized}
          ></Header>
          <Routes>
            <Route
              path='/'
              element={
                <Main></Main>
              } />

            <Route
              path='/movies'
              element={
                <Movies></Movies>
              } />

            <Route
              path='/saved-movies'
              element={
                <SavedMovies></SavedMovies>
              } />

            <Route
              path='/signup'
              element={
                <Register
                  onRegister={handlerRegister}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                ></Register>
              } />

            <Route
              path='/signin'
              element={
                <Login
                  onAuth={onlyLogin}
                  onLogin={handlerLogin}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onRemoveCookie={removeCookie}
                  onCheckCockie={cookieCheck}
                ></Login>
              } />

            <Route
              path='/profile'
              element={
                <Profile
                  onAuth={togleAuthorized}
                ></Profile>
              } />

            <Route
              path='*'
              element={
                <PageNotFound></PageNotFound>
              } />

          </Routes>
          <Footer></Footer>
        </AuthorizedContext.Provider>
      </div>
    </div >
  );
}

export default App;
