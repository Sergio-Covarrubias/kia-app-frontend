import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetProviders2Response } from "@schemas/resources/providers2";
import { getProviders2Request, postProvider2Request, putProvider2Request, deleteProvider2Request } from "@api/resources/providers2";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import NameSelector from "@components/admin-dashboard/NameSelector";

type Provider2Fields = {
  provider2: {
    name: string;
    authorizationCode: string;
  };
};

type Provider2Errors = {
  name?: string;
  authorization_code?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const Provider2CreateErrors = {
  name: "Un provedor con ese nombre ya existe",
  semarnatCode: "Un provedor con ese código de autorización ya existe",
};

const Providers2 = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<Provider2Fields>({
    defaultValues: {
      provider2: {
        name: "",
        authorizationCode: "",
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Provider2Errors>({});

  const [provider2Data, setProvider2Data] = useState<GetProviders2Response | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();
  
  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getProviders2Request();
        setProvider2Data(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: Provider2Fields) => {
    if (!provider2Data) {
      return;
    }

    setUploading(true);

    try {
      const provider2 = {
        name: data.provider2.name,
        authorizationCode: data.provider2.authorizationCode,
      };

      if (creatingNewResource) {
        await postProvider2Request(provider2);
      } else {
        await putProvider2Request(provider2Data[dataIndex].id, provider2);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...Provider2CreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !provider2Data) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton path={ROUTES.ADMIN_DASHBOARD} />

      <h1 className="form-title">Razones sociales 2</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={provider2Data.map(provider2 => provider2.name)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const provider2 = provider2Data[index];
              setValue("provider2", {
                name: provider2.name,
                authorizationCode: provider2.semarnatCode,
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<Provider2Fields> control={control} fieldName="provider2.name" label="Nombre de la razón social 2"
            required="Escriba el nombre de la razón social 2"
            error={formErrors.provider2?.name?.message || errors.name || errors.nonExisting}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={provider2Data[dataIndex].id}
              deleteFunction={deleteProvider2Request}
              deleteErrors={DeleteResourceErrors}
              setLoading={setLoading}
              setErrors={setErrors}
            />
          }
        </div>

        <TextFormField<Provider2Fields> control={control} fieldName="provider2.name" label="Código de autorización"
          required="Escriba el código de autorización"
          error={formErrors.provider2?.authorizationCode?.message || errors.authorization_code || errors.nonExisting}
        />

        <button type="submit" className="px-4 py-2 rounded-md button-component">
          {creatingNewResource ? "Crear" : "Actualizar"}
          {uploading && <LoadingIcon color="text-white" />}
        </button>
      </form>
    </div>
  );
};

export default Providers2;
