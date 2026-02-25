"use client";

import { Flower } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-32 bg-[#ffb7c5]/20 border-t border-pink-200 py-12 relative z-50">
            <div className="container mx-auto px-6 text-center">
                <Link href="/" className="flex items-center justify-center gap-2 mb-4 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                    <Flower className="w-6 h-6 text-pink-500" />
                    <span className="text-xl font-bold text-pink-800">Blossom & Brush</span>
                </Link>
                <div className="flex items-center justify-center gap-1 text-sm mb-8">
                    <span className="text-pink-600/70">Powered By</span>
                    <a href="https://divisionops.com/" className="font-bold flex gap-[1px]" target="_blank" rel="noopener noreferrer">
                        <span className="text-pink-700">Division</span><span className="text-pink-400">Ops</span>
                    </a>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 text-pink-600/80 text-sm">
                    <Link href="/terms" className="hover:text-pink-800 transition-colors cursor-pointer">Terms</Link>
                    <Link href="/privacy" className="hover:text-pink-800 transition-colors cursor-pointer">Privacy</Link>
                </div>
            </div>
        </footer>
    );
}
