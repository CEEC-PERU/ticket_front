// services/typeClientService.ts
import axios from 'axios';
import { TypeManagement} from '../../interfaces/management/TypeManagement';
import { API_TYPE_MANAGEMENT } from "../../utils/Endpoints";

// Servicio para obtener la lista de TypeClients
export const getTypeManagement= async (token: string): Promise<TypeManagement[]> => {
  try {
    const response = await axios.get(`${API_TYPE_MANAGEMENT}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve la lista de clientes
  } catch (error) {
    console.error('Error fetching type clients:', error);
    throw new Error('Failed to fetch type clients');
  }
};
