import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, priority, userEmail, qrCode } = body;

    // Validar que se envíen los datos requeridos
    if (!name || !userEmail) {
      return NextResponse.json({ error: "El nombre y el email son obligatorios" }, { status: 400 });
    }

    // Crear la tarea con el código QR en la base de datos
    const newQR = await prisma.qr.create({
      data: {
        name,
        description,
        priority: priority || "low", // Valor por defecto si no se envía
        userEmail, // Guardamos el email
        qrCode,
      },
    });

    return NextResponse.json(newQR, { status: 201 });
  } catch (error) {
    console.error("Error al crear el QR:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}