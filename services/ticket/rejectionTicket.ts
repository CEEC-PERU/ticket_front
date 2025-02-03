import axios from 'axios';
import { IRejectionCreate } from '../../interfaces/ticket/Rejection';
import { API_REJECTION } from "../../utils/Endpoints";

export const submitRejection = async (formData: IRejectionCreate) => {
  try {
    const response = await axios.post(`${API_REJECTION}`, formData);
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
