import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetProjectById, SaveProject, UpdateProject } from "../services/Services";
import { useUserStore } from "../../../store/userStore";
import { GetClientActive } from "../../Client/services/Services";

// Interfaces
interface IForms {
  name:         string;
  description: string;
  idClient:    number | null;
  state:       number | null;
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
  const [dataClient, setDataClient] = useState<any[]>([]);

  // para llegar el campo de seleccionar rol
  useEffect(() => {
    const responseRole = async () => {
      const dataClientResponse = await GetClientActive(token);

      if (dataClientResponse.code === 200) {
        setDataClient(dataClientResponse.data.clients);
      }

    }

    responseRole();

  }, [token]);   

const { register, handleSubmit, setValue, reset } = useForm<IForms>({
    defaultValues: {
      name:         "",
      description: "",
      idClient:      null,
      state:        null,
    },
  });

  useEffect(() => {
    const dataEditForm = async (token: string, idEdit: number) => {
      const dataRowEdit = await GetProjectById(token, idEdit);
      if (dataRowEdit.code === 200) {
        const data = dataRowEdit.data.projectdata[0];
        setStateBtn(false);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("idClient", data.client.id);
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
        description:  values.description,
        idClient:     Number(values.idClient),
        state:        values.state ?? 0,
      };

      if (idEdit) {
        await UpdateProject(token, Number(idEdit), data);
      } else {
        await SaveProject(token, data);
      }

      debugger;
      reset();
      if (onClearForm) {
        onClearForm();
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del proyecto</label>
        <input
          type="text"
          placeholder="Nombre del proyecto"
          {...register("name", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Descripción</label>
        <input
          type="text"
          placeholder="Descripción"
          {...register("description", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Cliente</label>
        <select
          {...register("idClient", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        >
          <option value="">Seleccionar cliente</option>
          {dataClient.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
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
