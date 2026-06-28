import { validateLogin, decodeHtmlEntities } from './auth.js';
import { getLocation, getGreeting } from './api.js';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const langOverrideInput = document.getElementById('lang-override');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const loginView = document.getElementById('login-view');
const loggedInView = document.getElementById('logged-in-view');
const welcomeMessage = document.getElementById('welcome-message');

let isLoggedIn = false;

function showLoggedInView(greetingHtml) {
    isLoggedIn = true;
    loginView.classList.add('hidden');
    loggedInView.classList.remove('hidden');
    welcomeMessage.innerHTML = greetingHtml;
}

function showLoginView() {
    isLoggedIn = false;
    loggedInView.classList.add('hidden');
    loginView.classList.remove('hidden');
}

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

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const { isValid, errors } = validateLogin(username, password);

    usernameInput.classList.toggle('error', errors.username);
    passwordInput.classList.toggle('error', errors.password);

    if (!isValid) {
        alert('Please fill in both username and password fields.');
        return;
    }

    let savedLocationData;

    getLocation().then((locationData) => {
        savedLocationData = locationData;
        const langCode = langOverrideInput.value.trim() || locationData.countryCode;
        return getGreeting(langCode, locationData.ipAddress);
    }).then((greetingData) => {
        const decodedGreeting = decodeHtmlEntities(greetingData.hello);
        const greetingHtml = `${decodedGreeting} ${username}, you have successfully logged in!`;
        showLoggedInView(greetingHtml);
        showLocationDetails(savedLocationData);
    }).catch((error) => {
        console.error(error);
        alert('Could not determine greeting. Please try again.');
    });
});

logoutBtn.addEventListener('click', () => {
    const username = usernameInput.value;

    usernameInput.value = '';
    passwordInput.value = '';
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');

    alert('You have been logged out.');
    showLoginView();
});