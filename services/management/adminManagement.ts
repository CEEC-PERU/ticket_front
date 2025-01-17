// services/typeClientService.ts
import axios from 'axios';
import { AdminManagement} from '../../interfaces/management/AdminManagement';
import { API_ADMIN_MANAGEMENT } from "../../utils/Endpoints";

// Servicio para obtener la lista de TypeClients
export const getAdminManagement = async (token: string, user_id : number): Promise<AdminManagement[]> => {
  try {
      const response = await axios.get(`${API_ADMIN_MANAGEMENT}/filter/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve la lista de detalle de gestión
  } catch (error) {
    console.error('Error fetching type clients:', error);
    throw new Error('Failed to fetch type clients');
  }
};
