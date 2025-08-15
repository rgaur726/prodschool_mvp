"use client"

import { motion } from "framer-motion"

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Large softly animated blobs (existing) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ x: [0, 100, -50, 0], y: [0, -50, 100, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl"
        animate={{ x: [0, -80, 60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle geometric radial glow (fixed invalid theme() usage) */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.25) 0%, transparent 60%)'
        }}
      />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
        backgroundSize: '140px 140px, 140px 140px'
      }} />

      {/* Floating rotated squares (enhanced subtle visibility) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 rounded-lg rotate-45"
          style={{
            top: `${8 + i * 12}%`,
            left: i % 2 === 0 ? `${4 + i * 8}%` : 'auto',
            right: i % 2 === 1 ? `${4 + i * 8}%` : 'auto',
            background: 'linear-gradient(145deg, hsl(var(--primary)/0.09), hsl(var(--primary)/0))',
            border: '1px solid hsl(var(--primary)/0.28)',
            boxShadow: '0 0 0 1px hsl(var(--primary)/0.08), 0 8px 28px -10px hsl(var(--primary)/0.30)',
            mixBlendMode: 'plus-lighter',
            opacity: 0.22,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [45, 50, 40, 45],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{ duration: 26 + i * 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Thin animated lines (enhanced) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px"
          style={{
            width: 360 + (i % 3) * 120,
            top: `${12 + i * 13}%`,
            left: i % 2 === 0 ? '8%' : 'auto',
            right: i % 2 === 1 ? '8%' : 'auto',
            background: 'linear-gradient(90deg, rgba(255,255,255,0), hsl(var(--primary)/0.5) 40%, hsl(var(--primary)/0.22) 60%, rgba(255,255,255,0))',
            boxShadow: '0 0 0 1px hsl(var(--primary)/0.12)',
            opacity: 0.25,
            mixBlendMode: 'plus-lighter',
          }}
          animate={{
            opacity: [0.18, 0.35, 0.18],
            x: [0, i % 2 === 0 ? 40 : -40, 0],
          }}
          transition={{ duration: 30 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}


      {/* Triangles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`tri-${i}`}
          className="absolute opacity-[0.12]"
          style={{
            top: `${5 + i * 17}%`,
            left: i % 2 === 0 ? `${12 + i * 6}%` : 'auto',
            right: i % 2 === 1 ? `${12 + i * 6}%` : 'auto',
            width: 120,
            height: 120,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            background: 'linear-gradient(135deg, hsl(var(--primary)/0.25), hsl(var(--primary)/0))',
          }}
          animate={{ y: [0, -22, 0], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 26 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Outlined drifting circles */}
      {/* Depth-layered luminous circles (faux 3D coming forward) */}
      <div className="absolute inset-0 [perspective:1600px]">
        {Array.from({ length: 6 }).map((_, i) => {
          const depth = i / 5; // 0 (near) -> 1 (far)
          const baseSize = 320; // px
          const size = baseSize * (0.55 + (1 - depth) * 0.55); // larger when nearer
          const horizontal = i % 2 === 0 ? `${15 + i * 6}%` : 'auto';
          const horizontalOpp = i % 2 === 1 ? `${15 + i * 6}%` : 'auto';
          const top = `${18 + depth * 50}%`;
          return (
            <motion.div
              key={`d3-circle-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                width: size,
                height: size,
                top,
                left: horizontal,
                right: horizontalOpp,
                // Radial luminous fill fading outward
                background: 'radial-gradient(circle at 35% 35%, hsl(var(--primary)/0.32), hsl(var(--primary)/0.12) 55%, hsl(var(--primary)/0) 72%)',
                border: '1px solid hsl(var(--primary)/0.22)',
                boxShadow: '0 0 46px -12px hsl(var(--primary)/0.30), inset 0 0 70px -25px hsl(var(--primary)/0.40)',
                mixBlendMode: 'plus-lighter',
                filter: 'blur(6px)',
              }}
              initial={{
                scale: 0.35 + depth * 0.25,
                opacity: 0,
                y: 0,
                filter: 'blur(10px)',
              }}
              animate={{
                scale: [0.35 + depth * 0.25, 1 - depth * 0.25, 0.35 + depth * 0.25],
                opacity: [0, 0.18 + (1 - depth) * 0.20, 0],
                y: [0, -60 + depth * 40, 0],
                filter: ['blur(10px)', 'blur(2px)', 'blur(10px)'],
              }}
              transition={{
                duration: 48 + depth * 26,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: depth * 6,
              }}
            />
          )
        })}
      </div>

      {/* Dotted texture overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}
