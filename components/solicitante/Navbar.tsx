import React from 'react';
import Link from 'next/link';


interface NavbarProps {
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  paddingtop?:string;
  navbarHeight?: string;
  toggleSidebar?: () => void;
  showMenuButton?: boolean;
  borderColor?: string;
  links?: { href: string; label: string }[];
  user?: { profilePicture?: string };
}

const Navbar: React.FC<NavbarProps> = ({
  bgColor = ' bg-gradient-to-r from-[#682cd8] via-[#7959ef]  to-[#f428e1] text-white',
  textColor = 'text-white',
  fontSize = 'text-2xl',
  fontFamily = 'font-sans',
  paddingtop= 'pt-0',
  navbarHeight = 'h-20',
  toggleSidebar,
  borderColor,
  showMenuButton = true,
  links = [],
  user,
}) => {
  return (
    <nav className={`${bgColor} ${navbarHeight} fixed top-0 left-0 w-full items-center z-50 ${borderColor}`}>
      <div className={`container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 ${paddingtop}`}>
        <div className="flex items-center">
          {showMenuButton && toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className={`${textColor} p-0 m-0 flex items-center justify-center h-full lg:hidden`}
            >
              
            </button>
          )}
          <div className={`${showMenuButton ? 'ml-2' : ''} flex items-center`}>
            <img
              src="https://res.cloudinary.com/dk2red18f/image/upload/v1736456728/Ticket-Qtech/rcgldy7apjzy3biwwori.png"
              alt="EducaWeb Logo"
              className="h-10 "
            />
            <h2 className="text-white font-bold pl-2"></h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
        
        {/*  <>
              <Link href="/student">
                <button className="flex items-center p-4 text-white hover:bg-brand-200 w-full text-left">
                 dfgdf
                </button>
              </Link>
          
              <Link href="/student">
                <button className="flex items-center p-4 text-white hover:bg-brand-200 w-full text-left">
                 fdgd
                </button>
              </Link>
            </>
         */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
