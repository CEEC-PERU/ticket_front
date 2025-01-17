import { useState, useEffect } from 'react';
import { AdminManagement } from '../../interfaces/management/AdminManagement';
import { getAdminManagement } from '../../services/management/adminManagement';
import { useAuth } from '../../context/AuthContext';

export const useAdminManagement = () => {
  const [adminManagement, setAdminManagement] = useState<AdminManagement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchAdminManagement = async () => {
      setLoading(true);
      try {
        //Actualizar usuarios
        // Obtén user_id desde localStorage
        const userInfo = localStorage.getItem('userInfo');
        const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
        const user_id = parsedUserInfo?.id;
        if (!user_id || !token) {
          setError('User ID o token no disponible');
          return;
        }
        // Llama al servicio con token y user_id
        const data = await getAdminManagement(token, user_id);
        setAdminManagement(data);
        console.log(data);
      } catch (err) {
        setError('Error al obtener la gestión de administradores');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminManagement();
  }, [token]); // Solo depende de `token` ya que `user_id` proviene de `localStorage`

  return { adminManagement, loading, error };
};
