import { createContext, useContext, useEffect, useMemo } from 'react';
import { STORAGE_KEYS } from '../config/api.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { authApi } from '../services/gameStoreApi.js';
import { setTokenProvider } from '../services/httpClient.js';

const AuthContext = createContext(null);

function normalizeAuthResponse(payload, fallbackEmail) {
  const token = payload?.token ?? payload?.accessToken ?? payload?.jwtToken ?? '';
  const user = payload?.user ?? {
    email: payload?.email ?? fallbackEmail,
    roleId: payload?.roleId,
    roleName: payload?.roleName ?? payload?.role ?? 'Customer',
  };

  return { token, user };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage(STORAGE_KEYS.auth, null);

  useEffect(() => {
    setTokenProvider(() => auth?.token ?? null);
  }, [auth]);

  async function login(form) {
    const payload = await authApi.login(form);
    const nextAuth = normalizeAuthResponse(payload, form.email);
    setAuth(nextAuth);
    return nextAuth;
  }

  async function register(form) {
    await authApi.register(form);
    return login({ email: form.email, password: form.password });
  }

  async function logout() {
    try {
      if (auth?.token) await authApi.logout();
    } finally {
      setAuth(null);
    }
  }

  const value = useMemo(() => ({
    auth,
    isAuthenticated: Boolean(auth?.token),
    isAdmin: Boolean(
      auth?.user?.roleId === 1 ||
      auth?.user?.roleId === '1' ||
      auth?.user?.roleName?.toLowerCase() === 'admin' ||
      auth?.user?.role?.slug === 'admin' ||
      auth?.user?.role === 'Admin' ||
      auth?.user?.role === 'admin'
    ),
    token: auth?.token ?? '',
    user: auth?.user ?? null,
    login,
    register,
    logout,
  }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
