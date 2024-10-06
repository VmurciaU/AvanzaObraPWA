import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetUserById, SaveUser, UpdateUser } from "../services/Services";
import { useUserStore } from "../../../store/userStore";

// Interfaces
interface IForms {
  name:         string;
  email:        string;
  password:     string;
  phoneNumber:  string;
  idRole:       any;
  idCharges:    any;
  state:        number | null;
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
      name:         "",
      email:        "",
      password:     "",
      phoneNumber:  "",
      idRole:       null,
      idCharges:    null,
      state:        null,
    },
  });

  useEffect(() => {
    const dataEditForm = async (token: string, idEdit: number) => {
      const dataRowEdit = await GetUserById(token, idEdit);
      if (dataRowEdit.code === 200) {
        const data = dataRowEdit.data.users[0];
        setStateBtn(false);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("password", data.password);
        setValue("phoneNumber", data.phoneNumber);
        setValue("idRole", data.idRole);
        setValue("idCharges", data.idCharges);
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
        password:     values.password,
        phoneNumber:  values.phoneNumber,
        idRole:       values.idRole,
        idCharges:    values.idCharges,
        state:        values.state ?? 0,
      };

      if (idEdit) {
        await UpdateUser(token, Number(idEdit), data);
      } else {
        await SaveUser(token, data);
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Nombre Usuario</label>
        <input
          type="text"
          placeholder="Nombre del Usuario"
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="text"
          placeholder="Contraseña"
          {...register("password", { required: true })}
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Rol</label>
        <input
          type="text"
          placeholder="Rol"
          {...register("idRole", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Cargo</label>
        <input
          type="text"
          placeholder="Cargo"
          {...register("idCharges", { required: true })}
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
