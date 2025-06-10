import React, { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import UnexpectedError from "@constants/unexpected-error";

import { GetFormsResponse } from "@schemas/forms";
import { getFormsRequest } from "@api/forms";

interface AdminFormsContextType {
  formData: GetFormsResponse | null;
  loading: boolean;

  page: number;
  setPage: (page: number) => void;

  query: string;
  setQuery: (query: string) => void;

  startDate: string;
  setStartDate: (startDate: string) => void;

  reloadForms: () => Promise<void>;
}

const AdminFormsContext = createContext<AdminFormsContextType | undefined>(undefined);

interface AdminFromsProviderProps { }

export const AdminFormsProvider: React.FC<AdminFromsProviderProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const LIMIT = 8;
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const [formData, setFormData] = useState<GetFormsResponse | null>(null);

  const reloadForms = async () => {
    try {
      const res = await getFormsRequest(query, page, LIMIT, startDate);
      setFormData(res.data);
    } catch (error: any) {
      throw error.response?.data || UnexpectedError;
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    const getData = setTimeout(async () => {
      await reloadForms();
    }, 1000);

    return () => clearTimeout(getData);
  }, [page, startDate]);

  useEffect(() => {
    setLoading(true);
    setPage(1);

    const getData = setTimeout(async () => {
      await reloadForms();
    }, 1000);

    return () => clearTimeout(getData);
  }, [query]);

  return (
    <AdminFormsContext.Provider value={{
      formData,
      loading,

      page,
      setPage,

      query,
      setQuery,

      startDate,
      setStartDate,

      reloadForms,
    }}>
      <Outlet />
    </AdminFormsContext.Provider>
  );
};

export const useAdminForms = () => {
  const context = useContext(AdminFormsContext);
  if (!context) {
    throw new Error("useAdminForms must be used within a AdminFormsProvider");
  }
  return context;
};
