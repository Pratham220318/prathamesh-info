"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExternalLinkAlt, FaGlobe } from "react-icons/fa";
import { portfolioData, Project } from "@/data/portfolioData";

type TabKey = "overview" | "case-study" | "demo";

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<TabKey>("overview");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "case-study", label: "Case Study" },
    { key: "demo", label: "Live Demo" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 px-6 pt-5 pb-4 border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 mb-1">
                Case Study
              </p>
              <h3 className="text-xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                {project.title}
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                {project.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 mt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)", color: "white" }}
                >
                  <FaGlobe size={10} /> Live Site
                </a>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-cyan-400"
                style={{ color: "var(--text-secondary)", background: "var(--bg-card)" }}
              >
                <FaTimes size={13} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: tab === t.key ? "linear-gradient(135deg, #06b6d4, #6366f1)" : "var(--bg-card)",
                  color: tab === t.key ? "white" : "var(--text-secondary)",
                  border: tab !== t.key ? `1px solid var(--border-color)` : "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <div className="space-y-6">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.fullDetails}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m, i) => (
                  <div key={i} className="rounded-xl p-3 text-center border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                    <div className="text-lg font-extrabold gradient-text">{m.value}</div>
                    <div className="text-[10px] font-semibold mt-0.5" style={{ color: "var(--text-secondary)" }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 flex-shrink-0 mt-1.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-mono border"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CASE STUDY TAB */}
          {tab === "case-study" && (
            <div className="space-y-6">
              {[
                { label: "🔴 The Problem", content: project.caseStudy.problem, borderColor: "border-rose-500/30" },
                { label: "✅ The Solution", content: project.caseStudy.solution, borderColor: "border-cyan-500/30" },
                { label: "🏆 The Outcome", content: project.caseStudy.outcome, borderColor: "border-emerald-500/30" },
              ].map(({ label, content, borderColor }) => (
                <div key={label} className={`rounded-xl p-5 border-l-2 ${borderColor}`} style={{ background: "var(--bg-card)" }}>
                  <h4 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>{label}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{content}</p>
                </div>
              ))}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  Technical Architecture
                </h4>
                <ul className="space-y-2">
                  {project.caseStudy.architecture.map((a, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0 mt-1.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* DEMO TAB */}
          {tab === "demo" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Project preview — {project.title}
                </p>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-800/40 bg-emerald-500/[0.06] dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                  Live
                </span>
              </div>

              {/* Mock Browser Frame */}
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-color)" }}>
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <div className="flex-1 mx-3 px-3 py-1 rounded-md text-[10px] font-mono" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
                    app.prathamesh.dev/{project.id}
                  </div>
                </div>

                {/* Mock UI */}
                <div className="p-4 space-y-3 min-h-[200px]" style={{ background: "rgba(3,7,18,0.5)" }}>
                  {/* Simulated dashboard layout */}
                  <div className="grid grid-cols-3 gap-2">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="rounded-lg p-3 border text-center" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                        <div className="text-sm font-extrabold gradient-text">{m.value}</div>
                        <div className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg p-3 border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                    <div className="h-2 rounded-full mb-2 bg-gradient-to-r from-cyan-500 to-indigo-500" style={{ width: "75%" }} />
                    <div className="h-1.5 rounded-full mb-2" style={{ background: "var(--border-color)", width: "60%" }} />
                    <div className="h-1.5 rounded-full" style={{ background: "var(--border-color)", width: "45%" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Module A", "Module B"].map((label, i) => (
                      <div key={i} className="rounded-lg p-2.5 border flex items-center gap-2" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                        <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 flex-shrink-0" />
                        <span className="text-[10px] font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-center" style={{ color: "var(--text-muted)" }}>
                Full demo available upon request ·{" "}
                <a href="#contact" className="text-cyan-500 dark:text-cyan-400 underline underline-offset-2">Contact me</a>
              </p>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-pad relative" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Featured Projects
          </h2>
          <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
            Enterprise applications built to solve real business challenges at scale.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          {portfolioData.projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="glass-card rounded-2xl border overflow-hidden group cursor-pointer"
              style={{ borderColor: "var(--border-color)" }}
              variants={{ hidden: { y: 25, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }}
              whileHover={{ y: -5, borderColor: "rgba(6,182,212,0.35)" }}
              onClick={() => setSelectedProject(proj)}
            >
              {/* Project Header */}
              <div
                className="p-6 flex justify-between items-start border-b"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 mb-1">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-extrabold mb-1 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {proj.title}
                  </h3>
                  <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    {proj.subtitle}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)" }}>
                  <FaExternalLinkAlt size={12} className="text-white" />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {proj.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {proj.metrics.map((m, i) => (
                    <div key={i} className="rounded-lg p-2 text-center border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                      <div className="text-sm font-extrabold gradient-text">{m.value}</div>
                      <div className="text-[9px] font-semibold mt-0.5" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono border"
                      style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="pt-3 border-t flex justify-between items-center flex-wrap gap-2"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <span className="text-[11px] font-bold text-cyan-400 group-hover:underline">
                    View Case Study →
                  </span>
                  <div className="flex items-center gap-2">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-700/40 text-cyan-400 bg-cyan-950/20 hover:bg-cyan-400 hover:text-white transition-all"
                      >
                        <FaGlobe size={8} /> Live
                      </a>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-700/40 text-emerald-400 bg-emerald-950/20">
                      + Demo
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}