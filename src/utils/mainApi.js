import SavedMovies from '../components/SavedMovies/SavedMovies';
import { configMainApi, configUrl } from './constats';

const {
  BASE_URL,
  headers,
  credentials,
  endpoint
} = configMainApi;

const {
  ENDPOINT_REGISTER,
  ENDPOINT_AUTH,
  ENDPOINT_CHECKJWL,
  ENDPOINT_OUT,
  ENDPOINT_MOVIES
} = endpoint;

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(res.status);
  }
};

// //////////////////////////////////////////
// //////////// РЕГИСТРАЦИЯ АВТОРИЗАЦИЯ /////
// //////////////////////////////////////////

export const register = ({ email, password, name }) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_REGISTER}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({ email, password, name })
    })
    .then((res) => {
      return checkError(res);
    })
};

export const authorize = ({ email, password }) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_AUTH}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({ email, password })
    })
    .then((res) => {
      return checkError(res);
    })
};

export const logout = () => {
  return fetch(
    `${BASE_URL}${ENDPOINT_OUT}`,
    {
      method: 'GET',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
}


// //////////////////////////////////////////
// ////////////     УПРАВЛЕНИЕ АПИ  /////////
// //////////////////////////////////////////


export const getUser = () => {
  return fetch(
    `${BASE_URL}${ENDPOINT_CHECKJWL}`,
    {
      method: 'GET',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
};

export const updateuserInfo = ({ name, email }) => {
  console.log('СРАБОТАЛ FETCH updateuserInfo mainAPI')
  return fetch(
    `${BASE_URL}${ENDPOINT_CHECKJWL}`,
    {
      method: 'PATCH',
      headers,
      credentials,
      body: JSON.stringify({ name, email })
    }
  )
    .then((res) => {
      return checkError(res);
    })
}



// //////////////////////////////////////////
// /////   МАССИВ СОХРАНЕННЫЕ ФИЛЬМЫ  ///////
// //////////////////////////////////////////

/**
 *   {
    "country": "info1",
    "director": "info2",
    "duration": "36000",
    "year": "info4",
    "description": "info5",
    "image": "https://www.kinopoisk.ru/image",
    "trailerLink": "https://www.kinopoisk.ru/trailerLink",
    "nameRU": "info8",
    "nameEN": "info9",
    "thumbnail": "https://www.kinopoisk.ru/trailer",
    "movieId": "23"
  }
 */

export const savedMovies = (movie) => {
  console.log('СРАБОТАЛ FETCH savedMovies mainAPI');
  return fetch(
    `${BASE_URL}${ENDPOINT_MOVIES}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${configUrl.IMAGE_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${configUrl.IMAGE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
    }
  )
    .then((res) => {
      return checkError(res);
    })
};


export const getMovies = () => {
  console.log('СРАБОТАЛ FETCH getMovies mainAPI');
  return fetch(
    `${BASE_URL}${ENDPOINT_MOVIES}`,
    {
      method: 'GET',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
}

export const deleteMovie = (movieId) => {
  console.log('СРАБОТАЛ FETCH deleteMovie mainAPI');
  console.error(`${BASE_URL}${ENDPOINT_MOVIES}/${movieId}`);
  return fetch(
    `${BASE_URL}${ENDPOINT_MOVIES}/${movieId}`,
    {
      method: 'DELETE',
      headers,
      credentials
    }
  )
    .then((res) => {
      return checkError(res);
    })
}
