import React, { useEffect, useState } from 'react';

const useFiltredFilms = () => {
  // console.error('тело');
  // console.log(movies);
  const [filtredArray, setFiltredArray] = useState([]);
  // const foundFilms = movies;
  const foundFilms = (movies, request) => {

    console.error(`сработал в foundFilms ${request}`);

    const newArr = [...movies].filter((movie) => {
      const filterToName =
        movie.nameEN.toLowerCase().includes(request.toLowerCase().trim()) ||
        movie.nameRU.toLowerCase().includes(request.toLowerCase().trim());
      return filterToName;
    });
    setFiltredArray(newArr);
    console.error('туть');
    console.log(filtredArray);
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
  return { foundFilms };
}

export default useFiltredFilms;
