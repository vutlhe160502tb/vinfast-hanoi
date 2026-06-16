"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ALL_CARS } from "@/lib/data";

interface QuoteModalProps {
  open?: boolean;
  onClose?: () => void;
  defaultCar?: string;
}

export default function QuoteModal({ open, onClose, defaultCar }: QuoteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState(defaultCar || "VF3");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    } else {
      // Auto open after 2 seconds on first visit
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (defaultCar) setCar(defaultCar);
  }, [defaultCar]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setName("");
      setPhone("");
      onClose?.();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 text-gray-500 hover:text-gray-800 bg-white rounded-full p-1 shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="px-6 pt-5 pb-3 text-center border-b border-red-200">
              <h2 className="text-2xl font-bold text-[#db2a2a] tracking-wide">
                BÁO GIÁ NHANH
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row">
              {/* Left - Promotion image */}
              <div className="sm:w-[45%] bg-gray-50 flex items-center justify-center p-4">
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                  <Image
                    src="/images/hero/slide2.webp"
                    alt="Chính sách bán hàng 2026"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2344]/80 to-transparent flex items-end p-3">
                    <div className="text-white text-sm font-bold">
                      <div className="text-yellow-400">CHÍNH SÁCH BÁN HÀNG 2026</div>
                      <div className="text-xs opacity-90">ƯU ĐÃI LÊN ĐẾN 10%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div className="flex-1 p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">Đăng ký thành công!</p>
                    <p className="text-sm text-gray-500 text-center">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Họ & Tên"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#db2a2a] focus:ring-1 focus:ring-[#db2a2a] transition"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Số điện thoại"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#db2a2a] focus:ring-1 focus:ring-[#db2a2a] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Loại xe</label>
                      <div className="relative">
                        <select
                          value={car}
                          onChange={(e) => setCar(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm appearance-none focus:outline-none focus:border-[#db2a2a] focus:ring-1 focus:ring-[#db2a2a] transition bg-white"
                        >
                          {ALL_CARS.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#3f444b] text-white font-semibold py-3 rounded-md hover:bg-[#2f3238] transition-colors tracking-wider text-sm"
                    >
                      ĐĂNG KÝ
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
