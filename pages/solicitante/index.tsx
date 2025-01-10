import React, { useState } from 'react';
import Navbar from '../../components/solicitante/Navbar';
import DrawerSolicitante from '../../components/solicitante/DrawerSolicitante';
import './../../app/globals.css';

export default function Solicitante() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-white text-black">
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`flex-1 p-6 transition-all duration-300 text-black ${
          showSidebar ? 'ml-64' : 'ml-16'
        }`}
      >
        <Navbar bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]" paddingtop="pt-4" />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Solicitante</h1>
        </div>
      </div>
    </div>
  );
}
