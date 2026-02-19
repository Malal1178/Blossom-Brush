import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ArtScrollGallery from "@/components/ArtScrollGallery";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[#FFB7C5]/30">
      <Hero />
      <ArtScrollGallery />
      <Footer />
    </main>
  );
}
