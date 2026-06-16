"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CARS, SERVICE_CARS, formatPrice } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";

type Category = "all" | "dong-xe" | "xe-dich-vu";

export default function GiaXePage() {
  const [category, setCategory] = useState<Category>("all");
  const [quoteOpen, setQuoteOpen] = useState(false);

  const allCars = [...CARS, ...SERVICE_CARS];
  const filtered =
    category === "all"
      ? allCars
      : category === "dong-xe"
      ? CARS
      : SERVICE_CARS;

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
            GIÁ XE VINFAST 2026
          </motion.h1>
          <p className="text-white/70 mt-2 text-sm">
            Bảng giá xe VinFast chính thức tháng 06/2026 tại Hà Nội
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filter tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {(["all", "dong-xe", "xe-dich-vu"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                category === cat
                  ? "bg-[#0f2344] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "all"
                ? "Tất cả"
                : cat === "dong-xe"
                ? "Dòng Xe"
                : "Xe Dịch Vụ"}
            </button>
          ))}
        </div>

        {/* Price table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0f2344] text-white">
                <th className="py-4 px-5 text-left">Mẫu xe</th>
                <th className="py-4 px-5 text-left hidden md:table-cell">Phân loại</th>
                <th className="py-4 px-5 text-right">Giá niêm yết</th>
                <th className="py-4 px-5 text-right">Giá ưu đãi</th>
                <th className="py-4 px-5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car, i) => (
                <motion.tr
                  key={car.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-5">
                    <Link
                      href={`/san-pham/${car.slug}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-16 h-10 flex-shrink-0">
                        <Image
                          src={car.carSrc}
                          alt={car.name}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                      <span className="font-semibold text-gray-900 hover:text-[#db2a2a] transition-colors">
                        {car.name}
                      </span>
                    </Link>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell text-gray-500 capitalize">
                    {"category" in car ? (car.category === "dong-xe" ? "Dòng Xe" : "Xe Dịch Vụ") : "Dòng Xe"}
                  </td>
                  <td className="py-4 px-5 text-right text-gray-400 line-through">
                    {"priceOriginal" in car && car.priceOriginal
                      ? formatPrice(car.priceOriginal as number)
                      : "—"}
                  </td>
                  <td className="py-4 px-5 text-right font-bold text-[#db2a2a]">
                    {formatPrice(car.priceFrom)}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <button
                      onClick={() => setQuoteOpen(true)}
                      className="bg-[#db2a2a] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#b91c1c] transition-colors"
                    >
                      Nhận báo giá
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>* Lưu ý:</strong> Giá xe trên là giá đề xuất bán lẻ (chưa bao gồm lệ phí trước bạ, đăng ký, bảo hiểm).
            Giá có thể thay đổi theo từng thời điểm. Vui lòng liên hệ{" "}
            <a href="tel:0976633054" className="text-[#db2a2a] font-semibold">097.6633.054</a>{" "}
            để được tư vấn chính xác nhất.
          </p>
        </div>
      </div>

      {quoteOpen && (
        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  );
}
