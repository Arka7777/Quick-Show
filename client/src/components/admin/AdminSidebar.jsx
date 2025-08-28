import React from "react";
import { assets } from "../../assets/assets";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const user = {
    firstName: "Arkapravo",
    lastName: "Biswas",
    imageurl: assets.profile,
  };

  const adminNavLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Add Shows",
      path: "/admin/add-shows",
      icon: PlusSquareIcon,
    },
    {
      name: "List Shows",
      path: "/admin/list-shows",
      icon: ListIcon,
    },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-6">
      {/* Profile */}
      <div className="flex items-center gap-3 mb-10">
        <img
          src={user.imageurl}
          alt="sidebar profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="font-semibold text-lg">
          {user.firstName} {user.lastName}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {adminNavLinks.map(({ name, path, icon: Icon }, idx) => (
          <NavLink
            key={idx}
            to={path} end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
