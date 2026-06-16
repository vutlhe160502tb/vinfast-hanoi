"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/data";

interface CarCardProps {
  name: string;
  slug: string;
  description: string;
  logoSrc: string;
  carSrc: string;
  priceFrom: number;
}

export default function CarCard({ name, slug, description, logoSrc, carSrc, priceFrom }: CarCardProps) {
  return (
    <Link href={`/san-pham/${slug}`} className="block">
      <motion.div
        whileHover={{ y: -10, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          background: "linear-gradient(145deg, #0b1628 0%, #1e0a2a 45%, #2a0612 100%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
      >
        {/* Bottom glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 105%, rgba(219,42,42,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Shimmer border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{ boxShadow: "inset 0 0 0 1px rgba(219,42,42,0.4)" }}
        />

        {/* Header row */}
        <div className="relative z-10 px-5 pt-5 pb-2 flex items-start justify-between">
          <div className="h-9 flex items-center">
            <Image
              src={logoSrc}
              alt={name}
              width={140}
              height={40}
              className="h-8 w-auto object-contain brightness-0 invert"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const span = document.createElement("span");
                span.textContent = name;
                span.className = "text-white text-xl font-bold italic";
                img.parentElement?.appendChild(span);
              }}
            />
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#db2a2a] group-hover:border-[#db2a2a] transition-all duration-300">
            <ArrowUpRight size={14} className="text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Car image */}
        <div className="relative z-10 h-44 mx-3 my-2">
          <Image
            src={carSrc}
            alt={name}
            fill
            className="object-contain object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.6))" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Description overlay on hover */}
        <div className="absolute inset-0 z-20 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
          <div
            className="w-full px-5 pb-[68px] pt-16"
            style={{
              background:
                "linear-gradient(to top, rgba(8,4,18,0.97) 0%, rgba(8,4,18,0.75) 55%, transparent 100%)",
            }}
          >
            <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{description}</p>
          </div>
        </div>

        {/* Price bar */}
        <div className="relative z-10 px-5 py-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Giá từ</p>
              <p className="text-yellow-400 font-bold text-[17px] tracking-wide leading-none">
                {formatPrice(priceFrom)}
              </p>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30 group-hover:text-white/80 transition-colors duration-300">
              Xem chi tiết
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
