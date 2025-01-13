import { useState, useEffect } from 'react';
import { Camapign } from '../../interfaces/client/campaigns';
import { getCampaigns } from '../../services/client/campaigns';
import { useAuth } from '../../context/AuthContext';

export const useCampaings = (client_id: number | null) => {
  const [campaigns, setCampaigns] = useState<Camapign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  useEffect(() => {
    if (!client_id || !token) return;  // Validación para evitar ejecución si no hay cliente o token

    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const data = await getCampaigns(token, client_id);
        setCampaigns(data);
      } catch (err) {
        setError('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [client_id, token]);  // Se depende de client_id y token para actualizar

  return { campaigns, loading, error };
};
