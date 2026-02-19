import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#5D4037] pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center text-[#8D6E63]">Terms of Service</h1>

                <div className="bg-white/50 p-8 rounded-2xl shadow-sm border border-[#E7E5E4]/50 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#8D6E63]">1. Acceptance of Terms</h2>
                        <p className="text-stone-600 leading-relaxed">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#8D6E63]">2. Use License</h2>
                        <p className="text-stone-600 leading-relaxed">
                            Permission is granted to temporarily view the materials (information or software) on Blossom & Brush's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-stone-600 ml-4 space-y-1">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on Blossom & Brush's website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#8D6E63]">3. Disclaimer</h2>
                        <p className="text-stone-600 leading-relaxed">
                            The materials on Blossom & Brush's website are provided "as is". Blossom & Brush makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#8D6E63]">4. Limitations</h2>
                        <p className="text-stone-600 leading-relaxed">
                            In no event shall Blossom & Brush or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Blossom & Brush's Internet site, even if Blossom & Brush or a Blossom & Brush authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#8D6E63]">5. Revisions and Errata</h2>
                        <p className="text-stone-600 leading-relaxed">
                            The materials appearing on Blossom & Brush's website could include technical, typographical, or photographic errors. Blossom & Brush does not warrant that any of the materials on its website are accurate, complete, or current. Blossom & Brush may make changes to the materials contained on its website at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#8D6E63]">6. Site Terms of Use Modifications</h2>
                        <p className="text-stone-600 leading-relaxed">
                            Blossom & Brush may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
