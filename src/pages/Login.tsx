import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import { ErrorResponse } from "@schemas/base-errors";
import { LoginErrors } from "@schemas/auth";

import { useAuth } from "@contexts/AuthContext";

import { TextFormField } from "@components/FormFields";
import LoadingIcon from "@components/LoadingIcon";
import whiteLogo from "@assets/kia-logo-white.png";
import blacklogo from "@assets/kia-logo-black.png";

type LoginFields = {
  corporateId: string;
  password: string;
};

type FormErrors = LoginErrors;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const { control, handleSubmit, formState: { errors: formErrors } } = useForm<LoginFields>({
    defaultValues: {
      corporateId: "",
      password: "",
    }
  });

  const [errors, setErrors] = useState<FormErrors>({});
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
      window.location.reload();
    } catch (error: any) {
      const errorData = error as ErrorResponse<LoginErrors>;
      setErrors({ [errorData.type]: LoginErrors[errorData.type] });
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
            <TextFormField<LoginFields> control={control} fieldName="corporateId" label="ID corporativa" required="Escriba su ID corportiva"
              error={formErrors.corporateId?.message || errors.nonExisting}
            />

            <TextFormField<LoginFields> control={control} fieldName="password" label="Contraseña" required="Escriba su contraseña"
              error={formErrors.password?.message || errors.password}
            />

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
