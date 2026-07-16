"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../Providers/AuthProvider";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ClipboardList,
  Building2,
  Wallet,
  Briefcase,
  CalendarDays,
  Settings,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../Providers/AuthProvider";

export default function Sidebar() {
  const pathname = usePathname();

  const { user } = useAuth();

  const founderMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Employees",
      icon: Users,
      href: "/dashboard/employees",
    },
    {
      name: "Departments",
      icon: Building2,
      href: "/dashboard/departments",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      href: "/dashboard/projects",
    },
    {
      name: "Tasks",
      icon: ClipboardList,
      href: "/dashboard/tasks",
    },
    {
      name: "Business",
      icon: Briefcase,
      href: "/dashboard/business",
    },
    {
      name: "Finance",
      icon: Wallet,
      href: "/dashboard/finance",
    },
    {
      name: "Attendance",
      icon: CalendarDays,
      href: "/dashboard/attendance",
    },
    {
      name: "Profile",
      icon: UserCircle,
      href: "/dashboard/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const employeeMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "My Tasks",
      icon: ClipboardList,
      href: "/dashboard/tasks",
    },
    {
      name: "Attendance",
      icon: CalendarDays,
      href: "/dashboard/attendance",
    },
    {
      name: "Profile",
      icon: UserCircle,
      href: "/dashboard/profile",
    },
  ];

  let menu = [];

  switch (user?.role) {
    case "FOUNDER":
      menu = founderMenu;
      break;

    default:
      menu = employeeMenu;
  }

  return (
    <aside className="w-72 bg-slate-900 text-white">

      <div className="h-16 flex justify-center items-center border-b border-slate-800">

        <h1 className="text-2xl font-bold">

          ERP CRM

        </h1>

      </div>

      <div className="py-5">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 mx-3 mb-2 px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </div>

    </aside>
  );
}