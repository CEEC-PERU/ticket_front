import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { HomeIcon , ArrowRightStartOnRectangleIcon  , NumberedListIcon , PlusCircleIcon} from '@heroicons/react/24/solid';
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
              onClick={() => handleNavigation('/solicitante')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <HomeIcon className="h-6 w-6" />
              {showSidebar && <span className="ml-2 text-white">Home</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/solicitante/solicitud')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <PlusCircleIcon className="h-6 w-6"  />
              {showSidebar && <span className="ml-2 text-white">Registrar Solicitud</span>}
            </button>
          </li>
           <li>
            <button
              onClick={() => handleNavigation('/solicitante/solicitud/listasolicitud')}
              className="flex items-center p-4 text-white hover:bg-[#7959ef] w-full text-left"
            >
              <NumberedListIcon className="h-6 w-6"  />
              {showSidebar && <span className="ml-2 text-white">Lista de Solicitud</span>}
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
