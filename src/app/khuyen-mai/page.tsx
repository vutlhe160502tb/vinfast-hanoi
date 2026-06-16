"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { PROMOTIONS } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";

export default function KhuyenMaiPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0f2344] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            KHUYẾN MÃI
          </motion.h1>
          <p className="text-white/70 mt-2 text-sm">
            Các chương trình ưu đãi hấp dẫn từ VinFast Lê Trọng Tấn
          </p>
        </div>
      </div>

      {/* Current promotions banner */}
      <div className="bg-[#db2a2a] text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 justify-center text-sm font-medium">
          <span>✦ ƯU ĐÃI GIÁ BÁN 3%</span>
          <span>✦ MIỄN PHÍ SẠC PIN 3 NĂM</span>
          <span>✦ LÃI SUẤT CỐ ĐỊNH 5%</span>
          <span>✦ MIỄN PHÍ LỆ PHÍ TRƯỚC BẠ 100%</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROMOTIONS.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-md border border-gray-100 group"
            >
              <div className="relative h-56">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1 text-white/80 text-xs mb-1">
                    <Calendar size={12} />
                    <span>{promo.date}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">
                  {promo.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {promo.description}
                </p>
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="flex items-center gap-2 text-[#db2a2a] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Đăng ký ngay <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#0f2344] rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-3">
            Nhận tư vấn ưu đãi chi tiết
          </h2>
          <p className="text-white/70 mb-6 text-sm max-w-lg mx-auto">
            Liên hệ ngay với chúng tôi để được tư vấn về các chương trình ưu
            đãi hiện hành và chính sách giá tốt nhất.
          </p>
          <button
            onClick={() => setQuoteOpen(true)}
            className="bg-[#db2a2a] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#b91c1c] transition-colors"
          >
            ĐĂNG KÝ NHẬN ƯU ĐÃI
          </button>
        </motion.div>
      </div>

      {quoteOpen && (
        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  );
}
