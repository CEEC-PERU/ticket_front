import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import ModalUpdatePassword from '../../../components/ModalUpdatePassword';
import { useUser } from '../../../hooks/user/useUser';
import { useAuth } from '../../../context/AuthContext';
import './../../../app/globals.css';

export default function Clientes() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  // Use useEffect to handle user being available or not
  const { profiles, loading, error } = useUser();

  // If no user is available, show error immediately
  if (!user) {
    return <div>Error: No hay usuario autenticado</div>;
  }


  // If profiles are loading or not available, show loading screen
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userId = profiles ? profiles.user_id : null;

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className={`flex-1 p-6 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-16'}`}>
        <Navbar bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]" paddingtop="pt-4" />

        <div className="flex flex-col items-center mt-10 md:mt-20 space-y-6">
          <h1 className="text-3xl font-semibold text-center text-[#682cd8]">Detalles del Usuario</h1>

          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-[#7959ef]">
            <img
              src="https://res.cloudinary.com/dk2red18f/image/upload/v1739227289/CEEC/PERFIL/pngtree-round-button-in-cobalt-and-cyan-colors-for-user-profile-photo-image_19439274_s00iyc.jpg"
              alt="Perfil de usuario"
              className="w-full h-full object-cover"
            />
          </div>

          {profiles && (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium text-gray-800"><strong>Email:</strong> {profiles.email}</p>
              <p className="text-lg font-medium text-gray-800"><strong>Nombre:</strong> {profiles.profile.name}</p>
              <p className="text-lg font-medium text-gray-800"><strong>Apellido:</strong> {profiles.profile.lastname}</p>
            </div>
          )}

          <div className="mt-8 w-full md:w-1/2">
            <button
              onClick={openModal}
              className="w-full bg-[#682cd8] text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-l transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>

      {userId !== null && (
        <ModalUpdatePassword isOpen={isModalOpen} closeModal={closeModal} userId={userId} />
      )}
    </div>
  );
}
