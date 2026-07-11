"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaCode, FaClock, FaComments, FaLayerGroup, FaBriefcase,
  FaStar, FaQuoteLeft
} from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, React.ReactNode> = {
  FaCode: <FaCode size={22} />,
  FaClock: <FaClock size={22} />,
  FaComments: <FaComments size={22} />,
  FaLayerGroup: <FaLayerGroup size={22} />,
  FaBriefcase: <FaBriefcase size={22} />,
};

// Updated colors to dynamically handle light and dark mode contrasts cleanly
const iconColors = [
  "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40",
  "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40",
  "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40",
  "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/40",
  "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40",
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-pad relative w-full max-w-full overflow-x-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Decorative blurs - reduced opacity in light mode to prevent looking dirty */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/[0.02] dark:bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-600/[0.02] dark:bg-indigo-600/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">Work Ethic</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Why Work With Me?
          </h2>
          <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            Beyond technical skills, here&apos;s what sets my working style apart and why clients keep coming back.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Why Work With Me Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-20 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {portfolioData.whyWorkWithMe.map((item, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-2xl p-6 border glass-card-hover flex flex-col items-center text-center group w-full"
              style={{ borderColor: "var(--border-color)" }}
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border ${iconColors[idx]}`}
              >
                {iconMap[item.icon] ?? <FaCode size={22} />}
              </div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                {item.title}
              </h3>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Header */}
        <motion.div
          className="text-center mb-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">What They Say</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Client Testimonials
          </h3>
          <div className="w-10 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          {portfolioData.testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-2xl p-6 border glass-card-hover relative overflow-hidden w-full"
              style={{ borderColor: "var(--border-color)" }}
              variants={{ hidden: { y: 25, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } } }}
            >
              {/* Decorative quote mark */}
              <FaQuoteLeft
                size={48}
                className="absolute top-4 right-4 opacity-5 dark:opacity-10"
                style={{ color: "var(--primary)" }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} size={13} className="text-amber-500 dark:text-amber-400" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{t.feedback}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ background: idx === 0 ? "linear-gradient(135deg,#06b6d4,#6366f1)" : "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
                >
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{t.name}</div>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                    {t.role} · <span className="text-cyan-600 dark:text-cyan-400 font-medium">{t.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* More coming banner */}
        <motion.div
          className="mt-10 text-center p-5 rounded-2xl border max-w-lg mx-auto w-full"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            More testimonials coming soon ·{" "}
            <a href="#contact" className="text-cyan-600 dark:text-cyan-400 underline underline-offset-2 font-medium">
              Contact me for references
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}