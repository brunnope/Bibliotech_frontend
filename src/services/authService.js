const USUARIO_KEY = "usuario";

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

export function logout() {
  localStorage.removeItem(USUARIO_KEY);
}
