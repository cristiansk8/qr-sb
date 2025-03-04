"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TaskCard } from "@/components/ui/task";
import { TaskForm } from "@/components/ui/taskForm";

export default function QrPage() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/qrs?email=${session.user?.email}`);
        if (!response.ok) throw new Error("No se pudieron obtener las tareas.");

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
        setNotification("❌ Error al cargar las tareas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [status, session?.user?.email]);

  return (
    <div className="max-h-screen h-full w-full max-w-full overflow-x-hidden">
      <div className="px-4">
        <h2 className="text-4xl truncate">Manage Qr</h2>
      </div>
      <div className="h-full overflow-y-auto px-4">
        <div className="w-full max-w-full">
          {loading ? (
            <p className="text-lg font-semibold mb-2">Cargando tareas...</p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold mb-2">
                No hay tareas disponibles.
              </p>
            </div>
          )}
          <TaskForm />
        </div>
      </div>
    </div>
  );
}
