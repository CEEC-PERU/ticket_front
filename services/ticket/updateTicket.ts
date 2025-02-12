import axios from 'axios';
import { API_TICKET } from "../../utils/Endpoints";
import { UpdateRequest, UpdateStateRequest} from "../../interfaces/ticket/Request";

export const updateRequest = async (requestId: number,user_id: number , payload: UpdateRequest) => {
  try {
    const response = await axios.put(`${API_TICKET}/update/${requestId}/${user_id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la respuesta del servidor:', error.response?.data || error.message);
    } else {
      console.error('Error inesperado:', (error as Error).message);
    }
    throw new Error('Error al actualizar la solicitud');
  }
};


export const updateStateRequest = async (requestId: number, payload: UpdateStateRequest) => {
  try {
    const response = await axios.put(`${API_TICKET}/state/${requestId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la respuesta del servidor:', error.response?.data || error.message);
    } else {
      console.error('Error inesperado:', (error as Error).message);
    }
    throw new Error('Error al actualizar la solicitud');
  }
};

export const updateStateFinish= async (requestId: number, payload: UpdateStateRequest) => {
  try {
    const response = await axios.put(`${API_TICKET}/finish/state/datos/${requestId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la respuesta del servidor:', error.response?.data || error.message);
    } else {
      console.error('Error inesperado:', (error as Error).message);
    }
    throw new Error('Error al actualizar la solicitud');
  }
};