import React from 'react';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
  UserPlusIcon,
  UserCircleIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';

interface SidebarAdminProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerSuperAdmin: React.FC<SidebarAdminProps> = ({
  showSidebar,
  setShowSidebar,
}) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleMouseEnter = () => {
    setShowSidebar(true);
  };

  const handleMouseLeave = () => {
    setShowSidebar(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-full transition-all transform bg-[#682cd8] text-white rounded-r-lg pt-20 ${
        showSidebar ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-col h-full">
        <ul className="mt-4">
          <li>
            <button
              onClick={() => handleNavigation('/superadmin')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <HomeIcon className="h-6 w-6" />
              {showSidebar && <span className="ml-2">Dashboard</span>}
            </button>
          </li>

          <li>
            <button
              onClick={logout}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left mt-4"
            >
              <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
              {showSidebar && <span className="ml-2">Cerrar Sesión</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DrawerSuperAdmin;
