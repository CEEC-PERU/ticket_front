
import { useState, useEffect } from 'react';
import { RequestClient } from '../../interfaces/ticket/Request';
import { getClientRequest } from '../../services/ticket/ClienteTicket';
import { useAuth } from '../../context/AuthContext';

export const useRequestClient = () => {
  const [requestclient, setRequestClient] = useState<RequestClient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  // Fetch the data from the API
  const fetchRequestClient = async () => {
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
      const data = await getClientRequest(token, userData.id);
      setRequestClient(data);
      console.log(data);
    } catch (err) {
      setError('Error al obtener la gestión de administradores');
    } finally {
      setLoading(false);
    }
  };

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    fetchRequestClient();
  }, [token]); // Depend on `token` to refetch when the token changes

  // Return the fetch function to allow manual refetching
  return { requestclient, loading, error, refetch: fetchRequestClient };
};
