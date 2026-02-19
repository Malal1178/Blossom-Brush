import React from 'react';
import Footer from '@/components/Footer';
import ArtGalleryGrid from '@/components/ArtGalleryGrid';

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-[#FDFBF7]">
            <div className="pt-8">
                <div className="container mx-auto px-4 mb-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-4">Art Gallery</h1>
                    <p className="text-[#8D6E63] text-lg max-w-2xl mx-auto">
                        Explore our collection of beautiful artworks.
                    </p>
                </div>
                <ArtGalleryGrid />
            </div>
            <Footer />
        </main>
    );
}
