// app/dashboard/user/statistics/page.tsx
import { getQrStatistics } from "@/app/api/graphics/route"; // Ajusta la ruta según tu estructura
import QrStatisticsChart from "@/components/graphics/QrStatisticsChart";

export default async function StatisticsPage() {
  // Obtener los datos de la base de datos
  const qrCodes = await getQrStatistics();

  // Procesar los datos para el gráfico
  const chartData = qrCodes.map((qr) => ({
    name: qr.name, // Nombre del QR
    scans: qr.scans.length, // Número de escaneos
  }));

  // Calcular estadísticas adicionales
  const totalQrCodes = qrCodes.length;
  const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scans.length, 0);
  const lastScanDate = qrCodes
    .flatMap((qr) => qr.scans.map((scan) => scan.scannedAt))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Escaneos</h1>

      {/* Estadísticas adicionales */}
      <div className="mb-6">
        <p>Total de códigos QR: {totalQrCodes}</p>
        <p>Total de escaneos: {totalScans}</p>
        <p>Último escaneo: {new Date(lastScanDate).toLocaleDateString()}</p>
      </div>

      {/* Gráfico */}
      <QrStatisticsChart data={chartData} />
    </div>
  );
}