"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the form submission (e.g., send via API)
        alert("Thank you for your message! We will get back to you shortly.");
    };

    const handleWhatsApp = () => {
        // Build the WhatsApp message
        const text = `Hi! I'm interested in placing an order. Name: ${formData.name}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/1234567890?text=${encodedText}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-sans pt-24 pb-12 px-4 flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <Link href="/" className="inline-flex items-center text-[#8D6E63] hover:text-[#5D4037] transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                    Back to Gallery
                </Link>

                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-[#E8DCC4]">
                    <h1 className="text-4xl font-bold mb-2 text-[#5D4037]">Checkout & Inquiry</h1>
                    <p className="text-[#8D6E63] mb-8 text-lg">
                        Complete the form below to finalize your order or ask about a specific piece.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-[#FDFBF7] border border-[#E8DCC4] rounded-xl px-4 py-3 text-[#5D4037] placeholder-[#8D6E63]/50 focus:outline-none focus:border-[#FFB7C5] focus:ring-2 focus:ring-[#FFB7C5]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                    className="w-full bg-[#FDFBF7] border border-[#E8DCC4] rounded-xl px-4 py-3 text-[#5D4037] placeholder-[#8D6E63]/50 focus:outline-none focus:border-[#FFB7C5] focus:ring-2 focus:ring-[#FFB7C5]/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-bold ml-1">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Order Inquiry for [Artwork Name]"
                                required
                                className="w-full bg-[#FDFBF7] border border-[#E8DCC4] rounded-xl px-4 py-3 text-[#5D4037] placeholder-[#8D6E63]/50 focus:outline-none focus:border-[#FFB7C5] focus:ring-2 focus:ring-[#FFB7C5]/20 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-bold ml-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about any specific requirements or questions..."
                                rows={5}
                                required
                                className="w-full bg-[#FDFBF7] border border-[#E8DCC4] rounded-xl px-4 py-3 text-[#5D4037] placeholder-[#8D6E63]/50 focus:outline-none focus:border-[#FFB7C5] focus:ring-2 focus:ring-[#FFB7C5]/20 transition-all resize-none"
                            />
                        </div>

                        <div className="pt-4 space-y-4">
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#FFB7C5] text-[#5D4037] font-bold text-lg rounded-xl shadow-lg hover:bg-[#5D4037] hover:text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Send Message
                            </button>

                            <button
                                type="button"
                                onClick={handleWhatsApp}
                                className="w-full py-4 bg-[#1F2937] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-black transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={20} className="text-[#25D366]" />
                                Prefer WhatsApp? Start chat
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
