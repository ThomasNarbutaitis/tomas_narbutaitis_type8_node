import { getFetch, postFetch } from './modules/fetch.js';

const groupId = window.location.href.split('?')[1];

const nameEl = document.querySelector('.group-name');
const tableEl = document.querySelector('table');
const formEl = document.querySelector('#add-bill');
const token = localStorage.getItem('userToken');

function renderBills(array, dest) {
  dest.innerHTML = '';
  array.forEach((gObj) => {
    const rowEl = document.createElement('tr');
    rowEl.innerHTML = `<td>${gObj.id}</td>
    <td>${gObj.description}</td>
    <td>&euro;${gObj.amount}</td>`;
    dest.append(rowEl);
  });
}

async function getBills(userToken) {
  const groupArr = await getFetch('accounts', userToken);
  const groupName = groupArr[groupId - 1].name;
  nameEl.textContent = groupName;
  const billsArr = await getFetch(`bills/${groupId}`, userToken);
  renderBills(billsArr, tableEl);
}

if (!token) {
  window.location.replace('login.html');
}

getBills(token);

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newBillObj = {
    group_id: groupId,
    amount: formEl.elements.amount.value,
    description: formEl.elements.descr.value,
  };
  // console.log('newBillObj ===', newBillObj);
  postFetch('bills', newBillObj, token);
  getBills(token);
});
