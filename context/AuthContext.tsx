import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { getProfile } from '../services/user/profileService';
import { signin } from '../services/user/authService';
import { AuthContextData, AuthProviderProps } from '../interfaces/user/auth';
import { API_SOCKET_URL } from '../utils/Endpoints';
import { LoginResponse, Profile, UserInfo } from '../interfaces/user/login';
import { validateToken } from '../helpers/helper-token';
import { io } from 'socket.io-client';
import axios, { AxiosError } from 'axios';
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const socket = io(API_SOCKET_URL);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{
    id: number;
    role: number;
    email: string;
    is_active: boolean;
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profileInfo, setProfileInfo] = useState<Profile | UserInfo | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    const storedUser = localStorage.getItem('userInfo');

    if (storedToken && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      const decodedUser = JSON.parse(storedUser);

      setToken(storedToken);
      setUser(decodedUser);
    }
  }, []);

  // AuthContext.tsx
  const refreshProfile = async (token: string, userId: number) => {
    try {
      const profile = await getProfile(token, userId);
      if (profile) {
        localStorage.setItem('profileInfo', JSON.stringify(profile));
        setProfileInfo(profile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: LoginResponse = await signin({ email, password });
      if (response.token) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.token}`;
        const decodedToken: {
          id: number;
          role: number;
          email: string;
          is_active: boolean;
        } = jwtDecode(response.token);
        setToken(response.token);
        setUser({
          id: decodedToken.id,
          role: decodedToken.role,
          email: decodedToken.email,
          is_active: decodedToken.is_active,
        });

        localStorage.setItem('userToken', response.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: decodedToken.id,
            role: decodedToken.role,
            email: decodedToken.email,
            is_active: decodedToken.is_active,
          })
        );

        socket.emit('login', { userToken: response.token });

        // Redirect based on user role after login
        redirectToDashboard(decodedToken.role); // Redirection based on role
      } else {
        setError(
          response.msg ??
            'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.'
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setError('Error al iniciar sesión, datos ingresados incorrectos.');
        } else {
          setError('Ocurrió un error al iniciar sesión. Inténtalo nuevamente.');
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('profileInfo');
    if (token) {
      const decodedToken: {
        id: number;
        role: number;
        email: string;
        is_active: boolean;
      } = jwtDecode(token);
      socket.emit('logout');
    }

    setUser(null);
    setToken(null);
    router.push('/');
  };

  const redirectToDashboard = (role: number) => {
    switch (role) {
      case 1:
        router.push('/solicitante');
        if (token) {
          const decodedToken: { id: number; role: number; email: string } =
            jwtDecode(token);
          if (decodedToken.role === 1) {
            socket.emit('login', { userToken: token });
          }
        }
        break;
      case 2:
        router.push('/administrador');
        if (token) {
          const decodedToken: { id: number; role: number; email: string } =
            jwtDecode(token);
          if (decodedToken.role === 2) {
            socket.emit('login', { userToken: token });
          }
        }
        break;

      case 3:
        router.push('/superadmin');
        if (token) {
          const decodedToken: { id: number; role: number; email: string } =
            jwtDecode(token);
          if (decodedToken.role === 3) {
            socket.emit('login', { userToken: token });
          }
        }
        break;

      default:
        router.push('/');
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      error,
      login,
      logout,
      profileInfo,
      redirectToDashboard,
      refreshProfile,
    }),
    [user, token, isLoading, error, profileInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
