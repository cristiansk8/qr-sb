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
import { TaskWithScans } from "@/components/types"; // Importa el tipo desde un archivo centralizado
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function TaskCard({ task }: { task: TaskWithScans }) {
  const [qrCode, setQRCode] = useState("");

  // Asigna el valor de task.qrCode a qrCode cuando el componente se monta
  useEffect(() => {
    if (task.qrCode) {
      setQRCode(task.qrCode);
    }
  }, [task.qrCode]);

  // Función para descargar la imagen del QR
  const handleDownloadQR = () => {
    if (!qrCode) return;

    // Crear un enlace temporal
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-${task.name}.png`; // Nombre del archivo descargado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <button
          onClick={handleDownloadQR}
          className={buttonVariants({ variant: "default" })}
          disabled={!qrCode} // Deshabilitar el botón si no hay QR
        >
          Descargar QR
        </button>
        <span>Scan: {task.scanCount}</span> {/* Muestra el conteo de escaneos */}
      </CardFooter>
    </Card>
  );
}