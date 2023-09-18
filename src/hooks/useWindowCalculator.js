import { useEffect, useState } from 'react';
import { useActionData } from 'react-router-dom';
/**
 * Обратите внимание, что количество карточек,
 * которые отображаются на странице, зависит от
 * ширины экрана устройства.
 *
 * Ширина 1280px — 4 ряда карточек.
 * Кнопка «Ещё» загружает дополнительный ряд карточек.
 *
 * Ширина 768px — 4 ряда карточек.
 * Кнопка «Ещё» загружает дополнительный ряд карточек.
 *
 * Ширина от 320px до 480px — 5 карточек по 1 в ряд.
 * Кнопка «Ещё» загружает по 2 карточки.
 */
const useWindowCalculator = () => {

  const [moviesDisplay, setMoviesDisplay] = useState(0);
  const [moviesAddDisplay, setMoviesAddDisplay] = useState(0);
  const [relationWidht, setRelationWidht] = useState(undefined);

  const handleResize = () => {
    setRelationWidht(window.innerWidth);
    // console.log(relationWidht);
  };

  // handleResize();

  const resizeDelay = () => {
    let time;
    if (!time) {
      time = setTimeout(() => {
        time = null;
        handleResize();
      }, 1);
    };
  }

  // resizeDelay();

  const widthWindow = window.screen.width;

  // console.log(`widthWindow : ${widthWindow}`);
  // console.log(relationWidht);

  useEffect(() => {
    // console.log(widthWindow);
    // console.log(`relationWidht: ${relationWidht}`)
    // console.log(handleResize);

    if (relationWidht >= 1200) {
      setMoviesDisplay(16);
      setMoviesAddDisplay(4);
    }
    else if (relationWidht >= 960) {
      setMoviesDisplay(12);
      setMoviesAddDisplay(3);
    }
    else if (relationWidht >= 742) {
      setMoviesDisplay(8);
      setMoviesAddDisplay(2);
    }
    else if (relationWidht >= 0) {
      setMoviesDisplay(5);
      setMoviesAddDisplay(2);
    }
    // else if (condition) {

    // }
    // else if (condition) {

    // }

  }, [widthWindow, relationWidht]);

  // useEffect(() => {
  // console.log(relationWidht);
  // resizeDelay();
  // }, []);

  const addCards = () => {
    setMoviesDisplay(moviesDisplay + moviesAddDisplay);
  };

  return { addCards, moviesDisplay, resizeDelay, handleResize }
};
export default useWindowCalculator;
