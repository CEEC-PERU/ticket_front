// hooks/useTypeClients.ts
import { useState, useEffect } from 'react';
import { TypeManagement } from '../../interfaces/management/TypeManagement';
import { getTypeManagement } from '../../services/management/typeManagement';
import { useAuth } from '../../context/AuthContext';

export const useTypeManagement = () => {
  const [typeManagement, setTypeManagement] = useState<TypeManagement[]>([]);
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
        const data = await getTypeManagement(token);
        setTypeManagement(data);
      } catch (err) {
        setError('Failed to fetch type clients');
      } finally {
        setLoading(false);
      }
    };

    fetchTypeClients();
  }, [token]); 

  return { typeManagement, loading, error };
};
