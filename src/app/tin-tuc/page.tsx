"use client";

import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import { NEWS } from "@/lib/data";

export default function TinTucPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#0f2344] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            TIN TỨC
          </motion.h1>
          <p className="text-white/70 mt-2 text-sm">
            Cập nhật thông tin mới nhất từ VinFast Lê Trọng Tấn
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {NEWS.map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <NewsCard
                title={news.title}
                date={news.date}
                image={news.image}
                slug={news.slug}
                excerpt={news.excerpt}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
