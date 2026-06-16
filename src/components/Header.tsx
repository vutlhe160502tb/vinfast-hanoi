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
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{ backgroundColor: "#0f2344" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row */}
          <div className="flex items-center justify-between h-[72px]">
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
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-white text-sm font-medium tracking-wide hover:text-yellow-300 transition-colors"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 bg-white shadow-xl rounded-b-md min-w-[160px] overflow-hidden z-50 border border-gray-100"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#db2a2a] transition-colors border-b border-gray-50 last:border-0"
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

              {/* MUA XE TRẢ GÓP separate row visually, but let's put here */}
              <Link
                href="/mua-xe-tra-gop"
                className="px-3 py-2 text-white text-sm font-medium tracking-wide hover:text-yellow-300 transition-colors"
              >
                MUA XE TRẢ GÓP
              </Link>
            </nav>

            {/* Phone button */}
            <div className="flex items-center gap-3">
              <a
                href="tel:0976633054"
                className="hidden sm:flex items-center gap-2 bg-[#db2a2a] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#b91c1c] transition-colors"
              >
                <Phone size={14} />
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
    <div className="fixed bottom-20 left-4 z-50 flex flex-col gap-3">
      <motion.a
        href="https://zalo.me/0976633054"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Zalo"
      >
        <span className="text-white text-xs font-bold">Zalo</span>
      </motion.a>
      <motion.a
        href="tel:0976633054"
        className="w-12 h-12 rounded-full bg-[#db2a2a] flex items-center justify-center shadow-lg animate-pulse"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Gọi điện"
      >
        <Phone size={20} className="text-white" />
      </motion.a>
    </div>
  );
}
