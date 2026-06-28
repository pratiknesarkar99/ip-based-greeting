import { validateLogin, decodeHtmlEntities } from './auth.js';
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

    getLocation().then((locationData) => {
        return getGreeting(locationData.countryCode, locationData.query);
    }).then((greetingData) => {
        const decodedGreeting = decodeHtmlEntities(greetingData.hello);
        message.textContent = `${decodedGreeting} ${username}, you have successfully logged in!`;
    }).catch((error) => {
        console.error(error);
        message.textContent = 'Could not determine greeting. Please try again.';
    });
});