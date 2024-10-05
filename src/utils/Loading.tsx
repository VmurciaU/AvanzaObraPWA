import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-full p-2 text-center text-black">
      <h1 className="text-xl font-bold">Cargando aplicación</h1>
      <h5 className="text-sm mt-2">Por favor espere, estamos validando...</h5>
    </div>
  );
};

export default Loading;
