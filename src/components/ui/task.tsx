'use client';
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
import Image from "next/image";
import { useState, useEffect } from "react"; // Importa useEffect

export function TaskCard({ task }: { task: qr }) {
  const [qrCode, setQRCode] = useState("");

  // Asigna el valor de task.qrCode a qrCode cuando el componente se monta
  useEffect(() => {
    if (task.qrCode) {
      setQRCode(task.qrCode);
    }
  }, [task.qrCode]);

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
        {qrCode ? (
          <div className="mt-4">
            <Image src={qrCode} alt="Generated QR Code" width={300} height={300} />
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
        <span>{task.cont}</span>
      </CardFooter>
    </Card>
  );
}