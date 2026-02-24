"use client";
import React from 'react';
import { useGallery } from "./GalleryContext";
import { uploadImageToSupabase } from "@/lib/uploadImage";
import { useState } from "react";

interface InteractiveTreeProps {
    className?: string;
    onFrameClick?: (frameIndex: number) => void;
    editMode?: boolean;
}

export default function InteractiveTree({ className, onFrameClick, editMode = false }: InteractiveTreeProps) {
    const {
        items,
        heroLinks,
        isAdmin,
        setSelectedItemIndex,
        framePositions,
        updateFramePosition,
        heroTreeImage,
        updateHeroTreeImage
    } = useGallery();
    const [isUploading, setIsUploading] = useState(false);

    const handleFrameClick = (frameIndex: number) => {
        const linkedItemIndex = heroLinks[frameIndex];

        if (isAdmin && onFrameClick) {
            // Admin: Notify parent to open selector
            onFrameClick(frameIndex);
        } else if (!isAdmin && linkedItemIndex !== null && items[linkedItemIndex]) {
            // User: Open item popup if linked
            setSelectedItemIndex(linkedItemIndex);
        }
    };

    const getFrameItem = (frameIndex: number) => {
        const linkedItemIndex = heroLinks[frameIndex];
        if (linkedItemIndex !== null && items[linkedItemIndex]) {
            return items[linkedItemIndex];
        }
        return null;
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        if (!editMode) return;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('frameIndex', index.toString());
    };

    const handleDrag = (e: React.DragEvent, index: number) => {
        if (!editMode || e.clientX === 0 || e.clientY === 0) return;

        const container = e.currentTarget.parentElement;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Update position in real-time
        const currentPos = framePositions[index];
        updateFramePosition(index, {
            ...currentPos,
            x: `${Math.max(0, Math.min(95, x))}%`,
            y: `${Math.max(0, Math.min(95, y))}%`
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;
            const publicUrl = await uploadImageToSupabase(base64String, `hero_tree_${Date.now()}.png`);
            if (publicUrl) {
                updateHeroTreeImage(publicUrl);
            } else {
                alert("Failed to upload image to the cloud.");
                // Fallback to local
                updateHeroTreeImage(base64String);
            }
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={`relative ${className || ''}`}>
            {/* Background tree image with clean transparent background */}
            <div className="relative w-full h-full">
                <img
                    src={heroTreeImage}
                    alt="Blossom Tree"
                    className="w-full h-full object-cover drop-shadow-2xl"
                />
                {/* Image upload button in edit mode */}
                {editMode && isAdmin && (
                    <label className={`absolute top-2 left-2 px-3 py-1 border-2 border-[#5D4037] text-[#5D4037] rounded-full text-xs font-bold transition-all shadow-lg z-20 ${isUploading ? 'bg-gray-400 cursor-wait' : 'bg-[#FFB7C5] hover:bg-[#5D4037] hover:text-white cursor-pointer'}`}>
                        {isUploading ? "Uploading..." : "Change Image"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {/* White picture frame slots */}
            {framePositions.map((position, index) => {
                const item = getFrameItem(index);
                const editable = isAdmin || (heroLinks[index] !== null);

                return (
                    <div
                        key={index}
                        role="button"
                        tabIndex={0}
                        draggable={editMode}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDrag={(e) => handleDrag(e, index)}
                        onClick={() => !editMode && handleFrameClick(index)}
                        onKeyDown={(e) => {
                            if (!editMode && (e.key === 'Enter' || e.key === ' ')) {
                                handleFrameClick(index);
                            }
                        }}
                        className={`absolute bg-white border-4 border-[#8B5A2B] rounded-lg shadow-lg overflow-hidden z-10 ${editMode
                            ? "cursor-move hover:border-[#FFB7C5] hover:border-8 pointer-events-auto ring-2 ring-[#FFB7C5]"
                            : editable
                                ? "cursor-pointer hover:scale-110 hover:shadow-2xl hover:border-[#FFB7C5] pointer-events-auto"
                                : "pointer-events-none"
                            } transition-getAll duration-300 ease-out`}
                        style={{
                            left: position.x,
                            top: position.y,
                            width: position.width,
                            height: position.height,
                        }}
                    >
                        {/* Display linked item if present */}
                        {item ? (
                            item.type === "image" ? (
                                <img
                                    src={item.content}
                                    alt={`Frame ${index}`}
                                    className="w-full h-full object-cover pointer-events-none"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl filter drop-shadow-md pointer-events-none" style={{ backgroundColor: `hsl(${item.hueA}, ${item.hueB}%, 90%)` }}>
                                    {item.content}
                                </div>
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white transition-colors hover:bg-stone-50">
                                {editMode && (
                                    <span className="text-[#FFB7C5] text-2xl font-bold pointer-events-none">⊕</span>
                                )}
                                {!editMode && isAdmin && (
                                    <span className="text-gray-300 text-xs text-center p-2">+</span>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
