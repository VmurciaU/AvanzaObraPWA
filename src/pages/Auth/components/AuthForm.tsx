import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CloseSwal, MessageError, MessageWaiting } from "../../../utils/MessagesModals/MessagesModals";
import type { IForm } from "./type/TypeForm";
import { DoLogin } from "./services/AuthServices";
import { useUserStore } from "../../../store/userStore";

const AuthFrom: React.FC = () => {
    const userState = useUserStore((state) => state);
    const navigate = useNavigate();
  
    // Manejo data del formulario
    const dataUserLogin: IForm= {
        username: '',
        password: '',
    }; 

    // userForm
    const {
      register,
      handleSubmit,
    } = useForm<IForm>({
      defaultValues: dataUserLogin,
      mode: 'all',
      reValidateMode: 'onBlur',
    });

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        try {
            MessageWaiting("Login", "Estamos realizando el login", false);
            const response = await DoLogin(data.username, data.password);
            if (response  && response.code === 200) {
                userState.login({
                ...response.data.user,
                token: response.data.token,
                initializing: true,
                redirectTo: userState.redirectTo,
                isLoading: false
                });
                CloseSwal();
                return navigate('/home');
            }
          
        } catch (error: any) {
            const responseError: any = await error;
            debugger;
            if (responseError && responseError.response) {
              MessageError("Error Login", "Login incorrecto");
            } else {
              MessageError(
                "Error Login",
                "Verifica conexión a internet y/o VPN, si el error continúa ponerse en contacto con el funcional encargado."
              );
            }
        }
      };
    
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div>
            <input
            {
                ...register(
                  'username',
                  {
                    required: {
                      value: true,
                      message: 'El campo es requerido',
                    },
                    minLength: {
                      value: 5,
                      message: 'El campo es requerido',
                    },
                  },
                )
            }
                type="email"
                placeholder="Correo electrónico" 
                className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" 
                
            />
        </div>

        <div className="mt-7">                
            <input
              {
                ...register(
                  'password',
                  {
                    required: {
                      value: true,
                      message: 'El campo es requerido',
                    },
                    minLength: {
                      value: 5,
                      message: 'El campo es requerido',
                    },
                  },
                )
              }
              type="password"
              placeholder="Contraseña"
              className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />                           
        </div>

        <div className="mt-7 flex">
            <label className="inline-flex items-center w-full cursor-pointer">
                <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                <span className="ml-2 text-sm text-gray-600">
                    Recuerdame
                </span>
            </label>
        </div>

        <div className="mt-7">
            <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Login
            </button>
        </div>

        <div className="flex mt-7 items-center text-center">
            <hr className="border-gray-300 border-1 w-full rounded-md" />
            <label className="block font-medium text-sm text-gray-600 w-full">
                Accede con
            </label>
        </div>

        <div className="flex mt-7 justify-center w-full">
            <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                
                Facebook
            </button>

            <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                
                Google
            </button>
        </div>

        <div className="mt-7">
            <div className="flex justify-center items-center">
                <label className="mr-2" >¿Eres nuevo?</label>
                <button type="button" className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                    Crea una cuenta
                </button>
            </div>
        </div>
    </form>
  )
}

export {AuthFrom};
