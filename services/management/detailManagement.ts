// services/typeClientService.ts
import axios from 'axios';
import { DetailManagement} from '../../interfaces/management/DetailManagement';
import { API_DETAIL_MANAGEMENT } from "../../utils/Endpoints";

// Servicio para obtener la lista de TypeClients
export const getDetailManagement = async (token: string, management_id : number): Promise<DetailManagement[]> => {
  try {
      const response = await axios.get(`${API_DETAIL_MANAGEMENT}/management/${management_id}`, {
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
