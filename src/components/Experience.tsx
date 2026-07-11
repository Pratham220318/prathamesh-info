"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt, FaMapMarkerAlt, FaCode, FaMobileAlt,
  FaChevronDown, FaChevronUp, FaCheckCircle
} from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const roleIcons: Record<string, React.ReactNode> = {
  "Software Developer": <FaCode className="text-cyan-400" size={18} />,
  "React Native Developer": <FaMobileAlt className="text-indigo-400" size={18} />,
};

const roleColors = ["from-cyan-500 to-indigo-500", "from-indigo-500 to-violet-500"];
const dotColors = ["bg-cyan-400", "bg-indigo-400"];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      {/* Decorative blurs */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Career History</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Work Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">

          {/* Vertical line */}
          <div
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
            style={{ background: "linear-gradient(to bottom, #06b6d4, #6366f1, transparent)" }}
          />

          <div className="space-y-12">
            {portfolioData.experience.map((job, idx) => {
              const isOpen = expandedIndex === idx;
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row gap-6 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-6 z-10 hidden sm:flex flex-col items-center">
                    <motion.div
                      className={`w-5 h-5 rounded-full border-2 border-[var(--bg-primary)] shadow-lg ${dotColors[idx % dotColors.length]}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.15 + 0.2, type: "spring" }}
                    />
                  </div>

                  {/* Date Badge (opposing side) */}
                  <div
                    className={`hidden sm:flex sm:w-1/2 items-start pt-4 ${isLeft ? "justify-end pr-10" : "justify-start pl-10"}`}
                  >
                    <motion.div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold border"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.1 }}
                    >
                      <FaCalendarAlt size={9} className="text-cyan-400" />
                      {job.duration}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`sm:w-1/2 ${isLeft ? "sm:pl-10" : "sm:pr-10"}`}>
                    <motion.div
                      className="glass-card rounded-2xl border overflow-hidden cursor-pointer"
                      style={{ borderColor: isOpen ? "rgba(6,182,212,0.4)" : "var(--border-color)" }}
                      whileHover={{ borderColor: "rgba(6,182,212,0.3)" }}
                      layout
                    >
                      {/* Card Header */}
                      <button
                        onClick={() => setExpandedIndex(isOpen ? null : idx)}
                        className="w-full text-left p-5 focus:outline-none"
                      >
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColors[idx % roleColors.length]} flex items-center justify-center flex-shrink-0 shadow-lg`}
                          >
                            {roleIcons[job.role] ?? <FaCode className="text-white" size={16} />}
                          </div>
                          <span style={{ color: "var(--text-muted)" }} className="flex-shrink-0 mt-1">
                            {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                            {job.company}
                          </span>
                          <h3 className="text-base font-extrabold mb-1" style={{ color: "var(--text-primary)" }}>
                            {job.role}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-[10px]" style={{ color: "var(--text-secondary)" }}>
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt size={8} className="text-cyan-400" /> {job.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt size={8} className="text-indigo-400" /> Mumbai, India
                            </span>
                          </div>
                        </div>

                        <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {job.description}
                        </p>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 space-y-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                              {/* Key Achievements */}
                              <div className="pt-4">
                                <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                                  Key Achievements
                                </p>
                                <ul className="space-y-2.5">
                                  {job.highlights.map((h, i) => (
                                    <li key={i} className="flex gap-2.5 items-start text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                      <FaCheckCircle size={11} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                                      {h}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Technologies */}
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                                  Technologies
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {job.tech.map((t, i) => (
                                    <span
                                      key={i}
                                      className="px-2.5 py-1 rounded-md text-[10px] font-mono border"
                                      style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline End Marker */}
          <motion.div
            className="hidden sm:flex flex-col items-center mt-10 ml-6 sm:ml-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/30" />
            <p className="text-[10px] font-bold mt-2 text-cyan-400 uppercase tracking-widest">Present</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
