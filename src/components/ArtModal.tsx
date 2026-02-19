"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useArtModal } from "@/contexts/ArtModalContext";

export default function ArtModal() {
    const { isOpen, activeArt, closeModal, nextArt, prevArt } = useArtModal();

    // Keyboard Navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextArt();
            if (e.key === "ArrowLeft") prevArt();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, nextArt, prevArt, closeModal]);

    return (
        <AnimatePresence>
            {isOpen && activeArt && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xl p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors z-50"
                    >
                        <X size={32} />
                    </button>

                    {/* Navigation Arrows */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevArt(); }}
                        className="absolute left-4 md:left-8 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors hidden md:block z-50"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextArt(); }}
                        className="absolute right-4 md:right-8 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors hidden md:block z-50"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Content Container */}
                    <motion.div
                        key={activeArt.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-black/20">
                            <Image
                                src={activeArt.src}
                                alt={activeArt.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="mt-6 text-center text-white drop-shadow-md">
                            <h3 className="text-2xl font-bold">{activeArt.title}</h3>
                            <p className="text-white/80 mt-1">{activeArt.description}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
