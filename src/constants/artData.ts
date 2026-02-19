export interface ArtItem {
    id: string;
    src: string;
    title: string;
    description: string;
}

export const galleryItems: ArtItem[] = [
    {
        id: "1",
        src: "/assets/default-slot-new.jpg",
        title: "Sakura Dreams",
        description: "A gentle breeze carries the pink petals across a serene landscape."
    },
    {
        id: "2",
        src: "/assets/default-slot-new.jpg",
        title: "Ocean Whisper",
        description: "The deep blue waves tell secrets of the ancient ocean."
    },
    {
        id: "3",
        src: "/assets/default-slot-new.jpg",
        title: "Mountain Solitude",
        description: "Standing tall above the clouds, finding peace in the heights."
    },
    {
        id: "4",
        src: "/assets/default-slot-new.jpg",
        title: "Autumn Breeze",
        description: "Golden leaves dancing in the crisp fall air."
    },
    {
        id: "5",
        src: "/assets/default-slot-new.jpg",
        title: "Urban Echo",
        description: "The rhythm of the city caught in a moment of reflection."
    },
    {
        id: "6",
        src: "/assets/default-slot-new.jpg",
        title: "Abstract Thoughts",
        description: "Colors and shapes converging to form a visual melody."
    },
    // Add more items as needed
];
