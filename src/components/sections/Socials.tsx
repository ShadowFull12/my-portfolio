"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";

const socials = [
  { name: "GitHub", handle: "@ShadowFull12", icon: Github, url: "https://github.com/ShadowFull12", color: "hover:bg-neutral-800" },
  { name: "LinkedIn", handle: "Aritra Mukherjee", icon: Linkedin, url: "https://www.linkedin.com/in/aritra-mukherjee-899562329/", color: "hover:bg-blue-600" },
  { name: "X (Twitter)", handle: "@ShadowFull12", icon: Twitter, url: "https://x.com/ShadowFull12", color: "hover:bg-neutral-900" },
  { name: "Email", handle: "mukherjeearitra1233@gmail", icon: Mail, url: "mailto:mukherjeearitra1233@gmail.com", color: "hover:bg-red-500" },
];

export function Socials() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves the marquee horizontally based on vertical scroll
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section ref={containerRef} className="py-20 w-full overflow-hidden border-t border-white/5 bg-[#030303] relative" id="socials">
      <div className="text-center mb-12">
        <p className="text-accent text-[10px] font-black tracking-widest uppercase mb-1">Connect</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Find Me Online</h2>
      </div>

      <div className="flex flex-col gap-6 w-full rotate-[-2deg] scale-[1.05] relative z-10">
        {/* Row 1 moving left */}
        <motion.div style={{ x: xLeft }} className="flex gap-6 w-[200vw] whitespace-nowrap">
          {[...socials, ...socials, ...socials].map((link, idx) => (
            <a
              key={`r1-${idx}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-4 px-8 py-5 rounded-full glass border border-white/10 transition-colors duration-300 min-w-[max-content] hoverable group ${link.color}`}
            >
              <link.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{link.name}</span>
                <span className="text-lg font-black">{link.handle}</span>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Row 2 moving right (reversed order for visual variety) */}
        <motion.div style={{ x: xRight }} className="flex gap-6 w-[200vw] whitespace-nowrap justify-end">
          {[...socials].reverse().concat([...socials].reverse(), [...socials].reverse()).map((link, idx) => (
            <a
              key={`r2-${idx}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-4 px-8 py-5 rounded-full glass border border-white/10 transition-colors duration-300 min-w-[max-content] hoverable group ${link.color}`}
            >
              <link.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{link.name}</span>
                <span className="text-lg font-black">{link.handle}</span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
      
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vh] bg-blue-600/10 rounded-[100%] blur-[100px] pointer-events-none" />
    </section>
  );
}
