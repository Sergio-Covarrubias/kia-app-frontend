import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import ROUTES from "@constants/routes";
import UnexpectedError from "@constants/unexpected-error";
import { User, LoginBody, LoginResponse } from "@schemas/auth";
import { loginRequest, validateSessionRequest } from "@api/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (loginData: LoginBody) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
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

  const login = async (loginData: LoginBody) => {
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
