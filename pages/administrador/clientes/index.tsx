import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import { useRegisterUser } from '../../../hooks/user/useRegisterUser';
import Modal from '../../../components/Modal';
import './../../../app/globals.css';
import { UserPlusIcon } from '@heroicons/react/24/solid';

export default function Clientes() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1); // Paso actual del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState(false); // Para la alerta de la contraseña
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [role_id] = useState(2); // Rol por defecto (ejemplo: 3 = Cliente)
  const [showPassword, setShowPassword] = useState(false); // Para mostrar u ocultar la contraseña
  const [successMessage, setSuccessMessage] = useState(false); // Para mostrar el mensaje de éxito

  const { handleRegisterUser, loading, error, success } = useRegisterUser();

  // Manejar el paso 1 del formulario
  const handleSubmitStep1 = () => {
    if (email && password && validatePassword(password)) {
      setStep(2); // Avanzar al paso 2 (detalles del cliente)
      setPasswordAlert(false);
    } else {
      setPasswordAlert(true); // Si la contraseña no es válida, mostrar alerta
    }
  };

  // Manejar el paso 2 y la llamada de registro
  const handleSubmitStep2 = async () => {
    await handleRegisterUser({ email, password, role_id, name, lastname });
  };

  // Usar useEffect para esperar el cambio en success
  useEffect(() => {
    if (success) {
      setStep(3); // Cambiar al paso 3 (registrado correctamente)
      setSuccessMessage(true); // Muestra el mensaje de éxito
    }
  }, [success]); // Se ejecuta cuando success cambia

  // Función para validar la contraseña
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^.{8,}$/; // Solo validar longitud de 8 o más caracteres
    return passwordRegex.test(password);
  };

  // Función para manejar el cierre del modal o el clic en "OK"
  const handleCloseModal = () => {
    setEmail('');
    setPassword('');
    setName('');
    setLastname('');
    setStep(1); // Volver al paso 1
    setShowForm(false); // Cerrar el modal
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

          <h1 className="text-2xl font-semibold mb-6 text-blue-700 pt-5"></h1>

          {showForm && (
            <Modal title="Registrar Cliente" onClose={handleCloseModal}>
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
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full p-3 border border-gray-300 rounded-md"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-3 right-3 text-gray-600"
                        >
                          {showPassword ? 'Ocultar' : 'Ver'}
                        </button>
                      </div>
                    </div>
                    {passwordAlert && (
                      <p className="text-red-500 text-sm mt-2">
                        La contraseña debe tener al menos 8 caracteres.
                      </p>
                    )}
                    <button
                      onClick={handleSubmitStep1}
                      className="bg-blue-500 text-white p-2 rounded-md w-full"
                    >
                      Siguiente
                    </button>
                  </div>
                ) : step === 2 ? (
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
                ) : (
                  <div>
                    <p className="text-green-500 text-center text-lg font-semibold">¡Cliente registrado correctamente!</p>
                    <button
                      onClick={handleCloseModal}
                      className="bg-blue-500 text-white p-2 mt-4 rounded-md w-full"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            </Modal>
          )}
        </div>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          <p>Usuario registrado correctamente</p>
        </div>
      )}
    </div>
  );
}
