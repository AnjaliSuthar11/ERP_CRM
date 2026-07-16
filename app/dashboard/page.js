"use client";

import { useAuth } from "@/components/Providers/AuthProvider";



export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "FOUNDER":
      return <h1 className="text-3xl font-bold">Founder Dashboard</h1>;

    case "MANAGER":
      return <h1 className="text-3xl font-bold">Manager Dashboard</h1>;

    case "EMPLOYEE":
      return <h1 className="text-3xl font-bold">Employee Dashboard</h1>;

    case "HR":
      return <h1 className="text-3xl font-bold">HR Dashboard</h1>;

    case "FINANCE":
      return <h1 className="text-3xl font-bold">Finance Dashboard</h1>;

    case "BUSINESS_DEVELOPMENT":
      return (
        <h1 className="text-3xl font-bold">
          Business Development Dashboard
        </h1>
      );

    default:
      return <h1>Unauthorized</h1>;
  }
}