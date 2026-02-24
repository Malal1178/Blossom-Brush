"use client";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import GalleryPopup from "./GalleryPopup";
import { GalleryItem } from "./GalleryContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

import { useGallery } from "./GalleryContext";

export default function ArtScrollGallery() {
    const {
        items, addItem: contextAddItem, updateItem, deleteItem,
        subtitleOptions, updateSubtitleOptions,
        selectedItemIndex, setSelectedItemIndex,
        isAdmin
    } = useGallery();

    // Scroll ref logic
    const endRef = useRef<HTMLDivElement>(null);
    const prevItemsLength = useRef(items.length);

    useEffect(() => {
        if (items.length > prevItemsLength.current) {
            setTimeout(() => {
                endRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
        prevItemsLength.current = items.length;
    }, [items]);

    const handleItemClick = (index: number) => {
        setSelectedItemIndex(index);
    };

    const handleUpdateItem = (updatedItem: GalleryItem) => {
        if (selectedItemIndex !== null) {
            updateItem(selectedItemIndex, updatedItem);
        }
    };


    const handleAddSlot = () => {
        const newSlot: GalleryItem = {
            type: "image",
            content: "/assets/default-slot-new.jpg",
            hueA: Math.floor(Math.random() * 360),
            hueB: Math.floor(Math.random() * 360),
            name: "New Masterpiece",
            price: 50,
            description: "A blank canvas waiting for your creativity.",
            subtitle: "Original Piece",
            showOnHome: true
        };
        contextAddItem(newSlot);
    };

    const handleDeleteItem = () => {
        if (selectedItemIndex !== null) {
            deleteItem(selectedItemIndex);
        }
    };



    const homeItems = items.filter(item => item.showOnHome);

    return (
        <div className="relative w-full min-h-screen">
            {isAdmin && (
                <button
                    onClick={handleAddSlot}
                    className="absolute left-4 md:left-8 top-24 z-10 px-4 py-2 bg-[#FFB7C5] border-2 border-[#5D4037] rounded-full text-sm font-bold hover:bg-[#5D4037] hover:text-white transition-all shadow-lg text-[#5D4037]"
                >
                    + Add Slot
                </button>
            )}
            <div className="w-full max-w-lg mx-auto py-24 pb-32">
                <div className="relative mb-12 flex justify-center">
                    <Link href="/gallery" className="group">
                        <h2 className="text-3xl font-bold text-center text-[#5D4037] flex items-center justify-center gap-2 transition-transform group-hover:scale-105" style={{ WebkitTextStroke: "1px #5D4037", textShadow: "2px 2px 0px #FDFBF7" }}>
                            Discover New Mediums
                            <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            {isAdmin && <span className="block text-sm font-normal text-red-500 mt-2 ml-2">(Admin Mode)</span>}
                        </h2>
                    </Link>
                </div>

                {homeItems.map((item, i) => (
                    <Card
                        key={i}
                        item={item}
                        onClick={() => {
                            // Find the true index in original array to handle updates/deletes correctly
                            const originalIndex = items.indexOf(item);
                            handleItemClick(originalIndex);
                        }}
                    />
                ))}

                <div ref={endRef} />

                {selectedItemIndex !== null && items[selectedItemIndex] && (
                    <GalleryPopup
                        isOpen={selectedItemIndex !== null}
                        onClose={() => setSelectedItemIndex(null)}
                        item={items[selectedItemIndex]}
                        onUpdate={handleUpdateItem}
                        isAdmin={isAdmin}
                        subtitleOptions={subtitleOptions}
                        onUpdateOptions={updateSubtitleOptions}
                        onDelete={handleDeleteItem}
                    />
                )}
            </div>
        </div>
    );
}

interface CardProps {
    item: GalleryItem;
    onClick: () => void;
}

function Card({ item, onClick }: CardProps) {
    const background = `linear-gradient(306deg, ${hue(item.hueA)}, ${hue(item.hueB)})`;

    return (
        <motion.div
            className={`relative flex justify-center items-center overflow-hidden pt-5 -mb-32 mx-auto`}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2, margin: "0px" }}
            style={{ perspective: 1000 }}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    background,
                    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
                    width: '100%',
                    height: '100%'
                }}
            />

            <motion.div
                className={`group relative z-10 w-[300px] h-[430px] flex justify-center items-center rounded-[20px] bg-[#f5f5f5] shadow-xl origin-[10%_60%] cursor-pointer`}
                style={{ fontSize: 130 }}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                onClick={onClick}
            >
                {item.type === "image" ? (
                    <img src={item.content} alt="Gallery Item" className="w-full h-full object-cover rounded-[20px]" />
                ) : (
                    item.content
                )}

                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]">
                    <h3 className="text-white text-2xl font-bold text-center px-4">{item.name}</h3>
                </div>
            </motion.div>
        </motion.div>
    );
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
        rotate: 15
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};
