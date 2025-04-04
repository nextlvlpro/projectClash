import React from "react";
import Navbar from "../navbar/Navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <nav className="fixed top-0 w-full h-[7vh] z-50  shadow-md ">
                <Navbar />
            </nav>
            <main className="pt-[7vh] min-h-[100vh] ">
                {children}
            </main>
        </>
    );
}
