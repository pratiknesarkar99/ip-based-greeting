import { validateLogin } from './auth.js';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const message = document.getElementById('message');

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const { isValid, errors } = validateLogin(username, password);

    usernameInput.classList.toggle('error', errors.username);
    passwordInput.classList.toggle('error', errors.password);

    if (!isValid) {
        message.textContent = 'Please fill in both fields.';
        return;
    }

    message.textContent = ''; // temporary, replaced in Phase 3/4
});