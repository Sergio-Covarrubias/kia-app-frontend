import { useState } from "react";

import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

import KiaLogo from "@assets/kia-logo-white.png";

import { FilePen } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";

type TabProps = {
    icon: typeof FilePen;
    name: string;
    link: string;
    onClick?: () => void;
}

const Tab = (props: TabProps) => {
    return (
        <a href={props.link} onClick={props.onClick}>
            <div className="py-2.5 px-3 w-full rounded-lg flex items-center gap-x-4 text-white hover:text-[#BB162B] hover:bg-[#bb162b33]">
                <props.icon className="size-5" />
                <p className="text-sm font-semibold">{props.name}</p>
            </div>
        </a>
    );
}

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const TABS: TabProps[] = [
        {
            icon: FilePen,
            name: "Formulario",
            link: "/form",
        },
        {
            icon: LayoutDashboard,
            name: "Dashboard",
            link: "/dashboard",
        },
        {
            icon: User,
            name: "Perfil",
            link: "/",
        },
        {
            icon: LogOut,
            name: "Cerrar sesión",
            link: "/",
            onClick: () => { console.log("Hello"); },
        },
    ]

    // Closed sidebar
    if (!isOpen) {
        return (
            <div className="absolute h-screen w-[var(--sidebar-width)] top-0 right-0 rounded-l-4xl bg-black cursor-pointer flex justify-center items-center"
                onClick={() => setIsOpen(true)}
            >
                <ChevronLeft className="size-8 text-white" />
            </div>
        )
    }

    // Open sidebar
    return (
        <div className="absolute h-screen w-[18rem] top-0 right-0 rounded-l-4xl bg-black pl-11 pr-5 py-6 flex">
            <div className="absolute h-full w-[var(--sidebar-width)] top-0 left-0 cursor-pointer"
                onClick={() => setIsOpen(false)}
            >
                <ChevronRight className="size-8 text-white absolute top-1/2 left-1/2 -translate-1/2" />
            </div>

            <div className="flex-1 flex flex-col">
                <img src={KiaLogo} alt="Kia Logo" />
                <div className="mb-3 w-full h-px bg-white"></div>
                <div className="flex flex-col gap-y-1">
                    {
                        TABS.map((tab, index) => (
                            <Tab key={index} {...tab} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
