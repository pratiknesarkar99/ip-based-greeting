import { validateLogin, decodeHtmlEntities } from './auth.js';
import { getLocation, getGreeting } from './api.js';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const message = document.getElementById('message');

const loginView = document.getElementById('login-view');
const loggedInView = document.getElementById('logged-in-view');
const welcomeMessage = document.getElementById('welcome-message');

const langOverrideInput = document.getElementById('lang-override');

let isLoggedIn = false;
let savedLocationData;

function showLoggedInView(username) {
    isLoggedIn = true;
    loginView.classList.add('hidden');
    loggedInView.classList.remove('hidden');
    welcomeMessage.textContent = `Welcome, ${username}!`;
}

function showLoginView() {
    isLoggedIn = false;
    loggedInView.classList.add('hidden');
    loginView.classList.remove('hidden');
}

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
        savedLocationData = locationData;
        const langCode = langOverrideInput.value.trim() || locationData.countryCode;
        return getGreeting(langCode, locationData.ipAddress);
    }).then((greetingData) => {
        const decodedGreeting = decodeHtmlEntities(greetingData.hello);
        message.textContent = `${decodedGreeting} ${username}, you have successfully logged in!`;
        showLoggedInView(username);
        showLocationDetails(savedLocationData);
    }).catch((error) => {
        console.error(error);
        message.textContent = 'Could not determine greeting. Please try again.';
    });
});

logoutBtn.addEventListener('click', () => {
    const username = usernameInput.value;

    usernameInput.value = '';
    passwordInput.value = '';
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');

    if (username.trim().length === 0) {
        message.textContent = 'Have a great day!';
    } else {
        message.textContent = `Have a great day ${username}!`;
    }

    showLoginView();
});

function showLocationDetails(locationData) {
    const details = document.getElementById('location-details');
    details.innerHTML = `
    <p>City: ${locationData.cityName}</p>
    <p>Region: ${locationData.regionName}</p>
    <p>Country: ${locationData.countryName}</p>
    <p>Zip Code: ${locationData.zipCode}</p>
    <p>Latitude: ${locationData.latitude}</p>
    <p>Longitude: ${locationData.longitude}</p>
    <p>IP Address: ${locationData.ipAddress}</p>
    <p>Possible Timezones: ${locationData.timeZones.join(', ')}</p>
  `;
}