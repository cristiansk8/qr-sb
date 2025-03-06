// app/dashboard/user/statistics/page.tsx
"use client"; // Necesario porque usamos useEffect y useState

import { useEffect, useState } from "react";
import QrStatisticsChart from "@/components/graphics/QrStatisticsChart";

export default function StatisticsPage() {
  // Estado para la gráfica de códigos QR
  const [qrChartData, setQrChartData] = useState<{ name: string; scans: number }[]>([]);

  // Obtener los datos de la API para la gráfica de códigos QR
  useEffect(() => {
    async function fetchQrData() {
      try {
        const response = await fetch("/api/graphics");
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setQrChartData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchQrData();
  }, []);

  // Obtener los datos de la API para la gráfica de escaneos por día
  useEffect(() => {
    async function fetchScansByDayData() {
      try {
        const response = await fetch("/api/graphics/scans-by-day");
        if (!response.ok) throw new Error("Error al obtener los datos");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchScansByDayData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Escaneos</h1>

      {/* Gráfica de códigos QR */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Escaneos por Código QR</h2>
      <QrStatisticsChart data={qrChartData} />

    </div>
  );
}