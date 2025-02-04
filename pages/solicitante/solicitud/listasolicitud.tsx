import React, { useState } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/solicitante/DrawerSolicitante';
import './../../../app/globals.css';
import Image from 'next/image';
import { RequestClient} from '../../../interfaces/ticket/Request';
import { useRequestClient } from '../../../hooks/ticket/clienteTicket';
import {useUpdateRequest} from '../../../hooks/ticket/detailRequest'; // Asegúrate de importar el hook correctamente.
import { submitRejection } from '../../../services/ticket/rejectionTicket';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import {PencilSquareIcon} from '@heroicons/react/24/solid';
// Modal components
import Modal from '../../../components/Modal';
import { userInfo } from 'os';

export default function ListaSolicitud() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { requestclient, loading, error , refetch} = useRequestClient();
  const { token , user } = useAuth();

  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [selectedRequest, setSelectedRequest] = useState<RequestClient | null>(null);
  const [newDetail, setNewDetail] = useState<string>(''); // New detail input for editing
  const [newFiles, setNewFiles] = useState<File[]>([]); // Files to upload

const { updateDetailRequest  } = useUpdateRequest();
const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null); // Estado para almacenar el requestId

const userInfor = user as { id: number } | null;




const handleEditClick = (request: RequestClient) => {
    setSelectedRequest(request);
    setShowModal(true);
    setNewDetail(request.Detail_Requests[0]?.detail_name || ''); // Pre-populate with existing detail
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles([...newFiles, ...Array.from(e.target.files)]);
    }
  };

 
  const handleSaveChanges = async () => {
    if (selectedRequest) {
      const result = await updateDetailRequest(selectedRequest.request_id, newDetail, newFiles);
      if (result) {
        setShowModal(false); // Cerrar el modal si la actualización fue exitosa
        // Aquí puedes agregar lógica para refetch o actualizar el estado de la solicitud
      }
    }
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
         

          {loading && <p className="text-gray-500">Cargando solicitudes...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
              {requestclient.map((request) => (
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
                    <p className="text-sm text-gray-600">
  <strong>Estado de Aprobación:</strong>{" "}
  {request?.is_aproved === null
    ? "Por aprobar"
    : request?.is_aproved
    ? "Aprobado"
    : "Rechazado"}
</p>






                    {request.adminTickets.length > 0 ? (
  <p className="text-sm text-gray-600">
    <strong>Responsable:</strong> {request.adminTickets[0].adminUser.profile.name} {request.adminTickets[0].adminUser.profile.lastname}
  </p>
) : (
  <p className="text-sm text-gray-600 ">
    <strong>Responsable:</strong> No hay responsable asignado
  </p>
)}


                    


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
                   

                    <div className="mt-4">
                      {request.Rejections.map((detail, index) => (
                        <div key={index} className="mt-2">
                          <p className="text-sm text-red-700">
                            <strong>Motivo de Rechazo:</strong> {detail.reason}
                          </p>
                        
                        </div>
                      ))}
                       {/* Show edit pencil if is_aproved is false */}
                       {request.is_aproved === false && (
  <div className="flex justify-end mt-4">  {/* Flexbox container to align content to the right */}
    <PencilSquareIcon
      className="cursor-pointer w-10 h-10 text-blue-500 hover:text-blue-700"
      onClick={() => handleEditClick(request)} 
    />
  </div>
)}
                    </div>

                 
                  </div>


                   
                
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>


    {/* Modal for editing request details */}
    {showModal && selectedRequest && (
        <Modal title="Editar Solicitud" onClose={handleModalClose}>
          <div className="mt-4">
            <label className="block text-sm">Detalle</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Adjuntar más archivos </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="mt-2">
              {newFiles.length > 0 && (
                <ul>
                  {newFiles.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mt-6 text-right">
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={handleSaveChanges}
            >
              Guardar cambios
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
}
