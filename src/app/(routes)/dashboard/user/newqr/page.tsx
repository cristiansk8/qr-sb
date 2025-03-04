import { TaskForm } from "@/components/ui/taskForm";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"; // Asegúrate de importar el estilo del botón
import clsx from "clsx";

export default function NewQr() {
  return (
    <div>
      <h2>Create new qr</h2>
      <TaskForm />

      {/* Botón para ver los QRs */}
      <div className="mt-4">
        <Link
          href="/dashboard/user/qrs"
          className={clsx(buttonVariants({ variant: "default" }), "bg-blue-600 text-white")}
        >
          Ver QRs
        </Link>
      </div>
    </div>
  );
}