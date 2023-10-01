import React, { useEffect, useState } from 'react';

const useCheckSavedFilm = () => {

  const checkSaved = (movies, movie) => {

    console.log(`хукЧекСейведФильм %ccheckSaved`,
      "color: yellow; font-style: italic;");

    return movies.find((item) => {
      return item.movieId === movie.id;
    });
  };

  return { checkSaved };
};



export default useCheckSavedFilm;
