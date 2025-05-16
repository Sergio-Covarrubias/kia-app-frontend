import { Link } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";

const AdminFormButtons = (props: SubmitFormButtonProps) => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-x-10 gap-y-6 justify-center items-center">
      <GoBackButton />
      <SubmitFormButton loading={props.loading} text={props.text} />
    </div>
  );
};

export default AdminFormButtons;

type SubmitFormButtonProps = {
  loading: boolean;
  text: string;
};
const SubmitFormButton = (props: SubmitFormButtonProps) => {
  return (
    <button type="submit" className="w-fit bg-black text-white px-4 py-2 rounded border-none cursor-pointer flex gap-x-3 items-center">
      {props.text}
      {props.loading && <LoadingIcon color="text-white" />}
    </button>
  );
};

const GoBackButton = () => {
  return (
    <Link to="/admin/dashboard" className="w-fit bg-black text-white px-4 py-2 rounded border-none cursor-pointer flex gap-x-3">
      Regresar
    </Link>
  );
};
