
import axios from 'axios';
import { ProfileRequest , ProfileResponse ,} from '../../interfaces/user/profile';
import { API_PROFILE} from '../../utils/Endpoints';
import { Profile, UserInfo  } from "../../interfaces/user/login";

export const getProfile = async (userToken: string, userId: number, allData = false): Promise<Profile | null | UserInfo> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
  
      // Realizar la solicitud GET al API para obtener el perfil del usuario
      const response = await axios.get<UserInfo>(`${API_PROFILE}/alldata/${userId}`, config);
  
      // Verificar si la respuesta tiene datos y si existe el campo userProfile
      if (response.data && response.data.userProfile) {
        const profile = allData ? response.data : response.data.userProfile;
        console.log('Profile found:', profile);
        return profile;
      } else {
        console.warn('No profile found for user:', userId);
        return null; // Retornar null si el perfil no existe o no se encuentra
      }
    } catch (error) {
      console.error('Error getting profile:', error);
      throw new Error('Error getting profile');
    }
  };
  