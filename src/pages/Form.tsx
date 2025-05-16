import { useState, useEffect } from "react"
import { useForm, Controller, Control } from "react-hook-form";

import { LoadFormValuesResponse, UploadFormBody } from "@schemas/forms";
import { loadFormValuesRequest, uploadFormRequest } from "@api/forms";
import { ErrorResponse } from "@schemas/errors";
import UnexpectedError from "@constants/unexpected-error";

import { ChevronDown, Calendar } from "lucide-react";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";

type FormErrors = {
  missingName?: boolean;
  missingTons?: boolean;
  missingContainer?: boolean;
  missingArea?: boolean;
  missingProcessingStage?: boolean;
  missingEntryDate?: boolean;
  missingExitDate?: boolean;
  missingProvider1?: boolean;
  missingProvider2?: boolean;
  missingSctCode?: boolean;
  missingManager?: boolean;
};

export default function Form() {
  const { control, handleSubmit, formState: { errors: formErrors }, reset } = useForm<UploadFormBody>({
    defaultValues: {
      name: '',
      tons: '',
      container: '',
      area: '',
      entryDate: '',
      exitDate: '',
      processingStage: '',
      provider1: '',
      sctCode: '',
      provider2: '',
      manager: '',
    },
  });

  useEffect(() => {
    setErrors({
      missingName: formErrors.name != undefined,
      missingTons: formErrors.tons != undefined,
      missingContainer: formErrors.container != undefined,
      missingArea: formErrors.area != undefined,
      missingProcessingStage: formErrors.processingStage != undefined,
      missingEntryDate: formErrors.entryDate != undefined,
      missingExitDate: formErrors.exitDate != undefined,
      missingProvider1: formErrors.provider1 != undefined,
      missingProvider2: formErrors.provider2 != undefined,
      missingSctCode: formErrors.sctCode != undefined,
      missingManager: formErrors.manager != undefined,
    });
  }, [
    formErrors.name,
    formErrors.tons,
    formErrors.container,
    formErrors.area,
    formErrors.processingStage,
    formErrors.entryDate,
    formErrors.exitDate,
    formErrors.provider1,
    formErrors.provider2,
    formErrors.sctCode,
    formErrors.manager
  ]);

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState<LoadFormValuesResponse | null>(null);

  useEffect(() => {
    async function loadFormData() {
      setLoading(true);
      try {
        const res = await loadFormValuesRequest();
        setValues(res.data);
      } catch (error: any) {
        if (!error.response?.data) {
          setLoading(false);
          throw UnexpectedError;
        }

        const errorData = error.response.data as ErrorResponse;
        setErrors({ [errorData.type]: true });
      }

      setLoading(false);
    }
    loadFormData();
  }, []);

  const onSubmit = handleSubmit(async (data: UploadFormBody) => {
    setUploading(true);

    try {
      await uploadFormRequest(data);
      reset();
    } catch (error: any) {
      if (!error.response?.data) {
        setLoading(false);
        throw UnexpectedError;
      }

      const errorData = error.response.data as ErrorResponse;
      setErrors({ [errorData.type]: true });
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
        <SelectableFormField control={control} showError={errors.missingName} errorMessage="Seleccione un residuo" label="Residuo" name="name" values={values.names} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
          <NumberFormField control={control} showError={errors.missingTons} errorMessage="Ingrese las toneladas" label="Toneladas" name="tons" />

          <SelectableFormField control={control} showError={errors.missingContainer} errorMessage="Seleccione un contenedor" label="Contenedor" name="container" values={values.containers} />
          <SelectableFormField control={control} showError={errors.missingArea} errorMessage="Seleccione un área" label="Area" name="area" values={values.areas} />
          <SelectableFormField control={control} showError={errors.missingProcessingStage} errorMessage="Seleccione un estado de procesamiento" label="Estado de procesamiento" name="processingStage" values={values.processingStages} />

          <DateFormField control={control} showError={errors.missingEntryDate} errorMessage="Ingrese una fecha de entrada" label="Fecha de entrada" name="entryDate" />
          <DateFormField control={control} showError={errors.missingExitDate} errorMessage="Ingrese una fecha de salida" label="Fecha de salida" name="exitDate" />

          <SelectableFormField control={control} showError={errors.missingProvider1} errorMessage="Seleccione una razón social" label="Razón social 1" name="provider1" values={values.providers1} />
          <SelectableFormField control={control} showError={errors.missingProvider2} errorMessage="Seleccione una razón social" label="Razón social 2" name="provider2" values={values.providers2} />
          <SelectableFormField control={control} showError={errors.missingSctCode} errorMessage="Seleccione un código SCT" label="Código SCT" name="sctCode" values={values.sctCodes} />
          <SelectableFormField control={control} showError={errors.missingManager} errorMessage="Seleccione a un responsable" label="Nombre del responable" name="manager" values={values.managers} />
        </div>

        <button type="submit" className="w-fit mt-2 bg-black text-white px-4 py-2 rounded border-none cursor-pointer flex gap-x-3 items-center">
          Crear Registro
          {uploading && <LoadingIcon color="text-white" />}
        </button>
      </form>
    </div>
  );
};

type BaseFormField = {
  control: Control<UploadFormBody, any, UploadFormBody>;
  name: "name" | "tons" | "container" | "area" | "entryDate" | "exitDate" | "processingStage" | "provider1" | "sctCode" | "provider2" | "manager";
  label: string;
  showError?: boolean;
  errorMessage: string;
};

const SelectableFormField = (props: BaseFormField & { values: string[] }) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: true }}
      defaultValue={props.values[0]}
      render={({ field }) => (
        <div className="relative w-full">
          <label htmlFor={props.name} className="text-sm mb-2">{props.label}</label>
          <select {...field} className="w-full p-2 text-md border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option value=''>-- Seleccionar --</option>

            {
              props.values.map((value: string, index: number) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))
            }
          </select>
          <ChevronDown className="size-5 absolute right-3 top-11 -translate-y-1/2 pointer-events-none" />
          {props.showError && <span className="absolute left-0 -bottom-6 text-red-500 text-sm">{props.errorMessage}</span>}
        </div>
      )}
    />
  );
};

const NumberFormField = (props: BaseFormField) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: true, validate: (value) => Number(value) > 0 }}
      render={({ field }) => (
        <div className="relative w-full">
          <label htmlFor={props.name} className="text-sm mb-2">{props.label}</label>
          <input
            {...field}
            type="number"
            className="w-full p-2 text-md border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {props.showError && <span className="absolute left-0 -bottom-6 text-red-500 text-sm">{props.errorMessage}</span>}
        </div>
      )}
    />
  );
};

const DateFormField = (props: BaseFormField) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: true }}
      render={({ field }) => (
        <div className="relative w-full">
          <label htmlFor={props.name} className="text-sm mb-2">{props.label}</label>
          <input
            {...field}
            type="date"
            className="w-full p-2 text-md border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <Calendar className="size-5 absolute right-3 top-11 -translate-y-1/2 pointer-events-none" />
          {props.showError && <span className="absolute left-0 -bottom-6 text-red-500 text-sm">{props.errorMessage}</span>}
        </div>
      )}
    />
  );
};
