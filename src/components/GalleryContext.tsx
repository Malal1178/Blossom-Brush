"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

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
    { x: '35.66%', y: '29.34%', width: '6%', height: '10%' }, // Frame 1
    { x: '43.70%', y: '23.19%', width: '6%', height: '10%' }, // Frame 2
    { x: '53.81%', y: '23.01%', width: '6%', height: '10%' }, // Frame 3
    { x: '61.72%', y: '28.88%', width: '6%', height: '10%' }, // Frame 4
    { x: '42.95%', y: '37.13%', width: '6%', height: '10%' }, // Frame 5
    { x: '54.91%', y: '36.58%', width: '6%', height: '10%' }, // Frame 6
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
    const [heroTreeImage, setHeroTreeImage] = useState<string>("/assets/uploaded-tree.png");

    // --- Persistence ---
    useEffect(() => {
        const fetchItems = async () => {
            // Fetch items ordered by updated_at descending to show newest/recently edited first
            const { data, error } = await supabase.from('items').select('*').order('updated_at', { ascending: false });
            if (error) {
                console.error('Error fetching items from Supabase:', error);
                // Fallback to local storage or defaults if Supabase fails
                const savedItems = localStorage.getItem("gallery-items");
                if (savedItems) {
                    try { setItems(JSON.parse(savedItems)); } catch (e) { console.error(e); }
                }
            } else if (data && data.length > 0) {
                // Map DB snake_case to CamelCase if necessary, though our types mostly match
                const mappedItems = data.map((row: any) => ({
                    ...row,
                    hueA: row.huea,
                    hueB: row.hueb,
                    showOnHome: row.show_on_home
                }));
                // Only override if data exists to avoid wiping defaults on empty DB
                setItems(mappedItems);
            } else {
                // Database is empty. Let's migrate any local storage items or defaults to Supabase.
                let itemsToMigrate = defaultItems;
                const savedItems = localStorage.getItem("gallery-items");
                if (savedItems) {
                    try {
                        const parsed = JSON.parse(savedItems);
                        if (parsed && parsed.length > 0) itemsToMigrate = parsed;
                    } catch (e) { console.error(e); }
                }

                const payloads = itemsToMigrate.map(item => ({
                    type: item.type,
                    content: item.content,
                    huea: item.hueA,
                    hueb: item.hueB,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    subtitle: item.subtitle,
                    show_on_home: item.showOnHome || false,
                    updated_at: new Date().toISOString()
                }));

                const { data: insertedData, error: insertError } = await supabase.from('items').insert(payloads).select();
                if (!insertError && insertedData) {
                    const migrated = insertedData.map((row: any) => ({
                        id: row.id,
                        ...row,
                        hueA: row.huea,
                        hueB: row.hueb,
                        showOnHome: row.show_on_home
                    }));
                    setItems(migrated);
                } else {
                    setItems(itemsToMigrate);
                }
            }
        };

        fetchItems();

        const savedOptions = localStorage.getItem("gallery-options");
        const savedLinks = localStorage.getItem("hero-links");
        const savedFramePositions = localStorage.getItem("frame-positions");
        const savedTreeImage = localStorage.getItem("hero-tree-image");

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
    const addItem = async (item: GalleryItem) => {
        const payload = {
            type: item.type,
            content: item.content,
            huea: item.hueA,
            hueb: item.hueB,
            name: item.name,
            price: item.price,
            description: item.description,
            subtitle: item.subtitle,
            show_on_home: item.showOnHome,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase.from('items').insert([payload]).select();
        if (error) {
            console.error("Error inserting item:", error);
            // Fallback for local testing if DB is down
            setItems([...items, item]);
        } else if (data && data[0]) {
            const newItem = { ...item, id: data[0].id };
            setItems([...items, newItem]);
        }
    };

    const updateItem = async (index: number, updatedItem: GalleryItem) => {
        const newItems = [...items];
        newItems[index] = updatedItem;
        setItems(newItems);

        // If it has an ID, update it in Supabase
        const payload = {
            type: updatedItem.type,
            content: updatedItem.content,
            huea: updatedItem.hueA,
            hueb: updatedItem.hueB,
            name: updatedItem.name,
            price: updatedItem.price,
            description: updatedItem.description,
            subtitle: updatedItem.subtitle,
            show_on_home: updatedItem.showOnHome,
            updated_at: new Date().toISOString()
        };

        if (updatedItem.id) {
            const { error } = await supabase.from('items').update(payload).eq('id', updatedItem.id);
            if (error) console.error("Error updating item:", error);
        } else {
            // It has no ID, so it was a default/local item being edited. Insert it!
            const { data, error } = await supabase.from('items').insert([payload]).select();
            if (error) {
                console.error("Error inserting missing item:", error);
            } else if (data && data[0]) {
                const finalItems = [...newItems];
                finalItems[index] = { ...updatedItem, id: data[0].id };
                setItems(finalItems);
            }
        }
    };

    const deleteItem = async (index: number) => {
        const itemToDelete = items[index];
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);

        if (itemToDelete.id) {
            const { error } = await supabase.from('items').delete().eq('id', itemToDelete.id);
            if (error) console.error("Error deleting item:", error);
        }

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
