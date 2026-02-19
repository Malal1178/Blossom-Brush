"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setMessage(msg);
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-8 left-1/2 bg-[#FFB7C5] text-[#5D4037] px-8 py-4 rounded-full shadow-xl z-[200] font-bold text-lg flex items-center justify-center gap-2 whitespace-nowrap border-2 border-[#5D4037]"
                    >
                        <span>{message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
