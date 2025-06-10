import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetFormOptionsResponse, GetFormOptionsErrors, PostFormBody, PostFormErrors, GetFormErrors, PutFormErrors, DeleteFormErrors } from "@schemas/forms";
import { getFormOptionsRequest, postFormRequest, getFormRequest, putFormRequest, deleteFormRequest } from "@api/forms";

import { SelectFormField, TextFormField, DateFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";

type FormErrors = GetFormOptionsErrors & PostFormErrors & PutFormErrors & DeleteFormErrors;

export default function Form() {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, reset } = useForm<PostFormBody>({
    defaultValues: {
      residue: "",
      quantity: "",
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
  const [errors, setErrors] = useState<FormErrors>({});

  const [values, setValues] = useState<GetFormOptionsResponse | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const [formId, setFormId] = useState<number | null>(null);

  useEffect(() => {
    async function loadFormOptions() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getFormOptionsRequest();
        setValues(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetFormOptionsErrors));
      }

      const searchParams = new URLSearchParams(document.location.search);
      const formIdQ = searchParams.get("form");

      if (formIdQ && !isNaN(+formIdQ)) {
        const id = +formIdQ;

        try {
          const res = await getFormRequest(id);

          reset({
            ...res.data,
            quantity: res.data.quantity.toString(),
            tons: res.data.tons.toString(),
          });
        } catch (error: any) {
          setErrors(getRequestError(error, GetFormErrors));
        }

        setFormId(id);
      }

      setLoading(false);
    }
    loadFormOptions();
  }, []);

  const onSubmit = handleSubmit(async (data: PostFormBody) => {
    setCreating(true);

    try {
      if (formId) {
        await putFormRequest(formId, data);
        navigate(ROUTES.ADMIN_FORMS);
      } else {
        await postFormRequest(data);
        navigate(ROUTES.DASHBOARD);
      }
    } catch (error: any) {
      setErrors(getRequestError(error, formId ? PutFormErrors : PostFormErrors));
    }

    setCreating(false);
  });

  if (loading || !values) {
    return <LoadingPage />
  }

  return (
    <div className="page-container p-10 gap-y-6 items-center">
      {formId && <GoBackButton path={ROUTES.ADMIN_FORMS} />}

      <h1 className="text-3xl font-bold text-center">Formulario</h1>

      <form onSubmit={onSubmit} className="w-full max-w-[48rem] flex flex-col gap-y-8 items-center">
        <SelectFormField<PostFormBody> control={control} fieldName="residue" label="Residuo" required="Seleccione un residuo" error={formErrors.residue?.message || errors.residue} values={values.residues} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
          <TextFormField<PostFormBody> control={control} fieldName="quantity" label="Unidades" required="Ingrese las unidades" error={formErrors.quantity?.message} type="number" />
          <TextFormField<PostFormBody> control={control} fieldName="tons" label="Toneladas" required="Ingrese las toneladas" error={formErrors.tons?.message} type="number" />

          <SelectFormField<PostFormBody> control={control} fieldName="container" label="Contenedor" required="Seleccione un contenedor" error={formErrors.container?.message || errors.container} values={values.containers} />
          <SelectFormField<PostFormBody> control={control} fieldName="area" label="Área" required="Seleccione una área" error={formErrors.area?.message || errors.area} values={values.areas} />


          <DateFormField<PostFormBody> control={control} fieldName="entryDate" label="Fecha de entrada" required="Ingrese una fecha de entrada" error={formErrors.entryDate?.message} />
          <DateFormField<PostFormBody> control={control} fieldName="exitDate" label="Fecha de salida" required="Ingrese una fecha de salida" error={formErrors.exitDate?.message} />

          <SelectFormField<PostFormBody> control={control} fieldName="processingStage" label="Etapa de procesamiento" required="Seleccione una etapa de procesamiento" error={formErrors.processingStage?.message || errors.processingStage} values={values.processingStages} />
          <SelectFormField<PostFormBody> control={control} fieldName="provider1" label="Razón social 1" required="Seleccione una razón social 1" error={formErrors.provider1?.message || errors.provider1} values={values.providers1} />
          
          <SelectFormField<PostFormBody> control={control} fieldName="provider2" label="Razón social 2" required="Seleccione una razón social 2" error={formErrors.provider2?.message || errors.provider2} values={values.providers2} />
          <SelectFormField<PostFormBody> control={control} fieldName="sctCode" label="Código SCT" required="Seleccione un código SCT" error={formErrors.sctCode?.message || errors.sctCode} values={values.sctCodes} />
        </div>
        <SelectFormField<PostFormBody> control={control} fieldName="manager" label="Responsable" required="Seleccione a un responsable" error={formErrors.manager?.message || errors.manager} values={values.managers} />

        <div className="mt-2 flex flex-col-reverse md:flex-row justify-center items-center gap-x-6 gap-y-4">
          {
            formId ?
              <>
                <button type="button" className="w-fit px-4 py-2.5 rounded-md button-component"
                  onClick={async () => {
                    setDeleting(true);
                    try {
                      await deleteFormRequest(formId);
                      navigate(ROUTES.ADMIN_FORMS);
                    } catch (error: any) {
                      setErrors(getRequestError(error, DeleteFormErrors));
                    }
                    setDeleting(false);
                  }}
                >
                  Eliminar registro
                  {deleting && <LoadingIcon />}
                </button>

                <button type="submit" className="w-fit px-4 py-2.5 rounded-md button-component">
                  Actualizar registro
                  {creating && <LoadingIcon />}
                </button>
              </>
              :
              <button type="submit" className="w-fit px-4 py-2.5 rounded-md button-component">
                Crear registro
                {creating && <LoadingIcon />}
              </button>
          }
        </div>
      </form>
    </div>
  );
};
