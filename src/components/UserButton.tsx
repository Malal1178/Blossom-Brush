"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useLoginModal } from "@/contexts/LoginModalContext";
import { signOut } from "next-auth/react";

export default function UserButton() {
    const { data: session } = useSession();
    const { openLoginModal } = useLoginModal();

    if (session) {
        return (
            <button
                onClick={openLoginModal}
                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#5D4037] transition-colors"
                title="Profile"
            >
                <span className="sr-only">Profile</span>
                {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full rounded-full object-cover" />
                ) : (
                    <User className="w-5 h-5" />
                )}
            </button>
        );
    }

    return (
        <button
            onClick={openLoginModal}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#5D4037] transition-colors"
        >
            <span className="sr-only">Login</span>
            <User className="w-5 h-5" />
        </button>
    );
}
