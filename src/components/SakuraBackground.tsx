"use client";
import React, { useEffect, useRef, useState } from 'react';

interface Petal {
    id: number;
    x: number;
    y: number;
    z: number; // 0=back, 1=mid, 2=front
    rotation: number;
    rotationSpeed: number;
    swayOffset: number;
    swaySpeed: number;
    fallSpeed: number;
    scale: number;
    path: string;
    opacity: number;
}

const PETAL_PATHS = [
    "M12 2C12 2 10 8 7 8C4 8 2 6 2 4C2 2 6 0 12 2Z", // shape 1
    "M12 2C12 2 12 9 8 9C4 9 2 7 2 5C2 3 7 0 12 2Z", // shape 2
    "M10 0C10 0 8 6 5 6C2 6 0 4 0 2C0 0 5 -2 10 0Z", // shape 3
    "M15 5C15 5 12 10 8 10C4 10 2 8 2 6C2 4 8 2 15 5Z", // shape 4
    "M8 0C8 0 6 5 4 5C2 5 0 4 0 2C0 0 4 -2 8 0Z", // shape 5 - small rounded
    "M14 4C14 4 11 9 7 9C3 9 1 7 1 5C1 3 6 1 14 4Z", // shape 6
    "M10 2C10 2 9 7 6 7C3 7 1 5 1 3C1 1 5 0 10 2Z", // shape 7
    "M16 6C16 6 13 11 9 11C5 11 3 9 3 7C3 5 9 3 16 6Z", // shape 8
];

export default function SakuraBackground() {
    const [petals, setPetals] = useState<Petal[]>([]);
    const requestRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const petalsRef = useRef<Petal[]>([]); // Mutable ref for animation loop to avoid re-renders impacting logic

    useEffect(() => {
        // Initialize petals
        const initialPetals: Petal[] = [];
        const petalCount = 40;

        for (let i = 0; i < petalCount; i++) {
            initialPetals.push(createPetal(i, true));
        }

        petalsRef.current = initialPetals;
        setPetals(initialPetals);

        const animate = (time: number) => {
            updatePetals(time);
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const createPetal = (id: number, randomY: boolean = false): Petal => {
        const z = Math.floor(Math.random() * 3); // 0, 1, 2
        const sizeBase = z === 0 ? 10 : z === 1 ? 15 : 20;
        const speedBase = z === 0 ? 0.5 : z === 1 ? 1 : 1.5;
        const opacity = z === 0 ? 0.4 : z === 1 ? 0.6 : 0.8;

        return {
            id,
            x: Math.random() * 100, // percentage
            y: randomY ? Math.random() * 100 : -10, // start above screen if not randomY
            z,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            swayOffset: Math.random() * Math.PI * 2,
            swaySpeed: 0.002 + Math.random() * 0.003,
            fallSpeed: speedBase + Math.random() * 0.5,
            scale: 0.8 + Math.random() * 0.4,
            path: PETAL_PATHS[Math.floor(Math.random() * PETAL_PATHS.length)],
            opacity,
        };
    };

    const updatePetals = (time: number) => {
        petalsRef.current = petalsRef.current.map(p => {
            let newY = p.y + p.fallSpeed * 0.1; // adjust speed factor as needed
            let newX = p.x + Math.sin(time * p.swaySpeed + p.swayOffset) * 0.1;
            let newRotation = p.rotation + p.rotationSpeed;

            // "Antigravity" flutter - occasional upward/sideways burst
            // Simplified: just the sway handles the sideways. 
            // For upward: occasional random check? 
            // Actually, keep it simple for high performance. The sine wave x-axis already gives a "floating" feel.

            // Wrap around
            if (newY > 110) {
                return createPetal(p.id, false);
            }

            return {
                ...p,
                y: newY,
                x: newX,
                rotation: newRotation
            };
        });

        // Optimization: Batch updates to React state less frequently if needed, or use a canvas?
        // Actually, for direct DOM updates of ~40 items, React state might be jittery if we update 60fps.
        // BETTER APPROACH for 60FPS React: Use refs for DOM elements directly or 'useRef' for values and forceUpdate.
        // OR: Update a style object ref and only trigger re-render if needed? 
        // Standard React state update 60fps is often fine for <100 elements on modern devices.
        // Let's try direct state update first.
        setPetals([...petalsRef.current]);
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-[5]"
            aria-hidden="true"
        >
            {petals.map((p) => {
                // Depth styles
                const blur = p.z === 0 ? '1px' : '0px';
                const zIndex = p.z === 0 ? -1 : p.z === 1 ? 0 : 1; // relative to container

                return (
                    <div
                        key={p.id}
                        className="absolute text-[#FFB7C5]"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: '24px',
                            height: '24px',
                            opacity: p.opacity,
                            filter: `blur(${blur})`,
                            transform: `translate3d(0,0,0) rotate(${p.rotation}deg) scale(${p.scale})`,
                            willChange: 'transform, top, left',
                            zIndex: zIndex
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                            <path d={p.path} />
                        </svg>
                    </div>
                );
            })}
        </div>
    );
};


