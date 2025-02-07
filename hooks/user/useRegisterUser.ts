import { useState } from 'react';
import { registerUser } from '../../services/user/userService';
import { useAuth } from '../../context/AuthContext';

interface RegisterUserData {
  email: string;
  password: string;
  role_id: number;
  name: string;
  lastname: string;
}

export const useRegisterUser = () => {
  const { token } = useAuth(); // Obtiene el token del contexto de autenticación
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegisterUser = async (userData: RegisterUserData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!token) throw new Error('No se encontró un token de autenticación');
      await registerUser(userData, token);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegisterUser, loading, error, success };
};
