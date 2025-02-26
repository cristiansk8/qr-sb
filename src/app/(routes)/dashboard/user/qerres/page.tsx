import { TaskCard } from "@/components/ui/task";
import { TaskForm } from "@/components/ui/taskForm";
import prisma from "@/app/lib/prisma";
import type { qr } from "@prisma/client";

async function getTasks(): Promise<qr[]> {
  return await prisma.qr.findMany();
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
