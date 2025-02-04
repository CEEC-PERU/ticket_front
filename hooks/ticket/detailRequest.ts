// hooks/ticket/updateTicket.ts
import { useState } from 'react';
import axios from 'axios';

export const useUpdateRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDetailRequest = async (
    requestId: number,
    newDetail: string,
    files: File[]
  ) => {
    setLoading(true);
    setError(null);

    try {
     

      // FormData en el frontend
const formData = new FormData();
formData.append('newDetail', newDetail);
files.forEach((file) => {
  formData.append('materials' , file); // Asegúrate de que 'materials' es el campo correcto
});

console.log(formData);
// Llamada al backend
const response = await axios.put(`http://localhost:4100/api/detailrequest/update-detail/${requestId}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});


      return response.data; // Puede devolver algún mensaje de éxito
    } catch (err) {
      setError('Error al actualizar la solicitud');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateDetailRequest, loading, error };
};
