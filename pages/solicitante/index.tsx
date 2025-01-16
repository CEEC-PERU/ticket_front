import React, { useState } from 'react';
import Navbar from '../../components/solicitante/Navbar';
import DrawerSolicitante from '../../components/solicitante/DrawerSolicitante';
import './../../app/globals.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Solicitante() {
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
          {/* Animated Background */}
          <div className="absolute inset-0 shadow-md  rounded-md z-0 bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1] animate-gradient-move "></div>
          
          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center text-center ">
            {/* Logo with Bounce Animation */}
            <motion.div
              className="mb-10"
              initial={{ scale: 0.8, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                duration: 1.5,
              }}
            >
              <Image
                src="https://res.cloudinary.com/dk2red18f/image/upload/v1736456728/Ticket-Qtech/qezajo2gt28smeku6e7e.png"
                alt="Company Logo"
                width={200}
                height={200}
                className="mx-auto drop-shadow-xl"
              />
            </motion.div>

            {/* Animated Welcome Message */}
            <motion.h1
              className="text-5xl font-extrabold text-white drop-shadow-lg mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              Bienvenido, ¡estás listo para gestionar tus solicitudes!
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg text-white mb-8 drop-shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              Explora tus opciones de manera eficiente y rápida. ¡Vamos a comenzar!
            </motion.p>

            {/* Call-to-Action Button with Pulse Effect */}
            <motion.button
              className="px-8 py-3 bg-white text-[#682cd8] font-semibold rounded-lg shadow-lg  hover:bg-[#f1f1f1] hover:text-[#7959ef] transition-all duration-300 mb-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.05, 1],
                transition: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2,
                },
              }}
            >
              Ver Solicitudes
            </motion.button>
          </div>
        </div>
      </div>

      {/* Styles for Animated Background */}
      <style jsx global>{`
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
