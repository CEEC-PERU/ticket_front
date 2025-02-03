import { useState } from 'react';
import { updateRequest, updateStateRequest } from '../../services/ticket/updateTicket';
import { UpdateRequest, UpdateStateRequest} from '../../interfaces/ticket/Request';
import { useAuth } from '../../context/AuthContext';
export const useUpdateRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token , user } = useAuth();
  const handleUpdateRequest = async (requestId: number, payload: UpdateRequest) => {

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
      await updateRequest(requestId,userData.id ,  payload);
    } catch (err) {
      setError('Error al actualizar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateRequest, loading, error };
};



export const useUpdateStateRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token , user } = useAuth();
  const handleUpdateStateRequest = async (requestId: number, payload: UpdateStateRequest) => {

    if (!token || !user) {
        setLoading(false);
        return;
      }

    try {
      setLoading(true);
      await updateStateRequest(requestId,  payload);
    } catch (err) {
      setError('Error al actualizar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateStateRequest, loading, error };
};
