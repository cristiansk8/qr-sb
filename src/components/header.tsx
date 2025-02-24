"use client"
import Appbar from "./Appbar";
import Providers from "./Providers";


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