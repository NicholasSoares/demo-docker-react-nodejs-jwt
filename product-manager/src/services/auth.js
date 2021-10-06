/**
 * Token key name for use in localstorage
 */
export const TOKEN_KEY = "@product-api-Token";

/**
 * Check if token key is present in localstorage
 */
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

/**
 * Get token key from localstorage
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Set token key on localstorage
 */
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove token key from local storage
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
