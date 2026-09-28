"use client";

import { motion } from "framer-motion";

export function FeatureCube() {
  return (
    <div className="perspective-[900px] flex items-center justify-center py-8">
      <motion.div
        className="relative h-40 w-40 [transform-style:preserve-3d]"
        animate={{ rotateX: [18, 28, 18], rotateY: [0, 360, 720] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        whileDrag={{ scale: 1.05 }}
      >
        {[
          { transform: "rotateY(0deg) translateZ(80px)", bg: "bg-deep-red" },
          { transform: "rotateY(180deg) translateZ(80px)", bg: "bg-warm-sand" },
          { transform: "rotateY(90deg) translateZ(80px)", bg: "bg-obsidian" },
          { transform: "rotateY(-90deg) translateZ(80px)", bg: "bg-deep-red/80" },
          { transform: "rotateX(90deg) translateZ(80px)", bg: "bg-warm-sand/90" },
          { transform: "rotateX(-90deg) translateZ(80px)", bg: "bg-obsidian/90" },
        ].map((face) => (
          <div
            key={face.transform}
            className={`absolute inset-0 border border-white/20 ${face.bg}`}
            style={{ transform: face.transform }}
          />
        ))}
      </motion.div>
    </div>
  );
}
