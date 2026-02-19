"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Flower, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoginModal } from "@/contexts/LoginModalContext";

export default function LoginModal() {
    const { data: session } = useSession();
    const { isOpen, closeLoginModal } = useLoginModal();
    const [view, setView] = useState<"login" | "signup" | "profile" | "dashboard">("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Reset view based on auth status
            if (session) {
                setView("profile");
            } else {
                setView("login");
            }
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (view === "signup") {
            // Mock Signup Logic
            console.log("Signing up with:", { name, email, password });
            setView("login"); // Switch to login after "signup"
            alert("Account created! Please log in."); // Temporary feedback
            return;
        }

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.refresh();
                // Session update will trigger useEffect to switch to "profile"
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    // Helper to determine role color
    const getRoleColor = (role?: string) => {
        return role === "admin" ? "bg-red-100 text-red-800 border-red-200" : "bg-green-100 text-green-800 border-green-200";
    };

    return (
        <AnimatePresence
            onExitComplete={() => {
                setView("login");
                setName("");
                setEmail("");
                setPassword("");
                setError("");
            }}
        >
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLoginModal}
                        className="absolute inset-0 bg-black/30 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-[#FDFBF7] p-8 rounded-3xl border-4 border-[#E8DCC4] shadow-[8px_8px_0px_#E8DCC4] w-full max-w-md m-4 z-10"
                    >
                        <button
                            onClick={closeLoginModal}
                            className="absolute top-4 right-4 text-[#5D4037] hover:text-[#FFB7C5] transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* DASHBOARD VIEW */}
                        {view === "dashboard" && session && (
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-[#5D4037] mb-6">
                                    {(session.user as any)?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
                                </h1>

                                <div className="bg-white p-6 rounded-2xl border-2 border-[#E8DCC4] mb-6">
                                    <div className="flex justify-center mb-4">
                                        {session.user?.image ? (
                                            <img src={session.user.image} alt="User" className="w-20 h-20 rounded-full border-4 border-[#FFB7C5]" />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-[#FFB7C5] flex items-center justify-center border-4 border-[#5D4037]">
                                                <span className="text-3xl text-white font-bold">{session.user?.name?.[0] || "U"}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xl font-bold text-[#5D4037] mb-2">{session.user?.name}</p>
                                    <div className={`inline-block px-3 py-1 rounded-lg border ${getRoleColor((session.user as any)?.role)} mb-4`}>
                                        <span className="font-bold uppercase text-xs tracking-wider">{(session.user as any)?.role || "User"}</span>
                                    </div>
                                    <p className="text-[#8B5A2B]">
                                        {(session.user as any)?.role === "admin"
                                            ? "You have full access to manage the garden settings and users."
                                            : "Enjoy your personal art collection and saved favorites."}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setView("profile")}
                                    className="text-[#8B5A2B] hover:text-[#5D4037] font-bold underline decoration-2 decoration-[#FFB7C5]/50 hover:decoration-[#FFB7C5]"
                                >
                                    Back to Profile
                                </button>
                            </div>
                        )}

                        {/* PROFILE VIEW */}
                        {view === "profile" && session && (
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt="User" className="w-24 h-24 rounded-full border-4 border-[#FFB7C5]" />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-[#FFB7C5] flex items-center justify-center border-4 border-[#5D4037]">
                                            <span className="text-4xl text-white font-bold">{session.user?.name?.[0] || "U"}</span>
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-3xl font-bold text-[#5D4037] mb-2">{session.user?.name}</h2>
                                <p className="text-[#8B5A2B] mb-6">{session.user?.email}</p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setView("dashboard")}
                                        className="w-full py-3 rounded-full bg-[#E8DCC4] border-2 border-[#5D4037] text-[#5D4037] font-bold text-lg hover:bg-[#d8cbb3] transition-colors"
                                    >
                                        Open Dashboard
                                    </button>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full py-3 rounded-full bg-red-100 border-2 border-red-200 text-red-800 font-bold text-lg hover:bg-red-200 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* LOGIN / SIGNUP VIEW */}
                        {(view === "login" || view === "signup") && !session && (
                            <>
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-[#FFB7C5] flex items-center justify-center border-2 border-[#5D4037]">
                                        <Flower size={32} className="text-white" />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-[#5D4037] text-center mb-2">
                                    {view === "login" ? "Welcome Back" : "Join the Garden"}
                                </h1>
                                <p className="text-[#8B5A2B] text-center mb-8">
                                    {view === "login" ? "Enter your details to access your garden." : "Create an account to start your collection."}
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {view === "signup" && (
                                        <div>
                                            <label className="block text-[#5D4037] font-bold mb-2">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]"
                                                placeholder="Your Name"
                                                required
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-[#5D4037] font-bold mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]"
                                            placeholder="admin@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#5D4037] font-bold mb-2">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}

                                    <button
                                        type="submit"
                                        className="w-full py-3 rounded-full bg-[#FFB7C5] border-2 border-[#5D4037] text-[#5D4037] font-bold text-lg shadow-[4px_4px_0px_#5D4037] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#5D4037] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                                    >
                                        {view === "login" ? "Sign In" : "Create Account"}
                                    </button>
                                </form>

                                <div className="mt-4 flex flex-col items-center gap-4">
                                    <div className="flex items-center w-full gap-2">
                                        <div className="h-px bg-[#E8DCC4] flex-1" />
                                        <span className="text-[#8B5A2B] text-sm font-medium">OR</span>
                                        <div className="h-px bg-[#E8DCC4] flex-1" />
                                    </div>

                                    <button
                                        onClick={() => signIn("google")}
                                        className="w-full py-3 rounded-full bg-white border-2 border-[#E8DCC4] text-[#5D4037] font-bold text-lg hover:border-[#FFB7C5] transition-all flex items-center justify-center gap-2"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() => setView(view === "login" ? "signup" : "login")}
                                        className="text-[#8B5A2B] hover:text-[#5D4037] text-sm font-bold"
                                    >
                                        {view === "login" ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
