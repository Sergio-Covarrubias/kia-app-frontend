import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import { LoadFormValuesResponse, LoadFormValuesErrors, UploadFormBody, UploadFormErrors } from "@schemas/forms";
import { loadFormValuesRequest, uploadFormRequest } from "@api/forms";

import { ErrorResponse } from "@schemas/base-errors";
import UnexpectedError from "@constants/unexpected-error";

import { SelectFormField, TextFormField, DateFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";

type FormErrors = LoadFormValuesErrors & UploadFormErrors;

export default function Form() {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors } } = useForm<UploadFormBody>({
    defaultValues: {
      name: "",
      tons: "",
      container: "",
      area: "",
      entryDate: "",
      exitDate: "",
      processingStage: "",
      provider1: "",
      sctCode: "",
      provider2: "",
      manager: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState<LoadFormValuesResponse | null>(null);

  useEffect(() => {
    async function loadFormData() {
      setErrors({});
      setLoading(true);

      try {
        const res = await loadFormValuesRequest();
        setValues(res.data);
      } catch (error: any) {
        error = error.response?.data || UnexpectedError;
        const errorData = error.response.data as ErrorResponse<LoadFormValuesErrors>;
        setErrors({ [errorData.type]: LoadFormValuesErrors[errorData.type] });
      }

      setLoading(false);
    }
    loadFormData();
  }, []);

  const onSubmit = handleSubmit(async (data: UploadFormBody) => {
    setUploading(true);

    try {
      await uploadFormRequest(data);
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      error = error.response?.data || UnexpectedError;
      const errorData = error.response.data as ErrorResponse<UploadFormErrors>;
      setErrors({ [errorData.type]: UploadFormErrors[errorData.type] });
    }

    setUploading(false);
  });

  if (loading || !values) {
    return <LoadingPage />
  }

  return (
    <div className="page-container p-10 gap-y-6 items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center">Formulario</h1>

      <form onSubmit={onSubmit} className="w-full max-w-[48rem] flex flex-col gap-y-8 items-center">
        <SelectFormField<UploadFormBody> control={control} fieldName="name" label="Residuo" required="Seleccione un residuo" error={formErrors.name?.message || errors.residue} values={values.names} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
          <TextFormField<UploadFormBody> control={control} fieldName="tons" label="Toneladas" required="Ingrese las toneladas" error={formErrors.tons?.message} />

          <SelectFormField<UploadFormBody> control={control} fieldName="container" label="Contenedor" required="Seleccione un contenedor" error={formErrors.container?.message || errors.container} values={values.containers} />
          <SelectFormField<UploadFormBody> control={control} fieldName="area" label="Área" required="Seleccione una área" error={formErrors.area?.message || errors.area} values={values.areas} />
          <SelectFormField<UploadFormBody> control={control} fieldName="processingStage" label="Etapa de procesamiento" required="Seleccione una etapa de procesamiento" error={formErrors.processingStage?.message || errors.processingStage} values={values.processingStages} />

          <DateFormField<UploadFormBody> control={control} fieldName="entryDate" label="Fecha de entrada" required="Ingrese una fecha de entrada" error={formErrors.entryDate?.message} />
          <DateFormField<UploadFormBody> control={control} fieldName="exitDate" label="Fecha de salida" required="Ingrese una fecha de salida" error={formErrors.exitDate?.message} />

          <SelectFormField<UploadFormBody> control={control} fieldName="provider1" label="Razón social 1" required="Seleccione una razón social 1" error={formErrors.provider1?.message || errors.provider1} values={values.providers1} />
          <SelectFormField<UploadFormBody> control={control} fieldName="provider2" label="Razón social 2" required="Seleccione una razón social 2" error={formErrors.provider2?.message || errors.provider2} values={values.providers2} />
            <SelectFormField<UploadFormBody> control={control} fieldName="sctCode" label="Código SCT" required="Seleccione un código SCT" error={formErrors.sctCode?.message || errors.sctCode} values={values.sctCodes} />
          <SelectFormField<UploadFormBody> control={control} fieldName="manager" label="Responsable" required="Seleccione a un responsable" error={formErrors.manager?.message || errors.manager} values={values.managers} />
        </div>

        <button type="submit" className="w-fit mt-2 bg-black text-white px-4 py-2 rounded border-none cursor-pointer flex gap-x-3 items-center">
          Crear Registro
          {uploading && <LoadingIcon color="text-white" />}
        </button>
      </form>
    </div>
  );
};
