import React, { useState } from 'react';
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
  const { profiles, loading } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="p-6 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Error de autenticación
          </h2>
          <p className="text-gray-600">
            No hay usuario autenticado. Por favor, inicia sesión.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userId = profiles?.user_id || null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DrawerSolicitante
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          showSidebar ? 'ml-64' : 'ml-16'
        }`}
      >
        <Navbar
          bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]"
          paddingtop="pt-4"
        />

        <main className="p-6 md:p-8">
          <div className="max-w-4xl mx-auto pt-20">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Header con gradiente */}
              <div className="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1] p-6 text-white">
                <h1 className="text-2xl md:text-3xl font-bold">Mi Perfil</h1>
                <p className="opacity-90">
                  Administra tu información personal y configuración de cuenta
                </p>
              </div>

              {/* Contenido del perfil */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Avatar */}
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                      <img
                        src="https://res.cloudinary.com/dk2red18f/image/upload/v1739227289/CEEC/PERFIL/pngtree-round-button-in-cobalt-and-cyan-colors-for-user-profile-photo-image_19439274_s00iyc.jpg"
                        alt="Perfil de usuario"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#682cd8] to-[#f428e1] rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>

                  {/* Información del usuario */}
                  <div className="flex-1">
                    {profiles && (
                      <div className="space-y-4">
                        <div className="pb-4 border-b border-gray-100">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {profiles.profile.name} {profiles.profile.lastname}
                          </h2>
                          <p className="text-purple-600">{profiles.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Nombre
                            </label>
                            <p className="mt-1 text-gray-800 font-medium">
                              {profiles.profile.name}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Apellido
                            </label>
                            <p className="mt-1 text-gray-800 font-medium">
                              {profiles.profile.lastname}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Correo electrónico
                            </label>
                            <p className="mt-1 text-gray-800 font-medium">
                              {profiles.email}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Rol
                            </label>
                            <p className="mt-1 text-gray-800 font-medium">
                              Solicitante
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={openModal}
                    className="px-6 py-3 bg-gradient-to-r from-[#682cd8] to-[#f428e1] text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                  >
                    Cambiar contraseña
                  </button>
                  <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md">
                    Editar perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {userId && (
        <ModalUpdatePassword
          isOpen={isModalOpen}
          closeModal={closeModal}
          userId={userId}
        />
      )}
    </div>
  );
}
