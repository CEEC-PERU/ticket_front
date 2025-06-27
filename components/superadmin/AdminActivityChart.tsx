import React from 'react';
import dynamic from 'next/dynamic';
import { SuperAdmin } from '../../interfaces/user/superadmin';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AdminActivityChartProps {
  admins: SuperAdmin[];
}

const AdminActivityChart: React.FC<AdminActivityChartProps> = ({ admins }) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar', // 'bar' es un tipo válido
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: admins.map((admin) => admin.nombre_completo.split(' ')[0]),
    },
    colors: ['#8B5CF6', '#EC4899'],
    legend: {
      position: 'top',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: 'Pendientes',
      data: admins.map((admin) => admin.pendientes),
    },
    {
      name: 'En proceso',
      data: admins.map((admin) => admin.en_proceso),
    },
    {
      name: 'Finalizados',
      data: admins.map((admin) => admin.finalizados),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-[#682cd8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Actividad de Administradores
      </h3>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default AdminActivityChart;
