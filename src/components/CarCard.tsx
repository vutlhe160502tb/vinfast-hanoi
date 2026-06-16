"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/data";

const CAR_TYPE_MAP: Record<string, string> = {
  vf3: "MINI-SUV",
  vf5: "A-SUV",
  vf6: "B-SUV",
  vf7: "C-SUV",
  vf8: "D-SUV",
  vf9: "D-SUV",
  "vf-mpv-7": "MPV",
  "minio-green": "MINI EV",
  "herio-green": "A-SUV",
  "nerio-green": "MPV",
  "limo-green": "LIMOUSINE",
};

interface CarCardProps {
  name: string;
  slug: string;
  description: string;
  logoSrc: string;
  carSrc: string;
  priceFrom: number;
  range?: string;
}

export default function CarCard({
  name,
  slug,
  description,
  carSrc,
  priceFrom,
  range,
}: CarCardProps) {
  const carType = CAR_TYPE_MAP[slug] || "EV";

  return (
    <Link href={`/san-pham/${slug}`} className="block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group bg-white overflow-hidden cursor-pointer border border-gray-100"
        style={{
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 16px 48px rgba(0,0,0,0.14)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 2px 12px rgba(0,0,0,0.06)";
        }}
      >
        {/* Car image */}
        <div
          className="relative h-52 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #f2f2f2 0%, #e9e9e9 50%, #f5f5f5 100%)",
          }}
        >
          <Image
            src={carSrc}
            alt={name}
            fill
            className="object-contain object-center p-4 group-hover:scale-108 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Type badge */}
          <div className="absolute bottom-3 right-3 bg-white text-gray-600 text-[10px] font-black px-2.5 py-1 tracking-[0.15em] border border-gray-200">
            {carType}
          </div>
          {/* Hover red border top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#db2a2a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>

        {/* Info */}
        <div className="px-5 pt-5 pb-5">
          <h3 className="text-[22px] font-black text-gray-900 tracking-tight leading-tight mb-1">
            VINFAST {name.toUpperCase()}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4 min-h-[40px]">
            {description}
          </p>

          {/* Spec chips */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {range && (
              <div className="bg-gray-50 px-3 py-2.5 text-center border border-gray-100">
                <p className="text-gray-900 font-bold text-base leading-none">{range}</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">
                  Quãng đường
                </p>
              </div>
            )}
            <div className={`bg-gray-50 px-3 py-2.5 text-center border border-gray-100 ${!range ? "col-span-2" : ""}`}>
              <p className="text-gray-900 font-bold text-base leading-none">
                10{" "}
                <span className="text-xs font-semibold text-gray-500">năm</span>
              </p>
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">
                Bảo hành
              </p>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">
                Giá xe
              </p>
              <p className="text-gray-900 font-black text-lg leading-none">
                {formatPrice(priceFrom)}{" "}
                <span className="text-sm font-semibold">đ</span>
              </p>
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#db2a2a] transition-colors duration-200">
              XEM CHI TIẾT →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
