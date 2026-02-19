import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-[#5D4037] mb-8">User Dashboard</h1>
                <div className="bg-white p-8 rounded-3xl border-4 border-[#E8DCC4] shadow-sm">
                    <p className="text-xl mb-4">Welcome, {session?.user?.name}!</p>
                    <div className="p-4 bg-green-100 text-green-800 rounded-xl border border-green-200">
                        <span className="font-bold">Role:</span> {(session?.user as any)?.role}
                    </div>
                    <p className="mt-4 text-[#8B5A2B]">Enjoy your personal art collection.</p>
                </div>
            </div>
        </div>
    )
}
