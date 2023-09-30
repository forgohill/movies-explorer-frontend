export const configApiBeatfilm = {
  BASE_URL: 'https://api.nomoreparties.co/beatfilm-movies/',
  headers: { "Content-Type": "application/json" },
};
export const REGEX_EMAIL = '^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$';

export const REGEX_NAME = '[A-Za-zА-Яа-яЁё\\s\\-]+';


export const configMainApi = {
  BASE_URL: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json',
  },
  credentials: 'include',
  endpoint: {
    ENDPOINT_REGISTER: '/signup',
    ENDPOINT_AUTH: '/signin',
    ENDPOINT_OUT: '/signout',
    ENDPOINT_CHECKJWL: '/users/me',
    ENDPOINT_MOVIES: '/movies',
  }
};


export const
  MESSAGE = {
    SEARCH_PLACEHOLDER_INPUT: 'Фильм',
    EMPTY_PLACEHOLDER_INPUT: 'Нужно ввести ключевое слово',
  };

export const configUrl = {
  IMAGE_URL: 'https://api.nomoreparties.co/'
}


export const console_log = {
  red_style: 'color: yellow; font- style: italic; background-color: #red; padding: 4px;'
}
