import { AuthProvider } from "@/components/Providers/AuthProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "ERP CRM",
  description: "ERP CRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">

        <AuthProvider>

          <Toaster position="top-right" />

          {children}

        </AuthProvider>

      </body>
    </html>
  );
}