import { configMainApi } from './constats';

const {
  BASE_URL,
  headers,
  credentials,
  endpoint } = configMainApi;
const {
  ENDPOINT_REGISTER,
  ENDPOINT_AUTH,
  ENDPOINT_CHECKJWL,
  ENDPOINT_OUT } = endpoint;

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(res.status);
  }
}


export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}${ENDPOINT_REGISTER}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({ email, password, name })
    })
    .then((res) => {
      return checkError(res);
    })
}
