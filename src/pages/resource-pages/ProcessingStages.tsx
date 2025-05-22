import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetProcessingStagesResponse } from "@schemas/resources/processing-stages";
import { getProcessingStagesRequest, postProcessingStageRequest, putProcessingStageRequest, deleteProcessingStageRequest } from "@api/resources/processing-stages";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import NameSelector from "@components/admin-dashboard/NameSelector";

type ProcessingStagesFields = {
  processingStage: {
    name: string;
  };
};

type ProcessingStagesErrors = {
  name?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const ProcessingStageCreateErrors = {
  name: "Una etapa de procesamiento ya tiene ese nombre",
};

const ProcessingStages = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<ProcessingStagesFields>({
    defaultValues: {
      processingStage: {
        name: "",
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ProcessingStagesErrors>({});

  const [processingStageData, setProcessingStageData] = useState<GetProcessingStagesResponse | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();

  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getProcessingStagesRequest();
        setProcessingStageData(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: ProcessingStagesFields) => {
    if (!processingStageData) {
      return;
    }

    setUploading(true);

    try {
      const processingStage = {
        name: data.processingStage.name,
      };

      if (creatingNewResource) {
        await postProcessingStageRequest(processingStage);
      } else {
        await putProcessingStageRequest(processingStageData[dataIndex].id, processingStage);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...ProcessingStageCreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !processingStageData) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton />

      <h1 className="form-title">Etapa de procesamiento</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={processingStageData.map(processingStage => processingStage.name)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const processingStage = processingStageData[index];
              setValue("processingStage", {
                name: processingStage.name,
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<ProcessingStagesFields> control={control} fieldName="processingStage.name" label="Nombre de la etapa de procesamiento"
            required="Escriba el nombre de la etapa de procesamiento"
            error={formErrors.processingStage?.name?.message || errors.name || errors.nonExisting}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={processingStageData[dataIndex].id}
              deleteFunction={deleteProcessingStageRequest}
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

export default ProcessingStages;
