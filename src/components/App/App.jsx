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
// import { AuthorizedContext } from '../../contexts/AuthorizedContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  register,
  authorize,
  logout,
  getUser,
  updateuserInfo,
  savedMovies,
  getMovies,
  deleteMovie,
} from '../../utils/mainApi';
import { console_log } from '../../utils/constats'


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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // стейт навигации
  const [isAuthorized, setAuthorized] = useState(false);
  // стейт Context
  const [currentUser, setCurrentUser] = useState({});
  // стейт блокирует кнопку в момент отправки формы
  const [isBlockedButton, setIsBlockedButton] = useState(false);
  // стейт для хранения типа ошибок
  const [sourceInfoTooltips, setSourceInfoTooltips] = useState({
    access: false,
    message: '',
    isSuccess: false,
  });
  // стейт сохранненые фильмы
  const [savedFilms, setSavedFilms] = useState([]);

  const resetSourceInfoTooltips = () => {
    setSourceInfoTooltips({
      access: false,
      message: '',
      isSuccess: false,
    });
  }

  // не помню что это =)
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
  // //////////// РАБОТА С ФИЛЬМАМИ       /////
  // //////////////////////////////////////////


  // переключатель сохранения фильмов
  const handlerSaveFilms = (movie) => {
    console.log('СРАБОТАЛ handlerSaveFilms App');
    console.log(movie);
    // debugger;
    savedMovies(movie)
      .then((data) => {
        console.log(data);
        // const savingFilms = data;
        setSavedFilms([data, ...savedFilms]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('СРАБОТАЛ finally handlerSaveFilms App');
      });
  };

  const handleDeleteSaveFilm = (movieId) => {
    console.log('СРАБОТАЛО handleDeleteSaveFilm App');
    console.log(`movieId %c${movieId}`,
      "color: yellow; font-style: italic; background-color: blue; padding: 2px;");

    deleteMovie(movieId)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(`%cfinally handleDeleteSaveFilm deleteMovie App`,
          "color: yellow; font-style: italic; background-color: blue; padding: 2px;");
      });
  };

  const getingSavedFilms = () => {
    getMovies()
      .then((data) => {
        console.log(data);
        setSavedFilms(data.movies);
      })
      .catch((err) => {
        console.error(err)
      });
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

    setIsBlockedButton(true);

    authorize(date)
      .then((res) => {
        console.log(res);
        localStorage.setItem('loginInBeatfilmTrue', true);
        setAuthorized(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err === 401) {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: 'Вы ввели неправильный логин или пароль.',
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: 'При авторизации произошла ошибка.',
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        setIsBlockedButton(false);
      })
  };


  //  Проверка токена/кукиса
  const cookieCheck = () => {
    console.log('сработал App %ccookieCheck', `${console_log.red_style}`);
    const currentPath = pathname;
    const token = localStorage.getItem('loginInBeatfilmTrue');
    console.log(token);
    if (token) {
      console.log('сработал %cПРОВЕРКА ТОКЕНА', `${console_log.red_style}`);
      setAuthorized(true);

      getingSavedFilms();

      // setIsLoggedIn(true);
      // navigate('/', { replace: true });
      navigate(currentPath, { replace: true });
    } else { setAuthorized(false) }
  }

  // удаление кукиса JWT
  const removeCookie = () => {
    console.log('сработал App removeCookie')
    logout()
      .then((res) => {
        if (res.exit) {
          console.log('user logged out');
          resetSourceInfoTooltips();
          localStorage.removeItem('loginInBeatfilmTrue');

          // удаляем все локал сториджы когда юзер выходит
          localStorage.removeItem('moviesFullList');
          localStorage.removeItem('request');
          localStorage.removeItem('checkboxMoviesStorage');

          // setIsLoggedIn(false);
          setAuthorized(false);
          // setUserEmail('');
          navigate('/signin', { replace: true });
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

  useEffect(() => {
    if (pathname === '/') {
      resetSourceInfoTooltips();
    }
  }, [pathname]);

  // обновление юзера
  const handlerUserInfo = ({ name, email }) => {
    console.log('СРАБОТАЛ updateUserInfo App');
    // console.error(data);
    // const { name, email } = data;
    const data = { name, email };
    // debugger;
    setIsBlockedButton(true);
    // resetSourceInfoTooltips();
    updateuserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setSourceInfoTooltips({
          access: true,
          isSuccess: true,
          message: 'Данные профиля успешно изменены.',
        });
        console.log(res);
      })
      .catch((err) => {
        console.error(err)
        if (err === 409) {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: 'Пользователь с таким email уже существует.',
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: 'При регистрации пользователя произошла ошибка.',
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        console.log('finally updateuserInfo App');
        setIsBlockedButton(false);
      });
  }

  // получим контекст юзер и сохраненые карточки
  useEffect(() => {
    if (isAuthorized === true) {
      console.log('СРАБОТАЛ useEffect isAuthorized')

      getUser()
        .then((data) => {
          console.error(data);
          setCurrentUser(data);
          console.log(currentUser);
        })
        .catch((err) => {
          console.log(err);
        });

      getingSavedFilms();

      // getMovies()
      //   .then((data) => {
      //     console.log(data);
      //     setSavedFilms(data.movies);
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })

    }
    console.log('currentUser — ');
    console.log(currentUser);
  }, [isAuthorized]);

  const onClickCurrentUser = () => {
    console.log(currentUser);
  };

  const getSavedFilms = () => {
    console.log(savedFilms);
  };

  return (
    <div className='app'>
      <div className='page'>
        <CurrentUserContext.Provider
          value={currentUser}>
          <div className='App__containerbtn'>

            <button
              className='App__containerbtn_btn'
              onClick={onClickCurrentUser}
            >onClick=currentUser</button>

            <button
              className='App__containerbtn_btn'
              onClick={getSavedFilms}
            >onClick=getSavedFilms</button>

            <button
              className='App__containerbtn_btn'
              onClick={() => {
                console.log(isAuthorized);
              }}
            >onClick=isAuthorized</button>

          </div>
          {/*
          <AuthorizedContext.Provider
            value={isAuthorized}> */}

          <Header
            isLoggedIn={isAuthorized}

          // onAuth={togleAuthorized}
          ></Header>

          <Routes>

            <Route
              path='/signup'
              element={
                <Register
                  onRegister={handlerRegister}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                ></Register>
              } />

            <Route
              path='/signin'
              element={
                <Login
                  onAuth={onlyLogin}
                  onLogin={handlerLogin}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                  onRemoveCookie={removeCookie}
                  onCheckCockie={cookieCheck}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                ></Login>
              } />

            <Route
              path='/'
              element={
                <Main></Main>
              } />

            {/*
            <Route
              path='/movies'
              element={
                <Movies></Movies>
              } />
            */}

            {/* <Route
              path='/profile'
              element={
                <Profile
                  onAuth={togleAuthorized}
                  onRemoveCookie={removeCookie}
                ></Profile>
              } /> */}

            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isAuthorized}
                  onAuth={togleAuthorized}
                  onRemoveCookie={removeCookie}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onUpdateUserInfo={handlerUserInfo}
                  onBlockedButton={isBlockedButton}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                >
                </ProtectedRoute>
              }
            />

            <Route path='/movies' element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isAuthorized}
                onSaveFilms={handlerSaveFilms}
              ></ProtectedRoute>
            }
            />

            {/*
            <Route
              path='/saved-movies'
              element={
                <SavedMovies></SavedMovies>
              } /> */}

            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isAuthorized}
                  savedFilms={savedFilms}
                  onDeleteSaveFilm={handleDeleteSaveFilm}
                />
              }
            />

            <Route
              path='*'
              element={
                <PageNotFound></PageNotFound>
              } />

          </Routes>

          <Footer></Footer>

          {/* </AuthorizedContext.Provider> */}
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;
