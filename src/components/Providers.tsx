"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import { GalleryProvider } from "./GalleryContext";
import { LoginModalProvider } from "@/contexts/LoginModalContext";
import LoginModal from "./LoginModal";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <GalleryProvider>
                <CartProvider>
                    <LoginModalProvider>
                        {children}
                        <LoginModal />
                    </LoginModalProvider>
                </CartProvider>
            </GalleryProvider>
        </SessionProvider>
    );
}
