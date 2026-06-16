"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/data";

interface CarCardProps {
  name: string;
  slug: string;
  description: string;
  logoSrc: string;
  carSrc: string;
  priceFrom: number;
}

export default function CarCard({
  name,
  slug,
  description,
  logoSrc,
  carSrc,
  priceFrom,
}: CarCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl overflow-hidden shadow-lg cursor-pointer group"
      style={{
        background: "linear-gradient(135deg, #1a0a1e 0%, #c82a4a 60%, #1a0a1e 100%)",
      }}
    >
      <Link href={`/san-pham/${slug}`} className="block p-5">
        {/* Logo / Model name */}
        <div className="mb-3 h-10 flex items-center">
          <Image
            src={logoSrc}
            alt={name}
            width={120}
            height={40}
            className="h-8 w-auto object-contain brightness-0 invert"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const text = document.createElement("span");
                text.textContent = name;
                text.className = "text-white text-2xl font-bold italic";
                parent.appendChild(text);
              }
            }}
          />
        </div>

        {/* Description */}
        <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Car image */}
        <div className="relative h-40 -mx-2">
          <Image
            src={carSrc}
            alt={name}
            fill
            className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-white/70 text-xs">Giá từ</p>
          <p className="text-yellow-300 font-bold text-lg">{formatPrice(priceFrom)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
