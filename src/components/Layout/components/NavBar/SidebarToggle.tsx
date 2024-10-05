import React from 'react';
import { useSidebarStore } from '../../../../store/useSidebarStore';


const SidebarToggle: React.FC = () => {
  const userState = useSidebarStore((state) => state);

  const toggleSidebarMenu = () => {
    userState.toggleSidebar(!userState.isOpen);
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">K-WD</span>
      {/* Toggle sidebar button */}
      <button onClick={toggleSidebarMenu} className="p-2 rounded-md focus:outline-none focus:ring">
        <svg
          className={`w-4 h-4 text-gray-600 ${userState.isOpen ? 'transform transition-transform -rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default SidebarToggle;
