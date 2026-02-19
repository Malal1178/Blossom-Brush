"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGallery } from "./GalleryContext";
import GalleryPopup from "./GalleryPopup";
import { motion } from "framer-motion";

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const { items, setSelectedItemIndex, selectedItemIndex, updateItem, deleteItem, subtitleOptions, updateSubtitleOptions, isAdmin } = useGallery();

    // Filter items
    const filteredItems = items.filter(item => {
        const lowerQuery = query.toLowerCase();
        return (
            (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
            (item.description && item.description.toLowerCase().includes(lowerQuery))
        );
    });

    // We need to map the filtered index back to the original index for updates/deletes?
    // Actually, GalleryPopup uses selectedItemIndex to pull from 'items'. 
    // If we pass an index from 'filteredItems', it will point to the wrong item in the main 'items' array.
    // Solution: We need to find the original index of the item.

    // Let's store the *original* index when an item is clicked.
    const getOriginalIndex = (filteredItem: any) => {
        return items.indexOf(filteredItem);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-[#5D4037] mb-8">
                Search Results for "{query}"
            </h1>

            {filteredItems.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-[#8D6E63]">No items found matching your search.</p>
                    <p className="text-[#8D6E63] mt-2">Try checking your spelling or using different keywords.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white aspect-[3/4]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedItemIndex(getOriginalIndex(item))}
                        >
                            {item.type === "image" || (item.content && item.content.startsWith('/')) || (item.content && item.content.startsWith('data:')) ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={item.content}
                                        alt={item.name || "Gallery Item"}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center text-6xl"
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
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Shared Gallery Popup - Reused from Context */}
            {selectedItemIndex !== null && items[selectedItemIndex] && (
                <GalleryPopup
                    isOpen={selectedItemIndex !== null}
                    onClose={() => setSelectedItemIndex(null)}
                    item={items[selectedItemIndex]}
                    onUpdate={(updatedItem) => {
                        if (selectedItemIndex !== null) updateItem(selectedItemIndex, updatedItem);
                    }}
                    isAdmin={isAdmin}
                    subtitleOptions={subtitleOptions}
                    onUpdateOptions={updateSubtitleOptions}
                    onDelete={() => {
                        if (selectedItemIndex !== null) deleteItem(selectedItemIndex);
                    }}
                />
            )}
        </div>
    );
}
