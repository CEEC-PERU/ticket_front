import React, { useState } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import './../../../app/globals.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Solicitud() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-white text-black">
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
          paddingtop="pt-4 "
        />
        
        {/* Home Content */}
        <div className="relative max-w-7xl mx-auto pt-32 overflow-hidden mt-60">
         
        </div>
      </div>

      
    </div>
  );
}
