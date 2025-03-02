import Providers from "@/components/Providers";
import { Sidebar } from "@/components/sidebar";
/* import { Sidebar } from "@/components/sidebar/Sidebar"; */

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  return (

    <Providers>
      <div className="w-full relative flex flex-col md:flex-row lg:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Contenido principal */}
        <div className="">
          {children}
        </div>
      </div>
    </Providers>
  );
}