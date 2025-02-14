import React, { useState } from 'react';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import './../../../app/globals.css';
import Image from 'next/image';
import { useAdminManagement } from '../../../hooks/management/useAdminManagement';
import { useUpdateRequest  , useUpdateStateRequest, useUpdateStateRequestFinish} from '../../../hooks/ticket/updateTicket'; // Asegúrate de importar el hook correctamente.
import { submitRejection } from '../../../services/ticket/rejectionTicket';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';

// Modal components
import Modal from '../../../components/Modal';


export default function Solicitud() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { adminManagement, loading, error , refetch} = useAdminManagement();
  console.log(adminManagement)
  const { token , user } = useAuth();
 // States for modals
 const [showRechazoModal, setShowRechazoModal] = useState(false);
 const [showTimeModal, setShowTimeModal] = useState(false);
 const [rejectionReason, setRejectionReason] = useState('');
 const [attentionTime, setAttentionTime] = useState('');
const [timeUnit, setTimeUnit] = useState("hours");
const { handleUpdateRequest } = useUpdateRequest(); // Usa el hook aquí.
const { handleUpdateStateRequest } = useUpdateStateRequest();
const { handleUpdateStateFinish } = useUpdateStateRequestFinish();
const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null); // Estado para almacenar el requestId
const [newState, setNewState] = useState<string | null>(null); // State for selecting new state
const userInfor = user as { id: number } | null;

const [isUpdatingState, setIsUpdatingState] = useState(false);
const [isRejecting, setIsRejecting] = useState(false);
const [isSavingTime, setIsSavingTime] = useState(false);

const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setNewState(e.target.value);
};


  // Update the handler type to match the textarea's event
const handleRejectionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  setRejectionReason(event.target.value);
};


  // Handle Attention Time change
  const handleAttentionTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttentionTime(event.target.value);
  };

  const handleRejection = async () => {
    if (!selectedRequestId) return;
    try {
      setIsRejecting(true);
      const rejection = {
        request_id:  selectedRequestId,
        user_id : userInfor?.id || 0,
        reason: rejectionReason,
      };

      await submitRejection( rejection);
      refetch(); // Actualizar la lista después del rechazo
      setShowRechazoModal(false);
      // Reset rejection reason after submission
      setRejectionReason(''); // Clear the rejection reason input
    } catch (error) {
      console.error("Error al enviar el rechazo:", error);
    }
  };
  
// Function to format the date


const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};



  // Handle "Guardar Tiempo" action
  const handleSaveTime = async () => {
    if (selectedRequestId !== null) {
      const formattedAttentionTime = `${attentionTime} ${timeUnit === 'hours' ? 'horas' : 'días'}`;

      const currentDate = new Date(); // Obtienes la fecha y hora actual



      const updatePayload = {
        is_aproved: true,
        attention_time: formattedAttentionTime,
        time_pendiente :  currentDate
      };

      try {
        setIsSavingTime(true); // Set loading to true
        await handleUpdateRequest(selectedRequestId, updatePayload);
        refetch();
        setShowTimeModal(false);
        setAttentionTime(''); // Clear the attention time input
        setTimeUnit('hours'); // Reset the time unit to hours
      } catch (error) {
        console.error("Error al guardar el tiempo:", error);
      } finally {
        setIsSavingTime(false); // Set loading to false
      }
    }
  };



  const handleUpdateState = async (requestId: number, newState: string) => {
    if (newState) {
      const updatePayload = {
        state_id: newState === 'En proceso' ? 4 : 4, // Estado 4: En proceso, Estado 2: Cerrado
      };
      try {
        setIsUpdatingState(true); // Set loading to true
        await handleUpdateStateRequest(requestId, updatePayload);
        refetch();
      } catch (error) {
        console.error("Error al actualizar el estado:", error);
      } finally {
        setIsUpdatingState(false); // Set loading to false
      }
    
    }
  };


  const handleUpdateState2 = async (requestId: number, newState: string) => {
    if (newState) {
      const updatePayload = {
        state_id: newState === 'En proceso' ? 2 : 2,
      };

      try {
        setIsUpdatingState(true); // Set loading to true
        await handleUpdateStateFinish(requestId, updatePayload);
        refetch();
      } catch (error) {
        console.error("Error al actualizar el estado:", error);
      } finally {
        setIsUpdatingState(false); // Set loading to false
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
                  <h4 className="text-sm text-gray-600">
                      <strong>Prioridad:</strong>   {request.Level?.name}
                    </h4>
                    <p className="text-sm text-blue-800">
                      <strong>Estado de Ticket:</strong> {request.state.name.trim()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Número de Ticket:</strong> {request.number_ticket}
                    </p>
                  <p className="text-sm text-gray-600">
                      <strong>Usuario Solicitante:</strong>  {request.user?.profile?.name } {request.user?.profile?.lastname}{' '}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Campaña:</strong> {request.campaign?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Cliente:</strong> {request.TypeClient?.name}
                    </p>
                    
                    <p className="text-sm text-gray-600">
                      <strong>Gestión:</strong> {request.detailManagement.name}
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
    <strong>Responsable:</strong> {request.adminTickets[0].adminUser?.profile?.name} {request.adminTickets[0].adminUser?.profile?.lastname}
  </p>
) : (
  <p className="text-sm text-gray-600 ">
    <strong>Responsable:</strong> No hay responsable asignado
  </p>
)}


{request.attention_time?.length > 0 ? (
  <p className="text-sm text-gray-600">
    <strong>Tiempo de Atención Estimado:</strong> {request.attention_time}
  </p>
) : (
  <p className="text-sm text-gray-600 ">
    <strong>Tiempo de Atención Estimado:</strong> No designa tiempo estimado
  </p>
)}


{/* Display time tickets in formatted date */}
{request.adminTickets.length > 0 && request.adminTickets[0].timeTickets.length > 0 && (
                      <div className="mt-4">
                        {request.adminTickets[0].timeTickets.map((timeTicket, index) => (
                          <div key={index} className="text-sm text-gray-600">
                           
                            {timeTicket?.time_pendiente && (
  <p><strong>Fecha de aprobación:</strong> {formatDate(timeTicket.time_pendiente)}</p>
)}

{timeTicket?.time_proceso && (
  <p><strong>Tiempo de inicio:</strong> {formatDate(timeTicket.time_proceso)}</p>
)}

{timeTicket?.time_finalizado && (
  <p><strong>Tiempo finalizado:</strong> {formatDate(timeTicket.time_finalizado)}</p>
)}

                          </div>
                        ))}
                      </div>
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

                    {/* Mostrar el selector solo si el estado es "PENDIENTE" */}

 <div className="mt-4">
                      {request.Rejections.map((detail, index) => (
                        <div key={index} className="mt-2">
                          <p className="text-sm text-red-700">
                            <strong>Motivo de Rechazo:</strong> {detail.reason}
                          </p>
                        
                        </div>
                      ))}
                      
                    </div>



{request.state.name.trim() === 'PENDIENTE' && (
  <div className="mt-4">
    <p className="text-sm text-gray-600">
      <strong>Seleccione nuevo estado:</strong>
    </p>
    <select
      className="p-2 border border-gray-300 rounded-md"
      value={newState || ''}
      onChange={handleStateChange}
    >
      <option value="">Seleccionar...</option>
      <option value="En proceso">En proceso</option>
    </select>
    <button
                          onClick={() => handleUpdateState(request.request_id, newState || '')}
                          className="bg-blue-500 ml-4 text-white p-2 rounded-md mt-2"
                          disabled={isUpdatingState || !newState}
                        >
                          {isUpdatingState ? 'Cargando...' : 'Actualizar Estado'}
                        </button>
  </div>
)}

{request.state.name.trim() === 'EN PROCESO' && (
  <div className="mt-4">
    <p className="text-sm text-gray-600">
      <strong>Seleccione nuevo estado:</strong>
    </p>
    <select
      className="p-2 border border-gray-300 rounded-md"
      value={newState || ''}
      onChange={handleStateChange}
    >
      <option value="">Seleccionar...</option>
      <option value="En proceso">Finalizado</option>
    </select>
    <button
                          onClick={() => handleUpdateState2(request.request_id, newState || '')}
                          className="bg-blue-500 ml-4 text-white p-2 rounded-md mt-2"
                          disabled={isUpdatingState || !newState}
                        >
                          {isUpdatingState ? 'Cargando...' : 'Actualizar Estado'}
                        </button>
  </div>
)}
</div>


                   {/* Action buttons at the bottom */}
                   {!request.is_aproved && (
                    <div className="flex justify-between p-4 border-t border-gray-200">
                      <button onClick={() => {
                         setSelectedRequestId(request.request_id);
                         setShowRechazoModal(true)}}
                          className="bg-red-500 text-white p-2 rounded-full">X</button>
                      <button
                        onClick={() => {
                          setSelectedRequestId(request.request_id);
                          setShowTimeModal(true);
                        }}
                        className="bg-green-500 text-white p-2 rounded-full"
                      >
                        ✔
                      </button>
                    </div>
                  )}
                
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Rechazo Modal */}
      {showRechazoModal && (
        <Modal title="Detalle de Rechazo" onClose={() => setShowRechazoModal(false)}>
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Escriba el motivo del rechazo..."
              value={rejectionReason}
              onChange={handleRejectionChange}
            />
           <button
              onClick={handleRejection}
              className="bg-red-500 text-white p-2 rounded-md"
              disabled={isRejecting}
            >
              {isRejecting ? 'Enviando...' : 'Enviar Rechazo'}
            </button>

          </div>
        </Modal>
      )}

      {/* Time Modal */}
      {showTimeModal && (
  <Modal title="Ingresar Tiempo de Atención" onClose={() => setShowTimeModal(false)}>
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Ingrese el tiempo"
          value={attentionTime}
          onChange={handleAttentionTimeChange}
        />
        <select
          className="p-3 border border-gray-300 rounded-md"
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
        >
          <option value="hours">Horas</option>
          <option value="days">Días</option>
        </select>
      </div>
      

      <button
              onClick={handleSaveTime}
              className="bg-green-500 text-white p-2 rounded-md"
              disabled={isSavingTime}
            >
              {isSavingTime ? 'Guardando...' : 'Guardar Tiempo'}
            </button>
    </div>
  </Modal>
)}

    </div>
  );
}
