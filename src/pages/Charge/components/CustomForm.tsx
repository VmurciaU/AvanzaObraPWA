import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetChargeById, SaveCharge, UpdateCharge } from "../services/Services";
import { useUserStore } from "../../../store/userStore";

// Interfaces
interface IForms {
  name:         string;
  description:  string;
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
      name: "",
      description: "",
      state: null,
    },
  });

  useEffect(() => {
    const dataEditForm = async (token: string, idEdit: number) => {
      const dataRowEdit = await GetChargeById(token, idEdit);
      if (dataRowEdit.code === 200) {
        const data = dataRowEdit.data.charges[0];
        setStateBtn(false);
        setValue("name", data.name);
        setValue("description", data.name);
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
        name: values.name,
        description: values.description,
        state: values.state ?? 0,
      };

      if (idEdit) {
        await UpdateCharge(token, Number(idEdit), data);
      } else {
        await SaveCharge(token, data);
      }

      debugger;
      reset();
      if (onClearForm) {
        onClearForm();
      }
      queryClient.invalidateQueries({ queryKey: ["charges"] });
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Cargo</label>
        <input
          type="text"
          placeholder="Nombre del Cargo"
          {...register("name", { required: true })}
          className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">Descripción del Cargo</label>
        <input
          type="text"
          placeholder="Nombre del Cargo"
          {...register("description", { required: true })}
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
