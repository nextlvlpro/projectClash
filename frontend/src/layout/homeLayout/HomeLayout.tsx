import React from "react";
import Navbar from "../navbar/Navbar";

export default function HomeLayout({ children }: {children: React.ReactNode}) {
    return (
        <>
            <nav>
                <Navbar/>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}
