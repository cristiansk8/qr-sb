"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { generateQRCodeDataURL } from "@/components/qr";
import { Label } from "@radix-ui/react-label";
import { useSession } from "next-auth/react";

export function TaskForm() {
    const { data: session, status } = useSession();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [qrCode, setQRCode] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    if (status !== "authenticated" || !session?.user?.email) return;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user?.email) {
            console.error("No hay sesión activa");
            return;
        }

        // Enviar la tarea al backend (sin QR aún)
        const res = await fetch("/api/qrs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userEmail: session.user.email,
                name,
                description,
                priority,
            }),
        });

        if (!res.ok) {
            console.error("Error al registrar:", await res.json());
            return;
        }

        const newTask = await res.json(); // Obtiene la tarea con su ID
        const qrTrackingUrl = `https://tu-sitio.com/api/scan/${newTask.id}`; // URL de tracking

        // Generar QR con la URL de tracking
        const qrImageDataURL = await generateQRCodeDataURL(qrTrackingUrl);
        setQRCode(qrImageDataURL);

        // Guardar el QR generado en la base de datos
        await fetch(`/api/qrs/${newTask.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ qrCode: qrImageDataURL }),
        });

        setSuccessMessage("Guardado con éxito ✅");
        setName("");
        setDescription("");
        setPriority("low");

        setTimeout(() => setSuccessMessage(""), 3000);
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Crear Nueva Tarea</h2>

            {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
            )}

            <input
                type="text"
                placeholder="Nombre de la tarea"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
            />
            {qrCode && (
                <div className="flex flex-col space-y-1.5">
                    <Label>Código QR Generado</Label>
                    <img src={qrCode} alt="Generated QR Code" className="w-[300px] h-[300px] object-contain" />
                </div>
            )}
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded"
            >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
            </select>
            <Button type="submit">Guardar</Button>
        </form>
    );
}
