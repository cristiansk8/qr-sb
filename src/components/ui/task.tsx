import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { qr } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";

export function TaskCard({ task }: { task: qr }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{task.name}</CardTitle>
        <Badge
          className={clsx({
            "bg-red-500 text-white": task.priority === "high",
            "bg-yellow-500": task.priority === "medium",
            "bg-green-500": task.priority === "low",
            "bg-blue-500": task.priority === "urgent",
          })}
        >
          {task.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <span className="text-slate-600">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        
        {/* Si la tarea tiene QR, lo muestra, si no, advierte */}
        {task.qrCode ? (
          <div className="mt-4">
            <img src={task.qrCode} alt="QR Code" className="w-32 h-32" />
          </div>
        ) : (
          <p className="text-red-500 mt-4">⚠️ Esta tarea no tiene un código QR.</p>
        )}
      </CardContent>
      <CardFooter className="flex gap-x-2 justify-end">
        <Link
          href={`/tasks/${task.id}/edit`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Editar
        </Link>
      </CardFooter>
    </Card>
  );
}
