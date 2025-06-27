// components/superadmin/AdminPerformanceChart.tsx
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { SuperAdmin } from '../../interfaces/user/superadmin';
interface AdminPerformanceChartProps {
  admins: SuperAdmin[];
}

const AdminPerformanceChart = ({ admins }: AdminPerformanceChartProps) => {
  // Preparar datos para el gráfico
  const series = [
    {
      name: 'Tickets Finalizados',
      data: admins.map((admin) => admin.finalizados || 0),
    },
    {
      name: 'Tickets en Proceso',
      data: admins.map((admin) => admin.en_proceso || 0),
    },
    {
      name: 'Tickets Pendientes',
      data: admins.map((admin) => admin.pendientes || 0),
    },
  ];

  const options = {
    chart: {
      type: 'bar' as const,
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: 'category' as const,
      categories: admins.map((admin) => admin.nombre_completo || 'Admin'),
      labels: {
        style: {
          fontSize: '12px',
        },
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Número de Tickets',
      },
    },
    legend: {
      position: 'top' as const,
    },
    fill: {
      opacity: 1,
    },
    colors: ['#10B981', '#3B82F6', '#F59E0B'],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Rendimiento de Administradores
      </h2>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default AdminPerformanceChart;
