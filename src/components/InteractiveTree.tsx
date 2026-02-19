"use client";
import React from 'react';
import { useGallery } from "./GalleryContext";

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

    const getFrameImage = (frameIndex: number): string => {
        const linkedItemIndex = heroLinks[frameIndex];
        if (linkedItemIndex !== null && items[linkedItemIndex]) {
            return items[linkedItemIndex].content;
        }
        return "";
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

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            updateHeroTreeImage(base64String);
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
                    <label className="absolute top-2 left-2 px-3 py-1 bg-[#FFB7C5] border-2 border-[#5D4037] text-[#5D4037] rounded-full text-xs font-bold hover:bg-[#5D4037] hover:text-white transition-all cursor-pointer shadow-lg z-20">
                        Change Image
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
                const image = getFrameImage(index);
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
                        {/* Display linked image if present */}
                        {image ? (
                            <img
                                src={image}
                                alt={`Frame ${index}`}
                                className="w-full h-full object-cover pointer-events-none"
                            />
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
