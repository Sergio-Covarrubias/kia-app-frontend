export type UserType = {
    id: number;
};

export type SigninDataType = {
    corporateId: string;
    password: string;
};

export type SigninResponseType = {
    token: string;
    id: number;
    corportateId: string;
    password: string;
};

export type LoginDataType = {
    corporateId: string;
    password: string;
};

export type LoginResponseType = {
    token: string;
    id: number;
    corportateId: string;
    password: string;
};

export type ValidateResponseType = {
    id: number;
};
