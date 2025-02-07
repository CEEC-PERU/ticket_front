import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ticket-qtech.onrender.com/api/users';

interface RegisterUserData {
  email: string;
  password: string;
  role_id: number;
  name: string;
  lastname: string;
}

export const registerUser = async (userData: RegisterUserData, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/userprofile`, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al registrar usuario');
  }
};
