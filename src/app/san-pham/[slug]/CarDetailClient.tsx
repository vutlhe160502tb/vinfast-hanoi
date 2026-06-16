"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, Phone } from "lucide-react";
import { CARS, formatPrice } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";

type Car = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoSrc: string;
  carSrc: string;
  priceFrom: number;
  priceOriginal?: number;
  priceLabel?: string;
  promotions: string[];
  specs?: Record<string, string>;
};

interface Props {
  car: Car;
}

export default function CarDetailClient({ car }: Props) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const relatedCars = CARS.filter((c) => c.slug !== car.slug).slice(0, 3);
  const gallery = [car.carSrc, car.carSrc, car.carSrc];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#db2a2a]">Trang chủ</Link>
          <span>/</span>
          <Link href="/dong-xe" className="hover:text-[#db2a2a]">Dòng xe</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{car.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#db2a2a] mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Quay lại
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left - Info */}
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-3">
                <Image
                  src={car.logoSrc}
                  alt={car.name}
                  width={160}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
            </div>

            {/* Price box */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border-2 border-blue-200 rounded-xl p-5 mb-5 bg-blue-50/30"
            >
              <p className="text-center text-blue-600 font-semibold mb-2">
                {car.priceLabel ?? "Bao gồm PIN"}
              </p>
              {car.priceOriginal && (
                <p className="text-center text-red-400 line-through text-base">
                  {formatPrice(car.priceOriginal)} VNĐ
                </p>
              )}
              <p className="text-center text-[#db2a2a] text-2xl font-bold">
                {formatPrice(car.priceFrom)} VNĐ
              </p>
            </motion.div>

            {/* Promotions */}
            <div className="border border-gray-200 rounded-xl p-5 mb-5">
              <h3 className="text-center text-blue-700 font-bold text-lg mb-4">
                CHƯƠNG TRÌNH ƯU ĐÃI
              </h3>
              <ul className="space-y-2">
                {car.promotions.map((promo, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {promo}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setQuoteOpen(true)}
                className="flex-1 bg-blue-600 text-white font-semibold py-3.5 rounded-lg hover:bg-blue-700 transition-colors text-sm tracking-wide"
              >
                ĐĂNG KÝ LÁI THỬ
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setQuoteOpen(true)}
                className="flex-1 border-2 border-gray-800 text-gray-800 font-semibold py-3.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors text-sm tracking-wide"
              >
                NHẬN BÁO GIÁ
              </motion.button>
            </div>
          </div>

          {/* Right - Image gallery */}
          <div>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-lg">
              <Image
                src={gallery[currentImage]}
                alt={car.name}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex gap-2 justify-center">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentImage ? "bg-[#db2a2a] scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Specs */}
        {car.specs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 border border-gray-200 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-5">Thông số kỹ thuật</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(car.specs).map(([key, val]) => (
                <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-xs mb-1">
                    {key === "range" ? "Tầm hoạt động" :
                     key === "power" ? "Công suất" :
                     key === "seats" ? "Số chỗ" :
                     key === "charging" ? "Sạc AC" : key}
                  </p>
                  <p className="text-gray-900 font-bold text-lg">{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Advisor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5"
        >
          <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 border-2 border-white shadow flex items-center justify-center text-2xl">
            👤
          </div>
          <div className="text-center sm:text-left">
            <p className="font-bold text-gray-900 text-lg">PHẠM HOÀNG ANH</p>
            <p className="text-gray-600 text-sm">Phụ trách kinh doanh Vinfast Lê Trọng Tấn</p>
            <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
              <Phone size={14} className="text-[#db2a2a]" />
              <a href="tel:0976633054" className="text-[#db2a2a] font-semibold text-sm">097.6633.054</a>
            </div>
            <p className="text-gray-500 text-xs mt-0.5">Email: Hoanganh2610.vinfast@gmail.com</p>
          </div>
          <div className="ml-auto hidden sm:block">
            <button
              onClick={() => setQuoteOpen(true)}
              className="bg-[#db2a2a] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#b91c1c] transition-colors"
            >
              Tư vấn ngay
            </button>
          </div>
        </motion.div>

        {/* Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 prose max-w-none"
        >
          <h2 className="text-xl font-bold text-[#db2a2a]">
            Ưu Đãi Xe VinFast {car.name} Trong Tháng 06/2026: Tổng ưu đãi có thể lên đến 42 triệu đồng
          </h2>
          <ul className="space-y-1 text-gray-700 text-sm list-none p-0">
            <li>– Giảm <strong className="text-[#db2a2a]">6%</strong> chương trình mãnh liệt vì tương lai xanh</li>
            <li>– Giảm <strong className="text-[#db2a2a]">5%</strong> cho lực lượng công an và quân đội</li>
            <li>– Miễn phí lệ phí trước bạ <strong>100%</strong></li>
            <li>– Hỗ trợ lãi suất cố định chỉ từ <strong>5%</strong></li>
            <li>– Miễn phí sạc điện đến 10/02/2029</li>
          </ul>
          <h3 className="text-lg font-bold text-gray-900 mt-6">Mô tả {car.name}</h3>
          <p className="text-gray-700 leading-relaxed">{car.description}</p>
          <div className="bg-blue-50 rounded-lg p-4 mt-4 border border-blue-100">
            <p className="text-sm text-blue-800 font-semibold mb-1">Liên hệ tư vấn</p>
            <p className="text-sm text-blue-700">
              Hotline: <a href="tel:0976633054" className="font-bold">097.6633.054</a>
            </p>
          </div>
        </motion.div>

        {/* Related cars */}
        {relatedCars.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Xe liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedCars.map((rc) => (
                <Link
                  key={rc.id}
                  href={`/san-pham/${rc.slug}`}
                  className="group rounded-xl overflow-hidden border border-gray-200 hover:border-[#db2a2a] transition-colors"
                >
                  <div className="relative h-40 bg-gray-100">
                    <Image
                      src={rc.carSrc}
                      alt={rc.name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-gray-900">{rc.name}</p>
                    <p className="text-[#db2a2a] text-sm font-medium">{formatPrice(rc.priceFrom)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {quoteOpen && (
        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCar={car.name} />
      )}
    </div>
  );
}
