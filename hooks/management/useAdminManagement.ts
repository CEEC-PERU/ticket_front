
import { useState, useEffect } from 'react';
import { AdminManagement } from '../../interfaces/management/AdminManagement';
import { getAdminManagement } from '../../services/management/adminManagement';
import { useAuth } from '../../context/AuthContext';

export const useAdminManagement = () => {
  const [adminManagement, setAdminManagement] = useState<AdminManagement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  // Fetch the data from the API
  const fetchAdminManagement = async () => {
    if (!token || !user) {
      setLoading(false);
      return;
    }

    let userData;
    try {
      userData = typeof user === 'string' ? JSON.parse(user) : user;
    } catch (error) {
      console.error('Error parsing user:', error);
      return;
    }

    if (!userData?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getAdminManagement(token, userData.id);
      setAdminManagement(data);
      console.log(data);
    } catch (err) {
      setError('Error al obtener la gestión de administradores');
    } finally {
      setLoading(false);
    }
  };

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    fetchAdminManagement();
  }, [token]); // Depend on `token` to refetch when the token changes

  // Return the fetch function to allow manual refetching
  return { adminManagement, loading, error, refetch: fetchAdminManagement };
};
