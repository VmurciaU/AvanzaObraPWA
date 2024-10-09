import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useUserStore } from '../../../store/userStore';
import { useSidebarStore } from '../../../store/useSidebarStore';
import { AiOutlineDashboard } from "react-icons/ai";
import { PiGpsFix } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TiUserAddOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdOutlineTaskAlt } from "react-icons/md";

const Sidebar: React.FC = () => {
  const userState = useUserStore((state) => state);
  const sideBarState = useSidebarStore((state) => state);
  const navigate = useNavigate();
  
  const [selected, setSelected] = useState<string | null>(null);

  const toggleSidebarMenu = () => {
    sideBarState.toggleSidebar(!sideBarState.isOpen);
  };

  const handleNavigation = (path: string) => {
    setSelected(path);
    navigate(path);
  };

  return (
    <aside
      className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none ${
        sideBarState.isOpen ? '' : '-translate-x-full lg:translate-x-0 lg:w-20'
      }`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between flex-shrink-0 p-2 ${!sideBarState.isOpen ? 'lg:justify-center' : ''}`}>
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          Av<span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>O</span>
        </span>
        <button onClick={toggleSidebarMenu} className="p-2 rounded-md lg:hidden">
          <svg
            className="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Sidebar Links */}
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
        <ul className="p-2 overflow-hidden">
          <li>
            <button
              onClick={() => handleNavigation('/home')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/home' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                <AiOutlineDashboard className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}> Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/role')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/role' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                <PiGpsFix className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Role</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/status')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/status' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                <MdOutlineSettings className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Estados</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/charge')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/charge' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                  <FaRegUser className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Cargos</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/user')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/user' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                <TiUserAddOutline className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Usuarios</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation('/client')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/client' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                <FiUsers className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Cliente</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation('/project')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/project' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                <AiOutlineFundProjectionScreen className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Proyectos</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation('/task')}
              className={`flex items-center p-4 w-full rounded-md transition-colors duration-200 
              ${selected === '/task' ? 'bg-blue-600 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              <span>
                <MdOutlineTaskAlt className="w-6 h-6 text-gray-400 mr-2" />
              </span>
              <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Tareas</span>
            </button>
          </li>

          {/* Más enlaces del sidebar... */}
        </ul>
      </nav>
      {/* Sidebar Footer */}
      <div className="flex-shrink-0 p-2 border-t max-h-14">
        <button
          className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring"
          onClick={() => userState.logout()}
        >
          <span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </span>
          <span className={`${!sideBarState.isOpen ? 'lg:hidden' : ''}`}>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export { Sidebar };
