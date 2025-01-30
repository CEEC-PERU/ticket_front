import { useState, useEffect } from 'react';
import {Level } from '../../interfaces/state/Level';
import { getLevel } from '../../services/state/level';
import { useAuth } from '../../context/AuthContext';


export const useLevel = () => {
  const [levels, setLevel] = useState<Level[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  useEffect(() => {
  
    const fetchLevel = async () => {

      if ( !token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await getLevel(token);
        setLevel(data);
      } catch (err) {
        setError('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [ token]);  // Se depende de client_id y token para actualizar

  return { levels, loading, error };
};
