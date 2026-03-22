"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend Core",
    desc: "Building intuitive interfaces with component-driven architecture.",
    color: "blue",
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "HTML5", "CSS3", "Framer Motion"],
  },
  {
    category: "Backend & Systems",
    desc: "Structuring data, ensuring real-time capabilities, and scalability.",
    color: "emerald",
    skills: ["Node.js", "Express.js", "Firebase", "REST APIs", "SQL", "MongoDB"],
  },
  {
    category: "Creative Technology",
    desc: "Bridging logic and art for immersive digital experiences.",
    color: "orange",
    skills: ["Canvas API", "MediaPipe", "Physics.js", "Three.js", "GSAP", "WebGL Concepts"],
  },
  {
    category: "Languages & Concepts",
    desc: "The foundations of scalable and robust software design.",
    color: "purple",
    skills: ["JavaScript", "Python", "C", "C++", "Data Structures", "Algorithms", "OOP"],
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  blue: { border: "border-blue-500/30", bg: "from-blue-500/10", text: "text-blue-300" },
  emerald: { border: "border-emerald-500/30", bg: "from-emerald-500/10", text: "text-emerald-300" },
  orange: { border: "border-orange-500/30", bg: "from-orange-500/10", text: "text-orange-300" },
  purple: { border: "border-purple-500/30", bg: "from-purple-500/10", text: "text-purple-300" },
};

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // 300vh for 4 items gives nice comfortable scroll length
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(skillGroups.length - 1) * 100}vw`]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full border-t border-white/5" id="skills">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#030303]">
        
        {/* Static Header tracking scroll progress slightly */}
        <motion.div style={{ opacity: headerOpacity }} className="absolute top-20 left-6 md:left-16 z-20">
          <p className="text-accent text-[10px] font-black tracking-widest uppercase mb-1">My Arsenal</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Tech Stack</h2>
        </motion.div>

        {/* The horizontal track */}
        <motion.div
          style={{ x, width: `${skillGroups.length * 100}vw` }}
          className="flex h-[60vh] md:h-[50vh] mt-10 md:mt-0 items-center pl-6 md:pl-16 pr-[20vw]"
        >
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="w-[90vw] md:w-[60vw] lg:w-[45vw] shrink-0 pr-8 md:pr-16"
            >
              <div
                className={`w-full h-full rounded-3xl p-8 md:p-12 glass border ${colorMap[group.color].border} relative overflow-hidden group`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[group.color].bg} to-transparent opacity-50`} />
                
                <div className="relative z-10 flex flex-col justify-center h-full">
                  <span className="text-[10px] md:text-xs tracking-widest uppercase font-black text-neutral-500 mb-2">
                    0{idx + 1} //
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                    {group.category}
                  </h3>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                    {group.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-4 py-2 rounded-full border border-white/10 text-xs md:text-sm font-bold bg-white/5 backdrop-blur-md ${colorMap[group.color].text}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator overlay */}
        <motion.div style={{ opacity: headerOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-neutral-600 text-xs font-medium">
          <span className="animate-pulse tracking-widest uppercase text-[10px]">Scroll horizontally</span>
          <span>→</span>
        </motion.div>

      </div>
    </section>
  );
}
