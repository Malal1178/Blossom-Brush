"use client";
import React from "react";
import { motion } from "framer-motion";
import { useGallery } from "./GalleryContext";
import GalleryPopup from "./GalleryPopup";
import { Upload } from "lucide-react";

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

export default function ArtGalleryGrid() {
    const {
        items,
        selectedItemIndex,
        setSelectedItemIndex,
        updateItem,
        deleteItem,
        subtitleOptions,
        updateSubtitleOptions,
        isAdmin,
        addItem
    } = useGallery();

    const handleUpdateItem = (updatedItem: any) => {
        if (selectedItemIndex !== null) {
            updateItem(selectedItemIndex, updatedItem);
        }
    };

    const handleDeleteItem = () => {
        if (selectedItemIndex !== null) {
            deleteItem(selectedItemIndex);
        }
    };

    const handleAddSlot = () => {
        addItem({
            type: "image",
            content: "/assets/default-slot-new.jpg",
            hueA: Math.floor(Math.random() * 360),
            hueB: Math.floor(Math.random() * 360),
            name: "New Masterpiece",
            price: 50,
            description: "A blank canvas waiting for your creativity.",
            subtitle: "Original Piece",
            showOnHome: false
        });
    };

    return (
        <section className="py-12 md:py-20 px-4 md:px-8 bg-[#FDFBF7]">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#5D4037] text-center md:text-left">
                        Full Gallery Archive
                    </h2>
                    {isAdmin && (
                        <button
                            onClick={handleAddSlot}
                            className="flex items-center gap-2 px-6 py-3 bg-[#FFB7C5] border-2 border-[#5D4037] rounded-full font-bold hover:bg-[#5D4037] hover:text-white transition-all shadow-lg text-[#5D4037]"
                        >
                            <Upload size={20} />
                            Add New Artwork
                        </button>
                    )}
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white aspect-[3/4]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedItemIndex(index)}
                        >
                            {item.type === "image" || (item.content && item.content.startsWith('/')) || (item.content && item.content.startsWith('http')) || (item.content && item.content.startsWith('data:')) ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={item.content}
                                        alt={item.name || "Gallery Item"}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center text-6xl select-none"
                                    style={{ background: `linear-gradient(135deg, ${hue(item.hueA)}, ${hue(item.hueB)})` }}
                                >
                                    {item.content}
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[#FFB7C5]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm p-4 text-center">
                                <h3 className="text-white text-2xl font-bold drop-shadow-md mb-2">
                                    {item.name}
                                </h3>
                                {item.showOnHome && (
                                    <span className="bg-[#5D4037] text-white text-xs px-2 py-1 rounded-full">Featured on Home</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Shared Gallery Popup */}
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
        </section>
    );
}
