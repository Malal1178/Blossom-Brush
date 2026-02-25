"use client";

import { motion, useCycle, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Flower, Home, User, Mail, Palette, MapPin } from "lucide-react";

// Colors from globals/theme
const colors = ["#FFB7C5", "#98FB98", "#5D4037", "#FFD1DC", "#E8DCC4"];

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring" as const,
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(0px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring" as const,
            stiffness: 400,
            damping: 40
        }
    }
};

const Navigation = ({ toggle }: { toggle: () => void }) => (
    <motion.ul variants={navVariants} className="p-6 absolute top-[100px] w-full max-w-[300px]">
        {items.map((item, i) => (
            <MenuItem i={i} key={i} item={item} toggle={toggle} />
        ))}
        <LocationMenuItem />
    </motion.ul>
);

const items = [
    { label: "Home", href: "/", icon: Home, color: "#FFB7C5" },
    { label: "About Us", href: "/about-us", icon: User, color: "#98FB98" },
    { label: "Contact Us", href: "/contact-us", icon: Mail, color: "#FFD1DC" },
    { label: "Gallery", href: "/gallery", icon: Palette, color: "#E8DCC4" },
];

const MenuItem = ({ i, item, toggle }: { i: number, item: any, toggle: () => void }) => {
    const border = `2px solid ${item.color}`;
    const Icon = item.icon;
    return (
        <motion.li
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center mb-5 cursor-pointer"
        >
            <Link href={item.href} onClick={toggle} className="flex items-center w-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-5 text-[#5D4037]" style={{ border }}>
                    <Icon size={20} />
                </div>
                <div className="rounded-[5px] h-5 flex-1 text-[#5D4037] font-bold text-lg" style={{ border: "none" }}>
                    {item.label}
                </div>
            </Link>
        </motion.li>
    );
};

const LocationMenuItem = () => {
    const handleLocationClick = async () => {
        const locationUrl = 'https://www.google.com/maps/search/?api=1&query=35.6895,139.6917';
        const locationTitle = 'Visit our Gallery';

        if (navigator.share) {
            try {
                await navigator.share({
                    title: locationTitle,
                    text: 'Open gallery location in your favorite maps app:',
                    url: locationUrl,
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            window.open(locationUrl, '_blank');
        }
    };

    const border = `2px solid #FFB7C5`;

    return (
        <motion.li
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center mb-5 cursor-pointer w-full"
            onClick={handleLocationClick}
        >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-5 text-[#5D4037]" style={{ border }}>
                <MapPin size={20} />
            </div>
            <div className="rounded-[5px] h-5 flex-1 text-[#5D4037] font-bold text-lg" style={{ border: "none" }}>
                Location
            </div>
        </motion.li>
    );
};

const navVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button onClick={toggle} className="outline-none border-none select-none cursor-pointer absolute top-[9px] left-[15px] w-[50px] h-[50px] rounded-full bg-transparent z-50 flex items-center justify-center">
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 4.5 L 20 4.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
            />
            <Path
                d="M 2 11.423 L 20 11.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 18.346 L 20 18.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
            />
        </svg>
    </button>
);

const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="#5D4037"
        strokeLinecap="round"
        {...props}
    />
);

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth;
            dimensions.current.height = ref.current.offsetHeight;
        }
    }, []);

    return dimensions.current;
};

export default function MobileMenu() {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { height } = useDimensions(containerRef);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className={`fixed top-0 left-0 bottom-0 w-[300px] z-50 md:hidden ${isOpen ? "" : "pointer-events-none"}`} // pointer events when closed?
        >
            <motion.div className="fixed top-0 left-0 bottom-0 w-[300px] bg-[#FDFBF7] shadow-xl" variants={sidebar} />
            <div className={`relative z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-auto"}`}>
                <MenuToggle toggle={() => toggleOpen()} />
            </div>
            <div className={`${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <Navigation toggle={() => toggleOpen()} />
            </div>
        </motion.nav>
    );
}
