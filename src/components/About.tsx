"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaAward, FaCalendarAlt, FaCode, FaServer, FaDatabase, FaChartLine } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Cleaned up config to rely on fluid light/dark mode CSS variables & Tailwind values
const techPillars = [
  { label: "React & Next.js", icon: FaCode, color: "text-cyan-500 dark:text-cyan-400", bgClassName: "bg-cyan-500/[0.06] dark:bg-cyan-950/40 border-cyan-500/20 dark:border-cyan-800/30" },
  { label: "Node.js APIs", icon: FaServer, color: "text-indigo-500 dark:text-indigo-400", bgClassName: "bg-indigo-500/[0.06] dark:bg-indigo-950/40 border-indigo-500/20 dark:border-indigo-800/30" },
  { label: ".NET Core", icon: FaChartLine, color: "text-emerald-600 dark:text-emerald-400", bgClassName: "bg-emerald-500/[0.06] dark:bg-emerald-950/40 border-emerald-500/20 dark:border-emerald-800/30" },
  { label: "MySQL / PostgreSQL / MariaDB", icon: FaDatabase, color: "text-violet-500 dark:text-violet-400", bgClassName: "bg-violet-500/[0.06] dark:bg-violet-950/40 border-violet-500/20 dark:border-violet-800/30" },
];

// Terminal animated typing lines
const terminalLines = [
  { prefix: "$ ", text: "whoami", color: "text-cyan-400" },
  { prefix: "→ ", text: "Prathamesh Ethiraj — Full Stack Developer", color: "text-emerald-400" },
  { prefix: "$ ", text: "cat expertise.txt", color: "text-cyan-400" },
  { prefix: "→ ", text: "Financial software · Enterprise dashboards · AI Chatbots", color: "text-slate-300" },
  { prefix: "$ ", text: "cat experience.txt", color: "text-cyan-400" },
  { prefix: "→ ", text: "4+ years building scalable web applications", color: "text-slate-300" },
  { prefix: "$ ", text: "echo $stack", color: "text-cyan-400" },
  { prefix: "→ ", text: "React · Next.js · Node.js · .NET Core · SQL · AWS", color: "text-amber-400" },
  { prefix: "$ ", text: "cat status.txt", color: "text-cyan-400" },
  { prefix: "→ ", text: "✓ Available for freelance & full-time opportunities", color: "text-emerald-400" },
];

function TerminalTyper() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (cursorLine >= terminalLines.length) return;

    const currentLine = terminalLines[cursorLine];
    const fullText = currentLine.prefix + currentLine.text;

    if (charCount < fullText.length) {
      const t = setTimeout(() => setCharCount(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines(v => v + 1);
        setCursorLine(c => c + 1);
        setCharCount(0);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [started, charCount, cursorLine]);

  return (
    <div ref={ref} className="rounded-2xl border overflow-hidden shadow-2xl" style={{ borderColor: "var(--border-color)" }}>
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ background: "#0b0f19", borderColor: "rgba(255, 255, 255, 0.05)" }}>
        <span className="w-3 h-3 rounded-full bg-rose-500" />
        <span className="w-3 h-3 rounded-full bg-amber-500" />
        <span className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="text-[10px] font-mono ml-2 text-slate-400">
          prathamesh ~ bash
        </span>
      </div>

      {/* Terminal body (Always dark theme for ideal terminal aesthetic) */}
      <div className="p-5 font-mono text-xs space-y-1.5 min-h-[260px] bg-[#030712]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex gap-0">
            <span className={`${line.color} whitespace-pre`}>{line.prefix}</span>
            <span className="text-slate-300">{line.text}</span>
          </div>
        ))}

        {/* Currently typing line */}
        {cursorLine < terminalLines.length && (
          <div className="flex">
            <span className={`${terminalLines[cursorLine].color} whitespace-pre`}>
              {(terminalLines[cursorLine].prefix + terminalLines[cursorLine].text).slice(0, charCount)}
            </span>
            <span className="inline-block w-0.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5 mt-0.5" />
          </div>
        )}

        {/* Finished blinking prompt */}
        {cursorLine >= terminalLines.length && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-cyan-400">$</span>
            <span className="inline-block w-0.5 h-3.5 bg-cyan-400 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad relative w-full max-w-full overflow-x-hidden" style={{ background: "var(--bg-secondary)" }}>
      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3">About Me</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            The Developer Behind the Code
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* ── Left: Terminal + Tech Pillars ── */}
          <motion.div className="grid grid-cols-1 gap-5 lg:col-span-6 w-full" variants={fadeUp}>
            <TerminalTyper />

            {/* Tech Pillars Grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {techPillars.map((p, i) => (
                <motion.div
                  key={i}
                  className={`rounded-xl p-4 border flex items-center gap-3 cursor-default transition-all duration-300 ${p.bgClassName}`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <p.icon className={`text-lg flex-shrink-0 ${p.color}`} />
                  <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Bio + Stats + Education ── */}
          <motion.div className="grid grid-cols-1 gap-6 lg:col-span-6 w-full" variants={fadeUp}>
            {/* Bio */}
            <div className="glass-card rounded-2xl p-6 border w-full" style={{ borderColor: "var(--border-color)" }}>
              <h3 className="text-sm font-bold mb-3 text-cyan-500 dark:text-cyan-400 uppercase tracking-wider">My Story</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                {portfolioData.personalInfo.aboutMe}
              </p>
              <ul className="grid grid-cols-1 gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                {[
                  "4+ years building enterprise web applications",
                  "Financial platforms, e-commerce, education & AI chatbots",
                  "Full-stack from UI design to cloud deployment (AWS)",
                  "Databases: MySQL, PostgreSQL, MariaDB, SQL Server",
                  "Track record of migrating legacy systems to modern stacks",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {portfolioData.stats.about.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card rounded-2xl p-5 border text-center group glass-card-hover w-full"
                  style={{ borderColor: "var(--border-color)" }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education Timeline */}
            <div className="w-full">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <FaGraduationCap className="text-cyan-500 dark:text-cyan-400" />
                Academic Background
              </h3>
              <div className="space-y-4 w-full">
                {portfolioData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="pl-5 border-l-2 hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors group cursor-default w-full"
                    style={{ borderColor: "var(--border-color)" }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                      <h4 className="text-sm font-bold group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                        {edu.degree}
                      </h4>
                      <span className="text-[10px] font-mono flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <FaCalendarAlt size={8} /> {edu.duration}
                      </span>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                      {edu.institution}
                    </p>
                    <div className="flex justify-between items-center mt-1.5 flex-wrap gap-1">
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{edu.board}</span>
                      <span className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold font-mono border border-cyan-500/20 dark:border-cyan-800/60 bg-cyan-500/[0.05] dark:bg-cyan-950/30 px-2 py-0.5 rounded-full">
                        <FaAward size={8} /> {edu.score}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}