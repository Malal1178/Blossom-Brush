"use client";
import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useGallery, FramePosition } from './GalleryContext';

interface FrameSettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FrameSettingsPanel({ isOpen, onClose }: FrameSettingsPanelProps) {
    const { framePositions, updateFramePosition, resetFramePositions, addFrame, removeFrame } = useGallery();

    if (!isOpen) return null;

    const handlePositionChange = (index: number, field: keyof FramePosition, value: string) => {
        const newPosition = { ...framePositions[index], [field]: value };
        updateFramePosition(index, newPosition);
    };

    return (
        <div className="fixed top-4 right-4 bg-white border-4 border-[#5D4037] rounded-lg shadow-2xl p-6 z-50 max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#5D4037]">Frame Positions</h3>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                    <X size={20} className="text-[#5D4037]" />
                </button>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                <span className="font-semibold">{framePositions.length}</span> frame{framePositions.length !== 1 ? 's' : ''}
            </div>

            <div className="space-y-4">
                {framePositions.map((position, index) => (
                    <div key={index} className="border-2 border-[#FFB7C5] rounded-lg p-4 relative">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-[#5D4037]">Frame {index + 1}</h4>
                            {framePositions.length > 1 && (
                                <button
                                    onClick={() => removeFrame(index)}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                    title="Remove frame"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    X Position
                                </label>
                                <input
                                    type="text"
                                    value={position.x}
                                    onChange={(e) => handlePositionChange(index, 'x', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="e.g., 28%"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Y Position
                                </label>
                                <input
                                    type="text"
                                    value={position.y}
                                    onChange={(e) => handlePositionChange(index, 'y', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="e.g., 31%"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Width
                                </label>
                                <input
                                    type="text"
                                    value={position.width}
                                    onChange={(e) => handlePositionChange(index, 'width', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="e.g., 11%"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Height
                                </label>
                                <input
                                    type="text"
                                    value={position.height}
                                    onChange={(e) => handlePositionChange(index, 'height', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="e.g., 15%"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addFrame}
                className="mt-4 w-full px-4 py-2 bg-[#FFB7C5] border-2 border-[#5D4037] text-[#5D4037] rounded-lg hover:bg-[#5D4037] hover:text-white transition-colors font-bold flex items-center justify-center gap-2"
            >
                <Plus size={18} />
                Add New Frame
            </button>

            <button
                onClick={resetFramePositions}
                className="mt-2 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
            >
                Reset to Defaults
            </button>
        </div>
    );
}
