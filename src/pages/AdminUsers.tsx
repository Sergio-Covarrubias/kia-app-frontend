import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

import ROUTES from "@constants/routes";

import { useAuth } from "@contexts/AuthContext";
import { useAdminUsers } from "@contexts/AdminUsersContext";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import LoadingIcon from "@components/LoadingIcon";

const AdminUsers = () => {
  const navigate = useNavigate();

  const { user: userData } = useAuth();
  const { usersData, loading, page, setPage, query, setQuery } = useAdminUsers();

  const hasLoadedData = !loading && usersData;

  const ROW_CLASSNAME = " py-2 flex items-center border-b-2 border-black font-medium text-center text-xs md:text-sm odd:bg-white even:bg-gray-100 ";

  return (
    <div className="page-container md:p-20 justify-center items-center">
      <div className="w-full py-8 flex flex-col gap-y-5 flex-1 bg-white rounded-lg">
        {/* Title and search bar */}
        <div className="px-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <h1 className="text-left text-3xl font-semibold">Usuarios</h1>

          <div className="relative">
            <input
              type="text" placeholder="Ingresa un ID"
              className="pl-5 pr-9 py-1.5 border border-gray-400 rounded-full focus:ring-2 focus:ring-blue-500"
              value={query} onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute top-2 right-3 size-5 text-black" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-y-5 justify-between">
          {/* Form data */}
          <div className="flex flex-col">
            <div className={ROW_CLASSNAME}>
              <p className="flex-1/3">ID corporativo</p>
              <p className="flex-1/3">Permisos</p>
              <p className="flex-1/3"></p>
            </div>

            {
              !hasLoadedData ?
                <div className="my-10 flex gap-x-3 justify-center items-center font-semibold text-lg">
                  Loading
                  <LoadingIcon />
                </div>
                :
                usersData.users.map((user, index: number) => (
                  <Link to={user.id !== userData?.id ? ROUTES.ADMIN_USER_FORM_EDIT(user.id) : ""} key={index}
                    className={classNames(ROW_CLASSNAME, "hover:bg-gray-200 transition duration-150 ease-in-out",
                      {
                        "cursor-pointer": user.id !== userData?.id,
                        "cursor-not-allowed": user.id === userData?.id,
                      }
                    )}
                  >
                    <p className="flex-1/3">{user.corporateId}</p>
                    <p className="flex-1/3">{user.isAdmin ? "Administrador" : "Regular"}</p>
                    <div className="flex-1/3">
                      <button className="px-3 py-1 bg-black text-white text-xs font-medium rounded-lg pointer- cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(ROUTES.ADMIN_CHANGE_PASSWORD(user.id));
                        }}
                      >
                        Cambiar contraseña
                      </button>
                    </div>
                  </Link>
                ))
            }
          </div>

          {/* Pagination arrows */}
          {
            hasLoadedData &&
            <div className="flex justify-center">
              <span className="relative min-w-12 text-center font-semibold text-lg w-fit select-none">
                {page > 1 &&
                  <ChevronLeft
                    className="absolute inset-y-0 right-10 size-7 text-black cursor-pointer"
                    onClick={() => setPage(page - 1)}
                  />
                }

                {page}

                {page < usersData.totalPages &&
                  <ChevronRight
                    className="absolute inset-y-0 left-10 size-7 text-black cursor-pointer"
                    onClick={() => setPage(page + 1)}
                  />
                }
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
