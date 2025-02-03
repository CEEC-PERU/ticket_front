// services/typeClientService.ts
import axios from 'axios';
import {RequestClient } from '../../interfaces/ticket/Request';
import { API_TICKET} from "../../utils/Endpoints";

// Servicio para obtener la lista de TypeClients
export const getClientRequest = async (token: string, user_id : number): Promise<RequestClient[]> => {
  try {
      const response = await axios.get(`${API_TICKET}/user/${user_id}`, {
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
