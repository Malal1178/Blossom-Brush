import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ArtScrollGallery from "@/components/ArtScrollGallery";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-pink-300/30">
      <Hero />
      <ArtScrollGallery />
      <Footer />
    </main>
  );
}
