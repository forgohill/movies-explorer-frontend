import React from 'react';
import './MoviesCard.css'; import { useLocation } from 'react-router-dom'
import { configUrl } from '../../utils/constats';


const MoviesCard = ({
  movie,
  onSaveFilms,
  isSavedMovies,
  onDeleteSaveFilm,
  checkSaved,
  onBlockedButton
}) => {

  const { pathname } = useLocation();


  function msToTime(duration) {

    let minutes = duration % 60, hours = Math.floor(duration / 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return hours + "ч" + minutes + 'м';
  }

  const handleClickSave = (e) => {
    e.preventDefault();
    onSaveFilms(movie);
  };

  const handleClickDeleteSaveFilm = () => {
    // console.error(movie._id);
    onDeleteSaveFilm(movie._id);
  }

  return (
    <li className='movie-card'>
      <img src={isSavedMovies ? movie.image : `${configUrl.IMAGE_URL}${movie.image.url}`}

        // <img src={`${configUrl.IMAGE_URL}${movie.image.url}`}
        alt={movie.description}
        className='movie-card__image'
        onClick={() => {
          console.log(movie);
        }}
      />
      <div className="movie-card__wrapper">
        <div className="movie-card__info">
          <h2 className='movie-card__title'>
            {movie.nameRU}
          </h2>
          <p className="movie-card__duration">{msToTime(movie.duration)}</p>
        </div>
        {/* {checkSaved ? <p>ДА</p> : <p>НЕТ</p>} */}
        {pathname === '/movies'
          ? <button
            className={`movie-card__btn ${checkSaved
              ? 'movie-card__btn_saved'
              : ''} links-hover`}
            onClick={handleClickSave}
            disabled={onBlockedButton}
          ></button>
          : <button
            className={`movie-card__btn
          movie-card__btn_delete-saved
          links-hover`}
            onClick={handleClickDeleteSaveFilm}
            disabled={onBlockedButton}
          ></button>}

        {/* <div>
          <button className='movie-card__btn movie-card__btn_delete-saved links-hover'
            onClick={() => {
              console.log(movie.image.previewUrl);
            }}>
          </button>
        </div> */}

      </div>

    </li>
  );
}

export default MoviesCard;
