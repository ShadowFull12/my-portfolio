"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Globe, Github, Hand, Wallet } from "lucide-react";

const spotlightProjects = [
  {
    title: "FistFirst-Learn",
    badge: "Feature Project",
    color: "violet",
    icon: Hand,
    description:
      "An augmented-reality learning platform that turns your webcam into an interactive input device. Using MediaPipe hand tracking and a custom physics simulation engine, learners can literally reach through the screen and interact with content using gesture-based controls.",
    bullets: [
      "MediaPipe landmark detection",
      "Custom Canvas physics engine",
      "Webcam gesture recognition",
      "Experimental UI paradigms",
    ],
    github: "https://github.com/ShadowFull12/FistFirst-Learn",
    visualLabel: "Hand Landmark Detection Active",
  },
  {
    title: "Cashible",
    badge: "Feature Project",
    color: "orange",
    icon: Wallet,
    description:
      "Cashible is a finance web app focused on practical money workflows with a polished interface and production-ready user experience. This is the actual app repository and live deployed product.",
    bullets: [
      "Full app repository on GitHub",
      "Live production domain: cashible.tech",
      "Next.js App Router architecture",
      "Responsive fintech UI components",
    ],
    github: "https://github.com/ShadowFull12/Cashible-App",
    live: "https://cashible.tech",
    visualLabel: "Live Cashible Product Experience",
  },
];

const colorMap = {
  violet: {
    ringBorder: "border-violet-500/30",
    ringBg: "bg-violet-500/10",
    text: "text-violet-400",
    button: "bg-violet-600 hover:bg-violet-500",
    border: "border-violet-500/20",
    visualGradient: "from-violet-900/50 to-black/80",
    pulseBorder: "border-violet-400/40",
    iconText: "text-violet-300",
    glow: "drop-shadow-[0_0_30px_rgba(167,139,250,0.6)]",
    dot: "bg-violet-400",
    scan: "via-violet-400",
  },
  orange: {
    ringBorder: "border-orange-500/30",
    ringBg: "bg-orange-500/10",
    text: "text-orange-400",
    button: "bg-orange-600 hover:bg-orange-500",
    border: "border-orange-500/20",
    visualGradient: "from-orange-900/50 to-black/80",
    pulseBorder: "border-orange-400/40",
    iconText: "text-orange-300",
    glow: "drop-shadow-[0_0_30px_rgba(251,146,60,0.6)]",
    dot: "bg-orange-400",
    scan: "via-orange-400",
  },
} as const;

export function FeatureSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % spotlightProjects.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const project = spotlightProjects[activeIndex];
  const Icon = project.icon;
  const palette = colorMap[project.color as keyof typeof colorMap];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-6 overflow-hidden z-10"
    >
      {/* Large bg word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black uppercase text-white/[0.02] tracking-widest">
          {project.title === "Cashible" ? "FIN" : "AR"}
        </span>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Text side */}
        <motion.div style={{ y: yText, opacity }} className="flex flex-col z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-full border ${palette.ringBorder} ${palette.ringBg} ${palette.text}`}>
              <Icon size={22} />
            </div>
            <span className={`tracking-widest uppercase text-sm font-bold ${palette.text}`}>{project.badge}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ x: 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{project.title}</h2>

              <p className="text-xl text-neutral-400 mb-6 leading-relaxed">{project.description}</p>

              <ul className="text-neutral-500 text-sm space-y-2 mb-10">
                {project.bullets.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${palette.dot}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 flex-wrap mb-8">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`group inline-flex items-center gap-2 px-7 py-3.5 rounded-full ${palette.button} text-white font-bold transition-colors w-fit hoverable`}
                >
                  <Github size={18} />
                  View on GitHub
                </a>

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-colors hoverable"
                  >
                    <Globe size={16} />
                    Open cashible.tech
                  </a>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            {spotlightProjects.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show ${item.title}`}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: activeIndex === idx ? 28 : 10,
                  backgroundColor:
                    activeIndex === idx
                      ? item.color === "orange"
                        ? "#fb923c"
                        : "#a78bfa"
                      : "rgba(255,255,255,0.24)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Visual side */}
        <motion.div
          style={{ scale, opacity }}
          className={`relative h-[55vh] w-full glass rounded-3xl overflow-hidden flex items-center justify-center group border ${palette.border}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${palette.visualGradient} z-0`} />

          {/* Pulse rings */}
          {[0, 0.5, 1].map((delay) => (
            <motion.div
              key={delay}
              animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeOut" }}
              className={`absolute w-28 h-28 rounded-full border ${palette.pulseBorder}`}
            />
          ))}

          {/* Center Hand icon */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Icon className={`w-20 h-20 ${palette.iconText} ${palette.glow}`} />
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
              className={`absolute w-2 h-2 rounded-full ${palette.dot}`}
              style={{ top: dot.top, left: dot.left }}
            />
          ))}

          {/* Scan Bar */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`h-full w-1/3 bg-gradient-to-r from-transparent ${palette.scan} to-transparent`}
              />
            </div>
            <p className="text-[10px] text-neutral-500 mt-2 text-center tracking-widest uppercase">
              {project.visualLabel}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
