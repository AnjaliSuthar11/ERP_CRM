export default function DashboardLayout({
    children,
}) {

    return (

        <div className="flex h-screen">

            <div className="w-72 bg-slate-900 text-white">

                Sidebar

            </div>

            <div className="flex-1">

                <div className="h-16 border-b flex items-center px-6">

                    Navbar

                </div>

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>

    );

}