import { useEffect, useState } from "react";

interface QRUrlGeneratorProps {
  userId: string;
  onGenerate?: (url: string) => void; // Definimos el tipo de onGenerate correctamente
}

export function QRUrlGenerator({ userId, onGenerate }: QRUrlGeneratorProps) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (!userId) return;

    const generatedUrl = `https://tu-sitio.com/scan/${userId}`;
    setQrUrl(generatedUrl);

    if (onGenerate) {
      onGenerate(generatedUrl);
    }
  }, [userId, onGenerate]);

  return (
    <div>
      <p>URL de seguimiento:</p>
      <a href={qrUrl} target="_blank" rel="noopener noreferrer">
        {qrUrl}
      </a>
    </div>
  );
}
