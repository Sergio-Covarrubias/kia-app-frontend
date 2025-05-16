import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ROUTES from "@constants/routes";
import { GetResiduesResponse } from "@schemas/resources/residues";
import { getResiduesRequest, postResidueRequest, putResidueRequest, deleteResidueRequest } from "@api/resources/residues";
import { GetResourceErrors, PostResourceErrors, PutResourceErrors, DeleteResourceErrors } from "@schemas/resources/resources-errors";

import { TextFormField, BooleanFormField } from "@components/FormFields";
import LoadingPage from "@components/LoadingPage";
import DeleteItemButton from "@components/admin-dashboard/DeleteItemButton";
import AdminFormButtons from "@components/admin-dashboard/AdminFormButtons";
import NameSelector from "@components/admin-dashboard/NameSelector";

import UnexpectedError from "@constants/unexpected-error";
import { ErrorResponse } from "@schemas/base-errors";

type ResidueFields = {
  residue: {
    name: string;
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
  emptyMaterials?: string;
} & GetResourceErrors & PostResourceErrors & PutResourceErrors & DeleteResourceErrors;

const AdminResidues = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors: formErrors }, setValue, reset } = useForm<ResidueFields>({
    defaultValues: {
      residue: {
        name: "",
        C: false, R: false, E: false, T: false, Te: false, Th: false, Tt: false, I: false, B: false, M: false,
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ResidueErrors>({});

  const [residueData, setResidueData] = useState<GetResiduesResponse | null>(null);
  const [dataIndex, setDataIndex] = useState<number | undefined>();

  useEffect(() => {
    async function LoadValues() {
      setErrors({});
      setLoading(true);

      try {
        const res = await getResiduesRequest();
        setResidueData(res.data);
      } catch (error: any) {
        error = error.response?.data || UnexpectedError
        const errorData = error as ErrorResponse<GetResiduesResponse>;
        setErrors({ [errorData.type]: GetResourceErrors[errorData.type as keyof GetResourceErrors] || "Error desconocido" });
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
        materials: parsedMaterials,
      };

      if (dataIndex === undefined) {
        await postResidueRequest(residue);
      } else {
        await putResidueRequest(residueData[dataIndex].id, residue);
      }

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      error = error.response?.data || UnexpectedError
      
      if (dataIndex === undefined) {
        const errorData = error as ErrorResponse<PostResourceErrors>;
        setErrors({ [errorData.type]: PostResourceErrors[errorData.type as keyof PostResourceErrors] || "Error desconocido" });
      } else {
        const errorData = error as ErrorResponse<PutResourceErrors>;
        setErrors({ [errorData.type]: PutResourceErrors[errorData.type as keyof PutResourceErrors] || "Error desconocido" });
      }

    }

    setUploading(false);
  });

  if (loading || !residueData) {
    return <LoadingPage />
  }

  return (
    <div className="page-container p-10 gap-y-6 justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center">Recursos</h1>

      <form onSubmit={onSubmit} className="w-full max-w-[48rem] flex flex-col gap-y-8 items-center">
        {/* Select Residue Name */}
        <NameSelector
          dataIndex={dataIndex}
          onChage={(e) => {
            const index = isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value);
            setDataIndex(index);

            if (index !== undefined) {
              const residue = residueData[index];
              console
              setValue("residue", {
                name: residue.name,
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
          data={residueData.map(residue => residue.name)}
        />

        <div className="w-full flex gap-x-5 items-end">
          {/* Residue Name */}
          <TextFormField<ResidueFields> control={control} fieldName="residue.name" label="Nombre del residuo"
            required="Escriba el nombre del residuo"
            error={formErrors.residue?.name?.message || errors.existing || errors.nonExisting || errors.emptyMaterials}
          />

          {/* Delete Residue */}
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

        <AdminFormButtons loading={uploading} text="Enviar" />
      </form>
    </div>
  );
};

export default AdminResidues;
