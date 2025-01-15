import axios from 'axios';
import { TypeManagement } from '../../interfaces/management/TypeManagement';
import { API_TICKET } from "../../utils/Endpoints";

export const submitSolicitud = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_TICKET}/solicitudes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure multipart form data for file uploads
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // This narrows the error type to AxiosError
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      }
    } else {
      console.error('Unexpected error:', (error as Error).message); // Type assertion for non-Axios errors
    }
    throw new Error('Error envio de solicitud');
  }
};
