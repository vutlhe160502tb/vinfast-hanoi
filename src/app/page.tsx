"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
  visible: { transition: { staggerChildren: 0.1 } },
};

const STATS = [
  { value: "7+", label: "Dòng xe điện" },
  { value: "500+", label: "Khách hàng tin tưởng" },
  { value: "10", label: "Năm kinh nghiệm" },
  { value: "24/7", label: "Hỗ trợ tư vấn" },
];

function SectionTitle({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <div className="inline-flex items-center gap-3 mb-3">
        <span className="w-10 h-0.5 bg-[#db2a2a] rounded-full" />
        <span className={`text-[11px] font-bold uppercase tracking-[0.25em] ${light ? "text-red-400" : "text-[#db2a2a]"}`}>
          VinFast Lê Trọng Tấn
        </span>
        <span className="w-10 h-0.5 bg-[#db2a2a] rounded-full" />
      </div>
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-wide ${light ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
    </motion.div>
  );
}

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <QuoteModal />

      {/* Hero */}
      <section>
        <HeroSlider />
      </section>

      {/* Stats bar */}
      <section style={{ background: "linear-gradient(90deg, #060d1f 0%, #0f2344 50%, #060d1f 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center px-4 py-2"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <p className="text-3xl md:text-4xl font-black text-yellow-400 leading-none">{s.value}</p>
                <p className="text-white/55 text-xs mt-1.5 tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dòng xe — dark background */}
      <section
        className="py-16 px-4"
        style={{ background: "linear-gradient(180deg, #060d1f 0%, #0d1a35 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="KHÁM PHÁ CÁC DÒNG XE VINFAST" light />
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
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/dong-xe"
              className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:border-[#db2a2a] hover:text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-300"
            >
              Xem tất cả dòng xe →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Xe dịch vụ — slightly different dark tone */}
      <section
        className="py-16 px-4"
        style={{ background: "linear-gradient(180deg, #0d1a35 0%, #0a1020 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="XE DỊCH VỤ VINFAST GREEN" light />
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
      <section className="relative overflow-hidden py-20 px-4" style={{ background: "#0f2344" }}>
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(219,42,42,0.18) 0%, transparent 70%)" }}
        />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Đại lý chính hãng tại Hà Nội
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Đăng ký nhận báo giá<br />
            <span className="text-[#db2a2a]">ngay hôm nay</span>
          </h2>
          <p className="text-white/65 mb-8 text-sm md:text-base max-w-xl mx-auto">
            Tư vấn miễn phí — Hỗ trợ vay trả góp — Giao xe tận nơi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setQuoteOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#db2a2a] text-white font-bold px-10 py-4 rounded-full hover:bg-[#b91c1c] transition-colors text-sm tracking-wide"
              style={{ boxShadow: "0 0 30px rgba(219,42,42,0.4)" }}
            >
              NHẬN BÁO GIÁ NGAY
            </motion.button>
            <motion.a
              href="tel:0976633054"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-white/40 hover:border-white text-white font-bold px-10 py-4 rounded-full transition-colors text-sm tracking-wide"
            >
              GỌI 0976.633.054
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Tin tức */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-0.5 bg-[#db2a2a] rounded-full" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#db2a2a]">
                  Cập nhật mới nhất
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">TIN TỨC & SỰ KIỆN</h2>
            </div>
            <Link
              href="/tin-tuc"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#db2a2a] hover:gap-2 transition-all duration-200"
            >
              Xem tất cả →
            </Link>
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

          <div className="text-center mt-8 sm:hidden">
            <Link href="/tin-tuc" className="text-sm font-semibold text-[#db2a2a]">
              Xem tất cả tin tức →
            </Link>
          </div>
        </div>
      </section>

      {quoteOpen && (
        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      )}
    </>
  );
}
