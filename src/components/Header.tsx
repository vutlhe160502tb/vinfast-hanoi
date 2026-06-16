"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  {
    label: "DÒNG XE",
    href: "/dong-xe",
    children: [
      { label: "VF3", href: "/san-pham/vf3" },
      { label: "VF5", href: "/san-pham/vf5" },
      { label: "VF6", href: "/san-pham/vf6" },
      { label: "VF7", href: "/san-pham/vf7" },
      { label: "VF8", href: "/san-pham/vf8" },
      { label: "VF9", href: "/san-pham/vf9" },
      { label: "VF MPV 7", href: "/san-pham/vf-mpv-7" },
    ],
  },
  {
    label: "XE DỊCH VỤ",
    href: "/xe-dich-vu",
    children: [
      { label: "Minio Green", href: "/san-pham/minio-green" },
      { label: "Herio Green", href: "/san-pham/herio-green" },
      { label: "Nerio Green", href: "/san-pham/nerio-green" },
      { label: "Limo Green", href: "/san-pham/limo-green" },
    ],
  },
  { label: "TIN TỨC", href: "/tin-tuc" },
  { label: "GIÁ XE", href: "/gia-xe" },
  { label: "KHUYẾN MÃI", href: "/khuyen-mai" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : ""
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(15,35,68,0.97)" : "#0f2344",
        }}
      >
        {/* Dual accent line */}
        <div className="flex h-[3px]">
          <div className="flex-1 bg-[#1a4fa0]" />
          <div className="flex-1 bg-[#db2a2a]" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row */}
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo-vf.png"
                alt="VinFast"
                width={120}
                height={34}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className="flex items-center gap-1 px-3.5 py-2 text-white/80 text-[13px] font-medium tracking-wide hover:text-white relative group/nav transition-colors"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover/nav:w-4/5 h-[2px] bg-[#db2a2a] rounded-full transition-all duration-300" />
                  </button>

                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 min-w-[180px] overflow-hidden z-50 rounded-xl"
                        style={{
                          background: "linear-gradient(160deg, #0f2344 0%, #0d1a35 100%)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                href="/mua-xe-tra-gop"
                className="relative px-3.5 py-2 text-white/80 text-[13px] font-medium tracking-wide hover:text-white group/nav transition-colors"
              >
                MUA XE TRẢ GÓP
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover/nav:w-4/5 h-[2px] bg-[#db2a2a] rounded-full transition-all duration-300" />
              </Link>
            </nav>

            {/* Phone button */}
            <div className="flex items-center gap-3">
              <a
                href="tel:0976633054"
                className="hidden sm:flex items-center gap-2 bg-[#db2a2a] text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-[#b91c1c] transition-all duration-300 hover:shadow-[0_0_20px_rgba(219,42,42,0.5)]"
              >
                <Phone size={13} />
                0976633054
              </a>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden text-white p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Second row - MUA XE TRẢ GÓP highlighted separately (desktop only) */}
          {/* Already included above */}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-[#0a1a36] border-t border-white/10"
            >
              <nav className="px-4 py-3 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between py-3 text-white text-sm font-medium border-b border-white/10"
                      onClick={() =>
                        setMobileSubmenu(
                          mobileSubmenu === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            mobileSubmenu === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {item.children && mobileSubmenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block pl-4 py-2.5 text-sm text-white/80 hover:text-yellow-300 border-b border-white/5"
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileSubmenu(null);
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <Link
                  href="/mua-xe-tra-gop"
                  className="block py-3 text-white text-sm font-medium border-b border-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  MUA XE TRẢ GÓP
                </Link>
                <a
                  href="tel:0976633054"
                  className="flex items-center gap-2 py-3 text-[#db2a2a] text-sm font-semibold"
                >
                  <Phone size={14} />
                  0976633054
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-[72px]" />

      {/* Floating Buttons */}
      <FloatingButtons />
    </>
  );
}

function FloatingButtons() {
  return (
    <div className="fixed bottom-8 left-4 z-50 flex flex-col gap-3">
      <motion.a
        href="https://zalo.me/0976633054"
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: "linear-gradient(135deg, #0068ff 0%, #005ce6 100%)",
          boxShadow: "0 4px 20px rgba(0,104,255,0.5)",
          width: 50,
          height: 50,
        }}
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Zalo"
      >
        <span className="text-white text-xs font-black tracking-tight">Zalo</span>
      </motion.a>
      <motion.a
        href="tel:0976633054"
        className="rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #db2a2a 0%, #a01e1e 100%)",
          boxShadow: "0 4px 20px rgba(219,42,42,0.6)",
          width: 50,
          height: 50,
        }}
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.92 }}
        animate={{ boxShadow: ["0 4px 20px rgba(219,42,42,0.6)", "0 4px 30px rgba(219,42,42,0.9)", "0 4px 20px rgba(219,42,42,0.6)"] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Gọi điện"
      >
        <Phone size={19} className="text-white" />
      </motion.a>
    </div>
  );
}
