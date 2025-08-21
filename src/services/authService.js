const USUARIO_KEY = "usuario";
const TOKEN_KEY = "token";

export function setUsuarioLocalStorage(usuario) {
  localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

export function getUsuarioLocalStorage() {
  const data = localStorage.getItem(USUARIO_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function logoutLocalStorage() {
  localStorage.removeItem(USUARIO_KEY);
  localStorage.removeItem(TOKEN_KEY);
}


export function setTokenLocalStorage(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getTokenLocalStorage() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeTokenLocalStorage() {
    localStorage.removeItem(TOKEN_KEY);
}
