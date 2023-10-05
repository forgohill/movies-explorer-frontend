
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
        if (err === 401) {
          removeCookie();
        }
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
        if (err === 401) {
          removeCookie();
        }
        setIsBlockedButton(false);
      })
      .finally(() => {
        setIsBlockedButton(false);
      });
  };

  // получить массив фильмов
  const getingSavedFilms = () => {
    console.log('getingSavedFilms ПРОИЗОШЕЛ');
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
    setIsBlockedButton(true);
    authorize(date)
      .then((res) => {
        setAuthorized(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
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

  // удаление кукиса JWT
  const removeCookie = () => {
    logout()
      .then((res) => {
        console.log(res.exit);
        console.log('я туть');
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

  useEffect(() => {
    if (pathname === '/') {
      resetSourceInfoTooltips();
    }
  }, [pathname]);

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
          message: 'Данные профиля успешно изменены.',
        });
        console.log(res);
      })
      .catch((err) => {
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
        setIsBlockedButton(false);
      });
  }

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
              path='/signup'
              element={isAuthorized
                ? <Navigate to='/movies' replace />
                : (<Register
                  onRegister={handlerRegister}
                  sourceInfoTooltips={sourceInfoTooltips}
                  onBlockedButton={isBlockedButton}
                  onResetSourceInfoTooltips={resetSourceInfoTooltips}
                ></Register>)
              } />
            <Route
              path='/signin'
              element={isAuthorized
                ? <Navigate to='/movies' replace />
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
              path='/profile'
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
            <Route path='/movies' element={
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
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;
