'use client'

import { Nav } from "./nav";
import { signIn, useSession } from "next-auth/react";
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()

    if (status === 'unauthenticated') {
        return (
            <div className="flex h-screen flex-col  items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to to-blue-800">
                <div className="space-y-6 text-center">
                    <h1 className={cn
                        ("text-6xl font-semibold text-white drop-shadow-md",
                            font.className)}>
                        🏪 Ecommerce Admin Panel
                    </h1>
                    <p className="text-white text-lg">
                        Authentication service
                    </p>
                </div>
                <div>
                    <button className="flex w-full text-lg px-4 py-1 mt-4 rounded-md place-content-center bg-blue-200 focus:ring-1 ring-blue-900" onClick={() => signIn("google", { redirectTo: "/" })}>
                        <FcGoogle className="h-6 w-6 mr-2" /> Sign In
                    </button>
                </div>
            </div>
        )
    }

    if (status === 'authenticated') {
        return (
            <div className="flex h-screen w-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to to-blue-800  overflow-auto">

                <div className="">
                    <Nav></Nav>
                </div>
                <div className="flex flex-col h-auto w-full m-2 ml-0 rounded-lg bg-white p-4 overflow-auto">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}