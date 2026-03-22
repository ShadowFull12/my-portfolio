"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "FistFirst-Learn",
    description:
      "AR-based learning platform using MediaPipe hand tracking + physics simulation. Gesture-controlled, webcam-powered, and highly experimental.",
    tech: ["MediaPipe", "Canvas API", "Physics.js", "AI"],
    color: "from-violet-600/35 to-blue-700/20",
    accent: "#818cf8",
    number: "01",
    github: "https://github.com/ShadowFull12/FistFirst-Learn",
  },
  {
    title: "Cardix",
    description:
      "Premium digital business card platform with glassmorphism UI, QR-based profile sharing, and Firebase backend.",
    tech: ["React.js", "Next.js", "Tailwind CSS", "QR API"],
    color: "from-blue-600/35 to-cyan-500/20",
    accent: "#38bdf8",
    number: "02",
    github: "https://github.com/ShadowFull12/cardix",
  },
  {
    title: "Civic Connect",
    description:
      "Full-stack civic engagement platform with real-time data, Firebase auth, SEO routing, and modular architecture.",
    tech: ["Next.js", "React", "Firebase", "Node.js"],
    color: "from-emerald-600/35 to-teal-500/20",
    accent: "#34d399",
    number: "03",
    github: "https://github.com/ShadowFull12/Civic-Connect",
  },
  {
    title: "Cashible",
    description:
      "Conversion-focused financial landing page with smooth animations and performance optimization.",
    tech: ["Next.js", "Tailwind CSS"],
    color: "from-orange-500/35 to-red-500/20",
    accent: "#fb923c",
    number: "04",
    github: "https://github.com/ShadowFull12/Cashible",
  },
];

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Reduced height for less gap — 350vh gives good scrolling without excessive empty space
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}vw`]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [20, 0]);

  return (
    <section ref={targetRef} className="relative h-[350vh] w-full" id="projects">
      <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center overflow-hidden">

        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="absolute top-14 left-6 md:left-16 z-20">
          <p className="text-accent text-[10px] font-black tracking-widest uppercase mb-1">Featured Projects</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Selected Works</h2>
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          style={{ x, width: `${projects.length * 100}vw` }}
          className="flex gap-5 px-6 md:px-16 pt-36 pb-8 h-[78vh] items-center"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative shrink-0 w-[88vw] md:w-[56vw] lg:w-[45vw] h-full rounded-3xl overflow-hidden glass group border"
              style={{ borderColor: `${project.accent}22` }}
            >
              {/* Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
              />
              {/* Shimmer line on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(105deg, transparent 40%, ${project.accent}15 50%, transparent 60%)`,
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              </div>

              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-6xl font-black opacity-[0.07] leading-none">{project.number}</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-full glass border flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hoverable"
                      style={{ borderColor: `${project.accent}50` }}
                    >
                      <ArrowUpRight size={18} style={{ color: project.accent }} />
                    </a>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">{project.title}</h3>
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-sm">{project.description}</p>
                </div>

                <div>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-[11px] font-bold border"
                        style={{ borderColor: `${project.accent}40`, color: project.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold opacity-50 hover:opacity-100 transition-opacity hoverable"
                    style={{ color: project.accent }}
                  >
                    <Github size={13} /> View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hints */}
        <motion.div style={{ opacity: headerOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-neutral-600 text-xs">
          <span>←</span>
          <span className="tracking-widest uppercase text-[10px]">Scroll to explore</span>
          <span>→</span>
        </motion.div>
      </div>

      {/* Shimmer animation */}
      <style>{`@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
    </section>
  );
}
