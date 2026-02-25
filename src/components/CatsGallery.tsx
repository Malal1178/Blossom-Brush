"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CatsGallery() {
    return (
        <section id="cats" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-pink-500 font-bold tracking-wider uppercase text-sm">Our Stars</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-pink-800 mt-2">Meet the Kitties 🌟</h2>
                    </div>
                    <Link href="/gallery" className="hidden md:flex items-center gap-2 text-pink-600 font-bold hover:text-pink-500 transition-colors group">
                        View All Cats
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Cat Card 1 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-3xl bg-pink-200 aspect-square mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                🐱
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-center">
                                    <span className="font-bold text-pink-800">Sakura-chan</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-pink-800 text-center">Sakura</h3>
                        <p className="text-pink-600 text-center text-sm">Loves cherry blossoms</p>
                    </div>

                    {/* Cat Card 2 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-3xl bg-rose-200 aspect-square mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-300 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                😺
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-center">
                                    <span className="font-bold text-pink-800">Mochi-kun</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-pink-800 text-center">Mochi</h3>
                        <p className="text-pink-600 text-center text-sm">Soft like mochi</p>
                    </div>

                    {/* Cat Card 3 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-3xl bg-pink-300 aspect-square mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-300 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                😸
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-center">
                                    <span className="font-bold text-pink-800">Luna-chan</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-pink-800 text-center">Luna</h3>
                        <p className="text-pink-600 text-center text-sm">Nighttime cuddler</p>
                    </div>

                    {/* Cat Card 4 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-3xl bg-rose-300 aspect-square mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-300 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                😻
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-center">
                                    <span className="font-bold text-pink-800">Peach-kun</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-pink-800 text-center">Peach</h3>
                        <p className="text-pink-600 text-center text-sm">Always hungry</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
