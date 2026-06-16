"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group"
    >
      <Link href={`/tin-tuc/${slug}`}>
        <div className="relative h-48 rounded-lg overflow-hidden mb-3">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <h3 className="text-[#db2a2a] font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:underline">
          {title}
        </h3>
        <p className="text-gray-500 text-xs mb-1">{date}</p>
        {excerpt && (
          <p className="text-gray-600 text-xs line-clamp-2">{excerpt}</p>
        )}
        <span className="text-[#db2a2a] text-xs font-medium mt-1 inline-block">Read More »</span>
      </Link>
    </motion.article>
  );
}
