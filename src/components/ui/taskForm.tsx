"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { generateQRCodeDataURL } from "@/components/qr";
import { Label } from "@radix-ui/react-label";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { QRUrlGenerator } from "@/components/GenerateQRUrl";
import SigninButton from "@/components/auth/SigninButton";


export function TaskForm() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [qrCode, setQRCode] = useState("");
    const [cont, setCont] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleGenerateQR = async (generatedUrl: string) => {
        setCont(generatedUrl);
        const qr = await generateQRCodeDataURL(generatedUrl);
        setQRCode(qr);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user?.email) {
            console.error("No hay sesión activa");
            return;
        }

        if (!cont) {
            console.error("No se generó la URL de conteo");
            return;
        }

        const res = await fetch("/api/qrs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userEmail: session.user.email,
                name,
                description,
                priority,
                qrCode,
                cont, // 🔹 Enviar la URL de conteo al backend
            }),
        });

        if (!res.ok) {
            console.error("Error al registrar:", await res.json());
            return;
        }

        setSuccessMessage("Guardado con éxito ✅");
        setName("");
        setDescription("");
        setPriority("low");
        setQRCode("");
        setCont("");

        setTimeout(() => setSuccessMessage(""), 3000);
        router.refresh();
    };

    if (status !== "authenticated" || !session?.user?.email) {
        return <p className="text-red-500">Debes iniciar sesión para crear una tarea.                             <SigninButton
        urlRedirec="/dashboard/user/profile"
        className={"bg-blue-600 text-white"}
    >
        Create Qr
    </SigninButton></p>;
    }

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

            {name && (
                <QRUrlGenerator userId={name} onGenerate={handleGenerateQR} />
            )}

            {qrCode && (
                <div className="flex flex-col space-y-1.5">
                    <Label>Código QR Generado</Label>
                    <Image src={qrCode} alt="Generated QR Code" width={300} height={300} />
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
