"use client";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactUs() {
    return (
        <main className="min-h-screen selection:bg-[#FFB7C5]/30 bg-[#FDFBF7]">

            <section className="pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1
                        className="text-5xl md:text-7xl font-bold text-[#FDFBF7] mb-6 tracking-wide drop-shadow-md"
                        style={{
                            WebkitTextStroke: "3px #5D4037",
                            textShadow: "4px 4px 0px #5D4037"
                        }}
                    >
                        Get in Touch
                    </h1>
                    <p className="text-xl text-[#5D4037] font-medium max-w-2xl mx-auto leading-relaxed">
                        We'd love to hear from you! Whether you have a question about a piece, want to collaborate, or just want to say hello.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-8 rounded-3xl border-2 border-[#E8DCC4] shadow-sm">
                            <h2 className="text-2xl font-bold text-[#5D4037] mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <ContactItem icon={<Mail />} label="Email Us" value="hello@blossomandbrush.com" />
                                <ContactItem icon={<Phone />} label="Call Us" value="+1 (555) 123-4567" />
                                <ContactItem icon={<MapPin />} label="Visit Us" value="123 Art Garden lane, Creativity City" />
                            </div>
                        </div>

                        <div className="bg-[#FFB7C5]/20 p-8 rounded-3xl border-2 border-[#FFB7C5] text-[#5D4037]">
                            <h3 className="font-bold text-lg mb-2">Visit Our Gallery</h3>
                            <p>Open daily from 10:00 AM to 6:00 PM.</p>
                            <p className="mt-2 text-sm italic">Come for the art, stay for the tea!</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white p-8 md:p-10 rounded-3xl border-4 border-[#E8DCC4] shadow-[8px_8px_0px_#E8DCC4]"
                    >
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-[#5D4037] font-bold mb-2">Name</label>
                                <input type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]" placeholder="Your name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-[#5D4037] font-bold mb-2">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-[#5D4037] font-bold mb-2">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 rounded-xl bg-[#FFB7C5] border-2 border-[#5D4037] text-[#5D4037] font-bold text-lg shadow-[4px_4px_0px_#5D4037] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#5D4037] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

            </section>

            <Footer />
        </main>
    );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border-2 border-[#E8DCC4] flex items-center justify-center text-[#FFB7C5]">
                {icon}
            </div>
            <div>
                <p className="text-sm text-[#8B5A2B] font-bold">{label}</p>
                <p className="text-[#5D4037] font-medium">{value}</p>
            </div>
        </div>
    )
}
