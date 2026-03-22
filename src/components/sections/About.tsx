"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Hand, Zap, Brain } from "lucide-react";
import { MouseEvent } from "react";

const features = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    desc: "React, Next.js, Tailwind CSS with a sharp eye for detail and performance.",
    color: "from-blue-500/15",
  },
  {
    icon: Hand,
    title: "Creative Coding",
    desc: "Canvas API, MediaPipe, and experimental interaction paradigms.",
    color: "from-violet-500/15",
  },
  {
    icon: Zap,
    title: "Real-time Systems",
    desc: "Firebase, Node.js, Express — building live, reactive apps.",
    color: "from-emerald-500/15",
  },
  {
    icon: Brain,
    title: "AI/ML Enthusiast",
    desc: "Exploring conversational AI, gesture recognition, and adaptive systems.",
    color: "from-orange-500/15",
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-16" id="about">
      {/* Fog reveal top/bottom */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />

      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-16 items-center z-10">
        <div className="flex-1 w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-accent text-xs font-bold tracking-widest uppercase mb-4"
          >
            About Me
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-black tracking-tighter"
            >
              Creativity meets
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                engineering.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-base md:text-lg leading-relaxed"
          >
            I&apos;m <strong className="text-white">Aritra Mukherjee</strong>, a B.Tech CS (AI/ML) student at{" "}
            <span className="text-accent font-semibold">Brainware University, Kolkata</span>. I channel my passion for {" "}
            immersive web, gesture-based UIs, and creative coding into everything I build.
            <br /><br />
            Outside coursework, I compete in hackathons, contribute to open source, and obsess over building apps that feel like experiences — not just websites.
          </motion.p>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className={`glass p-6 rounded-2xl h-full border border-white/8 bg-gradient-to-br ${feature.color} to-transparent hover:border-white/15 transition-colors group`}>
                  <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-base font-black mb-2">{feature.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
