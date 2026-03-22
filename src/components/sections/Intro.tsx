"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Fading out previous thought */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-2xl md:text-3xl font-light text-neutral-400 max-w-2xl text-center px-6"
        >
          Building for the modern web requires more than just clean code.
        </motion.div>

        {/* Morphing into main statement */}
        <motion.div
          style={{ opacity: opacity2, scale: scale2 }}
          className="absolute text-center flex flex-col items-center px-4"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground">
            Not just websites.
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
            Experiences.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
