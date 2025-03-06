'use client';
import { buttonVariants } from "@/components/ui/button";
import { TaskWithScans } from "@/components/types"; // Importa el tipo desde un archivo centralizado
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Download, Pencil, Trash2 } from "lucide-react";

export function QRcard({ task }: { task: TaskWithScans }) {
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
              disabled={!qrCode} // Deshabilitar el botón si no hay QR
            >
             <Download />
            </button>
            <button
              onClick={handleDownloadQR}
              className= "text-red-600"
              disabled={!qrCode} // Deshabilitar el botón si no hay QR
            >
             <Trash2 />
            </button>
            
          </div>
        </div>
        <div>
          <Link
            target="_blank"
            href={`https://${task.name}`}>
            <p>{task.name}</p>
          </Link>
          <span className="text-slate-600">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col ">
        <Image className="h-36 w-36 object-contain" src={qrCode} alt="Generated QR Code" width={300} height={300} />
        <span>scanned: {task.scanCount}</span> {/* Muestra el conteo de escaneos */}
      </div>


    </div>
  );
}