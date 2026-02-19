"use client";
import React, { useState } from 'react';
import { Search, Flower, Palette, Menu, User, X, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import InteractiveTree from './InteractiveTree';
import MobileMenu from './MobileMenu';
import UserButton from './UserButton';
import ItemSelectorPopup from './ItemSelectorPopup';
import FrameSettingsPanel from './FrameSettingsPanel';
import { motion } from 'framer-motion';
import { useGallery } from './GalleryContext';
import SakuraBackground from './SakuraBackground';

export default function Hero() {
    const { items, heroLinks, updateHeroLink, isAdmin } = useGallery();
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [editingFrameIndex, setEditingFrameIndex] = useState<number | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleTreeFrameClick = (frameIndex: number) => {
        setEditingFrameIndex(frameIndex);
        setIsSelectorOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#5D4037]">
            {/* --- Hero Section --- */}
            {/* --- Hero Section --- */}
            <section className="relative flex flex-col items-center justify-center pt-10 pb-20 overflow-hidden min-h-[calc(100vh-80px)]">
                <SakuraBackground />

                {/* Admin Edit Mode Button */}
                {isAdmin && (
                    <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`fixed top-20 right-4 z-40 px-4 py-2 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 ${isEditMode
                            ? 'bg-[#5D4037] text-white'
                            : 'bg-[#FFB7C5] text-[#5D4037] hover:bg-[#5D4037] hover:text-white'
                            }`}
                    >
                        <Settings size={18} />
                        {isEditMode ? 'Exit Edit Mode' : 'Edit Frames'}
                    </button>
                )}

                {/* Frame Settings Panel */}
                <FrameSettingsPanel isOpen={isEditMode} onClose={() => setIsEditMode(false)} />

                {/* The "Art Tree" Background */}
                <div className="relative h-[85vh] w-auto max-w-full aspect-[4/3] flex items-center justify-center -mb-20 mx-auto">
                    <div className="relative w-full h-full">
                        <InteractiveTree
                            className="w-full h-full"
                            onFrameClick={handleTreeFrameClick}
                            editMode={isEditMode}
                        />
                    </div>
                </div>

                {/* Content Overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center z-10 relative px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 text-[#5D4037]">
                        — Blossom & Brush —
                    </h1>
                    <p className="text-2xl md:text-3xl font-medium text-[#8D6E63] mb-8">
                        Your Garden of Art
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/gallery" className="px-8 py-3 bg-[#FDFBF7] border-2 border-[#5D4037] rounded-full text-lg font-bold hover:bg-[#5D4037] hover:text-white transition-all shadow-lg text-[#5D4037] hover:scale-105 active:scale-95">
                            Explore the Gallery
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Flower Elements (Optional Decoration) */}
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#E8F5E9]/50 to-transparent pointer-events-none" />
            </section>

            {/* Item Selector Popup - Rendered at Hero level, outside tree */}
            <ItemSelectorPopup
                isOpen={isSelectorOpen}
                onClose={() => {
                    setIsSelectorOpen(false);
                    setEditingFrameIndex(null);
                }}
                items={items}
                onSelect={(index) => {
                    if (editingFrameIndex !== null) {
                        updateHeroLink(editingFrameIndex, index >= 0 ? index : null);
                    }
                }}
                currentSelection={editingFrameIndex !== null ? heroLinks[editingFrameIndex] : null}
            />
        </div>
    );
}
