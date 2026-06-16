"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsCardProps {
  title: string;
  date: string;
  image: string;
  slug: string;
  excerpt?: string;
}

export default function NewsCard({ title, date, image, slug, excerpt }: NewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/tin-tuc/${slug}`} className="block">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[#db2a2a]/0 group-hover:bg-[#db2a2a]/15 transition-colors duration-400" />
          {/* Date badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
            <Calendar size={10} />
            {date}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#db2a2a] transition-colors duration-200">
            {title}
          </h3>
          {excerpt && (
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{excerpt}</p>
          )}
          <div className="flex items-center gap-1 text-[#db2a2a] text-xs font-semibold">
            Đọc thêm
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
