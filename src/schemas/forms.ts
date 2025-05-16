export type LoadFormValuesResponse = {
  names: string[];
  containers: string[];
  areas: string[];
  processingStages: string[];
  providers1: string[];
  providers2: string[];
  sctCodes: string[];
  managers: string[];
};

export type LoadFormValuesErrors = {};
export const LoadFormValuesErrors: LoadFormValuesErrors = {};

export type UploadFormBody = {
  name: string;
  tons: string;
  container: string;
  area: string;
  entryDate: string;
  exitDate: string;
  processingStage: string;
  provider1: string;
  sctCode: string;
  provider2: string;
  manager: string;
};

export type UploadFormErrors = { 
  user?: string;
  residue?: string;
  container?: string;
  area?: string;
  processingStage?: string;
  provider1?: string;
  sctCode?: string;
  provider2?: string;
  manager?: string;
};
export const UploadFormErrors: UploadFormErrors = {
  user: "El usuario no existe",
  residue: "El residuo no existe",
  container: "El contenedor no existe",
  area: "El área no existe",
  processingStage: "La etapa de procesamiento no existe",
  provider1: "La razón social 1 no existe",
  sctCode: "El código SCT no existe",
  provider2: "La razón social 2 no existe",
  manager: "El responsable no existe",
};
