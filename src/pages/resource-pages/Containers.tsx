import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetContainersResponse } from "@schemas/resources/containers";
import { getContainersRequest, postContainerRequest, putContainerRequest, deleteContainerRequest } from "@api/resources/containers";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import NameSelector from "@components/admin-dashboard/NameSelector";

type ContainerFields = {
  container: {
    name: string;
  };
};

type ContainerErrors = {
  name?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const ContainerCreateErrors = {
  name: "Un contenedor con ese nombre ya existe",
};

const Containers = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<ContainerFields>({
    defaultValues: {
      container: {
        name: "",
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ContainerErrors>({});

  const [containerData, setContainerData] = useState<GetContainersResponse | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();

  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getContainersRequest();
        setContainerData(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: ContainerFields) => {
    if (!containerData) {
      return;
    }

    setUploading(true);

    try {
      const container = {
        name: data.container.name,
      };

      if (creatingNewResource) {
        await postContainerRequest(container);
      } else {
        await putContainerRequest(containerData[dataIndex].id, container);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...ContainerCreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !containerData) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton path={ROUTES.ADMIN_DASHBOARD} />

      <h1 className="form-title">Contenedores</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={containerData.map(container => container.name)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const container = containerData[index];
              setValue("container", {
                name: container.name,
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<ContainerFields> control={control} fieldName="container.name" label="Nombre del contenedor"
            required="Escriba el nombre del contenedor"
            error={formErrors.container?.name?.message || errors.name || errors.nonExisting}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={containerData[dataIndex].id}
              deleteFunction={deleteContainerRequest}
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

export default Containers;
