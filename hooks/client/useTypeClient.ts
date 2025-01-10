// hooks/useTypeClients.ts
import { useState, useEffect } from 'react';
import { TypeClient } from '../../interfaces/client/TypeClient';
import { getTypeClients } from '../../services/client/typeClient';
import { useAuth } from '../../context/AuthContext';
export const useTypeClients = () => {
  const [typeClients, setTypeClients] = useState<TypeClient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();
  useEffect(() => {
    const fetchTypeClients = async () => {
      setLoading(true);
      try {
        if (!token) {
          return;
        }
        const data = await getTypeClients(token);
        setTypeClients(data);
      } catch (err) {
        setError('Failed to fetch type clients');
      } finally {
        setLoading(false);
      }
    };

    fetchTypeClients();
  }, [token]); 

  return { typeClients, loading, error };
};
