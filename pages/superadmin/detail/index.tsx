import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
  UserPlusIcon,
  UserCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSuperAdmin from '../../../components/superadmin/DrawerSuperadmin';
import './../../../app/globals.css';
import { useAdminDetail } from '../../../hooks/user/useAdministrador';
import { AdminDetails } from '@/interfaces/user/superadmin';

const Detail: React.FC = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [admins, setAdmins] = useState<AdminDetails[]>([]);
  const { userId } = router.query;

  const userIdNumber = Array.isArray(userId)
    ? parseInt(userId[0])
    : parseInt(userId || '0');
  const { administradores } = useAdminDetail(userIdNumber);
  console.log(administradores);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filtrar tickets
  const filteredTickets = administradores.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || ticket.state === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]"
        toggleSidebar={() => setShowSidebar(!showSidebar)}
        showMenuButton={true}
      />

      <div className="flex flex-1 pt-16">
        <DrawerSuperAdmin
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <main
          className={`flex-1 transition-all duration-300 ${
            showSidebar ? 'ml-64' : 'ml-16'
          }`}
        >
          <div className="p-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Panel de SuperAdmin
              </h1>
              <p className="text-gray-600">
                Monitoreo y gestión de administradores y tickets
              </p>
            </div>

            {/* Tabs */}

            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={`Buscar ${'tickets...'}`}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#682cd8] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#682cd8] focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="EN PROCESO">En proceso</option>
              </select>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#682cd8]"></div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Administrador
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket Registrado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Programada
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTickets.map((ticket) => (
                          <tr
                            key={ticket.adminticket_id}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {ticket.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                #{ticket.number_ticket}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {ticket.name} {ticket.lastname}
                              </div>
                              <div className="text-sm text-gray-500">
                                {ticket.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  ticket.state === 'EN PROCESO'
                                    ? 'bg-blue-100 text-blue-800'
                                    : ticket.state === 'PENDIENTE'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : ticket.state === 'FINALIZADO'
                                }`}
                              >
                                {ticket.state}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(
                                  ticket.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {ticket.attention_time}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Detail;
