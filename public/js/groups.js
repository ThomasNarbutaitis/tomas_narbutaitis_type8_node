import { getFetch } from './modules/fetch.js';

const cardsEl = document.querySelector('.cards');

const token = localStorage.getItem('userToken');

function renderGroups(array, dest) {
  dest.innerHTML = '';
  array.forEach((gObj) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `<h4>ID: ${gObj.id}</h4><p> ${gObj.name}</p>`;
    cardEl.addEventListener('click', () => {
      console.log(gObj.id);
      window.location.href = `bills.html?${gObj.id}`;
    });
    dest.append(cardEl);
  });
}

async function getGroups(userToken) {
  const groupsArr = await getFetch('accounts', userToken);
  // console.log('groupsArr ===', groupsArr);
  renderGroups(groupsArr, cardsEl);
}

if (!token) {
  window.location.replace('login.html');
}

getGroups(token);
