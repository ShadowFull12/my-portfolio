"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[100]"
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-2 left-0 right-0 z-[90] px-4 sm:px-8 flex items-center justify-between"
      >
        <div
          className={`w-full max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
            scrolled ? "glass border border-white/10 backdrop-blur-xl" : ""
          }`}
        >
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            className="text-white font-black text-lg tracking-tight hoverable"
          >
            AM<span className="text-accent">.</span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ color: "#fff" }}
                className="text-neutral-400 text-sm font-medium hover:text-white transition-colors hoverable"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="/Aritra_Mukherjee_CV.pdf"
            download="Aritra_Mukherjee_CV"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full glass border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors hoverable"
          >
            <Download size={13} className="text-accent" />
            Download CV
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1 hoverable"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-black text-neutral-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Aritra_Mukherjee_CV.pdf"
            download="Aritra_Mukherjee_CV"
            className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full glass border border-white/20 text-white font-medium"
          >
            <Download size={14} className="text-accent" />
            Download CV
          </a>
        </motion.div>
      )}
    </>
  );
}
