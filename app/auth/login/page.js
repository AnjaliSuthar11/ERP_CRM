import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white items-center justify-center p-16">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            ERP CRM
          </h1>

          <p className="text-lg leading-8 text-slate-300">
            Manage Employees, Projects, Clients,
            HR, Finance and Business Development
            from one platform.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center bg-slate-100 px-6">
        <LoginForm />
      </div>
    </div>
  );
}