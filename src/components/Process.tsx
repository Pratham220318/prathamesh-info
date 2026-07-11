"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaComments, FaPencilRuler, FaCode, FaFlask, FaRocket, FaLifeRing
} from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, React.ReactNode> = {
  FaComments: <FaComments size={20} />,
  FaPencilRuler: <FaPencilRuler size={20} />,
  FaCode: <FaCode size={20} />,
  FaFlask: <FaFlask size={20} />,
  FaRocket: <FaRocket size={20} />,
  FaLifeRing: <FaLifeRing size={20} />,
};

export default function Process() {
  return (
    <section id="process" className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">How I Work</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Development Process
          </h2>
          <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
            A proven workflow that ensures transparent communication, clean delivery, and long-term support.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Process Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(to right, #06b6d4, #6366f1)" }}
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          >
            {portfolioData.process.map((step, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center"
                variants={{ hidden: { y: 25, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }}
              >
                {/* Icon circle */}
                <div
                  className="relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center border mb-4 z-10 glass-card"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="text-cyan-400">{iconMap[step.icon]}</div>
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xs font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Ready to start your project?
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm">
            <FaRocket size={13} /> Let&apos;s Build Together
          </a>
        </motion.div>

      </div>
    </section>
  );
}
