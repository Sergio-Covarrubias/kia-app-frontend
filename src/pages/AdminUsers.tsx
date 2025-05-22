import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import ROUTES from "@constants/routes";
import { ErrorResponse } from "@schemas/base-errors";
import UnexpectedError from "@constants/unexpected-error";
import { PostUserErrors, PutUserErrors, DeleteUserErrors } from "@schemas/users";

import { createUserRequest, putUserRequest, deleteUserRequest } from "@api/users";

import { TextFormField, BooleanFormField } from "@components/FormFields";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";

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
      corporateId: "",
      password: "",
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
      console.log(error);
      
      error = error.response?.data || UnexpectedError;

      if (action === "create") {
        const errorData = error as ErrorResponse<PostUserErrors>;
        setErrors({ [errorData.type]: PostUserErrors[errorData.type] });
      } else if (action === "update") {
        const errorData = error as ErrorResponse<PutUserErrors>;
        setErrors({ [errorData.type]: PutUserErrors[errorData.type] });
      } else {
        const errorData = error as ErrorResponse<DeleteUserErrors>;
        setErrors({ [errorData.type]: DeleteUserErrors[errorData.type] });
      }
    }

    setLoading(false);
  });

  return (
    <div className="page-container form-container">
      <GoBackButton />

      <h1 className="form-title">{action === "create" ? "Crear" : (action === "update" ? "Modificar" : "Eliminar")} Usuario</h1>

      <form onSubmit={onSubmit} className="form">
        <div className={classNames("w-full grid grid-cols-1 gap-y-8 gap-x-8", { "md:grid-cols-2": action !== "delete" })}>
          <TextFormField<AdminUsersFields> control={control} fieldName="corporateId" label="ID corporativo" required="Ingresa el nombre del usuario"
            error={formErrors.corporateId?.message || errors.corporateId || errors.nonExistingId}
          />

          {
            action !== "delete" &&
            <TextFormField<AdminUsersFields> control={control} fieldName="password" label="Contraseña" required="Ingresa la contraseña"
              error={formErrors.password?.message}
              type="password"
            />
          }
        </div>

        {
          action !== "delete" &&
          <BooleanFormField<AdminUsersFields> control={control} fieldName="isAdmin" label="¿Hacer al usuario admin?" />
        }

        <button type="submit" className="px-4 py-2 rounded-md button-component">
          {action === "create" ? "Crear" : (action === "update" ? "Actualizar" : "Eliminar")} 
          {loading && <LoadingIcon color="text-white" />}
        </button>
      </form>
    </div>
  );
};

export default AdminUsers;
