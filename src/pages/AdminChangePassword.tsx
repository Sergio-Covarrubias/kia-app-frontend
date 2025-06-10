import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetUserErrors, PatchUserPasswordErrors } from "@schemas/users";

import { getUserRequest, patchUserPasswordRequest } from "@api/users";

import { TextFormField } from "@components/FormFields";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";

type AdminUserFormFields = {
  corporateId: string;
  password: string;
};

type FieldErrors = GetUserErrors & PatchUserPasswordErrors;

const AdminChangePassword = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, reset } = useForm<AdminUserFormFields>({
    defaultValues: {
      corporateId: "",
      password: "",
    },
  });

  const [userId, setUserId] = useState<number | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [searchParams] = useSearchParams();
  useEffect(() => {
    async function LoadUser() {
      const userQ = searchParams.get("user");

      if (!userQ || isNaN(+userQ)) {
        navigate(ROUTES.ADMIN_USERS);
        return;
      }

      const id = +userQ;
      setUserId(id);
      try {
        const res = await getUserRequest(id);
        reset({
          corporateId: res.data.corporateId,
          password: "",
        });
      } catch (error: any) {
        setErrors(getRequestError(error, GetUserErrors));
      }
    }
    LoadUser();
  }, []);

  const onSubmit = handleSubmit(async (data: AdminUserFormFields) => {
    if (!userId) {
      return;
    }

    setErrors({});
    setUpdating(true);

    try {
      await patchUserPasswordRequest(userId, data);

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, PatchUserPasswordErrors));
    }

    setUpdating(false);
  });

  return (
    <div className="page-container form-container">
      <GoBackButton path={ROUTES.ADMIN_USERS} />

      <h1 className="form-title">{userId ? "Modificar" : "Crear"} Usuario</h1>

      <form onSubmit={onSubmit} className="form">
        <div className="w-full flex flex-col md:flex-row gap-y-8 gap-x-8">
          <div className="flex-1">
            <TextFormField<AdminUserFormFields> control={control} fieldName="corporateId" label="ID corporativo" required="Ingresa el nombre del usuario"
              error={formErrors.corporateId?.message || errors.nonExisting}
              readonly
            />
          </div>

          <div className="flex-1">
            <TextFormField<AdminUserFormFields> control={control} fieldName="password" label="Contraseña" required="Ingresa la contraseña"
              minLength={{
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              }}
              error={formErrors.password?.message}
              type="password"
            />
          </div>
        </div>

        <div className="mt-2">
          <button type="submit" className="w-fit px-4 py-2.5 rounded-md button-component">
            Actualizar contraseña
            {updating && <LoadingIcon />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminChangePassword;
