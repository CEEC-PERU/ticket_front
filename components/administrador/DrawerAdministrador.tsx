import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { HomeIcon , ArrowRightStartOnRectangleIcon , BellAlertIcon  , UserPlusIcon , UserCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';

interface SidebarAdminProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerSolicitante: React.FC<SidebarAdminProps> = ({ showSidebar, setShowSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const router = useRouter();
  const { logout, profileInfo } = useAuth();
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
      className={`fixed top-0 left-0 z-50 h-full transition-all transform bg-[#682cd8] text-white rounded-r-lg  pt-20 ${
        showSidebar ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-col h-full">
        <ul className="mt-4">
          <li>
            <button
              onClick={() => handleNavigation('/administrador')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <HomeIcon className="h-6 w-6" />
              {showSidebar && <span className="ml-2 text-white">Home</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/administrador/solicitud')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <BellAlertIcon className="h-6 w-6"  />
              {showSidebar && <span className="ml-2 text-white">Solicitudes</span>}
            </button>
          </li>
         
          <li>
            <button
              onClick={() => handleNavigation('/administrador/clientes')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <UserPlusIcon className="h-6 w-6"  />
              {showSidebar && <span className="ml-2 text-white">Clientes</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/administrador/profile')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <UserCircleIcon className="h-6 w-6"  />
              {showSidebar && <span className="ml-2 text-white">Perfil</span>}
            </button>
          </li>
          <li>
              <button
                onClick={logout}
                className="flex items-center p-4 text-white hover:bg-brand-200 w-full text-left"
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

export default DrawerSolicitante;
