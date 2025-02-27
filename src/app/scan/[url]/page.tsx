import { scanQr } from "@/actions/qrs";
import { getQrByName } from "@/actions/qrs/get-qr";
import { Scan } from "@/types/scan.interface";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function CountQrUser({ params }: { params: Promise<{ url: string }> }) {
  const urlId = (await params).url;

  // Obtén los headers de la solicitud (uso síncrono)
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

  // Obtén el QR por nombre
  const qr = await getQrByName(urlId);

  if (!qr) {
    // Si no se encuentra el QR, redirige a la página principal o a una página de error
    return redirect("/");
  }

  console.log("qrScan ", qr.name);

  // Crea el objeto Scan
  const scan: Scan = {
    qrId: qr.id, // Usa el ID del QR
    ip: ip, // Usa la IP real del usuario
  };

  // Registra el escaneo en la base de datos
  await scanQr(scan);

  // Redirige a la URL almacenada en qr.name
  return redirect("https://"+qr.name);
}