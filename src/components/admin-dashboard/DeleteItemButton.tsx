import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import ROUTES from "@constants/routes";

import { ErrorResponse } from "@schemas/base-errors";
import UnexpectedError from "@constants/unexpected-error";

import { X } from "lucide-react";

type DeleteItemButtonProps<T> = {
  id: number;
  deleteFunction: (id: number) => Promise<AxiosResponse<void, any>>;
  deleteErrors: T;
  setLoading: (loading: boolean) => void;
  setErrors: (errors: any) => void;
};

const DeleteItemButton = <T,>(props: DeleteItemButtonProps<T>) => {
  const navigate = useNavigate();
  
  return (
    <button type="button" className="mb-0.5 p-2 rounded-lg cursor-pointer border-2 border-black bg-black text-white hover:bg-white hover:text-black transition duration-200 ease-in-out"
      onClick={async () => {
        props.setLoading(true);

        try {
          await props.deleteFunction(props.id);
          navigate(ROUTES.ADMIN_DASHBOARD);
        } catch (error: any) {
          error = error.response?.data || UnexpectedError;
          const errorData = error as ErrorResponse<T>;
          props.setErrors({ [errorData.type]: props.deleteErrors[errorData.type] });
        }

        props.setLoading(false);
      }}
    >
      <X className="size-5" />
    </button>
  );
};

export default DeleteItemButton;
