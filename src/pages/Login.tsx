import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useAuth } from "@contexts/AuthContext";
import { ErrorResponse } from "@schemas/errors";
import ROUTES from "@constants/routes";

import LoadingIcon from "@components/LoadingIcon";
import whiteLogo from "@assets/kia-logo-white.png";
import blacklogo from "@assets/kia-logo-black.png";

type LoginErrors = {
  missingCorporateId?: boolean;
  missingPassword?: boolean;
  corporateId?: boolean;
  password?: boolean;
};

type LoginFields = {
  corporateId: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const { control, handleSubmit, formState: { errors: formErrors } } = useForm<LoginFields>({
    defaultValues: {
      corporateId: "",
      password: "",
    }
  });

  useEffect(() => {
    setErrors({
      missingCorporateId: formErrors.corporateId != undefined,
      missingPassword: formErrors.password != undefined,
    });
  }, [formErrors.corporateId, formErrors.password]);

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [user]);

  const onSubmit = handleSubmit(async (data: LoginFields) => {
    setErrors({});
    setLoading(true);

    try {
      const loginData = {
        corporateId: data.corporateId,
        password: data.password,
      };

      await login(loginData);
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      const errorData = error as ErrorResponse;
      setErrors({ [errorData.type]: true });
    }

    setLoading(false);
  });

  return (
    <div className="flex h-screen">
      {/* Columna izquierda con la imagen y el texto */}
      <div className="flex-1 flex flex-col justify-center items-center bg-black text-white p-5">
        <img src={whiteLogo} alt="KIA Logo" className="max-w-md" />
        <div className="text-center">
          <h2 className="text-xl font-semibold">Portal de registro de residuos peligrosos</h2>
          <hr className="border-t-2 border-white mb-2 w-4/5 mx-auto my-3" />
          <p className="text-lg italic">Menos desechos, más caminos limpios</p>
        </div>
      </div>

      {/* Línea vertical divisoria entre las dos secciones */}
      <div className="w-[2px] bg-white h-full"></div>

      {/* Columna derecha con el formulario de inicio de sesión */}
      <div className="flex-1 flex justify-center items-center p-5">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <img src={blacklogo} alt="KIA Logo" className="block mx-auto mb-5 max-w-[120px]" />

          <form onSubmit={onSubmit} className="flex flex-col gap-y-5">
            {/* Campo para el ID KIA */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="idKia" className="block text-lg font-bold mb-1">ID KIA</label>
              <Controller
                control={control}
                name="corporateId"
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your KIA ID"
                  />
                )}
              />
              {errors.missingCorporateId && <span className="text-red-500 text-sm">Escriba su ID de empleado</span>}
              {errors.corporateId && <span className="text-red-500 text-sm">El usuario no existe</span>}
            </div>

            {/* Campo para la contraseña */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="password" className="block text-lg font-bold mb-1">Password</label>
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="w-full p-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                )}
              />
              {errors.missingPassword && <span className="text-red-500 text-sm">Escriba su contraseña</span>}
              {errors.password && <span className="text-red-500 text-sm">La contraseña es incorrecta</span>}
            </div>

            {/* Botón para iniciar sesión */}
            <button
              type="submit"
              className="mt-1 px-2 py-3 flex gap-x-3 justify-center items-center font-bold bg-black rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <span className="text-lg text-white">Iniciar sesión</span>
              {loading && <LoadingIcon color="text-white" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
