# Hello — Localized Greeting App

A geolocation-based greeting app. The app detects a visitor's approximate location via IP, looks up a culturally appropriate greeting in their native language, and displays it alongside a mock login/logout flow and extended location details.

<img width="786" height="694" alt="Screenshot 2026-06-29 at 9 07 36 PM" src="https://github.com/user-attachments/assets/13bf61ac-da71-47ed-9863-f84a775e5739" />

## Features

- Mock login with username/password validation (empty-field detection, red border + error feedback)
- Password field masking via native `type="password"`
- IP-based geolocation lookup
- Native-language greeting lookup, with HTML entity decoding (e.g. `&eacute;` → `é`)
- Manual language code override field (bypasses IP-based detection for testing)
- Extended location display after login: city, region, country, zip, latitude/longitude, IP address, and possible timezones for the detected region
- View-based login/logout flow: the login form and the logged-in view are mutually exclusive, not just button visibility toggles
- Logout clears the form and shows a farewell message

## Tech Stack

Vanilla JavaScript (ES Modules). No framework. Chosen deliberately: this app is a handful of fetch calls, form validation, and DOM updates, a single view with no shared state across routes. A framework (React, Angular) would add boilerplate without solving a complexity problem this app doesn't have.

## Architecture

```
index.html   – structure only
style.css    – all styling
main.js      – DOM wiring, event listeners, view orchestration
auth.js      – pure validation + string logic, no DOM dependency except decodeHtmlEntities
api.js       – pure fetch functions, no DOM access at all
```

**Separation of concerns:** `auth.js` and `api.js` contain no direct references to `document` for their core logic (decode helper is the one exception, explained below), so they're testable independently of the DOM and reusable if the UI changes.

### Why two separate API calls

- **Location lookup:** [freeipapi.com](https://freeipapi.com) — returns IP, coordinates, city, region, country, and timezone candidates for the detected IP.
- **Greeting lookup:** [HelloSalut](https://stefanbohacek.com/project/hellosalut-api/) — takes a language code and IP, returns a greeting string in that language, with HTML entities for accented characters.

These are kept as two distinct functions in `api.js` rather than one combined call, because they're two unrelated services with no shared contract; combining them would couple unrelated failure modes together.

## Setup

This project uses ES Modules, which browsers will not load over `file://`. You must serve it via HTTP:

```bash
npx serve .
```

Then open the printed `localhost` URL in your browser.

## Known Limitations

- **Timezone data is regional, not personal.** The location API returns every timezone in the visitor's country (e.g. the US lookup returns 29 timezones, from `America/Adak` to `Pacific/Honolulu`), not the visitor's specific timezone. The UI labels this honestly as "Possible Timezones" rather than implying precision the data doesn't have.
- **No real authentication.** Login is a mock flow with no backend, no password storage, and no session persistence. By design, per the original project spec.
- **No automated tests.** Manual testing only, console-verified for edge cases (see below).
- **Geolocation accuracy is IP-based**, which is approximate by nature (typically city/region level, not exact address).
