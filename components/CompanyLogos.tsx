"use client";
import { motion } from 'framer-motion';
import * as icons from 'simple-icons';
import React from 'react';

const BRANDS = [
  'siMeta',
  'siGoogle',
  'siMicrosoft',
  'siAmazon',
  'siOpenai',
  'siAirbnb',
  'siTiktok',
  'siStripe'
];

function toSvg(icon: any) {
  if (!icon) return null;
  return (
    <svg
      key={icon.slug}
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className="h-6 w-auto md:h-7 opacity-70 hover:opacity-100 transition-opacity fill-current"
    >
      <path d={icon.path} />
    </svg>
  );
}

export const CompanyLogos: React.FC<{ className?: string }> = ({ className }) => {
  const list = BRANDS.map(k => (icons as any)[k]).filter(Boolean);
  return (
    <div className={"flex flex-wrap items-center justify-center gap-x-12 gap-y-6 " + (className || '')}>
      {list.map((icon, i) => (
        <motion.div
          key={icon.slug}
          initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          className="text-foreground/60 hover:text-foreground"
        >
          {toSvg(icon)}
        </motion.div>
      ))}
    </div>
  );
};
