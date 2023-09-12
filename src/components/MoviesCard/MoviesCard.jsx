import React from 'react';
import './MoviesCard.css'; import { useLocation } from 'react-router-dom'
import { configUrl } from '../../utils/constats';


const MoviesCard = ({
  movie
}) => {

  const { pathname } = useLocation();

  // function msToTime(duration) {
  //   var milliseconds = Math.floor((duration % 1000) / 100),
  //     seconds = Math.floor((duration / 1000) % 60),
  //     minutes = Math.floor((duration / (1000 * 60)) % 60),
  //     hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  //   // hours = (hours < 10) ? "0" + hours : hours;
  //   minutes = (minutes < 10) ? "0" + minutes : minutes;
  //   // seconds = (seconds < 10) ? "0" + seconds : seconds;

  //   return hours + "ч" + minutes + 'м';
  // }

  function msToTime(duration) {
    // var milliseconds = Math.floor((duration % 1000) / 100),
    // let seconds = Math.floor((duration / 60) % 60),
    // minutes = Math.floor((duration / (1000 * 60)) % 60),
    // hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let minutes = duration % 60,
      hours = Math.floor(duration / 60);
    // hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    // seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "ч" + minutes + 'м';
  }



  return (
    <li className='movie-card'>
      <img src={`${configUrl.IMAGE_URL}${movie.image.url}`}
        alt={movie.description}
        className='movie-card__image' />
      <div className="movie-card__wrapper">
        <div className="movie-card__info">
          <h2 className='movie-card__title'>
            {movie.nameRU}
          </h2>
          <p className="movie-card__duration">{msToTime(movie.duration)}</p>
        </div>

        {pathname === '/movies'
          ? <button className={`movie-card__btn ${movie.status === true ? 'movie-card__btn_saved' : ''} links-hover`}></button>
          : <button className={`movie-card__btn movie-card__btn_delete-saved links-hover`}></button>}

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
