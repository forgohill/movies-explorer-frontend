import React, { useEffect, useState } from 'react';

const useFiltredFilms = () => {

  // проверка дрейшн
  const checkedFilms = (movie) => {
    const { duration } = movie;
    if (duration <= 40) {
      return true;
    }
    return false;
  };

  const [filtredArray, setFiltredArray] = useState([]);
  // const foundFilms = movies;
  const foundFilms = (movies, request, state) => {
    console.error(`внутри хукФильтрФильмов
    массив — ${movies.length}
    запрос — ${request}
    чекбокс — ${state}`);
    console.log(movies);

    // console.error(state);
    // console.error(`сработал в foundFilms ${request}`);
    const newArr = [...movies].filter((movie) => {
      const filterToName =
        movie.nameEN.toLowerCase().includes(request.toLowerCase().trim()) ||
        movie.nameRU.toLowerCase().includes(request.toLowerCase().trim());

      if (filterToName && state) {
        // debugger;
        console.log('____я в проверке чекбока-foundFilms');
        return checkedFilms(movie);
      }

      return filterToName;
    });


    // setFiltredArray(newArr);
    // console.error('туть');
    // console.log(filtredArray);
    return newArr;
  };
  // useEffect(() => {
  //   const newArr = [...movies].filter((movie) => {
  //     const filterToName =
  //       // movie;
  //       movie.nameEN.toLowerCase().includes(request.toLowerCase().trim()) ||
  //       movie.nameRU.toLowerCase().includes(request.toLowerCase().trim());
  //     console.log(filterToName);
  //     return filterToName;
  //   });

  //   setFoundFilms(newArr);
  // }, [movies]);

  // console.error(request);
  // console.log(foundFilms);
  return { foundFilms, checkedFilms };
}

export default useFiltredFilms;
