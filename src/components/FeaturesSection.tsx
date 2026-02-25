"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-6 bg-white/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-pink-500 font-bold tracking-wider uppercase text-sm">Purr-fect Features</span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-pink-800 mt-2">Everything You Need for Cat Happiness 🐾</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <motion.div
                        whileHover={{ y: -10, rotate: 2 }}
                        className="feature-card bg-white p-8 rounded-3xl shadow-lg border-2 border-pink-100 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-rose-400 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg transform group-hover:rotate-12 transition-transform">
                                🏠
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-pink-800 mb-3">Cozy Cat Homes</h3>
                            <p className="text-pink-700/70 leading-relaxed">Find the perfect sakura-themed cat trees and cozy corners for your feline friends to nap and play.</p>
                        </div>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        whileHover={{ y: -10, rotate: 2 }}
                        className="feature-card bg-white p-8 rounded-3xl shadow-lg border-2 border-pink-100 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-rose-300 to-pink-400 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg transform group-hover:rotate-12 transition-transform">
                                🍱
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-pink-800 mb-3">Gourmet Treats</h3>
                            <p className="text-pink-700/70 leading-relaxed">Premium Japanese-inspired cat cuisine that will make your kitty purr with delight at every meal.</p>
                        </div>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        whileHover={{ y: -10, rotate: 2 }}
                        className="feature-card bg-white p-8 rounded-3xl shadow-lg border-2 border-pink-100 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-300 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg transform group-hover:rotate-12 transition-transform">
                                📸
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-pink-800 mb-3">Photo Contests</h3>
                            <p className="text-pink-700/70 leading-relaxed">Share your cutest cat moments under the cherry blossoms and win amazing prizes every month!</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
