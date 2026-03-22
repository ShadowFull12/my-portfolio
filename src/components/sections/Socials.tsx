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
  // We duplicate enough to absolutely span any monitor width effortlessly.
  const duplicatedSocials = [...socials, ...socials, ...socials, ...socials, ...socials, ...socials];
  const reversedSocials = [...duplicatedSocials].reverse();

  return (
    <section className="py-20 w-full overflow-hidden border-t border-white/5 bg-[#030303] relative" id="socials">
      <div className="text-center mb-12">
        <p className="text-accent text-[10px] font-black tracking-widest uppercase mb-1">Connect</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Find Me Online</h2>
      </div>

      <div className="flex flex-col gap-6 w-full rotate-[-2deg] scale-[1.05] relative z-10 py-6">
        {/* Row 1 moving left */}
        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
             {/* We render two identical halves. -50% translation shifts exactly one half out of view seamlessly */}
            {[...duplicatedSocials, ...duplicatedSocials].map((link, idx) => (
              <a
                key={`r1-${idx}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-4 px-8 py-5 rounded-full glass border border-white/10 transition-colors duration-300 min-w-max hoverable group ${link.color}`}
              >
                <link.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{link.name}</span>
                  <span className="text-lg font-black">{link.handle}</span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Row 2 moving right */}
        <div className="flex w-full overflow-hidden whitespace-nowrap justify-end">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...reversedSocials, ...reversedSocials].map((link, idx) => (
              <a
                key={`r2-${idx}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-4 px-8 py-5 rounded-full glass border border-white/10 transition-colors duration-300 min-w-max hoverable group ${link.color}`}
              >
                <link.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{link.name}</span>
                  <span className="text-lg font-black">{link.handle}</span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vh] bg-blue-600/10 rounded-[100%] blur-[100px] pointer-events-none" />
    </section>
  );
}
