import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetSctCodesResponse } from "@schemas/resources/sct-codes";
import { getSctCodesRequest, postSctCodeRequest, putSctCodeRequest,deleteSctCodeRequest } from "@api/resources/sct-codes";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import NameSelector from "@components/admin-dashboard/NameSelector";

type SctCodeFields = {
  sctCode: {
    code: string;
  };
};

type SctCodeErrors = {
  code?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const SctCodeCreateErrors = {
  name: "Ese código SCT ya está registrado",
};

const SctCodes = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<SctCodeFields>({
    defaultValues: {
      sctCode: {
        code: "",
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<SctCodeErrors>({});

  const [sctCodeData, setsctCodeData] = useState<GetSctCodesResponse | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();
  
  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getSctCodesRequest();
        setsctCodeData(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: SctCodeFields) => {
    if (!sctCodeData) {
      return;
    }

    setUploading(true);

    try {
      const sctCode = {
        code: data.sctCode.code,
      };

      if (creatingNewResource) {
        await postSctCodeRequest(sctCode);
      } else {
        await putSctCodeRequest(sctCodeData[dataIndex].id, sctCode);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...SctCodeCreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !sctCodeData) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton />

      <h1 className="form-title">Códigos SCT</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={sctCodeData.map(sctCode => sctCode.code)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const sctCode = sctCodeData[index];
              setValue("sctCode", {
                code: sctCode.code,
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<SctCodeFields> control={control} fieldName="sctCode.code" label="Código SCT"
            required="Escriba el código SCT"
            error={formErrors.sctCode?.code?.message || errors.code || errors.nonExisting}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={sctCodeData[dataIndex].id}
              deleteFunction={deleteSctCodeRequest}
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

export default SctCodes;
