export type UserType = {
    id: number;
    isAdmin: boolean;
};

export type SigninDataType = {
    corporateId: string;
    password: string;
};

export type SigninResponseType = {
    token: string;
} & UserType;

export type LoginDataType = {
    corporateId: string;
    password: string;
};

export type LoginResponseType = {
    token: string;
} & UserType;

export type ValidateResponseType = UserType;
