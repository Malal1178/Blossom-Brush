"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Flower } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl border-4 border-[#E8DCC4] shadow-[8px_8px_0px_#E8DCC4] w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#FFB7C5] flex items-center justify-center border-2 border-[#5D4037]">
                        <Flower size={32} className="text-white" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-[#5D4037] text-center mb-2">Welcome Back</h1>
                <p className="text-[#8B5A2B] text-center mb-8">Enter your details to access your garden.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[#5D4037] font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]"
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
                            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border-2 border-[#E8DCC4] focus:border-[#FFB7C5] outline-none transition-colors text-[#5D4037]"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-[#FFB7C5] border-2 border-[#5D4037] text-[#5D4037] font-bold text-lg shadow-[4px_4px_0px_#5D4037] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#5D4037] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-[#8B5A2B] hover:text-[#5D4037] text-sm font-bold">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
