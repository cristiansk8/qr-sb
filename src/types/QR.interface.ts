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
  }