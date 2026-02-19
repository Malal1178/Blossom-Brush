import React, { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import Footer from '@/components/Footer';

export default function SearchPage() {
    return (
        <main className="min-h-screen bg-[#FDFBF7] flex flex-col">
            <div className="pt-24 flex-grow">
                <Suspense fallback={<div className="text-center py-20 text-[#5D4037]">Loading search results...</div>}>
                    <SearchResults />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}
