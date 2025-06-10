import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";

import { SelectFormField, TextFormField, DateFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";

import { GetManifestResponse, PostManifestBody, PostManifestErrors } from "@schemas/manifest";
import { getManifestRequest, postManifestRequest } from "@api/manifest";

const Manifest = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors } } = useForm<PostManifestBody>({
    defaultValues: {
      provider1: "",
      provider2: "",
      sctCode: "",
      manager: "",
      exitDate: "",
      manifestCode: "",
      driver: "",
      plateCode: "",
    },
  });

  const [values, setValues] = useState<GetManifestResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostManifestErrors>({});

  useEffect(() => {
    async function LoadValues() {
      setLoading(true);
      setErrors({});

      try {
        const res = await getManifestRequest();
        setValues(res.data);
      } catch (error: any) {
        console.error(error);
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: PostManifestBody) => {
    setGenerating(true);

    try {
      const res = await postManifestRequest(data);

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Manifesto ${data.exitDate}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      setErrors({ empty: PostManifestErrors.empty });
    }

    setGenerating(false);
  });

  if (loading || !values) {
    return <LoadingPage />
  }

  return (
    <div className="page-container p-10 gap-y-6 items-center">
      <h1 className="text-3xl font-bold text-center">Generar manifiesto</h1>

      <form onSubmit={onSubmit} className="w-full max-w-[48rem] flex flex-col gap-y-8 items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
          <SelectFormField<PostManifestBody> control={control} fieldName="provider1" label="Razón social 1" required="Seleccione una razón social" error={formErrors.provider1?.message} values={values.providers1} />
          <SelectFormField<PostManifestBody> control={control} fieldName="provider2" label="Razón social 2" required="Seleccione una razón social" error={formErrors.provider2?.message} values={values.providers2} />

          <SelectFormField<PostManifestBody> control={control} fieldName="sctCode" label="Código SCT" required="Seleccione un código SCT" error={formErrors.sctCode?.message} values={values.sctCodes} />
          <SelectFormField<PostManifestBody> control={control} fieldName="manager" label="Responsable" required="Seleccione un responsable" error={formErrors.manager?.message} values={values.managers} />

          <DateFormField<PostManifestBody> control={control} fieldName="exitDate" label="Fecha de salida" required="Ingrese una fecha de salida" error={formErrors.exitDate?.message} />
          <TextFormField<PostManifestBody> control={control} fieldName="manifestCode" label="Código de manifiesto" required="Ingrese las código" error={formErrors.manifestCode?.message} />

          <TextFormField<PostManifestBody> control={control} fieldName="driver" label="Chófer" required="Ingrese el nombre del chófer" error={formErrors.driver?.message} />
          <TextFormField<PostManifestBody> control={control} fieldName="plateCode" label="Placas" required="Ingrese las placas" error={formErrors.plateCode?.message} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-red-500 text-center">{errors.empty}</p>
          <button type="submit" className="w-fit px-4 py-2.5 rounded-md button-component">
            Crear registro
            {generating && <LoadingIcon />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Manifest;
