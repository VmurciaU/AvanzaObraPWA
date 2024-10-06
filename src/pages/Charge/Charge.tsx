import React, { useState } from "react";
import { ComponentsForm } from "./components/CustomForm";
import { CustomTable } from "./components/CustomTable";


const ChargeMain: React.FC = () => {

  // manejo del id para el editar
  const [idEdit, setIdEdit] = useState<number | null>(null);

  // Función para limpiar el formulario y reiniciar el estado
  const handleClearForm = () => {
    setIdEdit(null); // limpiar el id
  };

  return (
    <>
      <ComponentsForm  idEdit={idEdit} onClearForm={handleClearForm} />
      <CustomTable setIdEdit={setIdEdit}/>
    </>
  );
};

export default ChargeMain;
