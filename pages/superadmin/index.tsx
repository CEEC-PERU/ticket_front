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
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/solicitante/Navbar';
import DrawerSuperAdmin from '../../components/superadmin/DrawerSuperadmin';
import AdminStatsCard from '../../components/superadmin/AdminStatsCard';
import AdminTable from '../../components/superadmin/AdminTable';
import AdminPerformanceChart from '../../components/superadmin/TicketStatusChart';
import AdminActivityChart from '../../components/superadmin/AdminActivityChart';
import { useSuperAdmin } from '../../hooks/user/useAdministrador';
import './../../app/globals.css';
interface Admin {
  id: string;
  name: string;
  email: string;
  status: 'available' | 'unavailable';
  pendingTickets: number;
  overdueTickets: number;
  lastActivity: string;
}

interface Ticket {
  id: string;
  title: string;
  adminId: string;
  adminName: string;
  status: 'registrado' | 'pendiente' | 'en proceso' | 'finalizado';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const SuperAdminDashboard: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const { administradores } = useSuperAdmin();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'admins' | 'tickets'>('admins');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Contar administradores con 0 pendientes Y 0 en proceso
  const adminsSinTickets = administradores.filter(
    (admin) => admin.pendientes === 0 && admin.en_proceso === 0
  ).length;

  // Contar administradores con pendientes > 0 O en_proceso > 0
  const adminsConTickets = administradores.filter(
    (admin) => admin.pendientes > 0 || admin.en_proceso > 0
  ).length;

  // También puedes calcular el porcentaje si lo necesitas
  const porcentajeDisponibles =
    (adminsSinTickets / administradores.length) * 100;
  const porcentajeOcupados = (adminsConTickets / administradores.length) * 100;

  // Filtrar administradores

  const filteredAdmins = administradores.filter(
    (admin) =>
      (admin.nombre_completo?.toLowerCase() || '').includes(
        searchTerm.toLowerCase()
      ) || (admin.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <AdminStatsCard
                title="Administradores"
                value={administradores.length}
                icon={<UsersIcon className="h-6 w-6" />}
                bgColor="bg-[#682cd8]"
                trend="up"
                trendValue="100"
              />
              <AdminStatsCard
                title="Disponibles"
                value={adminsSinTickets}
                icon={<CheckCircleIcon className="h-6 w-6" />}
                bgColor="bg-[#7959ef]"
                trend="up"
                trendValue={porcentajeDisponibles.toFixed(0) + ''}
              />
              <AdminStatsCard
                title="No Disponibles"
                value={adminsConTickets}
                icon={<BellAlertIcon className="h-6 w-6" />}
                bgColor="bg-[#f428e1]"
                trend="down"
                trendValue={porcentajeOcupados.toFixed(0) + ''}
              />
              <AdminStatsCard
                title="Tickets Vencidos"
                value={0}
                icon={<ExclamationTriangleIcon className="h-6 w-6" />}
                bgColor="bg-rose-500"
                trend="down"
                trendValue="0"
              />
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={`Buscar ${'administradores...'}`}
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
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#682cd8]"></div>
              </div>
            ) : (
              <div className="space-y-8">
                <>
                  <AdminTable
                    admins={filteredAdmins}
                    ruta="/superadmin/detail"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AdminActivityChart admins={administradores} />
                    <AdminPerformanceChart admins={administradores} />
                  </div>
                </>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
