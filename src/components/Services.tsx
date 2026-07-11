"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaLaptopCode, FaRegChartBar, FaBriefcase,
  FaChartLine, FaServer, FaBolt, FaShoppingCart,
  FaRobot, FaGraduationCap
} from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, React.ReactNode> = {
  FaLaptopCode:  <FaLaptopCode  size={22} className="text-cyan-400"   />,
  FaRegChartBar: <FaRegChartBar size={22} className="text-indigo-400" />,
  FaBriefcase:   <FaBriefcase   size={22} className="text-emerald-400"/>,
  FaChartLine:   <FaChartLine   size={22} className="text-violet-400" />,
  FaServer:      <FaServer      size={22} className="text-amber-400"  />,
  FaBolt:        <FaBolt        size={22} className="text-rose-400"   />,
  FaShoppingCart:<FaShoppingCart size={22} className="text-pink-400"  />,
  FaRobot:       <FaRobot       size={22} className="text-teal-400"   />,
  FaGraduationCap:<FaGraduationCap size={22} className="text-yellow-400"/>,
};

export default function Services() {
  return (
    <section id="services" className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">What I Offer</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Services
          </h2>
          <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
            From financial platforms to e-commerce stores, AI chatbots, and education tools — I cover every layer of your project.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          {portfolioData.services.map((srv, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-2xl p-6 border glass-card-hover flex flex-col text-left"
              style={{ borderColor: "var(--border-color)" }}
              variants={{
                hidden: { y: 25, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--bg-secondary)" }}
              >
                {iconMap[srv.icon] ?? <FaLaptopCode size={22} className="text-cyan-400" />}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                {srv.title}
              </h3>
              <p className="text-xs leading-relaxed flex-grow" style={{ color: "var(--text-secondary)" }}>
                {srv.description}
              </p>
              <div
                className="mt-5 pt-4 border-t text-[11px] font-bold text-cyan-400 uppercase tracking-wider"
                style={{ borderColor: "var(--border-color)" }}
              >
                Get a quote →
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
