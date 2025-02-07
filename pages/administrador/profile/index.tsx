import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import { useRegisterUser } from '../../../hooks/user/useRegisterUser';
import Modal from '../../../components/Modal';
import './../../../app/globals.css';
import { UserPlusIcon } from '@heroicons/react/24/solid';

export default function Clientes() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className={`flex-1 p-6 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-16'}`}>
        <Navbar bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]" paddingtop="pt-4" />

        <div className="relative max-w-7xl mx-auto pt-16">
          

          <h1 className="text-4xl font-semibold mb-6 text-blue-700 pt-5">Perfil </h1>

        </div>
      </div>

    </div>
  );
}
