import {
  LayoutGrid,
  LucideIcon,
  BookOpen,
  Truck,
  Users,
  Settings,
  DollarSign,
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

export function getAdminMenuList(pathname: string): Group[] {
  const BASE_PATH = "/admin";
  return [
    {
      groupLabel: "Management",
      menus: [
        {
          href: BASE_PATH + "/loads/add",
          label: "Add Load",
          active: pathname.includes(BASE_PATH + "/loads/add"),
          icon: BookOpen,
          submenus: [],
        },
        {
          href: BASE_PATH + "/trucks/add",
          label: "Add Trucks",
          active: pathname.includes(BASE_PATH + "/trucks/add"),
          icon: Truck,
          submenus: [],
        },
        {
          href: BASE_PATH + "/loads/active",
          label: "Active Loads",
          active: pathname.includes(BASE_PATH + "/loads/active"),
          icon: BookOpen,
          submenus: [],
        },
        {
          href: BASE_PATH + "/agents",
          label: "Agents",
          active: pathname.includes(BASE_PATH + "/agents"),
          icon: Users,
          submenus: [
            {
              href: BASE_PATH + "/agents/all-agents",
              label: "View All Agents",
              active: pathname.includes(BASE_PATH + "/agents/all-agents"),
            },
            {
              href: BASE_PATH + "/agents/pending-agents",
              label: "Approve New Agents",
              active: pathname.includes(BASE_PATH + "/agents/pending-agents"),
            },
            {
              href: BASE_PATH + "/agents/canceled-loads",
              label: "Canceled Loads",
              active: pathname.includes(BASE_PATH + "/agents/canceled-loads"),
            },
            {
              href: BASE_PATH + "/agents/pending-loads",
              label: "Pending Loads",
              active: pathname.includes(BASE_PATH + "/agents/pending-loads"),
            },
          ],
        },
        {
          href: BASE_PATH + "/drivers",
          label: "Drivers",
          active: pathname.includes(BASE_PATH + "/drivers"),
          icon: Users,
          submenus: [
            {
              href: BASE_PATH + "/drivers/all-drivers",
              label: "View All Transport Owners/Drivers",
              active: pathname.includes(BASE_PATH + "/drivers/all-drivers"),
            },
            {
              href: BASE_PATH + "/drivers/pending-drivers",
              label: "Approve Transport Owners/Drivers",
              active: pathname.includes(BASE_PATH + "/drivers/pending-drivers"),
            },
            {
              href: BASE_PATH + "/drivers/canceled-loads",
              label: "Canceled Loads by Drivers",
              active: pathname.includes(BASE_PATH + "/drivers/canceled-loads"),
            },
            {
              href: BASE_PATH + "/drivers/pending-loads",
              label: "Pending Loads by Drivers",
              active: pathname.includes(BASE_PATH + "/drivers/pending-loads"),
            },
          ],
        },
        {
          href: BASE_PATH + "/payments",
          label: "Payments",
          active: pathname.includes(BASE_PATH + "/payments"),
          icon: DollarSign,
          submenus: [
            {
              href: BASE_PATH + "/payments/drivers",
              label: "Drivers",
              active: pathname.includes(BASE_PATH + "/payments/drivers"),
            },
            {
              href: BASE_PATH + "/payments/agents",
              label: "Agents",
              active: pathname.includes(BASE_PATH + "/payments/agents"),
            },
          ],
        },
        {
          href: BASE_PATH + "/settings",
          label: "General Settings",
          active: pathname.includes(BASE_PATH + "/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}

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