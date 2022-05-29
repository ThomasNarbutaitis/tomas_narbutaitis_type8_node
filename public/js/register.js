const BASE_URL = 'http://localhost:3007';

const formEl = document.getElementById('register');
const errroEl = document.getElementById('err');
const clearEl = document.querySelector('.to-clear');

function handleError(msg) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      errroEl.innerHTML += `${eObj.message}<br>`;
    });
  }
}

function regSuccess() {
  clearEl.innerHTML = '<p>Already have an account? <a href="./login.html">Login</a></p>';
}

async function registerFetch(full_name, email, password) {
  const registerObj = { full_name, email, password };
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    handleError('Registered successfully!');
    regSuccess();
  } else {
    handleError(await resp.json());
  }
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formEl.elements.full_name.value.trim() === '') {
    formEl.elements.full_name.className = 'error-field';
  }
  if (formEl.elements.email.value.trim() === '') {
    formEl.elements.email.className = 'error-field';
  }
  if (formEl.elements.password.value.trim() === '') {
    formEl.elements.password.className = 'error-field';
  }
  if (formEl.elements.rep_password.value.trim() === '') {
    formEl.elements.rep_password.className = 'error-field';
  }
  const formData = {
    full_name: formEl.elements.full_name.value,
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
    repeatPassword: formEl.elements.rep_password.value,
  };
  console.log('formData ===', formData);
  if (formData.password !== formData.repeatPassword) {
    handleError('Passwords do not match');
    return;
  }

  registerFetch(formData.full_name, formData.email, formData.password);
});
