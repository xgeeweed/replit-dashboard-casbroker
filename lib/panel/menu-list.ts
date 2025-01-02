import {
  LayoutGrid,
  LucideIcon,
  Search,
  BookOpen,
  ChartColumn,
  History,
  Settings2,
  User2,
  Blocks,
  Bell,
  UserCog2,
  Truck,
  UserSearch,
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

export function getMenuList(pathname: string): Group[] {
  const BASE_PATH = "";
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        // add loadboard menu item
        {
          href: BASE_PATH + "/loadboard",
          label: "Loadboard",
          active: pathname.includes(BASE_PATH + "/loadboard"),
          icon: BookOpen,
          submenus: [
            {
              href: BASE_PATH + "/loadboard/view-loadboard",
              label: "View Loadboard",
              active: pathname.includes(
                BASE_PATH + "/loadboard/view-loadboard"
              ),
            },
            {
              href: BASE_PATH + "/loadboard/my-loadboard",
              label: "My Loadboard",
              active: pathname.includes(BASE_PATH + "/loadboard/my-loadboard"),
            },
            {
              href: BASE_PATH + "/loadboard/post-load",
              label: "Post Load",
              active: pathname.includes(BASE_PATH + "/loadboard/post-load"),
            },
          ],
        },
        {
          href: BASE_PATH + "/agents",
          label: "Search Agents",
          active: pathname.includes(BASE_PATH + "/agents"),
          icon: UserSearch,
          submenus: [
            {
              href: BASE_PATH + "/agents/pending-agents",
              label: "Pending Agents",
              active: pathname.includes(BASE_PATH + "/agents/pending-agents"),
            }, {
              href: BASE_PATH + "/agents/all-agents",
              label: "All Agents",
              active: pathname.includes(BASE_PATH + "/agents/all-agents"),
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
        {
          href: BASE_PATH + "/global-settings",
          label: "Global Settings",
          active: pathname.includes(BASE_PATH + "/global-settings"),
          icon: Blocks,
          submenus: [ {
            href: BASE_PATH + "/global-settings/terminal-locations",
            label: "Terminal Locations",
            active: pathname.includes(BASE_PATH + "/global-settings/terminal-locations"),
          },
          {
            href: BASE_PATH + "/global-settings/container-types",
            label: "Container Types",
            active: pathname.includes(BASE_PATH + "/global-settings/container-types"),
          },
          {
            href: BASE_PATH + "/global-settings/transaction-types",
            label: "Transaction Types",
            active: pathname.includes(BASE_PATH + "/global-settings/transaction-types"),
          },          
          {
            href: BASE_PATH + "/global-settings/rates",
            label: "Rates",
            active: pathname.includes(BASE_PATH + "/global-settings/rates"),
          },          
          {
            href: BASE_PATH + "/global-settings/dropoff-locations",
            label: "Dropoff Locations",
            active: pathname.includes(BASE_PATH + "/global-settings/dropoff-locations"),
          },          
          {
            href: BASE_PATH + "/global-settings/dropoff-location-regions",
            label: "Dropoff Location Regions",
            active: pathname.includes(BASE_PATH + "/global-settings/dropoff-location-regions"),
          },          
          {
            href: BASE_PATH + "/global-settings/pickup-locations",
            label: "Pickup Locations",
            active: pathname.includes(BASE_PATH + "/global-settings/pickup-locations"),
          },          
          {
            href: BASE_PATH + "/global-settings/external-user-types",
            label: "External User Types",
            active: pathname.includes(BASE_PATH + "/global-settings/external-user-types"),
          },          
          {
            href: BASE_PATH + "/global-settings/external-users",
            label: "External Users",
            active: pathname.includes(BASE_PATH + "/global-settings/external-users"),
          }],
    },
      ],
    },
  ];
}

export function getAdminMenuList(pathname: string): Group[] {
  const BASE_PATH = "/admin";
  return [
    ...getMenuList(pathname),
    {
      groupLabel: "Admin",
      menus: [
        {
          href: BASE_PATH + "/user-groups",
          label: "User Groups",
          active: pathname.includes(BASE_PATH + "/user-groups"),
          icon: User2,
          submenus: [],
        },
      ],
    },
  ];
}