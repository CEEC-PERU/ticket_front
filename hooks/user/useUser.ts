import { useState, useEffect } from 'react';
import {getUserProfile} from '../../services/user/userService';
import { UserProfile } from '../../interfaces/user/profile';
import { useAuth } from '../../context/AuthContext';

export const useUser = () => {
  const [profiles, setProfiles] = useState<UserProfile | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

    const fetchUser = async () => {
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
        const fetchedUser = await getUserProfile(token, userData.id);

        // Mapeo de datos a la estructura UserProfile
        if (fetchedUser) {
         
          setProfiles(fetchedUser);  // Actualizamos el estado
        } else {
          setError('Usuario no encontrado');
        }
      } catch (error) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchUser();
    }, [token]); // Depend on `token` to refetch when the token changes
  
  return { profiles, loading, error,  refetch:fetchUser };  // Siempre retorna estos valores
};


