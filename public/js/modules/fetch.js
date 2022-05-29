/* eslint-disable import/prefer-default-export */
const BASE_URL = 'http://localhost:3007';

export async function getFetch(endpoint, token) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.warn('error in getFetch', error);
  }
}

export async function postFetch(endpoint, data, token) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    // const dataInJs = await resp.json();
    // console.log('dataInJs ===', dataInJs);
  } catch (error) {
    console.warn('error in postFetch', error);
  }
}
