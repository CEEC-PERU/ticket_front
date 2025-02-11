import axios from 'axios';
import { USER_API} from '../../utils/Endpoints';
import { RegisterUserData  } from "../../interfaces/user/create";
import { UserProfile} from "../../interfaces/user/profile";
import { AxiosError } from 'axios';
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




export const getUserProfile = async (token: string, user_id: number): Promise<UserProfile> => {
  try {
    const response = await axios.get(`${USER_API}/user/${user_id}`, {
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





export const updatePassword = async (userId : number, oldPassword : string, newPassword : string) => {
  try {
    const response = await axios.put(`${USER_API}/updatedpassword/${userId}`, {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (err: unknown){
 
    if (err instanceof AxiosError) {
      if (err.response && err.response.data && err.response.data.message) {
        console.error('Error al actualizar la contraseña:', err.response.data);
        throw new Error(err.response.data.message || 'Error al actualizar contraseña');
      } else {
        console.error('Error al actualizar la contraseña:', err.message);
        throw new Error('Error desconocido al actualizar la contraseña');
      }
    } else {
      // Si no es un error de Axios, podrías manejarlo de otra forma
      throw new Error('Error al actualizar la contraseña');
    }
  }
};





