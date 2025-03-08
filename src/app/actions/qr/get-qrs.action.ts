'use server';

import prisma from '@/app/lib/prisma';
import { ApiQR } from '@/types/QR.interface';
import { ServerActionResponse } from '@/types/server-action';


export async function getQRsByUser(
    email: string
): Promise<ServerActionResponse<ApiQR[]>> {
    try {
        // Validación mínima necesaria
        if (!email || !email.includes('@')) {
            return {
                error: 'Email no válido',
                status: 400
            };
        }

        // Fetch desde DB
        const qrs = await prisma.qr.findMany({
            where: { userEmail: email },
            include: { scans: true }
        });

        // Transformación clara
        const formattedData: ApiQR[] = qrs.map(qr => ({
            id: Number(qr.id),
            name: qr.name || "Unnamed",
            description: qr.description || "",
            priority: qr.priority || "medium",
            createdAt: new Date(qr.createdAt).toISOString(),
            updatedAt: new Date(qr.updatedAt).toISOString(),
            scanCount: qr.scans.length,
            cont: Number(qr.cont) || 0,
            qrCode: qr.qrCode || "",
            userEmail: qr.userEmail
        }));

        return { data: formattedData as ApiQR[], status: 200 };

    } catch (error) {
        console.error('Error en getQRsByUser:', error);
        return {
            error: error instanceof Error ? error.message : 'Error desconocido',
            status: 500
        };
    }
}