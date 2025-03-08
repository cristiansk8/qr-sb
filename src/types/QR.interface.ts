export interface ApiQR {
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
  // Si necesitas incluir escaneos
  scans?: Scan[];
}

interface Scan {
  id: number;
  scannedAt: string;  // Asegurar formato string
  ip?: string;
}