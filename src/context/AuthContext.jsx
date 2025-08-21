import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api.js";
import { jwtDecode } from "jwt-decode";
import {
    getTokenLocalStorage,
    getUsuarioLocalStorage, logoutLocalStorage,
    setTokenLocalStorage,
    setUsuarioLocalStorage
} from "../services/authService.js";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRoles, setUserRoles] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = getTokenLocalStorage();
        const storedUser = getUsuarioLocalStorage();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);

            const decoded = jwtDecode(storedToken);
            setUserRoles(decoded.roles);

            api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
    }, []);

    const login = async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        const { token, user } = response.data;


        setTokenLocalStorage(token);
        setUsuarioLocalStorage(user);

        setToken(token);
        setUser(user);

        const decoded = jwtDecode(token)
        setUserRoles(decoded.roles);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

     const logout = () => {
        logoutLocalStorage()
        setToken(null);
        setUser(null);
        setUserRoles(null);
    };

    return (
        <AuthContext.Provider value={{ user, userRoles, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
