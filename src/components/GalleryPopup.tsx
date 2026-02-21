"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Upload, Save } from "lucide-react";
import { useCart } from "./CartContext";
import { useToast } from "@/contexts/ToastContext";

interface GalleryItem {
    type: "emoji" | "image";
    content: string;
    hueA: number;
    hueB: number;
    name?: string;
    price?: number;
    description?: string;
    subtitle?: string;
    id?: string;
    showOnHome?: boolean;
}

interface GalleryPopupProps {
    isOpen: boolean;
    onClose: () => void;
    item: GalleryItem;
    onUpdate: (updatedItem: GalleryItem) => void;
    isAdmin: boolean;
    subtitleOptions?: string[];
    onUpdateOptions?: (options: string[]) => void;
    onDelete?: () => void;
}

export default function GalleryPopup({ isOpen, onClose, item, onUpdate, isAdmin, subtitleOptions = [], onUpdateOptions, onDelete }: GalleryPopupProps) {
    const { addToCart, cart } = useCart();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(item.name || "Untitled Artwork");
    const [editedPrice, setEditedPrice] = useState(item.price || 50);
    const [editedContent, setEditedContent] = useState(item.content);
    const [editedDescription, setEditedDescription] = useState(item.description || "This unique piece allows you to explore new creative mediums. Perfect for your collection or as a gift for an art lover.");
    const [editedSubtitle, setEditedSubtitle] = useState(item.subtitle || "Original Piece");

    // Reset state when item changes
    useEffect(() => {
        setEditedName(item.name || "Untitled Artwork");
        setEditedPrice(item.price || 50);
        setEditedContent(item.content);
        setEditedDescription(item.description || "This unique piece allows you to explore new creative mediums. Perfect for your collection or as a gift for an art lover.");
        setEditedSubtitle(item.subtitle || "Original Piece");
        setIsEditing(false);
    }, [item, isOpen]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddToCart = () => {
        const isDuplicate = cart.some(cartItem => cartItem.name === editedName);

        if (isDuplicate) {
            showToast(`${editedName} is already in the cart`);
            return;
        }

        addToCart({
            id: Date.now().toString(),
            name: editedName,
            image: editedContent,
            price: editedPrice
        });
        showToast(`${editedName} has been added to the cart`);
        onClose();
    };

    const handleSave = () => {
        onUpdate({
            ...item,
            name: editedName,
            price: editedPrice,
            content: editedContent,
            description: editedDescription,
            subtitle: editedSubtitle,
            type: editedContent.startsWith("data:image") ? "image" : item.type
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this slot?")) {
            if (onDelete) {
                onDelete();
                onClose();
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedContent(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors text-[#5D4037]"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 bg-[#F0EAD6] flex items-center justify-center p-8 relative min-h-[300px]">
                            {isAdmin && isEditing && (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity text-white font-bold"
                                >
                                    <Upload size={48} className="mb-2" />
                                    Click to Replace Image
                                </button>
                            )}

                            {editedContent.startsWith("data:image") || item.type === "image" ? (
                                <img
                                    src={editedContent}
                                    alt="Artwork"
                                    className="max-full max-h-full object-contain shadow-lg rounded-lg" // Changed from w-full h-full object-cover
                                />
                            ) : (
                                <div className="text-[120px] filter drop-shadow-xl">{editedContent}</div>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                            <div className="flex flex-col items-center mb-6">
                                {isAdmin && (
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="mb-4 px-6 py-2 bg-[#E8DCC4] text-[#5D4037] rounded-full font-bold hover:bg-[#D4C5A9] transition-colors shadow-sm"
                                    >
                                        {isEditing ? "Cancel Editing" : "Edit Details"}
                                    </button>
                                )}

                                <div className="w-full text-left">
                                    {isAdmin && isEditing ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            className="text-3xl font-bold text-[#5D4037] bg-white border border-[#E8DCC4] rounded px-2 w-full mb-2"
                                            placeholder="Artwork Name"
                                        />
                                    ) : (
                                        <h2 className="text-3xl font-bold text-[#5D4037] mb-2">{editedName}</h2>
                                    )}
                                    {isAdmin && isEditing ? (
                                        <div className="flex flex-col gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={editedSubtitle}
                                                    onChange={(e) => setEditedSubtitle(e.target.value)}
                                                    className="bg-white border border-[#E8DCC4] rounded px-2 py-1 text-[#8B5A2B] font-medium flex-1"
                                                >
                                                    {subtitleOptions.map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    onClick={() => {
                                                        const newOpt = prompt("Enter new category name:");
                                                        if (newOpt && onUpdateOptions) {
                                                            onUpdateOptions([...subtitleOptions, newOpt]);
                                                            setEditedSubtitle(newOpt);
                                                        }
                                                    }}
                                                    className="bg-green-100 text-green-700 w-8 h-8 rounded flex items-center justify-center font-bold hover:bg-green-200"
                                                    title="Add new option"
                                                >
                                                    +
                                                </button>
                                                {subtitleOptions.length > 1 && (
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Remove "${editedSubtitle}" from options?`)) {
                                                                const newOpts = subtitleOptions.filter(o => o !== editedSubtitle);
                                                                if (onUpdateOptions) onUpdateOptions(newOpts);
                                                                setEditedSubtitle(newOpts[0] || "");
                                                            }
                                                        }}
                                                        className="bg-red-100 text-red-700 w-8 h-8 rounded flex items-center justify-center font-bold hover:bg-red-200"
                                                        title="Remove selected option"
                                                    >
                                                        x
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-[#8B5A2B]">{editedSubtitle}</p>
                                    )}

                                    {isAdmin && isEditing && (
                                        <div className="flex items-center gap-3 mt-4 bg-white/50 p-3 rounded-lg border border-[#E8DCC4]">
                                            <input
                                                type="checkbox"
                                                id="showOnHome"
                                                checked={item.showOnHome || false}
                                                onChange={(e) => {
                                                    onUpdate({ ...item, showOnHome: e.target.checked });
                                                }}
                                                className="w-5 h-5 accent-[#5D4037] cursor-pointer"
                                            />
                                            <label htmlFor="showOnHome" className="text-[#5D4037] font-bold cursor-pointer select-none">
                                                Show on Home Page?
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description Editing */}
                            {isAdmin && isEditing ? (
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    className="text-[#5D4037]/80 text-lg leading-relaxed mb-8 w-full h-32 p-2 border border-[#E8DCC4] rounded bg-white resize-none"
                                />
                            ) : (
                                <p className="text-[#5D4037]/80 text-lg leading-relaxed mb-8">
                                    {editedDescription}
                                </p>
                            )}

                            <div className="mt-auto space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg text-[#8B5A2B] font-medium">Price</span>
                                    {isAdmin && isEditing ? (
                                        <div className="flex items-center">
                                            <span className="text-2xl font-bold text-[#5D4037] mr-1">$</span>
                                            <input
                                                type="number"
                                                value={editedPrice}
                                                onChange={(e) => setEditedPrice(Number(e.target.value))}
                                                className="text-2xl font-bold text-[#5D4037] bg-white border border-[#E8DCC4] rounded px-2 w-24"
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-3xl font-bold text-[#5D4037]">${editedPrice}</span>
                                    )}
                                </div>

                                {isAdmin && isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleDelete}
                                            className="px-6 py-4 bg-red-100 text-red-600 rounded-full font-bold text-lg hover:bg-red-200 transition-all flex items-center justify-center"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 py-4 bg-[#4CAF50] text-white rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Save size={20} />
                                            Save Changes
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full py-4 bg-[#FFB7C5] text-[#5D4037] rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
