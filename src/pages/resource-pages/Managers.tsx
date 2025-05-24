import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetManagersResponse } from "@schemas/resources/managers";
import { getManagersRequest, postManagersRequest, putManagersRequest, deleteManagersRequest } from "@api/resources/managers";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import NameSelector from "@components/admin-dashboard/NameSelector";

type ManagerFields = {
  manager: {
    name: string;
  };
};

type ManagerErrors = {
  name?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const ManagerCreateErrors = {
  name: "Un responsable con ese nombre ya existe",
};

const Managers = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<ManagerFields>({
    defaultValues: {
      manager: {
        name: "",
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ManagerErrors>({});

  const [managerData, setManagerData] = useState<GetManagersResponse | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();
  
  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getManagersRequest();
        setManagerData(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: ManagerFields) => {
    if (!managerData) {
      return;
    }

    setUploading(true);

    try {
      const area = {
        name: data.manager.name,
      };

      if (creatingNewResource) {
        await postManagersRequest(area);
      } else {
        await putManagersRequest(managerData[dataIndex].id, area);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...ManagerCreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !managerData) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton path={ROUTES.ADMIN_DASHBOARD} />

      <h1 className="form-title">Responsables</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={managerData.map(area => area.name)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const manager = managerData[index];
              setValue("manager", {
                name: manager.name,
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<ManagerFields> control={control} fieldName="manager.name" label="Nombre del responsable"
            required="Escriba el nombre del responsable"
            error={formErrors.manager?.name?.message || errors.name || errors.nonExisting}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={managerData[dataIndex].id}
              deleteFunction={deleteManagersRequest}
              deleteErrors={DeleteResourceErrors}
              setLoading={setLoading}
              setErrors={setErrors}
            />
          }
        </div>

        <button type="submit" className="px-4 py-2 rounded-md button-component">
          {creatingNewResource ? "Crear" : "Actualizar"} 
          {uploading && <LoadingIcon color="text-white" />}
        </button>
      </form>
    </div>
  );
};

export default Managers;
