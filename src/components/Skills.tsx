"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const categoryIcons: Record<string, React.ReactNode> = {
  FaCode: <FaCode className="text-cyan-400" />,
  FaServer: <FaServer className="text-indigo-400" />,
  FaDatabase: <FaDatabase className="text-emerald-400" />,
  FaTools: <FaTools className="text-violet-400" />,
};

// Extended tech list with emoji icons for the marquee
const marqueeItems = [
  { name: "React.js", emoji: "⚛️" },
  { name: "Next.js", emoji: "▲" },
  { name: "Node.js", emoji: "🟢" },
  { name: "TypeScript", emoji: "🔷" },
  { name: ".NET Core", emoji: "🟣" },
  { name: "Redux", emoji: "🔴" },
  { name: "Tailwind CSS", emoji: "🎨" },
  { name: "Express.js", emoji: "⚡" },
  { name: "REST APIs", emoji: "🔗" },
  { name: "MySQL", emoji: "🗄️" },
  { name: "SQL Server", emoji: "💾" },
  { name: "AWS EC2/S3", emoji: "☁️" },
  { name: "Git & GitHub", emoji: "🐙" },
  { name: "Postman", emoji: "📮" },
  { name: "React Native", emoji: "📱" },
  { name: "Framer Motion", emoji: "✨" },
  { name: "Context API", emoji: "🔄" },
  { name: "Electron.js", emoji: "⚛️" },
  { name: "VS Code", emoji: "💻" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "MariaDB", emoji: "🦭" },
  { name: "AI Chatbot", emoji: "🤖" },
  { name: "E-Commerce", emoji: "🛒" },
  { name: "LMS / Education", emoji: "🎓" },
];

function Marquee({ items, reverse = false }: { items: typeof marqueeItems; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-4 flex-shrink-0"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap text-xs font-semibold flex-shrink-0 cursor-default"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <span className="text-base">{item.emoji}</span>
            {item.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Animated skill bar
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-1.5 group">
      <div className="flex justify-between text-[11px]">
        <span className="font-semibold group-hover:text-cyan-400 transition-colors" style={{ color: "var(--text-secondary)" }}>
          {name}
        </span>
        <span className="font-mono font-bold" style={{ color: "var(--text-muted)" }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-color)" }}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      {/* Decorative */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Technical Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Skills &amp; Core Competencies
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Skills Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {portfolioData.skills.map((cat, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-2xl p-5 border glass-card-hover"
              style={{ borderColor: "var(--border-color)" }}
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--bg-secondary)" }}>
                  {categoryIcons[cat.icon]}
                </div>
                <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {cat.category}
                </h3>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar key={si} name={skill.name} level={skill.level} delay={si * 0.08} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Tech Marquee */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-center mb-6" style={{ color: "var(--text-muted)" }}>
            Full tech toolbox
          </p>
          <Marquee items={marqueeItems} />
          <div className="mt-2">
            <Marquee items={[...marqueeItems].reverse()} reverse />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
