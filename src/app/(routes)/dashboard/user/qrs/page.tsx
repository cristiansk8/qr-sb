"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { QRcard } from "@/components/ui/qrCard";
import { TaskForm } from "@/components/ui/taskForm";
import { TaskWithScans } from "@/components/types";

interface ApiTask {
  id: string | number;
  name?: string;
  description?: string;
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
  scanCount?: number;
  cont?: number;
  qrCode?: string;
  userEmail?: string;
}

export default function QrPage() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<TaskWithScans[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/qrs?email=${session.user?.email}`);
        if (!response.ok) throw new Error("No se pudieron obtener las tareas.");

        const data = await response.json();
        const transformedTasks = data.map((task: ApiTask) => ({
          id: Number(task.id),
          name: task.name || "Sin nombre",
          description: task.description || "",
          priority: task.priority || "medium",
          createdAt: new Date(task.createdAt || new Date().toISOString()),
          updatedAt: new Date(task.updatedAt || new Date().toISOString()),
          scanCount: task.scanCount || 0,
          cont: task.cont || 0,
          qrCode: task.qrCode || "",
          userEmail: task.userEmail || session.user?.email || "",
        }));
        setTasks(transformedTasks);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
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
            tasks.map((task) => <QRcard key={task.id} task={task} />)
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