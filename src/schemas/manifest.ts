export type GetManifestResponse = {
  providers1: string[];
  providers2: string[];
  sctCodes: string[];
  managers: string[];
};

export type PostManifestBody = {
  provider1: string;
  provider2: string;
  sctCode: string;
  manager: string;
  exitDate: string;
  manifestCode: string;
  driver: string;
  plateCode: string;
};

export type PostManifestErrors = { empty?: string; };
export const PostManifestErrors: PostManifestErrors = {
  empty: "No se encontraron registros que coincidan con los datos especificados",
};
