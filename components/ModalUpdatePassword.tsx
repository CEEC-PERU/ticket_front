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

    // State to control the visibility of the passwords
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Reset the fields when modal is closed or canceled
  const resetFields = () => {
    setOldPassword('');
    setNewPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdatePassword(userId, oldPassword, newPassword);

    if (successMessage) {
      resetFields();  // Reset fields after successful update
    }
  };

  const handleCancel = () => {
    resetFields();  // Reset fields when canceled
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-80">

            {/* Close Button (X) */}
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            onClick={handleCancel}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-xl font-semibold text-center mb-4">Cambiar Contraseña</h2>
         
         
          {/* Formulario de cambio de contraseña */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Contraseña actual</label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
                {/* Eye Icon for toggling password visibility */}
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showOldPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l-3 3-3-3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zM12 6v6l4 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Nueva contraseña</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
                {/* Eye Icon for toggling password visibility */}
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showNewPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l-3 3-3-3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zM12 6v6l4 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mensajes de estado */}
            {loading && <p className="text-blue-500">Actualizando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <div className="flex justify-between mt-6">
              <button type="button" onClick={handleCancel} className="text-gray-600 hover:text-gray-900">Cancelar</button>
              <button type="submit" className="bg-[#682cd8] text-white py-2 px-4 rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalUpdatePassword;
