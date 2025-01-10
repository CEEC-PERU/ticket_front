import React, { useState, useEffect } from 'react';
import { useTypeClients } from '../../../hooks/client/useTypeClient';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/solicitante/DrawerSolicitante';
import './../../../app/globals.css';

export default function Solicitud() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { typeClients, loading, error } = useTypeClients();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white text-black">
      {/* Sidebar */}
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 text-black ${
          showSidebar ? 'ml-64' : 'ml-16'
        }`}
      >
        <Navbar bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]" paddingtop="pt-4" />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-black">Ingresa Solicitud</h1>
          {/* Form Section */}
          <form className="bg-gray-100 p-6 rounded-lg shadow-md">
            {/* Cliente Section */}
            <div className="mb-4">
              <label htmlFor="cliente" className="block text-lg font-semibold mb-2">
                Tipo de Cliente
              </label>
              <select
                id="cliente"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8]"
              >
                {typeClients.map((client) => (
            <option value={client.client_id}>{client.name}</option> 
        ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#682cd8] text-white py-2 px-4 rounded-lg font-bold hover:bg-gradient-to-l transition duration-300"
            >
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
