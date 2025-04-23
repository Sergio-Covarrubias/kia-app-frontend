import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserType, SigninDataType, LoginDataType } from '@schemas/auth';

interface AuthContextType {
    user: UserType | null;
    loading: boolean;
    signin: (signinData: SigninDataType) => void;
    login: (loginData: LoginDataType) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setUser(null);
        setLoading(false);
    }, []);

    const signin = (signinData: SigninDataType) => {
        signinData
    };

    const login = (loginData: LoginDataType) => {
        loginData
    };

    const logout = () => {

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
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
