"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const education = [
  {
    year: "2023 – Expected 2028",
    role: "B.Tech in Computer Science & Engineering (AI/ML)",
    company: "Brainware University",
    location: "Kolkata, India",
    desc: "Coursework: Data Structures & Algorithms, OOP, Database Management, Web Development. Active contributor to open source projects and tech events.",
    type: "education",
  },
  {
    year: "Mar 2026",
    role: "Management Member — Texibition 2k26",
    company: "Annual Techfest",
    location: "Brainware University, Kolkata",
    desc: "Volunteered as part of the management team for the university's annual technology festival. Coordinated with multiple teams to ensure smooth execution of events and activities.",
    type: "experience",
  },
  {
    year: "Sep 2025",
    role: "Participant — Nexathon 1.0",
    company: "48-Hour Hackathon",
    location: "Brainware University, Kolkata",
    desc: "Competed in a 48-hour hackathon collaborating under time constraints to build a working prototype. Gained hands-on experience in rapid prototyping.",
    type: "experience",
  },
  {
    year: "2024",
    role: "Higher Secondary (Science)",
    company: "Techno India Group Public School",
    location: "Coochbehar, India",
    desc: "Completed 10+2 with a strong foundation in Mathematics and Physics.",
    type: "education",
  },
  {
    year: "2022",
    role: "Matriculation",
    company: "Techno India Group Public School",
    location: "Alipurduar, India",
    desc: "Completed 10th board with distinction.",
    type: "education",
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the container itself for the SVG drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="relative py-32 px-6 w-full max-w-5xl mx-auto z-10" id="experience" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <p className="text-accent text-[10px] font-black tracking-widest uppercase mb-3 text-purple-400">Background</p>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter">My Journey</h2>
      </motion.div>

      <div className="relative pt-10 pb-10">
        {/*
          Solid, pure line driven by CSS scaleY. No SVGs, no dasharrays, no dotted artifacts.
          It scales from top to bottom exactly as the user scrolls.
        */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-[1px] bg-white/10 z-0">
          <motion.div
            className="w-full h-full bg-purple-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.8)]"
            style={{ scaleY: scrollYProgress }}
          />
        </div>

        <div className="flex flex-col relative z-10 w-full" style={{ gap: '12vh' }}>
          {education.map((item, idx) => {
            // Map animations bidirectionally based on absolute scroll percentage
            const threshold = idx / (education.length - 1);
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [threshold - 0.2, threshold], [0, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [threshold - 0.2, threshold], [40, 0]);
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotBg = useTransform(scrollYProgress, [threshold - 0.1, threshold], ["#000", "#a855f7"]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotBorder = useTransform(scrollYProgress, [threshold - 0.1, threshold], ["rgba(255,255,255,0.2)", "rgba(168,85,247,1)"]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotScale = useTransform(scrollYProgress, [threshold - 0.1, threshold], [1, 1.3]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotShadow = useTransform(scrollYProgress, [threshold - 0.1, threshold], ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 15px rgba(168,85,247,0.8)"]);

            return (
              <motion.div
                key={idx}
                style={{ opacity, y }}
                className={`flex flex-col md:flex-row items-center w-full ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* 
                  The Timeline Dot.
                  Lights up precisely when the line reaches it, and dims precisely when the line retracts.
                */}
                <motion.div 
                  className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-20"
                  style={{ 
                    backgroundColor: dotBg,
                    borderColor: dotBorder,
                    borderWidth: 3,
                    scale: dotScale,
                    boxShadow: dotShadow
                  }}
                />

                <div
                  className={`w-full md:w-[calc(50%-3rem)] ${idx % 2 === 0 ? "md:text-left" : "md:text-right"} glass p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-colors relative group`}
                >
                  <div className="absolute inset-0 bg-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <span
                    className={`text-[10px] font-black tracking-widest uppercase mb-2 block ${item.type === "education" ? "text-accent" : "text-purple-400"}`}
                  >
                    {item.year}
                    {" · "}
                    <span className="opacity-60">{item.type === "education" ? "🎓 Education" : "🏆 Experience"}</span>
                  </span>
                  <h3 className="text-xl md:text-2xl font-black mb-1 leading-tight">{item.role}</h3>
                  <h4 className="text-sm text-neutral-300 mb-2 font-semibold tracking-wide">{item.company}</h4>
                  <p className="text-xs text-neutral-500 mb-4 font-mono">{item.location}</p>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
