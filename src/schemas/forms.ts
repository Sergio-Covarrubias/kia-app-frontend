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
