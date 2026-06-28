import { validateLogin } from './auth.js';
import { getLocation, getGreeting } from './api.js';

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


// Temp
getLocation().then((data) => {
    console.log('Location data:', data);
    return getGreeting(data.countryCode, data.query);
}).then((greeting) => {
    console.log('Greeting data:', greeting);
}).catch((error) => {
    console.error('Error:', error);
});