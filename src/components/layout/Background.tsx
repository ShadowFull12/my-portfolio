/* Performance-optimized Background: uses CSS animations instead of Framer Motion continuous loops */
"use client";

export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
      {/* Static noise texture */}
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gradient orb 1 — CSS animation, no JS */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          animation: "orb1 18s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Gradient orb 2 */}
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          animation: "orb2 22s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* CSS keyframes injected globally via style tag */}
      <style>{`
        @keyframes orb1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(8vw, 5vh) scale(1.15); }
        }
        @keyframes orb2 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-6vw, -8vh) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
