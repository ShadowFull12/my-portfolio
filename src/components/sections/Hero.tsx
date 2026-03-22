"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import Image from "next/image";

const ROLES = [
  "AI/ML Engineer",
  "Web Developer",
  "Full Stack Developer",
  "Software Engineer",
  "Database Manager",
  "CS Student",
  "Tech Enthusiast",
  "Problem Solver",
  "Open Source Contributor",
  "UI/UX Explorer",
  "Cloud Learner",
  "Creative Coder",
];

import { AnimatePresence } from "framer-motion";

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden h-7 md:h-8 relative w-[250px]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-accent font-bold text-base md:text-lg tracking-wide absolute left-0"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function WavyUnderline({ isHovered }: { isHovered: boolean }) {
  return (
    <div 
      className="absolute -bottom-2 md:-bottom-4 left-0 w-[100%] h-4 md:h-8 overflow-hidden pointer-events-none z-0 transition-opacity duration-300"
      style={{ opacity: isHovered ? 1 : 0 }}
    >
      <motion.svg
        className="w-[200%] h-full"
        preserveAspectRatio="none"
        viewBox="0 0 200 100"
        fill="none"
        animate={isHovered ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M 0 50 Q 12.5 -30, 25 50 T 50 50 T 75 50 T 100 50 T 125 50 T 150 50 T 175 50 T 200 50"
          stroke="url(#wavy-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          style={{ filter: "blur(6px)" }}
          opacity="0.6"
        />
        <path
          d="M 0 50 Q 12.5 -30, 25 50 T 50 50 T 75 50 T 100 50 T 125 50 T 150 50 T 175 50 T 200 50"
          stroke="url(#wavy-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="wavy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

function AnimatedName() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  const firstName = "Aritra";
  const lastName = "Mukherjee";

  return (
    <div 
      ref={ref} 
      className="relative overflow-visible cursor-crosshair group flex flex-col items-start" 
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First name container */}
      <div className="relative inline-block w-fit">
        <div className="flex flex-wrap relative z-10" style={{ lineHeight: 0.88 }}>
          {firstName.split("").map((char, i) => (
            <motion.span
              key={`f-${i}`}
              initial={{ y: 72, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", willChange: "transform, opacity" }}
              className="text-[15vw] sm:text-[12vw] md:text-[9vw] lg:text-[8vw] font-black tracking-[-0.04em] text-white transition-colors duration-500 group-hover:text-blue-200 transform-gpu"
            >
              {char}
            </motion.span>
          ))}
        </div>
        <WavyUnderline isHovered={isHovered} />
      </div>

      {/* Last name container */}
      <div className="relative inline-block w-fit mt-2">
        <div className="flex flex-wrap relative z-10" style={{ lineHeight: 0.88 }}>
          {lastName.split("").map((char, i) => (
            <motion.span
              key={`l-${i}`}
              initial={{ y: 72, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.78, delay: 0.48 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", willChange: "transform, opacity" }}
              className="text-[15vw] sm:text-[12vw] md:text-[9vw] lg:text-[8vw] font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 transition-all duration-500 group-hover:from-blue-300 group-hover:to-purple-400 transform-gpu"
            >
              {char}
            </motion.span>
          ))}
        </div>
        <WavyUnderline isHovered={isHovered} />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-5 md:px-14 overflow-hidden pt-20">
      {/* Perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(50deg) scale(2)",
          transformOrigin: "center 70%",
        }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left text column */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 [box-shadow:0_0_8px_2px_rgba(74,222,128,0.4)] animate-pulse" />
          <span className="text-neutral-500 text-xs font-medium tracking-wide">
            Kolkata, India · B.Tech CS (AI/ML)
          </span>
        </motion.div>

        {/* Giant two-line animated name */}
        <AnimatedName />

        {/* Role cycler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex items-center gap-3 mt-5 mb-4"
        >
          <div className="h-px w-8 bg-accent hidden md:block" />
          <RoleCycler />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="text-sm md:text-base text-neutral-400 max-w-md leading-relaxed mb-8"
        >
          Building AR, immersive UIs, and web experiences that feel like cinema — one commit at a time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-4"
        >
          <a
            href="https://github.com/ShadowFull12"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-1 sm:flex-none items-center justify-center gap-2 px-7 py-3.5 rounded-full dark-glass border border-white/10 text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hoverable shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="/Aritra_Mukherjee_CV.pdf"
            download="Aritra_Mukherjee_CV"
            className="group flex flex-1 sm:flex-none items-center justify-center gap-2 px-7 py-3.5 rounded-full glass border border-white/15 text-white font-medium text-sm hover:bg-white/10 transition-all duration-300 hoverable"
          >
            <Download className="w-4 h-4 text-accent" />
            Download CV
          </a>
        </motion.div>
        
        {/* Close Left text column */}
        </div>

        {/* Right Side: 3D Animated Profile Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-[30px] lg:rounded-[40px] overflow-visible perspective-[1000px] flex-shrink-0 mt-10 md:mt-0"
        >
          {/* Animated Glow Behind Image */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[30px] lg:rounded-[40px] blur-2xl z-0" 
          />
          
          {/* The Actual 3D Floater Component */}
          <motion.div 
            animate={{ 
              y: [-15, 15, -15],
              rotateX: [4, -4, 4],
              rotateY: [-6, 6, -6]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative z-10 rounded-[30px] lg:rounded-[40px] overflow-hidden border-[2px] border-white/10 glass shadow-2xl"
          >
            <Image 
              src="/profile.jpeg" 
              alt="Aritra Mukherjee" 
              fill
              className="object-cover object-center scale-[1.03]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll mouse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-700">Scroll</span>
      </motion.div>
    </section>
  );
}
