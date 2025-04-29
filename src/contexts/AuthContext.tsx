import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import ROUTES from "@constants/routes";
import UnexpectedError from "@constants/unexpected-error";
import { UserType, SigninDataType, SigninResponseType, LoginDataType, LoginResponseType } from "@schemas/auth";
import { signinRequest, loginRequest, validateSessionRequest } from "@api/auth";

interface AuthContextType {
    user: UserType | null;
    loading: boolean;
    signin: (signinData: SigninDataType) => Promise<SigninResponseType>;
    login: (loginData: LoginDataType) => Promise<LoginResponseType>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function validateUser() {
            setLoading(true);

            try {
                const res = await validateSessionRequest();
                setUser(res.data);
            } catch {
                navigate(ROUTES.LOGIN);
            }
    
            setLoading(false);
        }
        validateUser();
    }, []);

    const signin = async (signinData: SigninDataType) => {
        try {
            const res = await signinRequest(signinData);
            Cookies.set(import.meta.env.VITE_SESSION_COOKIE!, res.data.token);
            setUser(res.data);

            return res.data;
        } catch (error: any) {
            throw error.response?.data || UnexpectedError;
        }
    };

    const login = async (loginData: LoginDataType) => {
        try {
            const res = await loginRequest(loginData);
            Cookies.set(import.meta.env.VITE_SESSION_COOKIE!, res.data.token);
            setUser(res.data);

            return res.data;
        } catch (error: any) {
            throw error.response?.data || UnexpectedError;
        }
    };

    const logout = () => {
        Cookies.remove(import.meta.env.VITE_SESSION_COOKIE!);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signin,
            login,
            logout,

        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
