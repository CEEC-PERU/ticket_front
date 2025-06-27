import { useState, useEffect } from 'react';
import { SuperAdmin, AdminDetails } from '../../interfaces/user/superadmin';
import {
  getAdministradorDeatil,
  getAdministradores,
} from '../../services/user/userSuperAdmin';
import { useAuth } from '../../context/AuthContext';

export const useSuperAdmin = () => {
  const [administradores, setAdministradores] = useState<SuperAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchLevel = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await getAdministradores(token);
        setAdministradores(data);
      } catch (err) {
        setError('Failed to fetch administradores');
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [token]); // Se depende de client_id y token para actualizar

  return { administradores, loading, error };
};

export const useAdminDetail = (user_id: number) => {
  const [administradores, setAdministradores] = useState<AdminDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchAdmiDetail = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await getAdministradorDeatil(token, user_id);
        setAdministradores(data);
      } catch (err) {
        setError('Failed to fetch administradores');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmiDetail();
  }, [token]); // Se depende de client_id y token para actualizar

  return { administradores, loading, error };
};
