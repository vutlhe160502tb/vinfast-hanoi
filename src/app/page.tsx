"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroSlider from "@/components/HeroSlider";
import CarCard from "@/components/CarCard";
import NewsCard from "@/components/NewsCard";
import QuoteModal from "@/components/QuoteModal";
import { CARS, SERVICE_CARS, NEWS } from "@/lib/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <QuoteModal />

      {/* Hero Slider */}
      <section>
        <HeroSlider />
      </section>

      {/* Dòng xe section */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            KHÁM PHÁ CÁC DÒNG XE VINFAST
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CARS.map((car) => (
              <motion.div key={car.id} variants={fadeInUp}>
                <CarCard
                  name={car.name}
                  slug={car.slug}
                  description={car.description}
                  logoSrc={car.logoSrc}
                  carSrc={car.carSrc}
                  priceFrom={car.priceFrom}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Xe dịch vụ section */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            KHÁM PHÁ CÁC DÒNG XE DỊCH VỤ
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SERVICE_CARS.map((car) => (
              <motion.div key={car.id} variants={fadeInUp}>
                <CarCard
                  name={car.name}
                  slug={car.slug}
                  description={car.description}
                  logoSrc={car.logoSrc}
                  carSrc={car.carSrc}
                  priceFrom={car.priceFrom}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-12 px-4 text-white text-center"
        style={{ backgroundColor: "#0f2344" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Đăng ký nhận báo giá ngay hôm nay
          </h2>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            Liên hệ với chúng tôi để nhận thông tin chi tiết và ưu đãi tốt
            nhất dành cho bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setQuoteOpen(true)}
              className="bg-[#db2a2a] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#b91c1c] transition-colors"
            >
              NHẬN BÁO GIÁ NGAY
            </button>
            <a
              href="tel:0976633054"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              GỌI 0976.633.054
            </a>
          </div>
        </motion.div>
      </section>

      {/* Tin tức section */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-wide">
              TIN TỨC MỚI NHẤT
            </h2>
            <a
              href="/tin-tuc"
              className="text-[#db2a2a] text-sm font-medium hover:underline"
            >
              Xem tất cả →
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {NEWS.slice(0, 6).map((news) => (
              <motion.div key={news.id} variants={fadeInUp}>
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
      </section>

      {quoteOpen && (
        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      )}
    </>
  );
}
