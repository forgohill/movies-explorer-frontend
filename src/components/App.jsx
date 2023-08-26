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

import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthorizedContext } from '../contexts/AuthorizedContext';

import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Footer from './Footer/Footer';
import PageNotFound from './PageNotFound/PageNotFound';

function App() {

  const { pathname } = useLocation();

  const [isAuthorized, setAuthorized] = useState(false);



  const togleAuthorized = () => {
    // console.log(isAuthorized);
    console.log('togleAuthorized');
    if (isAuthorized === true) {
      return setAuthorized(false)
    }
    return setAuthorized(true);
  };

  return (
    // <div className={`app ${pathname === '/movies' ? 'app_movies' : ''}`}>
    <div className='app'>
      {/* <div className='page'> */}
      <div className={`page ${pathname === '/movies' ? 'app_movies' : ''}`}>
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
                <Register></Register>
              } />

            <Route
              path='/signin'
              element={
                <Login
                  onAuth={togleAuthorized}
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
