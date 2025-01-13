// services/typeClientService.ts
import axios from 'axios';
import {  Camapign} from '../../interfaces/client/campaigns';
import { API_CAMPAIGNS } from "../../utils/Endpoints";

// Servicio para obtener la lista de TypeClients
export const getCampaigns = async (token: string, client_id : number): Promise<Camapign[]> => {
  try {
      const response = await axios.get(`${API_CAMPAIGNS}/client/${client_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve la lista de campañas
  } catch (error) {
    console.error('Error fetching type clients:', error);
    throw new Error('Failed to fetch type clients');
  }
};
