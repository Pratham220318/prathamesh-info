import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans select-none transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
      {/* Dynamic Background Overlay */}
      <div className="fixed inset-0 grid-bg opacity-40 -z-50 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-dynamic -z-60 pointer-events-none transition-all duration-300" />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
