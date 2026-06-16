"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Truck, ShieldCheck, CreditCard } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import CarCard from "@/components/CarCard";
import NewsCard from "@/components/NewsCard";
import QuoteModal from "@/components/QuoteModal";
import { CARS, SERVICE_CARS, NEWS, formatPrice } from "@/lib/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ─── Scrolling ticker ─── */
function PriceTicker() {
  const items = CARS.map((c) => `${c.name}  ·  ${formatPrice(c.priceFrom)} đ`);
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-[#111111] border-y border-white/8 py-3 select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-white/60 text-xs font-medium tracking-widest shrink-0">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Stats bar ─── */
const STATS = [
  { value: "7+", label: "Dòng xe điện" },
  { value: "500+", label: "Khách hàng" },
  { value: "10", label: "Năm kinh nghiệm" },
  { value: "24/7", label: "Tư vấn lập tức" },
];

/* ─── Commitments ─── */
const COMMITMENTS = [
  {
    num: "01",
    icon: Truck,
    title: "GIAO XE NHANH CHÓNG",
    desc: "Cam kết mang lại mức giá ưu nhất với thời gian giao xe nhanh chóng. Thủ tục đơn giản, chỉ cần gọi hotline.",
    cta: "Liên hệ →",
    href: "/",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "XE CHÍNH HÃNG 100%",
    desc: "Chỉ cung cấp xe VinFast Việt Nam sản xuất, chính hãng, có đầy đủ giấy tờ và bảo hành theo tiêu chuẩn VinFast.",
    cta: "Xem xe →",
    href: "/dong-xe",
  },
  {
    num: "03",
    icon: CheckCircle2,
    title: "BẢO HÀNH — BẢO DƯỠNG",
    desc: "Dịch vụ bảo hành lên đến 10 năm, bảo dưỡng và sửa chữa chính hãng, chăm sóc kỹ lưỡng sau khi mua xe.",
    cta: "Đặt lịch →",
    href: "/",
  },
  {
    num: "04",
    icon: CreditCard,
    title: "HỖ TRỢ TRẢ GÓP 85%",
    desc: "Hỗ trợ vay mua xe trả góp tới 85% giá trị xe với lãi suất ưu đãi, thủ tục đơn giản cùng các ngân hàng uy tín.",
    cta: "Tính trả góp →",
    href: "/mua-xe-tra-gop",
  },
];

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [carTab, setCarTab] = useState<"electric" | "service">("electric");

  return (
    <>
      <QuoteModal />

      {/* ── Hero ── */}
      <section>
        <HeroSlider />
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center px-4 py-1"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-3xl md:text-4xl font-black text-white leading-none">{s.value}</p>
                <p className="text-white/50 text-xs mt-1.5 tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price ticker ── */}
      <PriceTicker />

      {/* ── Cars section ── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Editorial heading */}
          <div className="mb-12">
            <motion.p
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#db2a2a] mb-3 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-7 h-px bg-[#db2a2a] inline-block" />
              Dòng xe VinFast
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                CHỌN XE<br />CỦA BẠN.
              </h2>
              <Link
                href="/dong-xe"
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors shrink-0"
              >
                XEM TẤT CẢ →
              </Link>
            </motion.div>

            {/* Tabs */}
            <div className="flex mt-8 border-b border-gray-200">
              {[
                { key: "electric" as const, label: "XE Ô TÔ ĐIỆN" },
                { key: "service" as const, label: "DÒNG XE DỊCH VỤ" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setCarTab(tab.key)}
                  className={`relative px-6 py-3 text-sm font-black tracking-widest transition-colors ${
                    carTab === tab.key
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {carTab === tab.key && (
                    <motion.div
                      layoutId="car-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#db2a2a]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {carTab === "electric" && (
              <motion.div
                key="electric"
                variants={stagger}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-gray-100"
              >
                {CARS.map((car) => (
                  <motion.div key={car.id} variants={fadeInUp} className="bg-white">
                    <CarCard
                      name={car.name}
                      slug={car.slug}
                      description={car.description}
                      logoSrc={car.logoSrc}
                      carSrc={car.carSrc}
                      priceFrom={car.priceFrom}
                      range={car.specs?.range}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            {carTab === "service" && (
              <motion.div
                key="service"
                variants={stagger}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-gray-100"
              >
                {SERVICE_CARS.map((car) => (
                  <motion.div key={car.id} variants={fadeInUp} className="bg-white">
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
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── About section ── */}
      <section className="bg-white py-20 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <motion.div
            className="relative rounded-none overflow-hidden"
            style={{ height: 400 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/images/hero/slide1.webp"
              alt="VinFast Lê Trọng Tấn Showroom"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-1">Đại lý chính hãng</p>
              <p className="text-2xl font-black leading-tight">VinFast<br />Lê Trọng Tấn</p>
            </div>
          </motion.div>

          {/* Right text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#db2a2a] mb-4 flex items-center gap-2">
              <span className="w-7 h-px bg-[#db2a2a] inline-block" />
              Về chúng tôi
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
              ĐẠI LÝ VINFAST<br />UY TÍN TẠI<br />HÀ NỘI.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">
              VinFast Lê Trọng Tấn là đại lý chính hãng được ủy quyền bởi VinFast Việt Nam,
              tọa lạc tại KĐT Geleximco, Dương Nội, Hà Nội. Showroom trưng bày sang trọng
              với đội ngũ tư vấn chuyên nghiệp và dịch vụ khách hàng tận tâm.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Lái thử các mẫu xe điện VinFast mới nhất hoàn toàn miễn phí",
                "Tư vấn tài chính linh hoạt, hỗ trợ vay đến 85% giá trị xe",
                "Chương trình khuyến mãi hấp dẫn từ hãng và đại lý",
                "Bảo hành lên đến 10 năm, chăm sóc hậu mãi chuyên nghiệp",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-4 h-px bg-[#db2a2a] mt-2 flex-shrink-0 inline-block" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/mua-xe-tra-gop"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-900 hover:text-[#db2a2a] transition-colors border-b-2 border-gray-900 hover:border-[#db2a2a] pb-1"
            >
              TÌM HIỂU THÊM →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Commitments ── */}
      <section className="bg-gray-50 py-20 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#db2a2a] mb-4 flex items-center gap-2">
              <span className="w-7 h-px bg-[#db2a2a] inline-block" />
              Cam kết của chúng tôi
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              MUA XE<br />KHÔNG LO.
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-gray-200"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {COMMITMENTS.map((c) => (
              <motion.div
                key={c.num}
                variants={fadeInUp}
                className="bg-white px-6 py-8 group hover:bg-[#111111] transition-colors duration-300"
              >
                <p className="text-6xl font-black text-gray-100 group-hover:text-white/10 leading-none mb-4 transition-colors">
                  {c.num}
                </p>
                <p className="text-[11px] font-black uppercase tracking-widest text-gray-900 group-hover:text-white mb-3 transition-colors">
                  {c.title}
                </p>
                <p className="text-gray-500 group-hover:text-white/60 text-xs leading-relaxed mb-6 transition-colors">
                  {c.desc}
                </p>
                <Link
                  href={c.href}
                  className="text-[11px] font-black uppercase tracking-widest text-[#db2a2a] group-hover:text-yellow-400 transition-colors"
                >
                  {c.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{ background: "#111111" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(219,42,42,0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.25em] mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/20" />
            Đại lý chính hãng tại Hà Nội
            <span className="w-8 h-px bg-white/20" />
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            ĐĂNG KÝ NHẬN<br />
            <span className="text-[#db2a2a]">BÁO GIÁ NGAY.</span>
          </h2>
          <p className="text-white/50 mb-10 text-sm max-w-xl mx-auto">
            Tư vấn miễn phí · Hỗ trợ vay trả góp · Giao xe tận nơi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setQuoteOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#db2a2a] text-white font-black px-10 py-4 text-sm tracking-widest hover:bg-[#b91c1c] transition-colors"
            >
              NHẬN BÁO GIÁ NGAY
            </motion.button>
            <motion.a
              href="tel:0976633054"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="border border-white/30 hover:border-white text-white font-black px-10 py-4 text-sm tracking-widest transition-colors"
            >
              GỌI 0976.633.054
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ── News ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#db2a2a] mb-3 flex items-center gap-2">
                <span className="w-7 h-px bg-[#db2a2a] inline-block" />
                Cập nhật mới nhất
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                TIN TỨC<br />&amp; SỰ KIỆN.
              </h2>
            </div>
            <Link
              href="/tin-tuc"
              className="hidden sm:block text-sm font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors shrink-0"
            >
              XEM TẤT CẢ →
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
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
