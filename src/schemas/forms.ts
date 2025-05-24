export type GetFormOptionsResponse = {
  residues: string[];
  containers: string[];
  areas: string[];
  processingStages: string[];
  providers1: string[];
  providers2: string[];
  sctCodes: string[];
  managers: string[];
};
export type GetFormOptionsErrors = {};
export const GetFormOptionsErrors: GetFormOptionsErrors = {};

export type PostFormBody = {
  residue: string;
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
export type PostFormErrors = {
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
export const PostFormErrors: PostFormErrors = {
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

export type GetFormsResponse = {
  forms: {
    id: number;
    residue: string;
    tons: number;
    area: string;
    entryDate: string;
    exitDate?: string;
  }[];
  totalPages: number;
};

export type GetFormsErrors = {
  page?: string;
  limit?: string;
};
export const GetFormsErrors: GetFormsErrors = {
  page: 'El número de página debe de ser mayor a 0',
  limit: 'La cantidad de resultados debe de ser mayor a cero',
};

export type GetFormResponse = {
  residue: string;
  container: string;
  tons: number;
  area: string;
  entryDate: string;
  exitDate: string;
  processingStage: string;
  provider1: string;
  sctCode: string;
  provider2: string;
  manager: string;
};

export type GetFormErrors = { nonExisting?: string; };
export const GetFormErrors: GetFormErrors = {
  nonExisting: "No existe formulario con el ID dado",
};

export type PutFormErrors = { 
  nonExisting?: string; 
  residue?: string;
  container?: string;
  area?: string;
  processingStage?: string;
  provider1?: string;
  sctCode?: string;
  provider2?: string;
  manager?: string;
};
export const PutFormErrors: PutFormErrors = {
  nonExisting: "No existe formulario con el ID dado",
  residue: "El residuo no existe",
  container: "El contenedor no existe",
  area: "El área no existe",
  processingStage: "La etapa de procesamiento no existe",
  provider1: "La razón social 1 no existe",
  sctCode: "El código SCT no existe",
  provider2: "La razón social 2 no existe",
  manager: "El responsable no existe",
};

export type DeleteFormErrors = { nonExisting?: string; };
export const DeleteFormErrors: DeleteFormErrors = {
  nonExisting: "No existe formulario con el ID dado",
};
