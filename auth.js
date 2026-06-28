export function validateLogin(username, password) {
    const errors = {
        username: username.trim().length === 0,
        password: password.trim().length === 0,
    };

    const isValid = !errors.username && !errors.password;

    return { isValid, errors };
}

export function decodeHtmlEntities(text) {
    if (typeof text !== 'string' || text.length === 0) {
        return 'Hello';
    }
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}