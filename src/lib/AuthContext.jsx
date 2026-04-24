import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const USERS_STORAGE_KEY = "auto_vision_users";
const SESSION_STORAGE_KEY = "auto_vision_session";

function readUsers() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("No se pudieron leer los usuarios locales:", error);
    return [];
  }
}

function saveUsers(users) {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function readSession() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("No se pudo leer la sesion local:", error);
    return null;
  }
}

function saveSession(user) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

function clearSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const sessionUser = readSession();
    setUser(sessionUser);
    setIsLoadingAuth(false);
  }, []);

  const register = ({ name, email, password }) => {
    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const userExists = users.some((item) => item.email === normalizedEmail);
    if (userExists) {
      throw new Error("Ya existe una cuenta registrada con este correo.");
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    saveSession(newUser);
    setUser(newUser);
    setAuthError(null);

    return newUser;
  };

  const login = ({ email, password }) => {
    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find((item) => item.email === normalizedEmail && item.password === password);
    if (!foundUser) {
      throw new Error("Correo o contrasena incorrectos.");
    }

    saveSession(foundUser);
    setUser(foundUser);
    setAuthError(null);

    return foundUser;
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setAuthError(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError,
      appPublicSettings: null,
      register,
      login,
      logout,
      navigateToLogin: null,
      checkAppState: () => {},
    }),
    [user, isLoadingAuth, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
