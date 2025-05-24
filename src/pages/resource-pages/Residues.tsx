import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import getRequestError from "@constants/get-error";
import { GetResiduesResponse } from "@schemas/resources/residues";
import { getResiduesRequest, postResidueRequest, putResidueRequest, deleteResidueRequest } from "@api/resources/residues";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField, BooleanFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import GoBackButton from "@components/admin-dashboard/GoBackButton";
import NameSelector from "@components/admin-dashboard/NameSelector";
import LoadingIcon from "@components/LoadingIcon";

type ResidueFields = {
  residue: {
    name: string;
    translatedName: string;
    C: boolean;
    R: boolean;
    E: boolean;
    T: boolean;
    Te: boolean;
    Th: boolean;
    Tt: boolean;
    I: boolean;
    B: boolean;
    M: boolean;
  };
};

type ResidueErrors = {
  name?: string;
  translated_name?: string;
  emptyMaterials?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const ResidueCreateErrors = {
  name: "Un residuo ya tiene ese nombre",
};

const Residues = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<ResidueFields>({
    defaultValues: {
      residue: {
        name: "",
        translatedName: "",
        C: false, R: false, E: false, T: false, Te: false, Th: false, Tt: false, I: false, B: false, M: false,
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ResidueErrors>({});

  const [residueData, setResidueData] = useState<GetResiduesResponse | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();

  const creatingNewResource = dataIndex === undefined;

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getResiduesRequest();
        setResidueData(res.data);
      } catch (error: any) {
        setErrors(getRequestError(error, GetResourceErrors));
      }

      setLoading(false);
    }
    LoadValues();
  }, []);

  const onSubmit = handleSubmit(async (data: ResidueFields) => {
    if (!residueData) {
      return;
    }

    const parsedMaterials = [
      data.residue.C ? "X" : "O",
      data.residue.R ? "X" : "O",
      data.residue.E ? "X" : "O",
      data.residue.T ? "X" : "O",
      data.residue.Te ? "X" : "O",
      data.residue.Th ? "X" : "O",
      data.residue.Tt ? "X" : "O",
      data.residue.I ? "X" : "O",
      data.residue.B ? "X" : "O",
      data.residue.M ? "X" : "O",
    ].join("");

    if (parsedMaterials === ("OOOOOOOOOO")) {
      setErrors({ emptyMaterials: "Selecciona al menos una etiqueta" });
      return;
    }

    setUploading(true);

    try {
      const residue = {
        name: data.residue.name,
        translatedName: data.residue.translatedName,
        materials: parsedMaterials,
      };

      if (creatingNewResource) {
        await postResidueRequest(residue);
      } else {
        await putResidueRequest(residueData[dataIndex].id, residue);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      setErrors(getRequestError(error, {
        ...creatingNewResource ? PostResourceErrors : PutResourceErrors,
        ...ResidueCreateErrors,
      }));
    }

    setUploading(false);
  });

  if (loading || !residueData) {
    return <LoadingPage />
  }

  return (
    <div className="page-container form-container">
      <GoBackButton path={ROUTES.ADMIN_DASHBOARD} />

      <h1 className="form-title">Residuos</h1>

      <form onSubmit={onSubmit} className="form">
        <NameSelector
          dataIndex={dataIndex}
          data={residueData.map(residue => residue.name)}
          onChage={(e) => {
            const index = !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined;
            setDataIndex(index);

            if (index !== undefined) {
              const residue = residueData[index];
              console.log(residue);
              setValue("residue", {
                name: residue.name,
                translatedName: residue.translatedName,
                C: residue.materials[0] === "X",
                R: residue.materials[1] === "X",
                E: residue.materials[2] === "X",
                T: residue.materials[3] === "X",
                Te: residue.materials[4] === "X",
                Th: residue.materials[5] === "X",
                Tt: residue.materials[6] === "X",
                I: residue.materials[7] === "X",
                B: residue.materials[8] === "X",
                M: residue.materials[9] === "X",
              });
            } else {
              reset();
            }
          }}
        />

        <div className="w-full flex gap-x-5 items-end">
          <TextFormField<ResidueFields> control={control} fieldName="residue.name" label="Nombre del residuo"
            required="Escriba el nombre del residuo"
            error={formErrors.residue?.name?.message || errors.name || errors.nonExisting || errors.emptyMaterials}
          />

          {dataIndex !== undefined &&
            <DeleteItemButton
              id={residueData[dataIndex].id}
              deleteFunction={deleteResidueRequest}
              deleteErrors={DeleteResourceErrors}
              setLoading={setLoading}
              setErrors={setErrors}
            />
          }
        </div>

        <TextFormField<ResidueFields> control={control} fieldName="residue.translatedName" label="Nombre del residuo en inglés"
          required="Escriba el nombre del residuo en inglés"
          error={formErrors.residue?.translatedName?.message || errors.translated_name}
        />

        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-8 place-items-center">
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.C`} label="C" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.R`} label="R" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.E`} label="E" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.T`} label="T" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.Te`} label="Te" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.Th`} label="Th" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.Tt`} label="Tt" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.I`} label="I" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.B`} label="B" />
          <BooleanFormField<ResidueFields> control={control} fieldName={`residue.M`} label="M" />
        </div>

        <button type="submit" className="px-4 py-2 rounded-md button-component">
          {creatingNewResource ? "Crear" : "Actualizar"}
          {uploading && <LoadingIcon color="text-white" />}
        </button>
      </form>
    </div>
  );
};

export default Residues;
