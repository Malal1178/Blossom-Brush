"use client";

import { Flower } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-sage/10 border-t border-sage/20 py-12">
            <div className="container mx-auto px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
                    <Flower className="w-6 h-6 text-blossom" />
                    <span className="text-xl font-bold text-earth">Blossom & Brush</span>
                </div>
                <p className="text-stone-500 mb-8">© 2024 Blossom & Brush. All rights reserved.</p>
                <div className="flex justify-center gap-6 text-stone-400 text-sm">
                    <a href="#" className="hover:text-earth transition-colors">Terms</a>
                    <a href="#" className="hover:text-earth transition-colors">Privacy</a>
                    <a href="#" className="hover:text-earth transition-colors">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
