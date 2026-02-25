"use client";
import React, { useState } from 'react';

const LocationPicker = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Your location details
    const lat = 35.6895;
    const lng = 139.6917;
    const address = "123 Sakura Lane, Tokyo";
    const label = encodeURIComponent("My Art Studio");

    const mapApps = [
        {
            name: 'Google Maps',
            icon: '📍',
            url: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
            color: 'hover:bg-blue-50'
        },
        {
            name: 'Waze',
            icon: '🚙',
            url: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
            color: 'hover:bg-cyan-50'
        },
        {
            name: 'Apple Maps',
            icon: '🍎',
            url: `maps://?q=${label}&ll=${lat},${lng}`,
            color: 'hover:bg-slate-50'
        }
    ];

    return (
        <div className="relative inline-block">
            {/* The Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn-paw bg-white text-pink-500 border-2 border-pink-300 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-pink-50 transition-all flex items-center gap-2"
            >
                <span>Get Directions</span>
                <span className="text-2xl">🌸</span>
            </button>

            {/* The WhatsApp-style Choice Menu */}
            {isOpen && (
                <>
                    {/* Invisible backdrop to close menu when clicking away */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                    <div className="absolute bottom-full mb-4 left-0 w-64 bg-white rounded-3xl shadow-2xl border border-pink-50 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="p-4 border-b border-slate-50">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Open with...</p>
                        </div>

                        {mapApps.map((app) => (
                            <a
                                key={app.name}
                                href={app.name === 'Apple Maps' && typeof navigator !== 'undefined' && !/iPhone|iPad/i.test(navigator.userAgent) ? mapApps[0].url : app.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center gap-3 p-4 transition-colors ${app.color} text-slate-700 font-medium hover:text-pink-600`}
                            >
                                <span className="text-xl">{app.icon}</span>
                                {app.name}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LocationPicker;
