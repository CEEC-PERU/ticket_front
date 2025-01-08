import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './../app/globals.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowAlert(true);
    }
  }, [error]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowAlert(false);
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Debes completar todos los campos');
      setShowAlert(true);
      return;
    }

    try {
      await login(email, password);
    } catch {
      setErrorMessage('Usuario o contraseña incorrectos');
      setShowAlert(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-4xl font-bold">Iniciar Sesión</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo"
            className="p-3 border rounded w-full"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            className="p-3 border rounded w-full"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-4 flex items-center text-gray-500"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825C16.15 17.835 18 15.29 18 12c0-3.314-2.686-6-6-6S6 8.686 6 12c0 3.29 1.85 5.835 4.125 6.825M3.05 3L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12c0-1.657-1.343-3-3-3s-3 1.343-3 3m12 0c0 2.485-2.515 4.5-6 4.5S6 14.485 6 12m12 0c0-2.485-2.515-4.5-6-4.5S6 9.515 6 12m9 0a3 3 0 00-6 0"
                />
              </svg>
            )}
          </button>
        </div>
        {showAlert && (
          <div className="text-red-500 text-sm mt-2">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}