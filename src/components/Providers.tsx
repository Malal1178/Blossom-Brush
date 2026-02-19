"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import { GalleryProvider } from "./GalleryContext";
import { LoginModalProvider } from "@/contexts/LoginModalContext";
import { ToastProvider } from "@/contexts/ToastContext";
import LoginModal from "./LoginModal";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <GalleryProvider>
                <CartProvider>
                    <ToastProvider>
                        <LoginModalProvider>
                            {children}
                            <LoginModal />
                        </LoginModalProvider>
                    </ToastProvider>
                </CartProvider>
            </GalleryProvider>
        </SessionProvider>
    );
}
