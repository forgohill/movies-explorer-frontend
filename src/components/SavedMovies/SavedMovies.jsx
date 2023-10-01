import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useFiltredFilms from '../../hooks/useFiltredFilms';
import Preloader from '../Preloader/Preloader';

// import { useState } from 'react';
// import { useEffect } from 'react';

const SavedMovies = ({
  savedFilms,
  onDeleteSaveFilm,
  // onCheckSavedFilms,
  onBlockedButton,
}) => {

  // стейт прилоадера
  const [isLoading, setIsLoading] = useState(false);

  const [listMovies, setListMovies] = useState([]);

  // стейт хранения запроса
  const [isRequestBlock, setIsRequestBlock] = useState('');
  // стейт хранения найденых фильмов
  const [isFindMoviesList, setIsFindMoviesList] = useState([]);
  // стейт состояния чебокса
  const [isCheckedShortFilms, setIsCheckedShortFilms] = useState(false);

  const { foundFilms } = useFiltredFilms();


  // управляем чекбоксом
  const handleChangeCheckbox = () => {
    if (savedFilms) {
      console.log('СРАБОТАЛ handleChangeCheckbox SAVED_MUVIES');
      setIsCheckedShortFilms(!isCheckedShortFilms);
      if (listMovies !== 0) {
        setListMovies(
          foundFilms(savedFilms, isRequestBlock, !isCheckedShortFilms)
        );
      } else {

      }
    }
  };

  const handleSubmit = (request) => {
    console.log('СРАБОТАЛ handleSubmit SAVED_MOVIES');
    filtredFilms(request);
  };

  // const handleDeleteSaveFilm = () => {
  //   console.log('СРАБОТАЛ handleDeleteSaveFilm %cSAVED_MOVIES', "color: yellow; font-style: italic; background-color: blue; padding: 2px;");
  // }

  // фильрация сохраненых фильмов
  const filtredFilms = (request) => {
    console.log('СРАБОТАЛ filtredFilms SAVED_MOVIES');
    console.log(`запрос поиска SAVED_MOVIES %c${request}`,
      "color: yellow; font-style: italic; background-color: blue; padding: 2px;");
    setIsRequestBlock(request);
    setListMovies(
      foundFilms(savedFilms, request, isCheckedShortFilms)
    );
  };

  // console.log(setListMovies({ savedFilms }));
  useEffect(() => {
    console.log('СРАБОТАЛ useEffect SAVED_MOVIES');
    console.log(savedFilms);
    if (savedFilms) {
      setListMovies(savedFilms);
    }
  }, [savedFilms]);

  return (
    <div className='movies'>

      <div className='search__wrapper-btn'>
        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(listMovies);
            }}
          ></button>проверка listMovies</p>
      </div>

      <SearchForm
        onChange={handleChangeCheckbox}
        onSubmit={handleSubmit}
        isChecked={isCheckedShortFilms}
      // onChange={handleChangeCheckbox}
      ></SearchForm>
      {
        isLoading
          ? <Preloader />
          : <MoviesCardList
            listMovies={listMovies}
            onDeleteSaveFilm={onDeleteSaveFilm}
            isRequestBlock={isRequestBlock}
            onBlockedButton={onBlockedButton}
          // onCheckSavedFilms={onCheckSavedFilms}

          ></MoviesCardList>
      }

    </div>
  );
}

export default SavedMovies;
