"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className=" bg-gradient-to-r from-cyan-500 to-blue-500 relative text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/"> Ticket</Link>
        </h1>
        <button
          onClick={toggleMenu}
          className="sm:hidden block text-white focus:outline-none"
        >
          ☰
        </button>
        <ul
          className={`sm:flex sm:items-center sm:gap-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          
          <li>
            <Link href="/login" className="hover:underline text-2xl">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
