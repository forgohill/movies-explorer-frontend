import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
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

import { MESSAGE, ENDPOINTS, CODE_ERROR } from '../../utils/constats';

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

  // сброс сообщения ошибки
  const resetSourceInfoTooltips = () => {
    setSourceInfoTooltips({
      access: false,
      message: '',
      isSuccess: false,
    });
  }

  // //////////////////////////////////////////
  // //////////// РАБОТА С ФИЛЬМАМИ       /////
  // //////////////////////////////////////////

  // сохранение фильма
  const handlerSaveFilms = (movie) => {
    setIsBlockedButton(true);
    savedMovies(movie)
      .then((data) => {
        setSavedFilms([data, ...savedFilms]);
      })
      .catch((err) => {
        console.error(err);
        setIsBlockedButton(false);
      })
      .finally(() => {
        setIsBlockedButton(false);
      });
  };

  // удаление фильма
  const handleDeleteSaveFilm = (movieId) => {
    setIsBlockedButton(true);
    deleteMovie(movieId)
      .then((res) => {
        setSavedFilms(
          savedFilms.filter((movie) => {
            return movie._id !== movieId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setIsBlockedButton(false);
      })
      .finally(() => {
        setIsBlockedButton(false);
      });
  };

  // получить массив фильмов
  const getingSavedFilms = () => {
    getMovies()
      .then((data) => {
        setSavedFilms(data.movies);
      })
      .catch((err) => {
        console.error(err)
      });
  };

  // //////////////////////////////////////////
  // //////////// РЕГИСТРАЦИЯ АВТОРИЗАЦИЯ /////
  // //////////////////////////////////////////

  // регистрация
  const handlerRegister = ({ email, password, name }) => {
    setIsBlockedButton(true);
    register({ email, password, name })
      .then((res) => {
        handlerLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err === CODE_ERROR.ERROR_409) {
          setSourceInfoTooltips({
            access: true,
            message: MESSAGE.USER_EXIST,
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            message: MESSAGE.REGISTER_USER_ERROR,
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
    setIsBlockedButton(true);
    authorize(date)
      .then((res) => {
        setAuthorized(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        if (err === CODE_ERROR.ERROR_401) {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.LOGIN_PASSWORD_INCORRECT,
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.AUTHORIZATION_ERROR,
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        setIsBlockedButton(false);
        resetSourceInfoTooltips();
      })
  };

  // удаление кукиса JWT
  const removeCookie = () => {
    logout()
      .then((res) => {
        resetSourceInfoTooltips();
        // удаляем все локал сториджы когда юзер выходит
        localStorage.removeItem('moviesFullList');
        localStorage.removeItem('request');
        localStorage.removeItem('checkboxMoviesStorage');
        setAuthorized(false);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // обновление юзера
  const handlerUserInfo = ({ name, email }) => {
    const data = { name, email };
    setIsBlockedButton(true);
    updateuserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setSourceInfoTooltips({
          access: true,
          isSuccess: true,
          message: MESSAGE.USER_DATE_MODIFIED,
        });
        console.log(res);
      })
      .catch((err) => {
        if (err === CODE_ERROR.ERROR_409) {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.USER_EXIST,
          });
          setIsBlockedButton(false);
        } else {
          setSourceInfoTooltips({
            access: true,
            isSuccess: false,
            message: MESSAGE.REGISTER_USER_ERROR,
          });
          setIsBlockedButton(false);
        }
      })
      .finally(() => {
        setIsBlockedButton(false);
      });
  }

  // //////////////////////////////////////////
  // //////////// useEffect БЛОК         /////
  // //////////////////////////////////////////

  // получим контекст юзер
  useEffect(() => {
    const currentPath = pathname;
    getUser()
      .then((user) => {
        setCurrentUser(user);
        setAuthorized(true);
        navigate(currentPath, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAuthorized]);

  // получим сайвфилмы
  useEffect(() => {
    if (isAuthorized) {
      getingSavedFilms();
    }
  }, [isAuthorized]);

  // сброс информационных полей
  useEffect(() => {
    if (pathname === '/') {
      resetSourceInfoTooltips();
    }
  }, [pathname]);

  return (
    <div className='app'>
      <div className='page'>
        <CurrentUserContext.Provider
          value={currentUser}>
          <Header
            isLoggedIn={isAuthorized}
          ></Header>
          <Routes>
            <Route
              path={ENDPOINTS.ENDPOINT_REGISTER}
              element={isAuthorized
                ? <Navigate to={ENDPOINTS.ENDPOINT_MOVIES} replace />
                : (<Register
                  onRegister={handlerRegister}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                ></Register>)
              } />
            <Route
              path={ENDPOINTS.ENDPOINT_AUTH}
              element={isAuthorized
                ? <Navigate to={ENDPOINTS.ENDPOINT_MOVIES} replace />
                : (<Login
                  onLogin={handlerLogin}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                  onRemoveCookie={removeCookie}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                ></Login>)
              } />
            <Route
              path='/'
              element={
                <Main></Main>
              } />
            <Route
              path={ENDPOINTS.ENDPOINT_PROFILE}
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isAuthorized}
                  onRemoveCookie={removeCookie}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onUpdateUserInfo={handlerUserInfo}
                  onBlockedButton={isBlockedButton}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                >
                </ProtectedRoute>
              }
            />
            <Route path={ENDPOINTS.ENDPOINT_MOVIES} element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isAuthorized}
                onSaveFilms={handlerSaveFilms}
                savedFilms={savedFilms}
                onDeleteSaveFilm={handleDeleteSaveFilm}
                onBlockedButton={isBlockedButton}
              ></ProtectedRoute>
            }
            />
            <Route
              path={ENDPOINTS.ENDPOINT_SAVED_MOVIES}
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
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;
