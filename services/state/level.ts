// services/typeClientService.ts
import axios from 'axios';
import { Level } from '../../interfaces/state/Level';
import { API_LEVELS } from "../../utils/Endpoints";

// Servicio para obtener la lista de TypeClients
export const getLevel = async (token: string): Promise<Level[]> => {
  try {
      const response = await axios.get(`${API_LEVELS}/levels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve la lista de detalle de gestión
  } catch (error) {
    console.error('Error fetching type levels:', error);
    throw new Error('Failed to fetch type levels');
  }
};
