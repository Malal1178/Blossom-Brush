"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GalleryItem } from "./GalleryContext";

interface ItemSelectorPopupProps {
    isOpen: boolean;
    onClose: () => void;
    items: GalleryItem[];
    onSelect: (index: number) => void;
    currentSelection?: number | null;
}

export default function ItemSelectorPopup({ isOpen, onClose, items, onSelect, currentSelection }: ItemSelectorPopupProps) {
    const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#FDFBF7] rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#FFB7C5]/20 transition-colors"
                        >
                            <X size={24} className="text-[#5D4037]" />
                        </button>

                        <h2 className="text-3xl font-bold text-[#5D4037] mb-6 text-center">
                            Select Gallery Item
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {items.map((item, index) => {
                                const background = `linear-gradient(135deg, ${hue(item.hueA)}, ${hue(item.hueB)})`;
                                const isSelected = currentSelection === index;

                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            onSelect(index);
                                            onClose();
                                        }}
                                        className={`cursor-pointer rounded-2xl overflow-hidden shadow-lg relative ${isSelected ? "ring-4 ring-[#4CAF50]" : ""
                                            }`}
                                    >
                                        <div
                                            className="aspect-[3/4] flex items-center justify-center relative"
                                            style={{ background }}
                                        >
                                            <div className="w-full h-full flex items-center justify-center bg-white/90 p-4">
                                                {item.type === "image" ? (
                                                    <img
                                                        src={item.content}
                                                        alt={item.name || "Item"}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <span className="text-6xl">{item.content}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-3 bg-white">
                                            <p className="font-bold text-[#5D4037] text-sm truncate">
                                                {index}: {item.name || "Untitled"}
                                            </p>
                                            {item.price && (
                                                <p className="text-xs text-[#8B5A2B]">${item.price}</p>
                                            )}
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                ✓
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    onSelect(-1);
                                    onClose();
                                }}
                                className="px-6 py-3 bg-red-100 text-red-600 rounded-full font-bold hover:bg-red-200 transition-colors"
                            >
                                Clear Link
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
