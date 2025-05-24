import { Link } from "react-router-dom";

import ROUTES from "@constants/routes";
import { useAdminForms } from "@contexts/AdminFormsContext";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import LoadingIcon from "@components/LoadingIcon";

const AdminForms = () => {
  const { formData, loading, page, setPage, query, setQuery } = useAdminForms();

  const hasLoadedData = !loading && formData;

  const ROW_CLASSNAME = " py-2 flex items-center border-b-2 border-black font-medium text-center text-xs md:text-sm odd:bg-white even:bg-gray-100 ";

  return (
    <div className="page-container md:p-20 justify-center items-center">      
      <div className="w-full py-8 flex flex-col gap-y-5 flex-1 bg-white rounded-lg">
        {/* Title and search bar */}
        <div className="px-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <h1 className="text-left text-3xl font-semibold">Formularios</h1>

          <div className="relative">
            <input 
              type="text" placeholder="Ingresa un residuo" 
              className="pl-5 pr-9 py-1.5 border border-gray-400 rounded-full focus:ring-2 focus:ring-blue-500" 
              value={query} onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute top-2 right-3 size-5 text-black" />
          </div>
        </div>

        {/* Form data */}
        <div className="flex flex-col">
          <div className={ROW_CLASSNAME}>
            <p className="flex-[40%]">Residuo</p>
            <p className="flex-[10%] hidden md:block">Toneladas</p>
            <p className="flex-[20%] hidden md:block">Área</p>
            <p className="flex-[15%]">Entrada</p>
            <p className="flex-[15%]">Salida</p>
          </div>

          {
            !hasLoadedData ?
              <div className="my-10 flex gap-x-3 justify-center items-center font-semibold text-lg">
                Loading
                <LoadingIcon />
              </div>
              :
              formData.forms.map((form, index: number) => (
                <Link to={ROUTES.EDIT_FORM(form.id)} key={index} className={`${ROW_CLASSNAME} cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out `}>
                  <p className="flex-[40%] text-left px-2">{form.residue}</p>
                  <p className="flex-[10%] hidden md:block">{form.tons}</p>
                  <p className="flex-[20%] hidden md:block">{form.area}</p>
                  <p className="flex-[15%]">{form.entryDate}</p>
                  <p className="flex-[15%]">{form.exitDate || "Sin fecha"}</p>
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

              {page < formData.totalPages &&
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
  );
};

export default AdminForms;
