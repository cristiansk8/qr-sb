import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
      const body = await req.json(); // Obtiene los datos del request
      const { email, name, phone, photo, departamento, ciudad } = body;
  
      // Verifica si el usuario ya existe por email
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
      }
  
      // Crea el usuario en la base de datos
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          photo,
          departamento,
          ciudad,
        },
      });
  
      return NextResponse.json({ message: "Usuario creado exitosamente", user: newUser }, { status: 201 });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
  }
// Servicio para verificar si el usuario está registrado
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('correo');

        if (!email) {
            return NextResponse.json({ error: 'Correo requerido' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        return NextResponse.json({ registered: !!user }, { status: 200 });
    } catch (error) {
        console.error('Error verificando usuario:', error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}