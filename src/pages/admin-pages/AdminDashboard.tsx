import { ReactNode, useState, } from "react";
import { Link } from 'react-router-dom';

import ROUTES from "@constants/routes";

import {
  CornerUpLeft,
  UserCog, FileCog,
  UserPlus, UserMinus, UserPen,
  Radiation, Box, LandPlot, Replace, Heading1, Barcode, Heading2, SquareUser
} from "lucide-react"

type TabOptions = "main" | "users" | "form";

const AdminDashboard = () => {
  const [tab, setTab] = useState<TabOptions>("main");

  const MAIN_SECTIONS: SectionContainerProps[] = [
    {
      Icon: UserCog,
      name: "Modificar usuarios",
      action: () => setTab("users"),
    },
    {
      Icon: FileCog,
      name: "Modificar formulario",
      action: () => setTab("form"),
    },
  ];

  const USERS_SECTION: SectionContainerProps[] = [
    {
      Icon: UserPlus,
      name: "Agregar usuario",
      path: ROUTES.ADMIN_USERS("create"),
    },
    {
      Icon: UserPen,
      name: "Modificar usuario",
      path: ROUTES.ADMIN_USERS("update"),
    },
    {
      Icon: UserMinus,
      name: "Eliminar usuario",
      path: ROUTES.ADMIN_USERS("delete"),
    },
    {
      Icon: CornerUpLeft,
      name: "Regresar",
      action: () => setTab("main"),
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
      path: ROUTES.ADMIN_RESIDUES,
    },
    {
      Icon: LandPlot,
      name: "Modificar areas",
      path: ROUTES.ADMIN_RESIDUES,
    },
    {
      Icon: Replace,
      name: "Modificar etapas de procesamiento",
      path: ROUTES.ADMIN_RESIDUES,
    },
    {
      Icon: Heading1,
      name: "Modificar razones sociales 1",
      path: ROUTES.ADMIN_RESIDUES,
    },
    {
      Icon: Barcode,
      name: "Modificar códigos SCT",
      path: ROUTES.ADMIN_RESIDUES,
    },
    {
      Icon: Heading2,
      name: "Modificar razones sociales 2",
      path: ROUTES.ADMIN_RESIDUES,
    },
    {
      Icon: SquareUser,
      name: "Modificar nombres de responsables",
      path: ROUTES.ADMIN_RESIDUES,
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
    case "users":
      tabs = USERS_SECTION;
      break;
    case "form":
      tabs = FORM_SECTIONS;
      break;
  }

  return (
    <div className="page-container p-10 justify-center items-center bbg-yellow-200">
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
