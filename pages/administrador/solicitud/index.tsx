import React, { useState } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import './../../../app/globals.css';
import Image from 'next/image';
import { useAdminManagement } from '../../../hooks/management/useAdminManagement';
import { motion } from 'framer-motion';

export default function Solicitud() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { adminManagement, loading, error } = useAdminManagement();

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
         

          {loading && <p className="text-gray-500">Cargando solicitudes...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
              {adminManagement.map((request) => (
                <motion.div
                  key={request.request_id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:shadow-xl border border-gray-200"
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1] p-4">
                    <h2 className="text-lg font-semibold text-white">
                      {request.title}
                    </h2>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                  <p className="text-sm text-gray-600">
                      <strong>Usuario Solicitante:</strong>  {request.user?.profile?.name } {request.user?.profile?.lastname}{' '}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Campaña:</strong> {request.campaign.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Cliente:</strong> {request.TypeClient.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Estado:</strong> {request.state.name.trim()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Gestión:</strong> {request.detailManagement.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Número de Ticket:</strong> {request.number_ticket}
                    </p>

                    {/* Detalles y Archivos */}
                    <div className="mt-4">
                      {request.Detail_Requests.map((detail, index) => (
                        <div key={index} className="mt-2">
                          <p className="text-sm text-gray-600">
                            <strong>Detalle:</strong> {detail.detail_name}
                          </p>
                          {detail.fileDetails.length > 0 ? (
                            detail.fileDetails.map((file, fileIndex) => (
                              <a
                                key={fileIndex}
                                href={file.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 text-sm underline block hover:text-blue-700"
                              >
                                Descargar archivo {fileIndex + 1}
                              </a>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm">Sin archivos adjuntos</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
