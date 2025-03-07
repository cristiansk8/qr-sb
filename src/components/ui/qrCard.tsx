'use client';
import { buttonVariants } from "@/components/ui/button";
import { TaskWithScans } from "@/components/types";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Download, Pencil, Trash2 } from "lucide-react";

export function QRcard({ task }: { task: TaskWithScans }) {
  const [qrCode, setQRCode] = useState("");

  useEffect(() => {
    if (task.qrCode) {
      setQRCode(task.qrCode);
    }
  }, [task.qrCode]);

  const handleDownloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-${task.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteQR = async () => {
    if (!task.id || !task.userEmail) {
      alert("Error: No se pudo identificar el QR o el usuario.");
      return;
    }

    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este QR?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/qrs`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: task.id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("QR eliminado correctamente");
        window.location.reload(); // Recargar la página para actualizar la lista de QRs
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar el QR:", error);
      alert("Hubo un problema al eliminar el QR.");
    }
  };

  return (
    <div className="flex flex-row w-full max-w-full justify-between border border-t-4 mt-2 gap-2 px-4">
      <div className="flex flex-col gap-4 w-full p-2">
        <div className="flex flex-row justify-between w-full">
          <h2 className="text-xl text-blue-600 font-semibold capitalize">{task.description}</h2>
          <div className="flex">
            <Link
              href={`/tasks/${task.id}/edit`}
              className={buttonVariants({ variant: "secondary" })}
            >
              <Pencil />
            </Link>
            <button
              onClick={handleDownloadQR}
              className={buttonVariants({ variant: "default" })}
              disabled={!qrCode}
            >
              <Download />
            </button>
            <button
              onClick={handleDeleteQR}
              className="text-red-600 hover:text-red-800 transition-colors p-2"
            >
              <Trash2 />
            </button>
          </div>
        </div>
        <div>
          <Link target="_blank" href={`https://${task.name}`}>
            <p>{task.name}</p>
          </Link>
          <span className="text-slate-600">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <Image className="h-36 w-36 object-contain" src={qrCode} alt="Generated QR Code" width={300} height={300} />
        <span>scanned: {task.scanCount}</span>
      </div>
    </div>
  );
}
