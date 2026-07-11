"use client";

import React, { useState, useEffect } from "react";
import { FaLinkedin, FaEnvelope, FaBars, FaTimes, FaMoon, FaSun, FaWhatsapp, FaGithub } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.href.substring(1));
          }
        }
      }

      // Update scroll progress bar
      const scrollProgress = document.getElementById("scroll-progress");
      if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div id="scroll-progress" style={{ width: "0%" }} />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b py-3"
            : "py-5"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--bg-navbar)" : "transparent",
          borderColor: scrolled ? "var(--border-color)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-lg group-hover:shadow-cyan-500/40 transition-all">
              PE
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                Prathamesh Ethiraj
              </div>
              <div className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>
                Full Stack Developer
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold transition-colors hover:text-cyan-400"
                style={{
                  color: activeSection === item.href.substring(1) ? "#06b6d4" : "var(--text-secondary)",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Social Quick Links */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={portfolioData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-cyan-400"
                style={{ color: "var(--text-secondary)", background: "var(--bg-card)" }}
                title="GitHub"
              >
                <FaGithub size={14} />
              </a>
              <a
                href={portfolioData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-cyan-400"
                style={{ color: "var(--text-secondary)", background: "var(--bg-card)" }}
                title="LinkedIn"
              >
                <FaLinkedin size={14} />
              </a>
              <a
                href={portfolioData.personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-green-400"
                style={{ color: "var(--text-secondary)", background: "var(--bg-card)" }}
                title="WhatsApp"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-cyan-400"
              style={{ color: "var(--text-secondary)", background: "var(--bg-card)" }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <FaSun size={13} /> : <FaMoon size={13} />}
            </button>

            {/* Hire Me CTA */}
            <a
              href="#contact"
              className="hidden sm:flex btn-primary items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
            >
              Hire Me
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ color: "var(--text-secondary)", background: "var(--bg-card)" }}
            >
              {mobileMenuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-72 z-40 p-6 transform transition-transform duration-300 lg:hidden border-l`}
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex flex-col gap-6 mt-16">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold transition-colors"
              style={{ color: activeSection === item.href.substring(1) ? "#06b6d4" : "var(--text-secondary)" }}
            >
              {item.label}
            </a>
          ))}
          <div className="h-px" style={{ background: "var(--border-color)" }} />
          <div className="flex gap-3">
            <a href={portfolioData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan-400" style={{ color: "var(--text-secondary)" }}><FaGithub size={18} /></a>
            <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan-400" style={{ color: "var(--text-secondary)" }}><FaLinkedin size={18} /></a>
            <a href={portfolioData.personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-green-400" style={{ color: "var(--text-secondary)" }}><FaWhatsapp size={18} /></a>
            <a href={`mailto:${portfolioData.personalInfo.email}`} className="transition-colors hover:text-cyan-400" style={{ color: "var(--text-secondary)" }}><FaEnvelope size={18} /></a>
          </div>
          <a href="#contact" className="btn-primary text-center py-2.5 rounded-xl text-sm font-bold">
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
