// services/typeClientService.ts
import axios from 'axios';
import { TypeClient } from '../../interfaces/client/TypeClient';
import { API_TYPE_CLIENT } from "../../utils/Endpoints";

// Servicio para obtener la lista de TypeClients
export const getTypeClients = async (token: string): Promise<TypeClient[]> => {
  try {
    const response = await axios.get(`${API_TYPE_CLIENT}`, {
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
