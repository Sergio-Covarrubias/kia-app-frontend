import { useState } from "react";

import { useAuth } from "@contexts/AuthContext";
import ROUTES from "@constants/routes";

import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { FilePen } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { LogOut } from "lucide-react";

import KiaLogo from "@assets/kia-logo-white.png";

const Sidebar = () => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const TABS: TabProps[] = [
        {
            icon: FilePen,
            name: "Formulario",
            link: ROUTES.FORM,
        },
        {
            icon: LayoutDashboard,
            name: "Dashboard",
            link: ROUTES.DASHBOARD,
        },
        {
            icon: LogOut,
            name: "Cerrar sesión",
            link: ROUTES.LOGIN,
            onClick: () => logout(),
        },
    ]

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
                        TABS.map((tab, index) => (
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
    onClick?: () => void;
};

const Tab = (props: TabProps) => {
    return (
        <a href={props.link} onClick={props.onClick}>
            <div className="py-3.5 px-3 w-full flex items-center gap-x-4 rounded-xs text-white hover:bg-gradient-to-l hover:from-[#ffffff76] hover:to-[#040404] transition duration-200 ease-in-out">
                <props.icon className="size-5" />
                <p className="text-sm font-semibold">{props.name}</p>
            </div>
        </a>
    );
};
