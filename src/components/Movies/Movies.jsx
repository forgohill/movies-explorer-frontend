import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

import { getFilms, } from '../../utils/MoviesApi';


const Movies = () => {

  const handleSubmit = (e) => {
    e.preventDefault()

    getFilms()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      })


    console.log('handleSubmit');
  }


  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
      ></SearchForm>
      <MoviesCardList></MoviesCardList>
    </main>
  );
}

export default Movies;
