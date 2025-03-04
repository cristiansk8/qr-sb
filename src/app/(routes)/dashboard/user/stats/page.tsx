// app/dashboard/user/statistics/page.tsx
"use client"; // Necesario porque usamos useEffect y useState

import { useEffect, useState } from "react";
import QrStatisticsChart from "@/components/graphics/QrStatisticsChart";

export default function StatisticsPage() {
  const [chartData, setChartData] = useState<{ name: string; scans: number }[]>([]);

  // Obtener los datos de la API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/graphics");
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Escaneos</h1>
      <QrStatisticsChart data={chartData} />
    </div>
  );
}