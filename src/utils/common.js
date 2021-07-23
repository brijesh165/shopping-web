// Returns the user login status from the session storage
export const checkUserStatus = () => {
    const userStatus = sessionStorage.getItem('userLoggedIn');
    return userStatus;
}

// Returns the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// Returns the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// Remove the token and user from the session storeage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userLoggedIn')
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, userLoggedIn, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userLoggedIn', userLoggedIn)
    sessionStorage.setItem('user', JSON.stringify(user))
}

// get the user information from session storage
export const gerUser = () => {
    return JSON.parse(sessionStorage.getItem('user')) || null;
}

// set the user prefered language in the session storage
export const setUserLanguage = (language) => {
    sessionStorage.setItem('i18nextLng', language)
}

// change the user prefered language in the session storage
export const changeUserLanguage = (language) => {
    sessionStorage.removeItem('i18nextLng');
    sessionStorage.setItem('i18nextLng', language)
}