import {
  LayoutGrid,
  LucideIcon,
  BookOpen,
  Truck,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getAgentMenuList(pathname: string): Group[] {
  const BASE_PATH = "";
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/agent-dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard/agent-dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: BASE_PATH + "/loadboard",
          label: "Loadboard",
          active: pathname.includes(BASE_PATH + "/loadboard"),
          icon: BookOpen,
          submenus: [
            {
              href: BASE_PATH + "/loadboard/agent-loadboard",
              label: "My Loadboard",
              active: pathname.includes(BASE_PATH + "/loadboard/agent-loadboard"),
            },
            {
              href: BASE_PATH + "/loadboard/post-load",
              label: "Post Load",
              active: pathname.includes(BASE_PATH + "/loadboard/post-load"),
            },
          ],
        },
      ],
    },
  ];
}

export function getDriverMenuList(pathname: string): Group[] {
  const BASE_PATH = "";
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/driver-dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard/driver-dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: BASE_PATH + "/loadboard",
          label: "Loadboard",
          active: pathname.includes(BASE_PATH + "/loadboard"),
          icon: BookOpen,
          submenus: [
            {
              href: BASE_PATH + "/loadboard/view-loadboard",
              label: "View Loadboard",
              active: pathname.includes(BASE_PATH + "/loadboard/view-loadboard"),
            },
            {
              href: BASE_PATH + "/loadboard/my-loadboard",
              label: "My Loadboard",
              active: pathname.includes(BASE_PATH + "/loadboard/my-loadboard"),
            },
          ],
        },
        {
          href: BASE_PATH + "/trucks",
          label: "My Trucks",
          active: pathname.includes(BASE_PATH + "/trucks"),
          icon: Truck,
          submenus: [],
        },
      ],
    },
  ];
}