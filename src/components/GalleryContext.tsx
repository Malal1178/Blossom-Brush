"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { db, storage } from "../lib/firebase";
import { collection, doc, onSnapshot, setDoc, addDoc, deleteDoc, query, orderBy, getDoc, writeBatch } from "firebase/firestore";
import { useToast } from "@/contexts/ToastContext";

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
    id?: string;
    showOnHome?: boolean;
    createdAt?: number;
}

export interface FramePosition {
    x: string;
    y: string;
    width: string;
    height: string;
}

interface GalleryContextType {
    items: GalleryItem[];
    setItems: (items: GalleryItem[]) => void;
    addItem: (item: GalleryItem) => void;
    updateItem: (index: number, item: GalleryItem) => void;
    deleteItem: (index: number) => void;

    subtitleOptions: string[];
    updateSubtitleOptions: (options: string[]) => void;

    heroLinks: (number | null)[];
    updateHeroLink: (frameIndex: number, galleryItemIndex: number | null) => void;

    framePositions: FramePosition[];
    updateFramePosition: (index: number, position: FramePosition) => void;
    resetFramePositions: () => void;
    addFrame: () => void;
    removeFrame: (index: number) => void;

    heroTreeImage: string;
    updateHeroTreeImage: (imagePath: string) => void;

    selectedItemIndex: number | null;
    setSelectedItemIndex: (index: number | null) => void;

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
    { x: '35.66%', y: '29.34%', width: '6%', height: '10%' },
    { x: '43.70%', y: '23.19%', width: '6%', height: '10%' },
    { x: '53.81%', y: '23.01%', width: '6%', height: '10%' },
    { x: '61.72%', y: '28.88%', width: '6%', height: '10%' },
    { x: '42.95%', y: '37.13%', width: '6%', height: '10%' },
    { x: '54.91%', y: '36.58%', width: '6%', height: '10%' },
];

export function GalleryProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";
    const { showToast } = useToast();

    const [items, setItems] = useState<GalleryItem[]>(defaultItems);
    const [subtitleOptions, setSubtitleOptions] = useState<string[]>(["Original Piece", "Limited Edition", "Print", "Digital Download"]);
    const [heroLinks, setHeroLinks] = useState<(number | null)[]>([0, 1, 2, 3, 4, 5]);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [framePositions, setFramePositions] = useState<FramePosition[]>(defaultFramePositions);
    const [heroTreeImage, setHeroTreeImage] = useState<string>("/assets/hero-tree-final.png");

    // --- Firebase Sync ---
    useEffect(() => {
        // 1. Gallery Items Listener
        const q = query(collection(db, "galleryItems"), orderBy("createdAt", "asc"));
        const unsubItems = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                // Initialize default items if empty
                const initializeDefaults = async () => {
                    const batch = writeBatch(db);
                    defaultItems.forEach((item, i) => {
                        const newDocRef = doc(collection(db, "galleryItems"));
                        batch.set(newDocRef, { ...item, createdAt: Date.now() + i }); // Ensure order
                    });
                    await batch.commit();
                };
                initializeDefaults();
            } else {
                const fetchedItems = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as GalleryItem));
                setItems(fetchedItems);
            }
        });

        // 2. Config Listener
        const unsubConfig = onSnapshot(doc(db, "config", "main"), (docSnap) => {
            if (!docSnap.exists()) {
                // Initialize default config if empty
                setDoc(doc(db, "config", "main"), {
                    subtitleOptions: ["Original Piece", "Limited Edition", "Print", "Digital Download"],
                    heroLinks: [0, 1, 2, 3, 4, 5],
                    framePositions: defaultFramePositions,
                    heroTreeImage: "/assets/hero-tree-final.png"
                });
            } else {
                const data = docSnap.data();
                if (data.subtitleOptions) setSubtitleOptions(data.subtitleOptions);
                if (data.heroLinks) setHeroLinks(data.heroLinks);
                if (data.framePositions) setFramePositions(data.framePositions);
                if (data.heroTreeImage) setHeroTreeImage(data.heroTreeImage);
            }
        });

        return () => {
            unsubItems();
            unsubConfig();
        };
    }, []);

    // --- Actions ---
    const addItem = async (item: GalleryItem) => {
        try {
            await addDoc(collection(db, "galleryItems"), {
                ...item,
                createdAt: Date.now()
            });
            showToast("Item added successfully!");
        } catch (error: any) {
            console.error("Error adding item: ", error);
            showToast(`Upload failed: ${error.message || "Unknown error"}`);
        }
    };

    const updateItem = async (index: number, updatedItem: GalleryItem) => {
        const itemId = items[index]?.id;
        if (!itemId) return;
        try {
            const { id, ...dataToSave } = updatedItem; // Don't save id in document body
            await setDoc(doc(db, "galleryItems", itemId), dataToSave, { merge: true });
            showToast("Item updated successfully!");
        } catch (error: any) {
            console.error("Error updating item: ", error);
            showToast(`Update failed: ${error.message || "Unknown error"}`);
        }
    };

    const deleteItem = async (index: number) => {
        const itemId = items[index]?.id;
        if (!itemId) return;
        try {
            await deleteDoc(doc(db, "galleryItems", itemId));
            setSelectedItemIndex(null);
        } catch (error) {
            console.error("Error deleting item: ", error);
        }
    };

    const updateConfig = async (key: string, value: any) => {
        try {
            await setDoc(doc(db, "config", "main"), { [key]: value }, { merge: true });
        } catch (error) {
            console.error(`Error updating config ${key}: `, error);
        }
    };

    const updateSubtitleOptions = (options: string[]) => updateConfig("subtitleOptions", options);

    const updateHeroLink = (frameIndex: number, galleryItemIndex: number | null) => {
        const newLinks = [...heroLinks];
        newLinks[frameIndex] = galleryItemIndex;
        updateConfig("heroLinks", newLinks);
    };

    const updateFramePosition = (index: number, position: FramePosition) => {
        const newPositions = [...framePositions];
        newPositions[index] = position;
        updateConfig("framePositions", newPositions);
    };

    const resetFramePositions = () => {
        updateConfig("framePositions", defaultFramePositions);
    };

    const addFrame = () => {
        const newFrame: FramePosition = { x: '45%', y: '45%', width: '10%', height: '14%' };
        const newPositions = [...framePositions, newFrame];
        const newLinks = [...heroLinks, null];

        // Batch update to keep config consistent
        setDoc(doc(db, "config", "main"), {
            framePositions: newPositions,
            heroLinks: newLinks
        }, { merge: true });
    };

    const removeFrame = (index: number) => {
        if (framePositions.length <= 1) return;
        const newPositions = framePositions.filter((_, i) => i !== index);
        const newLinks = heroLinks.filter((_, i) => i !== index);

        setDoc(doc(db, "config", "main"), {
            framePositions: newPositions,
            heroLinks: newLinks
        }, { merge: true });
    };

    const updateHeroTreeImage = (imagePath: string) => {
        updateConfig("heroTreeImage", imagePath);
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
