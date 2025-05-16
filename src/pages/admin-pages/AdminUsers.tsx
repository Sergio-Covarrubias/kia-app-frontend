import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";

import ROUTES from "@constants/routes";
import { ErrorResponse } from "@schemas/errors";
import UnexpectedError from "@constants/unexpected-error";
import { PostUserErrors, PutUserErrors, DeleteUserErrors } from "@schemas/users";

import { createUserRequest, putUserRequest, deleteUserRequest } from "@api/users";

import { TextFormField } from "@components/FormFields";
import AdminFormButtons from "@components/admin-dashboard/AdminFormButtons";

type AdminUsersFields = {
  corporateId: string;
  password: string;
  isAdmin: boolean;
};

type FieldErrors = PostUserErrors & PutUserErrors & DeleteUserErrors;

const AdminUsers = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors } } = useForm<AdminUsersFields>({
    defaultValues: {
      corporateId: '',
      password: '',
      isAdmin: false,
    },
  });

  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  useEffect(() => {
    if (action !== "create" && action !== "update" && action !== "delete") {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const onSubmit = handleSubmit(async (data: AdminUsersFields) => {
    setErrors({});
    setLoading(true);

    try {
      if (action === "create") {
        await createUserRequest(data);
      } else if (action === "update") {
        await putUserRequest(data);
      } else {
        await deleteUserRequest({ corporateId: data.corporateId });
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      error = error.response?.data || UnexpectedError
      const errorData = error as ErrorResponse;
      setErrors({ [errorData.type]: true });
    }

    setLoading(false);
  });

  return (
    <div className="page-container p-10 gap-y-6 justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center">{action === "create" ? "Crear" : (action === "update" ? "Modificar" : "Eliminar")} Usuario</h1>

      <form onSubmit={onSubmit} className="w-full max-w-[48rem] flex flex-col gap-y-8 items-center">
        <div className={classNames("w-full grid grid-cols-1 gap-y-8 gap-x-8", { "md:grid-cols-2": action !== "delete" })}>
          <TextFormField<AdminUsersFields> control={control} fieldName="corporateId" label="ID corporativo" required="Ingresa el nombre del usuario"
            error={formErrors.corporateId?.message || errors.corporateId || errors.nonExistingId}
          />

          {
            action !== "delete" &&
            <TextFormField<AdminUsersFields> control={control} fieldName="password" label="Contraseña" required="Ingresa la contraseña"
              error={formErrors.password?.message}
            />
          }
        </div>

        {
          action !== "delete" &&
          <Controller
            control={control}
            name="isAdmin"
            render={({ field }) => (
              <div className="flex gap-x-3 items-center">
                <label htmlFor="isAdmin" className="text-sm">¿Hacer al usuario admin?</label>
                <input
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  type="checkbox"
                  className="accent-black size-3"
                />
              </div>
            )}
          />
        }

        <AdminFormButtons loading={loading} text="Enviar" />
      </form>
    </div>
  );
};

export default AdminUsers;
