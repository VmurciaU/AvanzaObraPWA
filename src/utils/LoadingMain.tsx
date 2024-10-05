import React from "react";

const LoadingMain: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 text-center bg-[#ffe1a9]">
      <h1 className="text-xl font-bold text-[#000000]">Cargando aplicación</h1>
      <h5 className="text-sm mt-2 text-[#000000]">Por favor espere, estamos validando...</h5>
    </div>
  );
};

export default LoadingMain;
