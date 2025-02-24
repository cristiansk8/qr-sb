import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Usa 'auth' directamente
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        // Verificar si el QR existe
        const qr = await prisma.qr.findUnique({
            where: { id: parseInt(id) },
        });

        if (!qr) {
            return NextResponse.json({ error: "QR no encontrado" }, { status: 404 });
        }

        // Obtener la IP correctamente
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||  // La primera IP si hay varias
            req.headers.get("x-real-ip") || 
            "Desconocida";

        // Registrar el escaneo en la base de datos
        await prisma.scan.create({
            data: {
                qrId: qr.id,
                userAgent: req.headers.get("user-agent") || "Desconocido",
                ip: ip,
            },
        });

        console.log(`✅ Escaneo registrado para QR ID: ${qr.id} desde IP: ${ip}`);

        // Redirigir a la URL de la tarea o al sitio predeterminado
        return NextResponse.redirect(qr.qrCode || "https://tu-sitio.com");
        
    } catch (error) {
        console.error("❌ Error registrando escaneo:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
