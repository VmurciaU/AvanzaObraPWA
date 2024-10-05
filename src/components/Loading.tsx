import React from 'react';

const LoadingRoute: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center">
      <div className="animate-spin mb-4">
        {/* Icono de carga, puedes usar un SVG o cualquier otro icono */}
        <svg
          className="w-10 h-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="blue"
            d="M4.293 12.293l1.414-1.414L12 15.586l6.293-6.293 1.414 1.414L12 18.414l-7.707-7.707z"
          />
        </svg>
      </div>
      <span className="text-xl font-semibold text-gray-700">Loading...</span>
    </div>
  </div>
);

export default LoadingRoute;
