"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hand, Github } from "lucide-react";

export function FeatureSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-6 overflow-hidden z-10"
    >
      {/* Large bg word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black uppercase text-white/[0.02] tracking-widest">
          AR
        </span>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Text side */}
        <motion.div style={{ y: yText, opacity }} className="flex flex-col z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400">
              <Hand size={22} />
            </div>
            <span className="tracking-widest uppercase text-sm font-bold text-violet-400">
              Feature Project
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            FistFirst&#8209;Learn
          </h2>

          <p className="text-xl text-neutral-400 mb-6 leading-relaxed">
            An{" "}
            <span className="text-white font-semibold">augmented-reality</span>{" "}
            learning platform that turns your webcam into an interactive input device. Using{" "}
            <span className="text-violet-400 font-semibold">MediaPipe hand tracking</span>{" "}
            and a custom physics simulation engine, learners can literally reach through the
            screen and interact with content using gesture-based controls.
          </p>

          <ul className="text-neutral-500 text-sm space-y-2 mb-10">
            {["MediaPipe landmark detection", "Custom Canvas physics engine", "Webcam gesture recognition", "Experimental UI paradigms"].map(f => (
              <li key={f} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="https://github.com/ShadowFull12/FistFirst-Learn"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors w-fit hoverable"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </motion.div>

        {/* Visual side */}
        <motion.div
          style={{ scale, opacity }}
          className="relative h-[55vh] w-full glass rounded-3xl overflow-hidden flex items-center justify-center group border border-violet-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-black/80 z-0" />

          {/* Pulse rings */}
          {[0, 0.5, 1].map((delay) => (
            <motion.div
              key={delay}
              animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeOut" }}
              className="absolute w-28 h-28 rounded-full border border-violet-400/40"
            />
          ))}

          {/* Center Hand icon */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Hand className="w-20 h-20 text-violet-300 drop-shadow-[0_0_30px_rgba(167,139,250,0.6)]" />
          </motion.div>

          {/* Landmark dots (simulating MediaPipe) */}
          {[
            { top: "30%", left: "45%", delay: 0 },
            { top: "38%", left: "48%", delay: 0.2 },
            { top: "45%", left: "44%", delay: 0.4 },
            { top: "47%", left: "52%", delay: 0.1 },
            { top: "34%", left: "54%", delay: 0.3 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: dot.delay }}
              className="absolute w-2 h-2 rounded-full bg-violet-400"
              style={{ top: dot.top, left: dot.left }}
            />
          ))}

          {/* Scan Bar */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
              />
            </div>
            <p className="text-[10px] text-neutral-500 mt-2 text-center tracking-widest uppercase">
              Hand Landmark Detection Active
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
