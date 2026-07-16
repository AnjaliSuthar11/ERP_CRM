"use client";

import { Bell } from "lucide-react";
import { useAuth } from "../Providers/AuthProvider";


export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white h-16 border-b px-6 flex items-center justify-between">

      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg px-4 py-2 w-96 outline-none"
      />

      <div className="flex items-center gap-6">

        <Bell />

        <div className="flex items-center gap-3">

          <img
            src={
              user?.profileImage ||
              "https://ui-avatars.com/api/?name=User"
            }
            className="w-10 h-10 rounded-full"
          />

          <div>

            <h3 className="font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>

            <p className="text-sm text-gray-500">
              {user?.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}