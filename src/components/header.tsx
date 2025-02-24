"use client"
import Image from "next/image";
import Appbar from "./Appbar";
import Providers from "./Providers";
import Link from "next/link";


const Header = () => {
    return (
            <header className="flex gap-4 p-4 bg-gradient-to-b shadow">
                <Providers>
                    <Appbar />
                </Providers> 

            </header>
    );
}

export default Header;