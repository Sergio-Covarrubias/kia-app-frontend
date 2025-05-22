import { useState } from "react";

import ROUTES from "@constants/routes";
import { useAuth } from "@contexts/AuthContext";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FilePen,
  GraduationCap,
  ShieldUser,
  LogOut
} from "lucide-react";

import KiaLogo from "@assets/kia-logo-white.png";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const TABS: TabProps[] = [
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      link: ROUTES.DASHBOARD,
    },
    {
      icon: FilePen,
      name: "Formulario",
      link: ROUTES.FORM,
    },
    {
      icon: GraduationCap,
      name: "Guía",
      link: "https://682689c7b2a10837fe198ee1--extraordinary-basbousa-a608af.netlify.app/",
      newTab: true,
    },
    {
      icon: ShieldUser,
      name: "Admin Dashboard",
      link: ROUTES.ADMIN_DASHBOARD,
      requiresAdmin: true,
    },
    {
      icon: LogOut,
      name: "Cerrar sesión",
      link: ROUTES.LOGIN,
      onClick: () => logout(),
    },
  ];

  // Closed sidebar
  if (!isOpen) {
    return (
      <div className="sticky h-screen w-[var(--sidebar-collapsed-width)] -ml-[var(--sidebar-collapsed-width)] top-0 left-0 rounded-r-4xl bg-black cursor-pointer flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <ChevronRight className="size-8 text-white" />
      </div>
    )
  }

  // Open sidebar
  return (
    <div className="sticky z-50 h-screen w-[var(--sidebar-width)] -ml-[var(--sidebar-width)] top-0 left-0 rounded-r-4xl bg-black pr-10 pl-5 py-6 flex">
      <div className="absolute h-full w-[var(--sidebar-collapsed-width)] top-0 right-0 cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <ChevronLeft className="size-8 text-white absolute top-1/2 left-1/2 -translate-1/2" />
      </div>

      <div className="flex-1 flex flex-col">
        <img src={KiaLogo} alt="Kia Logo" />
        <div className="mb-3 w-full h-px bg-white"></div>
        <div className="flex flex-col">
          {
            TABS.map((tab: TabProps, index: number) => (
              (!tab.requiresAdmin || (tab.requiresAdmin && user?.isAdmin)) &&
              <Tab key={index} {...tab} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

type TabProps = {
  icon: typeof FilePen;
  name: string;
  link: string;
  newTab?: boolean;
  onClick?: () => void;
  requiresAdmin?: boolean;
};

const Tab = (props: TabProps) => {
  return (
    <a href={props.link} target={props.newTab ? "_blank" : "_self"} onClick={props.onClick}>
      <div className="py-3.5 px-3 w-full flex items-center gap-x-4 rounded-xs text-white hover:bg-gradient-to-l hover:from-[#ffffff76] hover:to-[#040404] transition duration-200 ease-in-out">
        <props.icon className="size-5" />
        <p className="text-sm font-semibold">{props.name}</p>
      </div>
    </a>
  );
};
