// components/ModalUpdatePassword.tsx

import React, { useState } from 'react';
import useUpdatePassword from '../hooks/user/useUpdatedPassword';

// Definir la interfaz de las props
interface ModalUpdatePasswordProps {
  isOpen: boolean;
  closeModal: () => void;
  userId: number ;
}

const ModalUpdatePassword: React.FC<ModalUpdatePasswordProps> = ({ isOpen, closeModal, userId }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { loading, error, successMessage, handleUpdatePassword } = useUpdatePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdatePassword(userId, oldPassword, newPassword);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-80">
          <h2 className="text-xl font-semibold text-center mb-4">Cambiar Contraseña</h2>

          {/* Formulario de cambio de contraseña */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Contraseña actual</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Nueva contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>

            {/* Mensajes de estado */}
            {loading && <p className="text-blue-500">Actualizando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <div className="flex justify-between mt-6">
              <button type="button" onClick={closeModal} className="text-gray-600 hover:text-gray-900">Cancelar</button>
              <button type="submit" className="bg-[#682cd8] text-white py-2 px-4 rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalUpdatePassword;
