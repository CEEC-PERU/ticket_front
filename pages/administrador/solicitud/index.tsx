import React, { useState, useEffect } from 'react';
import { useAdminManagement } from '../../../hooks/management/useAdminManagement';
import {
  useUpdateRequest,
  useUpdateStateRequest,
  useUpdateStateRequestFinish,
} from '../../../hooks/ticket/updateTicket';
import { submitRejection } from '../../../services/ticket/rejectionTicket';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PencilSquareIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
  ListBulletIcon,
  Squares2X2Icon,
  TableCellsIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  UserIcon,
  DocumentTextIcon,
  FolderIcon,
  CalendarIcon,
  TagIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CheckIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Modal from '../../../components/Modal';
import DrawerSolicitante from '../../../components/administrador/DrawerAdministrador';
import Navbar from '../../../components/solicitante/Navbar';
import './../../../app/globals.css';

const statusColors = {
  REGISTRADO: 'bg-blue-100 text-blue-800',
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  'EN PROCESO': 'bg-purple-100 text-purple-800',
  FINALIZADO: 'bg-green-100 text-green-800',
  RECHAZADO: 'bg-red-100 text-red-800',
};

const priorityColors = {
  ALTA: 'bg-red-100 text-red-800',
  MEDIA: 'bg-yellow-100 text-yellow-800',
  BAJA: 'bg-green-100 text-green-800',
};

const statusIcons = {
  REGISTRADO: <ClockIcon className="h-5 w-5" />,
  PENDIENTE: <ExclamationTriangleIcon className="h-5 w-5" />,
  'EN PROCESO': <ArrowPathIcon className="h-5 w-5" />,
  FINALIZADO: <CheckCircleIcon className="h-5 w-5" />,
  RECHAZADO: <XCircleIcon className="h-5 w-5" />,
};

type ViewMode = 'list' | 'grid' | 'table';

export default function Solicitud() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { adminManagement, loading, error, refetch } = useAdminManagement();
  const { token, user } = useAuth();
  const [showRechazoModal, setShowRechazoModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [attentionTime, setAttentionTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('hours');
  const { handleUpdateRequest } = useUpdateRequest();
  const { handleUpdateStateRequest } = useUpdateStateRequest();
  const { handleUpdateStateFinish } = useUpdateStateRequestFinish();
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );
  const [newState, setNewState] = useState<string | null>(null);
  const userInfor = user as { id: number } | null;
  const [isUpdatingState, setIsUpdatingState] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null);
  const [isSavingTime, setIsSavingTime] = useState(false);
  const [filterState, setFilterState] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [statusCount, setStatusCount] = useState({
    REGISTRADO: 0,
    PENDIENTE: 0,
    'EN PROCESO': 0,
    FINALIZADO: 0,
    RECHAZADO: 0,
    total: 0,
  });

  // Calculate status counts
  useEffect(() => {
    const counts = {
      REGISTRADO: 0,
      PENDIENTE: 0,
      'EN PROCESO': 0,
      FINALIZADO: 0,
      RECHAZADO: 0,
      total: adminManagement.length,
    };

    adminManagement.forEach((request) => {
      const status = request.state.name.trim();
      if (status in counts) {
        counts[status as keyof typeof counts]++;
      }
    });

    setStatusCount(counts);
  }, [adminManagement]);

  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRejectionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRejectionReason(event.target.value);
  };

  const handleAttentionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttentionTime(event.target.value);
  };

  const handleRejection = async () => {
    if (!selectedRequestId) return;
    try {
      setIsRejecting(true);
      const rejection = {
        request_id: selectedRequestId,
        user_id: userInfor?.id || 0,
        reason: rejectionReason,
      };

      await submitRejection(rejection);
      refetch();
      setShowRechazoModal(false);
      setRejectionReason('');
    } catch (error) {
      console.error('Error al enviar el rechazo:', error);
    } finally {
      setIsRejecting(false);
    }
  };

  const toggleExpand = (requestId: number) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const handleSaveTime = async () => {
    if (selectedRequestId !== null) {
      let formattedAttentionTime;

      if (timeUnit === 'hours') {
        formattedAttentionTime = `${attentionTime} horas`;
      } else {
        // Para fechas, creamos un objeto Date y lo formateamos correctamente
        const date = new Date(attentionTime);
        // Añadimos un día para compensar la diferencia de zona horaria
        date.setDate(date.getDate() + 1);

        formattedAttentionTime = date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      const currentDate = new Date();

      const updatePayload = {
        is_aproved: true,
        attention_time: formattedAttentionTime,
        time_pendiente: currentDate,
      };

      try {
        setIsSavingTime(true);
        await handleUpdateRequest(selectedRequestId, updatePayload);
        refetch();
        setShowTimeModal(false);
        setAttentionTime('');
        setTimeUnit('hours');
      } catch (error) {
        console.error('Error al guardar el tiempo:', error);
      } finally {
        setIsSavingTime(false);
      }
    }
  };

  const handleUpdateState = async (requestId: number, newState: string) => {
    if (newState) {
      const updatePayload = {
        state_id: newState === 'En proceso' ? 4 : 4,
      };
      try {
        setIsUpdatingState(true);
        await handleUpdateStateRequest(requestId, updatePayload);
        refetch();
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
      } finally {
        setIsUpdatingState(false);
      }
    }
  };

  const handleUpdateState2 = async (requestId: number, newState: string) => {
    if (newState) {
      const updatePayload = {
        state_id: newState === 'En proceso' ? 2 : 2,
      };

      try {
        setIsUpdatingState(true);
        await handleUpdateStateFinish(requestId, updatePayload);
        refetch();
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
      } finally {
        setIsUpdatingState(false);
      }
    }
  };

  const filteredRequests = adminManagement.filter((request) => {
    if (filterState && request.state.name.trim() !== filterState) return false;
    return true;
  });

  const StatusCard = ({
    status,
    count,
  }: {
    status: keyof typeof statusColors;
    count: number;
  }) => (
    <div
      className={`p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${
        filterState === status ? 'ring-2 ring-purple-500' : ''
      }`}
      onClick={() => setFilterState(filterState === status ? '' : status)}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm capitalize">
            {status.toLowerCase()}
          </p>
          <h3
            className="text-2xl font-bold"
            style={{ color: statusColors[status].split(' ')[1] }}
          >
            {count}
          </h3>
        </div>
        <div className={`p-3 rounded-full ${statusColors[status]}`}>
          {statusIcons[status]}
        </div>
      </div>
    </div>
  );

  const DetailItem = ({
    icon,
    label,
    value,
    className = '',
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    className?: string;
  }) => (
    <div className={`flex items-start space-x-3 ${className}`}>
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );

  const RequestGridCard = ({ request }: { request: any }) => (
    <motion.div
      key={request.request_id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusColors[
                  request.state.name.trim() as keyof typeof statusColors
                ] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {request.state.name.trim()}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                priorityColors[
                  request.Level?.name as keyof typeof priorityColors
                ] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {request.Level?.name || 'Sin prioridad'}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(request.created_at)}
          </span>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {request.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          #{request.number_ticket} · {request.campaign?.name}
        </p>

        <div className="space-y-3 mb-4">
          <DetailItem
            icon={<UserIcon className="h-4 w-4 text-gray-400" />}
            label="Solicitante"
            value={`${request.user?.profile?.name} ${request.user?.profile?.lastname}`}
          />
          <DetailItem
            icon={<TagIcon className="h-4 w-4 text-gray-400" />}
            label="Tipo de gestión"
            value={request.TypeManagement?.name}
          />
          <DetailItem
            icon={<ShieldCheckIcon className="h-4 w-4 text-gray-400" />}
            label="Estado aprobación"
            value={
              request.is_aproved === null
                ? 'Por aprobar'
                : request.is_aproved
                ? 'Aprobado'
                : 'Rechazado'
            }
          />
          {request.attention_time && (
            <DetailItem
              icon={<UserGroupIcon className="h-4 w-4 text-gray-400" />}
              label="Tiempo estimado"
              value={request.attention_time}
            />
          )}
        </div>

        {request.state.name.trim() === 'REGISTRADO' && (
          <div className="flex justify-between pt-3 border-t border-gray-200">
            <button
              onClick={() => {
                setSelectedRequestId(request.request_id);
                setShowRechazoModal(true);
              }}
              className="text-red-600 hover:text-red-800 flex items-center text-sm"
            >
              <XCircleIcon className="h-4 w-4 mr-1" />
              Rechazar
            </button>
            <button
              onClick={() => {
                setSelectedRequestId(request.request_id);
                setShowTimeModal(true);
              }}
              className="text-green-600 hover:text-green-800 flex items-center text-sm"
            >
              <CheckIcon className="h-4 w-4 mr-1" />
              Aprobar
            </button>
          </div>
        )}

        {/* State Update Section */}
        {request.state.name.trim() === 'PENDIENTE' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Actualizar estado del ticket
            </h4>
            <div className="flex items-center space-x-4">
              <select
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={newState || ''}
                onChange={(e) => setNewState(e.target.value)}
              >
                <option value="">Seleccionar...</option>
                <option value="En proceso">En proceso</option>
              </select>
              <button
                onClick={() =>
                  handleUpdateState(request.request_id, newState || '')
                }
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                disabled={isUpdatingState || !newState}
              >
                {isUpdatingState ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </div>
        )}

        {request.state.name.trim() === 'EN PROCESO' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Finalizar ticket
            </h4>
            <div className="flex items-center space-x-4">
              <select
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={newState || ''}
                onChange={(e) => setNewState(e.target.value)}
              >
                <option value="">Seleccionar...</option>
                <option value="En proceso">Finalizar</option>
              </select>
              <button
                onClick={() =>
                  handleUpdateState2(request.request_id, newState || '')
                }
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={isUpdatingState || !newState}
              >
                {isUpdatingState ? 'Finalizando...' : 'Finalizar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const RequestTableRow = ({ request }: { request: any }) => (
    <motion.tr
      key={request.request_id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border-b border-gray-200 hover:bg-gray-50"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 h-3 w-3 rounded-full ${
              request.state.name.trim() === 'FINALIZADO'
                ? 'bg-green-500'
                : request.state.name.trim() === 'EN PROCESO'
                ? 'bg-purple-500'
                : request.state.name.trim() === 'PENDIENTE'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          ></div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {request.title}
            </div>
            <div className="text-sm text-gray-500">
              #{request.number_ticket}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{request.campaign?.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[
                request.state.name.trim() as keyof typeof statusColors
              ] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {request.state.name.trim()}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              priorityColors[
                request.Level?.name as keyof typeof priorityColors
              ] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {request.Level?.name || 'Sin prioridad'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {request.user?.profile?.name} {request.user?.profile?.lastname}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(request.created_at)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {request.state.name.trim() === 'REGISTRADO' && (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedRequestId(request.request_id);
                setShowRechazoModal(true);
              }}
              className="text-red-600 hover:text-red-900"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setSelectedRequestId(request.request_id);
                setShowTimeModal(true);
              }}
              className="text-green-600 hover:text-green-900"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </td>
    </motion.tr>
  );

  const ExpandedContent = ({ request }: { request: any }) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="px-6 pb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Left Column */}
        <div className="space-y-4">
          <DetailItem
            icon={<CalendarIcon className="h-5 w-5 text-gray-400" />}
            label="Fecha de creación"
            value={formatDate(request.created_at)}
          />

          <DetailItem
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
            label="Solicitante"
            value={`${request.user?.profile?.name} ${request.user?.profile?.lastname}`}
          />

          <DetailItem
            icon={<TagIcon className="h-5 w-5 text-gray-400" />}
            label="Tipo de gestión"
            value={request.TypeManagement?.name}
          />

          <DetailItem
            icon={<DocumentTextIcon className="h-5 w-5 text-gray-400" />}
            label="Detalle de gestión"
            value={request.detailManagement?.name}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <DetailItem
            icon={<ShieldCheckIcon className="h-5 w-5 text-gray-400" />}
            label="Estado de aprobación"
            value={
              request.is_aproved === null
                ? 'Por aprobar'
                : request.is_aproved
                ? 'Aprobado'
                : 'Rechazado'
            }
          />

          <DetailItem
            icon={<UserGroupIcon className="h-5 w-5 text-gray-400" />}
            label="Responsable"
            value={
              request.adminTickets?.length > 0
                ? `${request.adminTickets[0]?.adminUser?.profile?.name} ${request.adminTickets[0]?.adminUser?.profile?.lastname}`
                : 'No asignado'
            }
          />

          {request.attention_time && (
            <DetailItem
              icon={<UserGroupIcon className="h-5 w-5 text-gray-400" />}
              label="Tiempo estimado"
              value={request.attention_time}
            />
          )}

          {request.Rejections?.length > 0 && (
            <DetailItem
              icon={
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              }
              label="Motivo de rechazo"
              value={request.Rejections[0]?.reason}
              className="text-red-600"
            />
          )}
        </div>
      </div>

      {/* Timeline */}
      {request.adminTickets?.length > 0 &&
        request.adminTickets[0]?.timeTickets?.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
              Historial del ticket
            </h4>
            <div className="space-y-3">
              {request.adminTickets[0].timeTickets.map(
                (timeTicket: any, index: number) => (
                  <React.Fragment key={index}>
                    {timeTicket?.time_pendiente && (
                      <DetailItem
                        icon={
                          <div className="flex-shrink-0 h-2.5 w-2.5 mt-1.5 bg-blue-500 rounded-full"></div>
                        }
                        label="Aprobación"
                        value={formatDate(timeTicket.time_pendiente)}
                      />
                    )}

                    {timeTicket?.time_proceso && (
                      <DetailItem
                        icon={
                          <div className="flex-shrink-0 h-2.5 w-2.5 mt-1.5 bg-purple-500 rounded-full"></div>
                        }
                        label="En proceso"
                        value={formatDate(timeTicket.time_proceso)}
                      />
                    )}

                    {timeTicket?.time_finalizado && (
                      <DetailItem
                        icon={
                          <div className="flex-shrink-0 h-2.5 w-2.5 mt-1.5 bg-green-500 rounded-full"></div>
                        }
                        label="Finalizado"
                        value={formatDate(timeTicket.time_finalizado)}
                      />
                    )}
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        )}

      {/* Details and Files */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
          <FolderIcon className="h-4 w-4 mr-2 text-gray-400" />
          Detalles y archivos
        </h4>
        {request.Detail_Requests?.map((detail: any, index: number) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
            <p className="text-sm text-gray-900">{detail.detail_name}</p>
            {detail.fileDetails?.length > 0 ? (
              <div className="mt-2 space-y-2">
                {detail.fileDetails.map((file: any, fileIndex: number) => (
                  <a
                    key={fileIndex}
                    href={file.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                    Archivo adjunto {fileIndex + 1}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                Sin archivos adjuntos
              </p>
            )}
          </div>
        ))}
      </div>

      {request.state.name.trim() === 'REGISTRADO' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4"></div>
          <button
            onClick={() => {
              setSelectedRequestId(request.request_id);
              setShowRechazoModal(true);
            }}
            className="text-red-600 hover:text-red-800 flex items-center text-sm"
          >
            <XCircleIcon className="h-4 w-4 mr-1" />
            Rechazar
          </button>
          <button
            onClick={() => {
              setSelectedRequestId(request.request_id);
              setShowTimeModal(true);
            }}
            className="text-green-600 hover:text-green-800 flex items-center text-sm"
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            Aprobar
          </button>
        </div>
      )}

      {/* State Update Section */}
      {request.state.name.trim() === 'PENDIENTE' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Actualizar estado del ticket
          </h4>
          <div className="flex items-center space-x-4">
            <select
              className="flex-1 p-2 border border-gray-300 rounded-md"
              value={newState || ''}
              onChange={(e) => setNewState(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="En proceso">En proceso</option>
            </select>
            <button
              onClick={() =>
                handleUpdateState(request.request_id, newState || '')
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              disabled={isUpdatingState || !newState}
            >
              {isUpdatingState ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </div>
      )}

      {request.state.name.trim() === 'EN PROCESO' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Finalizar ticket
          </h4>
          <div className="flex items-center space-x-4">
            <select
              className="flex-1 p-2 border border-gray-300 rounded-md"
              value={newState || ''}
              onChange={(e) => setNewState(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="En proceso">Finalizar</option>
            </select>
            <button
              onClick={() =>
                handleUpdateState2(request.request_id, newState || '')
              }
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              disabled={isUpdatingState || !newState}
            >
              {isUpdatingState ? 'Finalizando...' : 'Finalizar'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Drawer */}
      <DrawerSolicitante
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          showSidebar ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Navbar */}
        <Navbar
          bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]"
          paddingtop="pt-4"
        />

        {/* Main Content */}
        <div className="p-6 max-w-7xl mx-auto mt-20">
          {/* Header and Filters */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Gestión de Solicitudes
                </h1>
                <p className="text-gray-600">
                  Administra y revisa todas las solicitudes
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow text-purple-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Squares2X2Icon className="h-4 w-4" />
                  <span>Tarjetas</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                    viewMode === 'list'
                      ? 'bg-white shadow text-purple-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <ListBulletIcon className="h-4 w-4" />
                  <span>Lista</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
                    viewMode === 'table'
                      ? 'bg-white shadow text-purple-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <TableCellsIcon className="h-4 w-4" />
                  <span>Tabla</span>
                </button>
              </div>
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <StatusCard status="REGISTRADO" count={statusCount.REGISTRADO} />
              <StatusCard status="PENDIENTE" count={statusCount.PENDIENTE} />
              <StatusCard
                status="EN PROCESO"
                count={statusCount['EN PROCESO']}
              />
              <StatusCard status="FINALIZADO" count={statusCount.FINALIZADO} />
              <StatusCard status="RECHAZADO" count={statusCount.RECHAZADO} />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
                  {filterState || 'Todos los estados'}
                  <ChevronDownIcon
                    className={`h-5 w-5 ml-2 transition-transform ${
                      isFilterOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setFilterState('');
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          !filterState
                            ? 'bg-purple-100 text-purple-800'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        Todos los estados
                      </button>
                      {Object.keys(statusColors).map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            setFilterState(state);
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            filterState === state
                              ? 'bg-purple-100 text-purple-800'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Error al cargar las solicitudes: {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredRequests.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No se encontraron solicitudes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filterState
                  ? 'No hay solicitudes que coincidan con los filtros aplicados.'
                  : 'No hay solicitudes pendientes de revisión.'}
              </p>
            </div>
          )}

          {/* Request List - List View */}
          {!loading &&
            !error &&
            filteredRequests.length > 0 &&
            viewMode === 'list' && (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredRequests.map((request) => (
                    <motion.div
                      key={request.request_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                      {/* Request Header */}
                      <div
                        className="px-6 py-4 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleExpand(request.request_id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`flex-shrink-0 h-3 w-3 rounded-full ${
                              request.state.name.trim() === 'FINALIZADO'
                                ? 'bg-green-500'
                                : request.state.name.trim() === 'EN PROCESO'
                                ? 'bg-purple-500'
                                : request.state.name.trim() === 'PENDIENTE'
                                ? 'bg-yellow-500'
                                : 'bg-blue-500'
                            }`}
                          ></div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {request.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              #{request.number_ticket} ·{' '}
                              {request.campaign?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statusColors[
                                request.state.name.trim() as keyof typeof statusColors
                              ] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {request.state.name.trim()}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              priorityColors[
                                request.Level
                                  ?.name as keyof typeof priorityColors
                              ] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {request.Level?.name || 'Sin prioridad'}
                          </span>
                          <ChevronDownIcon
                            className={`h-5 w-5 text-gray-500 transition-transform ${
                              expandedRequest === request.request_id
                                ? 'transform rotate-180'
                                : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedRequest === request.request_id && (
                        <ExpandedContent request={request} />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

          {/* Request Grid - Card View */}
          {!loading &&
            !error &&
            filteredRequests.length > 0 &&
            viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredRequests.map((request) => (
                    <RequestGridCard
                      key={request.request_id}
                      request={request}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

          {/* Request Table - Table View */}
          {!loading &&
            !error &&
            filteredRequests.length > 0 &&
            viewMode === 'table' && (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Solicitud
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Campaña
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Estado y Prioridad
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Solicitante
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fecha
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredRequests.map((request) => (
                        <RequestTableRow
                          key={request.request_id}
                          request={request}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>

      {/* Rechazo Modal tengan solo los tickets que tienen estado registrado y que en la lista 
      tambien se muestre los botones para aprobar y rechazar */}
      <Modal
        isOpen={showRechazoModal}
        onClose={() => setShowRechazoModal(false)}
      >
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Motivo de Rechazo
            </h3>
            <button
              onClick={() => setShowRechazoModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-4">
            <div>
              <label
                htmlFor="rejectionReason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Por favor, indique el motivo del rechazo
              </label>
              <textarea
                id="rejectionReason"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={rejectionReason}
                onChange={handleRejectionChange}
                placeholder="Escriba aquí el motivo del rechazo..."
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowRechazoModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleRejection}
              disabled={isRejecting || !rejectionReason}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRejecting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Rechazar Solicitud'
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Time Modal */}
      <Modal isOpen={showTimeModal} onClose={() => setShowTimeModal(false)}>
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Tiempo de Atención
            </h3>
            <button
              onClick={() => setShowTimeModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Establecer tiempo de atención
              </label>
              <div className="flex items-center gap-2">
                {timeUnit === 'hours' ? (
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Ingrese el tiempo en horas"
                    value={attentionTime}
                    onChange={handleAttentionTimeChange}
                  />
                ) : (
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={attentionTime}
                    onChange={handleAttentionTimeChange}
                  />
                )}
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                >
                  <option value="hours">Horas</option>
                  <option value="days">Fecha</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowTimeModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveTime}
              disabled={isSavingTime || !attentionTime}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSavingTime ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                'Aprobar Solicitud'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
