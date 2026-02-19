"use client";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Flower, Heart, Palette } from "lucide-react";

export default function AboutUs() {
    return (
        <main className="min-h-screen selection:bg-[#FFB7C5]/30 bg-[#FDFBF7]">

            <section className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
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
                        Our Story
                    </h1>
                    <p className="text-xl text-[#5D4037] font-medium max-w-2xl mx-auto leading-relaxed">
                        Welcome to <span className="text-[#FFB7C5] font-bold">Blossom & Brush</span>, a whimsical garden where art blooms.
                        We believe that every stroke of a brush is like planting a seed—with love and creativity, it grows into something beautiful.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <FeatureCard
                        icon={<Flower className="w-8 h-8 text-[#FFB7C5]" />}
                        title="Curated with Love"
                        description="Every piece in our gallery is hand-picked for its warmth, charm, and unique story."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Palette className="w-8 h-8 text-[#98FB98]" />}
                        title="Supporting Artists"
                        description="We provide a nurturing soil for independent artists to showcase their talent and grow."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={<Heart className="w-8 h-8 text-[#FFB7C5]" />}
                        title="Community First"
                        description="Join a friendly community of art lovers who believe in kindness and creativity."
                        delay={0.6}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border-4 border-[#E8DCC4] rounded-3xl p-8 md:p-12 text-center shadow-[8px_8px_0px_#E8DCC4]"
                >
                    <h2 className="text-3xl font-bold text-[#5D4037] mb-4">Join Our Garden</h2>
                    <p className="text-[#8B5A2B] mb-8">Whether you're an artist or an admirer, there's a place for you here.</p>
                    <button className="px-8 py-3 rounded-full bg-[#FFB7C5] border-2 border-[#5D4037] text-[#5D4037] font-bold text-lg shadow-[4px_4px_0px_#5D4037] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#5D4037] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                        Contact Us Today
                    </button>
                </motion.div>

            </section>

            <Footer />
        </main>
    );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className="bg-white/50 p-8 rounded-2xl border-2 border-[#E8DCC4] text-center hover:bg-white hover:border-[#FFB7C5] transition-colors"
        >
            <div className="bg-[#FDFBF7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#E8DCC4]">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-[#5D4037] mb-2">{title}</h3>
            <p className="text-[#8B5A2B]">{description}</p>
        </motion.div>
    )
}
