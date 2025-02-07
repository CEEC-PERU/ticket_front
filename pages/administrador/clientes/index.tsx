import React, { useState } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import { useRegisterUser } from '../../../hooks/user/useRegisterUser';
import { motion } from 'framer-motion';
import Modal from '../../../components/Modal';
import { UserPlusIcon } from '@heroicons/react/24/solid';

export default function Clientes() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [role_id] = useState(2); // Rol por defecto (ejemplo: 3 = Cliente)

  const { handleRegisterUser, loading, error, success } = useRegisterUser();

  const handleSubmitStep1 = () => {
    if (email && password) {
      setStep(2);
    }
  };

  const handleSubmitStep2 = async () => {
    await handleRegisterUser({ email, password, role_id, name, lastname });
    if (success) setShowForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className={`flex-1 p-6 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-16'}`}>
        <Navbar bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]" paddingtop="pt-4" />

        <div className="relative max-w-7xl mx-auto pt-16">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white p-2 mt-5 rounded-md flex items-center gap-2"
          >
            <UserPlusIcon className="h-5 w-5" />
            Registrar Cliente
          </button>

          <h1 className="text-2xl font-semibold mb-6 text-blue-700 pt-5">Lista de Clientes</h1>

          {showForm && (
            <Modal title="Registrar Cliente" onClose={() => setShowForm(false)}>
              <div className="space-y-4">
                {step === 1 ? (
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
                    <button onClick={handleSubmitStep1} className="bg-blue-500 text-white p-2 rounded-md w-full">
                      Siguiente
                    </button>
                  </div>
                ) : (
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
                      disabled={loading}
                    >
                      {loading ? 'Registrando...' : 'Registrar Cliente'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">Cliente registrado con éxito</p>}
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
