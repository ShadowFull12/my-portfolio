"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Download } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", link: "https://github.com/ShadowFull12" },
  { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/aritra-mukherjee-899562329/" },
  { icon: Twitter, label: "X (Twitter)", link: "https://x.com/ShadowFull12" },
  { icon: Mail, label: "Email", link: "mailto:mukherjeearitra1233@gmail.com" },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full overflow-hidden bg-black/60 backdrop-blur-2xl border-t border-white/10 z-10">
      
      {/* Main CTA */}
      <div className="py-24 px-6 text-center border-b border-white/5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 mb-4"
        >
          Aritra Mukherjee
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 text-lg max-w-md mx-auto mb-10"
        >
          Full Stack Developer · Creative Technologist · West Bengal, India
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="mailto:mukherjeearitra1233@gmail.com"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-accent hover:text-white transition-all duration-300 hoverable"
          >
            <Mail size={16} />
            Say Hello
          </a>
          <a
            href="/Aritra_Mukherjee_CV.pdf"
            download="Aritra_Mukherjee_CV"
            className="group flex items-center gap-2 px-8 py-4 rounded-full glass border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300 hoverable"
          >
            <Download size={16} className="text-accent" />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="py-8 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-600 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Aritra Mukherjee. Built with Next.js & Framer Motion.
        </p>

        <div className="flex items-center gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ y: -4 }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors hoverable"
            >
              <s.icon size={16} />
            </motion.a>
          ))}

          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -4 }}
            className="ml-2 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors hoverable"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
