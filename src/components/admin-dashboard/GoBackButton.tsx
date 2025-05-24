import { Link } from "react-router-dom";
import { CornerUpLeft } from "lucide-react";

type GoBackButtonProps = {
  path: string;
};

const GoBackButton = (props: GoBackButtonProps) => {
  return(
    <Link to={props.path}  
      className="absolute top-10 right-10
      p-2 rounded-full border-2 border-black
      bg-black hover:bg-white 
      text-white hover:text-black
      transition ease-in-out duration-150 hover:scale-110"
    >
      <CornerUpLeft className="size-6" />
    </Link>
  );
};

export default GoBackButton;
