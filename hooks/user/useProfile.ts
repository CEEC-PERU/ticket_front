import { useState, useEffect } from 'react';
import {Level } from '../../interfaces/state/Level';
import { getUserProfile } from '../../services/user/userService';
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
       // const data = await getUserProfile(token, user.id);
        
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
