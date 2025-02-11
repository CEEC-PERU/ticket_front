// hooks/useUpdatePassword.js
import { useState } from 'react';
import { updatePassword } from '../../services/user/userService';
import { AxiosError } from 'axios';

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Especificar tipo de error
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleUpdatePassword = async (userId : number, oldPassword : string, newPassword : string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await updatePassword(userId, oldPassword, newPassword);
      setSuccessMessage(result.message);
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError('Error al actualizar contraseña');
          }
        } else {
          // Si no es un error de Axios, podrías manejarlo de otra forma
          setError('Error al actualizar contraseña');
        }
      } finally {
        setLoading(false);
      }
    };
    
  return {
    loading,
    error,
    successMessage,
    handleUpdatePassword,
  };
};

export default useUpdatePassword;
