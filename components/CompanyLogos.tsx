"use client";
import { motion } from 'framer-motion';
// Import only required icons (tree-shaken) instead of namespace import to avoid large bundle / runtime issues
import {
  siMeta,
  siGoogle,
  siMicrosoft,
  siAmazon,
  siOpenai,
  siAirbnb,
  siTiktok,
  siStripe
} from 'simple-icons/icons';
import React from 'react';

const ICONS = [siMeta, siGoogle, siMicrosoft, siAmazon, siOpenai, siAirbnb, siTiktok, siStripe];

function toSvg(icon: any) {
  if (!icon) return null;
  return (
    <svg
      key={icon.slug}
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className="h-8 w-auto md:h-10 transition-all fill-current drop-shadow-sm"
    >
      <path d={icon.path} />
    </svg>
  );
}

export const CompanyLogos: React.FC<{ className?: string }> = ({ className }) => {
  const list = ICONS.filter(Boolean);
  return (
  <div className={("grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-10 place-items-center w-full " + (className || ''))}>
      {list.map((icon, i) => {
        const slug = icon.slug as string;
        const isMicrosoft = slug === 'microsoft';
        const isTikTok = slug === 'tiktok';
        const color = `#${icon.hex}`;

        const multiColorSvg = isMicrosoft ? (
          <svg
            key="microsoft"
            role="img"
            aria-label="Microsoft"
            viewBox="0 0 24 24"
            className="h-12 w-auto md:h-14"
          >
            <title>Microsoft</title>
            <rect x="1" y="1" width="10.5" height="10.5" fill="#F35325" />
            <rect x="12.5" y="1" width="10.5" height="10.5" fill="#81BC06" />
            <rect x="1" y="12.5" width="10.5" height="10.5" fill="#05A6F0" />
            <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFBA08" />
          </svg>
        ) : isTikTok ? (
          <svg
            key="tiktok"
            role="img"
            aria-label="TikTok"
            viewBox="0 0 24 24"
            className="h-12 w-auto md:h-14"
          >
            <title>TikTok</title>
            <defs>
              <linearGradient id="tiktokGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#25F4EE" />
                <stop offset="55%" stopColor="#25F4EE" />
                <stop offset="55%" stopColor="#FE2C55" />
                <stop offset="100%" stopColor="#FE2C55" />
              </linearGradient>
            </defs>
            <path d={icon.path} fill="url(#tiktokGradient)" />
          </svg>
        ) : null;

        return (
          <motion.figure
            key={icon.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
            className="group flex flex-col items-center gap-2 text-center"
            title={icon.title}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-35 group-hover:opacity-60 transition-opacity" style={{ background: `radial-gradient(circle at 50% 55%, ${isMicrosoft||isTikTok? '#ffffff' : color}33, transparent 70%)` }} />
              <div className="relative">
                {isMicrosoft || isTikTok ? multiColorSvg : (
                  <svg
                    role="img"
                    aria-label={icon.title}
                    viewBox="0 0 24 24"
                    className="h-12 w-auto md:h-14 transition-transform duration-300 group-hover:scale-[1.06]"
                    style={{ fill: color }}
                  >
                    <path d={icon.path} />
                  </svg>
                )}
              </div>
            </div>
            <figcaption className="text-xs md:text-sm font-medium tracking-wide text-foreground/70 group-hover:text-foreground/90 transition-colors select-none">
              {icon.title}
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
};
