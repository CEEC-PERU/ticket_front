import axios from 'axios';
import { DETAIL_REQUEST} from "../../utils/Endpoints";
import { UpdateRequest, UpdateStateRequest} from "../../interfaces/ticket/Request";

//editar detail request 

export const updateRequest = async (requestId: number,user_id: number , payload: UpdateRequest) => {
    try {
      const response = await axios.put(`${DETAIL_REQUEST}/update/${requestId}/${user_id}`, payload, {
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
  