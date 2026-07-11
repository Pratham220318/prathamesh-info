"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: FaGithub, href: portfolioData.personalInfo.github, label: "GitHub" },
  { icon: FaLinkedin, href: portfolioData.personalInfo.linkedin, label: "LinkedIn" },
  { icon: FaEnvelope, href: `mailto:${portfolioData.personalInfo.email}`, label: "Email" },
  { icon: FaWhatsapp, href: portfolioData.personalInfo.whatsapp, label: "WhatsApp" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-12" style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Changed grid breakpoints to break horizontally into columns much sooner (sm breakpoint instead of md) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 items-start">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                PE
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  Prathamesh Ethiraj
                </div>
                <div className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                  Full Stack Developer
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Building enterprise-grade web applications and financial software that drive real business outcomes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="sm:pl-4">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-primary)" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-primary)" }}>
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                  style={{ color: "var(--text-secondary)", borderColor: "var(--border-color)", background: "var(--bg-card)" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                <span>📧</span> {portfolioData.personalInfo.email}
              </p>
              <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                <span>📍</span> {portfolioData.personalInfo.location}
              </p>
            </div>
          </div>

        </div> 

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            &copy; {year} Prathamesh Ethiraj. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Built using Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}