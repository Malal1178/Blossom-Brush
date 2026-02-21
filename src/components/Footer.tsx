"use client";

import { Flower } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-sage/10 border-t border-sage/20 py-12 relative z-50">
            <div className="container mx-auto px-6 text-center">
                <Link href="/" className="flex items-center justify-center gap-2 mb-4 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                    <Flower className="w-6 h-6 text-blossom" />
                    <span className="text-xl font-bold text-earth">Blossom & Brush</span>
                </Link>
                <div className="flex items-center justify-center gap-1 text-sm mb-8">
                    <span className="text-stone-400">Powered By</span>
                    <a href="https://divisionops.com/" className="font-bold flex gap-[1px]" target="_blank" rel="noopener noreferrer">
                        <span className="text-earth">Division</span><span className="text-[#F97316]">Ops</span>
                    </a>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 text-stone-400 text-sm">
                    <Link href="/terms" className="hover:text-earth transition-colors cursor-pointer">Terms</Link>
                    <Link href="/privacy" className="hover:text-earth transition-colors cursor-pointer">Privacy</Link>
                    <a href="#" className="hover:text-earth transition-colors">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
