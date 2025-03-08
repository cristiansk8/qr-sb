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
import { QrCode } from "lucide-react";


interface Props {
    email: string;
}

export function QRForm({ email }: Props) {
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
            console.error("No active session");
            return;
        }

        if (!cont) {
            console.error("Tracking URL was not generated");
            return;
        }

        const res = await fetch("/api/qrs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userEmail: email,
                name,
                description,
                priority,
                qrCode,
                cont, // 🔹 Send the tracking URL to the backend
            }),
        });

        if (!res.ok) {
            console.error("Error saving:", await res.json());
            return;
        }

        setSuccessMessage("Saved successfully ✅");
        setName("");
        setDescription("");
        setPriority("low");
        setQRCode("");
        setCont("");

        setTimeout(() => setSuccessMessage(""), 3000);
        router.refresh();
    };

    if (status !== "authenticated" || !session?.user?.email) {
        return (
            <p className="text-red-500">
                You must log in to create a task.
                <SigninButton
                    urlRedirec="/dashboard/user/profile"
                    className={"bg-blue-600 text-white"}
                >
                    Create QR
                </SigninButton>
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-600">Create a QR Code</h2>

            {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
            )}
            <div className="flex flex-col md:flex-row items-start justify-between">
                <div className="w-full space-y-4 p-4">
                    <div>
                        <label className="text-gray-400 font-bold">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 font-bold">Url</label>
                        <input
                            type="text"
                            placeholder="URL (e.g., myshop.com)"
                            value={name}
                            onChange={(e) => {
                                let value = e.target.value;

                                // Remove unwanted prefixes (http://, https://)
                                value = value.replace(/^https?:\/\//i, "");
                                // Remove trailing slash if it exists
                                value = value.replace(/\/$/, "");
                                // Assign formatted value to state
                                setName(value);
                            }}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
                <div>
                    {name && (
                        <QRUrlGenerator userId={name} onGenerate={handleGenerateQR} />
                    )}
                    <div className="flex flex-col justify-center items-center p-4">
                        <Label className="text-gray-400">Preview</Label>
                        {qrCode ? (
                            <Image src={qrCode} alt="Generated QR Code" width={180} height={180} />
                        ) :
                            <QrCode className="text-blue-600 h-48 w-48" />
                        }
                    </div>
                </div>
            </div>


            <Button className="bg-blue-600 text-white" type="submit">Save</Button>
        </form>
    );
}
