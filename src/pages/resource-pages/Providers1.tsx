import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetProviders1Response } from "@schemas/resources/providers1";
import { getProviders1Request, postProvider1Request, putProvider1Request, deleteProvider1Request } from "@api/resources/providers1";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import NameSelector from "@components/admin-dashboard/NameSelector";

type Provider1Fields = {
  provider1: {
    name: string;
    semarnatCode: string;
  };
};

type Provider1Errors = {
  name?: string;
  semarnat_code?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const Provider1CreateErrors = {
  name: "Un provedor con ese nombre ya existe",
  semarnatCode: "Un provedor con ese código de SEMARNAT ya existe",
};

const Providers1 = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<Provider1Fields>({
    defaultValues: {
      provider1: {
        name: "",
        semarnatCode: "",
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Provider1Errors>({});

  const [provider1Data, setProvider1Data] = useState<GetProviders1Response | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();

  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getProviders1Request();
        setProvider1Data(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: Provider1Fields) => {
    if (!provider1Data) {
      return;
    }

    setUploading(true);

    try {
      const provider1 = {
        name: data.provider1.name,
        semarnatCode: data.provider1.semarnatCode,
      };

      if (creatingNewResource) {
        await postProvider1Request(provider1);
      } else {
        await putProvider1Request(provider1Data[dataIndex].id, provider1);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...Provider1CreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !provider1Data) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton path={ROUTES.ADMIN_DASHBOARD} />

      <h1 className="form-title">Razones sociales 1</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={provider1Data.map(provider1 => provider1.name)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const provider1 = provider1Data[index];
              setValue("provider1", {
                name: provider1.name,
                semarnatCode: provider1.semarnatCode,
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<Provider1Fields> control={control} fieldName="provider1.name" label="Nombre de la razón social 1"
            required="Escriba el nombre de la razón social 1"
            error={formErrors.provider1?.name?.message || errors.name || errors.nonExisting}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={provider1Data[dataIndex].id}
              deleteFunction={deleteProvider1Request}
              deleteErrors={DeleteResourceErrors}
              setLoading={setLoading}
              setErrors={setErrors}
            />
          }
        </div>

        <TextFormField<Provider1Fields> control={control} fieldName="provider1.name" label="Código de SEMARTNAT"
          required="Escriba el código de SEMARTNAT"
          error={formErrors.provider1?.semarnatCode?.message || errors.semarnat_code || errors.nonExisting}
        />

        <button type="submit" className="px-4 py-2 rounded-md button-component">
          {creatingNewResource ? "Crear" : "Actualizar"}
          {uploading && <LoadingIcon color="text-white" />}
        </button>
      </form>
    </div>
  );
};

export default Providers1;
