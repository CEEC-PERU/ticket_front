import axios from 'axios';
import { API_SUPERADMIN } from '../../utils/Endpoints';
import { SuperAdmin, AdminDetails } from '../../interfaces/user/superadmin';
import { AxiosError } from 'axios';

export const getAdministradores = async (
  token: string
): Promise<SuperAdmin[]> => {
  try {
    const response = await axios.get(`${API_SUPERADMIN}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This should return the profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};

export const getAdministradorDeatil = async (
  token: string,
  userId: number
): Promise<AdminDetails[]> => {
  try {
    const response = await axios.get(`${API_SUPERADMIN}/admin/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // This should return the profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};
