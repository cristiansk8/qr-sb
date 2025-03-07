"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { QRcard } from "@/components/ui/qrCard";
import { QRForm } from "@/components/ui/qrForm";
import { QRWithScans } from "@/components/types";
import { ApiQR } from "@/types/QR.interface";

/* interface ApiQR {
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
} */

export default function QrPage() {
  const { data: session, status } = useSession();
  const [QRs, setQRs] = useState<QRWithScans[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQRs = async (email: string, signal: AbortSignal) => {
    try {
      const response = await fetch(`/api/qrs?email=${email}`, { signal });
      if (!response.ok) throw new Error("Failed to fetch QR codes.");

      const data = await response.json();
      setQRs(
        data.map((qr: ApiQR) => ({
          id: Number(qr.id),
          name: qr.name || "Unnamed",
          description: qr.description || "",
          priority: qr.priority || "medium",
          createdAt: new Date(qr.createdAt || new Date().toISOString()),
          updatedAt: new Date(qr.updatedAt || new Date().toISOString()),
          scanCount: qr.scanCount || 0,
          cont: qr.cont || 0,
          qrCode: qr.qrCode || "",
          userEmail: qr.userEmail || email,
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching QR codes:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const controller = new AbortController();
    fetchQRs(session.user.email, controller.signal);
    return () => controller.abort(); // Cleanup en caso de desmontaje
  }, [status, session?.user?.email]);




  return (
    <div className="max-h-screen h-full w-full max-w-full overflow-x-hidden">
      <div className="px-4">
        <h2 className="text-4xl truncate">Manage Qr</h2>
      </div>
      <div className="h-full overflow-y-auto px-4">
        <div className="w-full max-w-full">
          {loading ? (
            <p className="text-lg font-semibold mb-2">Loading QR...</p>
          ) : QRs.length > 0 ? (
            QRs.map((qr) => <QRcard key={qr.id} task={qr} />)
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold mb-2">
                No QRS available.
              </p>
            </div>
          )}
          <QRForm />
        </div>
      </div>
    </div>
  );
}