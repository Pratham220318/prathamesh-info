"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt,
  FaLinkedin, FaGithub, FaCheckCircle, FaSpinner, FaWhatsapp, FaExclamationTriangle
} from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

const budgetOptions = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Let's discuss",
];

const timelineOptions = [
  "Less than 1 week",
  "1 – 2 weeks",
  "2 – 4 weeks",
  "1 – 2 months",
  "2 – 3 months",
  "Ongoing / Flexible",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    timeline: "",
    projectDetails: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialise EmailJS once on mount
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (key) emailjs.init(key);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.projectDetails) {
      setErrorMsg("Please fill in your Name, Email, and Project Details.");
      return;
    }
    setErrorMsg(null);
    setStatus("loading");

    const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // ── EmailJS path ──────────────────────────────────────────────────
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name : formData.name,
            from_email: formData.email,
            budget    : formData.budget   || "Not specified",
            timeline  : formData.timeline || "Not specified",
            message   : formData.projectDetails,
            to_email  : portfolioData.personalInfo.email,
          }
        );
        setStatus("success");
        confetti({ particleCount: 90, spread: 65, origin: { y: 0.75 }, colors: ["#06b6d4", "#6366f1", "#10b981"] });
        setFormData({ name: "", email: "", budget: "", timeline: "", projectDetails: "" });
        return;
      } catch (err: unknown) {
        console.error("EmailJS error:", err);
        setStatus("error");
        setErrorMsg("Failed to send via EmailJS. Falling back to your mail app — please click Send when it opens.");
        // Small delay so user can read the error, then open mailto
        await new Promise(r => setTimeout(r, 1800));
        setStatus("idle");
      }
    }

    // ── Mailto fallback (when EmailJS not configured) ─────────────────
    const subject = encodeURIComponent(`Project Request from ${formData.name}`);
    const body = encodeURIComponent(
      [
        `Hi Prathamesh,`,
        ``,
        `I came across your portfolio and would like to discuss a project.`,
        ``,
        `──────────────────────────`,
        `👤  Name       : ${formData.name}`,
        `📧  Reply-To   : ${formData.email}`,
        `💰  Budget     : ${formData.budget  || "Not specified"}`,
        `🗓️  Timeline   : ${formData.timeline || "Not specified"}`,
        `──────────────────────────`,
        ``,
        `📋  Project Details:`,
        formData.projectDetails,
        ``,
        `──────────────────────────`,
        `Best regards,`,
        formData.name,
      ].join("\n")
    );

    window.location.href = `mailto:${portfolioData.personalInfo.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    confetti({ particleCount: 90, spread: 65, origin: { y: 0.75 }, colors: ["#06b6d4", "#6366f1", "#10b981"] });
    setFormData({ name: "", email: "", budget: "", timeline: "", projectDetails: "" });
  };

  const contactDetails = [
    { icon: FaEnvelope,    label: "Email",    value: portfolioData.personalInfo.email,                href: `mailto:${portfolioData.personalInfo.email}` },
    { icon: FaPhoneAlt,    label: "Phone",    value: `+91 ${portfolioData.personalInfo.phone}`,       href: `tel:${portfolioData.personalInfo.phone}` },
    { icon: FaWhatsapp,    label: "WhatsApp", value: "Chat on WhatsApp",                              href: portfolioData.personalInfo.whatsapp },
    { icon: FaGithub,      label: "GitHub",   value: "github.com/prathamesh-ethiraj",                 href: portfolioData.personalInfo.github },
    { icon: FaLinkedin,    label: "LinkedIn", value: "linkedin.com/in/prathamesh-ethiraj",            href: portfolioData.personalInfo.linkedin },
    { icon: FaMapMarkerAlt,label: "Location", value: portfolioData.personalInfo.location,             href: undefined },
  ];

  return (
    <section id="contact" className="section-pad relative" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Let&apos;s build something amazing together.
          </h2>
          <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
            Have a project in mind? Fill out the form and I&apos;ll get back to you within 24 hours.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">

          {/* ── Contact Info ── */}
          <div className="lg:col-span-5 space-y-4">
            {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
              <div key={i} className="glass-card rounded-xl p-4 border flex items-center gap-4"
                style={{ borderColor: "var(--border-color)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-cyan-400"
                  style={{ background: "var(--bg-secondary)" }}>
                  <Icon size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--text-muted)" }}>{label}</div>
                  {href ? (
                    <a href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-semibold hover:text-cyan-400 transition-colors truncate block"
                      style={{ color: "var(--text-primary)" }}>
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold truncate block" style={{ color: "var(--text-primary)" }}>
                      {value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* EmailJS setup note */}
            {/* <div className="rounded-xl p-4 border text-xs space-y-1.5"
              style={{ background: "var(--bg-card)", borderColor: "rgba(6,182,212,0.2)" }}>
              <p className="font-bold text-cyan-400 flex items-center gap-1.5">
                <FaEnvelope size={10} /> Email delivery
              </p>
              <p style={{ color: "var(--text-secondary)" }}>
                Add your <strong style={{ color: "var(--text-primary)" }}>EmailJS keys</strong> in{" "}
                <code className="font-mono text-[10px] px-1 py-0.5 rounded"
                  style={{ background: "var(--bg-secondary)" }}>.env.local</code>{" "}
                for direct background delivery to your Gmail — no mail app needed.
              </p>
            </div> */}
          </div>

          {/* ── Contact Form ── */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 border" style={{ borderColor: "var(--border-color)" }}>

              {/* Success State */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-3 py-10"
                >
                  <FaCheckCircle className="text-emerald-400 mx-auto text-5xl" />
                  <h4 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    Message Sent! 🎉
                  </h4>
                  <p className="text-xs max-w-xs mx-auto" style={{ color: "var(--text-secondary)" }}>
                    Your project request has been sent to Prathamesh. Expect a reply within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", budget: "", timeline: "", projectDetails: "" }); }}
                    className="mt-2 btn-secondary px-4 py-2 rounded-lg text-xs font-semibold border"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                    Tell me about your project
                  </h3>

                  {errorMsg && (
                    <div className="p-3 rounded-lg text-xs flex items-start gap-2 text-rose-400 border border-rose-800/60 bg-rose-950/30">
                      <FaExclamationTriangle className="mt-0.5 flex-shrink-0" size={11} />
                      {errorMsg}
                    </div>
                  )}

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Your Name *",  name: "name",  placeholder: "Rajesh Kumar",       type: "text"  },
                      { label: "Your Email *", name: "email", placeholder: "rajesh@company.com", type: "email" },
                    ].map(({ label, name, placeholder, type }) => (
                      <div key={name} className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={formData[name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="w-full px-3 py-2.5 rounded-lg text-xs border focus:outline-none focus:border-cyan-400 transition-colors"
                          style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Budget + Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Budget Range", name: "budget",   options: budgetOptions   },
                      { label: "Timeline",     name: "timeline", options: timelineOptions },
                    ].map(({ label, name, options }) => (
                      <div key={name} className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                          {label}
                        </label>
                        <select
                          name={name}
                          value={formData[name as keyof typeof formData]}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 rounded-lg text-xs border focus:outline-none focus:border-cyan-400 transition-colors"
                          style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                        >
                          <option value="">Select...</option>
                          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Project Details *
                    </label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="Describe what you want to build, the problem it solves, and any specific requirements..."
                      rows={5}
                      className="w-full px-3 py-2.5 rounded-lg text-xs border focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <><FaSpinner className="animate-spin" size={12} /> Sending...</>
                    ) : (
                      <><FaPaperPlane size={12} /> Send Project Request</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
