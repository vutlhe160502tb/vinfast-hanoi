"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_SLIDES } from "@/lib/data";

const SLIDE_DATA = [
  {
    title: "THU XĂNG — ĐỔI ĐIỆN",
    subtitle: "Ưu đãi đặc biệt khi chuyển đổi sang xe điện VinFast",
    cta: "Xem ưu đãi",
    href: "/khuyen-mai",
  },
  {
    title: "KẾT NỐI THÔNG MINH",
    subtitle: "Công nghệ VF Connect — lái xe thông minh hơn mỗi ngày",
    cta: "Khám phá dòng xe",
    href: "/dong-xe",
  },
  {
    title: "ĐẦU XUÂN MÃ ĐÁO — SIÊU LỘC",
    subtitle: "Miễn phí sạc PIN lên tới 3 năm — Ưu đãi lên đến 10%",
    cta: "Nhận báo giá",
    href: "/gia-xe",
  },
  {
    title: "MẠNH LIỆT VÌ TƯƠNG LAI XANH",
    subtitle: "Hành trình điện hoá cùng VinFast — Đại lý Lê Trọng Tấn",
    cta: "Liên hệ ngay",
    href: "/mua-xe-tra-gop",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 1.04 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.97 }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const slide = SLIDE_DATA[current];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(420px, 82vh, 960px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[current].src}
            alt={HERO_SLIDES[current].alt}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, rgba(6,10,20,0.9) 0%, rgba(6,10,20,0.3) 30%, transparent 60%)",
        }}
      />

      {/* Slide text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${current}`}
          className="absolute bottom-0 left-0 z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-2xl"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-3"
          >
            VinFast Lê Trọng Tấn
          </motion.p>
          <motion.h2
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 drop-shadow-lg"
          >
            {slide.title}
          </motion.h2>
          <motion.p
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/80 text-sm md:text-base mb-6"
          >
            {slide.subtitle}
          </motion.p>
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 bg-[#db2a2a] hover:bg-[#b91c1c] text-white text-sm font-bold px-7 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(219,42,42,0.5)] hover:scale-105"
            >
              {slide.cta}
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/30 bg-black/20 hover:bg-[#db2a2a] hover:border-[#db2a2a] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/30 bg-black/20 hover:bg-[#db2a2a] hover:border-[#db2a2a] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots + progress */}
      <div className="absolute bottom-6 right-8 md:right-16 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "bg-[#db2a2a] w-8 h-2"
                : "bg-white/40 hover:bg-white/70 w-2 h-2"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-8 z-30 text-white/50 text-xs tracking-widest font-mono">
        {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
      </div>
    </div>
  );
}
