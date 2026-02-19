"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
    const { isCartOpen, toggleCart, cart, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl z-[70] border-l border-[#E8DCC4] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-[#E8DCC4]">
                            <h2 className="text-2xl font-bold text-[#5D4037] flex items-center gap-2">
                                <ShoppingBag className="text-[#FFB7C5]" />
                                Your Collection
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-[#FDFBF7] rounded-full transition-colors text-[#5D4037]"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[#8D6E63] opacity-60">
                                    <ShoppingBag size={64} />
                                    <p className="text-xl font-medium">Your cart is empty</p>
                                    <p className="text-sm">Start exploring the gallery to collect art!</p>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <motion.div
                                        key={`${item.id}-${index}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#E8DCC4] items-center"
                                    >
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center text-3xl">
                                            {item.image && (item.image.startsWith('/') || item.image.startsWith('data:')) ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span>{item.image || "🎨"}</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[#5D4037] text-lg leading-tight">{item.name}</h3>
                                            {item.price && (
                                                <p className="text-[#8D6E63] font-medium">${item.price}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-[#E8DCC4] bg-[#FDFBF7]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[#8D6E63] font-bold text-lg">Total</span>
                                    <span className="text-[#5D4037] font-bold text-2xl">${totalPrice}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        toggleCart();
                                        router.push("/checkout");
                                    }}
                                    className="w-full py-4 bg-[#FFB7C5] text-[#5D4037] font-bold rounded-xl shadow-lg hover:bg-[#5D4037] hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full mt-3 py-2 text-sm text-red-500 font-medium hover:underline"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
