"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Directly bind motion values for ZERO lag
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Offset slightly to perfectly align the custom SVG's tip (which starts around 2,2)
      mouseX.set(e.clientX - 2);
      mouseY.set(e.clientY - 2);
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, .hoverable, [role=button]"));
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, visible]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Main Cursor Element - Instant Tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.82 : hovering ? 1.24 : 1,
            rotate: clicking ? -18 : hovering ? 0 : -14,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="relative flex items-center justify-center transform-origin-top-left"
          style={{ transformOrigin: "2px 2px" }}
        >
          {hovering ? (
            // Hover State: Straight transparent arrow with blue border and inverted blend effect
            <svg
              width="30"
              height="30"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                mixBlendMode: "difference",
                filter: "drop-shadow(0px 3px 10px rgba(59,130,246,0.45))",
              }}
            >
              <path
                d="M2 2L20.5 8.5L12.5 11.5L9.5 19.5L2 2Z"
                fill="rgba(0,0,0,0.03)"
                stroke="#60A5FA"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // Default State: Sleek Arrow
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M2 2L20.5 8.5L12.5 11.5L9.5 19.5L2 2Z" 
                fill="url(#cursor-gradient)" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
                style={{ filter: "drop-shadow(0px 4px 8px rgba(59,130,246,0.4))" }}
              />
              <defs>
                <linearGradient id="cursor-gradient" x1="2" y1="2" x2="20.5" y2="19.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
