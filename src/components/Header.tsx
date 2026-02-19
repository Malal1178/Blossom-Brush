"use client";
import { Search, Flower, Menu, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import UserButton from "./UserButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function Header() {
    const { cart, toggleCart } = useCart();

    const navItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Gallery", href: "/gallery" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-[#FDFBF7] border-b-4 border-[#5D4037]/10 shadow-sm"
        >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
                {/* Mobile Menu Button - Left */}
                <MobileMenu />

                {/* Center Nav & Search Bar Combined Container */}
                <div className="hidden md:flex flex-1 mx-8 items-center justify-between bg-white border-2 border-[#E8DCC4] rounded-full p-1 pl-6 shadow-inner">

                    {/* Nav Links */}
                    <nav className="flex gap-4 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-[#FDFBF7] transition-colors text-[#5D4037] font-bold text-sm"
                            >
                                {item.label !== "Home" && <Flower className="w-4 h-4 text-[#FFB7C5]" />}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Search */}
                    {/* Search */}
                    <form
                        action="/search"
                        method="GET"
                        className="searchBox"
                        onSubmit={(e) => {
                            const form = e.currentTarget;
                            const input = form.elements.namedItem("q") as HTMLInputElement;
                            if (!input.value.trim()) {
                                e.preventDefault();
                                input.focus();
                            }
                        }}
                    >
                        <input className="searchInput" type="text" name="q" placeholder="Search" required />
                        <button className="searchButton" type="submit">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleCart}
                        className="relative p-2 rounded-full hover:bg-[#FDFBF7] transition-colors text-[#5D4037]"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#FFB7C5] text-[#5D4037] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                                {cart.length}
                            </span>
                        )}
                    </button>
                    <UserButton />
                    {/* Logo - Right (Desktop) */}
                    <Link href="/" className="flex items-center gap-3 group ml-4">
                        <div className="w-10 h-10 rounded-full bg-[#E8DCC4] border-2 border-[#5D4037] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                            <Flower className="w-6 h-6 text-[#5D4037]" />
                        </div>
                    </Link>
                </div>

                {/* Logo - Right (Mobile) */}
                <Link href="/" className="md:hidden flex items-center gap-3 group ml-auto">
                    <div className="w-10 h-10 rounded-full bg-[#E8DCC4] border-2 border-[#5D4037] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                        <Flower className="w-6 h-6 text-[#5D4037]" />
                    </div>
                </Link>
            </div>
        </motion.header>
    );
}
