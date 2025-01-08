import { API_AUTH } from '../../utils/Endpoints';
import axios, { AxiosError } from 'axios';
import api from '../../services/api';
import { LoginResponse, LoginRequest } from "../../interfaces/user/login";

export const signin = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post(API_AUTH, { email, password });
    return response.data;;
  } catch (error) {
    const axiosError = error as AxiosError<LoginResponse>
    if (axiosError.response?.status === 401) {
        return axiosError.response.data;
    }
    console.error("Error in login Service:", error);
    throw error
  }
};
