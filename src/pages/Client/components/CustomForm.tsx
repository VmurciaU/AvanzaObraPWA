import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetClientById, SaveClient, UpdateClient } from "../services/Services";
import { useUserStore } from "../../../store/userStore";

// Interfaces
interface IForms {
  name: string,
  typeIdentification: string,
  email: string,
  phoneNumber: string,
  state: number | null,
}

// Tipado de las propiedades del componente
interface Props {
  idEdit?: number | null;
  onClearForm?: () => void;
}



const ComponentsForm = ({ idEdit, onClearForm }: Props) => {
  const token = useUserStore((state) => state.token);
  const queryClient = useQueryClient();
  const [stateBtn, setStateBtn] = useState<boolean>(true);
 

const { register, handleSubmit, setValue, reset } = useForm<IForms>({
    defaultValues: {
      name:               "",
      typeIdentification: "",
      email:              "",
      phoneNumber:        "",
    },
  });

  useEffect(() => {
    const dataEditForm = async (token: string, idEdit: number) => {
      const dataRowEdit = await GetClientById(token, idEdit);
      if (dataRowEdit.code === 200) {
        const data = dataRowEdit.data.clients[0];
        setStateBtn(false);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("typeIdentification", data.password);
        setValue("phoneNumber", data.phoneNumber);
        setValue("state", data.state);
      }
    };

    if (idEdit) {
      dataEditForm(token, Number(idEdit));
    }
  }, [idEdit, token, setValue]);

  const onSubmit = async (values: IForms) => {
    try {
      const data = {
        name:         values.name,
        email:        values.email,
        typeIdentification: values.typeIdentification,
        phoneNumber:  values.phoneNumber,
        state:        values.state ?? 0,
      };

      if (idEdit) {
        await UpdateClient(token, Number(idEdit), data);
      } else {
        await SaveClient(token, data);
      }

      debugger;
      reset();
      if (onClearForm) {
        onClearForm();
      }
      queryClient.invalidateQueries({ queryKey: ["client"] });
      setStateBtn(true);
    } catch (error: any) {
      const err = await error;
      console.log(err);
    }
  };

  const dataState = [
    { label: "Activo", value: 1 },
    { label: "Inactivo", value: 0 },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-8 mt-4">
      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del cliente</label>
        <input
          type="text"
          placeholder="Nombre del cliente"
          {...register("name", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          placeholder="Correo Electrónico"
          {...register("email", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Identificación</label>
        <input
          type="text"
          placeholder="Identificación"
          {...register("typeIdentification", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="text"
          placeholder="Teléfono"
          {...register("phoneNumber", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Estado</label>
        <select
          {...register("state", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        >
          <option value="">Seleccionar estado</option>
          {dataState.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded col-span-1 col-start-1">
        {stateBtn ? "Guardar" : "Actualizar"}
      </button>
    </form>
  );
};

export { ComponentsForm };
