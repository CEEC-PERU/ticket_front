import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {  HomeIcon } from '@heroicons/react/24/solid';

interface SidebarAdminProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerSolicitante: React.FC<SidebarAdminProps> = ({ showSidebar, setShowSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 h-full">
      <div
        className={`bg-brandmorado-700 text-white transition-all transform h-full rounded-r-lg ${
          isOpen ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <nav className="flex flex-col h-full">
          <ul>
            <li>
              <button
                onClick={() => handleNavigation('/student')}
                className="flex items-center p-4 text-white hover:bg-brand-200 w-full text-left"
              >
                <HomeIcon className="h-6 w-6" />
                {showSidebar && <span className="ml-2">Home</span>}
              </button>
            </li>
            
           
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DrawerSolicitante;
