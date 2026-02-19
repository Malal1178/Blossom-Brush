"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

// --- Types ---
export interface GalleryItem {
    type: "emoji" | "image";
    content: string;
    hueA: number;
    hueB: number;
    name?: string;
    price?: number;
    description?: string;
    subtitle?: string;
    id?: string; // Adding ID for easier linking
    showOnHome?: boolean; // New flag for curated list
}

export interface FramePosition {
    x: string;
    y: string;
    width: string;
    height: string;
}

interface GalleryContextType {
    items: GalleryItem[];
    setItems: (items: GalleryItem[]) => void; // Exposed for complex operations if needed
    addItem: (item: GalleryItem) => void;
    updateItem: (index: number, item: GalleryItem) => void;
    deleteItem: (index: number) => void;

    subtitleOptions: string[];
    updateSubtitleOptions: (options: string[]) => void;

    heroLinks: (number | null)[]; // Maps Frame Index (0-5) -> Gallery Item Index
    updateHeroLink: (frameIndex: number, galleryItemIndex: number | null) => void;

    framePositions: FramePosition[];
    updateFramePosition: (index: number, position: FramePosition) => void;
    resetFramePositions: () => void;
    addFrame: () => void;
    removeFrame: (index: number) => void;

    heroTreeImage: string;
    updateHeroTreeImage: (imagePath: string) => void;

    selectedItemIndex: number | null;
    setSelectedItemIndex: (index: number | null) => void; // Opens/Closes Popup

    isAdmin: boolean;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// --- Defaults ---
const defaultItems: GalleryItem[] = [
    { type: "emoji", content: "🎨", hueA: 340, hueB: 10, name: "Palette & Dreams", price: 45, description: "A colorful palette representing the endless possibilities of imagination.", subtitle: "Original Piece", showOnHome: true },
    { type: "emoji", content: "🖌️", hueA: 20, hueB: 40, name: "Golden Brush", price: 30, description: "A high-quality brush designed for the finest strokes and details.", subtitle: "Limited Edition", showOnHome: true },
    { type: "emoji", content: "🖼️", hueA: 200, hueB: 230, name: "Ocean Frame", price: 80, description: "Capture the serenity of the ocean with this beautiful blue-hued frame.", subtitle: "Original Piece", showOnHome: true },
    { type: "emoji", content: "✏️", hueA: 40, hueB: 60, name: "Sketcher's Pencil", price: 15, description: "Perfect for quick sketches and detailed drawings alike.", subtitle: "Print", showOnHome: true },
    { type: "emoji", content: "🖋️", hueA: 260, hueB: 290, name: "Ink Master", price: 60, description: "Traditional ink art style digital brush.", subtitle: "Digital Asset", showOnHome: true },
    { type: "emoji", content: "🎭", hueA: 10, hueB: 30, name: "Theater Mask", price: 120, description: "A dramatic mask for the performing arts.", subtitle: "Prop", showOnHome: true },
];

const defaultFramePositions: FramePosition[] = [
    { x: '28%', y: '31%', width: '11%', height: '15%' }, // Frame 0: Left top
    { x: '38.5%', y: '26%', width: '12.5%', height: '16.5%' }, // Frame 1: Center-left top
    { x: '51.5%', y: '26%', width: '12.5%', height: '16.5%' }, // Frame 2: Center-right top
    { x: '63%', y: '31%', width: '11%', height: '15%' }, // Frame 3: Right top
    { x: '36%', y: '46%', width: '11.5%', height: '16%' }, // Frame 4: Center-left bottom
    { x: '53%', y: '46%', width: '11.5%', height: '16%' }, // Frame 5: Center-right bottom
];

export function GalleryProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    const [items, setItems] = useState<GalleryItem[]>(defaultItems);
    const [subtitleOptions, setSubtitleOptions] = useState<string[]>(["Original Piece", "Limited Edition", "Print", "Digital Download"]);
    // Initialize heroLinks to point to the first 6 items by default
    const [heroLinks, setHeroLinks] = useState<(number | null)[]>([0, 1, 2, 3, 4, 5]);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [framePositions, setFramePositions] = useState<FramePosition[]>(defaultFramePositions);
    const [heroTreeImage, setHeroTreeImage] = useState<string>("/assets/hero-tree-final.png");

    // --- Persistence ---
    useEffect(() => {
        const savedItems = localStorage.getItem("gallery-items");
        const savedOptions = localStorage.getItem("gallery-options");
        const savedLinks = localStorage.getItem("hero-links");
        const savedFramePositions = localStorage.getItem("frame-positions");
        const savedTreeImage = localStorage.getItem("hero-tree-image");

        if (savedItems) try { setItems(JSON.parse(savedItems)); } catch (e) { console.error(e); }
        if (savedOptions) try { setSubtitleOptions(JSON.parse(savedOptions)); } catch (e) { console.error(e); }
        if (savedLinks) try { setHeroLinks(JSON.parse(savedLinks)); } catch (e) { console.error(e); }
        if (savedFramePositions) try { setFramePositions(JSON.parse(savedFramePositions)); } catch (e) { console.error(e); }
        if (savedTreeImage) try { setHeroTreeImage(savedTreeImage); } catch (e) { console.error(e); }
    }, []);

    useEffect(() => { localStorage.setItem("gallery-items", JSON.stringify(items)); }, [items]);
    useEffect(() => { localStorage.setItem("gallery-options", JSON.stringify(subtitleOptions)); }, [subtitleOptions]);
    useEffect(() => { localStorage.setItem("hero-links", JSON.stringify(heroLinks)); }, [heroLinks]);
    useEffect(() => { localStorage.setItem("frame-positions", JSON.stringify(framePositions)); }, [framePositions]);
    useEffect(() => { localStorage.setItem("hero-tree-image", heroTreeImage); }, [heroTreeImage]);

    // --- Actions ---
    const addItem = (item: GalleryItem) => setItems([...items, item]);

    const updateItem = (index: number, updatedItem: GalleryItem) => {
        const newItems = [...items];
        newItems[index] = updatedItem;
        setItems(newItems);
    };

    const deleteItem = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        // Also remove any links to this index (simplistic approach, IDs would be better but keeping simple for now)
        // If we delete index 2, index 3 becomes 2. Links pointing to 3 need to point to 2. 
        // Realistically, for this demo, we might just clear links if they are invalid.
        // Let's just validate links on render.
        setSelectedItemIndex(null);
    };

    const updateSubtitleOptions = (options: string[]) => setSubtitleOptions(options);

    const updateHeroLink = (frameIndex: number, galleryItemIndex: number | null) => {
        const newLinks = [...heroLinks];
        newLinks[frameIndex] = galleryItemIndex;
        setHeroLinks(newLinks);
    };

    const updateFramePosition = (index: number, position: FramePosition) => {
        const newPositions = [...framePositions];
        newPositions[index] = position;
        setFramePositions(newPositions);
    };

    const resetFramePositions = () => {
        setFramePositions(defaultFramePositions);
    };

    const addFrame = () => {
        // Add new frame with default position at center
        const newFrame: FramePosition = {
            x: '45%',
            y: '45%',
            width: '10%',
            height: '14%'
        };
        setFramePositions([...framePositions, newFrame]);
        // Add corresponding null link
        setHeroLinks([...heroLinks, null]);
    };

    const removeFrame = (index: number) => {
        // Prevent removing if only 1 frame left
        if (framePositions.length <= 1) return;

        // Remove frame position
        const newPositions = framePositions.filter((_, i) => i !== index);
        setFramePositions(newPositions);

        // Remove corresponding link
        const newLinks = heroLinks.filter((_, i) => i !== index);
        setHeroLinks(newLinks);
    };

    const updateHeroTreeImage = (imagePath: string) => {
        setHeroTreeImage(imagePath);
    };

    return (
        <GalleryContext.Provider value={{
            items, setItems, addItem, updateItem, deleteItem,
            subtitleOptions, updateSubtitleOptions,
            heroLinks, updateHeroLink,
            framePositions, updateFramePosition, resetFramePositions, addFrame, removeFrame,
            heroTreeImage, updateHeroTreeImage,
            selectedItemIndex, setSelectedItemIndex,
            isAdmin
        }}>
            {children}
        </GalleryContext.Provider>
    );
}

export function useGallery() {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error("useGallery must be used within a GalleryProvider");
    }
    return context;
}
