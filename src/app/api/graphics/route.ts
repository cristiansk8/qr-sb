import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getQrStatistics() {
  const qrCodes = await prisma.qr.findMany({
    include: {
      scans: true, // Incluir los escaneos relacionados
    },
  });

  return qrCodes;
}