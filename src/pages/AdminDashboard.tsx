import { ReactNode, useState, } from "react";
import { Link } from "react-router-dom";

import ROUTES from "@constants/routes";

import {
  CornerUpLeft,
  UserPlus, UserCog, FilePen, FileCog,
  Radiation, Box, LandPlot, Replace, Heading1, Barcode, Heading2, SquareUser
} from "lucide-react"

type TabOptions = "main" | "form";

const AdminDashboard = () => {
  const [tab, setTab] = useState<TabOptions>("main");

  const MAIN_SECTIONS: SectionContainerProps[] = [
    {
      Icon: UserPlus,
      name: "Añadir usuario",
      path: ROUTES.ADMIN_USER_FORM,
    },
    {
      Icon: UserCog,
      name: "Editar usuarios",
      path: ROUTES.ADMIN_USERS,
    },
    {
      Icon: FilePen,
      name: "Editar registros de formularios",
      path: ROUTES.ADMIN_FORMS,
    },
    {
      Icon: FileCog,
      name: "Editar opciones de formulario",
      action: () => setTab("form"),
    },
  ];

  const FORM_SECTIONS: SectionContainerProps[] = [
    {
      Icon: Radiation,
      name: "Modificar residuos",
      path: ROUTES.ADMIN_RESIDUES,
    },
    {
      Icon: Box,
      name: "Modificar contenerdores",
      path: ROUTES.ADMIN_CONTAINERS,
    },
    {
      Icon: LandPlot,
      name: "Modificar areas",
      path: ROUTES.ADMIN_AREAS,
    },
    {
      Icon: Replace,
      name: "Modificar etapas de procesamiento",
      path: ROUTES.ADMIN_PROCESSING_STAGES,
    },
    {
      Icon: Heading1,
      name: "Modificar razones sociales 1",
      path: ROUTES.ADMIN_PROVIDERS1,
    },
    {
      Icon: Barcode,
      name: "Modificar códigos SCT",
      path: ROUTES.ADMIN_SCT_CODES,
    },
    {
      Icon: Heading2,
      name: "Modificar razones sociales 2",
      path: ROUTES.ADMIN_PROVIDERS2,
    },
    {
      Icon: SquareUser,
      name: "Modificar nombres de responsables",
      path: ROUTES.ADMIN_MANAGERS,
    },
    {
      Icon: CornerUpLeft,
      name: "Regresar",
      action: () => setTab("main"),
    },
  ];

  let tabs: SectionContainerProps[];
  switch (tab) {
    case "main":
      tabs = MAIN_SECTIONS;
      break;
    case "form":
      tabs = FORM_SECTIONS;
      break;
  }

  return (
    <div className="page-container p-10 justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bbg-red-200">
        {
          tabs.map((tabProps: SectionContainerProps, index: number) => (
            <SectionContainer key={index} {...tabProps} />
          ))
        }
      </div>
    </div>
  );
};

export default AdminDashboard;

type SectionContainerProps = {
  Icon: typeof UserCog;
  name: string;
  path?: string;
  action?: () => void;
};
const SectionContainer = (props: SectionContainerProps) => {
  const Redirect = ({ children }: { children: ReactNode }) => <Link to={props.path || "/"}>{children}</Link>;
  const Pointer = ({ children }: { children: ReactNode }) => <div className="cursor-pointer" onClick={props.action}>{children}</div>;
  const Wrapper = props.path ? Redirect : Pointer;

  return (
    <Wrapper>
      <div
        className="aspect-square p-10 max-w-[22rem]
                flex flex-col gap-y-8 justify-center items-center 
                border-4 rounded-xl cursor-pointer
                border-white hover:border-black
                transition duration-150 ease-in-out
                bg-black  hover:bg-white
                text-white hover:text-black"
      >
        <props.Icon className="size-18" />
        <span className="text-2xl font-medium text-center">{props.name}</span>
      </div>
    </Wrapper>
  );
};
