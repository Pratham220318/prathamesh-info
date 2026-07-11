"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaDownload, FaChevronDown } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";
import Image from "next/image";

// Animated typing title hook
function useAnimatedTitle(titles: string[], interval = 2800) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = titles[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), interval);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setIndex((prev) => (prev + 1) % titles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index, titles, interval]);

  return displayed;
}

// Floating tech badge component
function TechBadge({ label, className = "", delay = 0 }: { label: string; className?: string; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute px-3 py-1.5 rounded-full text-[11px] font-bold border backdrop-blur-sm shadow-lg ${className}`}
      style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
    >
      {label}
    </motion.div>
  );
}

const socialLinks = [
  { href: portfolioData.personalInfo.github, icon: FaGithub, label: "GitHub", hoverClass: "hover:text-cyan-400" },
  { href: portfolioData.personalInfo.linkedin, icon: FaLinkedin, label: "LinkedIn", hoverClass: "hover:text-cyan-400" },
  { href: `mailto:${portfolioData.personalInfo.email}`, icon: FaEnvelope, label: "Email", hoverClass: "hover:text-cyan-400" },
  { href: portfolioData.personalInfo.whatsapp, icon: FaWhatsapp, label: "WhatsApp", hoverClass: "hover:text-green-400" },
];

export default function Hero() {
  const animatedTitle = useAnimatedTitle(portfolioData.personalInfo.animatedTitles);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 grid-bg overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* ── LEFT: Text ── */}
        <motion.div
          className="lg:col-span-6 xl:col-span-7 space-y-7 text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Availability Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "#06b6d4" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Open to Work — Available for Freelance & Full-time
          </div>

          {/* Name */}
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
              👋 Hello, I&apos;m
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
              Prathamesh
              <br />
              <span className="gradient-text">Ethiraj</span>
            </h1>
          </div>

          {/* Animated Title */}
          <div className="h-10 flex items-center">
            <p className="text-xl sm:text-2xl font-bold" style={{ color: "var(--text-secondary)" }}>
              {animatedTitle}
              <span className="inline-block w-0.5 h-6 ml-1 bg-cyan-400 animate-pulse align-middle" />
            </p>
          </div>

          {/* Tagline */}
          <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
            {portfolioData.personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#contact" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
              Hire Me
            </a>
            <a href="#projects" className="btn-secondary px-6 py-3 rounded-xl text-sm font-bold border">
              View Projects
            </a>
            <a
              href={portfolioData.personalInfo.resumeUrl}
              download
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border transition-all hover:border-cyan-400 hover:text-cyan-400"
              style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
            >
              <FaDownload size={12} />
              Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Connect
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  title={label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border ${hoverClass}`}
                  style={{ color: "var(--text-secondary)", background: "var(--bg-card)", borderColor: "var(--border-color)" }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {portfolioData.stats.hero.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border text-center"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
              >
                <div className="text-xl font-extrabold gradient-text">{stat.value}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Illustration ── */}
        <motion.div
          className="lg:col-span-6 xl:col-span-5 relative flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* Illustration card */}
          <div
            className="relative w-full max-w-md rounded-3xl overflow-hidden border shadow-2xl"
            style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
          >
            <Image
              src="/developer-avatar.jpg"
              alt="Developer workspace illustration"
              width={600}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>

          {/* Floating Tech Badges */}
          <TechBadge label="⚛️ React.js" className="top-4 -left-6" delay={0} />
          <TechBadge label="▲ Next.js" className="bottom-20 -left-8" delay={0.8} />
          <TechBadge label="🟢 Node.js" className="top-12 -right-6" delay={1.5} />
          <TechBadge label="🔷 .NET Core" className="bottom-8 -right-4" delay={2.2} />

          {/* Floating Live Indicator */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold shadow-xl"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Building production-grade software
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <FaChevronDown size={12} style={{ color: "var(--text-muted)" }} />
      </motion.div>
    </section>
  );
}
