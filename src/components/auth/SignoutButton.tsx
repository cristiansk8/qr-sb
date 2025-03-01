"use client";

import { signOut } from "next-auth/react";

export default function SignoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
            exit
        </button>
    );
}