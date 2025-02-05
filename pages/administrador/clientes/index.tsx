import React, { useState } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import './../../../app/globals.css';
import { useAdminManagement } from '../../../hooks/management/useAdminManagement';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import Modal from '../../../components/Modal';
import { UserPlusIcon } from '@heroicons/react/24/solid';

export default function Clientes() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [step, setStep] = useState(1); // Paso del formulario
  const { adminManagement, loading, error, refetch } = useAdminManagement();
  const { token, user } = useAuth();
  
  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  
  const userInfor = user as { id: number } | null;

  const handleSubmitStep1 = () => {
    // Validación y paso al siguiente paso
    if (email && password) {
      setStep(2); // Avanzamos al paso 2
    }
  };

  const handleSubmitStep2 = () => {
    // Aquí iría la lógica para enviar los datos del formulario
    console.log({ email, password, name, lastname });
    setShowForm(false); // Cerrar el formulario al enviar
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Drawer */}
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          showSidebar ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Navbar */}
        <Navbar
          bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]"
          paddingtop="pt-4"
        />

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto pt-16">
          
          <button
            onClick={() => setShowForm(true)} // Abrir formulario al hacer clic
            className="bg-blue-500 text-white p-2 mt-5 rounded-md flex items-center gap-2"
          >
            <UserPlusIcon className="h-5 w-5" />
            Registrar Cliente
          </button>

          <h1 className="text-2xl font-semibold mb-6 text-blue-700 pt-5">Lista de Clientes</h1>

          {/* Formulario de Registro */}
          {showForm && (
            <Modal title="Registrar Cliente" onClose={() => setShowForm(false)}>
              <div className="space-y-4">
                {step === 1 ? (
                  // Paso 1: Email y Password
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600">Password</label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleSubmitStep1}
                      className="bg-blue-500 text-white p-2 rounded-md w-full"
                    >
                      Siguiente
                    </button>
                  </div>
                ) : (
                  // Paso 2: Nombre y Apellido
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600">Nombre</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600">Apellido</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Apellido"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleSubmitStep2}
                      className="bg-green-500 text-white p-2 rounded-md w-full"
                    >
                      Registrar Cliente
                    </button>
                  </div>
                )}
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
