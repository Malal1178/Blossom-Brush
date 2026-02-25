"use client";

import React from 'react';

export default function Newsletter() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="glass rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl -ml-32 -mt-32"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-300/30 rounded-full blur-3xl -mr-32 -mb-32"></div>

                    <div className="relative z-10">
                        <div className="text-5xl mb-4">💌</div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-pink-800 mb-4">Join Our Paw-sitive Newsletter!</h2>
                        <p className="text-pink-700/80 mb-8 max-w-lg mx-auto">Get weekly doses of cuteness, cat care tips, and exclusive sakura-themed wallpapers delivered to your inbox!</p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Welcome to the paw-ty! 🐾'); }}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white/80 backdrop-blur-sm text-pink-800 placeholder-pink-300"
                                required
                            />
                            <button type="submit" className="btn-paw bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl whitespace-nowrap">
                                Subscribe 🐾
                            </button>
                        </form>

                        <p className="text-pink-600/60 text-sm mt-4">No spam, only purrs! Unsubscribe anytime.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
