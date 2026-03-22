"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Main dot — snaps instantly
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 60 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 60 });

  // Trailing ring — lags behind
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  // Secondary trail — lags more
  const trail2X = useSpring(mouseX, { stiffness: 80, damping: 18 });
  const trail2Y = useSpring(mouseY, { stiffness: 80, damping: 18 });

  // Third trail
  const trail3X = useSpring(mouseX, { stiffness: 45, damping: 14 });
  const trail3Y = useSpring(mouseY, { stiffness: 45, damping: 14 });

  const trailsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
      trailsRef.current = [{ x: e.clientX, y: e.clientY }, ...trailsRef.current.slice(0, 4)];
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, .hoverable, [role=button]")
      );
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

  const ringSize = clicking ? 20 : hovering ? 52 : 36;
  const dotSize = clicking ? 4 : hovering ? 0 : 5;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trail 3 – slowest, most faded */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9990] hidden md:block"
        style={{
          x: trail3X,
          y: trail3Y,
          width: 12,
          height: 12,
          marginLeft: -6,
          marginTop: -6,
          background: "rgba(59,130,246,0.12)",
          filter: "blur(2px)",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Trail 2 */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9992] hidden md:block"
        style={{
          x: trail2X,
          y: trail2Y,
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          background: "rgba(59,130,246,0.2)",
          filter: "blur(1px)",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9994] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          border: hovering ? "1.5px solid rgba(59,130,246,0.8)" : "1.5px solid rgba(255,255,255,0.4)",
          background: hovering ? "rgba(59,130,246,0.08)" : "transparent",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease",
        }}
        animate={
          hovering
            ? { boxShadow: "0 0 14px 2px rgba(59,130,246,0.3)" }
            : { boxShadow: "none" }
        }
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          background: hovering ? "rgba(59,130,246,1)" : "rgba(255,255,255,1)",
          boxShadow: "0 0 8px 2px rgba(59,130,246,0.7)",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease",
        }}
      />
    </>
  );
}
