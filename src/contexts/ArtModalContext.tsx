"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ArtItem, galleryItems } from "@/constants/artData";

interface ArtModalContextType {
    isOpen: boolean;
    activeArt: ArtItem | null;
    openModal: (art: ArtItem) => void;
    closeModal: () => void;
    nextArt: () => void;
    prevArt: () => void;
}

const ArtModalContext = createContext<ArtModalContextType | undefined>(undefined);

export function ArtModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeArt, setActiveArt] = useState<ArtItem | null>(null);

    const openModal = (art: ArtItem) => {
        setActiveArt(art);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const nextArt = () => {
        if (!activeArt) return;
        const currentIndex = galleryItems.findIndex(item => item.id === activeArt.id);
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        setActiveArt(galleryItems[nextIndex]);
    };

    const prevArt = () => {
        if (!activeArt) return;
        const currentIndex = galleryItems.findIndex(item => item.id === activeArt.id);
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setActiveArt(galleryItems[prevIndex]);
    };

    return (
        <ArtModalContext.Provider value={{ isOpen, activeArt, openModal, closeModal, nextArt, prevArt }}>
            {children}
        </ArtModalContext.Provider>
    );
}

export function useArtModal() {
    const context = useContext(ArtModalContext);
    if (context === undefined) {
        throw new Error("useArtModal must be used within an ArtModalProvider");
    }
    return context;
}
