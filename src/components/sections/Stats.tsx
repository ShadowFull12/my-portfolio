"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "23+", label: "OS Repositories" },
  { value: "2028", label: "Expected Graduation" },
  { value: "2+", label: "Hackathons" },
  { value: "∞", label: "Lines of Code" },
];

export function Stats() {
  return (
    <section className="relative py-20 px-6 z-10 border-y border-white/5 overflow-hidden">
      {/* Horizontal scroll line as decoration */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
              {stat.value}
            </span>
            <span className="text-neutral-500 text-xs uppercase tracking-widest font-medium">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
