import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, priority, userEmail, qrCode, cont } = body;

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
        cont,
      },
    });

    return NextResponse.json(newQR, { status: 201 });
  } catch (error) {
    console.error("Error al crear el QR:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Falta el parámetro email" }, { status: 400 });
    }

    const tasks = await prisma.qr.findMany({
      where: { userEmail: email },
      include: {
        scans: true, // Asegura que se traigan los escaneos
      },
    });

    // Agregar el conteo de escaneos
    const tasksWithScanCount = tasks.map((task) => ({
      ...task,
      scanCount: task.scans.length, // Calcula el número de escaneos
    }));

    return NextResponse.json(tasksWithScanCount);
  } catch (error) {
    console.error("Error en API /tasks:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}