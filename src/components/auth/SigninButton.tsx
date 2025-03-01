"use client";

import { signIn } from "next-auth/react";

export default function SigninButton() {
  return (
    <button
      onClick={() => signIn("google")} // Inicia sesión con Google
      className="text-gray-600 transition-colors hover:text-blue-600"
    >
      Login

    </button>
  );
}