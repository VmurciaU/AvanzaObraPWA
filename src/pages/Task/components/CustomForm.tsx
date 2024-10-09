import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetTaskById, SaveTask, UpdateTask } from "../services/Services";
import { useUserStore } from "../../../store/userStore";
import { GetUserActive } from "../../User/services/Services";
import { GetStatusActive } from "../../Status/services/Services";
import { GetProjectActive } from "../../Project/services/Services";

// Interfaces
interface IForms {
  name:         string;
  description:  string;
  image:        string;
  audio:        string;
  idUser:      number | null;
  idProject:   number | null;
  idState:     number | null;
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
  const [dataUser, setDataUser] = useState<any[]>([]);
  const [dataProject, setDataProject] = useState<any[]>([]);
  const [dataStateRes, setDataStateRes] = useState<any[]>([]);

  // para llegar el campo de seleccionar rol
  useEffect(() => {
    const responseRole = async () => {
      const dataUserResponse = await GetUserActive(token);
      const dataProjectResponse = await GetProjectActive(token);
      const dataStateResponse = await  GetStatusActive(token);

      if (dataUserResponse.code === 200) {
        setDataUser(dataUserResponse.data.users);
      }

      if (dataProjectResponse.code === 200) {
        setDataProject(dataProjectResponse.data.projectdata);
      }

      if (dataStateResponse.code === 200) {
        setDataStateRes(dataStateResponse.data.status);
      }

    }

    responseRole();

  }, [token]);   

const { register, handleSubmit, setValue, reset } = useForm<IForms>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      audio: "",
      idUser: null,
      idProject: null,
      idState: null,
      state: null,
    },
  });

  useEffect(() => {
    const dataEditForm = async (token: string, idEdit: number) => {
      const dataRowEdit = await GetTaskById(token, idEdit);
      if (dataRowEdit.code === 200) {
        const data = dataRowEdit.data.taskdata[0];
        setStateBtn(false);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("image", data.description);
        setValue("audio", data.description);
        setValue("idUser", data.user.id);
        setValue("idProject", data.projects.id);
        setValue("idState", data.states.id);
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
        image:        values.image,
        audio:        values.audio,
        idUser:       Number(values.idUser),
        idProject:    Number(values.idProject),
        idState:      Number(values.idState),
        state:        values.state ?? 0,
      };

      if (idEdit) {
        await UpdateTask(token, Number(idEdit), data);
      } else {
        await SaveTask(token, data);
      }

      debugger;
      reset();
      if (onClearForm) {
        onClearForm();
      }
      queryClient.invalidateQueries({ queryKey: ["task"] });
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Nombre de la tarea</label>
        <input
          type="text"
          placeholder="Nombre de la tarea"
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Usuario</label>
        <select
          {...register("idUser", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        >
          <option value="">Seleccionar Usuario</option>
          {dataUser.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Proyecto</label>
        <select
          {...register("idProject", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        >
          <option value="">Seleccionar Proyecto</option>
          {dataProject.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Estado del proyecto</label>
        <select
          {...register("idState", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        >
          <option value="">Seleccionar estado del proyecto</option>
          {dataStateRes.map((item) => (
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
