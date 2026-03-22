"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Github, Star, Trophy } from "lucide-react";

const achievements = [
  {
    title: "NPTEL Certification",
    subtitle: "Programming for Problem Solving using C",
    icon: Star,
    color: "yellow",
    detail: "Scored in the top percentile demonstrating strong fundamentals in C, memory management, and algorithmic problem-solving under strict constraints.",
  },
  {
    title: "Open Source Contributor",
    subtitle: "Active GitHub contributor across multiple web projects",
    icon: Github,
    color: "blue",
    detail: "Consistently pushing code, reviewing PRs, and maintaining repos in the React and Next.js ecosystems. Passionate about community-driven development.",
  },
  {
    title: "Hackathon Finalist",
    subtitle: "Nexathon 1.0 – Built end-to-end prototype in 48 hours",
    icon: Trophy,
    color: "purple",
    detail: "Collaborated under intense time constraints to deliver a fully functional prototype, earning finalist honors out of 50+ competing teams.",
  },
  {
    title: "Techfest Manager",
    subtitle: "Managed operations for Texibition 2k26 Annual Techfest",
    icon: Award,
    color: "emerald",
    detail: "Spearheaded management for a 2000+ attendee technical festival. Organized competitive coding events, handled logistics, and managed participant registration.",
  },
];

const colors: Record<string, string> = {
  yellow: "from-yellow-500/20 to-orange-500/5 border-yellow-500/40 text-yellow-400",
  blue: "from-blue-500/20 to-cyan-500/5 border-blue-500/40 text-blue-400",
  purple: "from-purple-500/20 to-fuchsia-500/5 border-purple-500/40 text-purple-400",
  emerald: "from-emerald-500/20 to-teal-500/5 border-emerald-500/40 text-emerald-400",
};

export function Achievements() {
  return (
    <section className="relative w-full bg-[#020202] border-y border-white/5 py-24 pb-48" id="achievements">
      <div className="w-full max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <p className="text-accent text-[10px] font-black tracking-widest uppercase mb-1 text-center">Recognitions</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center">Experience</h2>
        </div>

        {/* Deck of Cards Sticky Scroll */}
        <div className="relative w-full flex flex-col pt-[10vh]">
          {achievements.map((item, index) => {
            const topOffset = `calc(15vh + ${index * 40}px)`; // Stagger stacking distance
            const zIndexClass = `z-[${index * 10}]`;
            
            return (
              <div 
                key={index}
                className={`sticky w-full flex justify-center ${zIndexClass}`}
                style={{
                  top: topOffset, // Sticks near top, slightly offset
                  height: "auto",
                  paddingBottom: "40vh", // Provides scroll room to reveal next
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full max-w-4xl bg-[#0a0a0a] rounded-3xl p-8 md:p-14 border ${colors[item.color].split(' ')[2]} relative overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.95)]`}
                >
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${colors[item.color].split(' ')[0]} ${colors[item.color].split(' ')[1]} rounded-full blur-[80px] opacity-70`} />
                  
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className={`p-6 rounded-2xl glass border ${colors[item.color].split(' ')[2]} bg-black/40`}>
                      <item.icon className={`w-12 h-12 md:w-16 md:h-16 ${colors[item.color].split(' ')[3]}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black mb-2 tracking-tight">{item.title}</h3>
                      <h4 className={`text-xs md:text-sm font-bold mb-4 uppercase tracking-widest ${colors[item.color].split(' ')[3]}`}>
                        {item.subtitle}
                      </h4>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed md:leading-loose">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
          
          {/* Invisible spacer to allow the user to scroll past the final card while it is "stuck" in position */}
          <div className="h-[80vh] w-full" />
        </div>
      </div>
    </section>
  );
}
