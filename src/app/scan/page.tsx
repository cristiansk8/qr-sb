"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ScanRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const qrId = searchParams.get("qrId");

  useEffect(() => {
    if (!qrId) return;

    // Enviar el escaneo a la API
    fetch("/api/scans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrId }),
    })
      .then(() => {
        // Después de registrar el escaneo, redirigir al usuario
        router.push(`/qr/${qrId}`); // Cambia esto a donde quieras redirigir
      })
      .catch((err) => console.error("Error registrando escaneo:", err));
  }, [qrId, router]);

  return <p>Redirigiendo...</p>;
}
