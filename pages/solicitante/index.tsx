import React, { useState } from "react";

import Navbar from "../../components/solicitante/navbar";
import SidebarAdmin from "../../components/solicitante/DrawerSolicitante";
import "./../../app/globals.css";

export default function Solicitante() {

  const [showSidebar, setShowSidebar] = useState(true);
    return (
      <div className="flex h-screen bg-white text-cyan-700">
      <SidebarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={`flex-1 p-6 transition-all duration-300 ${showSidebar ? "ml-16" : "ml-24"}`}>
        <Navbar bgColor="bg-cyan-800" paddingtop="pt-4" />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 ">Solicitante</h1>

         

        </div>
      </div>
    </div>
    );
  }
  