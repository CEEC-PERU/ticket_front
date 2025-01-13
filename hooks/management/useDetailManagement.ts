import { useState, useEffect } from 'react';
import {DetailManagement } from '../../interfaces/management/DetailManagement';
import { getDetailManagement } from '../../services/management/detailManagement';
import { useAuth } from '../../context/AuthContext';

export const useDetailManagement= (management_id: number | null) => {
  const [detailManagement, setDetailManagement] = useState<DetailManagement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  useEffect(() => {
    if (!management_id || !token) return;  // Validación para evitar ejecución si no hay cliente o token

    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const data = await getDetailManagement(token, management_id);
        setDetailManagement(data);
      } catch (err) {
        setError('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [management_id, token]);  // Se depende de client_id y token para actualizar

  return { detailManagement, loading, error };
};
