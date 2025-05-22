import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetAreasResponse } from "@schemas/resources/areas";
import { getAreasRequest, postAreaRequest, putAreaRequest, deleteAreaRequest } from "@api/resources/areas";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import LoadingIcon from "@components/LoadingIcon";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import NameSelector from "@components/admin-dashboard/NameSelector";

type AreaFields = {
  area: {
    name: string;
  };
};

type AreaErrors = {
  name?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const AreaCreateErrors = {
  name: "Un área con ese nombre ya existe",
};

const Areas = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<AreaFields>({
    defaultValues: {
      area: {
        name: "",
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AreaErrors>({});

  const [areaData, setAreaData] = useState<GetAreasResponse | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();
  
  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getAreasRequest();
        setAreaData(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: AreaFields) => {
    if (!areaData) {
      return;
    }

    setUploading(true);

    try {
      const area = {
        name: data.area.name,
      };

      if (creatingNewResource) {
        await postAreaRequest(area);
      } else {
        await putAreaRequest(areaData[dataIndex].id, area);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...AreaCreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !areaData) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton />

      <h1 className="form-title">Áreas</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={areaData.map(area => area.name)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const area = areaData[index];
              setValue("area", {
                name: area.name,
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<AreaFields> control={control} fieldName="area.name" label="Nombre del área"
            required="Escriba el nombre del área"
            error={formErrors.area?.name?.message || errors.name || errors.nonExisting}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={areaData[dataIndex].id}
              deleteFunction={deleteAreaRequest}
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

export default Areas;
