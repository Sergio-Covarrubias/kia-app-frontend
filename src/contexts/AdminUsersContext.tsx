import React, { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import UnexpectedError from "@constants/unexpected-error";

import { GetUsersResponse } from "@schemas/users";
import { getUsersRequest } from "@api/users";

interface AdminUsersContextType {
  usersData: GetUsersResponse | null;
  loading: boolean;

  page: number;
  setPage: (page: number) => void;

  query: string;
  setQuery: (query: string) => void;

  reloadUsers: () => Promise<void>;
}

const AdminUsersContext = createContext<AdminUsersContextType | undefined>(undefined);

interface AdminUsersProviderProps { }

export const AdminUsersProvider: React.FC<AdminUsersProviderProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const LIMIT = 8;
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const [usersData, setUserData] = useState<GetUsersResponse | null>(null);

  const reloadUsers = async () => {
    try {
      const res = await getUsersRequest(query, page, LIMIT);
      setUserData(res.data);
    } catch (error: any) {
      throw error.response?.data || UnexpectedError;
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    const getData = setTimeout(async () => {
      await reloadUsers();
    }, 1000);

    return () => clearTimeout(getData);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setPage(1);

    const getData = setTimeout(async () => {
      await reloadUsers();
    }, 1000);

    return () => clearTimeout(getData);
  }, [query]);

  return (
    <AdminUsersContext.Provider value={{
      usersData,
      loading,

      page,
      setPage,

      query,
      setQuery,

      reloadUsers,
    }}>
      <Outlet />
    </AdminUsersContext.Provider>
  );
};

export const useAdminUsers = () => {
  const context = useContext(AdminUsersContext);
  if (!context) {
    throw new Error("useAdminUsers must be used within a AdminUsersProvider");
  }
  return context;
};
