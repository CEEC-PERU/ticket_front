import axios from 'axios';
import { USER_API} from '../../utils/Endpoints';
import { RegisterUserData  } from "../../interfaces/user/create";
import { UserProfile} from "../../interfaces/user/profile";

export const registerUser = async (userData: RegisterUserData, token: string) => {
  try {
    const response = await axios.post(`${USER_API}/userprofile`, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al registrar usuario');
  }
};


export const getUserProfile = async (token: string, user_id : number): Promise<UserProfile[]> => {
  try {
      const response = await axios.get(`${USER_API}/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve la lista de ticket
  } catch (error) {
    console.error('Error fetching type clients:', error);
    throw new Error('Failed to fetch type clients');
  }
};
