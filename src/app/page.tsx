import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ArtScrollGallery from "@/components/ArtScrollGallery";
import SakuraBackground from "@/components/SakuraBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-pink-300/30">
      <SakuraBackground />
      <Hero />
      <ArtScrollGallery />
      <Footer />
    </main>
  );
}
