export const configApiBeatfilm = {
  BASE_URL: 'https://api.nomoreparties.co/beatfilm-movies/',
  headers: { "Content-Type": "application/json" },
};

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

