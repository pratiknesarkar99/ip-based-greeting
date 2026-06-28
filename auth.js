export function validateLogin(username, password) {
    const errors = {
        username: username.trim().length === 0,
        password: password.trim().length === 0,
    };

    const isValid = !errors.username && !errors.password;

    return { isValid, errors };
}