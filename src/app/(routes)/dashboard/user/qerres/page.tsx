import { TaskCard } from "@/components/ui/task";
import { TaskForm } from "@/components/ui/taskForm";
import prisma from "@/app/lib/prisma";
import type { qr } from "@prisma/client";

async function getTasks() {
  const tasks = await prisma.qr.findMany({
    include: {
      scans: true, // Incluye los escaneos asociados a cada QR
    },
  });

  // Mapea las tareas para agregar el conteo de escaneos
  const tasksWithScanCount = tasks.map((task) => ({
    ...task,
    scanCount: task.scans.length, // Agrega el conteo de escaneos
  }));

  return tasksWithScanCount;
}

export default async function QrPage() {
  const tasks = await getTasks();

  return (
    <div className="space-y-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-2">No hay tareas disponibles.</p>
        </div>
      )}
      <TaskForm />
    </div>
  );
}