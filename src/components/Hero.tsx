"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGallery } from './GalleryContext';
import SakuraBackground from './SakuraBackground';

export default function Hero() {
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [isMouseActive, setIsMouseActive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIsMouseActive(true);
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMouseOffset({ x, y });
        };

        const handleMouseLeave = () => {
            setIsMouseActive(false);
            setMouseOffset({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="font-sans text-pink-800">
            {/* --- Hero Section --- */}
            <section id="home" className="relative pt-32 pb-8 px-6 overflow-hidden">
                <SakuraBackground />

                {/* Background Decorations */}
                <div className="absolute top-20 left-10 text-6xl opacity-20 float" style={{ animationDelay: '0s' }}>🌸</div>
                <div className="absolute top-40 right-20 text-4xl opacity-20 float" style={{ animationDelay: '1s' }}>🌸</div>
                <div className="absolute bottom-20 left-1/4 text-5xl opacity-20 float" style={{ animationDelay: '2s' }}>🌸</div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 z-10"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200 shadow-sm">
                            <span className="heartbeat text-xl">💖</span>
                            <span className="text-pink-700 font-semibold text-sm">Welcome to the cutest corner of the internet!</span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight text-pink-800">
                            Where <span className="gradient-text">Cats</span> Meet <br />
                            <span className="text-pink-400">Cherry Blossoms</span> 🌸
                        </h1>

                        <p className="text-lg text-pink-800/80 max-w-lg leading-relaxed">
                            Discover a world of feline wonder wrapped in the soft petals of sakura.
                            Join our community of cat lovers and experience the kawaii life!
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/gallery" className="btn-paw bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform transition-all flex items-center gap-2">
                                <span>Start Your Journey</span>
                                <span className="text-2xl">🐾</span>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Cat Illustration Container */}
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Decorative Circle */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-rose-200/50 rounded-full blur-3xl animate-pulse"></div>

                            {/* Cat Character */}
                            <div className="relative z-10 float">
                                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                                    {/* Ears */}
                                    <path d="M120 120 L100 60 L160 100 Z" fill="#ff6b9d" className="ear-bounce" style={{ transformOrigin: '130px 100px' }} />
                                    <path d="M280 120 L300 60 L240 100 Z" fill="#ff6b9d" className="ear-bounce" style={{ transformOrigin: '270px 100px', animationDelay: '0.2s' }} />

                                    {/* Inner Ears */}
                                    <path d="M125 110 L115 75 L150 100 Z" fill="#ffb7c5" />
                                    <path d="M275 110 L285 75 L250 100 Z" fill="#ffb7c5" />

                                    {/* Face */}
                                    <ellipse cx="200" cy="200" rx="120" ry="100" fill="#ff6b9d" />
                                    <ellipse cx="200" cy="220" rx="100" ry="80" fill="#ffb7c5" />

                                    {/* Eyes - Rest position is cx165 cy175 & cx245 cy175 (top-right corner of both eyes to match image) */}
                                    <g className="cat-eye" style={{ transformOrigin: '160px 180px' }}>
                                        <circle cx="160" cy="180" r="15" fill="#2d3748" />
                                        <g style={{
                                            transform: isMouseActive ? `translate(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px)` : 'translate(5px, -5px)',
                                            transition: 'transform 0.1s ease-out'
                                        }}>
                                            <circle cx="160" cy="180" r="5" fill="white" />
                                        </g>
                                    </g>
                                    <g className="cat-eye" style={{ transformOrigin: '240px 180px' }}>
                                        <circle cx="240" cy="180" r="15" fill="#2d3748" />
                                        <g style={{
                                            transform: isMouseActive ? `translate(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px)` : 'translate(5px, -5px)',
                                            transition: 'transform 0.1s ease-out'
                                        }}>
                                            <circle cx="240" cy="180" r="5" fill="white" />
                                        </g>
                                    </g>

                                    {/* Nose */}
                                    <path d="M190 210 L210 210 L200 225 Z" fill="#ff6b9d" />

                                    {/* Mouth */}
                                    <path d="M200 225 Q180 240 160 225" stroke="#2d3748" strokeWidth="3" fill="none" strokeLinecap="round" />
                                    <path d="M200 225 Q220 240 240 225" stroke="#2d3748" strokeWidth="3" fill="none" strokeLinecap="round" />

                                    {/* Whiskers */}
                                    <line x1="100" y1="200" x2="60" y2="190" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="100" y1="210" x2="55" y2="210" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="100" y1="220" x2="60" y2="230" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />

                                    <line x1="300" y1="200" x2="340" y2="190" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="300" y1="210" x2="345" y2="210" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="300" y1="220" x2="340" y2="230" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />

                                    {/* Blush */}
                                    <ellipse cx="130" cy="210" rx="20" ry="12" fill="#ff6b9d" opacity="0.4" />
                                    <ellipse cx="270" cy="210" rx="20" ry="12" fill="#ff6b9d" opacity="0.4" />

                                    {/* Paws holding flower */}
                                    <ellipse cx="150" cy="320" rx="25" ry="20" fill="#ff6b9d" />
                                    <ellipse cx="250" cy="320" rx="25" ry="20" fill="#ff6b9d" />

                                    {/* Sakura Flower */}
                                    <g transform="translate(200, 300) scale(0.8)">
                                        <circle cx="0" cy="-30" r="15" fill="#ffb7c5" />
                                        <circle cx="28" cy="-10" r="15" fill="#ffc0cb" />
                                        <circle cx="18" cy="24" r="15" fill="#ffb7c5" />
                                        <circle cx="-18" cy="24" r="15" fill="#ffc0cb" />
                                        <circle cx="-28" cy="-10" r="15" fill="#ffb7c5" />
                                        <circle cx="0" cy="0" r="10" fill="#ff6b9d" />
                                    </g>
                                </svg>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-lg float" style={{ animationDelay: '0.5s' }}>
                                <span className="text-2xl">🌸</span>
                            </div>
                            <div className="absolute top-1/2 -left-8 bg-white p-3 rounded-2xl shadow-lg float" style={{ animationDelay: '1s' }}>
                                <span className="text-2xl">💖</span>
                            </div>
                            <div className="absolute -bottom-4 right-1/4 bg-white p-3 rounded-2xl shadow-lg float" style={{ animationDelay: '1.5s' }}>
                                <span className="text-2xl">✨</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
