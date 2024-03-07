import { BASE_URL, PASSWORD } from '../variables/variables';
import md5 from 'md5';

const getCards = (action, params) => {
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'X-Auth': md5(`${PASSWORD}_${currentDate}`),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: action,
      params: params
    })
  }).then(response => checkResponseStatus(response));
};

const checkResponseStatus = res => {
  if (!res.ok) {
    switch (res.status) {
      case 401:
        console.log(`Ошибка: ${res.status}. Аутентификацмя не пройдена`);
        break;
      case 400:
        console.log(`Ошибка: ${res.status}. В запросе содержаться ошибки`);
        break;
      default:
        console.log(`Ошибка: ${res.status}.`);
    }
    return Promise.reject(res);
  }
  return res.json();
};

export const api = { getCards };
